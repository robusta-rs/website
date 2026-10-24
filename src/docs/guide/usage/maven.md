---
title: Maven
description: Run Robusta from Maven with the robusta-maven-plugin.
---

# Maven

The `rs.robusta:robusta-maven-plugin` plugin exposes goals that run the native
executable bundled in published plugin artifacts.

::: info Before the first release
Version `0.1.0` has not been published. This configuration requires that
version to be published or installed in a Maven repository you can access.
For a source-only trial, use the native CLI in the [Quickstart](./quickstart).
:::

## Configure the plugin

Add the plugin to your project's `pom.xml`:

```xml
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

## Run a goal

```sh
mvn robusta:check
mvn robusta:check-diff
mvn robusta:check-fix
```

| Goal                                                            | Effect                                        |
| --------------------------------------------------------------- | --------------------------------------------- |
| `robusta:check`                                                 | Verify formatting and lint findings.          |
| `robusta:check-diff`                                            | Preview formatting and safe lint fixes.       |
| `robusta:check-fix`                                             | Write formatting and safe lint fixes.         |
| `robusta:format` / `robusta:format-diff` / `robusta:format-fix` | Check, preview, or apply formatting.          |
| `robusta:lint` / `robusta:lint-diff` / `robusta:lint-fix`       | Check, preview, or apply safe lint fixes.     |
| `robusta:config-show`                                           | Print the module's resolved configuration.    |
| `robusta:config-init`                                           | Create a starter configuration in the module. |

The goals have no default lifecycle phase. Invoke `robusta:check` explicitly
when you want it in CI.

## Pass command-line options

`robusta.args` appends options to a fixed goal:

```sh
mvn robusta:lint-fix -Drobusta.args="--fix-suggestions --report-unused-suppressions"
```

For an arbitrary native command, use the pass-through goal:

```sh
mvn robusta:run -Drobusta.args="lint --rules"
```

To override the bundled executable, set
`-Drobusta.executable=/path/to/robusta`.

## Multi-module builds

Robusta finds its source-run root at the nearest ancestor of Maven's starting
directory containing `.mvn`; without one, it uses Maven's starting directory.
Source goals run from that root, scoped to their selected module directories,
so the modules share its [suppression baseline](./baseline). Configuration
goals run in the selected module's directory.

For goals invoked on the command line, the reactor omits module scopes
already covered by an enclosing selected scope. Nested repositories and
native-pruned directories can retain separate scopes. Lifecycle-bound
executions use their module's scope.

A shared lock serializes plugin processes, including with Maven's `-T` option.
