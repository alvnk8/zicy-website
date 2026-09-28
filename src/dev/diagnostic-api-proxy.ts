// Local dev proxy: forwards same-origin requests under a mounted path to the real
// backend at DIAGNOSTIC_API_TARGET, so requests made without PUBLIC_DIAGNOSTIC_API_BASE
// (the FreeDiagnostic pattern) still reach a backend. Also used for /public-chat/*
// (Ask Zicy), following the same convention.
const MOUNTS = [
  { path: '/api/brand-intelligence', prefixEnv: 'DIAGNOSTIC_API_PREFIX' },
  { path: '/public-chat', prefixEnv: 'PUBLIC_CHAT_API_PREFIX' },
];

export const prerender = false;

function joinPaths(prefix: string, suffix: string) {
  if (!prefix) return suffix.startsWith('/') ? suffix : `/${suffix}`;
  if (!suffix) return prefix;
  if (suffix.startsWith('?')) return `${prefix}${suffix}`;
  return `${prefix.replace(/\/$/, '')}/${suffix.replace(/^\//, '')}`;
}

async function proxyDiagnosticRequest(request: Request) {
  const requestUrl = new URL(request.url);
  const mount = MOUNTS.find((m) => requestUrl.pathname.startsWith(m.path));
  if (!mount) return new Response('Not found', { status: 404 });

  const targetUrl = new URL(import.meta.env.DIAGNOSTIC_API_TARGET || 'http://localhost:8000');
  const upstreamPrefix = import.meta.env[mount.prefixEnv] ?? mount.path;
  const suffix = `${requestUrl.pathname.slice(mount.path.length)}${requestUrl.search}`;
  const targetBasePath = targetUrl.pathname === '/' ? '' : targetUrl.pathname;
  const upstreamPath = joinPaths(upstreamPrefix, suffix);

  targetUrl.pathname = joinPaths(targetBasePath, upstreamPath);
  targetUrl.search = '';

  const headers = new Headers(request.headers);
  headers.delete('connection');
  headers.delete('content-length');
  headers.delete('host');

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: 'manual',
  };

  if (!['GET', 'HEAD'].includes(request.method)) {
    init.body = await request.arrayBuffer();
  }

  // Returning the upstream fetch's Response directly (rather than buffering it into
  // text/JSON first) keeps its body a streaming ReadableStream, so SSE responses
  // (Content-Type: text/event-stream) pass through to the client unbuffered.
  return fetch(targetUrl, init);
}

export const ALL = ({ request }: { request: Request }) => proxyDiagnosticRequest(request);
