---
title: "Quickstart | Formatter"
description: Install Robusta and learn the common formatting workflows.
---

# Quickstart

This page shows how to set up Robusta's formatter and the most common
workflows, with copy-paste commands.

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

Check formatting without writing files:

::: code-group

```sh [Gradle]
./gradlew robustaFormat
```

```sh [Maven]
mvn robusta:format
```

```sh [Native]
robusta format
```

:::

Format files:

::: code-group

```sh [Gradle]
./gradlew robustaFormatFix
```

```sh [Maven]
mvn robusta:format-fix
```

```sh [Native]
robusta format --fix
```

:::

The [Gradle](../gradle) and [Maven](../maven) pages list every task and goal.

## Usage

```sh
robusta format [OPTIONS] [PATH]...
```

If `PATH` is omitted, Robusta checks the formatting of the current working
directory. Formatting options are set in the configuration file, not on the
command line.

`robusta check` runs the formatter and the [linter](../linter) together.

For the complete list of options, see the [CLI reference](./cli).

## Common workflows

### Create a config file

Create a starter `robusta.yaml` in the current directory:

```sh
robusta init
```

See [Configuration](./config).

### Preview changes

Print a unified diff of formatting changes instead of writing them:

```sh
robusta format --diff
```

### List files that differ

```sh
robusta format --list-different
```

This is useful for configuring [files to ignore](./ignore-files).

### Piping file contents

Format one document from standard input, resolving configuration as if it were
at the given path:

```sh
cat Example.java | robusta format --fix --stdin-filepath src/main/java/Example.java
```

## Next steps

- [Change configuration](./config)
- Run Robusta from your build: [Gradle](../gradle), [Maven](../maven)
- [Setup CI](./ci)
- Learn advanced features: [sorting](./sorting)
- Check [CLI reference](./cli)
