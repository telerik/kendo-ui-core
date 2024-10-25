---
title: Remove the Total Column Summaries in the PivotGridV2
page_title: Hide the Summaries of the Total Column - jQuery PivotGridV2
description: "Learn how to hide all column summaries in the Kendo UI for jQuery PivotGridV2 component."
type: how-to
slug: pivotgridv2-hide-column-summaries
tags: pivot, pivotgrid, hide, summary, column, databound, remove, footer, last column, last row
ticketid: 1598659
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>    
			<td>Progress® Kendo UI® PivotGrid for jQuery</td>
		</tr>
	</tbody>
</table>


## Description

How can I hide the **Total** column summaries in the jQuery PivotGridV2?

## Solution

To achieve the desired scenario, use the [`dataBound`](/api/javascript/ui/pivotgridv2/events/databound) event handler to target and hide the required elements.

```dojo
<div id="pivotgrid"></div>
    <script>
      $(document).ready(function () {
        var pivotgrid = $("#pivotgrid").kendoPivotGridV2({
          height: 550,
          dataSource: {
            type: "xmla",
            columns: [{ name: ['[Date].[Calendar]'], expand: true }],
            rows: [{ name: ['[Geography].[City]'], expand: true },
                   { name: ['[Product].[Category]'] }],
            measures: [{ name: ['[Measures].[Reseller Freight Cost]'] }],
            transport: {
              connection: {
                catalog: "Adventure Works DW 2008R2",
                cube: "Adventure Works"
              },
              read: 'https://demos.telerik.com/olap/msmdpump.dll'
            }
          },
          dataBound: function(e) {
            this.element.find(".k-pivotgrid-values .k-pivotgrid-tbody tr:last-child").hide();
            this.element.find(".k-pivotgrid-row-headers .k-pivotgrid-tbody tr:last-child").hide();
          }
        }).data("kendoPivotGridV2");
      });
    </script>
```

## See Also

* [JavaScript API Reference of the jQuery PivotGridV2](/api/javascript/ui/pivotgridv2)
* [Kendo UI for jQuery PivotGridV2 Overview (Demo)](https://demos.telerik.com/kendo-ui/pivotgridv2/index)
* [Product Page of the jQuery PivotGridV2](https://www.telerik.com/kendo-jquery-ui/pivotgrid-v2)
