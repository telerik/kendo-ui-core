---
title: Use Detail Template Editors in Inline Editing Modes
page_title: Use Detail Template Editors in Inline Editing Modes | Kendo UI Grid
description: "Learn how to edit records by using a different detail template in the editing mode of the Kendo UI Grid."
slug: howto_edit_records_via_detail_template_editor_in_inline_mode
---

# Use Detail Template Editors in Inline Editing Modes

You project might require you to edit records by using a detail template along with the inline editing mode of the Grid.

To achieve this behavior:

* Use the [`detailTemplate`](/api/javascript/ui/grid#configuration-detailTemplate) configuration option to create a template that contains the views for both the read-only and the editing mode.
* Handle the [`edit` event](/api/javascript/ui/grid#events-edit) to bind the custom editor from the detail template to the respective model field. Toggle the visibility of the detail template views&mdash;that is, show the editor and hide the one, used for displaying the value.
* Similarly, handle the [`save`](/api/javascript/ui/grid#events-save) and the [`cancel`](/api/javascript/ui/grid#events-cancel) events to toggle back the detail template views.

The following example demonstrates how to edit records by using a different detail template in the editing mode of the Grid.

###### Example

```html
<script id="detail-template" type="text/x-kendo-template">
  <div id="text-container">
    #: text #
  </div>
  <textarea style="display: none;" id="text-editor" rows="10" cols="100" data-bind="value:text">
    #: text #
  </textarea>
</script>
<div id="grid"></div>
<script>
  var data = [
    { id: 1, from: "Jane Doe", to: "Someone else", cc: "Boss", text: "Message content" },
    { id: 2, from: "John Doe", to: "Jane Doe", cc: "Manager", text: "Other message content" }
  ];

$("#grid").kendoGrid({
  columns: [
    { field: "from" },
    { field: "to" },
    { field: "cc" },
    { command: ["edit", "destroy"] }
  ],
  dataSource: {
    // custom transport with local data for demo purposes
    transport: {
      read: function(options){
        options.success(data);
      },
      update: function(options){
        var updatedItem = options.data;

            // save the updated item to the original datasource
            data.splice(updatedItem.id - 1, 1, updatedItem);

            // on success
            options.success();
      },
      create: function(options){
        options.data.id = data.length;
        data.push(options.data);
        options.success()
      },
      destroy: function(options){
        var indexToDelete;
        data.forEach(function(item, index){
          if(item.id === options.data.id){
            indexToDelete = index;
            return;
          }
        });

        data.splice(indexToDelete, 1);
        options.success();
      }
    },
    schema: {
      model: {
        id: 'id',
        fields: {
          text: {
            defaultValue: ''
          }
        }
      }
    }
  },
	edit: function(e){
    e.sender.expandRow(e.container);
    var detailRow = e.container.next('.k-detail-row');
    		detailRow.find('#text-container').toggle();
    		detailRow.find('#text-editor').toggle();
        var model = e.model;
        kendo.bind(detailRow, model);
        model.bind('change', function(e){
          var tr = $('tr[data-uid=' + model.uid + ']');
        })
  },
  save: function(e){
    var detailRow = e.container.next('.k-detail-row');
    		detailRow.find('#text-container').toggle();
    		detailRow.find('#text-editor').toggle();

  },
  cancel: function(e){
    var detailRow = e.container.next('.k-detail-row');
    		detailRow.find('#text-container').toggle();
    		detailRow.find('#text-editor').toggle();
  },
  detailTemplate: kendo.template($("#detail-template").html()),
  toolbar: ['create'],
  editable: 'inline',
});
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
