---
title: Using FontAwesome icons
page_title: Using FontAwesome icons
description: Using FontAwesome icons.
---

# Using FontAwesome icons for Kendo UI Menu.

The example below demonstrates how to include custom [FontAwesome](http://fortawesome.github.io/Font-Awesome/) icons in the Kendo UI Menu

#### Example:

```html
    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <h3>Menu with font awesome icons</h3>
    <div id="menu"></div>      
    <script>
      $("#menu").kendoMenu({
        dataSource: [{
          text: "Brazil", spriteCssClass: "fa fa-male", items: [
            { text: "History", spriteCssClass: "fa fa-map-marker" },
            { text: "Geography", spriteCssClass: "fa fa-tablet" },
          ]
            },
            {
            text: "India", spriteCssClass: "fa fa-glass", items: [
            { text: "History", spriteCssClass: "fa fa-flag-checkered" },
            { text: "Geography", spriteCssClass: "fa fa-picture-o" },
          ]
        },
                     {
                       text: "Netherlands", spriteCssClass: "fa fa-camera-retro", items: [
                         { text: "History", spriteCssClass: "fa fa-film" },
                         { text: "Geography", spriteCssClass: "fa fa-leaf" },
                       ]
                         }]
                     });
    </script>
    <style>
      .k-sprite
      {
        text-indent: 0;
        font-size: 1em;
      }
    </style>
```
