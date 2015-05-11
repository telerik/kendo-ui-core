---
title: Use FontAwesome icons
page_title: Use FontAwesome icons
description: Use FontAwesome icons
---

# Use FontAwesome icons

The example below demonstrates how to use [FontAwesome icons](http://fortawesome.github.io/Font-Awesome/icons/) as toolbar sprite icons.

#### Example:

```html
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

    <style>
      .fa.k-sprite,
      .fa.k-sprite::before {
        font-size: 12px;
        line-height: 12px;
      }
    </style>

    <div id="toolbar"></div>
    <script>
      $("#toolbar").kendoToolBar({
        items: [
          { type: "button", spriteCssClass: "fa fa-paper-plane", text: "Paper plane" },
          { type: "button", spriteCssClass: "fa fa-plane", text: "Plane" },
          { type: "button", spriteCssClass: "fa fa-space-shuttle", text: "Space shuttle" }
        ]
      })
    </script>
```
