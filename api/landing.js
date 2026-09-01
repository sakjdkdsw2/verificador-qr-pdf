// Landing page: replica la SPA de referencia con botones Descargar / Verificar Otro
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Si piden un archivo estático (como footer.svg o archivos del public/)
  const filePath = req.query.file || (req.url ? req.url.split('?')[0] : '');
  const cleanPath = filePath.replace(/\.\./g, '').replace(/^\//, '');
  const staticFile = path.join(process.cwd(), 'public', cleanPath);
  if (cleanPath && cleanPath !== '' && fs.existsSync(staticFile) && fs.statSync(staticFile).isFile()) {
    const ext = path.extname(staticFile);
    const mime = {
      '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.css': 'text/css', '.js': 'application/javascript',
    }[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', mime);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).send(fs.readFileSync(staticFile));
    return;
  }
  // Landing HTML
  const html = fs.readFileSync(path.join(process.cwd(), 'public', 'index.html'), 'utf8');
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).send(html);
}
