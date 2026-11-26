import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
import { ruleHowToUseMdPlugin } from "./plugins/ruleHowToUse";
import llmstxt from "vitepress-plugin-llms";

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
    config(md) {
      md.use(ruleHowToUseMdPlugin);
      md.use(groupIconMdPlugin);
    },
  },
  themeConfig: {
    logo: { light: "/robusta-dark.svg", dark: "/robusta-light.svg", alt: "Robusta" },
    siteTitle: false,
    nav: [
      { text: "Guide", link: "/docs/guide/introduction" },
      {
        text: "Tools",
        items: [
          { text: "Linter", link: `${usage}linter` },
          { text: "Formatter", link: `${usage}formatter` },
        ],
      },
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
        collapsed: false,
        items: [
          { text: "What is Robusta?", link: "/docs/guide/what-is-robusta" },
          { text: "Getting Started", link: "/docs/guide/introduction" },
        ],
      },
      {
        text: "Linter",
        collapsed: true,
        link: `${usage}linter`,
        items: [
          { text: "Overview", link: `${usage}linter` },
          {
            text: "Configure and integrate",
            items: [
              { text: "Quickstart", link: `${usage}linter/quickstart` },
              { text: "Configuration", link: `${usage}linter/config` },
              { text: "Gradle", link: `${usage}gradle` },
              { text: "Maven", link: `${usage}maven` },
              { text: "CI & other setup", link: `${usage}linter/ci` },
              { text: "Nested configs", link: `${usage}linter/nested-config` },
            ],
          },
          {
            text: "Features",
            items: [
              { text: "Automatic fixes", link: `${usage}linter/automatic-fixes` },
              { text: "Ignore files", link: `${usage}linter/ignore-files` },
              { text: "Inline suppressions", link: `${usage}linter/ignore-comments` },
              { text: "Suppression baseline", link: `${usage}linter/baseline` },
              { text: "Output formats", link: `${usage}linter/output-formats` },
            ],
          },
          {
            text: "Reference",
            items: [
              { text: "Rules reference", link: `${usage}linter/rules` },
              { text: "CLI reference", link: `${usage}linter/cli` },
              { text: "Config file reference", link: `${usage}linter/config-file-reference` },
            ],
          },
        ],
      },
      {
        text: "Formatter",
        collapsed: true,
        link: `${usage}formatter`,
        items: [
          { text: "Overview", link: `${usage}formatter` },
          {
            text: "Configure and integrate",
            items: [
              { text: "Quickstart", link: `${usage}formatter/quickstart` },
              { text: "Configuration", link: `${usage}formatter/config` },
              { text: "Gradle", link: `${usage}gradle` },
              { text: "Maven", link: `${usage}maven` },
              { text: "CI & other setup", link: `${usage}formatter/ci` },
            ],
          },
          {
            text: "Features",
            items: [
              { text: "Ignore files", link: `${usage}formatter/ignore-files` },
              { text: "Sorting", link: `${usage}formatter/sorting` },
            ],
          },
          {
            text: "Reference",
            items: [
              { text: "CLI reference", link: `${usage}formatter/cli` },
              {
                text: "Configuration file reference",
                link: `${usage}formatter/config-file-reference`,
              },
            ],
          },
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
      pattern({ filePath, frontmatter }) {
        // Auto-generated rule pages should link to the Rust source in the robusta repo
        if (frontmatter.source) {
          return `https://github.com/robusta-rs/robusta/edit/main/${frontmatter.source}`;
        }

        return `https://github.com/robusta-rs/website/edit/main/src/${filePath}`;
      },
      text: "Suggest changes to this page",
    },
  },
  vite: {
    publicDir: resolve(dirname(fileURLToPath(import.meta.url)), "../public"),
    plugins: [groupIconVitePlugin(), llmstxt()],
    resolve: {
      alias: [
        {
          find: "@data",
          replacement: resolve(dirname(fileURLToPath(import.meta.url)), "data"),
        },
      ],
    },
  },
});
