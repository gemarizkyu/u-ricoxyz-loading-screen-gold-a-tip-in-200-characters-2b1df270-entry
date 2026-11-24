// Loading Screen Gold: A Tip in 200 Characters
// make.fun bounty: u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270
//
// Program (harness program/v1): writes one loading-screen tip, at most
// 200 characters, to /output/entry.txt. No network, no model calls, no
// randomness, no wall clock: the output is fully deterministic, so every
// run writes the exact same bytes.
//
// The tip is built from its beats so each part of the joke is visible:
// the setup (the agent did the impossible), the turn (it actually works),
// the punchline (trust it... but verify everything else it touched).
//
// Verified locally: the tip is 144 characters, one line, UTF-8 —
// inside the gate of 1..200 characters, with room to spare.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

const SETUP =
  "Tip: your AI agent just rewrote the function you debugged for an hour";
const TURN = "and it works.";
const PUNCHLINE =
  "Say thanks, then quietly check everything else it touched.";

function buildTip(): string {
  // One line, every word working: setup, turn, punchline.
  return `${SETUP} \u2014 ${TURN} ${PUNCHLINE}`;
}

function main(): void {
  const tip = buildTip();

  // Gate, mirrored locally: 1..200 UTF-8 characters, one line, not blank.
  if (tip.length < 1 || tip.length > MAX_CHARS) {
    throw new Error(`tip is ${tip.length} chars, must be 1..${MAX_CHARS}`);
  }
  if (tip.includes("\n") || tip.trim().length === 0) {
    throw new Error("tip must be a single non-blank line");
  }

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), tip, "utf8");
}

main();
