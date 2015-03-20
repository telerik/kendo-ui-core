---
title: Use FontAwesome icons
page_title: Use FontAwesome icons
description: Use FontAwesome icons
---

# Use FontAwesome icons

The example below demonstrates how to use [FontAwesome icons](http://fortawesome.github.io/Font-Awesome/icons/) as treeview sprite icons.

#### Example:

```html
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    <style>
      .k-sprite,
      .k-sprite::before {
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
