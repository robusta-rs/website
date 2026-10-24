---
title: Quickstart
description: Install Robusta and learn the common workflows.
---

# Quickstart

This page shows how to set up Robusta and the most common workflows, with
copy-paste commands.

## Install

::: info Before the first release
Version `0.1.0` has not been published. The plugin declarations below describe
the intended release setup. Until then, build the native executable from the
Robusta source checkout.
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

```sh [Native]
# From the Robusta source checkout
cargo build --release --locked --bin robusta
```

:::

The native build writes `target/release/robusta` (`robusta.exe` on Windows).
Put it on your `PATH` for the commands on this page.

Run it:

::: code-group

```sh [Gradle]
./gradlew robustaCheck
```

```sh [Maven]
mvn robusta:check
```

```sh [Native]
robusta check
```

:::

Apply fixes:

::: code-group

```sh [Gradle]
./gradlew robustaCheckFix
```

```sh [Maven]
mvn robusta:check-fix
```

```sh [Native]
robusta check --fix
```

:::

The [Gradle](./gradle) and [Maven](./maven) pages list every task and goal.

## Usage

For the complete list of options, see the [CLI reference](./cli).

```sh
robusta <COMMAND> [OPTIONS] [PATH]...
```

| Command  | Effect                               |
| -------- | ------------------------------------ |
| `check`  | Verify formatting and lint findings. |
| `format` | Verify formatting.                   |
| `lint`   | Report lint findings.                |
| `init`   | Create a starter `robusta.yaml`.     |
| `config` | Print the resolved configuration.    |

If `PATH` is omitted, Robusta processes the current working directory.

## Common workflows

### Create a config file

Create a starter `robusta.yaml` in the current directory:

```sh
robusta init
```

It refuses to overwrite an existing file. Then customize `robusta.yaml` as
needed. See [Configuration](./config).

### Fix problems

Write formatting changes and safe lint fixes:

```sh
robusta check --fix
```

Apply suggestions (may change program behavior):

```sh
robusta lint --fix-suggestions
```

Apply dangerous fixes and suggestions:

```sh
robusta lint --fix-dangerously
```

See [Automatic fixes](./automatic-fixes) for guidance on when to use each mode.

### Preview changes

Print a unified diff of formatting changes and safe lint fixes instead of
writing them:

```sh
robusta check --diff
```

List the files that would change:

```sh
robusta format --list-different
```

### Piping file contents

Format one document from standard input, resolving configuration as if it were
at the given path:

```sh
cat Example.java | robusta format --fix --stdin-filepath src/main/java/Example.java
```

### Ignore files

Add ignore patterns from the command line:

```sh
robusta check --ignore-pattern "generated/" --ignore-pattern "*Generated.java"
```

See [Ignore files](./ignore-files).

### Fail CI reliably

Only report errors:

```sh
robusta check --quiet
```

Fail if any warnings are found:

```sh
robusta check --deny-warnings
```

Fail if warnings exceed a threshold:

```sh
robusta check --max-warnings 0
```

See [CI setup](./ci).

### Use machine-readable output

Select a report format:

```sh
robusta check --reporter json
```

See [Output formats](./output-formats) for every format.

### Inspect the effective configuration

Print the configuration that applies to the current directory:

```sh
robusta config
```

List the files a run would process:

```sh
robusta config --files
```

### List available rules

```sh
robusta lint --rules
```

## Next steps

- Configure formatting, rules, and ignores: [Configuration](./config)
- Run Robusta from your build: [Gradle](./gradle), [Maven](./maven)
- [Setup CI](./ci)
- Adopt a rule in existing code: [Suppression baseline](./baseline)
- [CLI reference](./cli)
