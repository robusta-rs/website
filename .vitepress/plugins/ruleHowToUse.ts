import type MarkdownIt from "markdown-it";

function parseFrontmatter(src: string): Record<string, string> {
  const match = src.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line
      .slice(colonIdx + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    result[key] = value;
  }
  return result;
}

function generateCodeGroup(frontmatter: Record<string, unknown>): string {
  const rule = frontmatter.rule as string;

  return [
    "To **enable** this rule using the config file or in the CLI, you can use:",
    "",
    "::: code-group",
    "",
    "```yaml [Config (robusta.yaml)]",
    "lint:",
    "  rules:",
    `    ${rule}: deny`,
    "```",
    "",
    "```bash [CLI]",
    `robusta lint --deny ${rule}`,
    "```",
    "",
    ":::",
  ].join("\n");
}

export function ruleHowToUseMdPlugin(md: MarkdownIt): void {
  const parse = md.parse.bind(md);
  md.parse = (src: string, env: Record<string, unknown>) => {
    if (src.includes("<RuleHowToUse />")) {
      const data = parseFrontmatter(src);
      src = src.replace("<RuleHowToUse />", generateCodeGroup(data));
    }
    return parse(src, env);
  };
}
