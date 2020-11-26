---
title: Change Header and Pager Appearance
description: How to Change Header and Footer BackGround Color
type: how-to
page_title: How to Change Header and Footer BackGround Color | Kendo UI Grid for jQuery
slug: grid-change-header-and-pager-appearance
position: 
tags: 
ticketid: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

1. If the changes will be multiple, you can go on creating your own theme:

https://themebuilder.telerik.com/kendo-ui

2. For lesser requirements, you can check this sample which demonstrates how to change the background color and overall appearance of the Grid header/footer and the pager.

## Solution

```dojo
  
      <style>
      .k-grid{
        border:none;
      }
      .k-grid-pager{
        border: 1px solid #d5d5d5;
      }
      .k-grid .k-grid-header .k-header{
        border-bottom: none;
        background-color: gray;
      }
      .k-grid .k-grid-header .k-header a{
        color: white;
      }
      .k-pager-wrap{
        background-color: gray;
        color: white;
      }
      .k-pager-wrap .k-link.k-state-selected
      {
        background-color: lime;
      }
    </style>
    
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
            dataSource: {
              data: products,
              schema: {
                model: {
                  fields: {
                    ProductName: { type: "string" },
                    UnitPrice: { type: "number" },
                    UnitsInStock: { type: "number" },
                    Discontinued: { type: "boolean" }
                  }
                }
              },
              pageSize: 3
            },
            sortable: true,
            scrollable: false,
            filterable: true,
            pageable: {
              input: true,
              numeric: true
            },
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
              { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
              { field: "Discontinued", width: "130px" }
            ]
          });
        });
      </script>
    </div>

``` 
