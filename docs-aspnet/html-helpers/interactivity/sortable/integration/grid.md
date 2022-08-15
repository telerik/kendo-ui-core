---
title: Grid
page_title: Grid Integration
description: "Learn how to reorder Grid items when using the Telerik UI Sortable component for {{ site.framework }}."
slug: sortable_aspnetcore_integration_grid
position: 1
---

# Grid Integration

You can use the [Telerik UI Sortable component for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/sortable/index) to reorder the items in a Grid by dragging and dropping.

## Prerequisites

* [Overview of the Telerik UI Sortable component for {{ site.framework }}]({% slug htmlhelpers_sortable_aspnetcore %})
* [Overview of the Telerik UI Grid component for {{ site.framework }}]({% slug htmlhelpers_grid_aspnetcore_overview %})
* [DataSource client-side API](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods)

## Reordering of Sortable Items

The Sortable reorders the HTML DOM elements. It does not automatically update the order of the items in the DataSource. This means that you have to explicitly implement the desired behavior.

## Reordering of Grid Table Rows

To reorder the table rows of the Grid, initialize the Sortable on the [`table` element](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/fields/table) of the Grid. Normally, the `filter` property of the Sortable selects all `tr` elements that are direct children of the table `tbody` element, for example, `filter: ">tbody >tr"`.

## Setting the Hint in the Grid

The `hint` element of the Sortable is appended to the `<body>` element. As a result, its width is different from the width of the Grid.

The following example demonstrates how to style the `hint` element so that the reordering takes place immediately.

```HtmlHelper
    @(Html.Kendo().Grid(Model)
        .Name("Grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName).Title("Product Name");
            columns.Bound(p => p.UnitPrice).Title("Unit Price").Width(130);
            columns.Bound(p => p.UnitsInStock).Title("Units In Stock").Width(130);
            columns.Bound(p => p.Discontinued).Width(130);
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(16)
            .ServerOperation(false)
        )
    )

    @(Html.Kendo().Sortable()
        .For("#Grid")
        .Filter("table > tbody > tr")
        .Cursor("move")
        .HintHandler("noHint")
        .PlaceholderHandler("placeholder")
        .ContainerSelector("#Grid tbody")
        .Events(events => events.Change("onChange"))
    )

    <script>
        var noHint = $.noop;

        function placeholder(element) {
            return element.clone().addClass("k-hover").css("opacity", 0.65);
        }

        function onChange(e) {
            var grid = $("#Grid").data("kendoGrid"),
                skip = grid.dataSource.skip(),
                oldIndex = e.oldIndex + skip,
                newIndex = e.newIndex + skip,
                data = grid.dataSource.data(),
                dataItem = grid.dataSource.getByUid(e.item.data("uid"));

            grid.dataSource.remove(dataItem);
            grid.dataSource.insert(newIndex, dataItem);
        }
    </script>

    <style>
        .k-grid tbody tr {
            cursor: move;
        }
    </style>
```
{% if site.core %}
```TagHelper
    @(Html.Kendo().Grid(Model)
        .Name("Grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName).Title("Product Name");
            columns.Bound(p => p.UnitPrice).Title("Unit Price").Width(130);
            columns.Bound(p => p.UnitsInStock).Title("Units In Stock").Width(130);
            columns.Bound(p => p.Discontinued).Width(130);
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(16)
            .ServerOperation(false)
        )
    )

    <kendo-sortable name="Grid" filter="table > tbody > tr" cursor="move" 
        hint="noHint" 
        placeholder="placeholder" 
        container="#Grid tbody"
        on-change="onChange" >
    </kendo-sortable>

    <script>
        var noHint = $.noop;

        function placeholder(element) {
            return element.clone().addClass("k-hover").css("opacity", 0.65);
        }

        function onChange(e) {
            var grid = $("#Grid").data("kendoGrid"),
                skip = grid.dataSource.skip(),
                oldIndex = e.oldIndex + skip,
                newIndex = e.newIndex + skip,
                data = grid.dataSource.data(),
                dataItem = grid.dataSource.getByUid(e.item.data("uid"));

            grid.dataSource.remove(dataItem);
            grid.dataSource.insert(newIndex, dataItem);
        }
    </script>

    <style>
        .k-grid tbody tr {
            cursor: move;
        }
    </style>
```
{% endif %}

## Reordering in Editable Grids

If the editing functionality of the Grid is enabled, use a more specific filter selector that excludes the item which is currently in editing mode, for example, `.filter(">tbody >tr:not(.k-grid-edit-row)")`. In this way, the Sortable functionality will not interfere with the editing feature of the Grid.

