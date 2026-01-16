---
title: Initialize Child Grids Rendered in ClientTemplates by Using the DataBound Event
page_title: Initialize Child Grids Rendered in ClientTemplates
description: "Learn how to initialize child {{ site.product }} Grids rendered inside ClientTemplates by evaluating them during the parent Grid DataBound event."
slug: grid-use-grid-as-client-template
component: grid
type: how-to
res_type: kb
components: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.4.1217</td>
 </tr>
</table>

## Description

How can I correctly initialize child Grids that are rendered inside a `ClientTemplate` of a parent {{ site.product }} Grid?

When a Grid is rendered inside a `ClientTemplate`, its initialization script is emitted as a script block and is not executed automatically. As a result, the child Grid does not initialize unless the script is explicitly evaluated after the parent Grid finishes rendering.

## Solution

You can achieve this requirement by evaluating the child Grid initialization scripts during the parent Grid `DataBound` event.

1. Define a parent Grid and render the child Grid inside a column `ClientTemplate`. Use a unique name for each child Grid instance.

        @(Html.Kendo().Grid<TelerikMvcApp35.Models.OrderViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.OrderID).Filterable(false);
                columns.Bound(p => p.Freight);
                columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}");
                columns.Bound(p => p.ShipName).ClientTemplate(
                    Html.Kendo().Grid<TelerikMvcApp35.Models.Test>()
                        .Name("components_#=OrderID#")
                        .Columns(col =>
                        {
                            col.Bound(c => c.TestId);
                            col.Bound(c => c.Name);
                            col.Bound(c => c.CustomText);
                        })
                        .HtmlAttributes(new { style = "width: 200px" })
                        .DataSource(dataSource => dataSource
                            .Ajax()
                            .PageSize(20)
                            .Read(read => read.Action("Test_Read", "Grid"))
                        )
                        .ToClientTemplate()
                        .ToHtmlString()
                );
                columns.Bound(p => p.ShipCity);
            })
            .Pageable()
            .Sortable()
            .Scrollable()
            .Filterable()
            .HtmlAttributes(new { style = "height:550px;" })
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(20)
                .Read(read => read.Action("Orders_Read", "Grid"))
            )
            .Events(e => e.DataBound("onDataBound"))
        )

2. Handle the parent Grid `DataBound` event and evaluate the script blocks that initialize the child Grids.

        function onDataBound() {
            var grid = this;

            grid.table.find("tr").each(function () {
                $(this).find("script").each(function () {
                    eval($(this).html());
                });
            });
        }

This approach ensures that each child Grid is initialized only after the corresponding parent row is rendered in the DOM.

## Notes

- Always use unique names for child Grids to avoid widget conflicts.
- This approach is required only when rendering Grids inside `ClientTemplate`.
- The solution works correctly with paging, sorting, and filtering enabled.
- Use `eval` only for widget initialization scripts.

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
