---
title: "Automatic fixes | Linter"
description: Apply safe and unsafe fixes with Robusta.
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

## Unsafe fixes

Unsafe fixes are changes that may alter what the code does or stop it
compiling. Review the result.

Apply safe and unsafe fixes:

```sh
robusta lint --fix --unsafe-fixes
```

`--unsafe-fixes` alone is rejected: it widens what `--fix` writes or what a
preview shows.

## Preview fixes

`--diff` prints the changes as a unified diff instead of writing them, and
`--list-different` prints only the paths that would change. Both preview safe
fixes; add `--unsafe-fixes` to include unsafe fixes:

```sh
robusta lint --diff --unsafe-fixes
```

`--fix` cannot be combined with a preview.

## Gradle and Maven

`robustaLintFix`, `robustaCheckFix`, `robusta:lint-fix`, and
`robusta:check-fix` apply safe fixes. Pass `--unsafe-fixes` as a
[command-line option](../gradle#pass-command-line-options) to include unsafe
fixes:

::: code-group

```sh [Gradle]
./gradlew robustaLintFix --args="--unsafe-fixes"
```

```sh [Maven]
mvn robusta:lint-fix -Drobusta.args="--unsafe-fixes"
```

:::

## Rule support

Not all rules provide fixes. Some rules support safe fixes, some also provide
unsafe fixes, and some do not provide fixes. A finding is also reported without
a fix when its context rules the edit out, such as a comment inside the code the
fix would remove.
