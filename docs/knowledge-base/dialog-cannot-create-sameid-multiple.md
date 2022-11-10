---
title: Cannot Create Multiple Same-ID Dialogs
page_title: Cannot Create Multiple Dialogs with the Same ID
description: "Learn how to handle the Kendo UI for jQuery Dialog if you are not able to create multiple components with the same ID."
slug: dialog_cannot_create_sameid_multiple
tags: telerik, progress, kendoui, jquery, dialog, cannot, create, multiple, same, id, components
type: troubleshooting
res_type: kb
component: dialog
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery Dialog</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description 

I'm not able to create multiple jQuery Dialogs with the same ID.

## Solution 

To create a Kendo UI Dialog instance multiple times with the same ID, make sure that the existing instance with this ID is [destroyed](#configuration-Destroy) first. Widgets with the same ID [cannot exist and work properly]({% slug initialize_widgets_using_jquery_plugins_installation %}#duplicate-initialization) at one and the same time.

Alternatively, do not destroy the existing Dialog instance&mdash;[open](/api/javascript/ui/dialog/methods/open) it and [set new static content](/api/javascript/ui/dialog/methods/content) if needed.

## See Also

* [Basic Usage of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/index)
* [Using the API of the Dialog (Demo)](https://demos.telerik.com/kendo-ui/dialog/api)
* [JavaScript API Reference of the Dialog](/api/javascript/ui/dialog)
