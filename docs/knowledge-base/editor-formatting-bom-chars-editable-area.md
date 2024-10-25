---
title: Formatting in the Editor Shows BOM Characters in the Editable Area
page_title: Editor Formatting Shows BOM Characters in the Editable Area
description: "Learn how to handle the Kendo UI for jQuery Editor when formatting shows BOM characters in the editable area of the component."
slug: editor_formatting_bomchars_editable_area
tags: telerik, progress, kendoui, jquery, editor, formatting, renders, shows, bom, chars, editable, area
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

Formatting in the jQuery Editor shows BOM characters in the editable area.

## Cause 

The Editor uses BOM characters to correctly handle some ranges. If there is an issue with the page encoding, these characters become visible.

## Solution 

To handle this behavior, refer to the following scenarios:

1. If you observe the problem in the [online demos](https://demos.telerik.com/kendo-ui/editor), your browser might have enforced an encoding that is different from the UTF-8 one. This scenario is not supported.
1. If the online demos behave properly, change the Kendo UI script references so they are loaded from the CDN (https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js). If your page is now working correctly, your local script files are served with the wrong encoding, or are corrupted. Copy over the scripts (the files, not their content) from the official distribution, and see if the issue persists.
1. If the problem is still visible on your page, and the scripts are loaded through the CDN, the page might be served with the wrong formatting. Verify that the page as well as its layout pages are saved and served in UTF-8.

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
