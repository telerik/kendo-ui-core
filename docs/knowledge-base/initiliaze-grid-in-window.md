---
title: Initialize the Grid in the Window
page_title: Initialize the Grid in the Window
description: "Learn how to initialize a Kendo UI for jQuery Grid inside a Kendo UI Window widget by resizing it according to the dimensions of its container."
slug: initialize_thegrid_window_widget
previous_url: /controls/layout/window/how-to/initiliaze-grid-in-window
tags: telerik, kendo, jquery, window, initialize, the, grid
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

How can I initialize the Kendo UI for jQuery Grid in a Kendo UI for jQuery Window?

## Solution

The example below demonstrates how to use the `activate` event when initializing the Grid within the Window so as it is resized according to the dimensions of its container.

>In addition to the Kendo UI Window, this example can be applied to the TabStrip and PanelBar widgets, which, too, act as hidden containers for the Grid.


```dojo
      <button id="openBtn">Open</button>
      <div id="wnd">
        <div id="grid"></div>
      </div>
      <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
      <script>
  	    var wnd = $("#wnd").kendoWindow({
          height: 400,
          width: 600,
          visible: false
        }).data("kendoWindow");

        var grid = $("#grid").kendoGrid({
            dataSource: {
              data: products,
              pageSize: 5
          },
          height: 200,
          scrollable: true,
          columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
              { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
              { field: "Discontinued", width: "130px" }
            ]
          }).data("kendoGrid");

          //apply the activate event, which is thrown only after the animation is played out
          wnd.one("activate", function() { // can use also 'bind' method as Kendo widgets support the "one" and "bind"
                grid.resize();
          });

          $("#openBtn").click(function(e) {
                wnd.open();
          });
        </script>
```

## See Also

* [Initialize the Grid inside a Hidden Container](/web/grid/appearance#initialize-the-grid-inside-a-hidden-container)
* [JavaScript API Reference: Configuration of Window Animations](/api/javascript/ui/window/configuration/animation)
* [Window JavaScript Window API Reference](/api/javascript/ui/window)
* [How to Add Auto-Resizing Splitter]({% slug howto_addautoresizingsplitter_window %})
* [How to Create Confirmation Dialog via Promises]({% slug howto_createconfirmationdialog_viapromises_window %})
* [How to Display Loading Indicator over Window]({% slug howto_displayloadingindicator_overwindow_window %})
* [How to Use Custom Action Icons]({% slug howto_customactionicons_window %})


