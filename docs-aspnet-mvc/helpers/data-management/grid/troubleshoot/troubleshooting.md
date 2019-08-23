---
title: Common Issues
page_title: Common Troubleshooting Issues | Telerik UI Grid HtmlHelper for ASP.NET MVC
description: "Learn about the solutions of common issues that may occur while working with Kendo UI Grid for ASP.NET MVC."
slug: troubleshoot_gridhelper_aspnetmvc
position: 1
---

# Common Issues

This article provides solutions for common issues you might encounter while working with the Telerik UI for ASP.NET MVC Grid HtmlHelper.

## Grid Performs HTTP GET Requests instead of POST

By default, the Kendo UI Grid for ASP.NET MVC makes POST requests when configured for [Ajax binding]({% slug ajaxbinding_grid_aspnetmvc %}). This is implemented by a custom DataSource transport and schema. Those are defined in the `kendo.aspnetmvc.min.js`.

**Solution** Make sure this file is included after the other Kendo UI JavaScript files. For more information, refer to the [ASP.NET MVC introductory article]({% slug overview_aspnetmvc %}).

The following example demonstrates the correct order of JavaScript files.

    <script src="/Scripts/kendo.all.min.js"></script>
    <script src="/Scripts/kendo.aspnetmvc.min.js"></script>

## Ajax-Bound Grid Does Not Populate

The causes of this issue are various.

**Solution**

1. Use your browser developer console to check for any JavaScript errors. In most browsers pressing `F12` displays the developer console. Address all JavaScript errors.
1. Check the **Network**&mdash;or **Net** in Firebug&mdash;tab of the browser developer console. Look for a failed HTTP request for the action method configured via the `DataSource` Grid setting.

    * HTTP status code [401](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#401) indicates that the required authentication has failed or has not been provided yet.
    * HTTP status code [403](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#403) indicates that the request is not authorized. Perhaps the current user does not have     the required permissions.
    * HTTP status code [404](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#404) indicates that the requested URL cannot be found. Check if the controller and action names are spelled correctly.
    * HTTP status code [500](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#500) indicates that a server error occurred while processing the request. Check what the server response is. In most cases, it will contain the full `.NET` stacktrace. If the reason for the exception is not clear, put a break-point in the action method and break with the debugger. Also, refer to the [article on well-known exceptions]({% slug knownexceptions_gridhelper_aspnetmvc %}).

1. Check if you are using the `ToDataSourceResult` extension method. That method returns the data in the JSON format expected by the Kendo UI Grid. For further instructions, refer to the [article on Grid Ajax binding]({% slug ajaxbinding_grid_aspnetmvc %}).

## Client-Side Events Are Not Raised in Server-Bound Mode

When configured for server binding, the Kendo UI Grid for ASP.NET MVC does not fire all client-side events.

**Solution** For more information on how to resolve this issue, refer to the [article on server binding of the Grid]({% slug serverbinding_grid_aspnetmvc %}#supported-client-side-events).

## Grid Fails to Update Dates and Numbers When Current Culture Is Not en-US

**Solution** Make sure the JavaScript file for that culture is included. For additional information on this issue, refer to [this section](#include-javascript-for-the-current-culture-razor).

## Column Templates Are Not Displayed

* **Case 1** The column template is not displayed if the server template is set but the Grid is configured for Ajax binding.

    **Solution** Set the [`ClientTemplate`]({% slug configuration_gridhelper_aspnetmvc %}#clienttemplate) as well.

* **Case 2** The column template might also not be displayed if only the client template is set but the Grid is configured for server binding.

    **Solution** Set the [Template]({% slug configuration_gridhelper_aspnetmvc %}#template) as well.

## "X" DataSource Configuration Option Is Not Available

Not all settings of the DataSource are exposed through the `DataSource` fluent API.

**Solution** To gain full control over the DataSource, consider using the [`CustomDataSource`]({% slug customdatasource_aspnetmvc %}) fluent API or the client-side version of the Kendo UI Grid.

## Grid Fires Create Actions instead of Update Actions

If an ID value is not set for a given data item, the Grid treats it as new and calls the `Create` action.

**Solution** The ID value should be non-default for the used data field type.

## Grid Does Not Display Numbers and Dates in the Right Culture Format

By default, the Kendo UI Grid formats dates and numbers using the `en-US` culture.

**Solution** If the Grid does not display numbers and dates in the right format that corresponds to your culture, change the culture by including the JavaScript for your culture and then call `kendo.culture`.

## Grid Does Not Display Culture-Specific Kendo UI JavaScript

The following example demonstrates how to include culture-specific Kendo UI JavaScript.

    <script src="/Scripts/cultures/kendo.culture.de-DE.js"></script>
    <script>
        kendo.culture("de-DE");
    </script>

## Grid Does Not Include JavaScript for Current Cultures

The following example demonstrates how to include JavaScript for the current culture.

```ASPX
    <%
        var culture = System.Threading.Thread.CurrentThread.CurrentCulture.ToString();
    %>
    <script src="<%= Url.Content("~/Scripts/cultures/kendo.culture." + culture + ".min.js") %>"></script>
    <script>
        kendo.culture("<%= culture %>");
    </script>
```
```Razor
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

* [Basic Usage of the Grid HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/grid)
* [Using the API of the Grid HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/grid/api)
* [Server-Side API](/api/grid)
