---
title: Integration with Grid and ListView
page_title: Integration with Grid and ListView | Kendo UI Sortable
description: "Learn how to reorder Kendo UI Grid and ListView items with the Kendo UI Sortable widget."
slug: integrationwith_gridandlistview_sortable_widget
position: 2
---

# Integration with Grid and ListView

[Kendo UI Sortable widget](http://demos.telerik.com/kendo-ui/sortable/index) can be used to reorder the items in a Kendo UI Grid or Kendo UI ListView widget via drag and drop.

## Prerequisites

Before going on reading, make sure you are familiar with the following topics:

* [Overview of the Sortable Widget]({% slug overview_kendoui_sortable_widget %})
* [Overview of Kendo UI Grid]({% slug overview_kendoui_grid_widget %})
* [Kendo UI DataSource API](/api/javascript/data/datasource#methods)

## Reordering of Items

> **Important**
>
> The Sortable widget reorders the HTML DOM elements. It does not automatically update the order of the items in the DataSource. This means that you should explicitly implement this behavior.

## Sortable and Grid

### Reorder Grid Table Rows

To reorder the table rows of the Grid, initialize the Sortable widget on the Grid's [`table` element](/api/javascript/ui/grid#fields-table). Normally, the `filter` property of the Sortable should select all `tr` elements that are direct children of the table's `tbody` element, e.g. `filter: ">tbody >tr"`.

> **Important**  
>
> In an AngularJS application initialize the Sortable widget as a parent directive. The `filter` configuration option selects all `tr` elements that are children of the `.k-grid` wrapper. For detailed information, refer to [this example]({% slug howto_reorderangularjsgridrows_angular_sortable %}).

### Set Hint in Grid

The `hint` element of the Sortable is appended to the `<body>` element. As a result, its width is different from the width of the Grid.

The example below demonstrates how to style the `hint` element, so it looks like the `row` element that is currently dragged.

###### Example

    <div id="grid"></div>
    <script>

      $("#grid").kendoGrid({
        dataSource: {
          data: [{name: "John", age: 25}, {name: "Jane", age: 25}]
        }
      });

      $("#grid").data("kendoGrid").table.kendoSortable({
        filter: ">tbody >tr",
        hint: function(element) { //customize the hint
          var grid = $("#grid").data("kendoGrid"),
              table = grid.table.clone(), //clone Grid's table
              wrapperWidth = grid.wrapper.width(), //get Grid's width
              wrapper = $("<div class='k-grid k-widget'></div>").width(wrapperWidth),
              hint;

          table.find("thead").remove(); //remove the Grid's header from the hint
          table.find("tbody").empty(); //remove the existing rows from the hint
          table.wrap(wrapper); //wrap the table
          table.append(element.clone()); //append the dragged element

          hint = table.parent(); //get the wrapper

          return hint; //return the hint element
        },
        placeholder: function(element) { //customize the Placeholder
          return element.clone().addClass("k-state-hover").css("opacity", 0.65);
        },
        change: function(e) {
          //handle the change event
          //update the underlying data according to the DOM position change
          //see previous examples
        }
      });
    </script>

## Sortable and Editable Grid

If the editing functionality of the Grid is enabled, use a more specific filter selector that excludes the item, which is currently in editing mode, e.g. `.filter(">tbody >tr:not(.k-grid-edit-row)")`. In this way the Sortable functionality will not interfere with the editing feature of the Grid.

If the Grid is configured to display details, use a selector that matches only the master Grid rows, e.g. `filter: ">tbody >tr.k-master-row"`. In this way the detail rows will not be draggable.

For additional information on the Sortable events, refer to the [JavaScript API article on Sortable events](/api/javascript/ui/sortable#events) and the [Grid/Sortable integration demo](http://demos.telerik.com/kendo-ui/web/sortable/integration-grid.html).

### Grid in Inline and Popup Editing Modes

The editing functionality of the Kendo UI Grid is rendered through its [inline](http://demos.telerik.com/kendo-ui/grid/editing-inline), [popup](http://demos.telerik.com/kendo-ui/grid/editing-popup) or [batch](http://demos.telerik.com/kendo-ui/grid/editing) editing mode. Note that the inline and popup modes are more common and easier to implement, so it is advisable to use either of them instead of the batch one.

If you use the `inline` or `popup` editing mode, set a more specific filter which excludes the item that is currently in editing mode, as demonstrated in the example below.

###### Example

    .filter(">tbody >tr:not(.k-grid-edit-row)")

### Grid in Batch Editing Mode

The draggable functionality of the Sortable prevents the `mousedown` event. As a result, the `change` event of the editor input does not fire, which in turn prevents the MVVM from saving the updated value.

If you use the `batch` (or `incell`) editing modes, the code from the example above applied to the inline and popup editing modes is not working. The solution to this issue is to use [custom editors](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.editor) and configure them to [update when the `input` event fires](http://docs.telerik.com/kendo-ui/framework/mvvm/bindings/value#controlling-when-the-view-model-is-updated)&mdash;by default, the framework listens for the `change` event. To implement the solution, add the `data-value-update="input"` attribute to the editor inputs. The downside of this approach is that the input event does not work for old versions of the Internet Explorer.

> **Important**
>
> The `data-value-update` approach works with regular inputs. However, you must configure the Kendo UI widgets manually as they do not support the `data-value-update` attribute.

For runnable examples, refer to the article on [how to use the Sortable with Grids in инцелл editing mode]({% slug howto_usesortablewithgrid_inincellediting_sortable %}), or to the article on [how to use the Sortable with Grids in batch editing mode within an AngularJS application]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %}).

## Sortable and ListView

### Reorder ListView Items

Sortable widget should be initialized on the ListView element. In the general case the `filter` property of the widget should select all elements that are direct children of the ListView's element. For example: `.filter(">div")`.

### Sortable and Editable ListView

If the editing functionality of the ListView is enabled, use a more specific filter selector that excludes the item, which is currently in editing mode, e.g. `.filter(">div:not(.k-edit-item)"`. In this way the Sortable functionality will not interfere with the editing feature of the ListView.

The ListView `dataItems` can be reordered in [the same way as the Grid ones]({% slug integrationwith_gridandlistview_sortable_widget %}#reorder-grid-table-rows).

For additional information on the Sortable events, refer to the [JavaScript API article on Sortable events](/api/javascript/ui/sortable#events) and the [ListView/Sortable integration demo](http://demos.telerik.com/kendo-ui/web/sortable/integration-listview.html).

## Sortable and DataSource

### Reorder DataSource Items

The `change` event of the Sortable widget will fire after a row position is changed. You are able to bind to the `change` event to update the order of the items in the DataSource.

The example below demonstrates how to shift the position of the items in the DataSource.

###### Example

    //the change event handler of the Sortable widget
    function onChange(e) {
        var grid = e.sender.element.data("kendoGrid"),
            oldIndex = e.oldIndex , //the old position
            newIndex = e.newIndex , //the new position
            view = grid.dataSource.view(),
            dataItem = grid.dataSource.getByUid(e.item.data("uid")); //retrieve the moved dataItem

        dataItem.Order = newIndex; //update the order
        dataItem.dirty = true;

        //shift the order of the records
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

        grid.dataSource.sync(); //submit the changes through the update transport and refresh the Grid
    }

The example below demonstrates how to send the `newIndex` and `oldIndex` to the server.    

###### Example

    //the change event handler of the Sortable widget
    function onChange(e) {
        var grid = e.sender.element.data("kendoGrid"),
            oldIndex = e.oldIndex , //the old position
            newIndex = e.newIndex , //the new position
            dataItem = grid.dataSource.getByUid(e.item.data("uid")); //retrieve moved dataItem

        $.ajax({
            url: "yourUrl",
            dataType: "json",
            data: { //send the data and update the order of the items on the server
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

* Kendo UI Sortable does not work as expected with a Kendo UI Grid widget that has paging or virtual scrolling functionalities enabled.
The Sortable widget operates with the existing DOM. It is not aware of the Grid, nor of its DataSource. If paging or virtual scrolling are turned on, the Grid will render only the elements which belong to the current page. As a result, the sorting will be limited to the current page only.

* Kendo UI Sortable does not work as expected with a grouped Grid.
The Sortable widget uses the index of the DOM elements. When the Grid displays grouped data, the index of the DOM element does not match the index of the corresponding data item in the DataSource. This makes updating the order in the DataSource impossible.

* Kendo UI Sortable does not work with a Grid that has locked (frozen) columns.

## See Also

Other articles on Kendo UI Sortable:

* [Integration with TabStrip]({% slug integrationwith_tabstrip_sortable_widget %})
* [Sortable JavaScript API Reference](/api/javascript/ui/sortable)
