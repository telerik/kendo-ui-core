---
title: Reorder Rows in Nested Grid
page_title: Reorder Rows in Nested Grid | Kendo UI Sortable
description: "Learn how to reorder rows in a child Grid using the Kendo UI Sortable widget."
slug: howto_reorderrowsinnestedgrid_sortable
---

# Reorder Rows in Nested Grid

The example below demonstrates how to reorder rows in a child Grid using the Kendo UI Sortable widget.

###### Example

```html
    <div id="example">
      <div id="grid"></div>
      <script>
        $(document).ready(function() {
          var element = $("#grid").kendoGrid({
            dataSource: {
              type: "odata",
              transport: {
                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
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
            hint: function(element) { //customize the hint
              var grid = $("#grid").data("kendoGrid"),
                  table = grid.table.clone(), //clone Grid's table
                  wrapperWidth = grid.wrapper.width(), //get Grid's width
                  wrapper = $("<div class='k-grid k-widget'></div>").width(wrapperWidth),
                  hint;

              table.find("thead").remove(); //remove Grid's header from the hint
              table.find("tbody").empty(); //remove the existing rows from the hint
              table.wrap(wrapper); //wrap the table
              table.append(element.clone()); //append the dragged element
              table.append(element.next().clone());
              hint = table.parent(); //get the wrapper

              return hint; //return the hint element
            },

            placeholder: function(element) { //customize the placeholder
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
                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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

              table.find("thead").remove(); //remove Grid's header from the hint
              table.find("tbody").empty(); //remove the existing rows from the hint
              table.wrap(wrapper); //wrap the table
              table.append(element.clone()); //append the dragged element

              hint = table.parent(); //get the wrapper

              return hint; //return the hint element
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

Other articles and how-to examples on the Kendo UI Sortable:

* [Sortable JavaScript API Reference](/api/javascript/ui/sortable)
* [How to Nest Sortables]({% slug howto_nestsortables_sortable %})
* [How to Persist Order in localStorage]({% slug howto_persistoderinlocalstorage_sortable %})
* [How to Reorder AngularJS Grid Rows]({% slug howto_reorderangularjsgridrows_angular_sortable %})
* [How to Reorder Grid Rows]({% slug howto_reordergridrows_sortable %})
* [How to Reorder Multiple Items]({% slug howto_reordermultipleitems_sortable %})
* [How to Transfer Grid Rows]({% slug howto_transfergridrows_sortable %})
* [How to Use Sortable in AngularJS with Grid in Batch Editing Mode]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %})

For more runnable examples on the Kendo UI Sortable, browse the [how-to articles]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %}).
