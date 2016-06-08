---
title: Refresh Grid in Detail Template
page_title: Refresh Grid in Detail Template | Kendo UI Grid
description: "Learn how to refresh a child grid in a detail template by using an external button in the Kendo UI Grid widget."
slug: howto_refresh_gridin_detail_template_grid
---

# Refresh Grid in Detail Template

The example below demonstrates how to refresh a child grid in a detail template by using an external button in Kendo UI Grid.

###### Example

```html
    <div id="grid"></div>
    <script>

      var element = $("#grid").kendoGrid({
        dataSource: {
          type: "odata",
          transport: {
            read: "http://demos.kendoui.com/service/Northwind.svc/Employees"
          },
          pageSize: 6,
          serverPaging: true,
          serverSorting: true
        },
        height: 450,
        sortable: true,
        pageable: true,
        detailInit: detailInit,
        dataBound: function() {
          this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        columns: [
          {
            field: "FirstName",
            title: "First Name"
          },
          {
            field: "LastName",
            title: "Last Name"
          },
          {
            field: "Country"
          },
          {
            field: "City"
          },
          {
            field: "Title"
          }
        ]
      }).on("click", ".btn-refresh", function(e) {
        var childGrid = $(e.target).closest(".k-grid").data("kendoGrid");
        childGrid.dataSource.read();
      });

      function detailInit(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
            },
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            pageSize:6,
            filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
          },
          scrollable: false,
          sortable: true,
          pageable: true,
          toolbar: [{text: "Refresh", className: "btn-refresh"}],
          columns: [
            { field: "OrderID", width: 70 },
            { field: "ShipCountry", title:"Ship Country", width: 100 },
            { field: "ShipAddress", title:"Ship Address" },
            { field: "ShipName", title: "Ship Name", width: 200 }
          ]
        });
      }
    </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to the usage of templates:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Create Custom Editor in Detail Template]({% slug howto_create_custom_editorin_detail_template_grid %})
* [How to Use Checkbox Column Templates and Edit]({% slug howto_use_checkbox_column_templateand_edit_grid %})
* [How to Use Dates inside Row Template]({% slug howto_use_dates_inside_row_template_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
