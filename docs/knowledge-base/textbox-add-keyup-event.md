---
title: Add Keyup Event to TextBox
description: Learn how extend the existing functionality of the TextBox and add a keyup event.
type: how-to
page_title: Add Keyup event to textBox - Kendo UI TextBox for jQuery
slug: textbox-keyup-event
tags: textbox, keyup, event
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TextBox for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the 2022.1.119 version</td>
 </tr>
</table>

## Description

How can I extend the TextBox functionality to add a `keyup` event?

## Solution

The following example demonstrates how to extend the current TextBox functionality by creating your own widget and add a keyup event.

```dojo
    <input id="myTextBox" style="width: 20%" />
    <script>
      var textboxPlugin = (function (init) {
        return kendo.ui.TextBox.extend({
          init: function (element, options) {
            var that = this;
            // The base call to initialize the widget.
            init.call(that, element, options);

            that.element.on("keyup", $.proxy(that._keyup, that));
          },
          options: {
            name: "TextBox",
            autoBind: true
          },
          events: ["keyup"],
          _keyup: function () {
            var that = this;
            that.trigger("keyup")
          }
        });
      })(kendo.ui.TextBox.fn.init);
      kendo.ui.plugin(textboxPlugin);


      $(function () {
        var textbox = $("#myTextBox").kendoTextBox({
          keyup: function (e) {
            alert("Hello");
          }
        });
      });
    </script>
```
