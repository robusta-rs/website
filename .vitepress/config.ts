import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitepress";

const TITLE = "Robusta";
const DESCRIPTION = "Format and lint Java with one native executable.";

const usage = "/docs/guide/usage/";

export default defineConfig({
  title: TITLE,
  description: DESCRIPTION,
  srcDir: "src",
  outDir: "build",
  cleanUrls: true,
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    // Open Graph
    ["meta", { property: "og:site_name", content: TITLE }],
  ],
  transformPageData(pageData) {
    pageData.frontmatter.head ??= [];

    const title = pageData.frontmatter.title || pageData.title;
    const description = pageData.frontmatter.description || pageData.description || DESCRIPTION;

    if (title) {
      pageData.frontmatter.head.push(["meta", { property: "og:title", content: title }]);
    }
    pageData.frontmatter.head.push(["meta", { property: "og:description", content: description }]);
  },
  markdown: {
    theme: { light: "gruvbox-light-medium", dark: "gruvbox-dark-medium" },
  },
  themeConfig: {
    logo: { light: "/robusta-dark.svg", dark: "/robusta-light.svg", alt: "Robusta" },
    siteTitle: false,
    nav: [
      { text: "Guide", link: "/docs/guide/introduction" },
      {
        text: "Resources",
        items: [
          { text: "Releases", link: "https://github.com/robusta-rs/robusta/releases" },
          { text: "Website GitHub", link: "https://github.com/robusta-rs/website" },
        ],
      },
    ],
    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "What is Robusta?", link: "/docs/guide/what-is-robusta" },
          { text: "Getting Started", link: "/docs/guide/introduction" },
        ],
      },
      {
        text: "Configure and integrate",
        items: [
          { text: "Quickstart", link: `${usage}quickstart` },
          { text: "Configuration", link: `${usage}config` },
          { text: "Gradle", link: `${usage}gradle` },
          { text: "Maven", link: `${usage}maven` },
          { text: "CI & other setup", link: `${usage}ci` },
          { text: "Nested configs", link: `${usage}nested-config` },
        ],
      },
      {
        text: "Features",
        items: [
          { text: "Automatic fixes", link: `${usage}automatic-fixes` },
          { text: "Ignore files", link: `${usage}ignore-files` },
          { text: "Inline suppressions", link: `${usage}ignore-comments` },
          { text: "Suppression baseline", link: `${usage}baseline` },
          { text: "Output formats", link: `${usage}output-formats` },
          { text: "Sorting", link: `${usage}sorting` },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "CLI reference", link: `${usage}cli` },
          { text: "Config file reference", link: `${usage}config-file-reference` },
        ],
      },
    ],
    search: { provider: "local" },
    socialLinks: [{ icon: "github", link: "https://github.com/robusta-rs/robusta" }],
    footer: {
      copyright: `© ${new Date().getFullYear()} Thomas Ropke`,
    },
    outline: {
      level: [2, 3],
    },
    editLink: {
      pattern: "https://github.com/robusta-rs/website/edit/main/src/:path",
      text: "Suggest changes to this page",
    },
  },
  vite: {
    publicDir: resolve(dirname(fileURLToPath(import.meta.url)), "../public"),
  },
});
