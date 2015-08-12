---
title: Show the editor in full screen
page_title: Show the editor in full screen
description: Show the editor in full screen
---

# Show the editor in full screen

The example below demonstrates how to use the [Full-screen API](https://fullscreen.spec.whatwg.org/) to show the editor in full screen.

#### Example

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
