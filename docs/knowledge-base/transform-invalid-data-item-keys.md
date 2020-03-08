---
title: Transform Invalid Data Item Keys into Valid Ones
page_title: Transform Invalid Data Item Keys | Kendo UI Grid for jQuery
description: "An example on how to use the `schema.parse()` method to replace the non-supported data item keys with supported ones in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/transform-invalid-data-item-keys, /controls/data-management/grid/how-to/various/transform-invalid-data-item-keys
slug: howto_transforminvaliddataitemkety_grid
tags: transform, invalid, data, items, keys, valid, grid
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
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

How can I use the `schema.parse()` method to replace the non-supported data item keys with supported ones in the Kendo UI Grid for jQuery?

## Solution

Sometimes the received remote data contains fields that are not valid JavaScript identifiers.

To manipulate the received data and transform it so that it can be processed by the DataSource, use the `schema.parse()` method to replace the non-supported keys with supported.

The following example demonstrates how to use the `schema.parse()` method to transform invalid data item keys into valid ones.

```dojo
    <div id="grid"></div>
    <script>
          $(document).ready(function () {
              var d = [{id: 1,
                  "As Of Date": new Date("01/01/1991")
              }, {id:2,
                  "As Of Date": new Date("01/01/1990")
              }];

              $("#grid").kendoGrid({
                  editable: "popup",
                  dataSource: {
                      transport: {
                          read: function (e) {
                              // on success
                              e.success(d);
                              // on failure
                              //e.error("XHR response", "status code", "error message");
                          },
                          update: function (e) {
                              // persist the new data
                              d = e.data;

                              e.success();
                          }
                      },
                      schema: {
                          parse: function (response) {
                              // transform the objects so that they do not contain "illegal" identifiers
                              response.forEach(function (item) {
                                  item.field1 = item["As Of Date"];
                                  delete item['As Of Date'];
                              });

                              return response;
                          },
                          model: {
                              fields: {
                                  "id": "id",
                                  "field1": {
                                      type: "date",
                                  }
                              }
                          }
                      }
                  },
                  columns: [
                    {
                        command: [{ name: "edit" }]
                    },
                          { field: "field1", format: "{0:MM/dd/yyyy}", title: "As Of Date" }
                  ]
              });
          });
      </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
