---
title: Use the Mobile View of the ToolBar
page_title: Use the Mobile View of the ToolBar
description: "Learn how to use the mobile view of the Kendo UI for jQuery ToolBar widget."
slug: howto_usemobileview_toolbar
previous_url: /controls/navigation/toolbar/how-to/use-mobile-view-toolbar
tags: telerik, kendo, jquery, toolbar, use, the, mobile, view
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

How can I use the mobile view of a Kendo UI for jQuery ToolBar?

## Solution

To enable the mobile view of the ToolBar widget:

1. Add the mobile styles.
2. To configure the position of the tools that will be rendered `left` or `right`, use the `align` option.
3. Initialize `kendo.mobile.Application()`.

The example below demonstrates how to use the mobile view of the Toolbar. It is recommended that you open it in Dojo.



```dojo
<div id="toolbar"></div>
<script>
  $("#toolbar").kendoToolBar({
    items: [
          { type: "button", text: "Button 1", align: "left" },
          { type: "button", text: "Button 2", align: "left" },
          { type: "button", text: "Button 3" },
          { type: "button", text: "Button 4" }
      ]
  });

  var app = new kendo.mobile.Application(document.body);
</script>
```

## See Also

* [ToolBar JavaScript API Reference](/api/javascript/ui/toolbar)
* [How to Close ToolBar Popup Manually]({% slug howto_closetoolbarpopupmanually_toolbar %})
* [How to Develop and Register Custom ToolBar Tools]({% slug howto_customtool_toolbar %})
