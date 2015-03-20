---
title: Add cascading DropDownList editors
page_title: cascading DropDownList editors in Kendo UI Grid
description: Kendo UI Grid example that demonstrates how to add cascading DropDownList editors in Kendo UI Grid
---

# Add cascading DropDownList editors

This examples demonstrates how to add cascading DropDownList editors in Kendo UI Grid.

> The approach is supported only in `inline` and `popup` editing mode.

#### Example:

```html
<div id="grid"></div>
<script>
    // array of all brands
    var brands = [
        { brandId: 1, name: "Ford" },
        { brandId: 2, name: "BMW" }
    ];

    // array of all models
    var models = [
        { modelId: 1, name: "Explorer", brandId: 1},
        { modelId: 2, name: "Focus", brandId: 1},
        { modelId: 3, name: "X3", brandId: 2},
        { modelId: 4, name: "X5", brandId: 2}
    ];

    $("#grid").kendoGrid({
        dataSource: {
            data: [
                { id: 1, brandId: 1, modelId: 2 } // initial data item (Ford, Focus)
            ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { editable: false } // the id field is not editable
                    }
                }
            }
        },
        editable: "inline", // use inline mode so both dropdownlists are visible (required for cascading)
        columns: [
        { field: "id" },
        { 
            // the brandId column
            title: "Brand",
            field: "brandId", // bound to the brandId field
            template: "#= brandName(brandId) #", // the template shows the name corresponding to the brandId field
            editor: function(container) { // use a dropdownlist as an editor
                // create an input element with id and name set as the bound field (brandId)
                var input = $('<input id="brandId" name="brandId">');
                // append to the editor container 
                input.appendTo(container);

                // initialize a dropdownlist
                input.kendoDropDownList({
                    dataTextField: "name",
                    dataValueField: "brandId",
                    dataSource: brands // bind it to the brands array
                }).appendTo(container);
            }
        },
        { 
            //The modelId column
            title: "Model",
            field: "modelId",  // bound to the modelId field
            template: "#= modelName(modelId) #", //the template shows the name corresponding to the modelId field
            editor: function(container) { // use a dropdownlist as an editor
                var input = $('<input id="modelId" name="modelId">');
                input.appendTo(container);
                input.kendoDropDownList({
                    dataTextField: "name",
                    dataValueField: "modelId",
                    cascadeFrom: "brandId", // cascade from the brands dropdownlist
                    dataSource: models // bind it to the models array
                }).appendTo(container);
            }
        },
        { command: "edit" }
        ]
    });

    function brandName(brandId) {
        for (var i = 0; i < brands.length; i++) {
            if (brands[i].brandId == brandId) {
                return brands[i].name;
            }
        }
    }

    function modelName(modelId) {
        for (var i = 0; i < models.length; i++) {
            if (models[i].modelId == modelId) {
                return models[i].name;
            }
        }
    }
</script>
```
