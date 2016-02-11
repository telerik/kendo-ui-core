---
title: Make Inline Editor Toolbar Always Visible
page_title: Make Inline Editor Toolbar Always Visible
description: "Learn how to make the inline Editor toolbar always visible."
slug: howto_make_inline_editor_toolbar_always_visible
---

# Make Inline Editor Toolbar Always Visible

By design, the inline Editor's toolbar shows up when the widget is focused and is hidden when the Editor is blurred.

The example below demonstrates how to force the toolbar to be always visible.

###### Example

```html
    <p>The Editor toolbar will remain visible after blurring the widget.</p>
    <br /><br /><br />
    <div id="editor">
        <p>Editor content</p>
    </div>

    <script>

    $(function(){
        $("#editor").kendoEditor({
        });

        // example start

        // retrieve the Editor widget object
        var editor = $("#editor").data("kendoEditor");

        // show the toolbar
        editor.toolbar.show();

        // detach the handler which hides the toolbar
        $(editor.body).addClass("k-state-active").off("focusout.kendoEditor");
    });

    </script>
```

## See Also

Other articles on Kendo UI Editor:

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
