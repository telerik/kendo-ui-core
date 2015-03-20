---
title: Overview
page_title: Overview of Editor UI widget | Kendo UI Documentation
description: The documentation guide will help you initialize Kendo web editor and proceed with its configuration.
position: 1
---

# Editor Overview

The Editor allows users to create rich text content by means of a WYSIWYG interfance. The generated widget value is an XHTML markup.

## Getting Started

### Creating an **Editor** from existing HTML element

      <textarea id="editor" rows="10" cols="30"></textarea>

### Initialize the Kendo Editor

      $(document).ready(function(){
          $("#editor").kendoEditor();
      });

## Classic Mode vs Inline Mode

The Editor's mode is determined by the element from which the widget is created.

* If the Editor is initialized from a `textarea`, it will assume its "classic" mode. The `textarea` will be hidden and it will be used to hold the widget value.
A **contenteditable iframe** will be created for the user to type in. In the past, iframes were the only element, which allowed content editability in most browsers.
* If the Editor is initialized from a `div` or any other element (divs are recommended in most cases), it will assume its "inline" mode.
The originating element will be made **contenteditable** and it will be used by the widget to return its value.

The major differences between the two modes are:

* The classic Editor is able to post its value automatically, because it is based on a form element. The Editor tools are always visible. The Editor's content does not reside on the main web page, so the page styling does not
influence the editable content. If custom styles need to be applied to the editable content, they should be [injected via the Editor's configuration](/api/web/editor#configuration-stylesheets).
[Classic Editor Demo](http://demos.telerik.com/kendo-ui/web/editor/index.html)
* The inline Editor is not able to post its value and [this should be taken care of by the developer](/web/editor/troubleshooting).
The Editor tools are only visible when the widget is focused. The Editor's content resides on the main web page, so the page styling can influence the editable content.
[Inline Editor Demo](http://demos.telerik.com/kendo-ui/web/editor/inline-editing.html)

## Configuring the Editor

The editor tools can be configured through the [`tools` configuration option](/api/web/editor#tools).

### Specifying a set of Editor tools

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

If no specific tools are defined, the Editor will create its default set of tools for text formatting.

## Specifying custom tools

The Editor functionality can be extended through custom tools, defined in the `tools` array alongside built-in tools.

### Adding a custom tool button

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

The custom buttons get a **k-toolName** CSS class to allow styling (where `toolName` is the name specified in the custom tool configuration). **Please note that "undo" and "redo" are reserved tool names.**

## Sizing

Until version **2012.3.1114 (Q3 2012)** the Editor assumed the pixel offset width of the `textarea` from which it was created. From this moment on, the widget behaves in the following way:

* If explicit width or height is set to the `textarea` via inline style, the Editor will apply the same
* Otherwise, the Editor will be 100% wide and will apply its default height of 250px

If the `textarea` has width and height applied via external CSS styles, a similar approach should be used for the Editor, e.g. by using its `k-editor` CSS class.

Textarea `cols` and `rows` attributes are required and they also can incluence the dimensions of a `textarea` element, however, these attributes are not applied in a consistent manner by browsers,
so the Editor ignores them when determining its size.

## Making the Editor readonly

The Editor can be made temporarily readonly by using the following approach:

    var editor = $("#editor").data("kendoEditor"),
        editorBody = $(editor.body);
     
    // make readonly
    editorBody.add("td", editorBody).removeAttr("contenteditable");
     
    // make editable
    editorBody.add("td", editorBody).attr("contenteditable", true);
