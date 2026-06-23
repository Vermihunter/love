import { createHash } from "node:crypto";

const answer = process.argv.slice(2).join(" ");

if (!answer) {
  console.error("Usage: node scripts/hash-answer.mjs \"your answer\"");
  process.exit(1);
}

const normalized = answer
  .trim()
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "");

const hash = createHash("sha256").update(normalized).digest("hex");

console.log(`answer:     ${answer}`);
console.log(`normalized: ${normalized}`);
console.log(`hash:       ${hash}`);
