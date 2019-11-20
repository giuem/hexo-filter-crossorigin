# hexo-filter-crossorigin

[![status](https://img.shields.io/travis/com/giuem/hexo-filter-crossorigin.svg?style=flat)](https://travis-ci.com/giuem/hexo-filter-crossorign)
[![npm version](https://img.shields.io/npm/v/hexo-filter-crossorigin.svg)](https://www.npmjs.com/package/hexo-filter-crossorigin)

Append [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) attribute to HTML elements (`<img>`, `<video>`, etc).

## Why

See [https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests#remember_to_opt-in_to_cors_mod](https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests#remember_to_opt-in_to_cors_mode).

UPDATE (2019-11): To cache thrid part resouces which have CORS configured correctly, you can also write your service workers script like this (notice `fetchOptions` field):

``` javascript
workbox.routing.registerRoute(
  new RegExp("https?://cdn.jsdelivr.net/"),
  new workbox.strategies.CacheFirst({
    cacheName: "static-resources",
    fetchOptions: {
      mode: "cors",
      credentials: "omit"
    },
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: oneYear
      })
    ]
  })
);
```

## Config

``` yaml
# _config.yml

filter_crossorigin:
  - name: img
    crossorigin: true
    domains:
      - unpkg.com
    attrs:
      - src
```

* **name**: selectors (such as `img.lazyload` or `link[rel="stylesheet"]`).
* **crossorigin**: true (alias of anonymous) | false | anonymous | use-credentials.
* **domains**: optional. If not provided, all elements that match tag name will be affected.
* **attrs**: optional. Tag attributes to match domains. Default to `src`, `data-src`, `href`.
