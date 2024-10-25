---
title: Update Toolbar Content Using MVVM Binding
page_title: Update Toolbar via MVVM Binding - Kendo UI for jQuery Data Grid
description: "Learn how to create a custom MVVM binding to update the Toolbar content dynamically in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/toolbar-mvvm-binding, /controls/data-management/grid/how-to/binding/toolbar-mvvm-binding
slug: howto_update_toolbar_content_using_mvvmbinding_grid
tags: update, toolbar, content, using, mvvm, binding
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I create a custom MVVM binding to update the Toolbar content dynamically in the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to create a [custom MVVM binding](/framework/mvvm/bindings/custom) to update the Toolbar content dynamically.

```dojo
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
                    url: "https://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                },
                update: {
                    url: "https://demos.telerik.com/kendo-ui/service/products/update",
                    dataType: "jsonp"
                },
                create: {
                    url: "https://demos.telerik.com/kendo-ui/service/products/create",
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

* [JavaScript API Reference of the Data Grid](/api/javascript/ui/grid)
* [Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [Drag and Drop Rows between Grids]({% slug howto_dragand_drop_rows_between_twogrids_grid %})
* [Enable ForeignKey Column Sorting by Text]({% slug howto_enable_foreignkey_sotringby_text_grid %})
* [Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
