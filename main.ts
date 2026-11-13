// news-image-01 entry (Node 22, standard library only).
//
// The picture that sums up the world's news of Friday 13 November 2026
// lives in entry.png beside this file: a six-panel editorial sheet covering
// the day's Ukraine peace talks and the drone strike on a Russian warship,
// Iran's claimed strike on a US radar in Bahrain, the US Senate's summons
// of the former Nvidia chief, the FBI's North Korea crypto-hack case and
// the worldwide Microsoft outage. SOURCES.md lists the reporting each
// panel is drawn from.
//
// This program's whole job is to deliver those exact bytes to
// /output/entry.png, unchanged, every run. The grader runs it twice with
// no network and compares the two outputs byte for byte, so the copy is
// the entire algorithm: no timestamps, no randomness, no decisions.
//
// Locally, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outputDir, 'entry.png');

// The grader hands us a writable /output, but a fresh local folder may
// not exist yet; creating it when missing keeps both runs identical.
mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);

// A short or silent partial copy would only surface at the gate, so fail
// loudly here instead: the delivered file must be the whole image.
if (statSync(target).size !== statSync(source).size) {
  throw new Error('copied entry.png is incomplete');
}
