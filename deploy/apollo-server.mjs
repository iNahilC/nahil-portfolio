import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { extname, isAbsolute, resolve, sep } from 'node:path';

const root = resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const port = Number(process.env.PORTFOLIO_PORT || 25724);
const mime = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
  ['.pdf', 'application/pdf'],
]);

const server = createServer(async (request, response) => {
  let path;
  try {
    const pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname);
    const relative = pathname === '/'
      ? 'index.html'
      : pathname.replace(/^\/+/, '') + (pathname.endsWith('/') ? 'index.html' : '');
    path = resolve(root, relative);
    if (relative.includes('\0') || isAbsolute(relative) || (!path.startsWith(root + sep) && path !== root)) {
      response.writeHead(403).end('Forbidden');
      return;
    }
  } catch {
    response.writeHead(400).end('Bad request');
    return;
  }

  try {
    const body = await readFile(path);
    const extension = extname(path).toLowerCase();
    response.writeHead(200, {
      'Content-Type': mime.get(extension) || 'application/octet-stream',
      'Content-Length': body.length,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cache-Control': extension === '.html' ? 'no-cache' : 'public, max-age=3600',
    });
    response.end(body);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' ? 404 : 500).end(error.code === 'ENOENT' ? 'Not found' : 'Server error');
  }
});

server.on('error', (error) => console.error('Portfolio HTTP server:', error));
server.listen(port, '0.0.0.0', () => console.log(`Portfolio serving on port ${port}`));
