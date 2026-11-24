// Two Days of Quiet Dread — make.fun entry
// Writes one code-review comment to /output/entry.txt:
// a single line (<=140 chars) that approves a PR while carrying
// quiet existential dread.
//
// Why this line:
// - "LGTM" is a real approval, so it reads like a comment a tired
//   engineer would actually paste before clicking approve.
// - The dread is quiet and code-specific: not a cry for help, just
//   the flat observation that code outlives its authors and the next
//   maintainer inherits our choices without our context.
// - The laugh comes from the dread itself (the approval is genuine;
//   the dread is the price of shipping), not from a joke bolted on.
// - "a stranger will inherit this code" is a fresher turn than the
//   stock "ship it and pray" line, and it stays understated.
import { mkdirSync, writeFileSync } from "node:fs";

const MAX_CHARS = 140;

const COMMENT =
  "LGTM. Tests pass, diff is clean, and someday a stranger will inherit this code and wonder what we were thinking.";

// Validation gate: the sealed scorer requires UTF-8 text of 1 to 140
// characters, a single line, and more than whitespace. Fail loudly
// rather than writing an entry that could never be judged.
if (
  COMMENT.length < 1 ||
  COMMENT.length > MAX_CHARS ||
  COMMENT.includes("\n") ||
  COMMENT.trim().length === 0
) {
  throw new Error(
    `entry invalid: ${COMMENT.length} chars, must be 1-${MAX_CHARS} chars, one line, non-whitespace`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", COMMENT, "utf8");
