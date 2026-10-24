---
title: What is Robusta?
description: A Java formatter and linter in one native executable.
---

# What is Robusta?

Robusta is a formatter and linter for Java, written in Rust. It is one native
executable: it starts no JVM and needs no class path or build information to
check a file.

<sub>\* Robusta is a coffee variety, a nod to Java.</sub>

## Philosophy

### One executable everywhere

The same executable runs on a developer machine, in CI, and inside the Gradle
and Maven plugins. Each Java file takes its settings from the nearest
`robusta.yaml` above it, so every way of running Robusta gives the same result.

### Deterministic formatting

Formatting is deterministic and idempotent: formatting a formatted file changes
nothing. Line width, indentation, wrapping, blank lines, and import order are
configured per project.

### Fixes proven from one file

Lint diagnostics and fixes are decided from a single file, so they need no
build information and are safe to enforce in CI. Fixes never raise the source
language level: Java 8 input stays valid Java 8 after every fix.

### Tooling, not a correctness analyzer

Robusta is a developer-experience tool. Comprehensive semantic analysis stays
with tools such as SonarQube, Error Prone, and SpotBugs.

## What you get

- `robusta format` checks and applies formatting.
- `robusta lint` reports lint findings and applies their fixes.
- `robusta check` does both, for CI.
- The [Gradle](/docs/guide/usage/gradle) and [Maven](/docs/guide/usage/maven)
  plugins bundle the executable and run it from your build.

## Java support

The formatter covers the finalized Java grammar through Java 25. Preview
features are not supported.
