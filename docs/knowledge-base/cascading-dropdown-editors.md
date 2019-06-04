---
title: Add Cascading DropDownList Editors
page_title: Cascading DropDownList Editors | Kendo UI Grid for jQuery
description: "An example on how to add cascading DropDownList editors to the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/grid-cascading-dropdown-editors, /controls/data-management/grid/how-to/Editing/cascading-dropdown-editors
slug: howto_add_cascading_dropdown_list_editors_grid
tags: grid, cascading, dropdownlists, editors
component: grid
type: how-to
res_type: kb
---

The following examples demonstrate how to add cascading DropDownList editors to a Grid.

> The approach is supported only in the `inline` and `popup` editing mode.

## Inline Editing Mode

The following example demonstrates how to implement a cascading DropDownList as an editor in a Grid in the inline edit mode.

```dojo
<div id="grid"></div>
<script>
    // An array of all brands.
    var brands = [
        { brandId: 1, name: "Ford" },
        { brandId: 2, name: "BMW" }
    ];

    // An array of all models.
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
            // The modelId column.
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

## Popup Editing Mode

The following example demonstrates the popup editing mode of a Kendo UI Grid with `null` default values for new items.

```dojo
<div id="grid"></div>    

<script id="popupTemplate" type="text/x-kendo-template">
    <div class="k-edit-label">
        <label for="Category">Category:</label>
    </div>
    <div class="k-edit-field">
        <input id="Category" name="Category" data-bind="value:Category" required />
        <span class="k-invalid-msg" data-for="Category"></span>
    </div>
    <div class="k-edit-label">
        <label for="products">Product:</label>
    </div>
    <div class="k-edit-field">
        <input id="Product" name="Product" data-bind="value:Product" required />
        <span class="k-invalid-msg" data-for="Product"></span>
    </div>
    <div class="k-edit-label">
        <label for="orders">Quantity:</label>
    </div>
    <div class="k-edit-field">
        <input id="Order" name="Order" data-bind="value:Order" required />
        <span class="k-invalid-msg" data-for="Order"></span>
    </div>
</script>


<script>

$(function () {

    var gridData = [{
        ID: 1, Category: {CategoryID: 1, CategoryName: "Beverages"}, Product: {ProductID: 1, ProductName: "Chai"}, Order: {OrderID: 10285, Quantity: 45}
    }, {
        ID: 2, Category: { CategoryID: 2, CategoryName: "Condiments"}, Product: {ProductID: 3, ProductName: "Aniseed Syrup"}, Order: {OrderID: 10289, Quantity: 30}
    }, {
        ID: 3, Category: { CategoryID: 3, CategoryName: "Confections"}, Product: {ProductID: 16, ProductName: "Pavlova"}, Order: {OrderID: 10255, Quantity: 35}
    }];

    var gridDataNextID = gridData.length + 1;

    var gridDataSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                options.success(gridData);
            },
            update: function (options) {
                options.success();
            },
            create: function (options) {
                options.data.ID = gridDataNextID++;
                gridData.push(options.data);
                options.success(options.data);
            }
        },
        schema: {
            model: {
                id: "ID",
                fields: {
                    ID: { type: "number", editable: false },
                    Category: { defaultValue: null },
                    Product: { defaultValue: null },
                    Order: { defaultValue: null }
                }
            }
        }
    });

    function initDropDownLists() {
            var categories = $("#Category").kendoDropDownList({
                optionLabel: "Select category...",
                dataTextField: "CategoryName",
                dataValueField: "CategoryID",
                dataSource: {
                    type: "odata",
                    serverFiltering: true,
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
                    }
                }
            }).data("kendoDropDownList");

            var products = $("#Product").kendoDropDownList({
                autoBind: false,
                cascadeFrom: "Category",
                optionLabel: "Select product...",
                dataTextField: "ProductName",
                dataValueField: "ProductID",
                dataSource: {
                    type: "odata",
                    serverFiltering: true,
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                    }
                }
            }).data("kendoDropDownList");

            var orders = $("#Order").kendoDropDownList({
                autoBind: false,
                cascadeFrom: "Product",
                optionLabel: "Select quantity...",
                dataTextField: "Quantity",
                dataValueField: "OrderID",
                dataSource: {
                    type: "odata",
                    serverFiltering: true,
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Order_Details?$expand=Order"
                    }
                }
            }).data("kendoDropDownList");
    }

    $("#grid").kendoGrid({
        columns: [
            { field: "Category", title: "Category Name", template: "#: Category ? Category.CategoryName : null #" },
            { field: "Product", title: "Product Name", template: "#: Product ? Product.ProductName : null #" },
            { field: "Order", title: "Order Quantity", template: "#: Order ? Order.Quantity : null #" },
            { command: ["edit"] }
        ],
        toolbar: ["create"],
        editable: { mode: "popup", window: { width: 600 }, template: $("#popupTemplate").html() },
        edit: function (e) {
            initDropDownLists();
        },
        autoBind: true,
        dataSource: gridDataSource
    });
});

