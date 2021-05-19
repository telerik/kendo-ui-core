---
title: Use Inline Editor inside Kendo UI Windows
page_title: Use Inline Editor inside Kendo UI Windows | Kendo UI Editor
description: "Learn how to use an inline Kendo UI Editor inside a window."
previous_url: /controls/editors/editor/how-to/inline-editor-inside-window
slug: howto_use_inline_editor_inside_windows_editor
---

# Use Inline Editor inside Kendo UI Windows

The inline Editor uses a popup toolbar, which is placed inside a Kendo UI Window instance.

When several Kendo UI Window instances are open, the most recently focused one always moves on top of all others. This might lead to the Editor toolbar being hidden behind the Window instance that holds the Editor itself.

The following example demonstrates how to handle such a scenario by:
* Enforcing a fixed `z-index` style to the Window that holds the Editor.
* Using an `!important` clause with the `z-index` style.

```dojo
<style>

.zIndexEnforce
{
    /* '!important' is required to override an existing inline style. */
    /* The z-index value itself can be arbitrary. */
    z-index: 12345 !important;
}

</style>

<div id="window">
    <p>This is a Kendo UI Editor in inline mode.<br />foo<br />bar</p>
    <div id="editor" style="height:200px"></div>
</div>

<script>
// The following initialization code will be
// generated automatically when using Kendo UI helpers.
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

// When using Kendo UI helpers, place or call the following code
// after the Window declaration.
$(function() {
    var w = $("#window").data("kendoWindow");
    w.wrapper.addClass("zIndexEnforce");
    w.center().open();
});

</script>
```

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
