---
title: Kendo Editor Shortcuts to Indent/Outdent a List
description: An example on how to implement a shortcuts to indent and outdent an ordered list in Kendo Editor 
type: how-to
page_title: Implement Shortcuts for Indent and Outdent to an ordered list | Kendo UI Editor
slug: editor-indent-list-shortcut
position: 0
tags: kendo, kendoui, editor, shortcuts, tab, ordered, list, indent, outdent
ticketid: 1136197
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Editor for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
</table>


## Description

How to use **Tab** and **Shift+Tab** as shortcuts to indent and outdent a ordered list in Kendo Editor

## Solution

The implementation for such shortcuts, could be applyed by the following steps:

1. Handle the keydown event of Kendo Editor.
1. Subscribe for the Tab key's keyCode (9) and prevent the default operation.
1. Check if Shift key is pressed and use the **exec** method to trigger the outdent command.
1. Otherwise, use the same method and trigger the indent command. 

```html
<textarea id="editor"></textarea>
<script>
$("#editor").kendoEditor({
  keydown: function(e) {
    if(e.keyCode == 9) {
        if(e.shiftKey) {
           e.sender.exec("outdent");
        }
        else {
           e.sender.exec("indent");
        }      
      	e.preventDefault();
    }
  }
});
</script>

```
