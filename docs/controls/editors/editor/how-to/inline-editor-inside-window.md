---
title: Use Inline Editor inside Windows
page_title: Use Inline Editor inside Windows | Kendo UI Editor
description: "Learn how to use an inline Kendo UI Editor inside a window."
slug: howto_use_inline_editor_inside_windows_editor
---

# Use Inline Editor inside Windows

The inline Editor uses a popup toolbar, which is placed inside a Kendo UI Window instance. When several Kendo UI Window instances are open, the recently focused one always moves on top of all others. This may lead to the Editor toolbar being hidden behind the Window instance that holds the Editor itself.

The example below demonstrates how to handle such a scenario. Enforce a fixed `z-index` style to the Window that holds the Editor. Use an `!important` clause with the `z-index` style.

###### Example

```html
<style>

.zIndexEnforce
{
    /* '!important' is required to override an existsing inline style */
    /* the z-index value itself can be arbitrary */
    z-index: 12345 !important;
}

</style>

<div id="window">
    <p>This is a Kendo UI Editor in inline mode.<br />foo<br />bar</p>
    <div id="editor" style="height:200px"></div>
</div>

<script>
// the widget initialization code below will be
// generated automatically when using Kendo UI server wrappers
$(function() {
    $("#window").kendoWindow({
        title: "Window",
        width: 600,
        height: 350,
        visible: false
    });

    $("#editor").kendoEditor();
});
// widget initialization code end

// when using Kendo UI wrappers, place or call the following code
// after the Window declaration
$(function() {
    var w = $("#window").data("kendoWindow");
    w.wrapper.addClass("zIndexEnforce");
    w.center().open();
});

</script>

```

## See Also

Other articles on the Kendo UI Editor and how-to examples::

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Get Reference to Child Widgets]({% slug howto_get_referenceto_child_widgets_editor %})
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
* [How to Set Caret Position]({% slug howto_set_caret_position_editor %})
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})

For more runnable examples on the Kendo UI Editor, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
