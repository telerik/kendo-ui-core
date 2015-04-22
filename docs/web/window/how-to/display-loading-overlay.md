---
title: Display loading overlay over the Window
page_title: Display loading overlay over the Window
description: Display loading overlay over the Window
---

# Display a loading overlay over the Window content

The example below demonstrates how to display a [Kendo-UI-style loading indicator](/api/javascript/ui/ui#methods-progress)
over the Window content area while (or before) a remote request is made.

The loading overlay must be displayed over the Window widget [**element**](/framework/widgets/wrapper-element) or some of its ancestors.
This will ensure that the overlay will be removed automatically when the new content is loaded and rendered.

#### Example:

```html
    <div id="example">
        <button id="showOverlay" class="k-button">Show overlay</button>
        <p>Click on the Refresh button to remove the overlay.</p>
        <p>In real-world scenarios the loading overlay will be removed automatically when the new content is rendered
            (e.g. when loaded with Ajax).</p>
        
        <div id="window"></div>
        
        <script>
        // Window initialization code start
        // when Kendo UI using server wrappers, the initialization script will be generated automatically
        $(function() {
            $("#window").kendoWindow({
                title: "Kendo UI Window",
                actions: ["refresh"],
                content: {
                    template: "Now is #= (new Date()).toLocaleTimeString() #"
                },
                width: 300,
                height: 160
            });
        });
        // initialization code end
        
        // example code start
        $(function() {
            var windowWidget = $("#window").data("kendoWindow");
            
            $("#showOverlay").click(function(){
                kendo.ui.progress(windowWidget.element, true);
            });
        });
        </script>
    </div>
```