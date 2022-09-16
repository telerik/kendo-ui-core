---
title: Cancel Insert Action in Grid
description: Cancel Add New Record Action in Grid
type: how-to
page_title: How to Cancel Add New Record Action in Grid | Kendo UI Grid for jQuery
slug: grid-cancel-insert-action
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

This sample demonstrates how you can prevent the Add New Record action of the grid:

## Solution

Specific code:

```JavaScript
$(".k-grid-add").first().on("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
});
```

Full sample:

```dojo
  
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
            var link = headerCell.find("a.k-link");
            var icon = link.find('span.k-i-arrows-swap');
            if(document.activeElement==link[0])
            {
              icon.remove();
            }

            setTimeout(function(){
              if(!headerCell.hasClass('k-sorted') && !icon.length)
              {
                link.append('<span class="k-icon k-i-arrows-swap"></span>');
              }
            });
          });
        }
      </script>
    </div>

``` 
