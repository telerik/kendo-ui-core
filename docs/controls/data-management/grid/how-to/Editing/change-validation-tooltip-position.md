---
title: Change Validation Message Position
page_title: Change Validation Message Position | Kendo UI Grid
description: "Learn how to change the validation message position in a popup edit form when working with the Kendo UI Grid."
slug: howto_change_validation_message_position_grid
---

# Change the Validation Message Position

By design, validation messages inside the Grid are tooltips that display over other adjacent content. The example below shows how to change this behavior and display the validation messages at a specific position in the popup edit form of the Grid.

The approach relies on the following milestones:

* Usage of a [popup edit form template](/api/javascript/ui/grid#configuration-editable.template).
* The validation messages are put in [placeholders]({% slug overview_kendoui_validator_widget %}#customization-of-tooltip-position) that are wrapped in custom parents and positioned with the help of custom CSS styles.
* The [popup edit form width may need to be increased]({% slug howto_increase_popup_edit_formand_textbox_grid %})

###### Example

```html
<style>

  /* increase the popup edit form's width to make space for validator messages */
  .k-edit-form-container {
    width: 500px;
  }

  /* add side padding */
  .k-edit-form-container dl {
    padding: 0 1em;
  }

  /* increase line height in accordance with validator messages' height */
  .k-edit-form-container dd {
    line-height: 3em;
  }

  /* override absolute positioning styles of the validator messages */
  .validator-msg,
  .validator-msg .k-tooltip {
    position: static;
    display: inline-block;
  }

  /* hide validator tooltip callouts */
  .validator-msg .k-tooltip .k-callout {
    display: none;
  }

</style>

<script id="edit-template" type="text/x-kendo-template">
    <dl>
      <dt><label for="ProductName">Product Name</label></dt>
      <dd><input class="k-textbox" data-bind="value:ProductName" name="ProductName" required="required" />
      <div class="validator-msg"><span data-for="ProductName" class="k-invalid-msg"></span></div></dd>

      <dt><label for="UnitPrice">Unit Price</label></dt>
      <dd><input data-role="numerictextbox" data-min="1" data-bind="value:UnitPrice" name="UnitPrice" required="required" />
      <div class="validator-msg"><span data-for="UnitPrice" class="k-invalid-msg"></span></div></dd>
    </dl>
</script>

<div id="grid"></div>

<script>
$(function () {
  var crudServiceBaseUrl = "//demos.telerik.com/kendo-ui/service",
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
        pageSize: 5,
        schema: {
          model: {
            id: "ProductID",
            fields: {
              ProductID: { editable: false, nullable: true },
              ProductName: { validation: { required: true } },
              UnitPrice: { type: "number", validation: { required: true, min: 1} },
              Discontinued: { type: "boolean" },
              UnitsInStock: { type: "number", validation: { min: 0, required: true } }
            }
          }
        }
      });

  $("#grid").kendoGrid({
    dataSource: dataSource,
    toolbar: ["create"],
    columns: [{ field:"ProductName", title: "Product Name" },
      { field: "UnitPrice", title:"Unit Price", format: "{0:c}" },
      { command: ["edit", "destroy"], title: "&nbsp;" }],
    editable: {
      mode:"popup",
      template: $("#edit-template").html()
    }
  });
});
</script>

```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its editing functionality:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [Increase Popup Edit Form and Textbox Width]({% slug howto_increase_popup_edit_formand_textbox_grid %})
* [How to Add New Rows When Tabbing out of the Last One]({% slug howto_add_new_rows_when_tabbingoutof_thelast_one_grid %})
* [How to Build Custom dataSource for Custom Editor]({% slug howto_build_custom_datasourcefor_custom_editor_grid %})
* [How to Customize the Delete Confirmation Dialog]({% slug howto_customize_delete_confirmation_dialog_grid %})
* [How to Delete Multiple Rows Selected with Checkboxes]({% slug howto_delete_rows_selectedwith_checkboxes_grid %})
* [How to Edit Records in Child Grids]({% slug howto_edit_recordsin_children_grid %})
* [How to Edit Records Using External Forms]({% slug howto_edit_records_using_external_forms_grid %})
* [How to Preserve Dirty Indicator in Incell Editing and Client Operations]({% slug howto_preserve_dirty_indicator_incell_editing_client_operations_grid %})
* [How to Render Grid Editor in Column Template]({% slug howto_render_editor_column_template_grid %})
* [How to Show Custom Editor Using the Selected Item outside the Grid]({% slug howto_use_show_custom_editor_selected_item_outside_grid %})
* [How to Skip Non-editable Cells When Tabbing]({% slug howto_skip_noneditable_cells_when_tabbing_grid %})
* [How to Use AutoComplete as Custom Column Editor]({% slug howto_use_autocompleteas_custom_column_editor_grid %})
* [How to Use CRUD Operations When Grid Is Bound through MVVM]({% slug howto_use_crud_operationswith_mvvmbound_grid %})
* [How to Use Editors Based on Data Item Property]({% slug howto_use_editors_basedon_dataitem_property_grid %})
* [How to Use TreeView as Custom Editor]({% slug howto_usethe_treeview_aseditor_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
