---
title: Use Grid in Kendo UI SPA Application
page_title: Use Grid in Kendo UI SPA Application | Kendo UI Grid
description: "Learn how to initialize a Kendo UI Grid widget in a Kendo UI SPA application."
slug: howto_use_gridin_kendouispa_app_grid
---

# Use Grid in Kendo UI SPA Application

The example below demonstrates how to initialize a Kendo UI Grid widget in a SPA application.

###### Example

```html
  <div id="app"></div>

    <script id="grid-view" type="text/x-kendo-tmpl">
    <div class="manage-roles">
      <div data-role="grid"
      data-scrollable="true"
      data-editable="inline"
      data-columns='[
        { field : "JobTitle", width: 120, title : "Job Title Code" },
        { field : "Description" },
        { field : "CategoryId", template: "${Category}" },
        {"command": "edit"}]'
      data-bind="source: roles"
      style="height: 500px">
      </div>
      </div>
    </script>

    <script>
      var roleViewModel = kendo.observable({
        categories: new kendo.data.DataSource({
          data: [
            { "CategoryId": 1, "Description": "IT" },
            { "CategoryId": 2, "Description": "Billing" },
            { "CategoryId": 3, "Description": "HR" },
            { "CategoryId": 4, "Description": "Sales" },
            { "CategoryId": 5, "Description": "Field" },
            { "CategoryId": 10, "Description": "Stuff" },
            { "CategoryId": 11, "Description": "Unassigned" }
          ]
        }),
        roles: new kendo.data.DataSource({
          data: [
            { "RoleId": 1, "JobTitle": "AADM1", "Description": "Administrative Assistant I", "Category": "Stuff", "CategoryId": 10 },
            { "RoleId": 2, "JobTitle": "AADM2", "Description": "Administrative Assistant II", "Category": null, "CategoryId": 0 },
            { "RoleId": 3, "JobTitle": "ACCIN", "Description": "Accounting Intern", "Category": null, "CategoryId": 0 },
            { "RoleId": 4, "JobTitle": "ACCSU", "Description": "Accounting Supervisor", "Category": null, "CategoryId": 0 }, { "RoleId": 5, "JobTitle": "ACCTC", "Description": "Accountant", "Category": null, "CategoryId": 0 }
          ]
        })
      });

      var categoryEditor = function(container, options) {     
        $('<input data-bind="value: ' + options.field + '" />')
        .appendTo(container)
        .kendoDropDownList({
          dataSource: roleViewModel.categories,
          dataTextField: 'Description',
          dataValueField: 'CategoryId'
        });
      };

      var view = new kendo.View($("#grid-view").html(), {
        model: roleViewModel,
        init: function() {
          var widget = this.element.find("[data-role=grid]").data("kendoGrid");

          widget.columns[2].editor = categoryEditor;
        }

      });

      var layout = new kendo.Layout("<header>Header</header><section id='content'></section><footer></footer>");

      layout.render($("#app"));

      layout.showIn("#content", view);
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
