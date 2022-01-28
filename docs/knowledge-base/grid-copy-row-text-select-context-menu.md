---
title: Copy Entire Row by Using the ContextMenu
description: An example on how to copy the contents of a Kendo UI Grid row by using a Kendo UI ContextMenu for jQuery.
type: how-to
page_title: Copy Row Text with ContextMenu | Kendo UI Grid for jQuery
slug: grid-copy-row-text-select-context-menu
tags: grid, copy, row, text, select, context, menu
ticketid: 1407108
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>

  <td>Product Version</td>
  <td>2019.1.220</td>
 </tr>
</table>

## Description

How can I copy the contents of a row in the Kendo UI Grid by using a Kendo UI ContextMenu?

## Solution

1. Include the [clipboard.js library in your project](https://clipboardjs.com/).

      ```
         <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js"></script>
      ```

1. When you declare the Kendo UI ContextMenu, [target the row by using `"tr[role='row']"`](https://docs.telerik.com/kendo-ui/api/javascript/ui/contextmenu/configuration/target).
1. During the [`select` even of the ContextMenu](https://docs.telerik.com/kendo-ui/api/javascript/ui/contextmenu/events/select):
  1. Reference the Kendo UI Grid.
  1. Get the [`dataItem` from the target row](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/dataitem).
  1. Specify the text which you want to copy by using `dataItem`.
  1. If the `item.id` is `"copyText"`, return a new `Clipboard` object which returns the `dataItem` text.

        ```javascript
            $("#context-menu").kendoContextMenu({
                target: "#grid",
                filter: "tr[role='row']",  //2
                select: function (e) {  //3
                    var grid = $("#grid").data("kendoGrid");  //a
                    var model = grid.dataItem(e.target);  //b
                    var rowText = model.OrderID + ", " + model.Freight + ", " + model.OrderDate + ", " + model.ShipName + ", " + model.ShipCity;  //c

                    if (e.item.id === 'copyText') {  //d
                        new Clipboard('#copyText', {
                            text: function (trigger) {
                                return rowText;
                            }
                        });
                    };
                }
            });
        ```

The following example demonstrates the full implementation of the suggested approach.

```dojo
    <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js"></script>

    <div id="grid"></div>
    <ul id="context-menu">
      <li id="copyText">Copy Text</li>
    </ul>

    <script>
      $(document).ready(function () {


        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
            dataSource = new kendo.data.DataSource({
              transport: {
                read: {
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
                parameterMap: function (options, operation) {
                  if (operation !== "read" && options.models) {
                    return {
                      models: kendo.stringify(options.models)
                    };
                  }
                }
              },
              batch: true,
              pageSize: 20,
              schema: {
                model: {
                  id: "ProductID",
                  fields: {
                    ProductID: {
                      editable: false,
                      nullable: true
                    },
                    ProductName: {
                      validation: {
                        required: true
                      }
                    },
                    UnitPrice: {
                      type: "number",
                      validation: {
                        required: true,
                        min: 1
                      }
                    },
                    Discontinued: {
                      type: "boolean"
                    },
                    UnitsInStock: {
                      type: "number",
                      validation: {
                        min: 0,
                        required: true
                      }
                    }
                  }
                }
              }
            });

        $("#grid").kendoGrid({
          dataSource: dataSource,
          pageable: true,
          height: 550,
          selectable: "multiple",
          columns: [
            "ProductName",
            {
              field: "UnitPrice",
              title: "Unit Price",
              format: "{0:c}",
              width: "120px"
            },
            {
              field: "UnitsInStock",
              title: "Units In Stock",
              width: "120px"
            },
            {
              field: "Discontinued",
              width: "120px"
            }
          ],
          editable: "inline"
        });

        $("#context-menu").kendoContextMenu({
          target: "#grid",
          filter: "tr[role='row']",  //2
          select: function (e) {  //3
            var grid = $("#grid").data("kendoGrid");  //a
            var model = grid.dataItem(e.target);  //b
            var rowText = model.ProductName + ", " + model.UnitPrice + ", " + model.UnitsInStock + ", " + model.Discontinued;  //c

            if (e.item.id === 'copyText') {  //d
              new Clipboard('#copyText', {
                text: function (trigger) {
                  return rowText;
                }
              });
            };
          }
        });

        $(document).on("mousedown", "td", function (e) {
          setTimeout(function () {
            $("#grid").data("kendoGrid").saveRow();
          })
        });
      });
    </script>
```

## See Also

* [API Reference of the clipboard.js Library](https://clipboardjs.com/)
* [API Reference of target](https://docs.telerik.com/kendo-ui/api/javascript/ui/contextmenu/configuration/target)
* [API Reference of select](https://docs.telerik.com/kendo-ui/api/javascript/ui/contextmenu/events/select)
* [API Reference of dataItem](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/dataitem)
