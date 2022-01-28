---
title: PivotGrid resize the width of the row header area
description: How to prevent the row header from expanding too much and taking up space in the Kendo UI PivotGrid
type: how-to
page_title: Compact width of the rowheaders | Kendo UI PivotGrid for jQuery
slug: pivotgrid-rowheader-limit-width
tags: pivot, pivotgrid, width, compact, column, row, header, rowheader, limit, resize, reduce
ticketid: 1474913, 1157675
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>PivotGrid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

I am trying to reduce the rowheader width on a pivotgrid because when I get multiple columns the first fixed columns occupies most of the grid space.

How can I change the first columns width?

## Solution

The easiest way to accomplish the desired behaviour would be to:

1. Add a max-width style to the row headers and provide a scroll:
  ```css
    .k-pivot-rowheaders {
      max-width:200px;
    }

    .k-grid.k-alt.k-widget{
      overflow-x: scroll;
    } 
  ```
1. For the height, we could use the [`dataBound`](/api/javascript/ui/pivotgrid/events/databound) event handler to assign it to row headers section so that it is equal to the grid content.

```
  function onDataBound(e){
     var rowHeaderSection = $(e.sender.rowsHeaderTree.root);
     rowHeaderSection.css({
          height:e.sender.content.height()
     });
  }
```

```dojo
    <style>
      .k-pivot-rowheaders {
        max-width:200px;
      }

      .k-grid.k-alt.k-widget{
        overflow-x: scroll;
      } 
    </style>
    <div id="example">
      <div id="pivotgrid"></div>

      <script>
        $(document).ready(function () {
          var pivotgrid = $("#pivotgrid").kendoPivotGrid({
            filterable: true,
            sortable: true,
            columnWidth: 200,
            height: 580,
            dataSource: {
              type: "xmla",
              columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" } ],
              rows: [{ name: "[Geography].[City]" }],
              measures: ["[Measures].[Reseller Freight Cost]"],
              transport: {
                connection: {
                  catalog: "Adventure Works DW 2008R2",
                  cube: "Adventure Works"
                },
                read: "https://demos.telerik.com/olap/msmdpump.dll"
              },
              schema: {
                type: "xmla"
              },
              error: function (e) {
                alert("error: " + kendo.stringify(e.errors[0]));
              }
            },
            dataBound: function(e){
              var rowHeaderSection = $(e.sender.rowsHeaderTree.root);
              rowHeaderSection.css({
                height:e.sender.content.height()
              })
            }
          }).data("kendoPivotGrid");
        });
      </script>
    </div>
``` 
