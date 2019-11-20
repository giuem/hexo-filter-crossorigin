import cheerio from "cheerio";
import URL from "url";

export interface Tag {
  name: string;
  crossorigin: boolean | "anonymous" | "use-credentials";
  domains?: string[];
  attrs?: string[];
}

export function getCrossOriginValue(
  value: Tag["crossorigin"]
): false | "anonymous" | "use-credentials" {
  if (typeof value === "undefined") return false;

  if (typeof value === "boolean") {
    return value ? "anonymous" : false;
  }
  return value;
}

export function matchDomain(link: string, domains?: Tag["domains"]): boolean {
  if (!domains) return true;
  const hostname = URL.parse(link, false, true).hostname;
  if (!hostname) return false;

  return domains.some(domain => domain === hostname);
}

export default function appendAttr(rawHtml: string, tags: Tag[]): string {
  const $ = cheerio.load(rawHtml, {
    decodeEntities: false
  });

  tags.forEach(tag => {
    const crossoriginValue = getCrossOriginValue(tag.crossorigin);
    if (!crossoriginValue) return;

    if (!tag.attrs) {
      tag.attrs = ["src", "data-src", "href"];
    }

    $(tag.name).each((i, el) => {
      // get all no-empty domain
      const links = (tag.attrs || ["src", "data-src", "href"])
        .map(attr => $(el).attr(attr))
        .filter(Boolean);

      for (const link of links) {
        if (!matchDomain(link, tag.domains)) return;
      }

      $(el).attr("crossorigin", crossoriginValue);
    });
  });

  const html = $.html();
  if (!html) {
    throw new Error("Failed to get html text!");
  }

  return html;
}
