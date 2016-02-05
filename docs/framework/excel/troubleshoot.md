---
title: Troubleshooting
page_title: Troubleshooting Excel Export | Kendo UI Troubleshooting
description: "Learn about the issues that may occur when using the Excel Export with Kendo UI controls."
slug: troubleshooting_excel_export_kendoui
---

# Troubleshooting

## Apple Numbers Warns About Missing Fonts

Apple Numbers will complain about missing fonts when opening an exported file.
This is true even for files created from Microsoft Excel.

The fonts in question are typically 'Cambria' and 'Colibri'.
They can be obtained by installing the free
[Open XML File Format Converter for Mac](http://www.microsoft.com/en-us/download/details.aspx?id=27334).

The application will function normally with the substituted files as well. Once you save the file through Numbers no error messages will be shown.

## See Also

Other articles on troubleshooting:

* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
* [JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
