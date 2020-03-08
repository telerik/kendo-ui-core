---
title: Sort Displayed Columns Menu Items
description: An example on how to sort displayed columns menu items in the Kendo UI Grid header.
type: how-to
page_title: Implement Sort Displayed Columns Menu Items | Kendo UI Grid for jQuery
slug: grid-sort-displayed-columns-menu-items
tags: grid, columnmenu, menu, column, list, header, checkbox, sort
ticketid: 1146769, 1384397
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
  <td>Created with version</td>
  <td>2019.1.115</td>
 </tr>
</table>


## Description

My Grid has a column menu, which contains displayed columns submenu.

How can I sort the items of the displayed columns submenu?

## Solution

A possible solution is to sort the li elements of the column menu within the [columnMenuInit](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnmenuinit) event of the widget.

```dojo
    <div id="example">
      <div id="grid"></div>

      <script>
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
            columns: [ {
              field: "OrderID",
              title: "Order ID",
              width: 120
            }, {
              field: "ShipCountry",
              title: "Ship Country"
            }, {
              field: "ShipName",
              title: "Ship Name"
            },  {
              field: "ShipAddress",
              filterable: false
            }],
            columnMenuInit:function(e){
              var list= e.container.find('.k-columns-item ul')
              var items = list.find('li');

              items.each(function(x,y){
                $(y).removeClass('k-first k-last')
              }) 

              items.sort(function(a,b){
                a = $(a);
                b = $(b);

                var firstText = a.find('input[data-field]').attr('data-field');
                var secondText = b.find('input[data-field]').attr('data-field');

                return ((firstText < secondText) ? -1 : ((firstText > secondText) ? 1 : 0));
              })

              items.first().addClass('k-first');
              items.last().addClass('k-last');

              items.each(function(y,x){
                list.append($(x));
              })
            }
          });
        });
      </script>
    </div>
```
