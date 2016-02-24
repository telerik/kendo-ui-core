---
title: Use FontAwesome Icons
page_title: Use FontAwesome Icons | Kendo UI TabStrip
description: "Learn how to use FontAwesome icons in the Kendo UI ToolBar widget."
slug: howto_usefontawesomeicons_toolbar
---

# Use FontAwesome Icons

The example below demonstrates how to use [FontAwesome icons](http://fortawesome.github.io/Font-Awesome/icons/) as Kendo UI ToolBar sprite icons.

###### Example

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

## See Also

Other articles on Kendo UI ToolBar:

* [ToolBar JavaScript API Reference](/api/javascript/ui/toolbar)
* [How to Close ToolBar Popup Manually]({% slug howto_closetoolbarpopupmanually_toolbar %})
* [How to Develop and Register Custom ToolBar Tools]({% slug howto_customtool_toolbar %})
