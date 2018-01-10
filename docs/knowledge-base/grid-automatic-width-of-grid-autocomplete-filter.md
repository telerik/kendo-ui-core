---
title: Set the Width of the Grid Row Filter Suggestions
description: An example of how to set the width of the Grid row filter suggestions
type: how-to
page_title: Automatic Width of the Grid AutoComplete Filter
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
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>


## Description

How do I set the width of the filter drop down in the grid header when there are long texts in the drop down?  Basically I do not want wrapping, but at the same time I do not want to increase the column width.

The length needs to approximately match the length of the longest text.

## Solution
  
The desired result can be achieved by programmatically setting the [autoWidth](https://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete#configuration-autoWidth) property of the AutoComplete when the Grid is [initialized](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-dataBound):  
  
Please check the example demonstrating this:

````html
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
````

