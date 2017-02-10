---
title: Common Issues
page_title: Common Issues | Upload HtmlHelper Troubleshooting
description: "Learn about the solutions of common issues that may occur while working with Kendo UI Upload for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/upload/troubleshooting
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

### The Upload of Large Files Is Impossible

By default, ASP.NET limits the size of the maximum upload to 4MB. Additionally, IIS 7 and later limits the request size to 30MB.

**Solution**

Override these settings in the `web.config` file. Below are listed the steps for you to follow when doing this.

1. Increase the allowed request size and execution timeout in the `httpRuntime` section.

    ###### Example

            <system.web>
                <!-- The request length is in kilobytes, execution timeout is in seconds  -->
                <httpRuntime maxRequestLength="10240" executionTimeout="120" />
            </system.web>

1. Increase the allowed request size for IIS 7 in the `requestFiltering` section.

    ###### Example

            <system.webServer>
                    <security>
                        <requestFiltering>
                            <!-- The content length is in bytes  -->
                            <requestLimits maxAllowedContentLength="10485760"/>
                        </requestFiltering>
                    </security>
            </system.webServer>

### The Upload Never Ends in Safari on iOS and OSX

The issue is caused by a bug in Safari and occurs only when the **Windows authentication and disabled Anonymous Authentication** setting is enabled. It is reproducible with a standard `<input type="file" name="file" enctype="multipart/form-data" />` HTML element in ASP.NET MVC and Web Forms applications.

> **Important**
>
> Because the **File Browser** dialogs of the Kendo UI Editor for ASP.NET MVC rely on the Upload control, the issue might occur when uploading images and other files through them on MAC Safari.

**Solution**

The solution solely depends on a dedicated decision by Apple about whether and when to fix this browser issue. However, you can work around it by applying the suggestions provided in the [Programmatically enable or disable anonymous authentication in IIS](http://stackoverflow.com/questions/28419304/programmatically-enable-or-disable-anonymous-authentication-in-iis) StackOverflow thread. This means to build a separate web service for file upload with an authentication setting, such as **Anonymous** for Safari scenarios, and the main application authentication setting, such as **Windows Authentication**.

## Requests

### Requests to ASP.NET MVC Actions Are Blocked during Upload

**Solution**

Below are listed the steps for you to follow when doing this.

1. Change the controller [Session State Behavior](http://msdn.microsoft.com/en-us/library/system.web.sessionstate.sessionstatebehavior.aspx) to `ReadOnly` or `Disabled`. For more information on this topic, refer to the [article on concurrent requests in ASP.NET MVC](http://weblogs.asp.net/imranbaloch/archive/2010/07/10/concurrent-requests-in-asp-net-mvc.aspx)

1. Enable request batching to reduce the number of concurrent requests.

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
* [Overview of the Kendo UI Upload Widget](http://docs.telerik.com/kendo-ui/controls/editors/upload/overview)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})

Other articles on troubleshooting:

* [Common Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_aspnetmvc %})
* [Validation Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_validation_aspnetmvc %})
* [Scaffolding Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_scaffolding_aspnetmvc %})
* [Common Issues in the Grid ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [Excel Export with the Grid ASP.NET MVC HtmlHelper Extension]({% slug excelissues_gridhelper_aspnetmvc %})
* [Common Issues in the Spreadsheet ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
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
