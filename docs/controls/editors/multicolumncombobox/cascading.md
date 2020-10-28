---
title: Cascading MultiColumnComboBoxes
page_title: jQuery MultiColumnComboBox Documentation | Cascading MultiColumnComboBoxes
description: "Get started with the jQuery MultiColumnComboBox by Kendo UI and implement cascading MultiColumnComboBoxes."
slug: cascading_kendoui_multicolumncombobox_widget
position: 8
---

# Cascading MultiColumnComboBoxes

The [cascading MultiColumnComboBox](https://demos.telerik.com/kendo-ui/multicolumncombobox/cascadingmulticolumncombobox) is a series of two or more MultiColumnComboBoxes in which each MultiColumnComboBox is filtered according to the selected options that are based on the `dataValueField` in the previous MultiColumnComboBox.

The child MultiColumnComboBox cascades from the parent one if the [`cascadeFrom`](/api/javascript/ui/multicolumncombobox/configuration/cascadefrom) option is defined. The `cascadeFrom` option has to refer to the parent ID.

> The cascading functionality works only when you define the `cascadeFrom` property and initialize the parent MultiColumnComboBox.

The child MultiColumnComboBox takes the following actions during initialization:
- Checks if the `cascadeFrom` property is set. If not, cascading is disabled.
- Tries to find the parent MultiColumnComboBox object. If the result is null, then the functionality is omitted.
- Listens to any changes of the parent value.
- If the parent does not have a value, the child is disabled. If the parent has a value, the child is enabled and filters its data accordingly. The filter options are similar to the ones demonstrated in the following example.

        field: "parentID",  //the dataValueField of the parent
        operator: "eq",
        value: "" //parent's value

The following example demonstrates the parameters of this request.

        filter[logic]: and
        filter[filters][0][field]: parentID
        filter[filters][0][operator]: eq
        filter[filters][0][value]:

> The filter operator is always `"eq"`. To filter the data, the child MultiColumnComboBox uses the `dataValueField` option of the parent MultiColumnComboBox.

To initialize a cascading MultiColumnComboBox, use the following example.

    <label for="categories">Categories</label>
    <input id="categories"/>

    <label for="products">Products</label>
    <input id="products" disabled="disabled"/>

    <script>
      $(document).ready(function() {
        var categories = $("#categories").kendoMultiColumnComboBox({
            filter: "contains",
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            dataSource: {
                type: "odata",
                serverFiltering: true,
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
                }
            }
        }).data("kendoMultiColumnComboBox");

        var products = $("#products").kendoMultiColumnComboBox({
            autoBind: false,
            cascadeFrom: "categories",
            filter: "contains",
            placeholder: "Select product...",
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            columns: [
                { field: "ProductID", title: "ID", width: 120 },
                { field: "ProductName", title: "Name", width: 120 },
                { field: "UnitsInStock ", title: "UnitsInStock", width: 120 }
            ],
            dataSource: {
                type: "odata",
                serverFiltering: true,
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                }
            }
        }).data("kendoMultiColumnComboBox");
      })
    </script>

## See Also

* [Rendering Cascading MultiColumnComboBoxes (Demo)](https://demos.telerik.com/kendo-ui/multicolumncombobox/cascadingmulticolumncombobox)
* [JavaScript API Reference of the MultiColumnComboBox](/api/javascript/ui/multicolumncombobox)
