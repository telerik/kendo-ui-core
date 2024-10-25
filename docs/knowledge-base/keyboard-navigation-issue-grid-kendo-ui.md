---
title: Navigating Using Keyboard in Grid Does Not Fully Show First Column After Sticky Columns
description: Learn how to address the issue where the first column after sticky columns does not fully show when navigating using the keyboard in the Grid component.
type: troubleshooting
page_title: Keyboard Navigation Issue in Grid | Kendo UI Grid
slug: keyboard-navigation-issue-grid-kendo-ui
tags: grid, kendo ui, keyboard navigation, sticky columns, first column, workaround
res_type: kb
---

## Environment
| Product | Kendo UI Grid |
| ------- | ------------- |
| Version | 2023.3.1114  |

## Description
When navigating using the keyboard in the Grid component, the first column after sticky columns does not fully show.

## Solution
To address this issue, you can follow these steps:

1. Bind to the `keypress` event of the `div#grid` element.
2. Check if the current target of the `tab` keypress event has the ID `CustomerID`.
3. Scroll the Grid dynamically to show the first column.

Here is an example of how you can implement this workaround:

```dojo
<div id="grid"></div>
      <script>
        $(document).ready(function () {
          $("#grid").keyup(function(e){ 
            if($(e.target).is("#CustomerID") && e.shiftKey === true && e.code === "Tab") {
								$(".k-grid-content").animate({ scrollLeft: -100} );
            }
          })
          if (kendo.support.browser.msie !== true) {
            $("#grid").kendoGrid({
              dataSource: {
                type: "odata",
                transport: {
                  read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                },
                schema: {
                  model: {
                    fields: {
                      OrderID: { type: "number" },
                      ShipCountry: { type: "string" },
                      ShipName: { type: "string" },
                      ShipCity: { type: "string" },
                      ShipAddress: { type: "string" },
                      RequiredDate: { type: "date" }
                    }
                  }
                },
                pageSize: 30
              },
              navigatable:true,
              editable: "incell",
              height: 540,
              sortable: true,
              reorderable: true,
              groupable: true,
              resizable: true,
              filterable: true,
              columnMenu: true,
              pageable: true,
              columns: [{
                field: "OrderID",
                title: "Order ID",
                sticky: true,
                width: 150
              },
                        {
                          field: "CustomerID",
                          title: "Customer ID",
                          stickable: true,
                          width: 250
                        },
                        {
                          field: "ShipName",
                          title: "Ship Name",
                          stickable: true,
                          width: 350
                        }, {
                          field: "ShipCountry",
                          title: "Ship Country",
                          stickable: true,
                          width: 300
                        }, {
                          field: "ShipAddress",
                          title: "Ship Address",
                          stickable: true,
                          width: 300
                        }, {
                          field: "ShipCity",
                          title: "Ship City",
                          stickable: true,
                          width: 300
                        }, {
                          field: "ShipPostalCode",
                          title: "Ship Postal Code",
                          stickable: true,
                          width: 300
                        },
                        {
                          field: "ShipVia",
                          title: "Ship Via",
                          stickable: true,
                          width: 250
                        },
                        {
                          field: "RequiredDate",
                          title: "Required Date",
                          template: '#= kendo.toString(RequiredDate, "dd/MM/yyyy") #',
                          stickable: true,
                          width: 250
                        }
                       ]
            });
          } else {
            $("#grid").html("Sticky columns are not supported in IE!")
          }
        });
      </script>
```

## See Also
- [Kendo UI Grid Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
