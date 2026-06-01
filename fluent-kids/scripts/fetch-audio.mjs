#!/usr/bin/env node
/**
 * Downloads curated Wikimedia / Lingua Libre clips into public/audio/
 * Run: node scripts/fetch-audio.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const remoteAudioDownloads = [
  {
    file: "twi/maakye.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/LL-Q12068060%28twi%29-Mndetatsin-maakye%28Bonjour%29.wav",
  },
  {
    file: "twi/onua.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/57/LL-Q12068060%28twi%29-Mndetatsin-onua%28Salut%29.wav",
  },
  {
    file: "twi/medaase.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d0/LL-Q2728730%28twi%29-Mndetatsin-medaase%28Merci%29.wav",
  },
  {
    file: "twi/nsuo.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6e/LL-Q283%28twi%29-Mndetatsin-nsuo%28l%27eau%29.wav",
  },
  {
    file: "twi/baako.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/7d/LL-Q199%28twi%29-Mndetatsin-baako%28un%29.wav",
  },
  {
    file: "twi/mmienu.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/f/fc/LL-Q200%28twi%29-Mndetatsin-mmienu%28deux%29.wav",
  },
  {
    file: "twi/mmeensa.wav",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/57/LL-Q201%28twi%29-Mndetatsin-mme%C9%9Bnsa%28trois%29.wav",
  },
  {
    file: "yoruba/baba.ogg",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/42/Yo-Baba_suwe.ogg",
  },
];

const appRoot = join(fileURLToPath(import.meta.url), "..", "..");
const outDir = join(appRoot, "public", "audio");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function downloadOne({ file, url }, attempt = 1) {
  const dest = join(outDir, file);
  await mkdir(dirname(dest), { recursive: true });
  console.log(`Fetching ${file}...`);
  const res = await fetch(url, {
    headers: { "User-Agent": "FluentKids/1.0 (educational; contact: demo@iamfluent.com)" },
  });
  if (res.status === 429 && attempt < 5) {
    const wait = attempt * 3000;
    console.log(`  rate limited, waiting ${wait}ms...`);
    await sleep(wait);
    return downloadOne({ file, url }, attempt + 1);
  }
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`  ✓ ${buf.length} bytes`);
}

for (const item of remoteAudioDownloads) {
  await downloadOne(item);
  await sleep(1500);
}
console.log("Done. Audio saved to public/audio/");
