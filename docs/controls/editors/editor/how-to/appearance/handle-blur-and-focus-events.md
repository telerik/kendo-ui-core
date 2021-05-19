---
title: Handle Blur and Focus Events
page_title: Handle Blur and Focus Events | Kendo UI Editor
description: "Learn how to handle the blur and the focus events of a Kendo UI Editor."
previous_url: /controls/editors/editor/how-to/handle-blur-and-focus-events
slug: howto_handleblurandfocusevents_editor
---

# Handle Blur and Focus Events

The Editor does not expose `focus` and `blur` events as built-in functionalities.

However, regardless of the initialization mode you apply to the widget, you can handle them by using JavaScript. For more information, refer to the [how-to article on handling `focus` and `blur` in AngularJS]({% slug howto_handleblurandfocuseventsangular_editor %}).

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
