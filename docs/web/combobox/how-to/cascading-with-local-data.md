---
title: Cascading with local data 
page_title: Cascading with local data
description: Example that shows how to implement cascading with local data
---

# How to implement cascading with local data

The example below demonstrates how to implement cascading with local data.

#### Example:

```html
category: <select id="category"></select>
product: <select id="product"></select>

<script>
    var category = $("#category").kendoComboBox({
        placeholder: "Select category...",
        dataSource: [
            { CategoryID: 1, CategoryName: "Beverages" },
            { CategoryID: 2, CategoryName: "Condiments" },
            { CategoryID: 3, CategoryName: "Confections" }
        ],
        dataValueField: "CategoryID",
        dataTextField: "CategoryName",
        filter: "contains"
    }).data("kendoComboBox");

    var product = $("#product").kendoComboBox({
        placeholder: "Select product...",
        dataSource: [
            {"ProductID":1,"ProductName":"Chai","CategoryID":1},
            {"ProductID":3,"ProductName":"Aniseed Syrup","CategoryID":2},
            {"ProductID":4,"ProductName":"Chef Anton's Cajun Seasoning","CategoryID":2},
            {"ProductID":16,"ProductName":"Pavlova","CategoryID":3},
            {"ProductID":19,"ProductName":"Teatime Chocolate Biscuits","CategoryID":3}              
        ],
        dataValueField: "ProductID",
        dataTextField: "ProductName",
        cascadeFrom: "category",
        filter: "contains"
    }).data("kendoComboBox");

    category.value("2");
    product.value("3");
</script>
```
