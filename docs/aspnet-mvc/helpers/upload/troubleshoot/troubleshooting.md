---
title: Common Issues
page_title: Common Issues | Upload HtmlHelper Troubleshooting
description: "Learn about the solutions of common issues that may occur while working with Kendo UI Upload for ASP.NET MVC."
slug: troubleshoot_uploadhelper_aspnetmvc
position: 1
---

# Common Issues

This page provides solutions for common problems you may encounter while working with the Kendo UI Upload HtmlHelper.

## Uploading

### No Files Are Uploaded

**Solution**

Make sure that the action parameter is of type `IEnumerable<HttpPostedFileBase>` or `HttpPostedFileBase`.

> **Important**
>
> Using HttpPostedFile does not work.

### Uploading Large Files Is Impossible

By default, ASP.NET limits the size of the maximum upload to 4MB. Additionally, IIS 7 and later limits the request size to 30MB.

**Solution**

Override these settings in the `web.config` file. Below are listed the steps for you to follow when doing this.

**Step 1** Increase the allowed request size and execution timeout in the `httpRuntime` section.

###### Example

        <system.web>
            <!-- The request length is in kilobytes, execution timeout is in seconds  -->
            <httpRuntime maxRequestLength="10240" executionTimeout="120" />
        </system.web>

**Step 2** Increase the allowed request size for IIS 7 in the `requestFiltering` section.

###### Example

        <system.webServer>
                <security>
                    <requestFiltering>
                        <!-- The content length is in bytes  -->
                        <requestLimits maxAllowedContentLength="10485760"/>
                    </requestFiltering>
                </security>
        </system.webServer>

## Requests

### Requests to ASP.NET MVC Actions Are Blocked during Upload

**Solution**

Below are listed the steps for you to follow when doing this.

**Step 1** Change the controller [Session State Behavior](http://msdn.microsoft.com/en-us/library/system.web.sessionstate.sessionstatebehavior.aspx) to `ReadOnly` or `Disabled`.

For more information on this topic, refer to the [article on concurrent requests in ASP.NET MVC](http://weblogs.asp.net/imranbaloch/archive/2010/07/10/concurrent-requests-in-asp-net-mvc.aspx)

**Step 2** Enable request batching to reduce the number of concurrent requests.

###### Example

        .Async(async => async
            .Save("Save", "Home")
            .Batch(true)
        )

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Upload:

* [Overview of the Upload HtmlHelper]({% slug overview_uploadhelper_aspnetmvc %})
* [Upload HtmlHelper Modes of Operation]({% slug modesoperation_uploadhelper_aspnetmvc %})
* [Sending and Receiving Metadata with the Upload HtmlHelper]({% slug metadata_uploadhelper_aspnetmvc %})
* [How to Upload Files from Grid Popup Editors in ASP.NET MVC Applications]({% slug howto_uploadfilesgridpopupeditor_uploadaspnetmvc %})
* [How to Upload Files to Databases in ASP.NET MVC Applications]({% slug howto_uploadfilesdatabases_uploadaspnetmvc %})
* [Overview of the Kendo UI Upload Widget]({% slug overview_kendoui_upload_widget %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})

Other articles on troubleshooting:

* [Common Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_aspnetmvc %})
* [Validation Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_validation_aspnetmvc %})
* [Scaffolding Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_scaffolding_aspnetmvc %})
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [Excel Export with the Grid ASP.NET MVC HtmlHelper Extension]({% slug excelissues_gridhelper_aspnetmvc %})
* [Common Issues in the Spreadsheet ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
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
