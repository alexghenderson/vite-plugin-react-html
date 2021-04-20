# vite-plugin-react-html

### Warning. This is largely untested and unstable. Use at your own risk.

A vite plugin for rendering html files using react (or, potentially any function).

### Install

Requires vite version: >=2.0.0

`yarn add -D vite-plugin-react-html`
`npm install -D vite-plugin-react-html`

### Usage

Create a template component in `./some-react-component`.

```
import React from 'react';

export const Template = (props: { path: string }) => {
  const { path } = props;
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{path}</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="./main.tsx"></script>
      </body>
    </html>
  );
};
```

In your `vite.config.ts`,

```
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import reactHtml from "vite-plugin-react-html";

import { Template } from "./some-react-component";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    reactHtml({ template: Template }),
  ],
});
```

The plugin will feed the result of the template render function into vite for transpiling/bundling.

### Options

The plugin takes the following options in the configuration:

`template` - The react component function. Accepts `path: string` and `raw: string` for props. `path` is the html file path, and `raw` is the html file contents.

`render` (optional) - The render function used. The default renderer is implemented as followed:

```
export const render = (
  template: RenderTemplate,
  rawHtml: string,
  path: string
) => {
  const body = renderToStaticMarkup(
    React.createElement(template, { path, raw: rawHtml })
  );
  return `<!DOCTYPE html> ${body}`;
};
```

You can pass your own rendering function - it receives the template component, the html file contents, and the html file path as arguments. You can use this to perform a prepass on the template - an example usage of this would be to collect styles to feed into the template.

### Contributing

Contributions are welcome. Feel free to open issues/PRs.
