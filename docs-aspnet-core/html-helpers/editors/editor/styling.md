---
title: Styling of Content
page_title: Styling of Content | Kendo UI Editor HtmlHelper for ASP.NET Core
description: "Learn how to apply styles to the Kendo UI Editor HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_editor_styling_aspnetcore
position: 8
---

# Styling of Content

The Editor HtmlHelper provides default and custom options for styling its content.

## Default Options

When the [classic mode]({% slug htmlhelpers_editor_modes_aspnetcore %}#classic-mode) is enabled, the Editor uses an `iframe` and applies some default CSS styles to its content. This behavior overrides the default browser styling.

The following example targets mainly headings, paragraphs, links, lists, and tables. All tables inside the Editor obtain a `k-table` class which is not included in the value of the widget.

###### Example

```css
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
```

To avoid the default content styles from the previous example, remove or override them after the Editor is initialized by executing the following code.

###### Example

```
@(Html.Kendo().Editor()
    .Name("editor")
    .Value(@<text>
        <p>
            Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.
        </p>
    </text>)
)

<script type="text/javascript">
    $(document).ready(function() {
        var editor = $("#editor").data("kendoEditor");
        var styleTag = editor.body.parentNode.getElementsByTagName("style")[0];
        styleTag.parentNode.removeChild(styleTag);
    });
</script>
```

## Custom Styles

You can also use custom styles with [higher specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) selectors and inject those custom styles in an [Editor stylesheet](https://demos.telerik.com/aspnet-core/editor/styles). In such cases, you do not have to customize the Formatting tool of the Editor.

## See Also

* [Overview of the Editor HtmlHelper]({% slug htmlhelpers_editor_aspnetcore %})
* [Modes of Operation]({% slug htmlhelpers_editor_modes_aspnetcore %})
* [Tools]({% slug htmlhelpers_editor_tools_aspnetcore %})
* [Pasting Content]({% slug htmlhelpers_editor_pasting_aspnetcore %})
* [Serialize / Deserialize Content]({% slug htmlhelpers_editor_serialize_aspnetcore %})
* [Image Browser]({% slug htmlhelpers_editor_image_browser_aspnetcore %})
* [Immutable Elements]({% slug htmlhelpers_editor_immutable_aspnetcore %})
