---
title: Configuration
description: Configure Robusta using a robusta.yaml file.
---

# Configuration

Robusta works out of the box, but most teams commit a `robusta.yaml` to keep
formatting and linting consistent across local runs, builds, and CI.

This page focuses on project configuration: formatting, rules, categories, and
run options.

## Create a config file

To generate a starter config in the current directory:

```sh
robusta init
```

Robusta uses the nearest `robusta.yaml` at or above each Java file's
directory. You can also pass a config explicitly, which disables
[nested config](./nested-config) lookup:

```sh
robusta check -c ./robusta.yaml
# or
robusta check --config ./robusta.yaml
```

A minimal configuration looks like this:

```yaml [robusta.yaml]
format:
  line-width: 120
lint:
  categories:
    correctness: deny
  rules:
    unused-import: warn
```

## Configuration file format

A configuration file is a YAML mapping. Every section is optional. The
top-level fields are:

- `format`: Formatting options such as line width, indentation, import order,
  and Javadoc.
- `lint`: Rule and category severities.
- `ignore-patterns`: Ignore additional files from the config file.
- `options`: Run-wide options, accepted only in the main configuration.

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

Robusta uses only the nearest `.editorconfig` above each file; nested
`.editorconfig` files are not merged.

## Configure run options

Use `options` for run-wide behavior:

```yaml [robusta.yaml]
options:
  deny-warnings: true
  max-warnings: 10
  report-unused-suppressions: warn
```

- `options.deny-warnings` is equivalent to passing `--deny-warnings`.
- `options.max-warnings` is equivalent to passing `--max-warnings`.
- `options.report-unused-suppressions` sets the severity of
  [unused suppressions](./ignore-comments#report-unused-suppressions).

CLI flags take precedence when both CLI and config values are present.
`options` is only supported in the main configuration, the one that applies to
the current directory. A nested config that sets it is rejected.

## Configure rules

Rules are configured under `lint.rules`. A rule value is a severity:

- Disable the rule: `allow`
- Report findings as warnings: `warn`
- Report findings as errors, failing the run: `deny`

```yaml [robusta.yaml]
lint:
  rules:
    unused-import: deny
    modifier-order: warn
    unused-local-variable: allow
```

`robusta lint --rules` lists every rule.

### Override severity from the CLI

For quick experiments, you can adjust severity from the command line using:

- `-A` / `--allow`
- `-W` / `--warn`
- `-D` / `--deny`

Arguments apply after the configuration, from left to right:

```sh
robusta lint -D unused-import -W modifier-order -A unused-local-variable
```

## Enable groups of rules with categories

Categories let you set the severity of rules with similar intent. By default,
`correctness` rules warn and the other categories are allowed.

```yaml [robusta.yaml]
lint:
  categories:
    correctness: deny
    suspicious: warn
    style: warn
```

The categories are:

- `correctness`: Code that is wrong or useless.
- `suspicious`: Constructs that commonly indicate stale or misleading code.
- `style`: Consistency and readability concerns with no behavioral risk.

A rule set under `lint.rules` overrides its category. You can also change
categories from the CLI with the same `-A`, `-W`, and `-D` options, and `all`
selects every rule:

```sh
robusta lint -D correctness -W style
```

## Precedence

Each option takes the first available value:

1. A command-line flag, where one exists.
2. An explicit value in `robusta.yaml`.
3. A matching `.editorconfig` property, for the options it supports.
4. Robusta's built-in default.

An option set to `null`, or left empty, counts as omitted.

## Next steps

- [Nested configs](./nested-config)
- [Ignore files](./ignore-files)
- [Config file reference](./config-file-reference)
