---
title: Reorder Grid Rows without Removing the "dragged" Row 
description: Keep the dragged row visible in Grid until reordered
type: how-to
page_title: Keep Row Visible while reordering | Kendo UI Grid
slug: grid-sortable-keep-row-visible-until-drop
position: 
tags: grid, sortable, dragging, row, visible, reorder
ticketid: 1409839
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.2.514</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid and Sortable for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

Currently, when I click and hold on a row and drag the mouse, that row will be removed from the grid. When I release the mouse click, the row will be added back to the grid.

Is there a way to configure the grid to NOT remove the row when I click and drag. It only removes the row when I release the mouse click and add that row to the location where I release the mouse click?

## Solution

You may entirely prevent the row from being hidden but involves altering a private method. So if you do decide to go down this road, leave a comment in the project so you can test when updating to another version. Private methods can be changed without notice and that could cause unexpected behaviour. 

Here is the method, just place it before the grid/sortable is initialized and remove the move handler:

```javascript
      kendo.ui.Sortable.fn._dragstart = function(e) {
        var draggedElement = this.draggedElement = e.currentTarget,
            disabled = this.options.disabled,
            handler = this.options.handler,
            _placeholder = this.options.placeholder,
            placeholder = this.placeholder = kendo.isFunction(_placeholder) ? $(_placeholder.call   (this, draggedElement)) : $(_placeholder);
    
        if(disabled && draggedElement.is(disabled)) {
            e.preventDefault();
        } else if(handler && !$(e.initialTarget).is(handler)) {
            e.preventDefault();
        } else {
        
            if(this.trigger("start", { item: draggedElement, draggableEvent: e })) {
                e.preventDefault();
            } else {
                draggedElement.before(placeholder);
                this._setCursor();
            }
    
        }
    }
```
#### Example

```dojo
    <div id="grid" style="width: 400px; margin: 0 auto;"></div>
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
    <script>
      kendo.ui.Sortable.fn._dragstart = function(e) {
            var draggedElement = this.draggedElement = e.currentTarget,
                disabled = this.options.disabled,
                handler = this.options.handler,
                _placeholder = this.options.placeholder,
                placeholder = this.placeholder = kendo.isFunction(_placeholder) ? $(_placeholder.call(this, draggedElement)) : $(_placeholder);

            if(disabled && draggedElement.is(disabled)) {
                e.preventDefault();
            } else if(handler && !$(e.initialTarget).is(handler)) {
                e.preventDefault();
            } else {

                if(this.trigger("start", { item: draggedElement, draggableEvent: e })) {
                    e.preventDefault();
                } else {
                    draggedElement.before(placeholder);
                    this._setCursor();
                }

            }
        }
      var grid = $("#grid").kendoGrid({
        dataSource: {
          data: products,
          schema: {
            model: {
              fields: {
                ProductName: { type: "string" },
                UnitPrice: { type: "number" }
              }
            }
          },
          pageSize: 10
        },
        scrollable: false,
        columns: [
          "ProductName",
          { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" }
        ]
      }).data("kendoGrid");

      grid.table.kendoSortable({
        filter: ">tbody >tr",
        hint: function(element) {           
          var table = $('<table style="width: 400px;" class="k-grid k-widget"></table>');
          table.append(element.clone()); //append the dragged element
          table.css("opacity", 0.7);
          return table; //return the hint element
        },
        cursor: "move",
        placeholder: function (element) {
          return $(
            '<tr style="margin:0;padding:0;background-color:black;">' +
            '<td colspan="3" style="margin:0;padding:2px 0 0 0;">' +
            '</td >' +
            '</tr > ');
        },
        change: function(e) {        
          var skip = grid.dataSource.skip(),
              oldIndex = e.oldIndex + skip,
              newIndex = e.newIndex + skip,
              data = grid.dataSource.data(),
              dataItem = grid.dataSource.getByUid(e.item.data("uid"));

          if(e.oldIndex !== e.newIndex){
            grid.dataSource.remove(dataItem);
            grid.dataSource.insert(newIndex, dataItem);
          }

        }
      });
    </script>
    <style>
      .k-grid tbody tr {
        cursor: move;
      }
    </style>  
```
