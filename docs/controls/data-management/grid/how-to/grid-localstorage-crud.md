---
title: Perform CRUD Operations with Local Storage Data
page_title: Perform CRUD Operations with Local Storage Data | Kendo UI Grid
description: "Learn how to perform CRUD operations with local storage data in the Kendo UI Grid widget."
slug: howto_perform_crud_operationswith_local_storage_data_grid
---

# Perform CRUD Operations with Local Storage Data

The example below demonstrates how to perform CRUD operations with local storage data.

###### Example

```html
<button onClick="reset()" class="k-button">Reset test data</button>
<div id="grid"></div>
<script>

function setTestData(){
    var testData = [
      {ID: 1, Value: "TEST1"},
      {ID: 2, Value: "TEST2"},
      {ID: 3, Value: "TEST3"},
      {ID: 4, Value: "TEST4"},
      {ID: 5, Value: "TEST5"}  
    ];
    localStorage["grid_data"] = JSON.stringify(testData);
}

function reset(){
    setTestData();
    $("#grid").data("kendoGrid").dataSource.read();
}

$(document).ready(function () {

    if(localStorage["grid_data"] == undefined){
        setTestData();
    }

    var dataSource = new kendo.data.DataSource({
        transport: {
          create: function(options){
            var localData = JSON.parse(localStorage["grid_data"]);
            options.data.ID = localData[localData.length-1].ID + 1;
            localData.push(options.data);
            localStorage["grid_data"] = JSON.stringify(localData);
            options.success(options.data);
          },
          read: function(options){
              var localData = JSON.parse(localStorage["grid_data"]);
              options.success(localData);
          },
          update: function(options){
            var localData = JSON.parse(localStorage["grid_data"]);

            for(var i=0; i<localData.length; i++){
              if(localData[i].ID == options.data.ID){
                localData[i].Value = options.data.Value;
              }
            }
            localStorage["grid_data"] = JSON.stringify(localData);
            options.success(options.data);
          },
          destroy: function(options){
            var localData = JSON.parse(localStorage["grid_data"]);
            for(var i=0; i<localData.length; i++){
                if(localData[i].ID === options.data.ID){
                    localData.splice(i,1);
                    break;
                }
            }
            localStorage["grid_data"] = JSON.stringify(localData);
            options.success(localData);
          },
        },
        schema: {
          model: {
            id: "ID",
            fields: {
              ID: { type: "number", editable: false },
              Value: { type: "string" }
            }}
        },
        pageSize: 20
    });

    var grid = $("#grid").kendoGrid({
        dataSource: dataSource,
        pageable: true,
        height: 500,
        toolbar: ["create", "save", "cancel"],
        columns: [
          { field: "ID", width: "100px" },
          { field: "Value", width: "100px"},
          { command: "destroy" }
        ],
        editable: "incell",
    }).data("kendoGrid");
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
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
