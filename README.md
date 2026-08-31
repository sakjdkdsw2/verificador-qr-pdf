# 📄 Verificador QR PDF — Guía paso a paso

## ¿Qué es esto?
Un sistema para servir PDFs protegidos por token a través de QR codes.
- Tu URL final será: `https://TU-PROYECTO.vercel.app/JlrwqDz9yZ3cmRFfU5TWxA4o3muYYR8a2OrEeuQkahZ`
- Cuando compres el dominio, lo conectás y será: `https://tudominio.com/JlrwqDz9yZ3cmRFfU5TWxA4o3muYYR8a2OrEeuQkahZ`

---

## PASO 1 — Crear cuenta en Vercel (gratis)
1. Ve a https://vercel.com
2. Click en **Sign Up** → usa tu cuenta de **GitHub** (lo más fácil)
3. Confirmá el email desde tu casilla

---

## PASO 2 — Subir este proyecto a GitHub
1. Entra a https://github.com → **New repository**
2. Nombre: `verificador-qr-pdf`
3. Marelo como **Public**
4. Click **Create repository**
5. En esa página vacía, scroll hasta **"push an existing folder"**
6. Copiá los 2 comandos y ejecutalos en la terminal desde esta carpeta:

```bash
cd ~/Desktop/verificador-qr-pdf
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/verificador-qr-pdf.git
git push -u origin main
```

> Reemplazá `TU-USUARIO` con tu usuario de GitHub.

---

## PASO 3 — Importar en Vercel
1. En https://vercel.com/dashboard → **Add New** → **Project**
2. Buscá **verificador-qr-pdf** en la lista de repos de GitHub
3. Click **Import**
4. En **Build Command**: dejar vacío (no hace falta build)
5. En **Output Directory**: `.` (punto)
6. Click **Deploy**

Vercel te da una URL tipo: `https://verificador-qr-pdf.vercel.app`

---

## PASO 4 — Agregar tus PDFs
1. Descargá el ZIP del repositorio o clonalo:
   ```bash
   git clone https://github.com/TU-USUARIO/verificador-qr-pdf.git
   ```
2. Entrá a la carpeta `pdfs/`
3. **Cada PDF debe tener como nombre el token que querés usar en el QR**
   - Ejemplo: tu PDF se llama `contrato.pdf`
   - Renombralo a: `JlrwqDz9yZ3cmRFfU5TWxA4o3muYYR8a2OrEeuQkahZ.pdf`
   - El token es la parte antes del `.pdf`
4. Guardá el archivo
5. Hacé commit y push:
   ```bash
   git add .
   git commit -m "agrego pdfs"
   git push
   ```
6. Vercel redeploya automáticamente ✓

---

## PASO 5 — Generar el QR
Ejecutá esto (ya tenés `qrcode` instalado):

```python
import qrcode

dominio = "https://verificador-qr-pdf.vercel.app"
token   = "JlrwqDz9yZ3cmRFfU5TWxA4o3muYYR8a2OrEeuQkahZ"
url     = f"{dominio}/{token}"

qr = qrcode.QRCode(version=1, box_size=10, border=4)
qr.add_data(url)
qr.make(fit=True)
img = qr.make_image(fill_color="black", back_color="white")
img.save("qr_contrato.png")
print(f"QR generado: {url}")
```

---

## PASO 6 — Conectar tu dominio (cuando lo compres)
1. Comprá el dominio (ej: `midominio.cl`)
2. En Vercel → tu proyecto → **Settings** → **Domains**
3. Escribí tu dominio → **Add**
4. Vercel te da los **DNS records** que tenés que configurar en tu registrador:
   - Tipo `A` → `76.76.21.21`
   - Tipo `CNAME` → `cname.vercel-dns.com`
5. Esperá a que se valide (puede tardar hasta 24h)
6. Listo: `https://tudominio.com/JlrwqDz9yZ3cmRFfU5TWxA4o3muYYR8a2OrEeuQkahZ`

---

## Estructura del proyecto
```
verificador-qr-pdf/
├── README.md          ← esta guía
├── vercel.json        ← configuración de Vercel
└── pdfs/
    └── .gitkeep       ← poné tus PDFs acá
```

## Reglas
- **Token = nombre del archivo PDF** (sin la extensión `.pdf`)
- **1 token por PDF** → 1 PDF por token
- El PDF se muestra en el navegador directamente (inline)
- Vercel gratis: **100GB de bandwidth/mes** — suficiente para la mayoría de casos
