---
title: Appearance
page_title: jQuery Editor Documentation | Appearance
description: "Get started with the jQuery Editor by Kendo UI and set its size and use the default content styles or implement custom styles."
slug: appearance_kendoui_editor_widget
position: 13
---

# Appearance

The Editor provides options for [setting its size](#setting-the-size), [using the default styles](#using-the-default-styles), and [configuring custom styles](#setting-custom-styles).

## Setting the Size

Prior to the Q3 2012 (2012.3.1114) release, the Editor assumed the pixel offset width of the `<textarea>` from which it was created.

The current behavior of the widget exposes the following specifics:
* If a width or a height value is set through an inline style in the `<textarea>` element, the Editor applies it.
* If the `<textarea>` does not display such explicit values, the Editor applies a 100% width dimension and a default height of 250px.

If the `<textarea>` width and height are applied through external CSS styles, use a similar approach to the Editor&mdash;for example, by using its `k-editor` CSS class.

The `<textarea>`, `cols`, and `rows` attributes are required. They can influence the dimensions of a `<textarea>` element as well. However, browsers do not apply them in a consistent manner and the Editor ignores them when its size is rendered.

When you use the classic (iframe) Editor mode, the widget does not assume a very small height because it needs some minimum reasonable space for its toolbar and editable areas. The default widget height is 250px. To set a height less than 100px, use the [inline Editor mode]({% slug modes_kendoui_editor_widget %}#inline-mode). When you use the Editor MVC helper, apply the CSS class through `.HtmlAttributes()`.

The following example demonstrates how to set a height less than 200px.

```dojo
<style>

    table.small-editor
    {
        height: 100px;
    }

    table.small-editor iframe.k-content
    {
        height: 50px; /* 50px less than the Editor height */
    }

</style>

<p>Smallest possible height for the classic Editor is 100px:</p>
<textarea cols="20" rows="3" class="small-editor" name="classicEditor" id="classicEditor">&lt;Editor content&gt;</textarea>
<p>The smallest reasonable height for the inline Editor is 2em:</p>
<div id="inlineEditor" style="height:2em;"><p>Editor content</p></div>

<script>
    $(function () {
        // Initialize the classic Editor.
        $("#classicEditor").kendoEditor();
        // Apply custom sizing.
        $("textarea.small-editor").closest("table.k-editor").addClass("small-editor");
        // Initialize the inline Editor.
        $("#inlineEditor").kendoEditor();
    });
</script>
```

## Using the Default Styles

When the [classic Editor mode]({% slug modes_kendoui_editor_widget %}#classic-mode) is enabled, the Editor uses an `iframe` and applies some default CSS styles to its content. This behavior overrides the default browser styling that is demonstrated in the following example and which targets mainly headings, paragraphs, links, lists, and tables. All tables inside the Editor obtain a `k-table` class which is not included in the value of the widget.

    html,
    body {
      padding: 0;
      margin: 0;
      height: 100%;
      min-height: 100%;
    }

    body {
      font-size: 12px;
      font-family: Verdana,Geneva,sans-serif;
      margin-top: -1px;
      padding: 1px .2em 0;
      word-wrap: break-word;
    }

    h1 {
      font-size: 2em;
      margin: .67em 0;
    }

    h2 {
      font-size: 1.5em;
    }

    h3 {
      font-size: 1.16em;
    }

    h4 {
      font-size: 1em;
    }

    h5 {
      font-size: .83em;
    }

    h6 {
      font-size: .7em;
    }

    p {
      margin: 0 0 1em;
    }

    ul, ol {
      padding-left: 2.5em;
    }

    a {
      color: #00a;
    }

    code {
      font-size: 1.23em;
    }

    .k-table {
      table-layout: fixed;
      width: 100%;
      border-spacing: 0;
      margin: 0 0 1em;
    }

    .k-table td {
      min-width: 1px;
      padding: .2em .3em;
    }

    .k-table,
    .k-table td {
      outline: 0;
      border: 1px dotted #ccc;
    }

    .k-table p {
      margin: 0;
      padding: 0;
    }

To avoid the default content styles which the previous examples demonstrates, remove or override them after the Editor is initialized by executing the following code.

    var editor = $("#EditorID").data("kendoEditor");
    var styleTag = editor.body.parentNode.getElementsByTagName("style")[0];
    styleTag.parentNode.removeChild(styleTag);

## Setting Custom Styles

You can also use custom styles with [higher specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) selectors and inject those custom styles in an [Editor stylesheet](https://demos.telerik.com/kendo-ui/editor/styles). In such cases, you do not have to customize the Formatting tool of the Editor.

## See Also

* [Using the Styles of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/styles)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
