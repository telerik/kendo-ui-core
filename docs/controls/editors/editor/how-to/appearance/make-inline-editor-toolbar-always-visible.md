---
title: Make Inline Editor Toolbar Always Visible
page_title: Make Inline Editor Toolbar Always Visible | Kendo UI Editor
description: "Learn how to make the inline Editor toolbar always visible."
previous_url: /controls/editors/editor/how-to/make-inline-editor-toolbar-always-visible
slug: howto_make_inline_editor_toolbar_always_visible
---

# Make Inline Editor Toolbar Always Visible

By design, the toolbar of the inline Editor shows up when the widget is focused and gets hidden when the Editor is blurred.

It is possible to override this behavior.

The following example demonstrates how to force the toolbar to be always visible.

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

Other articles on the Kendo UI Editor:

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Get Reference to Child Widgets]({% slug howto_get_referenceto_child_widgets_editor %})
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
* [How to Set Caret Position]({% slug howto_set_caret_position_editor %})
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})

For more runnable examples on the Kendo UI Editor, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
