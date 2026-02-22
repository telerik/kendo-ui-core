---
title: Save Grid State Using the URL History Browser API
page_title: Save Grid State Using the URL History Browser API
description: "Save the state of the {{ site.product }} Grid by using the URL history browser API in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/state/save-state-with-url-browser-history-api, /html-helpers/data-management/grid/how-to/state/save-state-with-url-browser-history-api
slug: howto_savestateurlhistorybrowserapi_gridaspnetmv
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

How can I save the current Grid state by using the URL history browser API?

## Solution

The solution relies on the following key steps:

1. Define the Grid and handle its `DataBound` event:

    ```HtmlHelper
    @model IEnumerable<Product>

    @(Html.Kendo().Grid(Model)
        .Name("Grid")
        .DataSource(ds => ds
            .Ajax()
            .PageSize(5)
            .Model(m =>
            {
                m.Id(p => p.ProductID);
            })
            .Read(r => r.Action("Read", "Home"))
        )
        .Events(ev => ev.DataBound("onDataBound"))
        ...// Additional configuration.
    )
    ```

1. Within the `DataBound` event handler, add a custom logic that appends the current state of the Grid, such as the current page, sorting, filtering, and page size, to the URL in the browser's address bar.

    ```JS
    function onDataBound(e) {
        var grid = $('#Grid').data('kendoGrid');
        // Use the "parameterMap" to create the request object.
        var requestObject = (new kendo.data.transports["aspnetmvc-server"]({ prefix: "" }))
        .options.parameterMap({
            page: grid.dataSource.page(),
            sort: grid.dataSource.sort(),
            filter: grid.dataSource.filter()
        });

        // Construct the URL of the page.
        var href = '@(Url.Action("Index", "Home"))' + "?Grid-page=~&Grid-pageSize=~&Grid-filter=~&Grid-sort=~";

        // Update the 'page' parameter with the grid's current page.
        href = href.replace(/page=([^&]*)/, 'page=' + requestObject.page || '~');


        // Update the 'sort' parameter with the grid's current sort descriptor.
        href = href.replace(/sort=([^&]*)/, 'sort=' + requestObject.sort || '~');

        // Update the 'pageSize' parameter with the grid's current 'pageSize'.
        href = href.replace(/pageSize=([^&]*)/, 'pageSize=' + grid.dataSource._pageSize);

        // Update filter descriptor with the applied filters.
        href = href.replace(/filter=([^&]*)/, 'filter=' + (requestObject.filter || '~'));

        history.pushState({}, "URL Rewrite Example", href);
    }
    ```

To review the complete example,  refer to the [project on how to save the current state of the Telerik UI Grid by using the URL history browser API](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridSaveStateWithBrowserHistoryAPI) in ASP.NET MVC applications.

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
