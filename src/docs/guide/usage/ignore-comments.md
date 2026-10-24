---
title: Inline suppressions
description: Suppress specific lint findings with an annotation or a line comment.
---

# Inline suppressions

Inline suppressions are an escape hatch for exceptional cases where a rule is
correct in general but a particular finding is intentional. Robusta supports
Java's `@SuppressWarnings` annotation and a `//NOROBUSTA` line comment. To
adopt a rule across an existing project, use a [baseline](./baseline) instead.

## `@SuppressWarnings("robusta:<rule>")`

Suppress a rule on the annotated declaration:

```java
class Example {
    @SuppressWarnings("robusta:uppercase-long-suffix")
    long limit = 10l;
}
```

Entries can share an annotation with warning names for other tools:

```java
@SuppressWarnings({"unchecked", "robusta:unused-local-variable"})
void load() {
    int unused = 0;
}
```

`@SuppressWarnings("all")` suppresses all Robusta rules in the annotated
declaration too. Because other tools use `all`, Robusta does not report it as
an unused suppression or remove it.

## `//NOROBUSTA`

Suppress every lint rule for findings starting on the same line:

```java
import java.util.List; //NOROBUSTA Kept to match generated source.
```

It does not suppress findings on the next line.

## Report unused suppressions

Reporting unused suppressions is disabled by default. When enabled, Robusta
reports suppressions that silence no finding, including those for rules that
are off.

Enable reporting:

```sh
robusta lint --report-unused-suppressions
```

Specify the severity:

```sh
robusta lint --report-unused-suppressions-severity deny
```

Only one of these options can be used at a time.

This can also be set in the main configuration file:

```yaml [robusta.yaml]
options:
  report-unused-suppressions: warn # or allow or deny
```

To remove unused suppressions, add `--fix-suggestions`:

```sh
robusta lint --report-unused-suppressions --fix-suggestions
```

The suggestion removes Robusta-owned annotation entries while retaining warning
names used by other tools. Removable line markers are removed too; explanations
are retained where the source permits a safe edit.
