# Robusta Configuration File

Robusta reads `robusta.yaml` from the directory it processes, or from the
nearest ancestor directory that has one. Every section is optional: an
omitted option falls back to `.editorconfig` where one applies, and then to
Robusta's built-in default.

Usage: `robusta lint -c robusta.yaml`

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
  categories: {}
  rules:
    unused-import: warn
```

## format

type: `object`

Java formatter policy.

Java formatter settings. Omitted values use `.editorconfig` fallbacks and
then Robusta's built-in defaults.

### format.continuation-indent-width

type: `integer`

Spaces added to wrapped continuation lines. Defaults to twice `indent-width`.

### format.import-order

type: `object`

Order imports are emitted in.

Import-kind sections and package-prefix groups, in emitted order.

#### format.import-order.groups

type: `array`

Package-prefix groups in emitted order.

##### format.import-order.groups[n]

type: `array | string`

One package-prefix group in the emitted order.

A string is a single prefix; a list is several prefixes sharing one group.
`*` is the catch-all group every import not matched by a named prefix
falls into.

###### format.import-order.groups[n][n]

type: `string`

#### format.import-order.sections

type: `array`

Import kinds in emitted section order.

##### format.import-order.sections[n]

type: `"static" | "module" | "type"`

One import kind, as a section in the emitted order.

`static` covers static imports, `module` covers module imports, and
`type` covers everything else.

### format.indent-style

type: `"space" | "tab"`

Character style used for structural indentation.

The character style used for structural indentation.

`space` indents with spaces. `tab` emits one tab per level and treats
`indent-width` as the width a tab is displayed at.

### format.indent-width

type: `integer`

Display columns per indentation level and per tab in tab mode.

### format.insert-final-newline

type: `boolean`

Whether non-empty formatted output ends with one line terminator.

### format.javadoc

type: `object | boolean`

Javadoc comment formatting.

Javadoc formatting: `false` keeps comments as written, `true` formats them
with the default settings, and a mapping formats them with the named
settings.

#### format.javadoc.capitalize-descriptions

type: `boolean`

Capitalize the first word of each description paragraph. Default: `false`.

#### format.javadoc.comment-line-strategy

type: `"single-line" | "multiline" | "keep"`

When a traditional comment uses the single-line form. Default: `single-line`.

`single-line` writes `/** Content. */` when a comment without block tags
fits, `multiline` never does, and `keep` does only for a comment already on
one line.

#### format.javadoc.description-with-dot

type: `boolean`

End each description paragraph that ends in a letter or digit with a
period. Default: `false`.

#### format.javadoc.line-wrapping-style

type: `"greedy" | "keep"`

Whether paragraphs are rewrapped or keep line breaks that fit. Default: `greedy`.

`greedy` fills each line to the line width. `keep` keeps a paragraph's line
breaks when every line fits.

#### format.javadoc.separate-tag-groups

type: `"never" | "before-return" | "always"`

Where blank lines separate block tags. Default: `never`.

`never` keeps block tags together, `before-return` adds a blank line before
`@return`, and `always` adds one between block tags of different kinds.

### format.line-ending

type: `"auto" | "lf" | "crlf" | "cr"`

Line terminator emitted by the formatter.

The line terminator the formatter emits.

`auto` resolves per file from the file's own bytes — the first terminator
wins, LF when the file has none — and is never derived from the host
platform. `lf`, `crlf`, and `cr` force that ending for every file.

### format.line-width

type: `integer`

Target maximum line width in Unicode display columns.

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

Which lint rules run, and how loudly.

Category severities and per-rule overrides.

### lint.categories

type: `Record<string, string>`

default: `{}`

Category severities: correctness defaults to `warn`, other categories to `allow`.

### lint.rules

type: `Record<string, string>`

default: `{}`

Built-in rule IDs mapped to `allow`, `warn`, or `deny`.
Overrides the rule's category severity.

## options

type: `object`

Run-wide options, accepted only in the main configuration.

Run-wide reporting options. CLI flags take precedence.

### options.deny-warnings

type: `boolean`

Fail the run when warnings remain. Equivalent to `--deny-warnings`.
Only the main configuration may set this; defaults to `false`.

### options.max-warnings

type: `integer`

Fail the run when more warnings remain than this. `--max-warnings` replaces it.
Only the main configuration may set this; defaults to no limit.

### options.report-unused-suppressions

type: `"allow" | "warn" | "deny"`

Report suppressions that silence no finding, including those for disabled rules.
Only the main configuration may set this; defaults to `allow`.

Configured severity for lint findings.
