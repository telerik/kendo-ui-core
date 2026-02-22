---
title: Opening the Table Wizard in Kendo UI Editor Using the exec Command
description: Learn how to open the Table Wizard dialog in the Kendo UI for jQuery Editor by using the exec command.
type: how-to
page_title: How to Open the Table Wizard Dialog in Kendo UI for jQuery Editor
slug: how-to-open-table-wizard-kendo-ui-editor
tags: kendo-ui, editor, tablewizard, exec-command
res_type: kb
components: ["editor"]
ticketid: 1678934
---

## Description

When working with the [Editor for Progress® Kendo UI®](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor), there might be a need to programmatically open the `Table Wizard` dialog. This is possible by using the `exec` command with a specific argument. This knowledge base article also answers the following questions:

- How to open the Table Wizard dialog in Kendo UI Editor?
- How to link the Table Wizard opening with a button click in Kendo UI Editor?
- How to use the `exec` command to open dialogs in Kendo UI Editor?

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Editor for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.211</td>
</tr>
</tbody>
</table>

## Solution

To open the `Table Wizard` dialog in the Kendo UI Editor, use the `exec` command with the argument `tableWizardInsert`. This command can be tied to a button click event or any other event in your application.

Here's an example of how to achieve this:

```javascript
$('#editor').data('kendoEditor').exec('tableWizardInsert');
```

This code snippet gets the instance of the Kendo UI Editor and executes the `tableWizardInsert` command, which opens the Table Wizard dialog.

For a practical demonstration, refer to the example below:

```dojo
    <button id='openWizard'>tableWizard</button>
    <textarea id="editor" rows="10" cols="30" style="width:100%; height:840px" aria-label="editor">

    </textarea>

    <script> 
      var editor = $("#editor").kendoEditor({
        tools: [
          "tableWizard",
          "tableProperties",
          "tableCellProperties",
          "createTable",
          "addRowAbove",
          "addRowBelow",
          "addColumnLeft",
          "addColumnRight",
          "deleteRow",
          "deleteColumn",
          "mergeCellsHorizontally",
          "mergeCellsVertically",
          "splitCellHorizontally",
          "splitCellVertically",
          "tableAlignLeft",
          "tableAlignCenter",
          "tableAlignRight"
        ]
      });

      $("#openWizard").click(function(){
        $('#editor').data('kendoEditor').exec('tableWizardInsert');
      })
    </script>
```

## See Also

- [Kendo UI Editor Overview](https://docs.telerik.com/kendo-ui/controls/editor/overview)
- [Kendo UI Editor Exec Command Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor/methods/exec)
