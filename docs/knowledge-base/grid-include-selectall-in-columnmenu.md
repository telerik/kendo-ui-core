---
title: Include SelectAll for Grid Column Sections in ColumnMenu
description: Learn how to render SelectAll in the column menu of the Grid columns.
type: how-to
page_title: Display SelectAll in the ColumnMenu for Showing and Hiding Columns - Kendo UI Grid for jQuery
slug: grid-include-selectall-in-columnmenu
tags: kendoui, kendo, grid, column menu, select all
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
</table>

## Description

How can I render a **Select All** option in the column menu of the Grid and show and hide all columns through a checkbox?

## Solution

Render the checkbox within the `columnMenuInit` event of the Grid.

> You will always need to have at least one visible column in the Grid.

> The below example works visually well with the Kendo UI `Default v.2 Sass Theme`. If using a different theme you, will need to modify the custom styles.

```dojo
<style>
      .custom-class{
        padding: 6px 12px 6px 11px;
        background: #fff;
        line-height: 26px;

      }
      .custom-class:hover {
        background-color: #f0f0f0;
      }

      .k-group .k-popup {
        border-style: normal; 
        border-width: 0px; 
      }
      .chbx {
        margin-left: 1px;
      }
    </style>

    <div id="example">
      <div id="grid"></div>
      <script>
        $(document).ready(function () {
          $("#grid").kendoGrid({
            columnMenuOpen: function (e) {
              e.container.find("[data-role='menu']").data("kendoMenu").bind("activate", function (e) {
                if (e.item.hasClass("k-columns-item")) {
                  var listitems = e.item.find(".k-animation-container").find("li");

                  $(listitems).on("click", function (e) {
                    var that = this;
                    var allChecked = $(that).closest("ul").find("li.k-item input:checked").length === $(that).closest("ul").find("li.k-item input").length;
                    $(".custom-class input")[0].checked = allChecked;
                  });

                  e.sender.unbind("activate");
                  e.item.find(".custom-class").remove();
                  e.item.find('.k-filter-item').find('[role="menuitemcheckbox"]').remove();
                  $("<span class='custom-class'><label class='k-link' style='padding: 10px 40px 10px 0px;'><input class='chbx' type='checkbox' checked onclick='checkAllMenu(this)'/>Select All</label></span>").prependTo(e.item.find(".k-animation-container"));
                }
              });
            },
            dataSource: {
              type: "odata",
              transport: {
                read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
              },
              schema: {
                model: {
                  fields: {
                    OrderID: { type: "number" },
                    ShipCountry: { type: "string" },
                    ShipName: { type: "string" },
                    ShipAddress: { type: "string" }
                  }
                }
              },
              pageSize: 30,
              serverPaging: true,
              serverFiltering: true,
              serverSorting: true
            },
            height: 550,
            sortable: true,
            filterable: true,
            columnMenu: true,
            pageable: true,
            columns: [{
              field: "OrderID",
              title: "Order ID",
              width: 120
            }, {
              field: "ShipCountry",
              title: "Ship Country"
            }, {
              field: "ShipName",
              title: "Ship Name"
            }, {
              field: "ShipAddress",
              title: "Ship Address",
              filterable: false
            }
                     ]
          });
        });

        function checkAllMenu(el) {
          var checked = el.checked;
          $(el).parents(".custom-class").siblings("ul").find("li").each(function (e) {
            if (!$(this).hasClass("custom-class") && $(this).find("input")[0].checked !== checked) {
              $(this).find("input").click();
              $(this).removeClass("k-hover");
            }
          });
        }
      </script>
    </div>
```
