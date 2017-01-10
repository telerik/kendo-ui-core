---
title: Handle Blur and Focus Events
page_title: Handle Blur and Focus Events | Kendo UI Editor
description: "Learn how to handle the blur and the focus events of a Kendo UI Editor."
previous_url: /controls/editors/editor/how-to/handle-blur-and-focus-events
slug: howto_handleblurandfocusevents_editor
---

# Handle Blur and Focus Events

The Kendo UI Editor does not expose `focus` and `blur` events as built-in functionalities.

However, regardless of the initialization mode you apply to the widget, it is possible for you to handle them by using JavaScript.

For more information on how to handle the `blur` and `focus` events in AngularJS applications, refer to the [how-to article on AngularJS]({% slug howto_handleblurandfocuseventsangular_editor %}).

The following example demonstrates how to handle the `blur` and the `focus` events of the Editor.

###### Example

```html
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

Other articles on the Kendo UI Editor:

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Get Reference to Child Widgets]({% slug howto_get_referenceto_child_widgets_editor %})
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
* [How to Set Caret Position]({% slug howto_set_caret_position_editor %})
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})

For more runnable examples on the Kendo UI Editor, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
