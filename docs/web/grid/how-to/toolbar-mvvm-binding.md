---
title: Update Toolbar Content Using MVVM Binding
page_title: Update Toolbar Content Using MVVM Binding | Kendo UI Grid Widget
description: "Learn how to create a custom MVVM binding to update the Toolbar content dynamically in the Kendo UI Grid widget."
slug: howto_update_toolbar_content_using_mvvmbinding_grid
---

# Update Toolbar Content Using MVVM Binding

The example below demonstrates how to create a [custom MVVM binding](/framework/mvvm/bindings/custom) to update the Toolbar content dynamically.

###### Example

```html
<div id="example">
      <button data-bind="click: updateToolbar">Update toolbar</button>
      <div data-role="grid"
           date-scrollable="true"
           data-columns="[
                           { 'field': 'ProductName', 'width': 270 },
                           { 'field': 'UnitPrice' },
                        ]"
           data-bind="source: products, gridToolbar: toolbar"
           style="width: 480px; height: 200px"></div>
</div>
  <script>
    kendo.data.binders.widget.gridToolbar = kendo.data.Binder.extend({
        init: function(widget, bindings, options) {
            //call the base constructor
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
        },
        refresh: function() {
            var that = this;
            var value = that.bindings["gridToolbar"].get(); //get the value from the View-Model

            value = $.map(value, function(item) {
              return { template: item.template };
            });

            $(that.element).data("kendoGrid").setOptions({
              toolbar: value
            }); //update the widget
        }
    });

    var viewModel = kendo.observable({
        products: new kendo.data.DataSource({
            schema: {
                model: {
                    id: "ProductID"
                }
            },
            batch: true,
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                },
                update: {
                    url: "http://demos.telerik.com/kendo-ui/service/products/update",
                    dataType: "jsonp"
                },
                create: {
                    url: "http://demos.telerik.com/kendo-ui/service/products/create",
                    dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
                    }
                }
            }
        }),
        toolbar: [{"template": "<div id=\"gridToolbar\" class=\"toolbar\"><input type=\"button\" class=\"k-button k-button-icontext\" value=\"My Button\"/></div>" }],
        updateToolbar: function() {
          this.set("toolbar", [{
            template: '<div id="gridToolbar" class="toolbar"><input type="button" class="k-button k-button-icontext" value="test"/></div>'
          }]);
        }
    });
    kendo.bind($("#example"), viewModel);
</script>
```

## See Also

Other articles on Kendo UI Grid and how-to examples:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
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
* [How to Use Checkboxes inside Column Menus]({% slug howto_use_checkboxes_inside_column_menu_grid %})
* [How to Use Draggable Elements with Multiselection Enabled]({% slug howto_use_draggable_elements_multiselection_enabled_grid %})
* [How to Use Grid in Kendo UI SPA Application]({% slug howto_use_gridin_kendouispa_app_grid %})
* [How to Use MultiSelect for Column Filtering]({% slug howto_use_multiselect_forcolumn_filtering_grid %})
* [How to Use Nested Chart]({% slug howto_use_nested_charts_grid %})
* [How to Use Nested Model Properties]({% slug howto_use_nested_model_properties_grid %})
* [How to Use WebAPI with Server-Side Operations]({% slug howto_use_webapi_withserverside_operations_grid %})