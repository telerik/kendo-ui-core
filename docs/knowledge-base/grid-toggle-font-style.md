---
title: Toggle Font Styles in Grids
description: An example on how to set a different time value as the start time of a TimePicker and change the order of the options in the list of the Kendo UI Grid.
type: how-to
page_title: Toggle the Font Style | Kendo UI Grid for jQuery
slug: grid-toggle-font-style
tags: grid, toggle, font, style, body
ticketid: 1154127
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

How can I toggle between regular fonts and italics by clicking on a radio button in the toolbar of the Grid?

## Solution

Use the `CSS` jQuery method and the `change` event of the radio button.

```dojo
<div id="example">
  <div id="grid"></div>

  <script type="text/x-kendo-template" id="template">
    <div class="toolbar">
      <label class="category-label">Now:</label>
      <input type="radio" name="time" onchange="checkBoxChanged('now')" checked/>
      <label class="category-label">Specific Date:</label>
      <input type="radio" name="time" onchange="checkBoxChanged('specific')" />
    </div>
  </script>

  <script>
    function checkBoxChanged(time) {
      var grid = $("#grid").data("kendoGrid");
      if (time == "now") {
        $("#grid").css("font-style", "normal");
      } else {
        $("#grid").css("font-style", "italic");
      }
    }
    $(document).ready(function() {
      $("#grid").kendoGrid({
        dataSource: {
          type: "odata",
          transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
          },
          schema: {
            model: {
              fields: {
                OrderID: {
                  type: "number"
                },
                ShipCountry: {
                  type: "string"
                },
                ShipName: {
                  type: "string"
                },
                ShipCity: {
                  type: "string"
                },
                ShipAddress: {
                  type: "string"
                }
              }
            }
          },
          pageSize: 30
        },
        toolbar: kendo.template($("#template").html()),
        height: 540,
        resizable: true,
        pageable: true,
        columns: [{
          field: "OrderID",
          title: "Order ID",
          locked: true,
          lockable: false,
          width: 150
        }, {
          field: "ShipCountry",
          title: "Ship Country",
          width: 300
        }, {
          field: "ShipCity",
          title: "Ship City",
          width: 300
        }, {
          field: "ShipName",
          title: "Ship Name",
          locked: true,
          width: 300
        }, {
          field: "ShipAddress",
          lockable: false,
          width: 400
        }]
      });
    });
  </script>
  <style>
    #grid .k-grid-toolbar {
      padding: .6em 1.3em .6em .4em;
    }

    .category-label {
      vertical-align: middle;
      padding-right: .5em;
    }

    #category {
      vertical-align: middle;
    }

    .refreshBtnContainer {
      display: inline-block;
    }

    .toolbar {
      float: right;
    }
  </style>
</div>
```

## See Also

* [ API Reference of the css jQuery Method](https://api.jquery.com/css/)
