---
title: Display Loading Indicator over Window
page_title: Display Loading Indicator over Window | Kendo UI Window
description: "Learn how to display a Kendo-UI-style loading indicator over the content area of the Kendo UI Window."
slug: howto_displayloadingindicator_overwindow_window
---

# Display Loading Indicator over Window

The example below demonstrates how to display a [Kendo-UI-style loading indicator](/api/javascript/ui/ui#methods-progress) over the Window content area while (or before) a remote request is made.

The loading overlay must be displayed over the Window [widget `element`](/framework/widgets/wrapper-element) or some of its ancestors. This ensures that the overlay is removed automatically when the new content is loaded and rendered.

###### Example

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

## See Also

Other articles and how-to examples on the Kendo UI Window:

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Add **Close** Button inside Modal Windows]({% slug howto_addclosebutton_insidemodalwindows_window %})
* [How to Cascade Open Windows]({% slug howto_cascadeopenwindows_window %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})

For more runnable examples on the Kendo UI Window, browse the [**How To** documentation folder]({% slug howto_usemvvmbinding_forwindowdataediting_mvvm_window %}).
