---
title: Add Cascading DropDownList Editors
page_title: Add Cascading DropDownList Editors | Kendo UI Grid Widget
description: "Learn how to add cascading DropDownList editors to the Kendo UI Grid widget."
slug: howto_add_cascading_dropdown_list_editors_grid
---

# Add Cascading DropDownList Editors

The example below demonstrates how to add cascading DropDownList editors to Kendo UI Grid.

> **Important**  
> The approach is supported only in `inline` and `popup` editing mode.

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

## See Also

Other articles on Kendo UI Grid and how-to examples:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add Tooltip to Grid Cells]({% slug howto_add_tooltipto_grid_cell_record_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [How to Create Checkbox Filter Menu]({% slug howto_create_checkbox_filter_menu_grid %})
* [How to Customize Rows and Cells Based on Data Item Values]({% slug howto_customize_rowsand_cells_basedon_dataitem_values_grid %})
* [How to Drag and Drop Rows between Grids]({% slug howto_dragand_drop_rows_between_twogrids_grid %})
* [How to Enable ForeignKey Column Sorting by Text]({% slug howto_enable_foreignkey_sotringby_text_grid %})
* [How to Filter Array Columns Using MultiSelect]({% slug howto_filetr_array_columns_using_multiselect_grid %})
* [How to Filter Grid as You Type]({% slug howto_filter_gridas_you_type_grid %})
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Collapsed State of Grouped Records]({% slug howto_persist_collapsed_stateof_grouped_records_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Preserve Grid State in a Cookie]({% slug howto_preserve_gridstate_inacookie_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Sort Multiple Checkbox Filter]({% slug howto_sort_multiple_checkbox_filter_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})
* [How to Use Checkboxes inside Column Menus]({% slug howto_use_checkboxes_inside_column_menu_grid %})
* [How to Use Draggable Elements with Multiselection Enabled]({% slug howto_use_draggable_elements_multiselection_enabled_grid %})
* [How to Use Grid in Kendo UI SPA Application]({% slug howto_use_gridin_kendouispa_app_grid %})
* [How to Use MultiSelect for Column Filtering]({% slug howto_use_multiselect_forcolumn_filtering_grid %})
* [How to Use Nested Chart]({% slug howto_use_nested_charts_grid %})
* [How to Use Nested Model Properties]({% slug howto_use_nested_model_properties_grid %})
* [How to Use WebAPI with Server-Side Operations]({% slug howto_use_webapi_withserverside_operations_grid %})