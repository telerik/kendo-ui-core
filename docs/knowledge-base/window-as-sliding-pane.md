---
title: Use Windows as Sliding Panes
page_title: Use Windows as Sliding Panes
description: "Learn how use Kendo UI for jQuery Windows as sliding panes."
slug: howto_windowasslidingpane_window
previous_url: /controls/layout/window/how-to/window-as-sliding-pane
tags: telerik, kendo, jquery, window, use, mvvm, for, data, editing
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

How can I configure the Kendo UI for jQuery Window so it acquires the visual effect of a sliding UI component?

## Solution

The following example demonstrates how to make the Window behave as a sliding pane.



```dojo
  <div id="dialog">
      <p>Some content</p>
  </div>
  <a href="#" id="openWindow">Open</a>
    <script>
      $("#openWindow").kendoButton();
      $("#dialog").kendoWindow({
        title: "Title",
        width: "60%",
        height: "94%",
        actions: [ "close" ],
        draggable: false,
        resizable: false,
        modal: true,
        position:{
          top: 0,
          left: "40%"
        },
        animation: {
          open: {
            effects: "slideIn:left",
            duration: 500
          },
          close: {
            effects: "slideIn:left",
            reverse: true,
            duration: 500
          },
        },
        visible: false
      });
      $("#openWindow").click(function(){
        var dialog = $("#dialog").getKendoWindow();
        dialog.open();
      })
    </script>
```

## See Also

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Add Auto-Resizing Splitter]({% slug howto_addautoresizingsplitter_window %})
* [How to Cascade Open Windows]({% slug howto_cascadeopenwindows_window %})
* [How to Display Loading Indicator over Window]({% slug howto_displayloadingindicator_overwindow_window %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})
