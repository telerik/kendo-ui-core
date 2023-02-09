---
title: Resize Images and Tables in the Editor
page_title: Resize Images and Tables in the Editor
description: "Learn how to resize images and tables in the Kendo UI for jQuery Editor."
slug: editor_resize_images_tables
tags: telerik, progress, kendoui, jquery, editor, how, to, resize,, images, and, tables
type: how-to
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

How can I resize images and tables in the jQuery Editor?

## Solution 

As of R2 2021 release, image resizing has been implemented in the Editor while table resizing was included back in R3 2016. To resize an image, you can use the resize handlers. Similarly, you can use resize handlers to resize a table. Additionally, to resize a table row or a column, you can drag the cell borders with the mouse.  

> * The **undo** function is not supported while resizing an image or a table, and is considered to be a limitation. 
> * To resize an image or a table in versions prior to the R3 2016 release and in browsers that do not normally support it, such as Google Chrome 46, implement a [custom Editor tool]({% slug tools_kendoui_editor_widget %}#custom-tools).


## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
