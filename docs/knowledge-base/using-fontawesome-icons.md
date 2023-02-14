---
title: Use FontAwesome Icons in the Menu
page_title: Use FontAwesome Icons in the Menu
description: "Learn how to include custom FontAwesome icons in the Kendo UI for jQuery Menu widget."
slug: howto_use_fontawesome_icons_menu
previous_url: /controls/navigation/menu/how-to/using-fontawesome-icons
tags: telerik, kendo, jquery, menu, use, fontawesome, icons
component: menu
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Menu for jQuery</td>
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

How can I include custom [FontAwesome](http://fortawesome.github.io/Font-Awesome/) icons in the Kendo UI for jQuery Menu?

## Solution

The example below demonstrates how to achieve the desired scenario. 



```dojo
    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <h3>Menu with font awesome icons</h3>
    <div id="menu"></div>
    <script>
      $("#menu").kendoMenu({
        dataSource: [{
          text: "Brazil", spriteCssClass: "fa fa-male", items: [
            { text: "History", spriteCssClass: "fa fa-map-marker" },
            { text: "Geography", spriteCssClass: "fa fa-tablet" },
          ]},
          { text: "India", spriteCssClass: "fa fa-glass", items: [
            { text: "History", spriteCssClass: "fa fa-flag-checkered" },
            { text: "Geography", spriteCssClass: "fa fa-picture-o" },
          ]},
          { text: "Netherlands", spriteCssClass: "fa fa-camera-retro", items: [
            { text: "History", spriteCssClass: "fa fa-film" },
            { text: "Geography", spriteCssClass: "fa fa-leaf" },
          ]}
        ]});
    </script>
    <style>
      .k-sprite {
        text-indent: 0;
        font-size: 1em;
      }
    </style>
```

## See Also

* [Menu JavaScript API Reference](/api/javascript/ui/menu)
* [How to Create Split Button]({% slug howto_createa_split_button_menu %})
* [How to Execute Custom Click Actions Based on Class Name]({% slug howto_execute_custom_click_actions_basedon_classnames_menu %})