</script>
```

The following example demonstrates the popup editing mode of a Kendo UI Grid with non-`null` default values for new items.

```dojo
<div id="grid"></div>    

<script id="popupTemplate" type="text/x-kendo-template">
    <div class="k-edit-label">
        <label for="Category">Category:</label>
    </div>
    <div class="k-edit-field">
        <input id="Category" name="Category" data-bind="value:Category" required />
        <span class="k-invalid-msg" data-for="Category"></span>
    </div>
    <div class="k-edit-label">
        <label for="products">Product:</label>
    </div>
    <div class="k-edit-field">
        <input id="Product" name="Product" data-bind="value:Product" required />
        <span class="k-invalid-msg" data-for="Product"></span>
    </div>
    <div class="k-edit-label">
        <label for="orders">Quantity:</label>
    </div>
    <div class="k-edit-field">
        <input id="Order" name="Order" data-bind="value:Order" required />
        <span class="k-invalid-msg" data-for="Order"></span>
    </div>
</script>

<script>

$(function () {

    var gridData = [{
        ID: 1, Category: {CategoryID: 1, CategoryName: "Beverages"}, Product: {ProductID: 1, ProductName: "Chai"}, Order: {OrderID: 10285, Quantity: 45}
    }, {
        ID: 2, Category: { CategoryID: 2, CategoryName: "Condiments"}, Product: {ProductID: 3, ProductName: "Aniseed Syrup"}, Order: {OrderID: 10289, Quantity: 30}
    }, {
        ID: 3, Category: { CategoryID: 3, CategoryName: "Confections"}, Product: {ProductID: 16, ProductName: "Pavlova"}, Order: {OrderID: 10255, Quantity: 35}
    }];

    var gridDataNextID = gridData.length + 1;

    var gridDataSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                options.success(gridData);
            },
            update: function (options) {
                options.success();
            },
            create: function (options) {
                options.data.ID = gridDataNextID++;
                gridData.push(options.data);
                options.success(options.data);
            }
        },
        schema: {
            model: {
                id: "ID",
                fields: {
                    ID: { type: "number", editable: false },
                    Category: { defaultValue: {CategoryID: 1, CategoryName: "Beverages"} },
                    Product: { defaultValue: {ProductID: 1, ProductName: "Chai"} },
                    Order: { defaultValue: {OrderID: 10285, Quantity: 45} }
                }
            }
        }
    });

    function initDropDownLists() {
            var categories = $("#Category").kendoDropDownList({
                optionLabel: "Select category...",
                dataTextField: "CategoryName",
                dataValueField: "CategoryID",
                dataSource: {
                    type: "odata",
                    serverFiltering: true,
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
                    }
                }
            }).data("kendoDropDownList");

            var products = $("#Product").kendoDropDownList({
                autoBind: false,
                cascadeFrom: "Category",
                optionLabel: "Select product...",
                dataTextField: "ProductName",
                dataValueField: "ProductID",
                dataSource: {
                    type: "odata",
                    serverFiltering: true,
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                    }
                }
            }).data("kendoDropDownList");

            var orders = $("#Order").kendoDropDownList({
                autoBind: false,
                cascadeFrom: "Product",
                optionLabel: "Select quantity...",
                dataTextField: "Quantity",
                dataValueField: "OrderID",
                dataSource: {
                    type: "odata",
                    serverFiltering: true,
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Order_Details?$expand=Order"
                    }
                }
            }).data("kendoDropDownList");
    }

    $("#grid").kendoGrid({
        columns: [
            { field: "Category", title: "Category Name", template: "#: Category.CategoryName #" },
            { field: "Product", title: "Product Name", template: "#: Product.ProductName #" },
            { field: "Order", title: "Order Quantity", template: "#: Order.Quantity #" },
            { command: ["edit"] }
        ],
        toolbar: ["create"],
        editable: { mode: "popup", window: { width: 600 }, template: $("#popupTemplate").html() },
        edit: function (e) {
            initDropDownLists();
        },
        autoBind: true,
        dataSource: gridDataSource
    });
});

</script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
