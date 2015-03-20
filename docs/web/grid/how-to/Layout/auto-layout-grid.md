---
title: Creating and using auto layout
page_title: Creating and using auto layout
description: Creating and using auto layout
---

# Creating and using auto layout

The following runnable sample demonstrates how to create auto layout for the Kendo UI Grid. Please note that the auto layout requires disabled Grid scrolling

#### Example

```html
    <style>
      html
      {
        font: 12px sans-serif;
      }

      .k-grid
      {
        width: 500px;
      }

      #grid3
      {
        display: inline-block;
        width: auto;    
      }

      #grid3 table
      {
        width: auto;
      }
    </style>
    <p><strong>N.B: Auto layout requires disabled Grid scrolling.</strong></p>

    <h3>No column widths, auto layout</h3>

    <div id="grid1"></div>

    <h3>One narrow column with other wide columns, auto layout</h3>

    <div id="grid2"></div>

    <h3>Minimal Grid with auto layout.</h3>

    <div id="grid3"></div> 
    <script>
      var gridConfig = {
        dataSource: {
          type: "odata",
          transport: {
            read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
          },
          schema: {
            model: {
              fields: {
                OrderID: { type: "number" },
                Freight: { type: "number" },
                OrderDate: { type: "date" }
              }
            }
          },
          pageSize: 5,
          serverPaging: true,
          serverFiltering: true,
          serverSorting: true
        },
        scrollable: false,
        sortable: true,
        pageable: {numeric:false, info:false}
      };

      $("#grid1").kendoGrid($.extend(gridConfig, {
        columns: [{
          field: "OrderID"
        }, {
          field: "Freight"
        }, {
          field: "OrderDate",
          format: "{0:MM/dd/yyyy}"
        }]
      }));

      $("#grid2").kendoGrid($.extend(gridConfig, {
        columns: [{
          field: "OrderID"
        }, {
          field: "Freight",
          width: 75
        }, {
          field: "OrderDate",
          format: "{0:MM/dd/yyyy}"
        }]
      }));

      $("#grid3").kendoGrid($.extend(gridConfig, {
        columns: [{
          field: "OrderID"
        }, {
          field: "Freight"
        }, {
          field: "OrderDate",
          format: "{0:MM/dd/yyyy}"
        }]
      }));
    </script>
```