import appendAttr, { Tag } from "./appendAttr";

const options: Tag[] = hexo.config["filter_crossorigin"];

if (options && Array.isArray(options))  {
  hexo.extend.filter.register("after_render:html", str => {
    const result = appendAttr(str, options);
    return result;
  });
}

