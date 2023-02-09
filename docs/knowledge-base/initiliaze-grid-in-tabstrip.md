---
title: Initialize the Grid in the TabStrip
page_title: Initialize the Grid in TabStrip
description: "Learn how to initialize the Kendo UI Grid inside the Kendo UI TabStrip by resizing it according to the dimensions of its container."
slug: initialize_thegrid_tabstrip_widget
previous_url: /controls/navigation/tabstrip/how-to/initiliaze-grid-in-tabstrip
tags: telerik, kendo, jquery, tabstrip, grid, initialize
component: tabstrip
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TabStrip for jQuery</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
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

How can I initialize a Kendo UI for jQuery Grid in a Kendo UI for jQuery TabStrip?

## Solution

The example below demonstrates how to use the `activate` event when initializing the Grid within the TabStrip so as it is resized according to the dimensions of its container.

> In addition to the Kendo UI TabStrip, you can apply the suggested approach to the PanelBar and Window which also act as hidden containers for the Grid.



```dojo
     <body>
      <button id="openBtn">Open</button>

      <div id="tabstrip">
        <ul>
          <li id="tab1">Tab 1</li>
          <li id="tab2">Tab 2</li>
        </ul>
        <div><div id="grid"></div></div>
        <div>Content 2</div>
      </div>

      <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
      <script>
        var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");

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
          tabstrip.one("activate", function() {
          	grid.resize();
          });

          $("#openBtn").click(function(e) {
          	tabstrip.activateTab($("#tab1"));
          });
        </script>
    </body>
```

## See Also

* [Initialize the Grid inside a Hidden Container](/web/grid/appearance#initialize-the-grid-inside-a-hidden-container)
* [JavaScript API Reference: Configure TabStrip Animations](/api/javascript/ui/tabstrip/configuration/animation)
* [How to Save Content Scroll Position]({% slug howto_savecontentscrollposition_tabstrip %})
* [How to Scroll TabStrip with Keyboard]({% slug howto_scrolltabstripwithkeyboard_tabstrip %})


