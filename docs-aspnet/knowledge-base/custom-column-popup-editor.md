---
title: Add Custom Column Popup Editor
description: "An example on how to add a custom popup editor for a column in the {{ site.product }} Grid."
type: how-to
page_title: Add Custom Column Popup Editor
slug: custom-column-popup-editor
tags: mvc, grid, editing, custom editor, popup, button, editor
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

How to add a custom popup editor for a column in the {{ site.product }} Grid?

## Solution

1. Create a Window and integrate an editor through the [`.Content()`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/WindowBuilder#contentsystemaction) configuration method.
1. Decorate the Editor with the `data-bind` attribute for the corresponding field that will be edited.
1. Add a button to the cell by creating a column template through the [`.ClientTemplateId()`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/GridBoundColumnBuilder#clienttemplateidsystemstring) configuration option.
1. To open the window, handle the `click` event of the button. To bind the editor to the current data item, use the [`bind()`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/bind) method.

```Index.cshtml
    // Window
    @(Html.Kendo().Window()
        .Name("window")
        .Width(600)
        .Visible(false)
        .Modal(true)
        .Content(@<text>
            @(Html.Kendo().Editor()
              .Name("editor")
              .HtmlAttributes(new {data_bind="value:ProductName"})
            ) 
        </text>)
        .Actions(actions => actions
            .Minimize()
            .Close()
        )
    )

    // Grid
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns => {
            columns.Bound(p => p.ProductName).ClientTemplateId("productNameTemplate");
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
        .DataSource(dataSource => dataSource
            .Ajax()
            .Batch(true)
            .PageSize(20)
            .ServerOperation(false)
            .Model(model => {
                model.Id(p => p.ProductID);
            })
            .Create("Editing_Create", "Grid")
            .Read("Editing_Read", "Grid")
            .Update("Editing_Update", "Grid")
            .Destroy("Editing_Destroy", "Grid")
        )
    )
```
```Script.js
    <script id="productNameTemplate" type="text/x-kendo-template">
        <div class='contentDivs'>
            #= ProductName #
        </div>
        <button onClick='onClick(this)' class='editButtons class="k-button k-button-solid-base k-button-solid k-button-md   k-rounded-lg"' style='float:right'>
            Edit
        </button>
    </script> 

    <script type="text/javascript">
        function onClick(button){
              // Get the reference of the grid, editor, and window.
              var grid = $("#grid").data("kendoGrid");
              var editor = $("#editor").data("kendoEditor");
              var window = $("#window").data("kendoWindow");
        
              var row = $(button).closest("tr"); // Get the closest row element.
              var dataItem = grid.dataItem(row); // Get the current data item.
        
              kendo.bind(editor.element, dataItem); // Bind the editor to the corresponding data item.
              window.open().center(); // Open the window.
        }    
    </script>
```

For the complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/GmuhlHvr25ivNIAS51) example.