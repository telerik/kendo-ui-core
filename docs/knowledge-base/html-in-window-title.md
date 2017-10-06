---
title: Set HTML in the Kendo UI Window title
description: An example on how to inject HTML in the Kendo UI Window title.
type: how-to
page_title: Set HTML in the Kendo UI Window title | Kendo UI Window
slug: set-html-in-window-title
tags: window, title, html
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Window</td>
 </tr>
</table>

## Description

How can I set HTML in the Kendo UI Window title?

## Cause

As of the 2017 R1 SP1 release, Kendo UI Window no longer allows HTML to be inserted through the `title` property of the widget in order to prevent script injection.

## Solution

To programatically insert HTML in the Widow's title:

  1. Query the Window container for the .k-window-title class.
  2. Insert the desired HTML with jQuery.

```html
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
