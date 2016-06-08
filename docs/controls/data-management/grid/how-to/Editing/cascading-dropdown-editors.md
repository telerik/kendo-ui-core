---
title: Add Cascading DropDownList Editors
page_title: Add Cascading DropDownList Editors | Kendo UI Grid
description: "Learn how to add cascading DropDownList editors to the Kendo UI Grid widget."
previous_url: /controls/data-management/grid/how-to/grid-cascading-dropdown-editors
slug: howto_add_cascading_dropdown_list_editors_grid
---

# Add Cascading DropDownList Editors

The examples below demonstrate how to add cascading DropDownList editors to a Kendo UI Grid.

> **Important**  
>
> The approach is supported only in `inline` and `popup` editing mode.

## Editing Modes

### Inline Editing Mode

###### Example

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

### Popup Editing Mode

The example below demonstrates the popup editing mode of a Kendo UI Grid with null default values for new items.

###### Example

```html
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
                        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
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
                        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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
                        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Order_Details?$expand=Order"
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

The example below demonstrates the popup editing mode of a Kendo UI Grid with non-null default values for new items.

###### Example

```html
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
                        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
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
                        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
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
                        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Order_Details?$expand=Order"
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

Other articles on the Kendo UI Grid and how-to examples related to its editing functionality:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add New Rows When Tabbing out of the Last One]({% slug howto_add_new_rows_when_tabbingoutof_thelast_one_grid %})
* [How to Build Custom dataSource for Custom Editor]({% slug howto_build_custom_datasourcefor_custom_editor_grid %})
* [How to Customize the Delete Confirmation Dialog]({% slug howto_customize_delete_confirmation_dialog_grid %})
* [How to Delete Multiple Rows Selected with Checkboxes]({% slug howto_delete_rows_selectedwith_checkboxes_grid %})
* [How to Edit Records in Child Grids]({% slug howto_edit_recordsin_children_grid %})
* [How to Edit Records Using External Forms]({% slug howto_edit_records_using_external_forms_grid %})
* [How to Increase Popup Edit Form and Textbox Width]({% slug howto_increase_popup_edit_formand_textbox_grid %})
* [How to Preserve Dirty Indicator in Incell Editing and Client Operations]({% slug howto_preserve_dirty_indicator_incell_editing_client_operations_grid %})
* [How to Render Grid Editor in Column Template]({% slug howto_render_editor_column_template_grid %})
* [How to Show Custom Editor Using the Selected Item outside the Grid]({% slug howto_use_show_custom_editor_selected_item_outside_grid %})
* [How to Skip Non-editable Cells When Tabbing]({% slug howto_skip_noneditable_cells_when_tabbing_grid %})
* [How to Use AutoComplete as Custom Column Editor]({% slug howto_use_autocompleteas_custom_column_editor_grid %})
* [How to Use CRUD Operations When Grid Is Bound through MVVM]({% slug howto_use_crud_operationswith_mvvmbound_grid %})
* [How to Use Editors Based on Data Item Property]({% slug howto_use_editors_basedon_dataitem_property_grid %})
* [How to Use TreeView as Custom Editor]({% slug howto_usethe_treeview_aseditor_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
