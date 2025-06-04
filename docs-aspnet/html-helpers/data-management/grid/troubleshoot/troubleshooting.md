---
title: Common Issues
page_title: Common Troubleshooting Issues
description: "Learn about the solutions of common issues that may occur while working with the {{ site.product }} Grid."
slug: troubleshoot_gridhelper_aspnetmvc
position: 1
---

# Common Issues

This article provides solutions for common issues you might encounter while working with the Telerik UI Grid component for {{ site.framework }}.

## Grid Performs HTTP GET Requests instead of POST

By default, the Grid makes `POST` requests when configured for [`Ajax` data binding]({% slug htmlhelpers_grid_aspnetcore_ajaxbinding %}). This is implemented by a custom DataSource transport and schema, defined in the `kendo.aspnetmvc.min.js` script file.

**Solution**: Make sure the `kendo.aspnetmvc.min.js` file is included after the `kendo.all.min.js` file. For more information, refer to the [required client-side resources article]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}).

The following example demonstrates the correct order of required Kendo UI script files.

{% if site.core %}
```HTML _Layout.cshtml
<script src="~/lib/kendo-ui/js/kendo.all.min.js"></script>
<script src="~/lib/kendo-ui/js/kendo.aspnetmvc.min.js"></script>
```
{% else %}
```HTML _Layout.cshtml
<script src="~/Scripts/kendo-ui/js/kendo.all.min.js"></script>
<script src="~/Scripts/kendo-ui/js/kendo.aspnetmvc.min.js"></script>
```
{% endif %}

## Ajax-Bound Grid Does Not Populate

The causes of this issue are various.

**Solution**

1. Use your browser developer console to check for any JavaScript errors. In most browsers pressing `F12` displays the developer console. Address all JavaScript errors.
1. Check the **Network**&mdash;or **Net** in Firebug&mdash;tab of the browser developer console. Look for a failed HTTP request for the action method configured via the `DataSource` Grid setting.

    * HTTP status code [401](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#401) indicates that the required authentication has failed or has not been provided yet.
    * HTTP status code [403](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#403) indicates that the request is not authorized. Perhaps the current user does not have     the required permissions.
    * HTTP status code [404](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#404) indicates that the requested URL cannot be found. Check if the controller and action names are spelled correctly.
    * HTTP status code [500](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#500) indicates that a server error occurred while processing the request. Check what the server response is. In most cases, it will contain the full `.NET` stacktrace. If the reason for the exception is not clear, put a break-point in the action method and break with the debugger. Also, refer to the [article on well-known exceptions]({% slug knownexceptions_gridhelper_aspnetmvc %}).

1. Check if you are using the `ToDataSourceResult` extension method. That method returns the data in the JSON format expected by the Grid.

{% if site.mvc %}
## Client-Side Events Are Not Raised in Server-Bound Mode

When configured for server-binding, the Grid for ASP.NET MVC does not fire all [client-side events](https://www.telerik.com/aspnet-mvc/documentation/api/kendo.mvc.ui.fluent/grideventbuilder).

For more information on how to resolve this issue, refer to the [server-binding Grid documentation]({% slug serverbinding_grid_aspnetmvc %}#supported-client-side-events).

For an `Ajax` bound Grid, make sure the `ServerOperation(false)` property of the DataSource is set.
{% endif %}

## Grid Fails to Update Dates and Numbers When Current Culture Is Not en-US

Make sure the respective culture script file included (for example, `kendo.culture.es-ES.min.js`). For more information, refer to the [globalization documentation]({% slug overview_globalization_core%}#applying-cultures).

{% if site.mvc %}
## Column Templates Are Not Displayed

* Case 1&mdash;The column template is not displayed if the server template is set, but the Grid is configured for [`Ajax` binding]({% slug htmlhelpers_grid_aspnetcore_ajaxbinding %}).

    **Solution**: Set the `ClientTemplate` option, as well.

* Case 2&mdash;The column template is not displayed if only the client template is set, but the Grid is configured for [server-binding]({% slug serverbinding_grid_aspnetmvc %}).

    **Solution**: Set the `Template` option, as well.

{% endif %}

## "X" DataSource Configuration Option Is Not Available

Not all settings of the DataSource are exposed through the `DataSource` fluent API.

**Solution**: To gain full control over the DataSource, consider using the [`Custom()` DataSource](https://demos.telerik.com/{{ site.platform }}/grid/custom-datasource) fluent API.

## Grid Fires Create Action instead of Update Action

If an `ID` value is not specified for a given data item, the DataSource of the Grid treats it as a new data item and calls the `Create` action.

**Solution**: Define the `Id` option in the `Model()` configuration of the DataSource to ensure the Create, Update, and Destroy operations work correctly. The specified `Id` field acts as an identifier of the Model.  

```HtmlHelper
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()    
    .Name("grid")    
    ... // Additional configuration.
    .DataSource(dataSource => dataSource        
        .Ajax()         
        .Model(model => model.Id(p => p.ProductID))
        ...
    )
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-grid name="grid">
    <datasource type="DataSourceTagHelperType.Ajax">
        <schema data="Data" total="Total">
            <model id="ProductID"></model>
        </schema>
    </datasource>
    <!-- Additional configuration. -->
</kendo-grid>
```
{% endif %}

## Grid Does Not Display Numbers and Dates in the Correct Culture Format

By default, the Grid formats dates and numbers using the `en-US` culture.

If the Grid does not display the numbers and dates in a format that matches the server-side culture of the application, update the client-side culture to match the server-side culture, as described in the [globalization documentation]({% slug overview_globalization_core%}#matching-cultures).

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Basic Usage of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid)
* [Using the API of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/api)
* [Server-Side API](/api/grid)
