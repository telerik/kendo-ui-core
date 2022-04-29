---
title: Use Detail Template Editors in Inline Editing Modes
page_title: Inline Editing Detail Template | Kendo UI Grid for jQuery
description: "An example on how to edit records by using a detail template along with the inline editing mode of the Kendo UI Grid widget for jQuery."
previous_url: /controls/data-management/grid/how-to/Editing/edit-grid-in-inline-editing-mode-with-detail-template
slug: howto_edit_records_via_detail_template_editor_in_inline_mode
tags: grid, detail, template, inline, edit, mode, editors
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I edit records by using a detail template along with the inline editing mode of the Kendo UI Grid widget for jQuery?

## Solution

You project might require you to edit records by using a detail template along with the inline editing mode of the Grid.

To achieve this behavior:

* Use the [`detailTemplate`](/api/javascript/ui/grid/configuration/detailtemplate) configuration option to create a template that contains the views for both the read-only and the editing mode.
* Handle the [`edit` event](/api/javascript/ui/grid/events/edit) to bind the custom editor from the detail template to the respective model field. Toggle the visibility of the detail template views&mdash;that is, show the editor and hide the one, used for displaying the value.
* Similarly, handle the [`save`](/api/javascript/ui/grid/events/save) and the [`cancel`](/api/javascript/ui/grid/events/cancel) events to toggle back the detail template views.

The following example demonstrates how to edit records by using a different detail template in the editing mode of the Grid.

```dojo
<script id="detail-template" type="text/x-kendo-template">
  <div id="text-container">
    #: text #
  </div>
  <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="">
    <textarea style="display: none;" id="text-editor" class="!k-overflow-y-auto k-input-inner" rows="10" cols="100" data-bind="value:text">
       #: text #
    </textarea>
  </span>
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
    // Custom transport with local data for demo purposes.
    transport: {
      read: function(options){
        options.success(data);
      },
      update: function(options){
        var updatedItem = options.data;

            // Save the updated item to the original datasource.
            data.splice(updatedItem.id - 1, 1, updatedItem);

            // On success.
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

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
