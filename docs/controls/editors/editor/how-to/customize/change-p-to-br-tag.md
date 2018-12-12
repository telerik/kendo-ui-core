---
title: Change the New-line Mode from P to Br tag
page_title: Change the New-line Mode from P to Br tag | Kendo UI Editor
description: "Learn how to set Change the New-line Mode from P to Br tag in a Kendo UI Editor widget."
slug: howto_change-p-to-br-tag_editor
---

# Change the New-line Mode from P to Br tag

The example here demonstrates a way to change the default new-line behavior from inserting `<p>` tag to `<br>` tag.

###### Example

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

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Get Reference to Child Widgets]({% slug howto_get_referenceto_child_widgets_editor %})
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})

For more runnable examples on the Kendo UI Editor, browse its [**How To** documentation folder]({% slug howto_handleblurandfocuseventsangular_editor %}).
