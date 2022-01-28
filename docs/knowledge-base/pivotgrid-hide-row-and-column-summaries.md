---
title: PivotGrid hide row and column summaries
description: How to hide the All row and columns in the Kendo UI PivotGrid
type: how-to
page_title: Remove row and column summaries | Kendo UI PivotGrid for jQuery
slug: pivotgrid-hide-row-and-column-summaries
tags: pivot, pivotgrid, hide, summary, column, row, databound, remove, footer, last column, last row
ticketid: 1413666
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>PivotGrid for Progress® Kendo UI®</td>
		</tr>
        <tr>
			<td>Created with version</td>
			<td>2019.2.619</td>
		</tr>
	</tbody>
</table>


## Description

The Kendo UI PivotGrid does not allow us to hide 'All' row/column. Can I hide the summary and grand summary rows and columns? I love the pivot capabilities, but in my case the summaries show averages of the averages which is not necessary. What if I want to deactivate the total sum arrow?

## Solution

We have a [feature request](https://feedback.telerik.com/kendo-jquery-ui/1359577-kendo-pivotgrid-make-all-row-column-hideable) for this functionality to be available via the configuration options. Upvote it so it can gather greater popularity and get included in the built-in options sooner. 

Meanwhile, the easiest way to accomplish the desired behaviour would be to:
1. Use CSS to hide the expand icons of the rows

    ```css
        .k-grid-footer span.k-icon{
            display:none;
        }
    ```

1. Or use the `dataBound` event to target elements that you wish to hide

    ```javascript
        dataBound: function(e) {
            this.columnsHeader.find("table colgroup col:last-child").css({width:0});
            this.content.find("table colgroup col:last-child").css({width:0});
            this.element.find(".k-grid-footer").hide();
        }
    ```

```dojo
    <div id="example">
      <div id="pivotgrid"></div>

      <div class="responsive-message"></div>

      <script>
        $(document).ready(function () {
          var pivotgrid = $("#pivotgrid").kendoPivotGrid({
            filterable: true,
            columnWidth: 120,
            height: 570,
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
              },
              schema: {
                cube: {
                  dimensions: {
                    ContactName: { caption: "All Contacts" },
                    CompanyName: { caption: "All Companies" },
                    Country: { caption: "All Countries" },
                    ContactTitle: { caption: "All Titles" }
                  },
                  measures: {
                    "Contacts Count": { field: "CustomerID", aggregate: "count" }
                  }
                }
              },
              columns: [{ name: "Country", expand: true }, { name: "CompanyName" } ],
              rows: [{ name: "ContactTitle", expand: true }],
              measures: ["Contacts Count"]
            },
            dataBound: function(e) {
              this.columnsHeader.find("table colgroup col:last-child").css({width:0});
              this.content.find("table colgroup col:last-child").css({width:0});
              this.element.find(".k-grid-footer").hide();
            }
          }).data("kendoPivotGrid");

        });
      </script>
    </div>
``` 
