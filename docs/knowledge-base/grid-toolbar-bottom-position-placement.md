---
title: Displaying Grid Toolbar at Bottom
description: An example demonstrating how to display the toolbar at the bottom of the Grid 
type: how-to
page_title: Positioning the Toolbar Below Grid Body | Kendo UI Grid
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

How can I change the Kendo UI Grid's toolbar position to the bottom?

## Solution

Using jQuery, the toolbar can be placed below the content of the Kendo UI Grid:

```
   $("#grid").find(".k-grid-toolbar").insertAfter($("#grid .k-grid-content"));

```
The following demonstrates a Kendo UI Grid using batch editing with the toolbar at the bottom above the pager:
```html
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

          //Sets toolbar below Kendo UI Grid body
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

* [.find() - jQuery Documentation](https://api.jquery.com/find/)
* [.insertAfter() - jQuery Documentation](http://api.jquery.com/insertafter/)
