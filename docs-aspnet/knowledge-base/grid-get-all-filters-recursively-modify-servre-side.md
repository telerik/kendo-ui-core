---
title: Get All Grid Filters Recursively and Modify Them on the Server
page_title: Get All Grid Filters Recursively and Modify Them on the Server
description: "Get all {{ site.product }} Grid filters recursively and modify them server side in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/Filtering/get-all-filters-recursively-modify-servre-side, /html-helpers/data-management/grid/how-to/Filtering/get-all-filters-recursively-modify-servre-side
slug: howto_getallfiltersrecursivelymodifyserverside_gridaspnetmv
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
  <td>Product version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I access all requested filters recursively and modify them on the server?

## Solution

You can achieve this requirement using the following implementation:

1. Configure the Grid for Ajax data binding.

    ```HtmlHelper
    @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.GridModifyFiltersOnTheServer.Models.Order>()
        .Name("grid")
        .Filterable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Read", "Home"))
            ... // Additional options.
        )
        ... // Additional configuration.
    )
    ```

1. Retrieve the requested filters through the `DataSourceRequest` object and adjust filter criteria on the server side before processing the request.

    ```C#
    public ActionResult Read([DataSourceRequest] DataSourceRequest request)
    {
        ModifyFilters(request.Filters);

        return Json(OrderRepository.GetAll().ToDataSourceResult(request));
    }

    private void ModifyFilters(IEnumerable<IFilterDescriptor> filters)
    {
        if (filters.Any())
        {
            foreach (var filter in filters)
            {
                var descriptor = filter as FilterDescriptor;
                if (descriptor != null && descriptor.Member == "OrderDate")
                {
                    descriptor.Member = "OrderDate.Date";
                }
                else if (filter is CompositeFilterDescriptor)
                {
                    ModifyFilters(((CompositeFilterDescriptor)filter).FilterDescriptors);
                }
            }
        }
    }
    ```

To see the complete example, refer to the [project on how to access all Grid filters and modify them on the server based on your requirements](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridModifyFiltersOnTheServer).

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


