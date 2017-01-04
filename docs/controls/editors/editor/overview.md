---
title: Overview
page_title: Overview | Kendo UI Editor
description: "Learn how to initialize and configure the Kendo UI Editor widget."
slug: overview_kendoui_editor_widget
position: 1
---

# Editor Overview

The [Kendo UI Editor widget](http://demos.telerik.com/kendo-ui/editor/index) allows you to create rich textual content through a What-You-See-Is-What-You-Get (WYSIWYG) interface.

The generated widget value is an `XHTML` markup.

## Getting Started

### Initialize the Editor

To initialize the Editor, use an existing `HTML` element and a jQuery selector.

###### Example

      <textarea id="editor" rows="10" cols="30"></textarea>

      $(document).ready(function(){
          $("#editor").kendoEditor();
      });

## Modes

Depending on the element from which the Editor is created, it assumes 2 mode types:
* The [classic mode type](#classic-mode).
* The [inline mode type](#inline-mode).

### Classic Mode

If you initialize the Editor from a `<textarea>` element, it assumes its classic mode. The `textarea` is not visible and is used to hold the value of the widget. You can type in the `contenteditable iframe` that is created. In the past, `iframes` used to be the only element that allowed for the content to be editable in most browsers.

The classic Editor posts its value automatically because it is based on a `form` element. The tools of the Editor are always visible. Its content does not reside on the main web page and the styling of the page does not influence the editable content. To apply custom styles to the editable content, [inject them through the configuration of the Editor](/api/javascript/ui/editor#configuration-stylesheets).

[Demo of the Classic Mode Editor](http://demos.telerik.com/kendo-ui/web/editor/index.html)

### Inline Mode

If you initialize the Editor from a `<div>`, it assumes its inline mode. The originating element is made content-editable and is used by the widget to return its value.

> **Important**
>
> While it is possible to initialize an inline Editor from a non-`div` element, such as `p` or `h1`, it is strongly recommended that you use the `<div>` one. Do not use `<table>` elements for creating inline Editors because of Internet Explorer browser limitations.

The inline Editor does not post its value. Posting the value of an inline Editor is a matter that [you need to take care of]({% slug troubleshooting_editor_widget %}). The tools of the Editor are only visible when the widget is focused. Its content resides on the main web page and the styling of the page influences the editable content.

[Demo of the Inline Mode Editor](http://demos.telerik.com/kendo-ui/web/editor/inline-editing.html)

> **Important**  
>
> Because of the limited `iframe` support provided by the iOS Safari browser, it is recommended to use the inline Editor mode on iOS devices.

## Configuration

To configure the Editor tools, use the [`tools`](/api/web/editor#tools) configuration option.

### Define Sets of Editor Tools

If you do not define a set of specific tools, the Editor creates a set of default tools for text formatting.

The following example demonstrates how to implement a set of specific Editor tools.

###### Example

       $(document).ready(function(){
          $("#editor").kendoEditor({
             tools: [
                 "bold",
                 "italic",
                 "underline",
                 "foreColor"
             ]
          });
      });

### Specify Custom Tools

Apart from the available built-in tools, the Editor functionality can be extended through custom tools that are defined in the `tools` array.

The following example demonstrates how to add a custom tool button. To allow styling where `toolName` is the name specified in the custom tool configuration, the custom buttons get a `k-toolName` CSS class. The `undo` and `redo` tool names are reserved.

###### Example

       $("#editor").kendoEditor({
           tools: [
               {
                   name: "toolName",
                   tooltip: "Custom editor tool",
                   exec: function(e) {
                       var editor = $(this).data("kendoEditor");

                       // execute command
                   }
               }
           ]
       });

### Apply Read-Only Functionalities

To make the Editor read-only, remove the `contenteditable` attribute of the [`body`](/api/javascript/ui/editor#fields-body) element. While the Editor is read-only, the hyperlinks in its content become active and clicking on them navigates the page. To avoid this behavior, prevent the hyperlink clicks.

The following example demonstrates how to apply a read-only functionality to the Editor.

###### Example

    var editor = $("#editor").data("kendoEditor"),
        editorBody = $(editor.body);

    // make readonly
    editorBody.removeAttr("contenteditable").find("a").on("click.readonly", false);

    // make editable
    editorBody.attr("contenteditable", true).find("a").off("click.readonly");

## Display

The Editor provides options for configuring its appearance, such as its size.

### Size

Prior to the Q3 2012 (2012.3.1114) release, the Editor assumed the pixel offset width of the `<textarea>` from which it was created.

The current behavior of the widget is as follows:

* If a width or a height value is set through an inline style in the `<textarea>` element, the Editor applies it.
* If the `<textarea>` does not display such explicit values, the Editor applies a 100% width dimension and a default height of 250px.

If the `<textarea>` width and height are applied through external CSS styles, use a similar approach to the Editor&mdash;for example, by using its `k-editor` CSS class.

The `<textarea>`, `cols`, and `rows` attributes are required. They can influence the dimensions of a `<textarea>` element as well. However, browsers do not apply them in a consistent manner and the Editor ignores them when its size is rendered.

When using the classic (iFrame) mode, the Editor does not assume a very small height because it needs some minimum reasonable space for its toolbar and editable areas. The default widget height is 250px.

To set a height that is smaller than 200px, use the approach demonstrated in the following example.

###### Example

```html
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
        // initialize the classic Editor
        $("#classicEditor").kendoEditor();
        // apply custom sizing
        $("textarea.small-editor").closest("table.k-editor").addClass("small-editor");

        // initialize the inline Editor
        $("#inlineEditor").kendoEditor();
    });

</script>
```

To set a height that is smaller than 100px, use the [inline mode](#inline-mode) of the Editor.

When using the MVC wrapper of the Editor, apply the CSS class through `.HtmlAttributes()`.

### Default Content Styling

When the [classic mode](#classic-mode) is enabled, the Editor uses an `iframe` and applies some default CSS styles to its content. This behavior overrides the default browser styling that are shown in the following example and that target mainly headings, paragraphs, links, lists, and tables. All tables inside the Editor obtain a `k-table` class, which is not included in the value of the widget.

###### Example

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

To avoid the default content styles demonstrated in the previous example, remove or override them after the Editor is initialized by executing the following code.

    var editor = $("#EditorID").data("kendoEditor");
    var styleTag = editor.body.parentNode.getElementsByTagName("style")[0];
    styleTag.parentNode.removeChild(styleTag);

You can also use custom styles with [higher specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) selectors and inject those custom styles in an [Editor stylesheet](http://demos.telerik.com/kendo-ui/editor/styles). In such cases, you do not have to customize the Formatting tool of the Editor.

## See Also

Other articles on the Kendo UI Editor:

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [Image Browser]({% slug image_browser_editor_widget %})
* [Post-Process Content]({% slug post_process_content_editor_widget %})
* [Set Selections]({% slug set_selections_editor_widget %})
* [Prevent Cross-Site Scripting]({% slug prevent_xss_editor_widget %})
* [Pasting]({% slug pasting_editor_widget %})
* [Troubleshooting]({% slug troubleshooting_editor_widget %})
* [Overview of the ASP.NET MVC HtmlHelper Extension of the Editor Widget](/aspnet-mvc/helpers/editor/overview)
* [Overview of the Editor JSP Tag]({% slug overview_editor_uiforjsp %})
* [Overview of the Editor PHP Class](/php/widgets/editor/overview)

For how-to examples on the Kendo UI Editor widget, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
