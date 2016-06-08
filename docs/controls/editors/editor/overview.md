---
title: Overview
page_title: Overview | Kendo UI Editor
description: "Learn how to initialize and configure the Kendo UI Editor widget."
slug: overview_kendoui_editor_widget
position: 1
---

# Editor Overview

The [Kendo UI Editor widget](http://demos.telerik.com/kendo-ui/editor/index) allows you to create rich textual content by means of a `WYSIWYG` interfance. The generated widget value is an `XHTML` markup.

## Getting Started

### Initialize the Editor

Initialize the Editor widget by using an existing `HTML` element and a jQuery selector.

###### Example

      <textarea id="editor" rows="10" cols="30"></textarea>

      $(document).ready(function(){
          $("#editor").kendoEditor();
      });

## Modes

The Editor assumes two mode types depending on the element from which it is created: classic and inline.

### Classic Mode

If you initialize the Editor from a `<textarea>`, it assumes its classic mode. The `textarea` is hidden and used to hold the value of the widget. A `contenteditable iframe` is created for you to type in. In the past, `iframes` were the only element which allowed content editability in most browsers.

The classic Editor is able to post its value automatically, because it is based on a `form` element. The Editor tools are always visible. The Editor's content does not reside on the main web page, so the page styling does not influence the editable content. If custom styles need to be applied to the editable content, they must be [injected via the Editor's configuration](/api/javascript/ui/editor#configuration-stylesheets).

[Classic Editor Demo](http://demos.telerik.com/kendo-ui/web/editor/index.html)

### Inline Mode

If you initialize the Editor from a `<div>` or any other element (`<div>` elements are recommended in most cases), it assumes its inline mode. The originating element is made contenteditable and is used by the widget to return its value.

The inline Editor is not able to post its value and [this is something you must take care of](/web/editor/troubleshoot/troubleshooting). The Editor tools are only visible when the widget is focused. The Editor's content resides on the main web page, so the page styling can influence the editable content.

[Inline Editor Demo](http://demos.telerik.com/kendo-ui/web/editor/inline-editing.html)

> **Important**  
>
> Due to the iOS Safari browser's limited `iframe` support, the inline mode of the Editor is recommended to use on iOS devices.

## Configuration

The Editor tools can be configured through the [`tools` configuration option](/api/web/editor#tools).

### Define Sets of Editor Tools

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

If you define no specific tools, the Editor creates its default set of tools for text formatting.

### Specify Custom Tools

Beside the available built-in tools, the Editor functionality can be extended through custom tools, defined in the `tools` array.

The example below demonstrates how to add a custom tool button.

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

The custom buttons get a `k-toolName` CSS class to allow styling, where `toolName` is the name specified in the custom tool configuration. Note that `undo` and `redo` are reserved tool names.

### Apply Readonly Functionality

You can make the Editor readonly by removing the `contenteditable` attribute of the widget's [`body`](/api/javascript/ui/editor#fields-body). While the Editor is readonly, the hyperlinks in its content become active and clicking on them will navigate the page. If this is undesired, prevent the hyperlink clicks.

###### Example

    var editor = $("#editor").data("kendoEditor"),
        editorBody = $(editor.body);

    // make readonly
    editorBody.removeAttr("contenteditable").find("a").on("click.readonly", false);

    // make editable
    editorBody.attr("contenteditable", true).find("a").off("click.readonly");

## Display

### Size

Before the Q3 2012 (2012.3.1114) release the Editor assumed the pixel offset width of the `<textarea>` from which it was created. As of now, the widget behaves in the following way:

* The Editor applies the width or height value, set via an inline style in the `<textarea>`, if such is available.
* If the `<textarea>` is not displaying such explicit values, the Editor applies a 100% width dimension and a deafult height of 250px.

If the `<textarea>` width and height аре applied via external CSS styles, use a similar approach to the Editor, e.g., by using its `k-editor` CSS class.

Note that `<textarea>` `cols` and `rows` are required attributes and they can influence the dimensions of a `<textarea>` element as well. However, browsers do not apply them in a consistent manner, so the Editor ignores them when its size is rendered.

When using the classic (iframe) mode, the Editor cannot assume a very small height, because it needs some minimum reasonable space for its toolbar and editable areas. The default widget height is 250px. To set a height, which is smaller than 200px, use the approach shown in the example below.

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

If the Editor's height should be smaller than 100px, then use the widget's [inline mode](#inline-mode).

When using the MVC wrapper of the Editor, apply the CSS class via `.HtmlAttributes()`.

### Default Content Styling

Kendo UI Editor uses an `iframe` and applies some default CSS styles to its content when the [classic mode](#classic-mode) is enabled. This allows the widget to override the default browser styling. The styles are shown in the code snippet below. They are targeting mostly headings, paragraphs, links, lists, and tables. All tables inside the Editor obtain a `k-table` class, which is not included in the widget's value.

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

There may be scenarios when the above styles are undesired and need to be removed or overridden. To remove all the styles, execute the following code after the Editor has been initialized:

    var editor = $("#EditorID").data("kendoEditor");
    var styleTag = editor.body.parentNode.getElementsByTagName("style")[0];
    styleTag.parentNode.removeChild(styleTag);

To override the above styles, use custom styles with [higher specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) selectors and inject those custom styles in an [Editor stylesheet](http://demos.telerik.com/kendo-ui/editor/styles). When doing so, it is not required to customize the widget's Formatting tool.

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
