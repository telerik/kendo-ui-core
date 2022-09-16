---
title: Paging
page_title: jQuery TreeList Documentation | Paging
description: "Get started with the jQuery TreeList by Kendo UI and enable the client-side paging feature."
slug: paging_kendoui_treelist
position: 4
---

# Paging

The TreeList supports client-side paging for large sets of data.

To enable the paging functionality of the TreeList, configure the [`pageable`](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist/configuration/pageable) settings.

> Remember to set a [`pageSize`](/api/javascript/data/datasource/configuration/pagesize). You can define a `pageSize` in the `pageable` or in the [`dataSource`](/api/javascript/ui/treelist/configuration/datasource) settings. If an already existing dataSource instance is passed to the TreeList, then the `pageSize` option has to be set in the dataSource settings and not in the `pageable` settings.

    $(document).ready(function () {
        var service = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
            dataSource: {
                transport: {
                    read: {
                        url: service + "/EmployeeDirectory/All",
                        dataType: "jsonp"
                    }
                },
                schema: {
                    model: {
                        id: "EmployeeId",
                        parentId: "ReportsTo",
                        expanded: true,
                        fields: {
                            ReportsTo: { nullable: true },
                            EmployeeId: { type: "number" },
                            HireDate: { field: "HireDate", type: "date" }
                        }
                    }
                }
            },
            height: 540,
            filterable: true,
            sortable: true,
            columns: [
                {
                    field: "FirstName", title: "Name",
                    template: "#: FirstName # #: LastName #"
                },
                { field: "Position" },
                { field: "HireDate", title: "Hire Date", format: "{0:MMMM d, yyyy}" }
            ],
            pageable: {
                pageSize: 15,
                pageSizes: true
            }
        });
    });

## See Also

* [Client-Side Paging in the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/client-side-paging)
* [TreeList JavaScript API Reference](/api/javascript/ui/treelist)
