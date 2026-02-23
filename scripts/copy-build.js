#!/usr/bin/env node
/**
 * Prepares build artifacts for Firebase deploy:
 *   1. Copies .next/static → public/_next/static  (served by Firebase Hosting CDN)
 *   2. Copies prerendered HTML pages → public/    (served statically by Firebase Hosting)
 */

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

function copyDir(src, dest) {
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.cpSync(src, dest, { recursive: true });
}

// 1. Static assets → Firebase Hosting CDN (/_next/static/*)
console.log("Copying .next/static → public/_next/static …");
const staticSrc = path.join(root, ".next", "static");
const staticDest = path.join(root, "public", "_next", "static");
if (fs.existsSync(staticSrc)) {
  fs.mkdirSync(path.dirname(staticDest), { recursive: true });
  copyDir(staticSrc, staticDest);
  console.log("  ✓ static assets copied");
} else {
  console.warn("  ⚠ .next/static not found — run `next build` first");
  process.exit(1);
}

// 2. Prerendered HTML files → public/
console.log("Copying prerendered HTML → public/ …");
const appDir = path.join(root, ".next", "server", "app");
const publicDir = path.join(root, "public");

const htmlPages = [
  { src: "index.html",      dest: "index.html" },
  { src: "_not-found.html", dest: "404.html" },
];

for (const { src, dest } of htmlPages) {
  const srcPath = path.join(appDir, src);
  const destPath = path.join(publicDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(srcPath, destPath);
    console.log(`  ✓ ${src} → public/${dest}`);
  } else {
    console.warn(`  ⚠ ${src} not found (skipping)`);
  }
}

console.log("\nBuild artifacts ready for Firebase deploy.");
