---
title: Change Header and Pager Appearance
description: How to Change Header and Footer BackGround Color
type: how-to
page_title: How to Change Header and Footer BackGround Color - Kendo UI for jQuery Data Grid
slug: grid-change-header-and-pager-appearance
position: 
tags: 
ticketid: 
res_type: kb
components: ["grid"]
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Grid for jQuery</td>
		</tr>
	</tbody>
</table>


## Description

To apply large-scale visual changes to the Grid, use the [ThemeBuilder](https://themebuilder.telerik.com/kendo-ui) to generate a custom theme. For targeted changes to the header, footer, or pager background colors, apply custom CSS rules directly.

## Solution

Target the `.k-grid-header`, `.k-header`, and `.k-pager` CSS classes to override the default background and text colors. The following example demonstrates how to apply a custom color scheme to the Grid header and pager.

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
      .k-pager{
        background-color: gray;
        color: white;
      }
      .k-pager .k-link.k-selected
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
