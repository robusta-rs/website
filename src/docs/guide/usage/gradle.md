---
title: Gradle
description: Run Robusta from Gradle with the rs.robusta plugin.
---

# Gradle

The `rs.robusta` plugin registers formatting and lint tasks. Published plugin
artifacts bundle the native executable.

::: info Before the first release
Version `0.1.0` has not been published. The plugin declaration below describes
the intended release setup. For local development, include the plugin's Gradle
build and supply a locally built executable as described below.
:::

## Apply the plugin

Apply the plugin once in `settings.gradle.kts`, so it applies to every project:

```kotlin
plugins {
    id("rs.robusta") version "0.1.0"
}
```

For local development, add a composite build before that block:

```kotlin
pluginManagement {
    includeBuild("/path/to/robusta/jvm")
}
```

Pass `-ProbustaExecutable=/path/to/robusta` to use your built native executable.

## Run a task

```sh
./gradlew robustaCheck
./gradlew robustaCheckDiff
./gradlew robustaCheckFix
```

| Task                                                       | Effect                                         |
| ---------------------------------------------------------- | ---------------------------------------------- |
| `robustaCheck`                                             | Verify formatting and lint findings.           |
| `robustaCheckDiff`                                         | Preview formatting and safe lint fixes.        |
| `robustaCheckFix`                                          | Write formatting and safe lint fixes.          |
| `robustaFormat` / `robustaFormatDiff` / `robustaFormatFix` | Check, preview, or apply formatting.           |
| `robustaLint` / `robustaLintDiff` / `robustaLintFix`       | Check, preview, or apply safe lint fixes.      |
| `robustaConfigShow`                                        | Print the project's resolved configuration.    |
| `robustaConfigInit`                                        | Create a starter configuration in the project. |

Robusta tasks are not attached to Gradle's `check` task automatically. Invoke
`robustaCheck` explicitly in CI.

## Pass command-line options

`--args` appends options to a task's command:

```sh
./gradlew robustaLintFix --args="--fix-suggestions --report-unused-suppressions"
```

Use `robustaRun` for an arbitrary native command:

```sh
./gradlew robustaRun --args="lint --rules"
```

## Multi-project builds

Source tasks run from the root project's directory, scoped to the selected
project's directory. This keeps source runs on the root
[suppression baseline](./baseline). Configuration tasks run from the selected
project's directory.

```sh
./gradlew :app:robustaCheck
```

An enclosing source run can cover an inner task when its operation, options,
executable, working directory, and source coverage match. Covered tasks are
skipped after a successful enclosing run. Native-pruned directories and
nested repository boundaries can require separate runs; physical nesting
alone does not guarantee coverage.

A shared build service serializes Robusta tasks, including with `--parallel`.
