---
title: Increasing the Width of the Search Text Box in Kendo UI Grid
description: Learn how to customize the width of the search text box in the Kendo UI Grid component using CSS.
type: how-to
page_title: How to Customize the Width of the Search Box in Kendo UI Grid
slug: increase-width-search-text-box-kendo-ui-grid
tags: kendo ui, grid, css, search box, width
res_type: kb
ticketid: 1659726
---

## Environment

| Product | Kendo UI for jQuery Grid |
| --- | --- |
| Version | 2023.3.1114 |

## Description

I want to increase the size (width) of the search text box in the Kendo UI Grid. How can I achieve this using CSS?

This KB article also answers the following questions:
- How can I adjust the width of the search box in the Grid?
- What CSS do I need to use to customize the search text box size in the Grid?
- Is it possible to change the search box dimensions in the Kendo UI Grid?

## Solution

To increase the width of the search text box in the Kendo UI Grid, apply the following CSS rule:

```css
<style>
  .k-toolbar-item .k-searchbox {
    width: 200px; /* Adjust the width as needed */
  }
</style>
```

This CSS targets the search box within the Grid's toolbar and sets its width to 200 pixels. You can adjust the width value as per your requirements.

```dojo
 <div id="example">
      <div id="grid"></div>
      <script>
        $(document).ready(function () {
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
                    Freight: { type: "number" },
                    ShipName: { type: "string" },
                    OrderDate: { type: "date" },
                    ShipCity: { type: "string" }
                  }
                }
              },
              pageSize: 20,
              serverPaging: true,
              serverFiltering: true,
              serverSorting: true
            },
            height: 550,
            sortable: {
              mode: "mixed",
              allowUnsort: true,
              showIndexes: true
            },
            toolbar: ["search"],
            search: {
              fields: [
                { name: "OrderID", operator: "eq" },
                { name: "Freight", operator: "gte" },
                { name: "ShipName", operator: "contains" },
                { name: "ShipCity", operator: "contains" },
              ]
            },
            columns: [
              {
                field: "OrderID",
                title: "Order ID",
              },
              "Freight",
              {
                field: "OrderDate",
                title: "Order Date",
                format: "{0:MM/dd/yyyy}"
              }, {
                field: "ShipName",
                title: "Ship Name"
              }, {
                field: "ShipCity",
                title: "Ship City"
              }
            ]
          });
        });
      </script>

      <style>
        .k-toolbar-item .k-searchbox {
          width: 200px;
        }
      </style>
    </div>
```

## See Also

- [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
- [Grid Search Panel (Demo)](https://demos.telerik.com/kendo-ui/grid/search-panel)
- [Grid Documentation Overview](/controls/grid/overview)

