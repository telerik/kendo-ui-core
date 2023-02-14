---
title: Make the Inline Editor Toolbar Always Visible
page_title: Make the Inline Editor Toolbar Always Visible
description: "Learn how to make the inline Editor toolbar always visible."
previous_url: /controls/editors/editor/how-to/make-inline-editor-toolbar-always-visible, /controls/editors/editor/how-to/appearance/make-inline-editor-toolbar-always-visible
slug: howto_make_inline_editor_toolbar_always_visible
tags: telerik, kendo, jquery, editor, make, inline, toolbar, always, visible
component: editor
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Editor for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I always show the toolbar of the Kendo UI for jQuery Editor?

## Solution

By design, the toolbar of the inline Editor shows up when the widget is focused and gets hidden when the Editor is blurred.

The following example demonstrates how to override this behavior and force the toolbar to be always visible.

```dojo
    <p>The Editor toolbar will remain visible after blurring the widget.</p>
    <br /><br /><br />
    <div id="editor">
        <p>Editor content</p>
    </div>

    <script>

    $(function(){
        $("#editor").kendoEditor({
        });

        // The start of the example.
        // Retrieve the Editor widget object.
        var editor = $("#editor").data("kendoEditor");
        // Show the toolbar.
        editor.toolbar.show();
        // Detach the handler which hides the toolbar.
        $(editor.body).addClass("k-active").off("focusout.kendoEditor");
    });

    </script>
```

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
