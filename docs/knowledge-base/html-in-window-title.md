---
title: Insert HTML in the Window Title
description: An example on how to inject HTML in the Kendo UI Window title.
type: how-to
page_title: Inject HTML in the Title | Kendo UI Window for jQuery
slug: set-html-in-window-title
tags: window, title, html
res_type: kb
component: window
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Window</td>
 </tr>
</table>

## Description

How can I insert HTML in the title of a Kendo UI Window?

## Suggested Workaround

As of the 2017 R1 SP1 release and to prevent script injection, the Kendo UI Window no longer allows the adding of HTML through the `title` property of the widget. However, you can still work around the issue by programmatically inserting HTML in the title of the widget.

1. Query the Window container for the `.k-window-title` class.

1. Insert the desired HTML with jQuery.

```dojo
  <div id="example">
    <div id="window">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor gravida odio vel gravida. Donec feugiat metus massa, molestie porttitor risus placerat a. Pellentesque iaculis vitae massa et condimentum. Suspendisse molestie maximus vulputate. Fusce vitae ex ut risus faucibus varius.</p>
    </div>

    <span id="undo" class="k-button hide-on-narrow">Click here to open the window.</span>
  </div>

  <script>
    $(document).ready(function() {
      var myWindow = $("#window"),
          undo = $("#undo"),
          changeSettings = $("#change-settings");

      myWindow.kendoWindow({
        width: "500px",
        actions: ["Custom", "Minimize", "Maximize", "Close"],
        title: "About Josef Hoffmann",
        close: function() {
          undo.fadeIn();
        },
        visible: false
      });

      undo.click(function () {
        var window = myWindow.data("kendoWindow");

        window.element.prev().find(".k-window-title").html("<b class='custom'>HTML title</b><i class='k-icon k-i-globe'></i>");
        window.open();

        undo.fadeOut();
      });
    });
  </script>
```
