---
title: Change the Editor New-Line Mode from a P to a Br Tag
page_title: Change the Editor New-Line Mode from a P to a Br Tag
description: "Learn how to set the new-line mode from a P to a Br tag in a Kendo UI Editor widget."
slug: howto_change-p-to-br-tag_editor
tags: telerik, kendo, jquery, editor, set, new, ne, mode, from, p, to, br, tag
component: editor
type: how-to
res_type: kb
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

How can I change the default new-line behavior from inserting `<p>` tag to `<br>` tag in the Kendo UI for jQuery Editor?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
  <textarea id="editor"></textarea>
  <script>
    var defaultTools = kendo.ui.Editor.defaultTools;

    defaultTools["insertLineBreak"].options.shift = false;
    delete defaultTools["insertParagraph"].options;
    $("#editor").kendoEditor();
  </script>
```

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
