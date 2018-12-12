---
title: Remove Group Footer and Header Templates When One Record Is in the Group
description: An example on how to remove the groupFooterTemplate and the groupHeaderTemplate when there is only one record in the group of the Kendo UI Grid.
type: how-to
page_title: Hide Group Details When Only One Record Is in the Group | Kendo UI Grid
slug: grid-group-remove-footer-header-one-record
tags: grid, group, groupFooterTemplate, groupHeaderTemplate
ticketid: 1143117
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I hide the grouping details when there is only one record in the group of the Kendo UI Grid?

## Solution

To hide the group header:

1. In the [`groupHeaderTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.groupheadertemplate), implement an `if/else` condition.
1. Based on it, display different templates.

    ```
    groupHeaderTemplate: "#if(count!=1){#Units In Stock: #= value # (Count: #= count#)#}else{#Units In Stock: #= value ##}#"
    ```

To hide the group footer:

1. In the [`groupFooterTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.groupfootertemplate) implement an `if/else` condition. Based on it, add a class to the cell.
1. In the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event handler, select the class and [`hide`](https://api.jquery.com/hide/) the [`closest`](https://api.jquery.com/closest/) `.k-group-footer` row.

    ```
    dataBound: function(e) {
        var grid = e.sender;
        var element = grid.element;

        element.find(".Count1Class").closest(".k-group-footer").hide();
    }
    //...
    groupFooterTemplate: "<div #if(count===1){#class='Count1Class'#}#>Count: #=count#</div>"
    ```

    ```dojo
    <div id="example">
        <div id="grid"></div>
        <script>
            $(document).ready(function() {
                $("#grid").kendoGrid({
                    dataSource: {
                        type: "odata",
                        transport: {
                            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                        },
                        schema: {
                            model: {
                                fields: {
                                    UnitsInStock: {
                                        type: "number"
                                    },
                                    ProductName: {
                                        type: "string"
                                    },
                                    UnitPrice: {
                                        type: "number"
                                    },
                                    UnitsOnOrder: {
                                        type: "number"
                                    },
                                    UnitsInStock: {
                                        type: "number"
                                    }
                                }
                            }
                        },
                        pageSize: 7,
                        group: {
                            field: "UnitsInStock",
                            aggregates: [{
                                    field: "ProductName",
                                    aggregate: "count"
                                },
                                {
                                    field: "UnitPrice",
                                    aggregate: "sum"
                                },
                                {
                                    field: "UnitsOnOrder",
                                    aggregate: "sum"
                                },
                                {
                                    field: "UnitsInStock",
                                    aggregate: "count"
                                }
                            ]
                        },

                        aggregate: [{
                                field: "ProductName",
                                aggregate: "count"
                            },
                            {
                                field: "UnitPrice",
                                aggregate: "sum"
                            },
                            {
                                field: "UnitsOnOrder",
                                aggregate: "sum"
                            },
                            {
                                field: "UnitsInStock",
                                aggregate: "min"
                            },
                            {
                                field: "UnitsInStock",
                                aggregate: "max"
                            }
                        ]
                    },
                    sortable: true,
                    scrollable: false,
                    pageable: true,
                    dataBound: function(e) {
                        var grid = e.sender;
                        var element = grid.element;

                        element.find(".Count1Class").closest(".k-group-footer").hide();
                    },
                    columns: [{
                            field: "ProductName",
                            title: "Product Name",
                            aggregates: ["count"],
                            footerTemplate: "Total Count: #=count#",
                            groupFooterTemplate: "<div #if(count===1){#class='Count1Class'#}#>Count: #=count#</div>"
                        },
                        {
                            field: "UnitPrice",
                            title: "Unit Price",
                            aggregates: ["sum"]
                        },
                        {
                            field: "UnitsOnOrder",
                            title: "Units On Order",
                            aggregates: ["sum"],
                            footerTemplate: "Total: #=sum#",
                            groupFooterTemplate: "Total: #=sum#"
                        },
                        {
                            field: "UnitsInStock",
                            title: "Units In Stock",
                            aggregates: ["min", "max", "count"],
                            footerTemplate: "<div>Min: #= min #</div><div>Max: #= max #</div>",
                            groupHeaderTemplate: "#if(count!=1){#Units In Stock: #= value # (Count: #= count#)#}else{#Units In Stock: #= value ##}#"
                        }
                    ]
                });
            });
        </script>
    </div>
    ```
