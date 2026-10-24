---
title: Suppression baseline
description: Enforce a lint rule without fixing every existing error at once.
---

# Suppression baseline

A baseline lets you enforce a lint rule without fixing every existing error
at once. It records allowed error counts per file and rule in
`robusta-suppressions.json`, in the current working directory.

## Record existing errors

From your project's root directory:

```sh
robusta lint -D unused-import --suppress-all .
```

This enables `unused-import` at error severity and records existing errors,
along with errors from other enabled rules. Commit the baseline with your
configuration so local and CI runs use the same counts. Keep the rule enabled
in configuration, or pass the same severity flag in later runs:

```sh
robusta lint -D unused-import .
```

A baseline entry looks like this:

```json
{
  "src/main/java/example/Example.java": {
    "unused-import": { "count": 2 }
  }
}
```

## What a count allows

Only lint errors count; warnings and suppression-hygiene findings are not
hidden by the baseline. If a file has at most the allowed count for a rule,
those errors are hidden. If it exceeds the count, all of that rule's errors
in the file are reported.

A count does not identify individual findings: fixing one error and adding
another in the same file can leave the count unchanged. Use
[inline suppressions](./ignore-comments) when an exception belongs to a
specific declaration or line.

## Reduce obsolete counts

When a run finds fewer errors than a baseline entry allows, it reports the
obsolete allowance and fails. Update the baseline after fixing those errors:

```sh
robusta lint -D unused-import --prune-suppressions .
```

Pruning lowers or removes obsolete counts and can remove entries for deleted
files within the selected scope. It never raises allowances. Runs that write
lint fixes also prune the baseline.

Keep running from the same root directory. Gradle and Maven source tasks use
their discovered root directory so selected modules share the root baseline.
