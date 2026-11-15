---
title: Linter
description: A Java linter whose findings and fixes are decided from one file.
outline: deep
---

<script setup>
import { data } from './rule-count.data.js';
const ruleCount = data;
</script>

# Linter

Robusta's linter reports problems in Java code and fixes the ones it can. It
runs as `robusta lint`, or together with the [formatter](/docs/guide/usage/formatter)
as `robusta check`.

## Fixes proven from one file

Lint diagnostics and fixes are decided from a single file, so they need no
class path or build information and are safe to enforce in CI. Fixes never
raise the source language level: Java 8 input stays valid Java 8 after every
fix.

## Correctness-focused defaults

By default, `correctness` rules warn and the other categories are allowed.
Additional rules and [categories](/docs/guide/usage/linter/config#enable-groups-of-rules-with-categories)
can be enabled as requirements evolve.

## Getting started

Apply the [Gradle](/docs/guide/usage/gradle) or [Maven](/docs/guide/usage/maven)
plugin, or install the native executable, then run the linter:

::: code-group

```sh [Gradle]
./gradlew robustaLint
```

```sh [Maven]
mvn robusta:lint
```

```sh [Native]
robusta lint
```

:::

Next steps:

- [Quickstart](/docs/guide/usage/linter/quickstart)
- [Configuration](/docs/guide/usage/linter/config)
- [Setup CI](/docs/guide/usage/linter/ci)

## What the linter supports

The linter checks `.java` files written in the finalized Java grammar through
Java 25. Preview features are not supported.

## Features

- [{{ ruleCount }} built-in rules](/docs/guide/usage/linter/rules), grouped into categories.
- [Automatic fixes](/docs/guide/usage/linter/automatic-fixes) to apply safe changes quickly.
- [Ignore files](/docs/guide/usage/linter/ignore-files) to control which paths are linted.
- [Inline suppressions](/docs/guide/usage/linter/ignore-comments) for ignoring rules within a file.
- [Suppression baseline](/docs/guide/usage/linter/baseline) for enforcing a rule without fixing every existing error at once.
- [Output formats](/docs/guide/usage/linter/output-formats) for CI and other tools.

## References

- [Rules reference](/docs/guide/usage/linter/rules)
- [CLI reference](/docs/guide/usage/linter/cli)
- [Config file reference](/docs/guide/usage/linter/config-file-reference)
