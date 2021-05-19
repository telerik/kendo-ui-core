---
title: Use FontAwesome Icons
page_title: Use FontAwesome Icons | Kendo UI TreeView
description: "Learn how to use FontAwesome icons in the Kendo UI TreeView widget."
slug: howto_usefontawesomeicons_treeview
---

# Use FontAwesome Icons

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
