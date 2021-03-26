---
title: Drag and Resize Window Over Iframe
description: An example on how to enable Window to be dragged and resized over iframe elements.
type: how-to
page_title: Drag and Resize Window Over Iframe | Kendo UI Window for jQuery
slug: window-drag-resize-over-iframe
tags: window, iframe, drag, resize
ticketid:
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Window</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2020.3.1118 version</td>
 </tr>
</table>

## Description

When there is a Kendo Window and an iframe on the same page (Window and Editor as Editor uses iframe), the Window dragging and resizing freezes.

## Solution

1. Subscribe to the Window dragstart, dragend, resizeStart and resizeEnd events.
1. Dynamically add and remove a transparent overlay from the iframes on the page.

```dojo
    <iframe height="700px" width="100%" src="https://www.google.com/maps/embed" name="iframe_a"></iframe>

    <div id="example">
      <div id="window">
        <h4>Armchair 402</h4>
        <div class="armchair"><img src="../content/web/window/armchair-402.png" alt="Armchair 402" /> Artek Alvar Aalto - Armchair 402</div>
        <p>Alvar Aalto is one of the greatest names in modern architecture and design. Glassblowers at the iittala factory still meticulously handcraft the legendary vases that are variations on one theme, fluid organic shapes that let the end user decide the use. Interpretations of the shape in new colors and materials add to the growing Alvar Aalto Collection that remains true to his original design.</p>
      </div>

      <span id="undo" style="display:none" class="k-button hide-on-narrow">Click here to open the window.</span>

      <div class="responsive-message"></div>

      <script>
        $(document).ready(function() {
          var myWindow = $("#window"),
              undo = $("#undo");

          undo.click(function() {
            myWindow.data("kendoWindow").open();
            undo.fadeOut();
          });

          function onClose() {
            undo.fadeIn();
          }

          myWindow.kendoWindow({
            width: "600px",
            title: "About Alvar Aalto",
            visible: false,
            iframe: false,
            actions: [
              "Pin",
              "Minimize",
              "Maximize",
              "Close"
            ],
            dragstart: function(ev) {
            	addIframeOverlay();
            },
            dragend: function(ev) {
            	removeIframeOverlay();
            },
            resizeStart: function(ev) {
              console.log(1);
              addIframeOverlay();
            },
            resizeEnd: function() {
            	removeIframeOverlay();
            },
            close: onClose
          }).data("kendoWindow").center().open();

          function addIframeOverlay() {
          	var iframes = $("body").find("iframe");

            iframes.each(function(idx, item) {
            	$('<div class="ui-draggable-iframe" style="background: #fff;"></div>')
             .css({
                width: this.offsetWidth+"px",
                height: this.offsetHeight+"px",
                position: "absolute",
                opacity: "0.001",
                zIndex: 1000
             })
             .css($(this).offset())
             .appendTo("body");
            });
          }

          function removeIframeOverlay() {
          	$(".ui-draggable-iframe").remove();
          }
        });
      </script>
    </div>
```
