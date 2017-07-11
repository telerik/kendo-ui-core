---
title: Integrate Editor and Dialog
description: An example on how to integrate Kendo UI Editor and Dialog widgets.
type: how-to
page_title: Integrate Editor and Dialog widgets
slug: integrate-editor-in-dialog
position: 
tags: integrate,editor,dialog
ticketid: 1118201
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Editor for Progress Kendo UI</td>
  <td>Dialog for Progress Kendo UI</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Tested up to version 2017.2.621</td>
 </tr>
</table>

## Description
How to display the Kendo UI Editor in a Dialog?

## Solution
The following example shows how the Editor can be initialized in a Dialog and the Editor's value displayed in an external div element. 

```html
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
