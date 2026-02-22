---
title: Implement Self-Referencing Hierarchy of Grids
page_title: Implement Self-Referencing Hierarchy of Grids
description: "Implement a {{ site.product }} Grid that builds multiple levels of hierarchy by using a single table of data."
previous_url: /helpers/data-management/grid/how-to/Binding/grid-self-referencing-hierarchy, /html-helpers/data-management/grid/how-to/Binding/grid-self-referencing-hierarchy
slug: howto_usegridselfrefhierarchy_gridaspnetmv
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

How can I create a Grid that builds multiple levels of hierarchy by using a single table of data?

## Solution

Define the parent Grid and initialize the child grid in the `DetailInit` event handler by using the parent Grid's data:

```HtmlHelper
@(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.GridHierarchySelfReferencing.Models.Customer>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(c => c.Id).Width(100);
        columns.Bound(c => c.Name);
        columns.Bound(c => c.Sales).Width(200);
    })
    .Events(e => e.DetailInit("detailInit"))
    .DataSource(dataSource => dataSource
        .Ajax()
        // Apply operations on the client - paging, filtering, and more.
        .ServerOperation(false)
        // Set an initial filter to display only the parent records ("ParentId = 0").
        .Filter(filter => filter.Add(c => c.ParentId).IsEqualTo(0))
        .Read("Read", "Home")
    )
)
```
```JS
function detailInit(e) {
    // Get a reference to the parent Grid.
    var grid = $("#grid").data("kendoGrid");
    // Access its DataSource.
    var dataSource = grid.dataSource;
    // Get the "Id" of the current data item.
    var parentId = e.data.Id;
    // Create a new DataSource insatance that contains only the child items.
    var children = new kendo.data.DataSource({
        // Use the data of the parent DataSource.
        data: dataSource.data(),
        // Filter the data to load only the child data items.
        filter: {
            field: "ParentId",
            operator: "eq",
            value: parentId
        }
    });
    // Read the child Grid's data.
    children.read();
    // Check if there are any child items.
    if (children.view().length > 0) {
        // Clone the parent Grid options.
        var options = $.extend(grid.options, { dataSource: children });
        // Create a new child Grid and append it to the detail cell.
        $("<div>").appendTo(e.detailCell)
            .kendoGrid(options)
    } else {
        // If there are no child items, remove the detail row and the expand/collapse icon.
        e.detailRow.remove();
        e.masterRow.find(".k-icon").remove();
    }
}
```

To review the complete example, refer to the [project on how to implement a Grid that builds multiple levels of hierarchy, using a single table of data](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridHierarchySelfReferencing).

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