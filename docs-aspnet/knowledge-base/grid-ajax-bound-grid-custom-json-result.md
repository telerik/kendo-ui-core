---
title: Use Custom JsonResult with Ajax-Bound Grids
page_title: Use Custom JsonResult with Ajax-Bound Grids
description: "Create a custom JSON result to change the default JSON serializer when using {{ site.product }} Grid."
previous_url: /helpers/data-management/grid/how-to/Binding/ajax-bound-grid-custom-json-result, /html-helpers/data-management/grid/how-to/Binding/ajax-bound-grid-custom-json-result
slug: howto_usecustomjsonresultajaxbound_gridaspnetmvc
component: grid
type: how-to
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I use custom `JsonResult` when the {{ site.product }} Grid is configured for Ajax data binding?

## Solution

This example demonstrates how to use a custom JSON serializer for the Controller and the server-bound data of the Grid.

For the Controller, this is achieved by overriding the `Json` method. For the Grid, this is achieved through the registration (with the ID) of a custom `IJavaScriptInitializer` implementation on the application `start` event.

The example relies on the following key steps:

1. Define the Grid for Ajax data binding:

    ```HtmlHelper
    @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.GridAjaxBindingCustomJsonResult.Models.Product>()
        .Name("Grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ID);
            columns.Bound(p => p.Name);
        })
        .Pageable()
        .Sortable()
        .Filterable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .ServerOperation(false)
            .Read("Read", "Home")
        )
    )
    ```
2. Return the data using the custom `JsonResult` method:

    ```C#
        protected override JsonResult Json(object data, string contentType, Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new CustomJsonResult
            {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior
            };
        }

        public ActionResult Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(products.ToDataSourceResult(request));
        }
    ```

To review the complete example, refer to the ASP.NET MVC application on how to [use a custom `JsonResult` with an Ajax-bound Grid](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridAjaxBindingCustomJsonResult).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

