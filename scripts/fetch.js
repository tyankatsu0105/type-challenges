const ghGot = require("gh-got");
const fs = require("fs-extra");
const path = require("path");

const OUTPUT_PATH = path.join(
  __dirname,
  "../",
  "_templates",
  "generate",
  "question",
  "list.json"
);

(async () => {
  const { body } = await ghGot(
    "repos/type-challenges/type-challenges/contentsquestions"
  );
  const data = body
    .map((item) => item.name)
    .sort((a, b) => Number(a.split("-")[0]) - Number(b.split("-")[0]));

  await fs.outputJson(OUTPUT_PATH, { data });
})();
