import cheerio from "cheerio";

export interface Tag {
  name: string;
  crossorigin: boolean | "anonymous" | "use-credentials";
  domains?: string[];
}

export function getValue(
  value: Tag["crossorigin"]
): false | "anonymous" | "use-credentials" {
  if (typeof value === "undefined") return false;

  if (typeof value === "boolean") {
    return value ? "anonymous" : false;
  }
  return value;
}

export function matchDomain(src: string, domains?: Tag["domains"]): boolean {
  return domains
    ? domains
        .reduce<string[]>((pre, domain) => {
          return pre.concat([
            `https://${domain}`,
            `http://${domain}`,
            `//${domain}`
          ]);
        }, [])
        .some(prefix => {
          return src.indexOf(prefix) === 0;
        })
    : true;
}

export default function(rawHtml: string, tags: Tag[]): string {
  const $ = cheerio.load(rawHtml, {
    decodeEntities: false
  });

  tags.forEach((tag) => {
    const attr = getValue(tag.crossorigin);
    if (!attr) return;

    $(tag.name).each((i, el) => {
      const src = $(el).attr('src') || $(el).attr('href');
      if (!src || !matchDomain(src, tag.domains)) return;

      $(el).attr('crossorigin', attr)
    })
  })

  const html = $.html();
  if (!html) {
    throw new Error("Failed to get html text!");
  }

  return html;
}
