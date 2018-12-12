---
title: Lock and Unlock Grid Columns by Using Toolbar instead of Column Menu
description: An example on how to lock and unlock Kendo UI Grid columns by using the Toolbar instead of the Column Menu.
type: how-to
page_title: Lock and Unlock Columns with Toolbar instead of Column Menu | Kendo UI Grid
slug: grid-lock-unlock-using-toolbar
tags: grid, lock, unlock, toolbar, column, menu
ticketid: 1150311
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

My Grid does not need the Column Menu anymore.

How can I lock and unlock columns by using checkboxes in the Toolbar instead?

## Solution

Use the `lockColumn` and `unlockColumn` methods. To make changes through a custom control in the Toolbar of the Grid, use a custom Toolbar template.

```dojo
<div id="grid"></div>

  <script type="text/x-kendo-template" id="template">
    <div class="toolbar">
      <label class="category-label" for="c1">Order ID:</label>
      <input type="checkbox" id="c1" onchange="checkBoxChanged('c1', 'OrderID')" checked/>
      <label class="category-label" for="c2">Ship Name:</label>
      <input type="checkbox" id="c2" onchange="checkBoxChanged('c2', 'ShipName')" checked/>
      <label class="category-label" for="c3">Ship Country:</label>
      <input type="checkbox" id="c3" onchange="checkBoxChanged('c3', 'ShipCountry')" />
      <label class="category-label" for="c4">Ship City:</label>
      <input type="checkbox" id="c4" onchange="checkBoxChanged('c4', 'ShipCity')" />
      <label class="category-label" for="c5">Ship Address:</label>
      <input type="checkbox" id="c5" onchange="checkBoxChanged('c5', 'ShipAddress')" />
    </div>
  </script>

  <script>
    function checkBoxChanged(id, field) {      
      //The Locked Columns feature requires at least one column to be locked at all times.
      if ($("input[type='checkbox']:checked").length == 1){
        $("input[type='checkbox']:checked").each(function(){
          $(this).attr("disabled", true);
        });
      }
      else{
        $("input[type='checkbox']:checked").each(function(){          
          $(this).attr("disabled", false);
        });          
      }

      var grid = $("#grid").data("kendoGrid");

      if (document.getElementById(id).checked) {
        grid.lockColumn(field);
      } else {
        grid.unlockColumn(field);
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

* [API Reference of the lockColumn Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/lockcolumn)
* [API Reference of the unlockColumn Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/unlockcolumn)
* [Kendo UI Templates Overview](https://docs.telerik.com/kendo-ui/framework/templates/overview)
* [Kendo UI Grid Toolbar Template Demo](https://demos.telerik.com/kendo-ui/grid/toolbar-template)
