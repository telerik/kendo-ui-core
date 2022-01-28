---
title: Checkboxes
page_title: jQuery DropDownTree Documentation | Checkboxes
description: "Get started with the jQuery DropDownTree by Kendo UI and manage the checked state of all nodes in the widget."
slug: checkboxes_kendoui_dropdowntree
position: 3
---

# Checkboxes

Once the `checkboxes` option is set to `true`, the DropDownTree provides the multiple selection functionality by rending each checked item as a `tag` in its input.

You can remove the tags (items) through their **X** button which will automatically uncheck them in the drop-down. Along with the standard checkbox support, the DropDownTree allows you to manage the checked state of all nodes. To enable this functionality, set the `CheckAll` option to `true`.

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
            checkboxes: true,
            checkAll: true,
            dataSource: myDataSource,
            dataTextField: "FullName"
        });
    </script>

## See Also

* [Checkboxes in the DropDownTree (Demo)](https://demos.telerik.com/kendo-ui/dropdowntree/checkboxes)
* [JavaScript API Reference of the DropDownTree](/api/javascript/ui/dropdowntree)
