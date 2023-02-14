---
title: Add an Auto-Resizing Splitter to the Window
page_title: Add an Auto-Resizing Splitter to the Window
description: "Learn how to add a Splitter that resizes automatically along with the Kendo UI for jQuery Window."
slug: howto_addautoresizingsplitter_window
previous_url: /controls/layout/splitter/how-to/add-auto-resizing-splitter-to-window, /controls/layout/window/how-to/add-auto-resizing-splitter
tags: telerik, kendo, jquery, window, add, sutoresizing, splitter
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

How can I add a Splitter that resizes automatically along with the Kendo UI Window widget?

## Solution

The example below demonstrates how to achieve the desired scenario.


```dojo
    <style>
      html
      {
        font: 12px sans-serif;
      }

      #splitter
      {
        border-width: 0;
        height: 100%;
      }

      #win
      {
        padding: 0;
        overflow: hidden;
      }
    </style>
    <div id="win">
      <div id="splitter">
        <div>left pane <br /><br />
          Please resize the Window and watch the Splitter resize automatically.</div>
        <div>right pane</div>
      </div>
    </div>
    <script>
      $("#win").kendoWindow({
        title: "Kendo UI Window",
        modal: true,
        width: 400,
        height: 250
      }).data("kendoWindow").center();

      $("#splitter").kendoSplitter({
        panes: [{},{}]
      });
    </script>
```

## See Also

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [How to Create Confirmation Dialog via Promises]({% slug howto_createconfirmationdialog_viapromises_window %})
* [How to Post to Iframe]({% slug howto_posttoiframe_window %})
* [How to Restrict Window Positioning]({% slug howto_restrictpositioning_window %})
