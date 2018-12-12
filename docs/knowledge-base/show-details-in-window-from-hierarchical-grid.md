---
title: Display Details of Hierarchical Grid in Window
description: An example on how to use a window to display details of a hierarchical Grid.
type: how-to
page_title: Show Details of Hierarchical Grids in a Window | Kendo UI Grid
slug: show-details-in-window-from-hierarchical-grid
tags: grid, hierarchical, window, details
previous_url: /knowledge-base/how-to-show-details-in-window-from-hierarchical-grid
ticketid: 1132144
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 7 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>60.0.3112.113</td>
 </tr> <tr>
  <td>Made with veriosn</td>
  <td>2017.3.913</td>
 </tr>
</table>


## Description

I want to show or open a Kendo UI Window by clicking a link in a nested or child template of the Grid but I cannot find the object of the link to open the Kendo UI Window.

How can I show the details of a hierarchical in a Kendo UI Window?

## Solution

Create a custom command which changes the content of the Window based on the current `dataItem` that is associated with the clicked row.

```dojo
<div id="example">
      <div id="grid"></div>
      <div id="details"></div>

      <script>
        var wnd,
            detailsTemplate;
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
          wnd = $("#details")
            .kendoWindow({
            title: "Order Details",
            modal: true,
            visible: false,
            resizable: false,
            width: 300
          }).data("kendoWindow");

          detailsTemplate = kendo.template($("#template").html());
        });

        function detailInit(e) {
          $("<div/>").appendTo(e.detailCell).kendoGrid({
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
              { field: "OrderID", width: "110px" },
              { field: "ShipCountry", title:"Ship Country", width: "110px" },
              { field: "ShipAddress", title:"Ship Address" },
              { field: "ShipName", title: "Ship Name", width: "300px" },
              { command: { text: "View Details", click: showDetails }, title: " ", width: "180px" }
            ]
          });
        }



        function showDetails(e) {
          e.preventDefault();

          var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
          console.log(dataItem)
          wnd.content(detailsTemplate(dataItem));
          wnd.center().open();
        }
      </script>
      <script type="text/x-kendo-template" id="template">
                <div id="details-container">
                    <h2>#= ShipName #</h2>
                    <em>#= ShipAddress #</em>
                    <dl>
                        <dt>Country: #= ShipCountry #</dt>
                    </dl>
        </div>
      </script>
    </div>

    <style type="text/css">
      #details-container
      {
        padding: 10px;
      }

      #details-container h2
      {
        margin: 0;
      }

      #details-container em
      {
        color: #8c8c8c;
      }

      #details-container dt
      {
        margin:0;
        display: inline;
      }
    </style>
```
