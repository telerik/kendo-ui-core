---
title: Cascading MultiComboComboBoxes
page_title: Cascading ComboBoxes | Kendo UI MultiComboComboBox
description: "Learn how Kendo UI cascading MultiComboComboBox works and helps you handle the most common scenarios with illustrative examples and FAQ."
slug: cascading_kendoui_multicolumncombobox_widget
position: 5
---

# Cascading ComboBoxes

The [cascading MultiComboComboBoxes](http://demos.telerik.com/kendo-ui/MultiComboComboBox/cascadingcombobox) is a series of two or more MultiComboComboBoxes in which each MultiComboComboBox is filtered according to the selected options, base on the dataValueField, in the previous MultiComboComboBox.

## Initialize the ComboBoxes

To initialize a cascading MultiComboComboBox, use the following example.

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
                { field: "UnitsInStock ", title: "d:UnitsInStock", width: 120 }
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


The child MultiComboComboBox cascades from the parent one if the [`cascadeFrom`](/api/javascript/ui/MultiComboComboBox#configuration) option is defined. The `cascadeFrom` option has to refer to the parent ID.

> **Important**
>
> The cascading functionality works only when you define the `cascadeFrom` property and initialize the parent MultiComboComboBox.

The child MultiComboComboBox takes the following actions during initialization:

- Checks if the `cascadeFrom` property is set. If not, cascading is disabled.
- Tries to find the parent MultiComboComboBox object. If the result is null, then the functionality is omitted.
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
> The filter operator is always `"eq"`. To filter the data, the child MultiComboComboBox uses the `dataValueField` option of the parent MultiComboComboBox.


## See Also

Other articles on the Kendo UI MultiComboComboBox:

* [Overview]({% slug overview_kendoui_multicolumncombobox_widget %})
* [Grouping]({% slug grouping_kendoui_multicolumncombobox_widget %})
* [Cascading MultiColumnComboBoxes]({% slug virtualization_kendoui_multicolumncombobox_widget %})
* [MultiComboComboBox JavaScript API Reference](/api/javascript/ui/multicolumncombobox)
