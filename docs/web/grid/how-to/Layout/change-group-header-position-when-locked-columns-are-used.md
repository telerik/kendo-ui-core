---
title: Change group header position with locked columns
page_title: Change group header position with locked columns
description: Change group header position with locked columns
---

# Change group header position with locked columns

The following runnable sample demonstrates how to change the group header position, when locked columns are used, in order to show them on the right table.

#### Example

```html
    <div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataBound: function(e){
              var grid = this;
              this.lockedTable.find(".k-grouping-row").each(function(index) {
                var arrow = $(this).find("a");
                grid.tbody.find(".k-grouping-row:eq("+index+") td").text($(this).text())
                $(this).find("p").text(" ").append(arrow);
              })
            },
            dataSource: {
              type: "odata",
              transport: {
                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              schema: {
                model: {
                  fields: {
                    OrderID: { type: "number" },
                    ShipCountry: { type: "string" },
                    ShipName: { type: "string" },
                    ShipCity: { type: "string" },
                    ShipAddress: { type: "string" }
                  }
                }
              },
              pageSize: 30
            },
            height: 540,
            sortable: true,
            reorderable: true,
            groupable: true,
            resizable: true,
            filterable: true,
            columnMenu: true,
            pageable: true,
            columns: [ {
              field: "OrderID",
              title: "Order ID",
              locked: true,
              lockable: false,
              width: 50
            }, {
              field: "ShipCountry",
              title: "Ship Country",
              width: 300
            }, {
              field: "ShipCity",
              title: "Ship City",
              width: 300
            },{
              field: "ShipName",
              title: "Ship Name",
              width: 300
            },  {
              field: "ShipAddress",
              lockable: false,
              width: 400
            }
                     ]
          });
        });
      </script>
    </div>
```