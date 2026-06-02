import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.env.BASE_URL || "http://127.0.0.1:3000";
const OUT = process.env.OUT_DIR || "/opt/cursor/artifacts/screenshots";

const pages = [
  { name: "01-splash", path: "/" },
  { name: "02-learners", path: "/learners" },
  { name: "03-languages", path: "/languages" },
  { name: "04-twi-home", path: "/learn/twi" },
  { name: "05-twi-lesson1", path: "/learn/twi/lesson/tw-l1" },
  { name: "06-pronunciation", path: "/learn/twi/lesson/tw-l1/activity/tw-l1-pronounce" },
  { name: "07-games", path: "/learn/twi/games" },
  { name: "08-audio-matching", path: "/learn/twi/games/audio-matching" },
  { name: "09-parent", path: "/parent" },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await context.newPage();

for (const { name, path } of pages) {
  const url = `${BASE}${path}`;
  console.log(`Capturing ${name}...`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: join(OUT, `${name}.png`),
    fullPage: false,
  });
}

await browser.close();
console.log(`Saved ${pages.length} screenshots to ${OUT}`);
