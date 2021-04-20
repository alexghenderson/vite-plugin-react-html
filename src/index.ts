import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { Plugin } from "vite";

export type RenderTemplate = (props: {
  path: string;
  raw: string;
}) => React.ReactElement;

export type RenderFunction = (
  templae: RenderTemplate,
  rawHtml: string,
  path: string
) => string;

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

export type ReactHtmlOptions = {
  template: RenderTemplate;
  render?: RenderFunction;
};

export function reactHtml(options: ReactHtmlOptions): Plugin {
  return {
    name: "vite:reactHtml",
    transformIndexHtml: {
      enforce: "pre",
      transform(html, ctx) {
        const { render: renderFn = render, template } = options;
        return renderFn(template, html, ctx.path);
      },
    },
  };
}

export default reactHtml;
