---
title: Drag and Drop Rows between Grids
page_title: jQuery Grid Documentation | Drag and Drop Rows Between Grids | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to drag and drop rows between two Grids."
previous_url: /controls/data-management/grid/how-to/drag-and-drop-rows-between-two-grids, /aspne-mvc/controls/data-management/grid/how-to/drag-and-drop-rows-between-two-grids
slug: howto_dragand_drop_rows_between_twogrids_grid
---

# Drag and Drop Rows between Grids

The following example demonstrates how to drag and drop rows between two Kendo UI Grids.

###### Example

```dojo
    <div id="grid1"></div>
    <br /><br /><br />
    <div id="grid2"></div>
    <script>
      $(document).ready(function () {
        var dataSource1 = new kendo.data.DataSource({
          data: [
            { "ID": 1, "Name": "James" },
            { "ID": 2, "Name": "John" },
            { "ID": 3, "Name": "Jane" },
          ],
          pageSize: 5
        });

        var dataSource2 = new kendo.data.DataSource({
          data: [
            { "ID": 4, "Name": "Alex" },
            { "ID": 5, "Name": "Allen" },
            { "ID": 6, "Name": "Anton" },
          ],
          pageSize: 5
        });


        var grid1 = $("#grid1").kendoGrid({
          dataSource: dataSource1,
          columns: [
            { field: "ID" },
            { field: "Name" }
          ]
        }).data("kendoGrid");

        var grid2 = $("#grid2").kendoGrid({
          dataSource: dataSource2,
          columns: [
            { field: "ID" },
            { field: "Name" }
          ]
        }).data("kendoGrid");


        $(grid1.element).kendoDraggable({
          filter: "tr",
          hint: function (e) {
            var item = $('<div class="k-grid k-widget" style="background-color: DarkOrange; color: black;"><table><tbody><tr>' + e.html() + '</tr></tbody></table></div>');
            return item;
          },
          group: "gridGroup1",
        });


        $(grid2.element).kendoDraggable({
          filter: "tr",
          hint: function (e) {
            var item = $('<div class="k-grid k-widget" style="background-color: MediumVioletRed; color: black;"><table><tbody><tr>' + e.html() + '</tr></tbody></table></div>');
            return item;
          },
          group: "gridGroup2",
        });


        grid1.wrapper.kendoDropTarget({
          drop: function (e) {
            var dataItem = dataSource2.getByUid(e.draggable.currentTarget.data("uid"));
            dataSource2.remove(dataItem);
            dataSource1.add(dataItem);
          },
          group: "gridGroup2",
        });
        grid2.wrapper.kendoDropTarget({
          drop: function (e) {
            var dataItem = dataSource1.getByUid(e.draggable.currentTarget.data("uid"));
            dataSource1.remove(dataItem);
            dataSource2.add(dataItem);
          },
          group: "gridGroup1",
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [How to Enable ForeignKey Column Sorting by Text]({% slug howto_enable_foreignkey_sotringby_text_grid %})
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
