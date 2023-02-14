---
title: Display a Loading Indicator over the Window
page_title: Display a Loading Indicator over the Window
description: "Learn how to display a Kendo-UI-style loading indicator over the content area of the Kendo UI for jQuery Window."
slug: howto_displayloadingindicator_overwindow_window
previous_url: /controls/layout/window/how-to/display-loading-overlay
tags: telerik, kendo, jquery, window, display, loading, indicator, over, above
component: window
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Window for jQuery</td>
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

How can I display a [Kendo-UI-style loading indicator](/api/javascript/ui/ui/methods/progress) over the Window content area while (or before) a remote request is made?

## Solution

You need to display the loading overlay over the Window [`element`](/framework/widgets/wrapper-element) or some of its ancestors. This ensures that the overlay is removed automatically when the new content is loaded and rendered.

The following example demonstrates how to achieve the desired scenario.

```dojo
    <div id="example">
        <button id="showOverlay">Show overlay</button>
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
        $("#showOverlay").kendoButton();
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

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Add **Close** Button inside Modal Windows]({% slug howto_addclosebutton_insidemodalwindows_window %})
* [How to Cascade Open Windows]({% slug howto_cascadeopenwindows_window %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})


