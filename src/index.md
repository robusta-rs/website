---
layout: home
hero:
  name: Robusta
  text: Format and lint Java.
  tagline: One native executable, the same configuration locally and in CI.
  image:
    light: /icon-color-dark.svg
    dark: /icon-color-light.svg
    alt: Robusta
  actions:
    - theme: brand
      text: Get started
      link: /docs/guide/usage/quickstart
    - theme: alt
      text: What is Robusta?
      link: /docs/guide/what-is-robusta
features:
  - title: Format
    details: Deterministic formatting for layout, Javadoc, and import order, configured per project.
    link: /docs/guide/usage/config#configure-formatting
    linkText: Configure formatting
  - title: Lint
    details: Findings and fixes decided from one file, with no class path and no JVM to start.
    link: /docs/guide/usage/automatic-fixes
    linkText: Automatic fixes
  - title: Build integration
    details: Gradle and Maven plugins run the same executable as your terminal and CI.
    link: /docs/guide/usage/gradle
    linkText: Gradle and Maven
---

::: info Development preview
Robusta binaries and build-tool plugins have not been published yet. These
guides describe the current source implementation.
:::
