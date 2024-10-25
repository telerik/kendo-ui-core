---
title: Window - prevent drag on pinned
description: Prevent the drag event, if the pin action property is active
type: how-to
page_title: Prevent drag when Window is pinned
slug: window-prevent-drag-on-pinned
tags: window, pinned, action, drag, prevent, default
ticketid: 
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Window for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the 2021.1.330 version</td>
 </tr>
</table>

## Description
How do I disable the drag event of the Window, when the pin action is active?

## Solution
1. Set up the [Pin action](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/configuration/actions)
1. Subscribe to the [`dragstart`](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/events/dragstart) event and define its handler
1. In the handler check whether **e.sender.options.pinned** is true
1. If true prevent the event - **e.preventDefault()**

```dojo
        <div id="example">
            <div id="window">
                <h4>Armchair 402</h4>
                <div class="armchair"><img src="../content/web/window/armchair-402.png" alt="Armchair 402" /> Artek Alvar Aalto - Armchair 402</div>
                <p>Alvar Aalto is one of the greatest names in modern architecture and design. Glassblowers at the iittala factory still meticulously handcraft the legendary vases that are variations on one theme, fluid organic shapes that let the end user decide the use. Interpretations of the shape in new colors and materials add to the growing Alvar Aalto Collection that remains true to his original design.</p>

                
                <p>Source: <a href="https://www.aalto.com/about-alvar-aalto.html" title="About Alvar Aalto">www.aalto.com</a></p>
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
                        dragstart: function (e) {
                        	if (e.sender.options.pinned) {
                          	e.preventDefault();
                          }
                        },
                        actions: [
                            "Pin",
                            "Minimize",
                            "Maximize",
                            "Close"
                        ],
                        close: onClose
                    }).data("kendoWindow").center().open();
                });
            </script>
```

