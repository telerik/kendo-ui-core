---
title: Default Unsorted Icon in Column Headers
description: How to Add Default Unsorted Icon in Column Headers
type: how-to
page_title: How to Add Default Unsorted Icon in Column Headers - Kendo UI for jQuery Data Grid
slug: grid-unsorted-icon-in-column-headers
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

This sample demonstrates how you can implement a visual clue for sortable columns by adding a new icon in the grid's unsorted state.

For a full list of available built-in icons you can check here:

https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web 

## Solution

```dojo

    <link rel="stylesheet" href="https://unpkg.com/@progress/kendo-font-icons/dist/index.css"/>
    <style>
      .k-i-arrows-swap{
        margin-left: 8px;
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
              pageSize: 20
            },
            height: 550,
            scrollable: true,
            sortable: true,
            dataBound: gridDataBound,
            filterable: true,
            pageable: {
              input: true,
              numeric: false
            },
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}"},
              { field: "UnitsInStock", title: "Units In Stock" },
              { field: "Discontinued" }
            ]
          });
        });

        function gridDataBound(e){
          var headerCells = e.sender.element.find('th[data-role="columnsorter"]');
          headerCells.each(function(i,e){
            var headerCell = $(this);
            var link = headerCell.find("span.k-link");
            setTimeout(function(){
              var icon = link.find('span.k-i-arrows-swap');
              var activeElement = $(".k-sorted").children().find(".k-link");
              if(activeElement[0]==link[0])
              {
                icon.remove();
              }

              if(!headerCell.hasClass('k-sorted') && !icon.length)
              {
                link.append('<span class="k-icon k-font-icon k-i-arrows-swap"></span>');
              } 
            })

          });
        }
      </script>
    </div>

``` 
