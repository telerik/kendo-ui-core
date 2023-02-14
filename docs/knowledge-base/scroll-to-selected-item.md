---
title: Scroll to the Selected TreeView Item
page_title: Scroll to the Selected TreeView Item
description: "Learn how to scroll the Kendo UI for jQuery TreeView viewport to the selected node."
slug: howto_scrolltoselecteditem_treeview
previous_url: /controls/navigation/treeview/how-to/nodes/scroll-to-selected-item
tags: telerik, kendo, jquery, treeview, scroll, to, selected, item
component: treeview
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TreeView for jQuery</td>
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

How can I scroll the viewport to the selected node of the Kendo UI for jQuery TreeView?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <div id="tree"></div>

    <script>
      // Set up: generate the data, select an item.
      var data = [];
      for (var i = 0; i < 1000; i++) {
        data.push({ text: "Item " + i });
      }
      $("#tree").kendoTreeView({
        dataSource: data
      });
      var treeview = $("#tree").data("kendoTreeView");
      treeview.select(treeview.findByText("Item 500"));

      // Scroll to the selected item.
      var itemScrollTop = treeview.select()[0].offsetTop;
      $("html,body").animate({ scrollTop: itemScrollTop });
    </script>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
