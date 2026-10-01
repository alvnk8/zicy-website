// Shared client and renderer for the public Ask Zicy chat (spec R9). Used by the
// site-wide widget. No dependencies.
//
// Backend contract (spec R2/R3): POST {apiBase}/public-chat/stream with
// {message, sessionId} plus an optional page: {path, title} (the address and title
// of the page the visitor is on, capped at 200/150 chars). The response is SSE; each event's data is JSON:
//   {"type":"stage","label":"<text>"}        progress label while waiting (optional)
//   {"type":"content","content":"<delta>"}  one per token
//   {"type":"done"}                          exactly once at the end
//   {"type":"error","message":"<friendly>"}  on a fatal failure, then close
// Over-limit requests get 429 (per visitor) or 503 (global cap) with {detail}.

export type AskZicyErrorKind =
  | 'visitor' // HTTP 429: this visitor hit their hourly or daily limit
  | 'global' // HTTP 503: the site-wide daily cap is reached
  | 'http' // any other non-2xx status
  | 'stream' // the server sent an SSE {"type":"error"} event
  | 'empty' // the stream finished without any text
  | 'network' // fetch or the body read failed (offline, CORS, reset)
  | 'abort'; // the caller's AbortSignal fired

// streamAskZicy never throws; it always resolves to one of these.
// - ok: true   `text` is the full reply. `complete` is false when the stream ended
//              without a `done` event but had delivered text; that text is still
//              treated as the reply (a dropped connection at the very end shouldn't
//              throw away a readable answer). A stream with no text and no `done`
//              is an `empty` error instead.
// - ok: false  `kind` says what went wrong. `detail` is the server's own message
//              when there was one (HTTP `detail` or the SSE error `message`).
//              `status` is set for HTTP errors. `partialText` holds whatever text
//              streamed before the failure ('' if none).
export type AskZicyResult =
  | { ok: true; text: string; complete: boolean }
  | { ok: false; kind: AskZicyErrorKind; detail?: string; status?: number; partialText: string };

export interface StreamAskZicyOptions {
  apiBase: string;
  message: string;
  sessionId: string;
  page?: { path: string; title: string };
  onStage?: (label: string) => void;
  onChunk?: (delta: string, fullText: string) => void;
  signal?: AbortSignal;
}

function isAbort(err: unknown, signal?: AbortSignal): boolean {
  return !!signal?.aborted || (err instanceof Error && err.name === 'AbortError');
}

async function readDetail(response: Response): Promise<string | undefined> {
  try {
    const body = await response.json();
    if (body && typeof body.detail === 'string' && body.detail) return body.detail;
  } catch {
    /* no JSON body */
  }
  return undefined;
}

export async function streamAskZicy({
  apiBase,
  message,
  sessionId,
  page,
  onStage,
  onChunk,
  signal,
}: StreamAskZicyOptions): Promise<AskZicyResult> {
  let base = apiBase || '';
  while (base.endsWith('/')) base = base.slice(0, -1); // /\/+$/ is quadratic on many '/'
  const url = `${base}/public-chat/stream`;
  let text = '';

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
      body: JSON.stringify(
        page
          ? { message, sessionId, page: { path: page.path.slice(0, 200), title: page.title.slice(0, 150) } }
          : { message, sessionId }
      ),
      signal,
    });
  } catch (err) {
    return { ok: false, kind: isAbort(err, signal) ? 'abort' : 'network', partialText: '' };
  }

  if (!response.ok) {
    const detail = await readDetail(response);
    const kind: AskZicyErrorKind =
      response.status === 429 ? 'visitor' : response.status === 503 ? 'global' : 'http';
    return { ok: false, kind, detail, status: response.status, partialText: '' };
  }

  const push = (delta: string) => {
    if (!delta) return;
    text += delta;
    onChunk?.(delta, text);
  };

  // Whole-JSON fallback: a plain JSON {message} body is the complete reply.
  const contentType = (response.headers.get('content-type') || '').toLowerCase();
  if (contentType.includes('application/json')) {
    try {
      const body = await response.json();
      if (body && typeof body.message === 'string' && body.message) {
        push(body.message);
        return { ok: true, text, complete: true };
      }
      return { ok: false, kind: 'empty', partialText: '' };
    } catch (err) {
      return { ok: false, kind: isAbort(err, signal) ? 'abort' : 'network', partialText: '' };
    }
  }

  if (!response.body) return { ok: false, kind: 'empty', partialText: '' };

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let dataLines: string[] = [];
  let done = false;
  let streamError: string | null = null;

  // One complete SSE event. Unknown types and non-JSON data are ignored.
  const dispatch = () => {
    if (dataLines.length === 0) return;
    const data = dataLines.join('\n');
    dataLines = [];
    let evt: { type?: unknown; content?: unknown; message?: unknown; label?: unknown };
    try {
      evt = JSON.parse(data);
    } catch {
      return;
    }
    if (!evt || typeof evt !== 'object') return;
    if (evt.type === 'content' && typeof evt.content === 'string') push(evt.content);
    else if (evt.type === 'stage' && typeof evt.label === 'string' && evt.label.trim()) onStage?.(evt.label.trim());
    else if (evt.type === 'done') done = true;
    else if (evt.type === 'error') streamError = typeof evt.message === 'string' ? evt.message : '';
  };

  const processLine = (line: string) => {
    if (line === '') return dispatch();
    if (line.startsWith(':')) return; // comment / keepalive
    const colon = line.indexOf(':');
    const field = colon === -1 ? line : line.slice(0, colon);
    let value = colon === -1 ? '' : line.slice(colon + 1);
    if (value.startsWith(' ')) value = value.slice(1);
    if (field === 'data') dataLines.push(value);
    // event / id / retry fields carry nothing we need.
  };

  // Split off complete lines. A trailing '\r' is held back because the matching
  // '\n' of a '\r\n' pair may arrive in the next chunk.
  const drain = (final: boolean) => {
    for (;;) {
      const m = /\r\n|\r|\n/.exec(buffer);
      if (!m) break;
      if (!final && m[0] === '\r' && m.index === buffer.length - 1) break;
      processLine(buffer.slice(0, m.index));
      buffer = buffer.slice(m.index + m[0].length);
      if (done || streamError !== null) return;
    }
    if (final) {
      if (buffer) processLine(buffer);
      buffer = '';
      dispatch(); // lenient: a last event with no blank line after it
    }
  };

  try {
    for (;;) {
      const chunk = await reader.read();
      if (chunk.done) {
        buffer += decoder.decode();
        drain(true);
        break;
      }
      buffer += decoder.decode(chunk.value, { stream: true });
      drain(false);
      if (done || streamError !== null) {
        reader.cancel().catch(() => {});
        break;
      }
    }
  } catch (err) {
    return { ok: false, kind: isAbort(err, signal) ? 'abort' : 'network', partialText: text };
  }

  if (streamError !== null) {
    return { ok: false, kind: 'stream', detail: streamError || undefined, partialText: text };
  }
  if (!text) return { ok: false, kind: 'empty', partialText: '' };
  return { ok: true, text, complete: done };
}

