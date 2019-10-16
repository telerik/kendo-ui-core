---
title: Reorder Rows in Nested Grids
page_title: Reorder Rows in Nested Grid | Kendo UI Sortable
description: "Learn how to reorder rows in a child Grid using the Kendo UI Sortable widget."
previous_url: /controls/interactivity/sortable/how-to/reorder-child-grid-rows
slug: howto_reorderrowsinnestedgrid_sortable
---

# Reorder Rows in Nested Grid

The following example demonstrates how to reorder rows in a child Grid using the Kendo UI Sortable widget.

```dojo
    <div id="example">
      <div id="grid"></div>
      <script>
        $(document).ready(function() {
          var element = $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
              },
              pageSize: 6,
              serverPaging: true,
              serverSorting: true
            },
            height: 600,
            sortable: true,
            pageable: true,
            detailInit: detailInit,
            dataBound: function() {
              this.expandRow(this.tbody.find("tr.k-master-row").first());
            },
            columns: [
              {
                field: "FirstName",
                title: "First Name",
                width: "110px"
              },
              {
                field: "LastName",
                title: "Last Name",
                width: "110px"
              },
              {
                field: "Country",
                width: "110px"
              },
              {
                field: "City",
                width: "110px"
              },
              {
                field: "Title"
              }
            ]
          });

          var detail;
          $("#grid").data("kendoGrid").table.kendoSortable({
            filter: ">tbody >tr:not(.k-detail-row)",
            hint: function(element) { // Customize the hint.
              var grid = $("#grid").data("kendoGrid"),
                  table = grid.table.clone(), // Clone the Grid table.
                  wrapperWidth = grid.wrapper.width(), // Get the Grid width.
                  wrapper = $("<div class='k-grid k-widget'></div>").width(wrapperWidth),
                  hint;

              table.find("thead").remove(); // Remove Grid header from the hint.
              table.find("tbody").empty(); // Remove the existing rows from the hint.
              table.wrap(wrapper); //wrap the table
              table.append(element.clone()); // Append the dragged element.
              table.append(element.next().clone());
              hint = table.parent(); // Get the wrapper.

              return hint; // Return the hint element.
            },

            placeholder: function(element) { // Customize the placeholder.
              return element.clone().addClass("k-state-hover").css("opacity", 0.65);
            },
            end: function(e) {
              detail = e.draggableEvent.currentTarget.next();
            },
            change: function(e) {
              e.item.after(detail);
            }
          });


        });

        function detailInit(e) {
          var el = $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              serverPaging: true,
              serverSorting: true,
              serverFiltering: true,
              pageSize: 10,
              filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
              { field: "OrderID", width: "70px" },
              { field: "ShipCountry", title:"Ship Country", width: "110px" },
              { field: "ShipAddress", title:"Ship Address" },
              { field: "ShipName", title: "Ship Name", width: "300px" }
            ]
          });

          el.data("kendoGrid").table.kendoSortable({
            filter: ">tbody >tr:not(.k-detail-row)",
            hint: function(element) { //customize the hint
              var grid = el.data("kendoGrid"),
                  table = grid.table.clone(), //clone Grid's table
                  wrapperWidth = grid.wrapper.width(), //get Grid's width
                  wrapper = $("<div class='k-grid k-widget'></div>").width(wrapperWidth),
                  hint;

              table.find("thead").remove(); // Remove the Grid header from the hint.
              table.find("tbody").empty(); // Remove the existing rows from the hint.
              table.wrap(wrapper); //wrap the table
              table.append(element.clone()); // Append the dragged element.

              hint = table.parent(); // Get the wrapper.

              return hint; // Return the hint element.
            },

            placeholder: function(element) { //customize the placeholder
              return element.clone().addClass("k-state-hover").css("opacity", 0.65);
            }
          });

        }
      </script>
    </div>
```

## See Also

* [Basic Usage of the Sortable (Demo)](https://demos.telerik.com/kendo-ui/sortable/index)
* [JavaScript API Reference of the Sortable](/api/javascript/ui/sortable)
