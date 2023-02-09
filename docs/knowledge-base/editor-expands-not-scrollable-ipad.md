---
title: Editor on iPad Expands instead of Being Scrollable
page_title: Editor on iPad Expands instead of Being Scrollable
description: "Learn how to handle the Kendo UI for jQuery Editor when the component expands on iPad instead of being scrollable."
slug: editor_ipad_expands_not_scrollable
tags: telerik, progress, kendoui, jquery, editor, expands, ipad, not, scrollable
type: troubleshooting
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Editor for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description 

The jQuery Editor on iPad expands instead of being scrollable.

## Cause

Iframes cannot be scrollable on iOS and always expand to display all their content.

## Solution

Use the inline Editor mode that excludes an `iframe`. When in inline mode, you need to manually post the value of the Editor.


## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
