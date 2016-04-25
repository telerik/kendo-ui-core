---
title: Scaffolding
page_title: Scaffolding | UI for ASP.NET MVC Troubleshooting
description: "Learn about the solutions of issues that may occur while using the Kendo UI Scaffolder Visual Studio Extension."
slug: troubleshooting_scaffolding_aspnetmvc
position: 2
---

# Scaffolding

This page provides solutions to common issues you may encounter while working with the Kendo UI Scaffolder Visual Studio extension.

## Common Scaffolding Issues

### New Scaffolded Item Menu Is Not Displayed When Right-Clicking Project Locations

**Solution**

* Make sure that you use a compatible Visual Studio version and that all listed requirements are fulfilled.
* Check if the Kendo UI Scaffolder extension is listed in the **Tools** > **Extensions and Updates** list.

### Data Context Class DropDownList Is Empty

**Solution**

Make sure that the current project contains a valid **Entity Framework Data Model**. If this is true, rebuild the solution.

### Invalid Model Configuration Error Is Thrown When Running the Scaffolder

The most probable reason for this error is that the selected **Model Class** is not a valid entity in the current **Data Context**.

**Solution**

Make sure that a valid entity is selected.

## See Also

Other articles on troubleshooting:

* [Common Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_aspnetmvc %})
* [Validation Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_validation_aspnetmvc %})
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [Excel Export with the Grid ASP.NET MVC HtmlHelper Extension]({% slug excelissues_gridhelper_aspnetmvc %})
* [Common Issues in the Spreadsheet ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_uploadhelper_aspnetmvc %})
* [Common Issues in Kendo UI]({% slug troubleshooting_common_issues_kendoui %})
* [Kendo UI JavaScript Errors]({% slug troubleshooting_javascript_errors_kendoui %})
* [Kendo UI Performance Issues]({% slug troubleshooting_system_memory_symptoms_kendoui %})
* [Kendo UI Content Security Policy]({% slug troubleshooting_content_security_policy_kendoui %})
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
