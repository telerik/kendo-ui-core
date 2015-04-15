---
title: Use Kendo UI Inline Editor inside a Window
page_title: Use Kendo UI Inline Editor inside a Window
description: Use Kendo UI Inline Editor inside a Window
---

# Use Kendo UI Inline Editor inside a Window

The inline Editor uses a popup toolbar, which is placed inside a Kendo UI Window instance.
When several Kendo UI Window instances are open, the last focused one always moves on top of all others, which can lead to the Editor toolbar being hidden behind
the Window instance that holds the Editor.

The example below demonstrates how to handle such a scenario. A fixed `z-index` style should be enforced to the Window, which holds the Editor.
An `!important` clause should be used with the `z-index` style.

#### Example

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