If the Grid is configured to display details, use a selector that matches only the master Grid rows, for example, `filter: ">tbody >tr.k-master-row"`. In this way, the detail rows will not be draggable.

For more information on the Sortable events, refer to the [JavaScript API article on Sortable events](/api/sortable#eventssystemactionkendomvcuifluentsortableeventbuilder) and the [demo on integrating the Sortable and the Grid](https://demos.telerik.com/{{ site.platform }}/sortable/integration-grid).

The editing functionality of the Telerik UI Grid for {{ site.framework }} is rendered through its [inline](https://demos.telerik.com/{{ site.platform }}/grid/editing-inline), [popup](https://demos.telerik.com/{{ site.platform }}/grid/editing-popup), and [batch](https://demos.telerik.com/{{ site.platform }}/grid/editing) edit modes. The inline and popup modes are more common and easier to implement than the batch edit mode.

### Using Grids in Inline and Popup Edit Modes

If you use the inline or the popup edit mode, set a more specific filter which excludes the item that is currently in edit mode.

    .filter(">tbody >tr:not(.k-grid-edit-row)")

### Using Grids in Batch Edit Mode

The draggable functionality of the Sortable prevents the `mousedown` event. As a result, the `change` event of the editor input does not fire which in turn prevents the MVVM from saving the updated value.

If you use the batch (incell) edit mode, the code from the previous example that is applied to the inline and popup edit modes will not work. To work around this issue, use [custom editors](https://demos.telerik.com/{{ site.platform }}/grid/editing-custom) and configure them to [update when the `input` event fires](https://docs.telerik.com/kendo-ui/framework/mvvm/bindings/value#controlling-when-the-view-model-is-updated)&mdash;by default, the framework listens for the `change` event. To implement the solution, add the `data-value-update="input"` attribute to the editor inputs. The downside of this approach is that the `input` event does not work for earlier Internet Explorer versions.

> The `data-value-update` approach works with regular inputs. However, you must manually configure the Telerik UI components for {{ site.framework }} as they do not support the `data-value-update` attribute.

## Reordering of DataSource Items

The `change` event of the Sortable fires after a row position is changed. You can bind to the `change` event to update the order of the items in the DataSource.

The following example demonstrates how to shift the position of the items in the DataSource.

    // The change event handler of the Sortable.
    function onChange(e) {
        var grid = e.sender.element.data("kendoGrid"),
            oldIndex = e.oldIndex , // The old position.
            newIndex = e.newIndex , // The new position.
            view = grid.dataSource.view(),
            dataItem = grid.dataSource.getByUid(e.item.data("uid")); // Retrieve the moved dataItem.

        dataItem.Order = newIndex; // Update the order.
        dataItem.dirty = true;

        // Shift the order of the records.
        if (oldIndex < newIndex) {
            for (var i = oldIndex + 1; i <= newIndex; i++) {
                view[i].Order--;
                view[i].dirty = true;
            }
        } else {
            for (var i = oldIndex - 1; i >= newIndex; i--) {
                view[i].Order++;
                view[i].dirty = true;
            }
        }

        grid.dataSource.sync(); // Submit the changes through the update transport and refresh the Grid.
    }

The following example demonstrates how to send the `newIndex` and `oldIndex` to the server.

    // The change event handler of the Sortable.
    function onChange(e) {
        var grid = e.sender.element.data("kendoGrid"),
            oldIndex = e.oldIndex , // The old position.
            newIndex = e.newIndex , // The new position.
            dataItem = grid.dataSource.getByUid(e.item.data("uid")); // Retrieve the moved dataItem.

        $.ajax({
            url: "yourUrl",
            dataType: "json",
            data: { // Send the data and update the order of the items on the server.
                oldIndex: oldIndex,
                newIndex: newIndex,
                dataItem: dataItem
            },
            success: function (response) {
                grid.dataSource.read(); //refresh the Grid
            }
        });
    }

## Known Limitations

* The Sortable does not work as expected with a Grid that has its paging or virtual scrolling enabled.

  The Sortable operates with the existing DOM. It is not aware of the Grid or of its DataSource. If paging or virtual scrolling are enabled, the Grid will render only the elements which belong to the current page. As a result, the sorting will be limited to the current page only.

* The Sortable does not work as expected with a grouped Grid.

  The Sortable uses the index of the DOM elements. When the Grid displays grouped data, the index of the DOM element does not match the index of the corresponding data item in the DataSource. This makes updating the order in the DataSource impossible.

* The Sortable does not work with a Grid that has locked (frozen) columns.

## See Also

* [Server-side API](/api/sortable)
