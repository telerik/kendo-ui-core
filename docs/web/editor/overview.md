---
title: Overview
page_title: Overview | Kendo UI Editor Widget
description: "Learn how to initialize and configure the Kendo UI Editor widget."
slug: overview_kendoui_editor_widget
position: 1
---

# Editor Overview

[Kendo UI Editor widget](http://demos.telerik.com/kendo-ui/editor/index) allows you to create rich textual content by means of a `WYSIWYG` interfance. The generated widget value is an `XHTML` markup.

## Getting Started

### Initialize the Editor 

Initialize the Editor widget by using an existing `HTML` element and a jQuery selector:

      <textarea id="editor" rows="10" cols="30"></textarea>

      $(document).ready(function(){
          $("#editor").kendoEditor();
      });

## Modes 

The Editor assumes two mode types depending on the element from which it is created: classic and inline.

### Classic Mode

If you initialize the Editor from a `<textarea>`, it assumes its classic mode. The `textarea` is hidden and used to hold the value of the widget. A `contenteditable iframe` is created for you to type in. In the past, `iframes` were the only element which allowed content editability in most browsers.

The classic Editor is able to post its value automatically, because it is based on a `form` element. The Editor tools are always visible. The Editor's content does not reside on the main web page, so the page styling does not influence the editable content. If custom styles need to be applied to the editable content, they must be [injected via the Editor's configuration](/api/web/editor#configuration-stylesheets).

[Classic Editor Demo](http://demos.telerik.com/kendo-ui/web/editor/index.html)

### Inline Mode

If you initialize the Editor from a `<div>` or any other element (`<div>` elements are recommended in most cases), it assumes its inline mode. The originating element is made contenteditable and is used by the widget to return its value.

The inline Editor is not able to post its value and [this is something you must take care of](/web/editor/troubleshooting). The Editor tools are only visible when the widget is focused. The Editor's content resides on the main web page, so the page styling can influence the editable content.

[Inline Editor Demo](http://demos.telerik.com/kendo-ui/web/editor/inline-editing.html)

> **Important**  
> Due to the iOS Safari browser's limited `iframe` support, the inline mode of the Editor is recommended to use on iOS devices.

## Configuration

The Editor tools can be configured through the [`tools` configuration option](/api/web/editor#tools).

### Specify a Set of Editor Tools

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

###### Example - add a custom tool button

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

## Size

Before the Q3 2012 (2012.3.1114) release the Editor assumed the pixel offset width of the `<textarea>` from which it was created. As of now, the widget behaves in the following way:

* The Editor applies the width or height value, set via an inline style in the `<textarea>`, if such is available.
* If the `<textarea>` is not displaying such explicit values, the Editor applies a 100% width dimension and a deafult height of 250px.

If the `<textarea>` width and height аре applied via external CSS styles, use a similar approach to the Editor, e.g., by using its `k-editor` CSS class.

Note that `<textarea>` `cols` and `rows` are required attributes and they can influence the dimensions of a `<textarea>` element as well. However, browsers do not apply them in a consistent manner, so the Editor ignores them when its size is rendered.

## Readonly Functionality

You can temporarily make the Editor readonly by using the following approach:

    var editor = $("#editor").data("kendoEditor"),
        editorBody = $(editor.body);
     
    // make readonly
    editorBody.add("td", editorBody).removeAttr("contenteditable");
     
    // make editable
    editorBody.add("td", editorBody).attr("contenteditable", true);

## See Also

Other articles on Kendo UI Editor:

* [JavaScript API Reference](/api/javascript/ui/editor)
* [Image Browser]({% slug image_browser_editor_widget %})
* [Post-Process Content]({% slug post_process_content_editor_widget %})
* [Set Selections]({% slug set_selections_editor_widget %})
* [Prevent Cross-Site Scripting]({% slug prevent_xss_editor_widget %})
* [Troubleshooting]({% slug troubleshooting_editor_widget %})
* [Overview of the ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/editor/overview)
* [Overview of the JSP Tag](/jsp/tags/editor/overview)
* [Overview of the PHP Class](/php/widgets/editor/overview)