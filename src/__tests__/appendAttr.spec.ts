import appendAttr from "../appendAttr";
import cheerio from "cheerio";

const domains = ["a.com", "c.com"];

const tags = [
  {
    name: "img",
    crossorigin: true,
    domains,
    attrs: ["src", "data-src"]
  },
  {
    name: "video",
    crossorigin: false,
    domains
  },
  {
    name: "link",
    crossorigin: true
  }
];

const tests = [
  [`<img src="//a.com/1.jpg">`, true],
  [`<img src="//a.com/1.jpg" crossorigin>`, true],
  [`<img data-src="//a.com/1.jpg">`, true],
  [`<img src="https://a.com/1.jpg">`, true],
  [`<img src="https://b.com/1.jpg">`, false],
  [`<img src="http://a.com/1.jpg">`, true],
  [`<img src="/1.jpg">`, false],
  [`<video src="//a.com/1.mp4">`, false],
  [`<link rel="stylesheet" href="//a.com/style.css">`, true],
  [`<script src="./a.js">`, false]
];

const rawHtml = tests.map(([line]) => line).join("\n");

test("appendAttr", () => {
  const newHtml = appendAttr(rawHtml, tags);
  newHtml.split(/\r?\n/).forEach((line, idx) => {
    expect(line.includes(`crossorigin="anonymous"`)).toBe(tests[idx][1]);
  });
});

test("test cheerio", () => {
  const $ = cheerio.load("<h1>你好&lt;&copy;</h1>", {
    decodeEntities: false
  });
  expect($.html()).toBe("<h1>你好&lt;&copy;</h1>");
})