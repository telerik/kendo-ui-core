---
title: Add Tooltip to Grid Cells
page_title: Add Tooltip to Grid Cells | Kendo UI Grid
description: "Learn how to add Kendo UI Tooltip to a cell record in the Kendo UI Grid widget."
slug: howto_add_tooltipto_grid_cell_record_grid
---

# Add Tooltip to Grid Cells

The example below demonstrates how to add a Kendo UI Tooltip to a Kendo UI Grid cell record.

###### Example

```html
    <div id="grid"></div>

    <style>
      #grid{
        width:300px;
      }
    </style>
    <script>
      var grid = null;

      $(document).ready(function () {
        var dataSource = new kendo.data.DataSource({
          data: [
            {ID:1 ,Text: "Integer arcu odio, egestas nec pretium sit amet, aliquet vel nibh."},
            {ID:2 ,Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "},
            {ID:3 ,Text: " Duis ut nulla eget lectus posuere tempor. "}
          ],
          schema: {
            model: {
              fields: {
                ID: { type: "number" },
                Text: { type: "string" }
              }}
          },
          pageSize: 20
        });

        grid = $("#grid").kendoGrid({
          dataSource: dataSource,
          scrollable: true,
          filterable: true,
          toolbar: ["create"],
          columns: [
            { field: "ID", width: "50px" },
            { field: "Text", width: "200px", attributes: {
              style: 'white-space: nowrap '
            }  }],
          editable: "incell"
        }).data("kendoGrid");  



        $("#grid").kendoTooltip({
          filter: "td:nth-child(2)", //this filter selects the first column cells
          position: "right",
          content: function(e){
            var dataItem = $("#grid").data("kendoGrid").dataItem(e.target.closest("tr"));
            var content = dataItem.Text;
            return content;
          }
        }).data("kendoTooltip");

      });
    </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [How to Drag and Drop Rows between Grids]({% slug howto_dragand_drop_rows_between_twogrids_grid %})
* [How to Enable ForeignKey Column Sorting by Text]({% slug howto_enable_foreignkey_sotringby_text_grid %})
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
