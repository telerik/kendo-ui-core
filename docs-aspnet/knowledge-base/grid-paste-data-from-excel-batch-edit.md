---
title: Copying and Pasting Multiple Excel Rows to the Grid
page_title: Copying and Pasting Multiple Rows from Excel to the Grid
description: An example on how to copy and paste rows from Excel into the Telerik UI for {{ site.product }} Grid.
type: how-to
slug: grid-paste-data-from-excel-batch-edit
tags: grid, excel, copy, paste, multiple, rows, batch, edit, crud, telerik, core, mvc
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.3.1109 version</td>
 </tr>
</table>

## Description

How can I enable the copying of multiple rows from Excel and pasting them in the {{ site.product }} Grid component while having batch-editing operations enabled?

## Solution

To achieve the desired scenario: 

1. Configure the CRUD operations for the Grid, in which you want to implement the copy-paste functionality, by using the [`Batch()`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/AjaxDataSourceBuilder#batchsystemboolean) configuration method for the Grid's DataSource to send all the requests at once.
1. To handle the user interaction for pasting, subscribe to the [`contextMenu`](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event) event, which is triggered, by clicking the right mouse button.
1. Within the handler, create an empty text area which will act as a clipboard, and adjust its width and height to exclude the pager and the scrollbar.
1. To map the pasted content directly within the Grid, handle the [`paste`](https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event) event. From there, create new data item instances by using the pasted content, and insert them into the Grid by using the [`insert()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/insert) client-side method of the Grid's DataSource.
1. If the user clicks to edit but the context menu is open and the text area is over the Grid's body, handle the [`click`](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) event and manually remove the created text area.
1. To add a native UI look and feel, wire to the [`DataBound`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/GridEventBuilder#databoundsystemstring) and add the dirty indicator to each of the newly pasted items.

```Index.cshtml
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns => {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(140);
            columns.Bound(p => p.UnitsInStock).Width(140);
            columns.Bound(p => p.Discontinued).Width(100);
            columns.Command(command => command.Destroy()).Width(150);
        })
        .ToolBar(toolbar => {
            toolbar.Create();
            toolbar.Save();
        })
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .Pageable()
        .Navigatable()
        .Sortable()
        .Scrollable()
        .Events(events => events.DataBound("onDataBound"))
        .DataSource(dataSource => dataSource
            .Ajax()
            .Batch(true)
            .PageSize(20)
            .ServerOperation(false)
            .Events(events => events.Error("error_handler"))
            .Model(model => model.Id(p => p.ProductID))
            .Create("Editing_Create", "Grid")
            .Read("Editing_Read", "Grid")
            .Update("Editing_Update", "Grid")
            .Destroy("Editing_Destroy", "Grid")
        )
    )
```
```Script.js
<script type="text/javascript">
    function onDataBound(e){
        var grid = this;
        var rows = grid.items();
        rows.each(function(idx, row){ // Traverse through each of the rows.
            var dataItem = grid.dataItem(row); // Obtain the current data item instance.
            if(dataItem.isNew()){ // Assert whether the data item is a newly created one.
             var td = $(row).find("td");
             td.each(function(idx, cell){ // Traverse through each of the table data cells.
                if($(cell).text()){
                  $(cell).prepend("<span class='k-dirty'></span>"); // Add a dirty indicator.
                }
             })
            }
        })
    }
    $("#grid").on('contextmenu', function (e) {
      // Avoid the grid pager, headers and toolbar.
      if($(e.target).is(".k-link, .k-grid-toolbar, .k-grid-pager")){
        return;
      }
      // Get the position of the Grid.
      var offset = $(this).find("table").offset();
      // Crete a textarea element which will act as a clipboard.
      var textarea = $("<textarea>");
      // Position the textarea on top of the Grid and make it transparent.
      textarea.css({
        position: 'absolute',
        opacity:0,
        top: offset.top,
        left: offset.left,
        border: 'none',
        width: $(this).find("table").width(),
        height: $(this).find(".k-grid-content").height()
      })
      .appendTo('body')
      .on("click", function(e){
        // In case user clicks to edit but the context menu is open and the textarea is over the grid's body.
        textarea.remove();
       $(document.elementFromPoint(e.clientX, e.clientY)).click();
      })
      .on('paste', function () {
        setTimeout(function () {
          var value = $.trim(textarea.val());
          var grid = $("[data-role='grid']").data("kendoGrid");
          var rows = value.split('\n');
          var data = [];    
          for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].split('\t');
            var newItem = {
              ProductName: cells[0],
              UnitPrice: cells[1],
              UnitsInStock: cells[2],
              Discontinued: cells[3]
            }
            grid.dataSource.insert(0,newItem);
          };
          textarea.remove();
        });            
      }).focus();          
    });
</script>

```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on copying and pasting multiple rows from Excel to the Grid](https://netcorerepl.telerik.com/wGFcGiYB12uGd1J329).

## See Also

* [Client-Side API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik REPL: Copy and Paste Multiple Rows From Excel to the Grid](https://netcorerepl.telerik.com/wGFcGiYB12uGd1J329)
