---
title: Filtering
page_title: jQuery DropDownTree Documentation | Filtering
description: "Get started with the jQuery DropDownTree by Kendo UI and filter the displayed items of the widget by their text value."
slug: filtering_kendoui_dropdowntree
position: 4
---

# Filtering

The built-in filtering functionality enables the user to filter the displayed DropDownTree items by their text value.

By default, filtering is disabled and can be performed over string values only, that is, either the widget data has to be an array of strings or configured in the `dataTextField` option over the field.

The DropDownTree supports the following filter values:

* `startswith`
* `endswith`
* `contains`

The following example demonstrates how to set the filter of the DropDownTree.

    <input id="dropdowntree"></input>

    <script>
        var serviceRoot = "https://demos.telerik.com/kendo-ui/service";
        var myDataSource = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                url: serviceRoot + "/Employees",
                dataType: "jsonp"
                }
            },
            schema: {
                model: {
                id: "EmployeeId",
                hasChildren: "HasEmployees"
                }
            }
        });

        $("#dropdowntree").kendoDropDownTree({
            filter: "startswith",
            dataSource: myDataSource,
            dataTextField: "FullName"
        });
    </script>

## See Also

* [Client-Side Filtering of the DropDownTree (Demo)](https://demos.telerik.com/kendo-ui/dropdowntree/client-filtering)
* [JavaScript API Reference of the DropDownTree](/api/javascript/ui/dropdowntree)
