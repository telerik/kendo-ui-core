---
title: Show the Editor in Full Screen
page_title: Show the Editor in Full Screen
description: "Learn how to show the Kendo UI Editor widget in full screen."
previous_url: /controls/editors/editor/how-to/show-editor-in-full-screen, /controls/editors/editor/how-to/appearance/show-editor-in-full-screen
slug: howto_show_infull_screen_editor
tags: telerik, kendo, jquery, editor, show, in, full, screen, mode
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

How can I show the Kendo UI for jQuery Editor in full screen mode?

## Solution

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
