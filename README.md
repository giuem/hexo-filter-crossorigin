# hexo-filter-crossorigin

[![status](https://img.shields.io/travis/com/giuem/hexo-filter-crossorigin.svg?style=flat)](https://travis-ci.com/giuem/hexo-filter-crossorign)

Append [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) attribute to HTML elements (`<img>`, `<video>`, etc).

## Why

See [https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests#remember_to_opt-in_to_cors_mod](https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests#remember_to_opt-in_to_cors_mode).

## Config

``` yaml
filter_crossorigin:
  - name: img # tag name
    crossorigin: true # 
    domains:
      - unpkg.com
```

* **name**: tag name
* **crossorigin**: true(alias of anonymous) | false | anonymous | use-credentials
* **domains**: optional. If not provided, all elements that match tag name will be affected.
