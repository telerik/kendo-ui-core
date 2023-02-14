---
title: Handle Blur and Focus Events in the Editor
page_title: Handle Blur and Focus Events in the Editor
description: "Learn how to handle the blur and the focus events of a Kendo UI Editor."
previous_url: /controls/editors/editor/how-to/handle-blur-and-focus-events, /controls/editors/editor/how-to/appearance/handle-blur-and-focus-events
slug: howto_handleblurandfocusevents_editor
tags: telerik, kendo, jquery, editor, handle, blur, focus, events
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

How can I handle `focus` and `blur` events in the Kendo UI for jQuery Editor?

## Solution

The Editor does not expose `focus` and `blur` events as built-in functionalities.

However, regardless of the initialization mode you apply to the widget, you can handle them by using JavaScript.

The following example demonstrates how to handle the `blur` and the `focus` events of the Editor.

```dojo
    <style>
      #editor{
        position: absolute;
        width: 90%;
        top: 60px;
      }
    </style>
    <body>
      <textarea id="editor"></textarea>
      <script>
        var editor = $('#editor').kendoEditor().data('kendoEditor');
        $(editor.body).focus(function(){
          console.log('Focus');
        }).blur(function(){
          console.log('Blur')
        });
      </script>
```

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
