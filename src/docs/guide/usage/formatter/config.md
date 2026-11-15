---
title: "Configuration | Formatter"
description: Configure Robusta's formatter using a robusta.yaml file.
---

# Configuration

Robusta works out of the box, but most teams commit a `robusta.yaml` to keep
formatting consistent across local runs, builds, and CI.

This page focuses on formatting configuration. Lint rules are configured in the
same file; see the linter's [Configuration](../linter/config).

## Create a config file

To generate a starter config in the current directory:

```sh
robusta init
```

Robusta uses the nearest `robusta.yaml` at or above each Java file's
directory, so a module can keep its own configuration. A config in a child
directory replaces its parent for the files below it; options it omits take
their `.editorconfig` or default values, not the parent's.

If you don't need nested configs, pass `--no-nested-config` to use the
configuration that applies to the current directory for every file. You can
also pass a config explicitly, which also disables nested config lookup:

```sh
robusta format -c ./robusta.yaml
# or
robusta format --config ./robusta.yaml
```

A minimal configuration looks like this:

```yaml [robusta.yaml]
format:
  line-width: 120
```

## Configuration file format

A configuration file is a YAML mapping. Every section is optional. The
top-level fields are:

- `format`: Formatting options such as line width, indentation, import order,
  and Javadoc, and their overrides for file patterns.
- `lint`: Rule and category severities, rule settings, their overrides for
  file patterns, and run-wide options.
- `ignore-patterns`: Ignore additional files from the config file.

For a complete list of fields, see the
[Config file reference](./config-file-reference).

## JSON schema

`robusta init` starts the file with a `yaml-language-server` modeline that
points at Robusta's JSON Schema. Editors with YAML language support use it for
validation, completion, and option descriptions.

## Configure formatting

Formatting options live under `format`:

```yaml [robusta.yaml]
format:
  line-width: 100
  indent-style: space
  indent-width: 4
  javadoc: true
```

Import order is described in [Sorting](./sorting).

## `.editorconfig`

Robusta reads these `.editorconfig` properties for options omitted from
`robusta.yaml`:

- `indent_style` → `format.indent-style`
- `indent_size`, `tab_width` → `format.indent-width`
- `end_of_line` → `format.line-ending`
- `insert_final_newline` → `format.insert-final-newline`
- `max_line_length` → `format.line-width`

Both the root section and glob sections that match a Java file are supported.

```ini
[*]
indent_size = 4

[*.java]
max_line_length = 120
```

Robusta reads the `.editorconfig` files in each Java file's directory and its
parents:

- The search stops at the first file with `root = true`
- A closer file's matching sections take precedence, and `unset` removes a
  value a farther file set

## Overrides

Use `format.overrides` to apply different formatting options to specific
files:

```yaml [robusta.yaml]
format:
  overrides:
    - files: ["**/src/test/**"]
      options:
        line-width: 120
    - files: ["legacy/**"]
      exclude-files: ["legacy/api/**"]
      options:
        line-width: 140
```

Each override entry has:

- `files` (required): Glob patterns to match files.
- `exclude-files` (optional): Glob patterns to exclude from this override.
- `options`: Formatting options to apply.

Glob patterns are resolved relative to the directory containing
`robusta.yaml`.

## Precedence

Each option takes the first available value:

1. The value from the last matching override that sets it.
2. An explicit value in `robusta.yaml`.
3. A matching `.editorconfig` property, for the options it supports.
4. Robusta's built-in default.

An option set to `null`, or left empty, counts as omitted.

## Next steps

- [Ignore files](./ignore-files): Default ignores, `.gitignore` handling, and
  ignore patterns in config or on the command line.
- [Config file reference](./config-file-reference): Full schema and field
  documentation.
- [CLI reference](./cli): Complete list of flags.
