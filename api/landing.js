// Landing page: replica la SPA de referencia con botones Descargar / Verificar Otro
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const html = fs.readFileSync(path.join(process.cwd(), 'public', 'index.html'), 'utf8');
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).send(html);
}
