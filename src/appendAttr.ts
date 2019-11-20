import cheerio from "cheerio";

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

export function matchDomain(src: string, domains?: Tag["domains"]): boolean {
  if (!domains) return true;
  const prefixs = domains.reduce<string[]>((pre, domain) => {
    return pre.concat([`https://${domain}`, `http://${domain}`, `//${domain}`]);
  }, []);

  return prefixs.some(prefix => src.indexOf(prefix) === 0);
}

export default function(rawHtml: string, tags: Tag[]): string {
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
      // match all no-empty attrs
      const domains = (tag.attrs || ["src", "data-src", "href"])
        .map(attr => $(el).attr(attr))
        .filter(Boolean);

      for (const domain of domains) {
        if (!matchDomain(domain, tag.domains)) return;
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
