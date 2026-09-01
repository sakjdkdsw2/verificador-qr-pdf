// Verifica token → sirve PDF desde /pdfs/
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const token = req.query.token || '';
  if (!token || token.includes('.') || token.length > 200) {
    return res.status(400).send('Token no válido');
  }
  const file = path.join(process.cwd(), 'pdfs', `${token}.pdf`);
  if (!fs.existsSync(file)) {
    return res.status(404).send(`PDF no encontrado para token: ${token}`);
  }
  const download = (req.query.download || '').toString();
  const disposition = download === '1' ? `attachment; filename="${token}.pdf"` : `inline; filename="${token}.pdf"`;
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', disposition);
  res.setHeader('Cache-Control', 'public, max-age=86400');
  fs.createReadStream(file).pipe(res);
}
