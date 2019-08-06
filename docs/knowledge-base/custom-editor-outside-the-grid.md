---
title: Show Custom Editor Using the Selected Item outside the Grid
page_title: Custom Editor Outside the Grid | Kendo UI Grid for jQuery
description: "An example on how to show a custom editor, which uses the currently selected item, outside the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Editing/custom-editor-outside-the-grid
slug: howto_use_show_custom_editor_selected_item_outside_grid
tags: grid, custom, editor, selected, item, outside
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I show a custom editor which uses the currently selected item outside the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to use a custom editor, which uses the currently selected item, outside the Grid.

```dojo
    <style>
      label{display:block;width:25em;position:relative;line-height:2.6;}
      label > .k-textbox, label > .k-button, label > .k-widget{position:absolute;right:0;width:15em;}
      label > .checkbox{position:absolute;right:12.4em;top:.3em;font-size:1.1em;}
      #grid{margin:2em 0 0;}
    </style>

    <div id="example">

      <form id="gridEditor">
        <label>ProductName <input type="text" name="ProductName" data-bind="value: ProductName" required="true" class="k-textbox" /></label>
        <label>UnitsInStock <input type="number" name="UnitsInStock" data-role="numerictextbox" required="true" min="0" data-bind="value: UnitsInStock" /></label>
        <label>Discontinued <input type="checkbox" name="Discontinued" data-bind="checked: Discontinued" class="checkbox" /></label>
        <label>Save changes <button type="button" id="saveChanges" class="k-button">Submit</button></label>
        <span class="k-invalid-msg" data-for="ProductName"></span>
        <span class="k-invalid-msg" data-for="UnitsInStock"></span>
      </form>

      <div id="grid"></div>

      <script>
        $(document).ready(function () {
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
              dataSource = new kendo.data.DataSource({
                transport: {
                  read:  {
                    url: crudServiceBaseUrl + "/Products",
                    dataType: "jsonp"
                  },
                  update: {
                    url: crudServiceBaseUrl + "/Products/Update",
                    dataType: "jsonp"
                  },
                  destroy: {
                    url: crudServiceBaseUrl + "/Products/Destroy",
                    dataType: "jsonp"
                  },
                  create: {
                    url: crudServiceBaseUrl + "/Products/Create",
                    dataType: "jsonp"
                  },
                  parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                      return {models: kendo.stringify(options.models)};
                    }
                  }
                },
                batch: true,
                pageSize: 10,
                schema: {
                  model: {
                    id: "ProductID",
                    fields: {
                      ProductID: { editable: false, nullable: true },
                      ProductName: { validation: { required: true } },
                      Discontinued: { type: "boolean" },
                      UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                  }
                }
              });

          var selectedRow = null;

          $("#gridEditor").kendoValidator();

          var grid = $("#grid").kendoGrid({
            dataSource: dataSource,
            change: function(e){
              selectedRow = e.sender.select();
              var item = e.sender.dataItem(selectedRow);
              kendo.bind($("#gridEditor"), item);
            },
            dataBound: function(e){
              if (selectedRow) {
                var tr = $("[data-uid='"+ selectedRow.attr("data-uid") +"']");
                e.sender.select(tr);
              }
              if (!selectedRow || !tr[0]) {
                grid.select(grid.tbody.children().eq(0));
              }
            },
            pageable: true,
            selectable: true,
            height: 400,
            toolbar: [{template: "<button id='addNew' type='button' class='k-button'>Add new record</button>"}],
            columns: [
              { field: "ProductName", title: "Product Name"},
              { field: "UnitsInStock", title:"Units In Stock", width: 200 },
              { field: "Discontinued", width: 200 }]
          }).data("kendoGrid");

          $("#addNew").click(function(){
            var newItem = grid.dataSource.insert({},0);
            grid.dataSource.page(1);
            grid.select($("[data-uid='"+ newItem.uid +"']"));
          });

          $("#saveChanges").click(function(){
            grid.dataSource.one("requestEnd", function(e) {
              alert("Success");
            });
            grid.saveChanges();
          });

        });
      </script>
    </div>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
