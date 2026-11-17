import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [slug, title, accent = '#48d8ee'] = process.argv.slice(2);
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || '') || !title || !/^#[0-9a-fA-F]{6}$/.test(accent)) {
  console.error('Usage: node scripts/create-placeholder.mjs <slug> "Display Name" "#hexcolor"');
  process.exitCode = 1;
} else {
  const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'profile', 'assets', `${slug}.svg`);
  if (existsSync(out)) {
    console.error(`Cover already exists: ${out}`);
    process.exitCode = 1;
  } else {
    mkdirSync(dirname(out), { recursive: true });
    const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
    const safeTitle = escape(title);
    const pixels = Array.from({ length: 96 }, (_, index) => {
      const x = index % 16;
      const y = Math.floor(index / 16);
      const seed = [...slug].reduce((sum, character) => sum + character.charCodeAt(0), 0);
      const active = (x * 13 + y * 17 + seed) % 9 < 3;
      return active ? `<rect x="${478 + x * 16}" y="${253 + y * 16}" width="10" height="10" rx="2" fill="${accent}" opacity="${0.45 + ((x + y) % 4) * 0.15}"/>` : '';
    }).join('');
    writeFileSync(out, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img" aria-labelledby="title desc">
  <title id="title">${safeTitle} placeholder cover</title>
  <desc id="desc">Illustrated PixelMug display. Preview coming soon; this is not a screenshot.</desc>
  <defs>
    <linearGradient id="bg" x2="1" y2="1"><stop stop-color="#101a31"/><stop offset="1" stop-color="#1d3152"/></linearGradient>
    <linearGradient id="glass" x2="1" y2="1"><stop stop-color="#455a79"/><stop offset="1" stop-color="#17233e"/></linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <circle cx="980" cy="115" r="250" fill="${accent}" opacity=".08"/>
  <circle cx="190" cy="650" r="280" fill="${accent}" opacity=".07"/>
  <text x="72" y="113" fill="${accent}" font-family="Arial,sans-serif" font-size="28" font-weight="700" letter-spacing="4">PIXELMUG APPLICATIONS</text>
  <text x="72" y="185" fill="#fff" font-family="Arial,sans-serif" font-size="57" font-weight="700">${safeTitle}</text>
  <rect x="72" y="217" width="350" height="4" rx="2" fill="${accent}"/>
  <rect x="72" y="270" width="306" height="58" rx="28" fill="#ffffff" opacity=".09"/>
  <text x="98" y="307" fill="#d9e7f6" font-family="Arial,sans-serif" font-size="24">PREVIEW COMING SOON</text>
  <rect x="422" y="209" width="356" height="222" rx="42" fill="url(#glass)" stroke="#7284a0" stroke-width="8"/>
  <rect x="453" y="236" width="294" height="166" rx="18" fill="#07121f"/>
  ${pixels}
  <path d="M432 426h336l-36 102c-17 45-53 70-131 70s-114-25-131-70z" fill="#d7e0e9" opacity=".72"/>
  <text x="72" y="602" fill="#9db2ce" font-family="Arial,sans-serif" font-size="23">Illustration only · Replace with a real PixelMug demo</text>
</svg>
`, 'utf8');
    console.log(out);
  }
}
