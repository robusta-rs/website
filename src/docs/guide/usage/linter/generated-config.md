---
search: false
---

# Robusta Configuration File

Robusta reads `robusta.yaml` from the directory it processes, or from the
nearest ancestor directory that has one. Every section is optional: an
omitted option falls back to `.editorconfig` where one applies, and then to
Robusta's built-in default.

Usage: `robusta check -c robusta.yaml`

Example

`robusta.yaml`

```yaml
format:
  line-width: 100
  indent-style: space
  indent-width: 4
ignore-patterns:
  - generated/
lint:
  rules:
    unused-import: warn
```

## ignore-patterns

type: `string[]`

Java files to skip when checking, formatting, and linting.

`.gitignore` files and the command-line ignore options still apply: a
`!` pattern here re-includes only a path an earlier entry in this list
skipped.

Gitignore patterns relative to the directory containing `robusta.yaml`.
A pattern with a `..` segment, or one the gitignore syntax cannot express,
is rejected when the file is read.

## lint

type: `object`

Which lint rules run, how loudly, and the run-wide lint options.

Category severities, rule values, overrides, and run-wide options.

### lint.categories

type: `object`

Category severities: correctness defaults to `warn`, other categories to `allow`.

#### lint.categories.correctness

type: `"allow" | "warn" | "deny"`

Code that is wrong or useless.

Configured severity for lint findings.

#### lint.categories.style

type: `"allow" | "warn" | "deny"`

Consistency and readability concerns with no behavioral risk.

Configured severity for lint findings.

#### lint.categories.suspicious

type: `"allow" | "warn" | "deny"`

Constructs that commonly indicate stale or misleading code.

Configured severity for lint findings.

### lint.ignore-patterns

type: `string[]`

Java files to skip when linting, besides those the top-level
`ignore-patterns` skips.

A `!` pattern re-includes only a path an earlier entry in this list
skipped.

Gitignore patterns relative to the directory containing `robusta.yaml`.
A pattern with a `..` segment, or one the gitignore syntax cannot express,
is rejected when the file is read.

### lint.options

type: `object`

Run-wide options, accepted only in the main configuration.

Run-wide reporting options. CLI flags take precedence.

#### lint.options.deny-warnings

type: `boolean`

Fail the run when warnings remain. Equivalent to `--deny-warnings`.
Only the main configuration may set this; defaults to `false`.

#### lint.options.max-warnings

type: `integer`

Fail the run when more warnings remain than this. `--max-warnings` replaces it.
Only the main configuration may set this; defaults to no limit.

#### lint.options.report-unused-suppressions

type: `"allow" | "warn" | "deny"`

Report suppressions that silence no finding, including those for disabled rules.
Only the main configuration may set this; defaults to `allow`.

Configured severity for lint findings.

### lint.overrides

type: `array`

Rule values for the Java files that match globs. When a file matches
several overrides, the later one wins.

#### lint.overrides[n]

type: `object`

Rule values for the Java files one override matches.

##### lint.overrides[n].exclude-files

type: `string[]`

Glob patterns for the files this override leaves out.

Glob patterns relative to the directory containing `robusta.yaml`. `*` does not cross `/`, `**` does, and a pattern without `/` matches a name at any depth.

##### lint.overrides[n].files

type: `string[]`

Glob patterns for the files this override applies to.

Glob patterns relative to the directory containing `robusta.yaml`. `*` does not cross `/`, `**` does, and a pattern without `/` matches a name at any depth.

##### lint.overrides[n].rules

type: `object`

Rule values that replace the ones in effect, as `lint.rules` does.

### lint.rules

type: `object`

Built-in rule IDs mapped to `allow`, `warn`, or `deny`, or to
`[severity, settings]`. Overrides the rule's category severity.
