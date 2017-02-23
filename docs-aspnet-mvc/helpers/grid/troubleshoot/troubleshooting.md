---
title: Common Issues
page_title: Common Issues | Grid HtmlHelper Troubleshooting
description: "Learn about the solutions of common issues that may occur while working with Kendo UI Grid for ASP.NET MVC."
slug: troubleshoot_gridhelper_aspnetmvc
position: 1
---

# Common Issues

## Requests

### Grid Performs HTTP GET Requests instead of POST

By default, the Kendo UI Grid for ASP.NET MVC makes POST requests when configured for [Ajax binding]({% slug ajaxbinding_grid_aspnetmvc %}). This is implemented by a custom DataSource transport and schema. Those are defined in the `kendo.aspnetmvc.min.js`.

**Solution**

Make sure this file is included after the other Kendo UI JavaScript files. For more information, refer to the [ASP.NET MVC introductory article]({% slug overview_aspnetmvc %}).

The following example demonstrates the correct order of JavaScript files.

###### Example

```
<script src="/Scripts/kendo.all.min.js"></script>
<script src="/Scripts/kendo.aspnetmvc.min.js"></script>
```

## Binding

Learn about the Kendo UI components for React which are delivered by the Inputs package.

### Ajax-Bound Grid Does Not Populate

There are various reasons which may cause this.

**Solution**

Below are listed the steps for you to follow when troubleshooting this issue.

1. Use your browser developer console to check for any JavaScript errors. In most browsers pressing `F12` displays the developer console. Address all JavaScript errors.

    For more information, refer to the [Telerik UI for ASP.NET MVC troubleshooting article]({% slug troubleshooting_aspnetmvc %}).

1. Check the **Network**&mdash;or **Net** in Firebug&mdash;tab of the browser developer console. Look for a failed HTTP request for the action method configured via the `DataSource` Grid setting.

    * HTTP status code [401](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#401) indicates that the required authentication has failed or has not been provided yet.
    * HTTP status code [403](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#403) indicates that the request is not authorized. Perhaps the current user does not have     the required permissions.
    * HTTP status code [404](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#404) indicates that the requested URL cannot be found. Check if the controller and action names are spelled correctly.
    * HTTP status code [500](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#500) indicates that a server error occurred while processing the request. Check what the server response is. In most cases, it will contain the full `.NET` stacktrace. If the reason for the exception is not clear, put a break-point in the action method and break with the debugger. Also, refer to the [article on well-known exceptions]({% slug knownexceptions_gridhelper_aspnetmvc %}).

1. Check if you are using the `ToDataSourceResult` extension method. That method returns the data in the JSON format expected by the Kendo UI Grid. For further instructions, refer to the [article on Grid Ajax binding]({% slug ajaxbinding_grid_aspnetmvc %}).

### Client-Side Events Are Not Raised in Server-Bound Mode

When configured for server binding, the Kendo UI Grid for ASP.NET MVC does not fire all client-side events.

**Solution**

For more information on how to resolve this issue, refer to the [article on server binding of the Grid]({% slug serverbinding_grid_aspnetmvc %}#supported-client-side-events).

## Performance

### Grid Fails to Update Dates and Numbers When Current Culture Is Not en-US

**Solution**

Make sure the JavaScript file for that culture is included. For additional information on this issue, refer to [this section](#include-javascript-for-the-current-culture-razor).

### Column Templates Are Not Displayed

* **Case 1** The column template is not displayed if the server template is set but the Grid is configured for Ajax binding.

    **Solution**

    Set the [`ClientTemplate`]({% slug configuration_gridhelper_aspnetmvc %}#clienttemplate) as well.

* **Case 2** The column template might also not be displayed if only the client template is set but the Grid is configured for server binding.

    **Solution**

    Set the [Template]({% slug configuration_gridhelper_aspnetmvc %}#template) as well.

### "X" DataSource Configuration Option Is Not Available

Not all settings of the DataSource are exposed through the `DataSource` fluent API.

**Solution**

To gain full control over the DataSource, consider using the [`CustomDataSource`]({% slug customdatasource_aspnetmvc %}) fluent API or the client-side version of the Kendo UI Grid.

### Grid Fires Create Actions instead of Update Actions

If an ID value is not set for a given data item, the Grid treats it as new and calls the `Create` action.

**Solution**

The ID value should be non-default for the used data field type.

## Culture Formats

By default, the Kendo UI Grid formats dates and numbers using the `en-US` culture.

**Solution**

If the Grid does not display numbers and dates in the right format that corresponds to your culture, change the culture by including the JavaScript for your culture and then call `kendo.culture`.

### Culture-Specific Kendo UI JavaScript

The following example demonstrates how to include culture-specific Kendo UI JavaScript.

###### Example

    <script src="/Scripts/cultures/kendo.culture.de-DE.js"></script>
    <script>
        kendo.culture("de-DE");
    </script>

### JavaScript for Current Cultures

The following example demonstrates how to include JavaScript for the current culture.

###### Example

```tab-ASPX

    <%
        var culture = System.Threading.Thread.CurrentThread.CurrentCulture.ToString();
    %>
    <script src="<%= Url.Content("~/Scripts/cultures/kendo.culture." + culture + ".min.js") %>"></script>
    <script>
        kendo.culture("<%= culture %>");
    </script>
```
```tab-Razor

    @{
        var culture = System.Threading.Thread.CurrentThread.CurrentCulture.ToString();
    }
    <script src="@Url.Content("~/Scripts/cultures/kendo.culture." + culture + ".min.js")"></script>
    <script>
        kendo.culture("@culture");
    </script>
```

For additional information on this issue, refer to the [article on globalization]({% slug globalization_aspnetmvc %}).

## See Also

Other articles on the Kendo UI Grid for ASP.NET MVC:

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [Configuration of the Grid HtmlHelper]({% slug configuration_gridhelper_aspnetmvc %})
* [Scaffolding]({% slug scaffoldinggrid_aspnetmvc %})
* [Excel Export]({% slug excelexport_gridhelper_aspnetmvc %})
* [Frequently Asked Questions]({% slug freqaskedquestions_gridhelper_aspnetmvc %})
* [Binding of the Grid HtmlHelper]({% slug ajaxbinding_grid_aspnetmvc %})
* [Editing of the Grid HtmlHelper]({% slug ajaxediting_grid_aspnetmvc %})
* [Templating of the Grid HtmlHelper]({% slug clientdetailtemplate_grid_aspnetmvc %})
* [API Reference of the Grid HtmlHelper](/api/Kendo.Mvc.UI.Fluent/GridBuilder)
* [Overview of the Kendo UI Grid Widget](http://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)

Articles on Telerik UI for ASP.NET MVC:

* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

Other articles on troubleshooting:

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
* [Common Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_aspnetmvc %})
* [Validation Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_validation_aspnetmvc %})
* [Scaffolding Issues in Telerik UI for ASP.NET MVC]({% slug troubleshooting_scaffolding_aspnetmvc %})
* [Excel Export with the Grid ASP.NET MVC HtmlHelper Extension]({% slug excelissues_gridhelper_aspnetmvc %})
* [Known Exceptions in the Grid ASP.NET MVC HtmlHelper Extension]({% slug knownexceptions_gridhelper_aspnetmvc %})
* [Common Issues in the Spreadsheet ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_spreadsheethelper_aspnetmvc %})
* [Common Issues in the Upload ASP.NET MVC HtmlHelper Extension]({% slug troubleshoot_uploadhelper_aspnetmvc %})
