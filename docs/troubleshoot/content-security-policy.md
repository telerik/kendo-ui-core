---
title: Content Security Policy
page_title: Content Security Policy | Kendo UI Troubleshooting
description: "Learn about the issues that may occur when using the strict Content Security Policy with Kendo UI controls."
slug: troubleshooting_content_security_policy_kendoui
---

# Content Security Policy

When you use the strict Content Security Policy (CSP) with Kendo UI widgets, that is, if the strict `Content-Security-Policy` (CSP) mode is enabled, some browser features are disabled by default:

- Inline JavaScript, such as <script></script> or DOM event attributes like `onclick`, is blocked. All script code must reside in separate files, served from a whitelisted domain.
- Dynamic code evaluation via `eval()` and string arguments for both `setTimeout` and `setInterval` are blocked.

Kendo UI uses `eval()` calls. This is how the Kendo UI templates work internally. Therefore, Kendo UI does not currently support the strict CSP mode.

If CSP mode is enabled for a Kendo UI application, the `unsafe-eval` keyword should be added as part of the `meta` tag used for enabling the CSP mode:

    <meta http-equiv="Content-Security-Policy" content="script-src 'unsafe-eval' 'self' https://kendo.cdn.telerik.com;">

## See Also

Other articles on troubleshooting:

* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
* [JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
* [Performance Issues]({% slug troubleshooting_system_memory_symptoms_kendoui %})
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
