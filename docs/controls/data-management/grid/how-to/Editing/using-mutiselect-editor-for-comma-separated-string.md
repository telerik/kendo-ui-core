---
title: Use MultiSelect as CSV Editor
page_title: Use MultiSelect as CSV Editor | Kendo UI Grid
description: "Learn how to use Kendo UI MultiSelect as an editor for comma-seprated string fields in the Kendo UI Grid widget."
slug: howto_usethe_multiselect_aseditor_commaseparated_stringfields_grid
---

# Use MultiSelect as CSV Editor

The example below demonstrates how to implement custom binding and use it for Kendo UI MultiSelect in order to edit a string field, containing a list of comma-separated values.

###### Example

```html
    <div id="grid"></div>
    <script>
      kendo.data.binders.widget.commaseparatedvalue = kendo.data.Binder.extend({
        init: function (widget, bindings, options) {
          kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
          this.widget = widget;
          this._change = $.proxy(this.change, this);
          this.widget.bind("change", this._change);
        },
        refresh: function () {
          var value = this.bindings.commaseparatedvalue.get();
          var values = value ? value.split(",") : [];

          this.widget.value(values);
        },
        change: function () {
          var value = this.widget.value();
          this.bindings.commaseparatedvalue.set(value.join(","));
        },
        destroy: function () {
          this.widget.unbind("change", this._change);
        }
      });

      var dataSource = new kendo.data.DataSource({
        data: [{ID: 1, Value: "Value1,Value2"}, { ID: 2, Value: "Value2,Value3"}],
        schema: {
          model: {
            id: "ID",
            fields: {
              ID: { editable: false, type: "number" },
              Value: { type: "string" }                                                 
            }
          }
        }
      });

      $("#grid").kendoGrid({
        dataSource: dataSource,
        columns: [
          "ID",
          { field: "Value", editor: multiselectEditor},
          { command: ["edit"], title: "&nbsp;"}],
        editable: "inline"
      });

      function multiselectEditor(container, options) {
        $("<select data-bind='commaseparatedvalue: " + options.field + "'/>").appendTo(container).kendoMultiSelect({
          dataSource: ["Value1", "Value2", "Value3"]
        });
      }

    </script>
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
* [How to Show Custom Editor Using the Selected Item outside the Grid]({% slug howto_use_show_custom_editor_selected_item_outside_grid %})
* [How to Skip Non-editable Cells When Tabbing]({% slug howto_skip_noneditable_cells_when_tabbing_grid %})
* [How to Use AutoComplete as Custom Column Editor]({% slug howto_use_autocompleteas_custom_column_editor_grid %})
* [How to Use CRUD Operations When Grid Is Bound through MVVM]({% slug howto_use_crud_operationswith_mvvmbound_grid %})
* [How to Use Editors Based on Data Item Property]({% slug howto_use_editors_basedon_dataitem_property_grid %})
* [How to Use TreeView as Custom Editor]({% slug howto_usethe_treeview_aseditor_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
