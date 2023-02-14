---
title: Use FontAwesome Icons in the ToolBar
page_title: Use FontAwesome Icons in the ToolBar
description: "Learn how to use FontAwesome icons in the Kendo UI for jQuery ToolBar widget."
slug: howto_usefontawesomeicons_toolbar
previous_url: /controls/navigation/toolbar/how-to/use-font-awesome-icons
tags: telerik, kendo, jquery, toolbar, use, fontawesome, icons
component: toolbar
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ToolBar for jQuery</td>
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

How can I use Fontawesome icons in the Kendo UI for jQuery ToolBar?

## Solution

The example below demonstrates how to use [FontAwesome icons](http://fortawesome.github.io/Font-Awesome/icons/) as Kendo UI ToolBar sprite icons.


```dojo
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

* [ToolBar JavaScript API Reference](/api/javascript/ui/toolbar)
* [How to Close ToolBar Popup Manually]({% slug howto_closetoolbarpopupmanually_toolbar %})
* [How to Develop and Register Custom ToolBar Tools]({% slug howto_customtool_toolbar %})
