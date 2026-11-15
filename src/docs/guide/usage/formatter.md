---
title: Formatter
description: A deterministic Java formatter for layout, Javadoc, and import order.
outline: deep
---

# Formatter

Robusta's formatter lays out Java source, its Javadoc, and its imports. It runs
as `robusta format`, or together with the [linter](./linter) as
`robusta check`.

## Supported languages

The formatter covers `.java` files written in the finalized Java grammar
through Java 25. Preview features are not supported.

## Deterministic formatting

Formatting is deterministic and idempotent: formatting a formatted file changes
nothing. Line width, indentation, wrapping, blank lines, and import order are
configured per project, and options omitted from `robusta.yaml` are read from
[`.editorconfig`](./formatter/config#editorconfig).

## Batteries included

- [Import sorting](./formatter/sorting#sort-imports) into sections and groups
- [Javadoc formatting](./formatter/config-file-reference#format-javadoc)

## Getting started

Apply the [Gradle](./gradle) or [Maven](./maven) plugin, or install the native
executable.

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

## Next steps

- [Quickstart](./formatter/quickstart)
- [Configuration](./formatter/config)
- [Setup CI](./formatter/ci)

## References

- [CLI reference](./formatter/cli)
- [Config file reference](./formatter/config-file-reference)
