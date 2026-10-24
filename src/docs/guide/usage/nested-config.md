---
title: Nested configuration files
description: Use multiple robusta.yaml files to apply different settings to different parts of a repository.
---

# Nested configuration files

Robusta can use multiple `robusta.yaml` files in the same repository and
applies them based on where files live in the directory tree.

This is useful in multi-module builds where modules need their own settings.

If you only need to exclude files or folders, use
[Ignore files](./ignore-files) instead.

## How it works

For each Java file, Robusta uses the nearest `robusta.yaml` at or above the
file's directory.

Given the following structure:

```
my-project/
├── robusta.yaml
├── app/
│   └── src/main/java/App.java
└── generated-client/
    ├── robusta.yaml
    └── src/main/java/Client.java
```

Configuration resolution works as follows:

- `app/src/main/java/App.java` uses `my-project/robusta.yaml`
- `generated-client/src/main/java/Client.java` uses
  `my-project/generated-client/robusta.yaml`

## What to expect

Configuration files are not merged. A config in a child directory replaces its
parent for the files below it; options it omits take their `.editorconfig` or
default values, not the parent's.

Command-line options override configuration files, regardless of whether they
come from a parent or child directory.

Passing an explicit config file with `-c` or `--config` disables nested config
lookup, and Robusta uses only that file.

You can also disable nested configs with the `--no-nested-config` flag. Robusta
then uses the configuration that applies to the current directory for every
file.

`options` is supported only in the main configuration, the one that applies to
the current directory. If a nested config sets it, Robusta reports an error.
