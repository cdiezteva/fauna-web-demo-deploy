# Copia los vídeos/imágenes reales del proyecto a public/, con los nombres
# que espera el código. Ejecutar una sola vez desde esta carpeta (sitio-web):
#   powershell -ExecutionPolicy Bypass -File .\setup-media.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$src  = Split-Path -Parent $root

New-Item -ItemType Directory -Force -Path "$root\public\videos" | Out-Null
New-Item -ItemType Directory -Force -Path "$root\public\images" | Out-Null
New-Item -ItemType Directory -Force -Path "$root\public\docs"   | Out-Null

function Copy-Safe($from, $to) {
  if (Test-Path $from) {
    Copy-Item -Path $from -Destination $to -Force
    Write-Host "OK  $to"
  } else {
    Write-Host "!!  No encontrado: $from"
  }
}

# Vídeos
Copy-Safe "$src\videos\logo-animado.mp4"                              "$root\public\videos\logo-animado.mp4"
Copy-Safe "$src\videos\Oveja_con_circulo AVizor Enlaces.mp4"           "$root\public\videos\hero-bg.mp4"
Copy-Safe "$src\videos\Prueba Avizor Fauna EN 5-07-2024.mp4"           "$root\public\videos\demo-deteccion.mp4"
Copy-Safe "$src\videos\animacion_baliza.mp4"                           "$root\public\videos\baliza-render.mp4"
Copy-Safe "$src\videos\lince_sentandose.mp4"                           "$root\public\videos\lince-sentandose.mp4"
Copy-Safe "$src\videos\jabali-cruzando.mp4"                            "$root\public\videos\jabali-cruzando.mp4"
Copy-Safe "$src\videos\IMG_8467.MOV"                                   "$root\public\videos\IMG_8467.MOV"

# Imágenes
Copy-Safe "$src\imagenes\logo-Avizor.jpeg"                             "$root\public\images\logo-avizor.jpg"
Copy-Safe "$src\imagenes\carretera-FO.jpg"                             "$root\public\images\carretera-fo.jpg"
Copy-Safe "$src\imagenes\Foto Avizor Fauna Somacyl.jpeg"                "$root\public\images\somacyl-instalacion.jpg"
Copy-Safe "$src\imagenes\baliza-laser.jpg"                              "$root\public\images\baliza-laser.jpg"
Copy-Safe "$src\imagenes\lince.jpeg"                                    "$root\public\images\lince-iberico.jpg"
Copy-Safe "$src\imagenes\baliza_TEVA_DGT.jpeg"                          "$root\public\images\baliza-stand-dgt.jpg"
Copy-Safe "$src\imagenes\IMG_84681.PNG"                                 "$root\public\images\inauguracion-somacyl.png"
Copy-Safe "$src\imagenes\diagrama.png"                                  "$root\public\images\diagrama.png"
Copy-Safe "$src\imagenes\logo-ministerio-transp.png"                    "$root\public\images\logo-ministerio-transp.png"
Copy-Safe "$src\imagenes\logo-somacyl.png"                              "$root\public\images\logo-somacyl.png"
Copy-Safe "$src\imagenes\logo-juntaA.png"                               "$root\public\images\logo-juntaA.png"
Copy-Safe "$src\imagenes\logo-dgt.png"                                  "$root\public\images\logo-dgt.png"
Copy-Safe "$src\imagenes\logo-jccm.png"                                 "$root\public\images\logo-jccm.png"

# Dossier PDF
Copy-Safe "$src\imagenes\Presentacion_AVIZOR_Fauna (v1.0).pdf"          "$root\public\docs\AVIZOR-Fauna-Dossier.pdf"

Write-Host ""
Write-Host "Listo. Reinicia 'npm run dev' si ya estaba corriendo."
