---
title: Sorting
description: Sort Java imports into sections and groups.
---

# Sorting

Robusta's formatter sorts import declarations.

See [Config file reference](./config-file-reference#format-import-order) for
full details.

## Sort imports

Imports are always sorted. Robusta orders them into sections by kind, then
into groups by package prefix, and sorts each group in ASCII order. A blank
line separates groups and sections.

- `sections` orders the import kinds: `module` for module imports, `static` for
  static imports, and `type` for the rest.
- `groups` orders the package-prefix groups within the `static` and `type`
  sections. A group is a prefix, `*` for every import no other group matches,
  or a list of these that share one group.

With the default order, `sections: [module, type, static]` and
`groups: [["java", "javax"], "*"]`:

```java
import java.util.List;
import javax.inject.Inject;

import com.example.platform.Clock;
import com.google.common.collect.ImmutableList;
import org.slf4j.Logger;

import static java.util.Objects.requireNonNull;
```

### Example configuration

Put static imports first and a project's own packages last:

```yaml [robusta.yaml]
format:
  import-order:
    sections: [static, type, module]
    groups: [["java", "javax"], "*", "com.example"]
```

```java
import static java.util.Objects.requireNonNull;

import java.util.List;
import javax.inject.Inject;

import com.google.common.collect.ImmutableList;
import org.slf4j.Logger;

import com.example.platform.Clock;
```
