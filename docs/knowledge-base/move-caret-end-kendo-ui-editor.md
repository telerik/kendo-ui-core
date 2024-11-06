---
title: Moving the Caret to the End of the Kendo UI Editor
description: Learn how to set the focus and move the caret to the end of the content within the Kendo UI Editor.
type: how-to
page_title: How to Focus and Position the Caret at the End in Kendo UI Editor
slug: move-caret-end-kendo-ui-editor
tags: kendo ui, editor, caret, focus, text, content
res_type: kb
ticketid: 1669031
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Editor for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.3.1015</td>
</tr>
</tbody>
</table>

## Description

I want to move the focus and the caret to the end of the content within the [Editor](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor) for Progress® Kendo UI®. How can I achieve this?

This KB article also answers the following questions:
- How to append text and move the caret to its end in the Kendo UI Editor?
- How to programmatically focus the Kendo UI Editor and position the caret at the end?
- How to manipulate the caret position in the Kendo UI Editor?

## Solution

To set the focus and move the caret to the end of the content in the Kendo UI Editor, follow these steps:

1. Use the Editor's API to append text to the current content.
2. Create a range object and use it to select the content of the Editor.
3. Collapse the range to the end to move the caret position after the appended text.
4. Finally, use the [`selectRange`](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor/methods/selectrange) method of the Editor to apply the range and move the caret.

Here is a sample code snippet demonstrating the process:

```dojo
<div id="example">
    <p><button id="changeContent">Change Content</button></p>
    <textarea id="editor">Some text to focus and edit.</textarea>
</div>

<script>
  $(document).ready(function() {
    $("#editor").kendoEditor();

    $("#changeContent").click(function () {
      var editor = $("#editor").data("kendoEditor");
      editor.value(editor.value() + " text");
      
      var range = editor.getRange() || editor.createRange();
      range.selectNodeContents(editor.body);
      range.collapse(false); // Collapse to end
      editor.selectRange(range);
    });
  });
</script>
```

This code sets up a basic Kendo UI Editor and a button. When the button is clicked, it appends the text " text" to the current content of the Editor and moves the caret to the end of this new content.

## See Also

- [Official Kendo UI Editor Documentation](https://docs.telerik.com/kendo-ui/controls/editor/overview)
- [Editor API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
