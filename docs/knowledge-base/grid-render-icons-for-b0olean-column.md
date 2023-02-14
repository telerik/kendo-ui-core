---
title: Rendering Icons in Boolean Columns in the Grid
description: Learn how to render icons in a boolean column in the Kendo UI for jQuery Grid.
type: how-to
page_title: Rendering Icons in a Boolean Column - Kendo UI Grid for jQuery
slug: grid-render-icons-boolean-column
tags: grid, template, icons, boolean, columns
res_type: kb
ticketid: 1589622
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
  <td>Progress® Kendo UI® MultiSelect for jQuery</td>
 </tr>
</table>

## Description

How can I render icons for a boolean column in the Kendo UI for jQuery Grid?

## Solution

To achieve this, use a [`column template`](/api/javascript/ui/grid/configuration/columns.template) function and render the desired icons.
  
The following example demonstrates how to replace the `yes` value with `.k-i-check` and the `no` value with `.k-i-x` [`Kendo UI Web Font Icons`](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes/font-icons). 

```dojo
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
            navigatable: true,
            pageable: true,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
              { field: "UnitsInStock", title: "Units In Stock", width: 120 },
              { field: "Discontinued", template: discTemplate, attributes: { style: "text-align: center" }, width: 80 },
              { command: "destroy", title: "&nbsp;", width: 150 }],
            editable: true
          });
        });

        function discTemplate(data) {
          return data.Discontinued ? "<span class='k-icon k-i-check'></span>" : "<span class='k-icon k-i-x'></span>"
        }
      </script>
```

## See Also

* [JavaScript API Reference of the jQuery Grid](/api/javascript/ui/grid)
* [jQuery Grid Overview Demo](https://demos.telerik.com/kendo-ui/grid/index)
