---
title: Show Custom Editor Using the Selected Item outside the Grid
page_title: Show Custom Editor Using the Selected Item outside the Grid | Kendo UI Grid
description: "Learn how to show a custom editor, which uses the currently selected item, outside the Kendo UI Grid widget."
slug: howto_use_show_custom_editor_selected_item_outside_grid
---

# Show Custom Editor Using the Selected Item outside the Grid

The example below demonstrates how to use a custom editor outside Kendo UI Grid, which uses the currently selected item.

###### Example

```html
    <style>
      label{display:block;width:25em;position:relative;line-height:2.6;}
      label > .k-textbox, label > .k-button, label > .k-widget{position:absolute;right:0;width:15em;}
      label > .checkbox{position:absolute;right:12.4em;top:.3em;font-size:1.1em;}
      #grid{margin:2em 0 0;}
    </style>

    <div id="example">

      <form id="gridEditor">
        <label>ProductName <input type="text" name="ProductName" data-bind="value: ProductName" required="true" class="k-textbox" /></label>
        <label>UnitsInStock <input type="number" name="UnitsInStock" data-role="numerictextbox" required="true" min="0" data-bind="value: UnitsInStock" /></label>
        <label>Discontinued <input type="checkbox" name="Discontinued" data-bind="checked: Discontinued" class="checkbox" /></label>
        <label>Save changes <button type="button" id="saveChanges" class="k-button">Submit</button></label>
        <span class="k-invalid-msg" data-for="ProductName"></span>
        <span class="k-invalid-msg" data-for="UnitsInStock"></span>
      </form>

      <div id="grid"></div>

      <script>
        $(document).ready(function () {
          var crudServiceBaseUrl = "http://demos.telerik.com/kendo-ui/service",
              dataSource = new kendo.data.DataSource({
                transport: {
                  read:  {
                    url: crudServiceBaseUrl + "/Products",
                    dataType: "jsonp"
                  },
                  update: {
                    url: crudServiceBaseUrl + "/Products/Update",
                    dataType: "jsonp"
                  },
                  destroy: {
                    url: crudServiceBaseUrl + "/Products/Destroy",
                    dataType: "jsonp"
                  },
                  create: {
                    url: crudServiceBaseUrl + "/Products/Create",
                    dataType: "jsonp"
                  },
                  parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                      return {models: kendo.stringify(options.models)};
                    }
                  }
                },
                batch: true,
                pageSize: 10,
                schema: {
                  model: {
                    id: "ProductID",
                    fields: {
                      ProductID: { editable: false, nullable: true },
                      ProductName: { validation: { required: true } },
                      Discontinued: { type: "boolean" },
                      UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                  }
                }
              });

          var selectedRow = null;

          $("#gridEditor").kendoValidator();

          var grid = $("#grid").kendoGrid({
            dataSource: dataSource,
            change: function(e){
              selectedRow = e.sender.select();
              var item = e.sender.dataItem(selectedRow);
              kendo.bind($("#gridEditor"), item);
            },
            dataBound: function(e){
              if (selectedRow) {
                var tr = $("[data-uid='"+ selectedRow.attr("data-uid") +"']");
                e.sender.select(tr);
              }
              if (!selectedRow || !tr[0]) {
                grid.select(grid.tbody.children().eq(0));
              }
            },
            pageable: true,
            selectable: true,
            height: 400,
            toolbar: [{template: "<button id='addNew' type='button' class='k-button'>Add new record</button>"}],
            columns: [
              { field: "ProductName", title: "Product Name"},
              { field: "UnitsInStock", title:"Units In Stock", width: 200 },
              { field: "Discontinued", width: 200 }]
          }).data("kendoGrid");

          $("#addNew").click(function(){
            var newItem = grid.dataSource.insert({},0);
            grid.dataSource.page(1);
            grid.select($("[data-uid='"+ newItem.uid +"']"));
          });

          $("#saveChanges").click(function(){
            grid.dataSource.one("requestEnd", function(e) {
              alert("Success");
            });
            grid.saveChanges();
          });

        });
      </script>
    </div>
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
* [How to Skip Non-editable Cells When Tabbing]({% slug howto_skip_noneditable_cells_when_tabbing_grid %})
* [How to Use AutoComplete as Custom Column Editor]({% slug howto_use_autocompleteas_custom_column_editor_grid %})
* [How to Use CRUD Operations When Grid Is Bound through MVVM]({% slug howto_use_crud_operationswith_mvvmbound_grid %})
* [How to Use Editors Based on Data Item Property]({% slug howto_use_editors_basedon_dataitem_property_grid %})
* [How to Use TreeView as Custom Editor]({% slug howto_usethe_treeview_aseditor_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
