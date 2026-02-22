---
title: Preventing Image Drops in the Kendo UI Editor
description: Learn how to stop users from dropping images into the Kendo UI Editor.
type: how-to
page_title: How to Disable Image Drop in Kendo UI Editor
slug: prevent-image-drops-kendo-ui-editor
tags: kendo-ui, editor, image-drop, paste-event
res_type: kb
components: ["editor"]
ticketid: 1673555
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® Editor</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description
I want to prevent users from dropping images into the [Editor for Progress® Kendo UI®](https://docs.telerik.com/kendo-ui/controls/editors/editor/overview). This knowledge base article also answers the following questions:
- How can I stop images from being pasted into the Editor?
- What method can I use to block image drops in the Editor?
- Is there a way to disable image pasting in the Editor?

## Solution
To prevent an image from being dropped into the Editor, utilize the [`paste`](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor/events/paste) event. In the event handler, check if the pasted content includes an `<img>` tag and stop the event's propagation if it does. 

Here's how you can implement this solution:

```dojo
<textarea id="editor"></textarea>
<script>
$("#editor").kendoEditor({
  paste: function(e) {
    if(e.html.includes("img")) {
      e.stopPropagation();
    }
  }
});
</script>
```

This code checks the HTML content being pasted and cancels the event if an `<img>` tag is found, effectively preventing the image from being dropped into the Editor.

## See Also
- [Editor Overview Documentation](https://docs.telerik.com/kendo-ui/controls/editors/editor/overview)
- [Kendo UI Editor API Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
