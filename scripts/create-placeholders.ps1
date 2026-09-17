$ErrorActionPreference = 'Stop'
$dir = 'public\images'
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

$files = @(
  @{n='coffee-1.jpg';     l='COFFEE 1';     w=800;  h=600}
  @{n='coffee-2.jpg';     l='COFFEE 2';     w=800;  h=600}
  @{n='coffee-3.jpg';     l='COFFEE 3';     w=800;  h=600}
  @{n='latte.jpg';        l='LATTE';        w=800;  h=600}
  @{n='cappuccino.jpg';   l='CAPPUCCINO';   w=800;  h=600}
  @{n='espresso.jpg';     l='ESPRESSO';     w=800;  h=600}
  @{n='dessert-1.jpg';    l='DESSERT 1';    w=800;  h=600}
  @{n='dessert-2.jpg';    l='DESSERT 2';    w=800;  h=600}
  @{n='breakfast.jpg';    l='BREAKFAST';    w=800;  h=600}
  @{n='interior-1.jpg';   l='INTERIOR 1';   w=1200; h=900}
  @{n='interior-2.jpg';   l='INTERIOR 2';   w=1200; h=900}
  @{n='team-1.jpg';       l='TEAM 1';       w=400;  h=500}
  @{n='team-2.jpg';       l='TEAM 2';       w=400;  h=500}
  @{n='team-3.jpg';       l='TEAM 3';       w=400;  h=500}
  @{n='team-4.jpg';       l='TEAM 4';       w=400;  h=500}
  @{n='gallery-1.jpg';    l='GALLERY 1';    w=900;  h=600}
  @{n='gallery-2.jpg';    l='GALLERY 2';    w=900;  h=600}
  @{n='gallery-3.jpg';    l='GALLERY 3';    w=900;  h=600}
  @{n='gallery-4.jpg';    l='GALLERY 4';    w=900;  h=600}
  @{n='gallery-5.jpg';    l='GALLERY 5';    w=900;  h=600}
  @{n='gallery-6.jpg';    l='GALLERY 6';    w=900;  h=600}
  @{n='hero-bg.jpg';      l='HERO BG';      w=1920; h=1080}
  @{n='cta-bg.jpg';       l='CTA BG';       w=1920; h=1080}
  @{n='map-bg.jpg';       l='MAP BG';       w=1200; h=800}
  @{n='booking-bg.jpg';   l='BOOKING BG';   w=800;  h=900}
)

foreach ($f in $files) {
  $fs = [int]([Math]::Min($f.w, $f.h) / 10)
  $fs2 = [int]([Math]::Min($f.w, $f.h) / 24)
  $svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 $($f.w) $($f.h)'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#221a17'/><stop offset='100%' stop-color='#0d0d0d'/></linearGradient></defs><rect width='$($f.w)' height='$($f.h)' fill='url(#g)'/><rect x='40' y='40' width='$($f.w - 80)' height='$($f.h - 80)' fill='none' stroke='#b87333' stroke-width='4'/><text x='$($f.w/2)' y='$($f.h/2)' text-anchor='middle' font-family='Arial' font-size='$fs' fill='#b87333' font-weight='bold'>$($f.l)</text><text x='$($f.w/2)' y='$($f.h/2 + $fs2 * 2)' text-anchor='middle' font-family='Arial' font-size='$fs2' fill='#c9c5bd'>$($f.n)</text></svg>"
  $path = Join-Path $dir $f.n
  [System.IO.File]::WriteAllText($path, $svg, [System.Text.Encoding]::ASCII)
}

Write-Host ("Created {0} placeholders" -f $files.Count)
Get-ChildItem -Path $dir | Select-Object Name, Length | Format-Table -AutoSize