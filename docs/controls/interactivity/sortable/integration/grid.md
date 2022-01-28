---
title: Grid
page_title: jQuery Sortable Documentation | Grid Integration
description: "Get started with the jQuery Sortable by Kendo UI and integrate the widget with the Kendo UI Grid."
previous_url: /controls/interactivity/sortable/integration
slug: integrationwith_grid_sortable
---

# Grid Integration

You can use the [Kendo UI Sortable widget](https://demos.telerik.com/kendo-ui/sortable/index) to reorder the items in a Grid by dragging and dropping.

## Prerequisites

* [Overview of the Kendo UI Sortable widget]({% slug overview_kendoui_sortable_widget %})
* [Overview of Kendo UI Grid widget]({% slug overview_kendoui_grid_widget %})
* [API reference of the Kendo UI DataSource component](/api/javascript/data/datasource#methods)

## Reordering of Sortable Items

The Sortable reorders the HTML DOM elements. It does not automatically update the order of the items in the DataSource. This means that you have to explicitly implement the desired behavior.

## Reordering of Grid Table Rows

To reorder the table rows of the Grid, initialize the Sortable on the [`table` element](/api/javascript/ui/grid#fields-table) of the Grid. Normally, the `filter` property of the Sortable selects all `tr` elements that are direct children of the table `tbody` element, for example, `filter: ">tbody >tr"`.

> In AngularJS applications, initialize the Sortable as a parent directive. The `filter` configuration option selects all `tr` elements that are children of the `.k-grid` wrapper. For more information, refer to [this example]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %}).

## Setting the Hint in the Grid

The `hint` element of the Sortable is appended to the `<body>` element. As a result, its width is different from the width of the Grid.

The following example demonstrates how to style the `hint` element, so it looks like the `row` element that is currently dragged.

    <div id="grid"></div>
    <script>

      $("#grid").kendoGrid({
        dataSource: {
          data: [{name: "John", age: 25}, {name: "Jane", age: 25}]
        }
      });

      $("#grid").data("kendoGrid").table.kendoSortable({
        filter: ">tbody >tr",
        hint: function(element) { // Customize the hint.
          var grid = $("#grid").data("kendoGrid"),
              table = grid.table.clone(), // Clone the Grid table.
              wrapperWidth = grid.wrapper.width(), // Get the Grid width.
              wrapper = $("<div class='k-grid k-widget'></div>").width(wrapperWidth),
              hint;

          table.find("thead").remove(); // Remove the Grid header from the hint.
          table.find("tbody").empty(); // Remove the existing rows from the hint.
          table.wrap(wrapper); //wrap the table
          table.append(element.clone()); // Append the dragged element.

          hint = table.parent(); // Get the wrapper.

          return hint; // Return the hint element.
        },
        placeholder: function(element) { // Customize the placeholder.
          return element.clone().addClass("k-state-hover").css("opacity", 0.65);
        },
        change: function(e) {
          // Handle the change event.
          // Update the underlying data according to the DOM position change.
          // See the previous examples.
        }
      });
    </script>

## Reordering in Editable Grids

If the editing functionality of the Grid is enabled, use a more specific filter selector that excludes the item, which is currently in edit mode, for example, `.filter(">tbody >tr:not(.k-grid-edit-row)")`. In this way, the Sortable functionality will not interfere with the editing feature of the Grid.

If the Grid is configured to display details, use a selector that matches only the master Grid rows, for example, `filter: ">tbody >tr.k-master-row"`. In this way, the detail rows will not be draggable.

For more information on the Sortable events, refer to the [JavaScript API article on Sortable events](/api/javascript/ui/sortable#events) and the [demo on integrating the Sortable and the Grid](https://demos.telerik.com/kendo-ui/web/sortable/integration-grid.html).

The editing functionality of the Kendo UI Grid is rendered through its [inline](https://demos.telerik.com/kendo-ui/grid/editing-inline), [popup](https://demos.telerik.com/kendo-ui/grid/editing-popup), or [batch](https://demos.telerik.com/kendo-ui/grid/editing) edit mode. The inline and popup modes are more common and easier to implement than the batch edit mode.

### Using Grids in Inline and Popup Edit Modes

If you use the inline or the popup edit mode, set a more specific filter which excludes the item that is currently in edit mode.

    .filter(">tbody >tr:not(.k-grid-edit-row)")

### Using Grids in Batch Edit Mode

The draggable functionality of the Sortable prevents the `mousedown` event. As a result, the `change` event of the editor input does not fire, which in turn prevents the MVVM from saving the updated value.

If you use the batch (incell) edit mode, the code from the previous example that is applied to the inline and popup edit modes will not work. To work around this issue, use [custom editors](/api/javascript/ui/grid/configuration/columns.editor) and configure them to [update when the `input` event fires]({% slug valuebinding_mvvm_kendoui %}#controlling-when-the-view-model-is-updated)&mdash;by default, the framework listens for the `change` event. To implement the solution, add the `data-value-update="input"` attribute to the editor inputs. The downside of this approach is that the `input` event does not work for earlier Internet Explorer versions.

> The `data-value-update` approach works with regular inputs. However, you must manually configure the Kendo UI widgets as they do not support the `data-value-update` attribute.

For runnable examples, refer to the articles on [using the Sortable with Grids in incell edit mode]({% slug howto_usesortablewithgrid_inincellediting_sortable %}) and [using the Sortable with Grids in batch edit mode within an AngularJS application]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %}).

## Reordering of DataSource Items

The `change` event of the Sortable widget will fire after a row position is changed. You can bind to the `change` event to update the order of the items in the DataSource.

The following example demonstrates how to shift the position of the items in the DataSource.

    // The change event handler of the Sortable.
    function onChange(e) {
        var grid = e.sender.element.data("kendoGrid"),
            oldIndex = e.oldIndex , //the old position
            newIndex = e.newIndex , //the new position
            view = grid.dataSource.view(),
            dataItem = grid.dataSource.getByUid(e.item.data("uid")); //retrieve the moved dataItem

        dataItem.Order = newIndex; //update the order
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
                grid.dataSource.read(); // Refresh the Grid.
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

* [Grid Integration of the Sortable (Demo)](https://demos.telerik.com/kendo-ui/sortable/integration-grid)
* [JavaScript API Reference of the Sortable](/api/javascript/ui/sortable)
