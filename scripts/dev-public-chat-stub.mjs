#!/usr/bin/env node
// Dev-only stub for the public-chat backend (POST /public-chat/stream), used with
// the dev proxy in astro.config.mjs (DIAGNOSTIC_API_TARGET pointed at this server)
// so the site's Ask Zicy widget and /consultant page have something to stream from
// before the real zicy-tools backend exists. Plain Node, no dependencies.
//
// Run: npm run dev:chat-stub
// Port: PUBLIC_CHAT_STUB_PORT (default 8787)
//
// Validates the request body per spec R1: 422 when the message is empty, over 500
// characters, or sessionId isn't 8-64 characters of [A-Za-z0-9_-].
//
// The reply is chosen by looking for a trigger substring anywhere in the message,
// so later steps can test rendering and XSS handling against canned output:
//   !429       -> 429 JSON {"detail": "..."}, no SSE
//   !503       -> 503 JSON {"detail": "..."}, no SSE
//   !error     -> a couple of content deltas, then an SSE "error" event, then close
//   !heading   -> a reply starting with "## Title" plus body text
//   !hr        -> a reply containing a "---" line with text after it
//   !xss-js    -> a markdown link with a javascript: URL
//   !xss-attr  -> a markdown link whose URL breaks out of its href attribute
//   !xss-img   -> a raw <img onerror=...> tag
//   !json      -> a non-SSE whole-JSON {"message": "..."} fallback response
//   (default)  -> a normal markdown reply with bold, a list and a link
//
// Everything else about the request (headers, method) is ignored; this is a test
// double, not a faithful reimplementation of the real endpoint's limits or agent.

import { createServer } from 'node:http';

const PORT = Number(process.env.PUBLIC_CHAT_STUB_PORT || 8787);
const SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'X-Accel-Buffering': 'no',
  Connection: 'keep-alive',
};

function corsHeaders(req) {
  return {
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function streamDeltas(res, text, delayMs = 25) {
  // Break into small chunks so the client sees content arrive incrementally,
  // the same way a real token stream would.
  const chunkSize = 4;
  for (let i = 0; i < text.length; i += chunkSize) {
    const delta = text.slice(i, i + chunkSize);
    res.write(`data: ${JSON.stringify({ type: 'content', content: delta })}\n\n`);
    await sleep(delayMs);
  }
}

function sendJson(res, status, body, extraHeaders = {}) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
    ...extraHeaders,
  });
  res.end(payload);
}

function validate(body) {
  if (typeof body !== 'object' || body === null) {
    return "Request body must be a JSON object with 'message' and 'sessionId'.";
  }
  const { message, sessionId } = body;
  if (typeof message !== 'string' || message.trim().length === 0) {
    return "The message can't be empty.";
  }
  if (message.length > 500) {
    return 'The message is too long. Keep it under 500 characters.';
  }
  if (typeof sessionId !== 'string' || !/^[A-Za-z0-9_-]{8,64}$/.test(sessionId)) {
    return 'sessionId must be 8 to 64 characters of letters, numbers, underscore or hyphen.';
  }
  return null;
}

async function handleStream(req, res, body) {
  const message = body.message;
  const cors = corsHeaders(req);

  if (message.includes('!429')) {
    return sendJson(res, 429, { detail: "Today's message limit has been reached. Start a free trial to keep going." }, cors);
  }
  if (message.includes('!503')) {
    return sendJson(res, 503, { detail: "Ask Zicy is over capacity right now. Please try again shortly." }, cors);
  }
  if (message.includes('!json')) {
    return sendJson(res, 200, { message: 'This is a whole-JSON fallback reply, sent without SSE.' }, cors);
  }

  res.writeHead(200, { ...SSE_HEADERS, ...cors });

  if (message.includes('!error')) {
    await streamDeltas(res, 'Here is the start of an answer, then something goes wrong.');
    res.write(`data: ${JSON.stringify({ type: 'error', message: 'Something went wrong on our end. Please try again.' })}\n\n`);
    return res.end();
  }
  if (message.includes('!heading')) {
    await streamDeltas(res, '## Title\n\nBody text that follows a markdown heading.');
  } else if (message.includes('!hr')) {
    await streamDeltas(res, 'Some intro text.\n\n---\n\nText after the horizontal rule.');
  } else if (message.includes('!xss-js')) {
    await streamDeltas(res, '[x](javascript:alert(1))');
  } else if (message.includes('!xss-attr')) {
    await streamDeltas(res, '[a](https://x" onmouseover="alert(1))');
  } else if (message.includes('!xss-img')) {
    await streamDeltas(res, '<img src=x onerror=alert(1)>');
  } else {
    await streamDeltas(
      res,
      "Here's a normal reply. It includes **bold text**, a short list:\n\n" +
        '- Seats and brands depend on your plan\n' +
        '- Pricing is on our [pricing page](https://www.zicy.com/pricing)\n' +
        '- The 7 day free trial needs no credit card\n\n' +
        'Start the [free trial](https://app.zicy.com/register) whenever you are ready.'
    );
  }

  res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
  res.end();
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders(req));
    return res.end();
  }

  if (req.method !== 'POST' || !req.url?.startsWith('/public-chat/stream')) {
    return sendJson(res, 404, { detail: 'Not found.' }, corsHeaders(req));
  }

  let raw = '';
  req.on('data', (chunk) => {
    raw += chunk;
  });
  req.on('end', async () => {
    let body;
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch {
      return sendJson(res, 422, { detail: 'Request body must be valid JSON.' }, corsHeaders(req));
    }

    const validationError = validate(body);
    if (validationError) {
      return sendJson(res, 422, { detail: validationError }, corsHeaders(req));
    }

    try {
      await handleStream(req, res, body);
    } catch (err) {
      if (!res.headersSent) {
        sendJson(res, 500, { detail: 'Stub server error.' }, corsHeaders(req));
      } else {
        res.end();
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Public-chat dev stub listening on http://localhost:${PORT}/public-chat/stream`);
});
