---
title: Enabling Tabbed Focus on Column Headers in Kendo UI Grid
description: Learn how to enable keyboard access to column headers in Kendo UI Grid for WCAG compliance.
type: how-to
page_title: How to Navigate to Column Headers with Tab in Kendo UI Grid
slug: enable-tabbed-focus-column-headers-kendo-ui-grid
tags: kendo ui, grid, keyboard navigation, tabbed focus, wcag, accessibility
res_type: kb
ticketid: 1662786
---

## Environment

| Product | Kendo UI for jQuery Grid / |
| --- | --- |
| Version | 2024.1.319 |

## Description

I'm having trouble getting tabbed focus on column headers in the Kendo UI Grid. I need to enable keyboard access to the filtering and sorting features to be WCAG compliant. The focus is directed to data cells and skips the headers.

## Solution

To ensure that the Kendo UI [Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid) headers are accessible via keyboard navigation and comply with WCAG standards, follow these steps:

1. Enable the [`navigatable`](/api/javascript/ui/grid/configuration/navigatable) option in the Grid to activate keyboard navigation.
   
   ```javascript
   $("#grid").kendoGrid({
       navigatable: true,
       // other grid configurations
   });
   ```

2. Use the Grid's [`current`](/api/javascript/ui/grid/methods/current) method to set the initial focus on the first header cell when the Grid is focused.

   ```javascript
   var grid = $("#grid").data("kendoGrid");
   grid.table.on("focus", function(e) {            
       grid.current($("th:first"));
   });
   ```
Below is a runnable example:

```dojo
<input type="text" />
    <div id="grid"></div>
    <script>
      $(document).ready(function () {
        $("#grid").kendoGrid({
          selectable: true,
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
            },
            pageSize: 20
          },
          navigatable: true,
          scrollable: true,
          sortable: true,
          filterable: true,
          pageable: {
            input: true,
            numeric: false
          },
          columns: [{                    
            field: "ContactName",
            title: "Contact Name",
            width: 240
          }, {
            field: "ContactTitle",
            title: "Contact Title"
          }, {
            field: "CompanyName",
            title: "Company Name"
          }, {
            field: "Country",
            width: 150
          }]
        });         


        var grid = $("#grid").data("kendoGrid");
        grid.table.on("focus",function(e){            
          grid.current($("th:first"))
        });

      });
    </script>
```

## Notes

- It is important to ensure that the `navigatable` option is enabled for keyboard navigation to work as expected.

## See Also

- [Kendo UI Grid Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
- [Keyboard Navigation in Kendo UI Grid](https://docs.telerik.com/kendo-ui/controls/grid/accessibility/key-nav)
- [Kendo UI Grid Accessibility Guide](https://docs.telerik.com/kendo-ui/accessibility/accessibility)
