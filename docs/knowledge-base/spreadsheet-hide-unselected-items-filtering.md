---
title: Hide Unselected Items in Spreadsheet Filter Popup
description: An example on how to hide the unselected items in the filter popup of the Kendo UI Spreadsheet.
type: how-to
page_title: Hide Unselected Items in Filter | Kendo UI Spreadsheet
slug: spreadsheet-hide-unselected-items-filtering
tags: spreadsheet
ticketid: 1172549  
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Spreadsheet</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I hide the unselected items in the filter popup of the Spreadsheet?

## Solution

1. Add the `click` handler to the **Arrow** button.
1. Find the unchecked checkboxes and hide them.

```dojo
<div id="spreadsheet" style="width: 100%"></div>
<script>
    $(function() {
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [
            {
                name: "OrdersLog",
                mergedCells: [
                    "A1:G1",
                    "A2:F2"
                ],
                filter: {
                    ref: "A3:G49",
                    columns:[]
                },
                columns: [
                    { width: 80 },
                    { width: 100 },
                    { width: 100 },
                    { width: 150 },
                    { width: 150 },
                    { width: 130 },
                    { width: 130 }
                ],
                rows: [
                {
                    height: 50,
                    cells: [
                    {
                        value: "ORDERS LOG", background: "rgb(144,164,174)", textAlign: "center",
                        color: "white", fontSize: 18
                    }
                    ]
                },
                {
                    cells: [
                    {
                        value: "REPORT", background: "rgb(176,190,197)", color: "white", textAlign: "right"
                    },
                    {
                        format: "MMM-dd", formula: "TODAY()", background: "rgb(176,190,197)", color: "white", index: 6
                    }
                    ]
                },
                {
                    cells: [
                    {
                        value: "ID", bold: "true", background: "rgb(236,239,241)", color: "black", textAlign: "center"
                    },
                    {
                        value: "DATE", bold: "true", background: "rgb(236,239,241)", color: "black", textAlign: "center"
                    },
                    {
                        value: "TIME", bold: "true", background: "rgb(236,239,241)", color: "black", textAlign: "center"
                    },
                    {
                        value: "CLIENT", bold: "true", background: "rgb(236,239,241)", color: "black", textAlign: "center"
                    },
                    {
                        value: "COMPANY", bold: "true", background: "rgb(236,239,241)", color: "black", textAlign: "center"
                    },
                    {
                        value: "SHIPPING", bold: "true", background: "rgb(236,239,241)", color: "black", textAlign: "center"
                    },
                    {
                        value: "DISCOUNT", bold: "true", background: "rgb(236,239,241)", color: "black", textAlign: "center"
                    }
                    ]
                },
                {
                    cells: [
                    {
                        value: 10223, textAlign: "center"
                    },
                    {
                        value: new Date("6/30/2014"), textAlign: "center"
                    },
                    {
                        value: new Date("6/30/2014 9:30"), format: "hh:mm", textAlign: "center"
                    },
                    {
                        value: "Terry Lawson", textAlign: "left"
                    },
                    {
                        value: "Excella", textAlign: "left"
                    },
                    {
                        value: "1 day", textAlign: "center"
                    },
                    {
                        value: 0.02, format: "0%", textAlign: "center"
                    }
                    ]
                },
                {
                    cells: [
                    {
                        value: 10247, textAlign: "center"
                    },
                    {
                        value: new Date("7/1/2014"), textAlign: "center"
                    },
                    {
                        value: new Date("7/1/2014 15:15"), format: "hh:mm", textAlign: "center"
                    },
                    {
                        value: "Charles Miller", textAlign: "left"
                    },
                    {
                        value: "Complete Tech", textAlign: "left"
                    },
                    {
                        value: "2 days", textAlign: "center"
                    },
                    {
                        value: 0.08, format: "0%", textAlign: "center"
                    }
                    ]
                },
                {
                    cells: [
                    {
                        value: 10251, textAlign: "center"
                    },
                    {
                        value: new Date("7/1/2014"), textAlign: "center"
                    },
                    {
                        value: new Date("7/1/2014 14:13"), format: "hh:mm", textAlign: "center"
                    },
                    {
                        value: "Jennie Walker", textAlign: "left"
                    },
                    {
                        value: "Plan Smart", textAlign: "left"
                    },
                    {
                        value: "2 days", textAlign: "center"
                    },
                    {
                        value: 0.10, format: "0%", textAlign: "center"
                    }
                    ]
                },
                {
                    cells: [
                    {
                        value: 10226, textAlign: "center"
                    },
                    {
                        value: new Date("6/30/2014"), textAlign: "center"
                    },
                    {
                        value: new Date("6/30/2014 17:43"), format: "hh:mm", textAlign: "center"
                    },
                    {
                        value: "Samuel Green", textAlign: "left"
                    },
                    {
                        value: "Excella", textAlign: "left"
                    },
                    {
                        value: "regular", textAlign: "center"
                    },
                    {
                        value: 0.08, format: "0%", textAlign: "center"
                    }
                    ]
                },                    
                {
                    cells: [
                    {
                        value: 10268, textAlign: "center"
                    },
                    {
                        value: new Date("7/2/2014"), textAlign: "center"
                    },
                    {
                        value: new Date("7/2/2014 10:49"), format: "hh:mm", textAlign: "center"
                    },
                    {
                        value: "Agnes Hill", textAlign: "left"
                    },
                    {
                        value: "Integra Design", textAlign: "left"
                    },
                    {
                        value: "1 day", textAlign: "center"
                    },
                    {
                        value: 0, format: "0%", textAlign: "center"
                    }
                    ]
                }
                ]
            }]
        });

		$('.k-icon.k-i-arrow-60-down').click(function(){		
			setTimeout(function(){
				var checkboxes = $('.k-checkbox');

				for(var p=0; p < checkboxes.length; p++){
						var checked = checkboxes[p].checked;
					if(!checked){                      
							$(checkboxes[p]).closest('.k-item').not('.k-first').hide()
					}
				}                           
			}, 0)
		})

    });
</script>
```
