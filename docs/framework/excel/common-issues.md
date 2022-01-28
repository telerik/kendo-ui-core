---
title: Troubleshooting
page_title: Excel Export Troubleshooting | Kendo UI Excel Export
description: "Learn about the issues that may occur when using the Excel Export with Kendo UI controls."
previous_url: /framework/excel/troubleshoot/common-issues
slug: troubleshooting_excel_export_kendoui
position: 20
---

# Excel Export Troubleshooting

This article provides solutions to common issues you might encounter while exporting content to Excel with Kendo UI.

## Apple Numbers Warn about Missing Fonts

Apple Numbers complain about missing fonts when opening an exported file. This is valid even for files created from Microsoft Excel.

The fonts in question are typically Cambria and Colibri. They can be obtained by installing the free [Open XML File Format Converter for Mac](https://support.microsoft.com/en-us/kb/960403). The application functions normally with the substituted files as well. Once you save the file through Numbers, no error messages are shown.

## See Also

* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
