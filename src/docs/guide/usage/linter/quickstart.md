---
title: "Quickstart | Linter"
description: Install Robusta and learn the common linting workflows.
---

# Quickstart

This page shows how to set up Robusta's linter and the most common workflows,
with copy-paste commands.

## Install

::: info Before the first release
Version `0.1.0` has not been published. The plugin declarations and native
executable below describe the intended release setup.
:::

::: code-group

```kotlin [Gradle]
// settings.gradle.kts
plugins {
    id("rs.robusta") version "0.1.0"
}
```

```xml [Maven]
<!-- pom.xml -->
<build>
  <plugins>
    <plugin>
      <groupId>rs.robusta</groupId>
      <artifactId>robusta-maven-plugin</artifactId>
      <version>0.1.0</version>
    </plugin>
  </plugins>
</build>
```

:::

::: tip Native executable
Robusta is also available as a native executable. Download `robusta-<target>`
for your platform from [GitHub Releases](https://github.com/robusta-rs/robusta/releases),
rename it to `robusta` (`robusta.exe` on Windows), make it executable, and put
it on your `PATH`.
:::

Run it:

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

Apply safe fixes:

::: code-group

```sh [Gradle]
./gradlew robustaLintFix
```

```sh [Maven]
mvn robusta:lint-fix
```

```sh [Native]
robusta lint --fix
```

:::

The [Gradle](../gradle) and [Maven](../maven) pages list every task and goal.

## Usage

For the complete list of options, see the [CLI reference](./cli).

```sh
robusta lint [OPTIONS] [PATH]...
```

If `PATH` is omitted, Robusta lints the current working directory.

`robusta check` runs the linter and the [formatter](../formatter) together.

## Common workflows

### Create a config file

Create a starter `robusta.yaml` in the current directory:

```sh
robusta init
```

It refuses to overwrite an existing file. Then customize `robusta.yaml` as
needed. See [Configuration](./config).

### Fix problems

Apply safe fixes:

```sh
robusta lint --fix
```

Also apply unsafe fixes (may change what the code does or stop it compiling):

```sh
robusta lint --fix --unsafe-fixes
```

See [Automatic fixes](./automatic-fixes) for guidance on when to use each mode.

### Ignore files

Add ignore patterns from the command line:

```sh
robusta lint --ignore-pattern "generated/" --ignore-pattern "*Generated.java"
```

See [Ignore files](./ignore-files).

### Fail CI reliably

Only report errors:

```sh
robusta lint --quiet
```

Fail if any warnings are found:

```sh
robusta lint --deny-warnings
```

Fail if warnings exceed a threshold:

```sh
robusta lint --max-warnings 0
```

See [CI setup](./ci).

### Use machine-readable output

Select a report format:

```sh
robusta lint --reporter json
```

See [Output formats](./output-formats) for every format.

### Inspect the effective configuration

Print the configuration that applies to the current directory:

```sh
robusta config
```

List the files `check` would process:

```sh
robusta config --files
```

### List available rules

```sh
robusta lint --rules
```

The full list is in the [Rules reference](./rules).

## Next steps

- Configure rules and ignores: [Configuration](./config)
- Run Robusta from your build: [Gradle](../gradle), [Maven](../maven)
- [Setup CI](./ci)
- Adopt a rule in existing code: [Suppression baseline](./baseline)
- [CLI reference](./cli)
