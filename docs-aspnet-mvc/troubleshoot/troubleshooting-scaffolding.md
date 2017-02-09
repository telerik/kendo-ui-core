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

* [Common Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_aspnetmvc %})
* [Validation Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_validation_aspnetmvc %})
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [Excel Export with the Grid ASP.NET MVC HtmlHelper Extension]({% slug excelissues_gridhelper_aspnetmvc %})
* [Common Issues in the Spreadsheet ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_uploadhelper_aspnetmvc %})
* [Common Issues in Kendo UI](http://docs.telerik.com/kendo-ui/troubleshoot/troubleshooting-common-issues)
* [JavaScript Errors](http://docs.telerik.com/kendo-ui/troubleshoot/troubleshooting-js-errors)
* [Performance Issues](http://docs.telerik.com/kendo-ui/troubleshoot/troubleshooting-memory-leaks)
* [Content Security Policy](http://docs.telerik.com/kendo-ui/troubleshoot/content-security-policy)
* [Common Issues in Kendo UI Excel Export](http://docs.telerik.com/kendo-ui/framework/excel/troubleshoot/common-issues)
* [Common Issues in Kendo UI Charts](http://docs.telerik.com/kendo-ui/controls/charts/troubleshoot/common-issues)
* [Performance Issues in Kendo UI Widgets for Data Visualization](http://docs.telerik.com/kendo-ui/troubleshoot/troubleshooting-memory-leaks)
* [Common Issues in Kendo UI ComboBox](http://docs.telerik.com/kendo-ui/controls/editors/combobox/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI Diagram](http://docs.telerik.com/kendo-ui/controls/diagrams-and-maps/diagram/troubleshoot/common-issues)
* [Common Issues in Kendo UI DropDownList](http://docs.telerik.com/kendo-ui/controls/editors/dropdownlist/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI Editor](http://docs.telerik.com/kendo-ui/controls/editors/editor/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI MultiSelect](http://docs.telerik.com/kendo-ui/controls/editors/multiselect/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI Scheduler](http://docs.telerik.com/kendo-ui/controls/scheduling/scheduler/troubleshoot/troubleshooting)
* [Common Issues in Kendo UI Upload](http://docs.telerik.com/kendo-ui/controls/editors/upload/troubleshoot/troubleshooting)
* [Common Issues Related to Styling, Appearance, and Rendering](http://docs.telerik.com/kendo-ui/styles-and-layout/troubleshoot/troubleshooting)
