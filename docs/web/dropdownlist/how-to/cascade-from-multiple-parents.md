---
title: Cascade from multiple parents
page_title: Cascade from multiple parents
description: Example that shows how to cascade from multiple Kendo UI DropDownList parents
---

# How to cascade from multiple parents

Example that shows how to cascade from multiple parents

#### Example:

```html
<select id="region" name="" id="region"></select><br />
<select id="category" name="" id="category"></select><br />
<select id="manufacturer" name="" id="manufacturer"></select><br />
<select id="model" name="" id="models"></select>
<script>
    //sample data
    var regions = [ { text: "US", value: 1 }, { text: "Europe", value: 2 } ];
    var categories = [ { text: "Car", value: 1 }, { text: "Trunk", value: 2 } ];
    var manufacturers = [ { text: "Ford", value: 1 }, { text: "GM", value: 2 } ];
    var models = [
        { text: "Model1", value: 1, region: 0, category: 1, manufacturer: 1 },
        { text: "Model2", value: 2, region: 1, category: 1, manufacturer: 1 },
        { text: "Model3", value: 3, region: 2, category: 2, manufacturer: 2 },
        { text: "Model4", value: 4, region: 2, category: 2, manufacturer: 2 }
    ];

    //cascade event handler
    function cascade() {
        if(region.value() && category.value() && manufacturer.value()) { //check if parents have value
            model.enable(true); //enable the widget
            model.dataSource.filter([ //filter the dataSource
                { field: "region", operator: "eq", value: parseInt(region.value()) },
                { field: "category", operator: "eq", value: parseInt(category.value()) },
                { field: "manufacturer", operator: "eq", value: parseInt(manufacturer.value()) }
            ]);
        } else {
            model.value(""); //clear the value
            model.enable(false); //disable the widget
        }
    }

    var region = $("#region").kendoDropDownList({
        dataSource: { data: regions },
        dataTextField: "text",
        dataValueField: "value",
        optionLabel: "Select region"
    }).data("kendoDropDownList");

    var category = $("#category").kendoDropDownList({
        dataSource: { data: categories },
        dataTextField: "text",
        dataValueField: "value",
        optionLabel: "Select category"
    }).data("kendoDropDownList");

    var manufacturer = $("#manufacturer").kendoDropDownList({
        dataSource: { data: manufacturers },
        dataTextField: "text",
        dataValueField: "value",
        optionLabel: "Select manufacturer"
    }).data("kendoDropDownList");

    var model = $("#model").kendoDropDownList({
        dataSource: { data: models },
        autoBind: false,
        dataTextField: "text",
        dataValueField: "value",
        optionLabel: "Select models",
        enable: false
    }).data("kendoDropDownList");

    //bind events
    region.bind("cascade", cascade);
    category.bind("cascade", cascade);
    manufacturer.bind("cascade", cascade);

</script>
```
