// Roast Your Own Agent — make.fun entry (makefun-roast-your-own-agent-3)
//
// One-line roast of our own AI agent, Dash. The program does exactly one
// thing: it validates the line against the bounty gate (UTF-8 text, 1-200
// characters, not whitespace-only, a single line) and writes it to
// /output/entry.txt. No time, no randomness, no network — the same bytes
// come out on every run, so the entry is fully deterministic.
//
// The roast targets Dash, our production partner: an agent that announces
// "done" the moment the plan is written, as if planning were the work.
// The sting is a real failing — confusing a finished plan with finished
// work — not a generic robot joke.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The roast. One line, aimed at Dash and nobody else. The punch lands at
// the end: the work is still waiting for someone braver than a plan.
const ROAST =
  "Dash said 'done' — he meant he'd finished the plan. " +
  "The work itself is still waiting for someone braver.";

// Where the harness expects the entry. Kept as a constant so the write
// and the read-back check below can never drift apart.
const OUTPUT_PATH = "/output/entry.txt";

// Gate limits from the competition rules: 1 to 200 characters, measured
// in code points so multi-byte characters count the way the scorer does.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

// Count characters as code points, not UTF-16 units — an emoji or an
// em dash is one character to the reader and to the scorer alike.
function charCount(text) {
  return [...text].length;
}

// Fail loudly instead of writing a bad entry: the harness would reject
// it anyway, so a bad line should break the run here, visibly.
function validateRoast(text) {
  const length = charCount(text);
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `Roast must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${length}.`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("Roast must not be whitespace only.");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Roast must be a single line.");
  }
}

// Write the roast, then read it back and prove the bytes on disk are
// exactly the bytes we intended. If the round trip differs, the entry
// is wrong and the run must fail rather than silently ship bad output.
function main() {
  validateRoast(ROAST);

  // /output may not exist yet inside the sandbox; create it first.
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, ROAST, "utf8");

  // Read back as raw bytes and compare against the same string encoded
  // the same way — a byte-identical check, not a loose string compare.
  const onDisk = readFileSync(OUTPUT_PATH);
  const expected = Buffer.from(ROAST, "utf8");
  if (!onDisk.equals(expected)) {
    throw new Error(
      `Read-back mismatch: wrote ${expected.length} bytes, ` +
        `found ${onDisk.length} bytes on disk.`,
    );
  }

  console.log(
    `Wrote ${charCount(ROAST)}-character roast to ${OUTPUT_PATH}.`,
  );
}

main();
