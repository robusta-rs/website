---
title: "Setup CI and other integrations | Formatter"
description: Run Robusta's formatter in CI from Gradle or Maven.
---

# Setup CI and other integrations

You can - and should - set up your CI pipeline to run Robusta and fail the
build on formatting differences.

## CI

These instructions assume you have applied the [Gradle](../gradle) or
[Maven](../maven) plugin and committed a `robusta.yaml`.

`robustaFormat` and `robusta:format` verify formatting without writing. They
fail when a file is not formatted. Neither is attached to the build's own
`check` task or lifecycle, so invoke it explicitly. `robustaCheck` and
`robusta:check` run the formatter and the linter together.

### GitHub Actions

Create `.github/workflows/robusta.yml`:

::: code-group

```yaml [Gradle]
name: Robusta

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  robusta:
    runs-on: ubuntu-latest
    steps:
      # NOTE: For security, it is strongly recommended to pin all
      # actions to a specific SHA hash instead of using a version
      # tag like this.
      - uses: actions/checkout@v7
        with:
          persist-credentials: false
      - uses: actions/setup-java@v6
        with:
          distribution: temurin
          java-version: 21 # your project's Java version
      - run: ./gradlew robustaFormat --args="--reporter github"
```

```yaml [Maven]
name: Robusta

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  robusta:
    runs-on: ubuntu-latest
    steps:
      # NOTE: For security, it is strongly recommended to pin all
      # actions to a specific SHA hash instead of using a version
      # tag like this.
      - uses: actions/checkout@v7
        with:
          persist-credentials: false
      - uses: actions/setup-java@v6
        with:
          distribution: temurin
          java-version: 21 # your project's Java version
      - run: mvn --batch-mode robusta:format -Drobusta.args="--reporter github"
```

:::

`--reporter github` prints findings as workflow commands, which GitHub shows as
annotations on the affected lines. Without it, the log shows the default
human-readable report.

### GitLab CI

Add a job to your `.gitlab-ci.yml`:

::: code-group

```yaml [Gradle]
robusta:
  image: eclipse-temurin:21 # your project's Java version
  stage: test
  script:
    - ./gradlew robustaFormat
```

```yaml [Maven]
robusta:
  image: maven:3-eclipse-temurin-21 # your project's Java version
  stage: test
  script:
    - mvn --batch-mode robusta:format
```

:::

With the native executable, `robusta format --reporter gitlab` writes a
[Code Quality report](https://docs.gitlab.com/ci/testing/code_quality/#code-quality-report-format)
to standard output, which a job can save and upload as a `codequality`
artifact.

## Other integrations

### Gradle and Maven

The [Gradle plugin](../gradle) and [Maven plugin](../maven) bundle the native
executable and run it from your build.
