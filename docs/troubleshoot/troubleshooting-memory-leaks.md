---
title: Performance Issues
page_title: Performance Issues | Kendo UI Troubleshooting
description: "Learn about the solutions of system memory issues that may occur while working with Kendo UI controls."
slug: troubleshooting_system_memory_symptoms_kendoui
---

# Performance Issues

This page provides solutions for issues related to performance issues that you may encounter while working with Kendo UI widgets.

## Slow Execution or Lags

### Browser Extensions

Try disabling browser extensions as a first step when facing performance issues.

Most browsers provide a way to temporary disable all add-ons:

* [Chrome - Incognito Mode](https://support.google.com/chrome/answer/95464?source=gsearch&hl=en)
* [Internet Explorer - InPrivate Browsing](http://windows.microsoft.com/en-us/internet-explorer/products/ie-9/features/in-private)
* [Firefox - Safe Mode](https://support.mozilla.org/en-US/kb/troubleshoot-firefox-issues-using-safe-mode)

## Memory Leaks

### Browser Memory Usage Increases over Time

**Solution**

There are multiple possible reasons for leaking JavaScript Heap memory. To narrow them down, use the profiling features provided by the browser developer tools. See [Memory Diagnosis | Web Tools](https://developers.google.com/web/tools/chrome-devtools/profile/memory-problems/memory-diagnosis?hl=en) for a detailed description of the debugging process.

### Application Becomes Unresponsive or Hangs

Try disabling extensions as [suggested above](#browser-extensions). If that does not help, see the [Browser Memory Usage Increases over Time](#browser-memory-usage-increases-over-time) section above.

## See Also

Other articles on troubleshooting:

* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
* [JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
* [Content Security Policy]({% slug troubleshooting_content_security_policy_kendoui %})
* [Common Issues in Kendo UI Excel Export]({% slug troubleshooting_excel_export_kendoui %})
* [Common Issues in Kendo UI Charts]({% slug troubleshooting_chart_widget %})
* [Performance Issues in Kendo UI Widgets for Data Visualization]({% slug tipsandtricks_kendouistyling %})
* [Common Issues in Kendo UI ComboBox]({% slug troubleshooting_common_issues_combobox_kendoui %})
* [Common Issues in Kendo UI Diagram]({% slug troubleshooting_diagram_widget %})
* [Common Issues in Kendo UI DropDownList]({% slug troubleshooting_common_issues_dropdownlist_kendoui %})
* [Common Issues in Kendo UI Editor]({% slug troubleshooting_editor_widget %})
* [Common Issues in Kendo UI MultiSelect]({% slug troubleshooting_common_issues_multiselect_kendoui %})
* [Common Issues in Kendo UI Scheduler]({% slug troubleshooting_scheduler_widget %})
* [Common Issues in Kendo UI Upload]({% slug troubleshooting_upload_widget %})
* [Common Issues Related to Styling, Appearance, and Rendering]({% slug commonissues_troubleshooting_kendouistyling %})
* [Common Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_aspnetmvc %})
* [Validation Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_validation_aspnetmvc %})
* [Scaffolding Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_scaffolding_aspnetmvc %})
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [Excel Export with the Grid ASP.NET MVC HtmlHelper Extension]({% slug excelissues_gridhelper_aspnetmvc %})
* [Common Issues in the Spreadsheet ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_uploadhelper_aspnetmvc %})
