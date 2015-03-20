---
title: Integration with Grid/ListView
page_title: Sortable widget - integration with Grid/ListView
description: How to reorder Kendo UI Grid/ListView items with the Sortable widget
position: 1
---

# Integration with Kendo UI Grid/ListView

The Sortable widget may be used to reorder Kendo UI Grid/ListView items via drag and drop.

>**Important:** The Sortable widget reorders the HTML DOM elements. It will not automatically update the order of the items in the DataSource. It is up to the developer to implement this behaviour.

## Prerequisites

The article assumes that you are familiar with the following:

- [Kendo UI Sortable](../../../web/sortable/overview)
- [Kendo UI Grid](../../../web/grid/overview)
- [Kendo UI DataSource API](../../../api/framework/datasource#methods)

## Reorder Kendo UI Grid table rows using the Sortable widget

The Sortable widget should be initialized on the Grid's [`table element`](../../../api/web/grid#fields-table).
In the general case, the `filter` property of the Sortable widget should select all `tr` elements that are direct children of the table's `tbody` element. For example: `filter: ">tbody >tr"`.

**If the Grid's editing is enabled**, you should use a more specific filter selector that excludes the item that is currently in edit mode.
For example `.filter(">tbody >tr:not(.k-grid-edit-row)"`. In this way the Sortable functionality will not interfere with Grid's editing feature.

**If the Grid is configured to display details**, you should use a selector that matches only the master Grid rows. For example: `filter: ">tbody >tr.k-master-row"`.
In this way the detail rows will not be draggable.

For more information check the [Sortable events](../../../api/web/sortable#events) and the [Grid/Sortable integration demo](http://demos.telerik.com/kendo-ui/web/sortable/integration-grid.html).

## Reorder the items in the DataSource

The `change` event of the Sortable widget will fire after a row position is changed. You may bind to the `change` event to update the order of the items in the DataSource.

### Example - shift the position of the items in the DataSource

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

### Example - send the newIndex and oldIndex to the server

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

## Customize the hint

The hint element is appended to the `<body>` element and as a result its width will be different from the Grid's one.
The following example demonstrates how to style the hint element so it **looks like the row element** that is currently dragged.

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

          table.find("thead").remove(); //remove Grid's header from the hint
          table.find("tbody").empty(); //remove the existing rows from the hint
          table.wrap(wrapper); //wrap the table
          table.append(element.clone()); //append the dragged element

          hint = table.parent(); //get the wrapper

          return hint; //return the hint element
        },
        placeholder: function(element) { //customize the placeholder
          return element.clone().addClass("k-state-hover").css("opacity", 0.65);
        },
        change: function(e) {
          //handle the change event
          //update the underlying data according to the DOM position change
          //see previous examples
        }
      });
    </script>

## Known limitations

- The Sortable widget does not work as expected with Grid that has paging or virtual scrolling.

The Sortable widget operates with the existing DOM. It is not aware of the Grid nor its DataSource.
If paging or virtual scrolling are turned on, the Grid widget will render only the elements which belong to the current page. As a result, the sorting will be limited to the current page only.

- The Sortable widget does not work as expected with a grouped Grid.

The Sortable widget uses the index of the DOM elements.
When the Grid displays grouped data, the index of the DOM element does not match the index of the corresponding data item in the DataSource. This makes updating the order in the DataSource impossible.

## Reorder Kendo UI ListView Items using the Sortable widget

>**Important:** The Sortable widget reorders the HTML DOM elements. It will not automatically update the order of the items in the DataSource. It is up to the developer to implement this behaviour.

Sortable widget should be initialized on the ListView element. In the general case the `filter` property of the widget should select all elements that are direct children of the ListView's element. For example: `.filter(">div")`.

**If the ListView's editing is enabled** the developer should use a more specific filter selector that excludes the item which is currently in edit mode.
For example `.filter(">div:not(.k-edit-item)"`. In this way the Sortable will not interfere with ListView's editing feature.

Reordering the ListView dataItems may be implemented in the same way as with the Grid. See the examples above.
For more information check the [Sortable's events](../../../api/web/sortable#events) and the [ListView/Sortable integration demo](http://demos.telerik.com/kendo-ui/web/sortable/integration-listview.html).
