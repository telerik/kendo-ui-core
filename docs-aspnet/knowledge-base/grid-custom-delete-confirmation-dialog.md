---
title: Customize the Delete confirmation dialog
description: "An example on how to customize the Delete confirmation dialog in the {{ site.product }} Grid."
type: how-to
page_title: Customize the Delete confirmation dialog
slug: grid-custom-delete-confirmation-dialog
tags: mvc, core, grid, custom, delete, confirmation, dialog
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.prodcut }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.621 version</td>
 </tr>
</table>

## Description

How can I customize the Delete confirmation dialog in the {{ site.product }} Grid

## Solution

1. Declare a custom Dialog.
1. Include a [custom command button](https://demos.telerik.com/kendo-ui/grid/custom-command).
1. Hook up for the [Click](https://docs.telerik.com/kendo-ui/api/javascript/ui/button/events/click) event of the command button.
1. When the click event is triggered, get a reference to the row in which the button is positioned and open the dialog. Save the current record in a global variable.
1. In the custom dialog, add two options to confirm/cancel the deletion.
1. On confirm delete the record.
1. On cancel close the Dialog. 

```Index.cshtml
@using Kendo.Mvc.UI

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModelGridPopUp>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(100);
            columns.Command(command => 
            { 
                command.Custom("Delete").Click("onClick").IconClass("k-icon k-i-close k-button-icon");
            }).Width(160);
        })
        .Pageable()
        .Scrollable()
        .HtmlAttributes(new { style = "height:430px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Model(model => model.Id(p => p.ProductID))
            .Read(read => read.Action("EditingPopup_Read", "Grid"))
            .Destroy(update => update.Action("EditingPopup_Destroy", "Grid"))
        )
    )
    @(Html.Kendo().Dialog()
        .Name("deleteDialog")
        .Title("Clinic supervisor")
        .Content("<p>Are you sure you want to delete this clinical supervisor?<p>")
        .Width(400)
        .Actions(actions =>
        {
            actions.Add().Action("onConfirm").Text("OK").Primary(true);
            actions.Add().Action("onCancel").Text("Cancel");
        })
        .Visible(false)
    )
```
```Script.js
        var currentDataItem;

        function onClick(e){
             $("#deleteDialog").data("kendoDialog").open();
             var tr = $(e.target).closest("tr"); //get the row for deletion
             var data = this.dataItem(tr);
             currentDataItem = data;
        }
        function onConfirm(e){
            var grid = $("#grid").data("kendoGrid");
            grid.dataSource.remove(currentDataItem);
            grid.dataSource.sync();
        }
        function onCancel(e){
            e.sender.close();
        }
```

For the complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/mwkMYsFG19Xfgl0512) example.