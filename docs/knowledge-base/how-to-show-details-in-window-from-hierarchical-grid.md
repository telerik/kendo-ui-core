---
title: Kendo UI Window in Hierarchical Grid
description: An example on how to using Window in a Hierarchical Grid
type: how-to
page_title: How to Show Details in Window From Hierarchical Grid | Kendo UI Grid
slug: how-to-show-details-in-window-from-hierarchical-grid
tags: grid, hierarchical, window, details
ticketid: 1132144
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
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
I have a scenario, where I want to show or open a Kendo window from click of a link in Nested or Child Template of the Grid. I couldn't get it to working because I am unable to find the object of link to open Kendo Window.

## Solution
  
Please check an example demonstrating the described scenario.
The main points are to have a custom command which will change the content on the Window based on the current dataItem associated with the clicked row.

````html
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
````
