---
title: "Ignore files | Formatter"
description: Control which files Robusta formats.
---

# Ignore files

Robusta provides several ways to exclude files from formatting.

Some ignore mechanisms apply globally, while others are scoped to the config
file they belong to:

| Mechanism                                    | Scope                 |
| -------------------------------------------- | --------------------- |
| `--ignore-pattern` / `--ignore-path`         | Global                |
| `ignore-patterns` / `format.ignore-patterns` | Scoped to that config |

When using [nested config](./config#create-a-config-file), `ignore-patterns`
only applies to files that are resolved by that particular config file. Global
mechanisms always apply regardless of which config file is in effect.

## `ignore-patterns`

The recommended way to ignore files. Add to your `robusta.yaml`:

```yaml [robusta.yaml]
ignore-patterns:
  - generated/
  - src/main/java/com/example/legacy/
```

- Uses `.gitignore` syntax
- Paths are resolved relative to the directory containing `robusta.yaml`; a
  pattern containing `..` is rejected
- Top-level `ignore-patterns` apply to every command; `format.ignore-patterns`
  applies only when formatting

```yaml [robusta.yaml]
format:
  ignore-patterns:
    - src/test/resources/
```

Files matching `ignore-patterns` **cannot be formatted**, even if explicitly
specified.

## `.gitignore`

Robusta respects the same Git ignore rules as Git itself:

- `.gitignore` files in a selected directory and its subdirectories
- `.gitignore` files in parent directories (up to the repository root)
- `.git/info/exclude`

However, global Git ignore files are not read.

Files ignored by `.gitignore` **can still be formatted** if explicitly
specified.

Note that this exception applies to explicitly specified **files** only. A
directory target is still traversed with `.gitignore` applied, so
`robusta format generated` does not format files under an ignored
`generated/`. To format them, specify the files.

## VCS directories

Ignored by default: `.git`, `.hg`, `.jj`, `.sl`, and `.svn`
