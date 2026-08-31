import qrcode, sys

dominio = "https://verificador-certificado-antecedentes.api.ditrab.cl"
token   = sys.argv[1] if len(sys.argv) > 1 else "JlrwqDz9yZ3cmRFfU5TWxA4o3muYYR8a2OrEeuQkahZ"
url     = f"{dominio}/{token}"

qr = qrcode.QRCode(version=1, box_size=10, border=4)
qr.add_data(url)
qr.make(fit=True)
img = qr.make_image(fill_color="black", back_color="white")
filename = f"qr_{token[:20]}.png"
img.save(filename)
print("QR:", url)
print("Archivo:", filename)
