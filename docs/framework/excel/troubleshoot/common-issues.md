---
title: Common Issues
page_title: Common Issues | Kendo UI Excel Export
description: "Learn about the issues that may occur when using the Excel Export with Kendo UI controls."
slug: troubleshooting_excel_export_kendoui
position: 1
---

# Common Issues

## Fonts

### Apple Numbers Warns About Missing Fonts

Apple Numbers complain about missing fonts when opening an exported file. This is valid even for files created from Microsoft Excel.

The fonts in question are typically **Cambria** and **Colibri**. They can be obtained by installing the free [Open XML File Format Converter for Mac](http://www.microsoft.com/en-us/download/details.aspx?id=27334).

The application functions normally with the substituted files as well. Once you save the file through Numbers, no error messages are shown.

## See Also

Other articles on troubleshooting:

* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
* [JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
* [Performance Issues]({% slug troubleshooting_system_memory_symptoms_kendoui %})
* [Common Issues Related to Styling, Appearance, and Rendering]({% slug commonissues_troubleshooting_kendouistyling %})
