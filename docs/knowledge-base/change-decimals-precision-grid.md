---
title: Change the Default Decimals Precision of a Numeric Column Filters in the Grid
page_title: Change the Decimals Precision of the Numeric Filter - Kendo UI for jQuery Data Grid
description: Learn how to change the culture default decimals precision in the filter NumericTextBox in the Kendo UI Grid.
type: how-to
slug: change-decimals-precision-grid
tags: grid, filtering, numbers, decimals
ticketid: 1131251, 1125621
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the 2017.3.913 version</td>
 </tr>
</table>

## Description

How can I change the default two decimals places in the numeric filters in a grid column?

## Solution

To change the decimals precision:

1. Subscribe for the [`filterMenuInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/filtermenuinit) event of the Grid.
1. In the `filterMenuInit` event handler, use [`setOptions`](https://docs.telerik.com/kendo-ui/api/javascript/ui/widget/methods/setoptions) method to set new values for the [`decimals`](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/configuration/decimals) and [`format`](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/configuration/format) configurations.

```dojo
<div id="grid"></div>

<script>
    $("#grid").kendoGrid({
        columns: [{
                field: "name"
            },
            {
                field: "age"
            }
        ],
        filterable: true,
        filterMenuInit: function(e) {
            if (e.field == "age") {
                var ntbs = e.container.find("[data-role='numerictextbox']");
                ntbs.each(function(e) {
                    var ntb = $(this).data("kendoNumericTextBox");

                    ntb.setOptions({
                        format: "n3",
                        decimals: 3
                    })
                })
            }
        },
        dataSource: {
            data: [{
                    name: "Jane Doe",
                    age: 30.333
                },
                {
                    name: "John Doe",
                    age: 33.12
                }
            ],
            schema: {
                model: {
                    fields: {
                        age: {
                            type: "number"
                        }
                    }
                }
            }
        }
    });
</script>
```
