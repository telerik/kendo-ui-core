---
title: Show Editor in Full Screen
page_title: Show Editor in Full Screen | Kendo UI Editor
description: "Learn how to show the Kendo UI Editor widget in full screen."
slug: howto_show_infull_screen_editor
---

# Show Editor in Full Screen

The example below demonstrates how to use the [Full-screen API](https://fullscreen.spec.whatwg.org/) to show the Editor in full screen.

###### Example

```html
  <textarea id="editor"></textarea>

  <style>
        .k-fullscreen .k-editor {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100% !important;
    }
  </style>

  <script>
      var classHolder = $(document.documentElement);
      var fullscreenChange = "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange";
      $(document).bind(fullscreenChange, $.proxy(classHolder.toggleClass, classHolder, "k-fullscreen"));

      function toggleFullScreen() {
        var docEl = document.documentElement;

        var fullscreenElement =
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement;

        var requestFullScreen = docEl.requestFullscreen ||
            docEl.msRequestFullscreen ||
            docEl.mozRequestFullScreen ||
            docEl.webkitRequestFullscreen;

        var exitFullScreen = document.exitFullscreen ||
            document.msExitFullscreen ||
            document.mozCancelFullScreen ||
            document.webkitExitFullscreen;

        if (!requestFullScreen) {
          return;
        }

        if (!fullscreenElement) {
          requestFullScreen.call(docEl, Element.ALLOW_KEYBOARD_INPUT);
        } else {
          exitFullScreen.call(document);
        }
      }

      $("#editor").kendoEditor({
        tools: [
          {
            name: "fullscreen",
            template:
              '<a class="k-button" onclick="toggleFullScreen()">' +
                '<span class="k-icon k-i-maximize k-tool-icon" /> Toggle fullscreen' +
              '</a>'
          }
        ]
      });
  </script>
```

## See Also

Other articles on the Kendo UI Editor and how-to examples::

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Get Reference to Child Widgets]({% slug howto_get_referenceto_child_widgets_editor %})
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
* [How to Set Caret Position]({% slug howto_set_caret_position_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})

For more runnable examples on the Kendo UI Editor, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
