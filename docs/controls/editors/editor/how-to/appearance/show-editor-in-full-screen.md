---
title: Show Editor in Full Screen
page_title: Show Editor in Full Screen | Kendo UI Editor
description: "Learn how to show the Kendo UI Editor widget in full screen."
previous_url: /controls/editors/editor/how-to/show-editor-in-full-screen
slug: howto_show_infull_screen_editor
---

# Show Editor in Full Screen

You can render the Editor in full screen by using the [Full-screen API](https://fullscreen.spec.whatwg.org/).

The following example demonstrates how to apply this approach.

```dojo
  <textarea id="editor"></textarea>

  <style>
    @media all and (-webkit-min-device-pixel-ratio:0) and (min-resolution: .001dpcm) {
      .selector:not(*:root), .k-fullscreen .k-editor .k-editable-area {
        height: auto;
      }

      .selector:not(*:root), .k-fullscreen .k-editor .k-editor-toolbar-wrap {
        height: 35px;
      }
    }
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

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
