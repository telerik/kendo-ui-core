---
title: Implement Editor Shortcuts to Indent or Outdent a List
description: An example on how to implement shortcuts to indent or outdent an ordered list in a Kendo UI Editor.
type: how-to
page_title: Implement Shortcuts to Indent or Outdent Ordered Lists | Kendo UI Editor for jQuery
slug: editor-indent-list-shortcut
tags: kendo, kendoui, editor, shortcuts, tab, ordered, list, indent, outdent
ticketid: 1136197
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Editor</td>
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

How can I use `Tab` and `Shift`+`Tab` as shortcuts to indent or outdent an ordered list in the Kendo UI Editor?

## Solution

1. Handle the `keydown` event of the Kendo UI Editor.
1. Subscribe for the `keyCode` (`9`) of the `Tab` key.
1. Prevent the default operation.
1. Check if the `Shift` key is pressed.
1. Use the `exec` method to trigger the outdent command. Otherwise, use the same method and trigger the indent command.

```dojo
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
