const DIAGNOSTIC_API_MOUNT_PATH = '/api/brand-intelligence';

export const prerender = false;

function joinPaths(prefix: string, suffix: string) {
  if (!prefix) return suffix.startsWith('/') ? suffix : `/${suffix}`;
  if (!suffix) return prefix;
  if (suffix.startsWith('?')) return `${prefix}${suffix}`;
  return `${prefix.replace(/\/$/, '')}/${suffix.replace(/^\//, '')}`;
}

async function proxyDiagnosticRequest(request: Request) {
  const requestUrl = new URL(request.url);
  const targetUrl = new URL(import.meta.env.DIAGNOSTIC_API_TARGET || 'http://localhost:8000');
  const upstreamPrefix = import.meta.env.DIAGNOSTIC_API_PREFIX ?? DIAGNOSTIC_API_MOUNT_PATH;
  const suffix = `${requestUrl.pathname.slice(DIAGNOSTIC_API_MOUNT_PATH.length)}${requestUrl.search}`;
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

  return fetch(targetUrl, init);
}

export const ALL = ({ request }: { request: Request }) => proxyDiagnosticRequest(request);
