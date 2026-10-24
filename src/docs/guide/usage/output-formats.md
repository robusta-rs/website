---
title: Output formats
description: Report Robusta results in formats for CI and other tools.
---

# Output formats

Robusta supports multiple output formats for reporting results. These can be
used to integrate with CI systems or other tools.

Select a format with the `--reporter` option. Under `check` and `format`, files
that are not formatted are reported too.

The report goes to standard output. When standard output carries a document
instead, under `--diff`, `--list-different`, or `--stdin-filepath` with a fix
flag, the report goes to standard error.

The examples below lint this file:

```java [Example.java]
package example;

import java.util.List;

class Example {}
```

## Available formats

### `--reporter=default`

This is the default output format if none is specified.

```
  ! unused-import: imported name `List` is never used
   ,-[Example.java:3:18]
 2 |
 3 | import java.util.List;
   :                  ^^^^
 4 |
   `----
  help: Remove the unused import.

Found 1 warning and 0 errors.
Finished in 0ms on 1 file with 2 rules using 14 threads.
```

### `--reporter=agent`

Outputs one compact line per finding, intended for automated coding agents and
similar tooling.

```
Example.java:3:18: warning unused-import: imported name `List` is never used help: Remove the unused import.
```

### `--reporter=azure-devops`

Outputs [Azure Pipelines logging
commands](https://learn.microsoft.com/en-us/azure/devops/pipelines/scripts/logging-commands),
which Azure Pipelines shows as source annotations.

```
##vso[task.logissue type=warning;sourcepath=Example.java;linenumber=3;columnnumber=18;code=unused-import;]imported name `List` is never used
```

### `--reporter=checkstyle`

Outputs Checkstyle XML, which Checkstyle-aware CI plugins can ingest.

```xml
<?xml version="1.0" encoding="utf-8"?>
<checkstyle version="4.3">
  <file name="Example.java">
    <error line="3" column="18" severity="warning" message="imported name `List` is never used" source="unused-import"/>
  </file>
</checkstyle>
```

### `--reporter=github`

This format is intended for GitHub Actions and GitHub's [annotations
feature](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands#setting-an-error-message).

```
::warning file=Example.java,line=3,endLine=3,col=18,endColumn=22,title=unused-import::Example.java:3:18: imported name `List` is never used
```

### `--reporter=gitlab`

Outputs a [GitLab Code
Quality](https://docs.gitlab.com/ci/testing/code_quality/#code-quality-report-format)
report.

```json
[
  {
    "description": "imported name `List` is never used",
    "check_name": "unused-import",
    "fingerprint": "7e1a953bcff4676d",
    "severity": "major",
    "location": {
      "path": "Example.java",
      "lines": {
        "begin": 3,
        "end": 3
      }
    }
  }
]
```

### `--reporter=json`

Outputs Robusta's own JSON report, with a per-file `formatted` flag under
`check` and `format`.

```json
{
  "files": [
    {
      "path": "Example.java",
      "diagnostics": [
        {
          "ruleId": "unused-import",
          "severity": "warning",
          "message": "imported name `List` is never used",
          "line": 3,
          "column": 18
        }
      ]
    }
  ],
  "summary": {
    "diagnostics": 1
  }
}
```

### `--reporter=junit`

Outputs JUnit XML, which CI test-result readers can ingest.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="Robusta" tests="1" failures="1" errors="0">
    <testsuite name="Example.java" tests="1" disabled="0" errors="0" failures="1">
        <testcase name="unused-import">
            <failure message="imported name `List` is never used">line 3, column 18, imported name `List` is never used</failure>
        </testcase>
    </testsuite>
</testsuites>
```

### `--reporter=sarif`

Outputs [SARIF](https://sarifweb.azurewebsites.net/) 2.1.0, which code-scanning
platforms can ingest.

```json
{
  "$schema": "https://docs.oasis-open.org/sarif/sarif/v2.1.0/errata01/os/schemas/sarif-schema-2.1.0.json",
  "version": "2.1.0",
  "runs": [
    {
      "tool": {
        "driver": {
          "name": "robusta",
          "informationUri": "https://robusta.rs",
          "version": "0.1.0",
          "rules": [
            {
              "id": "unused-import",
              "shortDescription": {
                "text": "Reports single imports whose imported name is never referenced."
              }
            }
          ]
        }
      },
      "results": [
        {
          "ruleId": "unused-import",
          "level": "warning",
          "message": {
            "text": "imported name `List` is never used"
          },
          "locations": [
            {
              "physicalLocation": {
                "artifactLocation": {
                  "uri": "Example.java"
                },
                "region": {
                  "startLine": 3,
                  "startColumn": 18,
                  "endLine": 3,
                  "endColumn": 22
                }
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### `--reporter=stylish`

Outputs an aligned block per file, in the layout of ESLint's `stylish`
formatter.

```
Example.java
  3:18  warning  imported name `List` is never used  unused-import

✖ 1 problem (0 errors, 1 warning)
```

### `--reporter=unix`

Outputs one grep-friendly line per finding, followed by a problem count.

```
Example.java:3:18: imported name `List` is never used [Warning/unused-import]

1 problem
```
