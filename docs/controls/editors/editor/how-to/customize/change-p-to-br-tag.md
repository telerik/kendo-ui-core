---
title: Change the New-line Mode from P to Br tag
page_title: Change the New-line Mode from P to Br tag | Kendo UI Editor
description: "Learn how to set Change the New-line Mode from P to Br tag in a Kendo UI Editor widget."
slug: howto_change-p-to-br-tag_editor
---

# Change the New-line Mode from P to Br tag

The following example demonstrates how to change the default new-line behavior from inserting `<p>` tag to `<br>` tag.

```dojo
  <textarea id="editor"></textarea>
  <script>
    var defaultTools = kendo.ui.Editor.defaultTools;

    defaultTools["insertLineBreak"].options.shift = false;
    delete defaultTools["insertParagraph"].options;
    $("#editor").kendoEditor();
  </script>
```

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
