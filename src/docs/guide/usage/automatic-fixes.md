---
title: Automatic fixes
description: Apply safe, suggested, and dangerous fixes with Robusta.
---

# Automatic fixes

Robusta can automatically fix some lint violations. Automatic fixes are only
applied when passing the relevant CLI flags. You choose when to apply them.

No fix raises the source language level: Java 8 input stays valid Java 8 after
every fix mode.

`robusta lint --rules` shows which rules provide fixes.

## Safe fixes

Safe fixes are changes that do not alter program behavior.

Apply safe fixes:

```sh
robusta lint --fix
```

With `check`, `--fix` applies safe lint fixes first and then formatting.

## Suggestions

Suggestions are changes that may alter behavior or may not match your intent.

Apply suggestions:

```sh
robusta lint --fix-suggestions
```

## Dangerous fixes

Dangerous fixes are aggressive changes that may break your code.

Apply dangerous fixes:

```sh
robusta lint --fix-dangerously
```

`--fix-dangerously` applies every fix kind, including suggestions.

## Combining fix modes

You can combine safe fixes and suggestions:

```sh
robusta lint --fix --fix-suggestions
```

You can also include dangerous fixes:

```sh
robusta lint --fix --fix-suggestions --fix-dangerously
```

## Preview fixes

`--diff` prints the changes as a unified diff instead of writing them, and
`--list-different` prints only the paths that would change. Both preview safe
fixes by default; pass `--fix-suggestions` or `--fix-dangerously` to preview
that mode instead:

```sh
robusta lint --fix-suggestions --diff
```

`--fix` cannot be combined with a preview.

## Gradle and Maven

`robustaLintFix`, `robustaCheckFix`, `robusta:lint-fix`, and
`robusta:check-fix` apply safe fixes. Pass the other modes as
[command-line options](./gradle#pass-command-line-options):

::: code-group

```sh [Gradle]
./gradlew robustaLintFix --args="--fix-suggestions"
```

```sh [Maven]
mvn robusta:lint-fix -Drobusta.args="--fix-suggestions"
```

:::

## Rule support

Not all rules provide fixes. Some rules support safe fixes, some provide
suggestions or dangerous fixes, and some do not provide fixes. A finding is
also reported without a fix when its context makes the edit unsafe, such as a
comment inside the code the fix would remove.
