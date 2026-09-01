// Landing page: replica la SPA de referencia con botones Descargar / Verificar Otro
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Extrae el pathname real (sin query string)
  // En Vercel Edge, req.url es la ruta; en Node, puede ser diferente
  let rawUrl = req.url || req.path || '';
  const pathname = (rawUrl.split('?')[0]).replace(/^\/+|\/+$/g, '');
  // Si es un archivo estático (tiene extensión), servirlo desde public/
  if (pathname && /\.(js|css|png|jpg|jpeg|svg|ico|json|webp|woff2?)$/i.test(pathname)) {
    const staticFile = path.join(process.cwd(), 'public', pathname);
    if (fs.existsSync(staticFile) && fs.statSync(staticFile).isFile()) {
      const ext = path.extname(staticFile).toLowerCase();
      const mime = {
        '.js': 'application/javascript; charset=UTF-8',
        '.css': 'text/css; charset=UTF-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.json': 'application/json',
        '.webp': 'image/webp',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
      }[ext] || 'application/octet-stream';
      res.setHeader('Content-Type', mime);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.status(200).send(fs.readFileSync(staticFile));
      return;
    }
  }
  // Landing HTML para cualquier otra ruta
  const html = fs.readFileSync(path.join(process.cwd(), 'public', 'index.html'), 'utf8');
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).send(html);
}
