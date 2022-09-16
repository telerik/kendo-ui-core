---
title: Read-Only Editor
page_title: jQuery Editor Documentation | Read-Only Editor
description: "Get started with the jQuery Editor by Kendo UI and set the widget in its read-only state."
slug: readonly_kendoui_editor_widget
position: 2
---

# Read-Only Editor

You can render the Editor in its read-only state by removing the `contenteditable` attribute of the [`body`](/api/javascript/ui/editor#fields-body) element.

Even though the Editor is read-only, the hyperlinks in its content are active and the user can click them and navigate to the respective page. To disable hyperlinks in the read-only Editor, prevent the clicking of hyperlinks.

    var editor = $("#editor").data("kendoEditor"),
        editorBody = $(editor.body);

    // Make the Editor read-only.
    editorBody.removeAttr("contenteditable").find("a").on("click.readonly", false);

    // Make the Editor editable.
    editorBody.attr("contenteditable", true).find("a").off("click.readonly");

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
