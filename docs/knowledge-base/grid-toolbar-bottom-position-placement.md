---
title: Display Toolbar at the Bottom of the Grid
description: An example on how to display a toolbar at the bottom of the Kendo UI Grid.
type: how-to
page_title: Position a Toolbar under the Table | Kendo UI Grid
slug: grid-toolbar-bottom-position-placement
tags: grid, toolbar, bottom, position, placement
ticketid: 1120199
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.620</td>
 </tr>
</table>

## Description

How can I change the position of the toolbar and place it at the bottom of the Grid?

## Solution

Use the `$("#grid").find(".k-grid-toolbar").insertAfter($("#grid .k-grid-content"));` jQuery configuration to place the toolbar under the content of the Grid.

The following example demonstrates how to display a toolbar above the pager and at the bottom of a Grid which uses batch editing.

```dojo
    <div id="example">
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
                pageSize: 20,
                schema: {
                  model: {
                    id: "ProductID",
                    fields: {
                      ProductID: { editable: false, nullable: true },
                      ProductName: { validation: { required: true } },
                      UnitPrice: { type: "number", validation: { required: true, min: 1} },
                      Discontinued: { type: "boolean" },
                      UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                  }
                }
              });
          $("#grid").kendoGrid({
            dataSource: dataSource,
            pageable: true,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
              { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
              { field: "Discontinued", width: "120px", editor: customBoolEditor },
              { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
            editable: "inline"
          });

          // Sets toolbar under the Grid body
          $("#grid").find(".k-grid-toolbar").insertAfter($("#grid .k-grid-content"));
        });

        function customBoolEditor(container, options) {
          $('<input class="k-checkbox" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
          $('<label class="k-checkbox-label">​</label>').appendTo(container);
        }
      </script>
    </div>
```

## See Also

* [jQuery Documentation: .find()](https://api.jquery.com/find/)
* [jQuery Documentation: .insertAfter()](http://api.jquery.com/insertafter/)
