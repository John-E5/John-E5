// Refreshes the generated sections of README.md:
//   BLOG: the latest posts from the drift-ci blog RSS feed.
//   OSS:  pull requests merged into other people's repositories in the last year (hidden when there are none).
// A section whose source fails keeps its previous content, so a flaky feed never blanks the profile.
// Usage: GITHUB_TOKEN=... node scripts/update-readme.mjs
import { readFileSync, writeFileSync } from "node:fs";

const USER = "John-E5";
const OWN_ORGS = ["Drift-CI"];
const FEED = "https://drift-ci.com/blog/rss.xml";
const README = new URL("../README.md", import.meta.url);
const POSTS = 4;
const PRS = 6;

const decode = (s) =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").trim();
const md = (s) => s.replace(/([\[\]])/g, "\\$1");
const day = (d) => new Date(d).toLocaleDateString("en-IE", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

async function blogSection() {
  const res = await fetch(FEED);
  if (!res.ok) throw new Error(`feed ${res.status}`);
  const xml = await res.text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, POSTS).map(([, item]) => {
    const tag = (t) => decode(item.match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`))?.[1] ?? "");
    return `- [${md(tag("title"))}](${tag("link")}) · ${day(tag("pubDate"))}`;
  });
  if (items.length === 0) throw new Error("feed has no items");
  return items.join("\n");
}

async function ossSection() {
  const since = new Date(Date.now() - 365 * 86_400_000).toISOString().slice(0, 10);
  const q = [`is:pr`, `is:merged`, `author:${USER}`, `-user:${USER}`, ...OWN_ORGS.map((o) => `-org:${o}`), `merged:>=${since}`].join(" ");
  const res = await fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(q)}&sort=updated&order=desc&per_page=${PRS}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "profile-readme-updater",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`search ${res.status}`);
  const { items } = await res.json();
  if (items.length === 0) return "";
  const rows = items.map((i) => {
    const repo = i.repository_url.split("/").slice(-2).join("/");
    return `- [${repo}](https://github.com/${repo}): [${md(i.title)}](${i.html_url})`;
  });
  return ["### Recent open-source contributions", "", ...rows].join("\n");
}

function replaceSection(text, name, body) {
  const re = new RegExp(`(<!-- ${name}:START -->)[\\s\\S]*?(<!-- ${name}:END -->)`);
  if (!re.test(text)) throw new Error(`markers for ${name} not found`);
  return text.replace(re, `$1\n${body}${body ? "\n" : ""}$2`);
}

const before = readFileSync(README, "utf8");
let after = before;
for (const [name, build] of [["BLOG", blogSection], ["OSS", ossSection]]) {
  try {
    after = replaceSection(after, name, await build());
  } catch (err) {
    console.warn(`${name}: kept previous content (${err.message})`);
  }
}
if (after !== before) {
  writeFileSync(README, after);
  console.log("README.md updated");
} else {
  console.log("README.md unchanged");
}
