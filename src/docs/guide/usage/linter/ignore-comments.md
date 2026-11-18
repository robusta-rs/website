---
title: "Inline suppressions | Linter"
description: Suppress lint findings with @SuppressWarnings or use robusta-disable-line and robusta-disable-next-line in line or block comments.
---

# Inline suppressions

Inline suppressions are an escape hatch for exceptional cases where a rule is
correct in general but a particular finding is intentional. Robusta supports
Java's `@SuppressWarnings` annotation and disable comments. To adopt a rule
across an existing project, use a [baseline](./baseline) instead.

In a line comment (`//`) or block comment (`/* */`), put `robusta-disable-line`
or `robusta-disable-next-line` at the start of the comment text. List rule names
separated by commas, or omit the list to suppress every rule. Add `--` followed
by an explanation if needed.

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

## robusta-disable-line

Suppress findings that start on the line where the comment begins.

```java
import java.util.Map; /* robusta-disable-line unused-import -- Kept to match generated source. */
```

## robusta-disable-next-line

Suppress findings that start on the line after the comment ends.

```java
// robusta-disable-next-line unused-import -- Matches the upstream source.
import java.util.List;
```

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
lint:
  options:
    report-unused-suppressions: warn # or allow or deny
```

To remove unused suppressions, add `--fix`:

```sh
robusta lint --report-unused-suppressions --fix
```

The fix removes Robusta-owned annotation entries while retaining warning
names used by other tools. Removable disable comments are removed too;
explanations are retained where the source permits a safe edit.