// ---------------------------------------------------------------------------
// Safe markdown renderer.
//
// The whole input is HTML-escaped first, so every tag in the output is one this
// function wrote. Supported: **bold**, unordered (-, *, •) and ordered (1. / 1))
// lists, [text](url) links and bare http(s) URLs, paragraphs and line breaks.
// Headings are shown as bold paragraphs and horizontal rules are dropped; the
// text around them always renders. Unclosed markup (e.g. a half-streamed
// "**bold") stays as literal text, so re-rendering partial text on every chunk
// is safe.
// ---------------------------------------------------------------------------

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

function unescapeHtml(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

// Takes a URL as it appears in the escaped text and returns a value that is safe
// to place inside a double-quoted href, or null to leave the link as plain text.
// The scheme must be literally http:, https: or mailto: once our own escaping is
// undone: whitespace, control characters, quotes, angle brackets and backslashes
// anywhere reject the URL, which rules out tricks like " javascript:",
// "java\tscript:" and entity-encoded schemes ("java&#x09;script:" has no valid
// scheme at all). The browser's URL parser must agree on the protocol.
const SAFE_SCHEME = /^(https?|mailto):/i;
const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:']);

function safeHref(escapedUrl: string): string | null {
  const raw = unescapeHtml(escapedUrl);
  if (!raw || /[\s\u0000-\u001f\u007f-\u009f"'<>`\\]/.test(raw)) return null;
  if (!SAFE_SCHEME.test(raw)) return null;
  try {
    if (!SAFE_PROTOCOLS.has(new URL(raw).protocol)) return null;
  } catch {
    return null;
  }
  return escapeHtml(raw);
}

// Links to our own marketing site (https, exact host) open in the same tab so a
// guided click keeps the visitor in one tab; everything else opens a new one.
function isSiteLink(escapedHref: string): boolean {
  try {
    const u = new URL(unescapeHtml(escapedHref));
    return u.protocol === 'https:' && (u.hostname === 'www.zicy.com' || u.hostname === 'zicy.com');
  } catch {
    return false;
  }
}

function anchor(href: string, label: string): string {
  if (isSiteLink(href)) return `<a href="${href}">${label}</a>`;
  return `<a href="${href}" target="_blank" rel="noopener">${label}</a>`;
}

function bold(s: string): string {
  return s.replace(/\*\*(?=\S)(.+?)\*\*/g, '<strong>$1</strong>');
}

// Bare URLs in escaped text stop at whitespace or an escaped quote/bracket.
const BARE_URL = /https?:\/\/(?:(?!&quot;|&#39;|&lt;|&gt;)[^\s])+/g;

// Replaces every [label](url) in s, left to right, with fn(whole, label, url).
// Same matches as /\[([^\]\n]+)\]\(([^)\n]*)\)/g, but in one linear pass: that
// regex rescans to the next "]" from every "[", which is quadratic on a long run
// of "[" (80k of them took 2.5 s). The next "]" and ")" stops are cached and only
// move forward, because the scan position only moves forward.
function replaceLinks(s: string, fn: (whole: string, label: string, url: string) => string): string {
  const scanTo = (from: number, ch: string) => {
    let k = from;
    while (k < s.length && s[k] !== ch && s[k] !== '\n') k++;
    return k;
  };
  let out = '';
  let copied = 0;
  let rb = -1; // first "]" or newline at or after i + 1
  let rp = -1; // first ")" or newline at or after rb + 2
  for (let i = s.indexOf('['); i !== -1; ) {
    if (rb <= i) rb = scanTo(i + 1, ']');
    if (rb > i + 1 && s[rb] === ']' && s[rb + 1] === '(') {
      if (rp < rb + 2) rp = scanTo(rb + 2, ')');
      if (s[rp] === ')') {
        out += s.slice(copied, i) + fn(s.slice(i, rp + 1), s.slice(i + 1, rb), s.slice(rb + 2, rp));
        copied = rp + 1;
        i = s.indexOf('[', copied);
        continue;
      }
    }
    i = s.indexOf('[', i + 1);
  }
  return out + s.slice(copied);
}

// Trailing punctuation (and escaped apostrophes) that ends a sentence, not a URL.
// A loop rather than a $-anchored regex, which is quadratic on long punctuation runs.
function trailStart(url: string): number {
  let end = url.length;
  for (;;) {
    if (end > 0 && '.,;:!?)]'.includes(url[end - 1])) end--;
    else if (end >= 5 && url.startsWith('&#39;', end - 5)) end -= 5;
    else return end;
  }
}

// Inline formatting for one line of already-escaped text. Links are swapped for
// placeholders first so bold markers inside a URL can never reach an attribute.
function inline(escaped: string): string {
  const slots: string[] = [];
  const hold = (html: string) => `\u0000${slots.push(html) - 1}\u0000`;

  let s = replaceLinks(escaped, (whole, label, url) => {
    const href = safeHref(url.trim());
    return href ? hold(anchor(href, bold(label))) : whole;
  });

  s = s.replace(/[^\u0000]+/g, (segment) =>
    segment.replace(BARE_URL, (match, offset: number) => {
      // The URL of a markdown link that is still streaming in ("[t](https://ap")
      // stays plain text until the link closes.
      if (segment.slice(Math.max(0, offset - 2), offset) === '](') return match;
      const cut = trailStart(match);
      const url = match.slice(0, cut);
      const rest = match.slice(cut);
      const href = safeHref(url);
      return href ? hold(anchor(href, url)) + rest : match;
    })
  );

  s = bold(s);
  return s.replace(/\u0000(\d+)\u0000/g, (_, i: string) => slots[Number(i)]);
}

const UL_ITEM = /^\s*[-*•]\s+(.*)$/;
const OL_ITEM = /^\s*\d+[.)]\s+(.*)$/;
const HEADING = /^\s*#{1,6}\s+(.*)$/;
const RULE = /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/;

// Longer input is shown as escaped plain text with line breaks, so no future
// regex change can freeze the tab on a huge paste or runaway reply.
const MAX_MARKDOWN_CHARS = 20000;

export function renderSafeMarkdown(text: string): string {
  if (!text) return '';
  // Strip NULs (used as placeholders above) and normalise newlines, then escape.
  const escaped = escapeHtml(text.replace(/\u0000/g, '').replace(/\r\n?/g, '\n'));
  if (text.length > MAX_MARKDOWN_CHARS) return `<p>${escaped.replace(/\n/g, '<br>')}</p>`;

  const out: string[] = [];
  let para: string[] = [];
  let list: { tag: 'ul' | 'ol'; items: string[] } | null = null;

  const flushPara = () => {
    if (para.length) out.push(`<p>${para.join('<br>')}</p>`);
    para = [];
  };
  const flushList = () => {
    if (list) out.push(`<${list.tag}>${list.items.map((i) => `<li>${i}</li>`).join('')}</${list.tag}>`);
    list = null;
  };

  for (const line of escaped.split('\n')) {
    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }
    if (RULE.test(line)) {
      flushPara();
      flushList();
      continue;
    }
    const heading = HEADING.exec(line);
    if (heading) {
      flushPara();
      flushList();
      if (heading[1].trim()) out.push(`<p><strong>${inline(heading[1].trim())}</strong></p>`);
      continue;
    }
    const ul = UL_ITEM.exec(line);
    const ol = ul ? null : OL_ITEM.exec(line);
    if (ul || ol) {
      const tag = ul ? 'ul' : 'ol';
      flushPara();
      if (list && list.tag !== tag) flushList();
      if (!list) list = { tag, items: [] };
      list.items.push(inline((ul || ol)![1].trim()));
      continue;
    }
    flushList();
    para.push(inline(line.trim()));
  }
  flushPara();
  flushList();
  return out.join('');
}
