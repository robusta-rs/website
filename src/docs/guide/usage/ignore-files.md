---
title: Ignore files
description: Control which files Robusta checks, formats, and lints.
---

# Ignore files

Repositories contain Java files that should not be checked, such as generated
sources or vendored code. Robusta's ignore model works the same way locally,
in builds, and in CI.

::: tip
Prefer `ignore-patterns` in `robusta.yaml` over command-line ignore options.
Every developer and every Gradle or Maven run then uses the same ignores.
:::

## Default ignores

Robusta selects `.java` files and automatically ignores:

- Files matched by `.gitignore` files in a selected directory, its
  subdirectories, and its parents up to the repository root, and by the
  repository's `.git/info/exclude` (global Git ignore files are not respected)
- Version-control and build directories found inside a selected directory:
  `.git`, `.gradle`, `.hg`, `.idea`, `.jj`, `.mvn`, `.sl`, `.svn`, `build`,
  `out`, and `target`

Hidden files are not automatically ignored.

`.gitignore` scopes file discovery. A Java file named explicitly on the
command line is still processed even if `.gitignore` matches it, while an
ignored directory named explicitly selects nothing.

## `ignore-patterns`

The recommended approach is to define ignores in your config file using
`ignore-patterns`. Patterns use gitignore syntax and are resolved relative to
the directory containing `robusta.yaml`.

```yaml [robusta.yaml]
ignore-patterns:
  - generated/
  - src/main/java/com/example/legacy/
```

With [nested configs](./nested-config), a module's config can ignore its own
generated sources without affecting the rest of the repository. A pattern
cannot reach outside its configuration directory: one containing `..` is
rejected.

## Ignore from the command line

Command-line options are useful for one-off changes in CI or local debugging.

Use an additional ignore file with gitignore syntax:

```sh
robusta check --ignore-path path/to/ignorefile
```

Add ignore patterns, resolved relative to the current directory:

```sh
robusta check --ignore-pattern 'generated/' --ignore-pattern '*Generated.java'
```

Quote patterns to avoid shell glob expansion.

## Unignoring files

Ignore patterns support negation, which keeps specific files inside an ignored
directory.

To ignore everything under `generated/` except one file, ignore the contents
rather than the directory itself:

```yaml [robusta.yaml]
ignore-patterns:
  - generated/**/*
  - "!generated/Keep.java"
```

On the command line, the last matching `--ignore-pattern` decides, and a `!`
pattern re-includes a path an `--ignore-path` file excluded. No negation can
select a file that `.gitignore` ignores.
