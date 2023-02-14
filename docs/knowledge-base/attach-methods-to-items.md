---
title: Attach Methods to Data Items in the TreeView
page_title: Attach Methods to Data Items in the TreeView
description: "Learn how to attach methods to data items at different levels of the Kendo UI for jQuery TreeView widget and use them in a template."
slug: howto_attache_methodsto_dataitems_treeview
previous_url: /controls/navigation/treeview/how-to/templates/attach-methods-to-items
tags: telerik, kendo, jquery, treeview, atach, methods, to, data, items
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

How can I attach methods to data items at different levels and then use them in a template in the Kendo UI for jQuery TreeView?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <div id="treeview"></div>

    <script>
      var SubCategory = {
        displayName: function() {
          return this.SubCategoryName;
        }
      };

      var Category = {
        displayName: function() {
          return this.CategoryName;
        },
        children: {
          schema: {
            data: "subcategories",
            model: SubCategory
          }
        }
      };

      $("#treeview").kendoTreeView({
        template: "#: item.displayName() #",
        dataSource: {
          data: [
            { CategoryName: "Reds", status: "online", subcategories: [
              { SubCategoryName: "Yellow" },
              { SubCategoryName: "Orange" },
              { SubCategoryName: "Red" }
            ] },
            { CategoryName: "Blues", status: "offline", subcategories: [
              { SubCategoryName: "Green" },
              { SubCategoryName: "Turquose" },
              { SubCategoryName: "Blue" }
            ] }
          ],
          schema: {
            model: Category
          }
        }
      });
    </script>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
