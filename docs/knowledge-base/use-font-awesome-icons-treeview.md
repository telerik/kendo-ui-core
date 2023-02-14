---
title: Use FontAwesome Icons in the TreeView
page_title: Use FontAwesome Icons in the TreeView
description: "Learn how to use FontAwesome icons in the Kendo UI for jQuery TreeView widget."
slug: howto_usefontawesomeicons_treeview
previous_url: /controls/navigation/treeview/how-to/appearance/use-font-awesome-icons
tags: telerik, kendo, jquery, treeview, use, fontawesome, icons
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

How can I use FontAwesome icons in the Kendo UI for jQuery TreeView?

## Solution

The following example demonstrates how to use [FontAwesome icons](http://fortawesome.github.io/Font-Awesome/icons/) as TreeView sprite icons.

```dojo
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

    <style>
      .fa.k-sprite,
      .fa.k-sprite::before {
        font-size: 12px;
        line-height: 12px;
        vertical-align: middle;
      }
    </style>

    <div id="treeview"></div>
    <script>
      $("#treeview").kendoTreeView({
        dataSource: [
          { text: "Flying objects", spriteCssClass: "fa fa-sitemap", expanded: true, items: [
            { text: "Paper plane", spriteCssClass: "fa fa-paper-plane" },
            { text: "Plane", spriteCssClass: "fa fa-plane" },
            { text: "Space shuttle", spriteCssClass: "fa fa-space-shuttle" }
          ] }
        ]
      });
    </script>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
