---
title: Hierarchy
page_title: jQuery Grid Documentation - Hierarchy
description: "Get started with the jQuery Grid by Kendo UI and display its parent and child records by applying hierarchy to its structure."
slug: hierarchy_kendoui_grid_widget
position: 12
---

# Hierarchy

The Grid provides options for visualizing the relations between parent and child records by displaying its table data in a hierarchical manner. This approach is useful when you're dealing with a one-to-many relationship between the data.

For a runnable example, refer to the [demo on using hierarchy in the Grid](https://demos.telerik.com/kendo-ui/grid/hierarchy).

## Configuration

To implement hierarchy in the Grid, wire its [`detailInit`](/api/javascript/ui/grid/events/detailinit) event and filter the records in the child table based on the parent key field value.

1. Initialize the parent grid and configure its settings.

    ```html
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
                },
                schema: {
                    model: {
                        id: "EmployeeID" // The model.id field is the "primary key" of the dataSource.
                    }
                },
                pageSize: 6,
                serverPaging: true,
                serverSorting: true
            }
            // other configurations such as columns, height, sortable, pageable, etc.
        });
    </script>
    ```

2. Attach a handler to the `detailInit` event of the parent grid.

    ```html
    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            detailInit: detailInit,
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                },
                pageSize: 6,
                serverPaging: true,
                serverSorting: true
            },
            // other configurations such as columns, height, sortable, pageable, etc.
        });
    </script>
    ```

3. Define the `detailInit` function and configure the child grid.

    ```javascript
    function detailInit(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                },
                serverFiltering: true,
                serverPaging: true,
                serverSorting: true,
                pageSize: 10
            },
            // other configurations such as columns, height, sortable, pageable, etc.
        });
    }
    ```

4. Use the primary key of the parent grid to filter the records of the child grid. In this case, the primary key is `EmployeeID`.

    ```javascript
    function detailInit(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                },
                // Retrieve all records where the EmployeeID is equal to the primary key of the parent.
                filter: {field: "EmployeeID", operator: "eq", value: e.data.EmployeeID},
                serverFiltering: true,
                serverPaging: true,
                serverSorting: true,
                pageSize: 10
            },
            // other configurations such as columns, height, sortable, pageable, etc.
        });
    }
    ```

The following code snippet showcases the full implementation of the Hierarchical Grid:

```dojo
    <div id="grid"></div>

    <script>
        $(document).ready(function() {
            var element = $("#grid").kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
                    },
                    pageSize: 6,
                    serverPaging: true,
                    serverSorting: true,
                    schema: {
                        model: {
                            id: "EmployeeID"
                        }
                    }
                },
                height: 600,
                sortable: true,
                pageable: true,
                detailInit: detailInit,
                dataBound: function() {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                columns: [
                    {
                        field: "FirstName",
                        title: "First Name",
                        width: "110px"
                    },
                    {
                        field: "LastName",
                        title: "Last Name",
                        width: "110px"
                    },
                    {
                        field: "Country",
                        width: "110px"
                    },
                    {
                        field: "City",
                        width: "110px"
                    },
                    {
                        field: "Title"
                    }
                ]
            });
        });

        function detailInit(e) {
            $("<div/>").appendTo(e.detailCell).kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    },
                    serverPaging: true,
                    serverSorting: true,
                    serverFiltering: true,
                    pageSize: 10,
                    filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
                },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [
                    { field: "OrderID", width: "110px" },
                    { field: "ShipCountry", title:"Ship Country", width: "110px" },
                    { field: "ShipAddress", title:"Ship Address" },
                    { field: "ShipName", title: "Ship Name", width: "300px" }
                ]
            });
        }
    </script>
```

## See Also

* [Hierarchy by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/hierarchy)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Knowledge Base Section](/knowledge-base)
