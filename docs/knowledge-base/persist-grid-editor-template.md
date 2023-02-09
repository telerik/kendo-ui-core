---
title: Persist Grid Editor Template While Restoring State
page_title: Persist Grid Editor Template While Restoring State with getOptions and setOptions methods - Kendo UI Grid for jQuery
description: "Learn how to keep the editor template after restoring Grid options with getOptions and setOptions methods."
type: how-to
tags: kendo, ui, grid, persist, editor, template, setOptions, getOptions, restore
res_type: kb
component: grid
slug: howto_persist_editor_template__while_restoring_state
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I persist Grid Editor Template after Restoring State with [`setOptions`](/api/javascript/ui/grid/methods/setoptions)?

## Solution

> As pointed out in the [`setOptions`](/api/javascript/ui/grid/methods/setoptions) API documentation `JSON.stringify()` cannot serialize function references (e.g. event handlers), so if stringification is used for the retrieved Grid state, all configuration fields, which represent function references, will be lost.

Specify the custom editor to the columns object before passing it to the `setOptions()` method.


```dojo
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div class="box wide">
      <button id="save"class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md" >Save State
      </button>
      <button id="load" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md" >Load State
      </button>
    </div>

    <div id="grid"></div>

    <script>
      $(document).ready(function () {
        var dataSource = new kendo.data.DataSource({
          pageSize: 20,
          data: products,
          autoSync: true,
          schema: {
            model: {
              id: "ProductID",
              fields: {
                ProductID: { editable: false, nullable: true },
                ProductName: { validation: { required: true } },
                Category: { defaultValue: { CategoryID: 1, CategoryName: "Beverages"} },
                UnitPrice: { type: "number", validation: { required: true, min: 1} }
              }
            }
          }
        });

        $("#grid").kendoGrid({
          dataSource: dataSource,
          pageable: true,
          height: 550,
          resizable : true,
          filterable: true,
          columnMenu: true,
          onDataBound: function(){
            debugger;
          },
          toolbar: ["create"],
          columns: [
            { field:"ProductName",title:"Product Name" },
            { field: "Category", title: "Category", width: "180px", editor: categoryDropDownEditor, template: "#=Category.CategoryName#" },
            { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "130px" },
            { command: "destroy", title: " ", width: "150px" }],
          editable: true
        });
      });


      $("#save").click(function (e) {
        e.preventDefault();
        var grid = $("#grid").data("kendoGrid");
        localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());
      });

      $("#load").click(function (e) {
        e.preventDefault();
        var grid = $("#grid").data("kendoGrid");
        var options = localStorage["kendo-grid-options"];
        if (options) {
          let parsedOptions = JSON.parse(options);
          // Get only the columns from the options.
          let columns = parsedOptions.columns;
          let filter = parsedOptions.dataSource.filter;
          columns[1].editor = categoryDropDownEditor;
          // Change only the columns options. You can use the same approach for other settings as well.
          grid.setOptions({
            columns: columns,
            dataSource: {
              filter: filter
            }
          });
        }
      });

      function categoryDropDownEditor(container, options) {
        $('<input required name="' + options.field + '"/>')
          .appendTo(container)
          .kendoDropDownList({
          autoBind: false,
          dataTextField: "CategoryName",
          dataValueField: "CategoryID",
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
            }
          }
        });
      }
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
