---
title: Load on Demand
page_title: jQuery DropDownTree Documentation - Load on Demand
description: "Get started with the jQuery DropDownTree by Kendo UI and learn how to enable load on demand for improved performance with large hierarchical datasets."
components: ["dropdowntree"]
slug: loadondemand_dropdowntree_widget
position: 3
---

# Load on Demand

The Kendo UI for jQuery DropDownTree supports loading child nodes on demand by setting the [`loadOnDemand`](/api/javascript/ui/dropdowntree/configuration/loadondemand) property to `true`.

This feature demonstrates how the DropDownTree can efficiently handle large hierarchical datasets by fetching child data lazily when parent groups get expanded. This approach improves initial load performance by only loading the data that is actually needed.

When load on demand is enabled, the component will automatically request child data from the server when a parent node is expanded for the first time. This is particularly useful for scenarios with deep hierarchical structures or when dealing with large amounts of data.

## Basic Configuration

To enable load on demand, set the [`loadOnDemand`](/api/javascript/ui/dropdowntree/configuration/loadondemand) property to `true` in the DropDownTree configuration. The following example demonstrates a basic setup with remote data binding and load on demand functionality.

```dojo
    <input id="dropdowntree" />
    
    <script>
        $("#dropdowntree").kendoDropDownTree({
            loadOnDemand: true,
            dataSource: {
                transport: {
                    read: {
                        url: "https://demos.telerik.com/service/v2/core/Employees",
                        dataType: "json"
                    }
                },
                schema: {
                    model: {
                        id: "EmployeeId",
                        parentId: "ReportsTo",
                        fields: {
                            EmployeeId: { type: "number", nullable: false },
                            ReportsTo: { field: "ReportsTo", nullable: true },
                            FullName: { field: "FullName" }
                        },
                        hasChildren: "HasChildren"
                    }
                }
            },
            dataTextField: "FullName"
        });
    </script>
```

## Value Mapper Configuration

When using load on demand with pre-selected values, you may need to implement a [`valueMapper`](/api/javascript/ui/dropdowntree/configuration/loadondemand.valuemapper) function to resolve the selected values to their corresponding data items. The [`valueMapper`](/api/javascript/ui/dropdowntree/configuration/loadondemand.valuemapper) is particularly useful when you have initial values that need to be displayed but the corresponding data items are not yet loaded due to the lazy loading nature of load on demand.

The following example demonstrates how to configure a [`valueMapper`](/api/javascript/ui/dropdowntree/configuration/loadondemand.valuemapper) function that fetches the data items for the selected values from the server.

```dojo
  <input id="dropdowntree" />   
    <script>
        var serviceRoot = "https://demos.telerik.com/service/v2/core";

        $("#dropdowntree").kendoDropDownTree({
            loadOnDemand: {
                valueMapper: function (options) {
                    $.ajax({
                        url: `${serviceRoot}/Employees/ValueMapper`,
                        type: "GET",
                        data: convertValues(options.value),
                        success: function (data) {
                            options.success(data);
                        }
                    });
                }
            },
            dataSource: {
                transport: {
                    read: {
                        url: `${serviceRoot}/Employees`,
                        dataType: "json"
                    }
                },
                schema: {
                    model: {
                        id: "EmployeeId",
                        parentId: "ReportsTo",
                        fields: {
                            EmployeeId: { type: "number", nullable: false },
                            ReportsTo: { field: "ReportsTo", nullable: true },
                            FullName: { field: "FullName" }
                        },
                        hasChildren: "HasChildren"
                    }
                }
            },
            dataTextField: "FullName",
            dataValueField: "EmployeeId",
            value: [4, 2] // Pre-selected values that will be resolved via valueMapper
        });

        function convertValues(value) {
            var data = {};
            value = $.isArray(value) ? value : [value];
            
            for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
            }
            
            return data;
        }
    </script>
```

The [`valueMapper`](/api/javascript/ui/dropdowntree/configuration/loadondemand.valuemapper) function receives an `options` object with the following properties:

* `value`: An array of the selected values that need to be resolved to data items.
* `success`: A callback function that should be called with the resolved data items.

The server endpoint should return the data items that correspond to the provided values, allowing the DropDownTree to display the correct text for the selected values even before the full hierarchical data is loaded.

## Performance Benefits

Load on demand provides several performance advantages:

* **Faster Initial Load**: Only root-level nodes are loaded initially, reducing the time required for the component to render.
* **Reduced Memory Usage**: Child nodes are loaded only when needed, minimizing memory consumption.
* **Improved User Experience**: Users can start interacting with the component immediately while additional data loads in the background.
* **Server Efficiency**: Reduces the initial server response size and distributes data loading across multiple requests.

## See Also

* [Load on Demand DropDownTree (Demo)](https://demos.telerik.com/kendo-ui/dropdowntree/load-on-demand)
* [Remote Data Binding by the DropDownTree (Demo)](https://demos.telerik.com/kendo-ui/dropdowntree/remote-data-binding)
* [JavaScript API Reference of the DropDownTree](/api/javascript/ui/dropdowntree)
