---
title: Enable ForeignKey Column Sorting by Text
page_title: Enable ForeignKey Column Sorting by Text | Kendo UI Grid
description: "Learn how to enable ForeignKey sroting by text in the Kendo UI Grid widget."
slug: howto_enable_foreignkey_sotringby_text_grid
---

# Enable ForeignKey Column Sorting by Text

The example below demonstrates how to enable sorting by text in a ForeignKey column using a calculated field.

###### Example

```html

    <script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js" type="text/javascript"></script>
    <div id="example">
      <div id="grid"></div>

      <script>
        var categories = [
            { "value": 1, "text": "Beverages"},
            { "value": 2, "text": "Condiments"},
            { "value": 3, "text": "Confections"},
            { "value": 4, "text": "Dairy Products"},
            { "value": 5, "text": "Grains/Cereals"},
            { "value": 6, "text": "Meat/Poultry"},
            { "value": 7, "text": "Produce"},
            {"value": 8, "text": "Seafood"}];

        //create dictionary of text-values for the FKC
        var categoriesDict = {};
        for (var i=0; i<categories.length;i++) {
        	categoriesDict[categories[i].value] = categories[i].text;
        }

        $(document).ready(function () {
          var dataSource = new kendo.data.DataSource({
            pageSize: 20,
            data: products,
            change: function(e) {
              if (!e.action) {
                this.data();
              }
            },
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true} },
                  CategoryID: { field: "CategoryID", type: "number", defaultValue: 1 },
                  UnitPrice: { type: "number", validation: { required: true, min: 1} }
                },
                //define calculated field:
                CategoryName: function() {
                  return categoriesDict[this.get("CategoryID")];
                }
              }
            }
          });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            groupable: true,
            pageable: true,
            sortable: true,
            height: 540,
            toolbar: ["create"],
            columns: [
              { field: "ProductName", title: "Product Name" },
              //bind column to the calculated field and specify custom editor:
              { field: "CategoryName()", width: "200px", title: "Category", editor: categoryDropDownEditor },
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "200px" },
              { command: "destroy", title: " ", width: "150px"}],
            editable: true
          });
        });


        function categoryDropDownEditor(container, options) {
          //specify the value field in the "data-bind" attribute
          $('<input required data-text-field="text" data-value-field="value" data-bind="value:CategoryID"/>')
          .appendTo(container)
          .kendoDropDownList({
            autoBind: false,
            dataSource: categories
          });
        }
      </script>
    </div>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [How to Drag and Drop Rows between Grids]({% slug howto_dragand_drop_rows_between_twogrids_grid %})
* [How to Filter Array Columns Using MultiSelect]({% slug howto_filetr_array_columns_using_multiselect_grid %})
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
