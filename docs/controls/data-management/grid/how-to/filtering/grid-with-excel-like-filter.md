---
title: Grid with Excel like filter (filter menu)
page_title: Use Grid Filtering with Excel like filter | Kendo UI Grid Widget
description: "Learn how to use Excel like filter in a Kendo UI Grid."
slug: howto_gridfiltering_excellike_grid
---

# Use Grid with Excel like filter

The example below demonstrates how to set the Grid with Excel like filter. The example uses the [columns.filterable.dataSource](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.filterable.dataSource) property of the Grid to set one dataSource for the Grid and for the filter menus.

To see how the example below functions, follow these steps:

1. Filter the Product Name column.
2. Open the Unit Price column and notice that the values are filtered based on the currently applied filter on the Product Name column.

###### Example

```html
<div id="example">
      <style>
        .k-multicheck-wrap {
          overflow-x: hidden;
        }
      </style>
      <div class="demo-section k-content wide">
        <h4>Client Operations</h4>
        <div id="client"></div>
      </div>

      <script>
        $(document).ready(function() {
          var telerikWebServiceBase = "https://demos.telerik.com/kendo-ui/service/";

          var dataSource = new kendo.data.DataSource({
            transport: {
              read:  {
                url: telerikWebServiceBase + "/Products",
                dataType: "jsonp"
              },
              update: {
                url: telerikWebServiceBase + "/Products/Update",
                dataType: "jsonp"
              },
              destroy: {
                url: telerikWebServiceBase + "/Products/Destroy",
                dataType: "jsonp"
              },
              create: {
                url: telerikWebServiceBase + "/Products/Create",
                dataType: "jsonp"
              },
              parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                  return {models: kendo.stringify(options.models)};
                }
              }
            },
            batch: true,
            pageSize: 20,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true } },
                  UnitPrice: { type: "number", validation: { required: true, min: 1} },
                  Discontinued: { type: "boolean" },
                }
              }
            }
          });


          $("#client").kendoGrid({
            dataSource: dataSource,
            filterable: true,
            pageable: true,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
              { field: "ProductName", filterable: { dataSource: dataSource, multi: true, search: true, search: true } },
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120, filterable: { dataSource: dataSource, multi: true } },
              { field: "UnitsInStock", title: "Units In Stock", width: 120, filterable: { dataSource: dataSource, multi: true } },
              { command: "destroy", title: "&nbsp;", width: 150}],
            editable: true
          });
        });
      </script>
    </div>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [How to Drag and Drop Rows between Grids]({% slug howto_dragand_drop_rows_between_twogrids_grid %})
* [How to Enable ForeignKey Column Sorting by Text]({% slug howto_enable_foreignkey_sotringby_text_grid %})
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
