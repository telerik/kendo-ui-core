---
title: Integrate Editor into Dialog
description: An example on how to integrate the Kendo UI Editor into the Kendo UI Dialog widget.
type: how-to
page_title: Integrate Editor into Dialog Widget | Kendo UI Editor for jQuery
slug: integrate-editor-in-dialog
tags: integrate, editor, dialog
ticketid: 1118201
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Editor</td>
  <td>Progress Kendo UI Dialog</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Tested up to version 2017.2.621</td>
 </tr>
</table>

## Description

How can I display the Kendo UI Editor in a Kendo UI Dialog?

## Solution

Initialize the Kendo UI Editor in the Dialog by displaying the value of the Editor in an external `div` element.

```dojo
<div id="editorDialog">
 <textarea id="editor"></textarea>
</div>

Content:
<div id="content" style="border: 2px solid black; width: 100%; height:300px; overflow: auto;">
  <h1>Sample</h1>
</div>

<button id="openBtn" class="k-button" type="button">Update Content</button>

<script>
var editor = $("#editor").kendoEditor()
    .data("kendoEditor");

    var dialog = $("#editorDialog").kendoDialog({
        width: "500px",
        title: "Editor",
        visible: false,
        actions: [
            { text: 'OK', primary: true, action: updateText },
            { text: 'Cancel'}
        ],
        open: function(){
            editor.refresh();
        }
    }).data("kendoDialog");

    $("#openBtn").click(function(){
        dialog.open();
    });

    function updateText(){
        $("#content").html(editor.value());
    }
</script>
<style>
    .k-dialog .k-content.k-window-content.k-dialog-content,
    .k-dialog .k-content iframe.k-content{
        padding: 0;
        margin: 0;
    }
</style>
```
