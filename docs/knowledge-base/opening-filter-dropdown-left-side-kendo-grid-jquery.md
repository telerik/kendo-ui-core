---
title: Opening Filter Dropdown to the Left Side in Kendo Grid using jQuery
description: Learn how to open the filter dropdown of a Kendo Grid to the left side using jQuery.
type: how-to
page_title: Opening Filter Dropdown to the Left Side in Kendo Grid using jQuery
slug: opening-filter-dropdown-left-side-kendo-grid-jquery
tags: kendo grid, filter dropdown, left side, jQuery
res_type: kb
---

## Environment
| Product | Version |
| --- | --- |
| Grid for Progress® Kendo UI® | Current |

## Description
I want to open the filter dropdown of a Kendo Grid to the left side using jQuery. How can I achieve this?

## Solution
To open the filter dropdown of a Kendo Grid to the left side, you can handle the [columnMenuOpen](/api/javascript/ui/grid/events/columnmenuopen) event of the Grid. In the event handler, you can get a reference to the Kendo Menu and set its [direction](/api/javascript/ui/menu/configuration/direction) configuration option to the needed direction.

```javascript
columnMenuInit: function(e){
    $('.k-column-menu .k-menu').data('kendoMenu').setOptions({
        direction: "top left"
    });
}
```

 Below is a runnable example:

```dojo
  <div id="grid"></div>
    <script>

      var dataSource = new kendo.data.DataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/service/v2/core/products"
          }
        },
        pageSize: 10
      });

      var grid = $("#grid").kendoGrid({
        
          dataSource: dataSource,
          filterable: true,
          columnMenu: true,
          multi: true,
          selectable: true,  
        	columnMenuInit: function(e){            
            $('.k-column-menu .k-menu').data('kendoMenu').setOptions({
             direction: "left"
            })
          },
          pageable: {
            pageSize: 5,
            input: true
          },
          columns: [
            {
              title: "Id",
              field: "ProductID",
              width: 70
            },
            {
              field: "ProductName", title: 'Title',
              width: "25%",
              attributes: {
                style: 'white-space: nowrap;'
              },
              filterable: {
                multi: true,
                extra: false,
                search: true,
                operators: {
                  string: {
                    eq: "Is equal to",
                    neq: "Is not equal to",
                    contains: "Contains"
                  }
                }
              }
            },
            "UnitsInStock",
            "UnitPrice"            
          ]
        });

    </script>
```
