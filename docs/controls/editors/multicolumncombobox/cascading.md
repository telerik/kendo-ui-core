---
title: Cascading MultiColumnComboBoxes
page_title: Cascading MultiColumnComboBoxes | Kendo UI MultiColumnComboBox
description: "Learn how Kendo UI cascading MultiColumnComboBox works and helps you handle the most common scenarios with illustrative examples and FAQ."
slug: cascading_kendoui_multicolumncombobox_widget
position: 5
---

# Cascading MultiColumnComboBoxes

The [cascading MultiColumnComboBox](https://demos.telerik.com/kendo-ui/multicolumncombobox/cascadingmulticolumncombobox) is a series of two or more MultiColumnComboBoxes in which each MultiColumnComboBox is filtered according to the selected options that are based on the `dataValueField` in the previous MultiColumnComboBox.

## Initialize the MultiColumnComboBoxes

To initialize a cascading MultiColumnComboBox, use the following example.

###### Example

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


The child MultiColumnComboBox cascades from the parent one if the [`cascadeFrom`](/api/javascript/ui/multicolumncombobox/configuration/cascadefrom) option is defined. The `cascadeFrom` option has to refer to the parent ID.

> **Important**
>
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

> **Important**
>
> The filter operator is always `"eq"`. To filter the data, the child MultiColumnComboBox uses the `dataValueField` option of the parent MultiColumnComboBox.

## See Also

* [Overview]({% slug overview_kendoui_multicolumncombobox_widget %})
* [Grouping]({% slug grouping_kendoui_multicolumncombobox_widget %})
* [Cascading MultiColumnComboBoxes]({% slug virtualization_kendoui_multicolumncombobox_widget %})
* [MultiColumnComboBox JavaScript API Reference](/api/javascript/ui/multicolumncombobox)
