---
title: Export Grid Data to CSV Files
page_title: Export Grid Data to CSV Files
description: "Export the {{ site.product }} Grid data to CSV (comma-separated value) file."
previous_url: /helpers/data-management/grid/how-to/Export/csv-export-server-side, /html-helpers/data-management/grid/how-to/Export/csv-export-server-side
slug: howto_exportgriddatacsvfile_gridaspnetmv
component: grid
type: how-to
res_type: kb
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

How can I export the Grid's data to CSV format?

## Solution

You can implement the CSV export by following the next steps:

1. Define the Grid and specify a custom command in the toolbar that will trigger the CSV export. Also, handle the `DataBound` event of the Grid.

    ```HtmlHelper
    @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.GridCsvServerExport.Models.Product>()
        .Name("Grid")
        .DataSource(ds => ds
            .Ajax()
            .Model(m =>
            {
                m.Id(p=>p.ProductID);
            })
            .Read(r => r.Action("Read", "Home"))
        )
        .ToolBar(toolBar => toolBar
            .Custom()
            .Text("Export To CSV")
            .HtmlAttributes(new { id = "export" })
            .Url(Url.Action("Export", "Home", new { page = 1, pageSize = "~", filter = "~", sort = "~" }))
        )
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductID);
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Format("{0:c}");
            columns.Bound(p => p.QuantityPerUnit);
        })
        .Events(ev => ev.DataBound("onDataBound"))
        .Pageable()
        .Sortable()
        .Filterable()
    )
    ```

1. Within the `DataBound` event handler, add a custom logic that modifies the `href` attribute of the **Export To CSV** toolbar command to send the `page`, `sort`, `pagseSize`, and `filter` parameters to the server, when the command is clicked.

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

            // Get the export link as jQuery object.
            var $exportLink = $('#export');

            // Get its 'href' attribute - the URL where it would navigate to.
            var href = $exportLink.attr('href');

            // Update the 'page' parameter with the grid's current page.
            href = href.replace(/page=([^&]*)/, 'page=' + requestObject.page || '~');

            // Update the 'sort' parameter with the grid's current sort descriptor.
            href = href.replace(/sort=([^&]*)/, 'sort=' + requestObject.sort || '~');

            // Update the 'pageSize' parameter with the grid's current 'pageSize'.
            href = href.replace(/pageSize=([^&]*)/, 'pageSize=' + grid.dataSource._pageSize);

            // Update filter descriptor with the applied filters.
            href = href.replace(/filter=([^&]*)/, 'filter=' + (requestObject.filter || '~'));

            // Update the 'href' attribute.
            $exportLink.attr('href', href);
        }
    ```

1. Export the file using the following controller action:

    ```C#
    public FileResult Export([DataSourceRequest] DataSourceRequest request)
    {
        // Export only the current page
        var data = products.ToDataSourceResult(request).Data;
        // Export all pages (uncomment next line)
        //var data = products;

        var output = new MemoryStream();
        var writer = new StreamWriter(output, Encoding.UTF8);

        writer.Write("ProductName,");
        writer.Write("UnitPrice,");
        writer.Write("QuantityPerUnit");
        writer.WriteLine();

        foreach (Product product in data)
        {
            writer.Write(product.ProductName);
            writer.Write(",");
            writer.Write("\"");
            writer.Write(product.UnitPrice);
            writer.Write("\"");
            writer.Write(",");
            writer.Write("\"");
            writer.Write(product.QuantityPerUnit);
            writer.Write("\"");
            writer.WriteLine();
        }

        writer.Flush();
        output.Position = 0;

        return File(output, "text/comma-separated-values", "Products.csv");
    }
    ```

To review the complete example, refer to the [ASP.NET MVC project on how to implement a server-side export of the Grid's data to a CVS (comma-separated value) file](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridCsvServerExport).

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