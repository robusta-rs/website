# Command summary

- [`robusta`↴](#robusta)
- [`robusta check`↴](#robusta-check)
- [`robusta format`↴](#robusta-format)
- [`robusta lint`↴](#robusta-lint)
- [`robusta init`↴](#robusta-init)
- [`robusta config`↴](#robusta-config)

## robusta

Format and lint Java source files.

## Usage

**`robusta`** _`COMMAND ...`_

## Available options:

- **`-h`**, **`--help`** &mdash;
  Prints help information
- **`-V`**, **`--version`** &mdash;
  Prints version information

## Available commands:

- **`check`** &mdash;
  Verify Java formatting and lints; optionally preview or apply fixes.
- **`format`** &mdash;
  Verify Java formatting; optionally preview or apply changes.
- **`lint`** &mdash;
  Verify enabled lint rules; optionally preview or apply transformations.
- **`init`** &mdash;
  Create `robusta.yaml` in the current directory, failing if it exists.
- **`config`** &mdash;
  Print the resolved configuration for the current directory as YAML.

## robusta check

Verify Java formatting and lints; optionally preview or apply fixes.

**Usage**: **`robusta`** **`check`** \[**`-c`**=_`PATH`_\] \[**`--no-nested-config`**\] \[**`--ignore-path`**=_`PATH`_\]... \[**`--ignore-pattern`**=_`PAT`_\]... \[**`-A`**=_`NAME`_ | **`-W`**=_`NAME`_ | **`-D`**=_`NAME`_\]... \[**`--fix`**\] \[**`--fix-suggestions`**\] \[**`--fix-dangerously`**\] \[**`--diff`** | **`--list-different`**\] \[**`--prune-suppressions`**\] \[**`--report-unused-suppressions`** | **`--report-unused-suppressions-severity`**=_`SEVERITY`_\] \[**`--reporter`**=_`FORMAT`_\] \[**`--debug`**=_`OPTIONS`_\] \[**`--quiet`**\] \[**`--deny-warnings`**\] \[**`--max-warnings`**=_`INT`_\] \[**`--silent`**\] \[**`--no-error-on-unmatched-pattern`**\] \[**`--threads`**=_`INT`_\] \[**`--color`**=_`WHEN`_\] \[**`--stdin-filepath`**=_`PATH`_\] \[_`PATH`_\]...

## Configuration options:

- **`-c`**, **`--config`**=_`PATH`_ &mdash;
  Use this configuration file instead of discovering `robusta.yaml`.
- **`    --no-nested-config`** &mdash;
  Use one configuration discovered from the current directory.

## Ignore options:

- **`    --ignore-path`**=_`PATH`_ &mdash;
  Path to an additional gitignore-syntax file. Can be specified multiple times.
- **`    --ignore-pattern`**=_`PAT`_ &mdash;
  Gitignore-syntax pattern to exclude, resolved from the working directory. Quote it so the shell does not expand it. These patterns are ordered and outrank `--ignore-path` files: the last one to match decides, and a leading `!` reincludes. Can be specified multiple times.

## Rule filter options, applied over the configuration, left to right:

For example `-D style -A uppercase-long-suffix`.

The categories are:

- `correctness` - Code that is wrong or useless.
- `style` - Consistency and readability concerns with no behavioral risk.
- `suspicious` - Constructs that commonly indicate stale or misleading code.
- `all` - All registered rules.

Arguments:

- **`-A`**, **`--allow`**=_`NAME`_ &mdash;
  Disable a rule, a category, or `all` for this run.
- **`-W`**, **`--warn`**=_`NAME`_ &mdash;
  Set a rule, a category, or `all` to warn for this run.
- **`-D`**, **`--deny`**=_`NAME`_ &mdash;
  Set a rule, a category, or `all` to deny for this run.

## Fix options:

- **`    --fix`** &mdash;
  Fix as many issues as possible. Only unfixed issues are reported.
- **`    --fix-suggestions`** &mdash;
  Apply auto-fixable suggestions. May change program behavior. Combines with --fix.
- **`    --fix-dangerously`** &mdash;
  Apply dangerous fixes and suggestions.

## Warning options:

- **`    --quiet`** &mdash;
  Disable reporting on warnings; only errors are reported.
- **`    --deny-warnings`** &mdash;
  Ensure warnings produce a non-zero exit code.
- **`    --max-warnings`**=_`INT`_ &mdash;
  Fail when warning-level rule violations exceed this threshold.
- **`    --silent`** &mdash;
  Do not display any diagnostics.

## Runtime options:

- **`    --no-error-on-unmatched-pattern`** &mdash;
  Do not exit with an error when no files are selected.
- **`    --threads`**=_`INT`_ &mdash;
  Number of threads to use. Set to 1 for using only 1 CPU core.

## Color options:

- **`    --color`**=_`WHEN`_ &mdash;
  When to use colors: auto, always, or never.

## Available positional items:

- _`PATH`_ &mdash;
  Java source file or directory to process. Defaults to the current directory. Paths must not contain a `..` component.

## Available options:

- **`    --diff`** &mdash;
  Print a unified diff for files that would be changed, and the report to stderr.
- **`    --list-different`** &mdash;
  Print only the paths of files that would be changed, and the report to stderr.
- **`    --prune-suppressions`** &mdash;
  Lower or remove obsolete counts in `robusta-suppressions.json`; never raise them.
- **`    --report-unused-suppressions`** &mdash;
  Report suppressions like `@SuppressWarnings("robusta:<rule>")` and `//NOROBUSTA` that match no finding. --fix-suggestions removes them.
- **`    --report-unused-suppressions-severity`**=_`SEVERITY`_ &mdash;
  Same as --report-unused-suppressions, at severity allow, warn, or deny. Overrides the configuration.
- **`    --reporter`**=_`FORMAT`_ &mdash;
  Report format: default, json, checkstyle, github, gitlab, azure-devops, unix, agent, sarif, stylish, or junit.
- **`    --debug`**=_`OPTIONS`_ &mdash;
  Enable comma-separated debug options: timings reports per-rule lint timing.
- **`    --stdin-filepath`**=_`PATH`_ &mdash;
  Read one document from stdin instead of selecting files, resolving configuration against PATH. A fix flag prints the result to stdout and the report to stderr; no file is written.
- **`-h`**, **`--help`** &mdash;
  Prints help information

## robusta format

Verify Java formatting; optionally preview or apply changes.

**Usage**: **`robusta`** **`format`** \[**`-c`**=_`PATH`_\] \[**`--no-nested-config`**\] \[**`--ignore-path`**=_`PATH`_\]... \[**`--ignore-pattern`**=_`PAT`_\]... \[**`--fix`**\] \[**`--diff`** | **`--list-different`**\] \[**`--reporter`**=_`FORMAT`_\] \[**`--debug`**=_`OPTIONS`_\] \[**`--quiet`**\] \[**`--deny-warnings`**\] \[**`--max-warnings`**=_`INT`_\] \[**`--silent`**\] \[**`--no-error-on-unmatched-pattern`**\] \[**`--threads`**=_`INT`_\] \[**`--color`**=_`WHEN`_\] \[**`--stdin-filepath`**=_`PATH`_\] \[_`PATH`_\]...

## Configuration options:

- **`-c`**, **`--config`**=_`PATH`_ &mdash;
  Use this configuration file instead of discovering `robusta.yaml`.
- **`    --no-nested-config`** &mdash;
  Use one configuration discovered from the current directory.

## Ignore options:

- **`    --ignore-path`**=_`PATH`_ &mdash;
  Path to an additional gitignore-syntax file. Can be specified multiple times.
- **`    --ignore-pattern`**=_`PAT`_ &mdash;
  Gitignore-syntax pattern to exclude, resolved from the working directory. Quote it so the shell does not expand it. These patterns are ordered and outrank `--ignore-path` files: the last one to match decides, and a leading `!` reincludes. Can be specified multiple times.

## Warning options:

- **`    --quiet`** &mdash;
  Disable reporting on warnings; only errors are reported.
- **`    --deny-warnings`** &mdash;
  Ensure warnings produce a non-zero exit code.
- **`    --max-warnings`**=_`INT`_ &mdash;
  Fail when warning-level rule violations exceed this threshold.
- **`    --silent`** &mdash;
  Do not display any diagnostics.

## Runtime options:

- **`    --no-error-on-unmatched-pattern`** &mdash;
  Do not exit with an error when no files are selected.
- **`    --threads`**=_`INT`_ &mdash;
  Number of threads to use. Set to 1 for using only 1 CPU core.

## Color options:

- **`    --color`**=_`WHEN`_ &mdash;
  When to use colors: auto, always, or never.

## Available positional items:

- _`PATH`_ &mdash;
  Java source file or directory to process. Defaults to the current directory. Paths must not contain a `..` component.

## Available options:

- **`    --fix`** &mdash;
  Rewrite files in place; with --stdin-filepath, print the formatted document instead.
- **`    --diff`** &mdash;
  Print a unified diff for files that would be changed, and the report to stderr.
- **`    --list-different`** &mdash;
  Print only the paths of files that would be changed, and the report to stderr.
- **`    --reporter`**=_`FORMAT`_ &mdash;
  Report format: default, json, checkstyle, github, gitlab, azure-devops, unix, agent, sarif, stylish, or junit.
- **`    --debug`**=_`OPTIONS`_ &mdash;
  Enable comma-separated debug options: timings reports per-rule lint timing.
- **`    --stdin-filepath`**=_`PATH`_ &mdash;
  Read one document from stdin instead of selecting files, resolving configuration against PATH. A fix flag prints the result to stdout and the report to stderr; no file is written.
- **`-h`**, **`--help`** &mdash;
  Prints help information

## robusta lint

Verify enabled lint rules; optionally preview or apply transformations.

**Usage**: **`robusta`** **`lint`** \[**`-c`**=_`PATH`_\] \[**`--no-nested-config`**\] \[**`--ignore-path`**=_`PATH`_\]... \[**`--ignore-pattern`**=_`PAT`_\]... \[**`-A`**=_`NAME`_ | **`-W`**=_`NAME`_ | **`-D`**=_`NAME`_\]... \[**`--fix`**\] \[**`--fix-suggestions`**\] \[**`--fix-dangerously`**\] \[**`--diff`** | **`--list-different`**\] \[**`--suppress-all`**\] \[**`--prune-suppressions`**\] \[**`--report-unused-suppressions`** | **`--report-unused-suppressions-severity`**=_`SEVERITY`_\] \[**`--reporter`**=_`FORMAT`_\] \[**`--debug`**=_`OPTIONS`_\] \[**`--quiet`**\] \[**`--deny-warnings`**\] \[**`--max-warnings`**=_`INT`_\] \[**`--silent`**\] \[**`--no-error-on-unmatched-pattern`**\] \[**`--threads`**=_`INT`_\] \[**`--color`**=_`WHEN`_\] \[**`--stdin-filepath`**=_`PATH`_\] \[_`PATH`_\]...

## Configuration options:

- **`-c`**, **`--config`**=_`PATH`_ &mdash;
  Use this configuration file instead of discovering `robusta.yaml`.
- **`    --no-nested-config`** &mdash;
  Use one configuration discovered from the current directory.

## Ignore options:

- **`    --ignore-path`**=_`PATH`_ &mdash;
  Path to an additional gitignore-syntax file. Can be specified multiple times.
- **`    --ignore-pattern`**=_`PAT`_ &mdash;
  Gitignore-syntax pattern to exclude, resolved from the working directory. Quote it so the shell does not expand it. These patterns are ordered and outrank `--ignore-path` files: the last one to match decides, and a leading `!` reincludes. Can be specified multiple times.

## Rule filter options, applied over the configuration, left to right:

For example `-D style -A uppercase-long-suffix`.

The categories are:

- `correctness` - Code that is wrong or useless.
- `style` - Consistency and readability concerns with no behavioral risk.
- `suspicious` - Constructs that commonly indicate stale or misleading code.
- `all` - All registered rules.

Arguments:

- **`-A`**, **`--allow`**=_`NAME`_ &mdash;
  Disable a rule, a category, or `all` for this run.
- **`-W`**, **`--warn`**=_`NAME`_ &mdash;
  Set a rule, a category, or `all` to warn for this run.
- **`-D`**, **`--deny`**=_`NAME`_ &mdash;
  Set a rule, a category, or `all` to deny for this run.

## Fix options:

- **`    --fix`** &mdash;
  Fix as many issues as possible. Only unfixed issues are reported.
- **`    --fix-suggestions`** &mdash;
  Apply auto-fixable suggestions. May change program behavior. Combines with --fix.
- **`    --fix-dangerously`** &mdash;
  Apply dangerous fixes and suggestions.

## Warning options:

- **`    --quiet`** &mdash;
  Disable reporting on warnings; only errors are reported.
- **`    --deny-warnings`** &mdash;
  Ensure warnings produce a non-zero exit code.
- **`    --max-warnings`**=_`INT`_ &mdash;
  Fail when warning-level rule violations exceed this threshold.
- **`    --silent`** &mdash;
  Do not display any diagnostics.

## Runtime options:

- **`    --no-error-on-unmatched-pattern`** &mdash;
  Do not exit with an error when no files are selected.
- **`    --threads`**=_`INT`_ &mdash;
  Number of threads to use. Set to 1 for using only 1 CPU core.

## Color options:

- **`    --color`**=_`WHEN`_ &mdash;
  When to use colors: auto, always, or never.

## Available positional items:

- _`PATH`_ &mdash;
  Java source file or directory to process. Defaults to the current directory. Paths must not contain a `..` component.

## Available options:

- **`    --rules`** &mdash;
  List all the rules that are currently registered.
- **`    --diff`** &mdash;
  Print a unified diff for files that would be changed, and the report to stderr.
- **`    --list-different`** &mdash;
  Print only the paths of files that would be changed, and the report to stderr.
- **`    --suppress-all`** &mdash;
  Record each file's error counts per rule in `robusta-suppressions.json`. With a fix flag, fix first and record the errors that remain.
- **`    --prune-suppressions`** &mdash;
  Lower or remove obsolete counts in `robusta-suppressions.json`; never raise them.
- **`    --report-unused-suppressions`** &mdash;
  Report suppressions like `@SuppressWarnings("robusta:<rule>")` and `//NOROBUSTA` that match no finding. --fix-suggestions removes them.
- **`    --report-unused-suppressions-severity`**=_`SEVERITY`_ &mdash;
  Same as --report-unused-suppressions, at severity allow, warn, or deny. Overrides the configuration.
- **`    --reporter`**=_`FORMAT`_ &mdash;
  Report format: default, json, checkstyle, github, gitlab, azure-devops, unix, agent, sarif, stylish, or junit.
- **`    --debug`**=_`OPTIONS`_ &mdash;
  Enable comma-separated debug options: timings reports per-rule lint timing.
- **`    --stdin-filepath`**=_`PATH`_ &mdash;
  Read one document from stdin instead of selecting files, resolving configuration against PATH. A fix flag prints the result to stdout and the report to stderr; no file is written.
- **`-h`**, **`--help`** &mdash;
  Prints help information

## robusta init

Create `robusta.yaml` in the current directory, failing if it exists.

**Usage**: **`robusta`** **`init`** \[**`--color`**=_`WHEN`_\]

## Color options:

- **`    --color`**=_`WHEN`_ &mdash;
  When to use colors: auto, always, or never.

## Available options:

- **`-h`**, **`--help`** &mdash;
  Prints help information

## robusta config

Print the resolved configuration for the current directory as YAML.

**Usage**: **`robusta`** **`config`** \[**`-c`**=_`PATH`_\] \[**`--no-nested-config`**\] \[**`--color`**=_`WHEN`_\] \[**`--files`** \[**`--ignore-path`**=_`PATH`_\]... \[**`--ignore-pattern`**=_`PAT`_\]... \[_`PATH`_\]...\]

## Configuration options:

- **`-c`**, **`--config`**=_`PATH`_ &mdash;
  Use this configuration file instead of discovering `robusta.yaml`.
- **`    --no-nested-config`** &mdash;
  Use one configuration discovered from the current directory.

## Color options:

- **`    --color`**=_`WHEN`_ &mdash;
  When to use colors: auto, always, or never.

## Ignore options:

- **`    --ignore-path`**=_`PATH`_ &mdash;
  Path to an additional gitignore-syntax file. Can be specified multiple times.
- **`    --ignore-pattern`**=_`PAT`_ &mdash;
  Gitignore-syntax pattern to exclude, resolved from the working directory. Quote it so the shell does not expand it. These patterns are ordered and outrank `--ignore-path` files: the last one to match decides, and a leading `!` reincludes. Can be specified multiple times.

## Available positional items:

- _`PATH`_ &mdash;
  Java source file or directory to process. Defaults to the current directory. Paths must not contain a `..` component.

## Available options:

- **`    --files`** &mdash;
  Print the paths the selection would process instead of the configuration.
- **`-h`**, **`--help`** &mdash;
  Prints help information
