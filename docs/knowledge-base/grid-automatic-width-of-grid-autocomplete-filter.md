---
title: Set the Width of the Row Filter Suggestions in Grids
description: An example on how to set the width of the row filter suggestions in the Kendo UI Grid.
type: how-to
page_title: Set Automatic Width to the AutoComplete Filter | Kendo UI Grid
slug: grid-automatic-width-of-grid-autocomplete-filter
tags: grid, filter, width, suggestions
ticketid: 1144763
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Grid</td>
	</tr>
</table>


## Description

How can I set the width of the filter drop-down in the Grid header when the drop-down contains long texts:
* Without wrapping the content?
* Without increasing the column width?
* Setting the length to approximately match the length of the longest text?

## Solution

Programmatically set the [`autoWidth`](https://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete/configuration/autowidth) property of the AutoComplete when the Grid is [initialized](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound).

```dojo
 <div id="example">
            <div id="grid"></div>
            <script>
                $(document).ready(function() {
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
                        },
                      	dataBound:function(e){
                          $(e.sender.element).find('[data-role="autocomplete"]').each(function(){
                            $(this).data("kendoAutoComplete").setOptions({autoWidth:true})
                          })
                        },
                        height: 550,
                        filterable: {
                            mode: "row"
                        },
                        pageable: true,
                        columns:
                        [{
                            field: "OrderID",
                            width: 225,
                            filterable: {
                                cell: {
                                    showOperators: false
                                }
                            }
                        },
                        {
                            field: "ShipName",
                            width: 200,
                            title: "Ship Name",
                            filterable: {
                                cell: {
                                    operator: "contains",
                                    suggestionOperator: "contains"
                                }
                            }
                        },{
                            field: "Freight",
                            width: 255,
                            filterable: {
                                cell: {
                                    operator: "gte"
                                }
                            }
                        },{
                            field: "OrderDate",
                            title: "Order Date",
                            format: "{0:MM/dd/yyyy}"
                        }]
                    });
                });
            </script>
        </div>
```
