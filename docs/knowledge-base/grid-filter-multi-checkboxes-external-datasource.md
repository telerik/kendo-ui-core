---
title: Filter Multi Checkboxes Based on Previous Filters in Grid
description: An example on how to display the valid possibilities in the multi-checkboxes filter list based on the previous filters in the Kendo UI Grid.
type: how-to
page_title: Make Multi Checkboxes Filter Display Valid Possibilities Only | Kendo UI Grid for jQuery
slug: grid-filter-multi-checkboxes-external-datasource
tags: grid, filter, multi, checkboxes, datasource
ticketid: 1138899
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

How can I display only the valid possibilities in the multi-checkbox filter based on the previously applied filters in the Kendo UI Grid?

## Solution

Use an external Kendo UI dataSource and assign it both to the [Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/datasource) and the [filters](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.filterable.datasource).

```dojo
<div id="example">
    <div id="client"></div>
    <script>
        $(document).ready(function() {
            var telerikWebServiceBase = "https://demos.telerik.com/kendo-ui/service/";
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: telerikWebServiceBase + "/Products",
                        dataType: "jsonp"
                    },
                    update: {
                        url: telerikWebServiceBase + "/Products/Update",
                        dataType: "jsonp"
                    },
                    destroy: {
                        url: telerikWebServiceBase + "/Products/Destroy",
                        dataType: "jsonp"
                    },
                    create: {
                        url: telerikWebServiceBase + "/Products/Create",
                        dataType: "jsonp"
                    },
                    parameterMap: function(options, operation) {
                        if (operation !== "read" && options.models) {
                            return {
                                models: kendo.stringify(options.models)
                            };
                        }
                    }
                },
                batch: true,
                pageSize: 20,
                schema: {
                    model: {
                        id: "ProductID",
                        fields: {
                            ProductID: {
                                editable: false,
                                nullable: true
                            },
                            ProductName: {
                                validation: {
                                    required: true
                                }
                            },
                            UnitPrice: {
                                type: "number",
                                validation: {
                                    required: true,
                                    min: 1
                                }
                            },
                            Discontinued: {
                                type: "boolean"
                            },
                            UnitsInStock: {
                                type: "number",
                                validation: {
                                    min: 0,
                                    required: true
                                }
                            }
                        }
                    }
                }
            });


            $("#client").kendoGrid({
                dataSource: dataSource,
                filterable: true,
                pageable: true,
                height: 550,
                toolbar: ["create", "save", "cancel"],
                columns: [{
                        field: "ProductName",
                        filterable: {
                            multi: true,
                            search: true,
                            dataSource: dataSource
                        }
                    },
                    {
                        field: "UnitPrice",
                        title: "Unit Price",
                        format: "{0:c}",
                        width: 120,
                        filterable: {
                            multi: true,
                            dataSource: dataSource
                        }
                    },
                    {
                        field: "UnitsInStock",
                        title: "Units In Stock",
                        width: 120,
                        filterable: {
                            multi: true,
                            dataSource: dataSource
                        }
                    },
                    {
                        field: "Discontinued",
                        width: 120,
                        filterable: {
                            multi: true,
                            dataSource: [{
                                Discontinued: true
                            }, {
                                Discontinued: false
                            }]
                        }
                    },
                    {
                        command: "destroy",
                        title: "&nbsp;",
                        width: 150
                    }
                ],
                editable: true
            });
        });
    </script>
</div>
```
