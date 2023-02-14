---
title: Create Auto-Expanding Editors
page_title: Create Auto-Expanding Editors
description: "Learn how to make the Kendo UI for jQuery Editor automatically expand."
previous_url: /controls/editors/editor/how-to/auto-expanding-editor, /controls/editors/editor/how-to/appearance/auto-expanding-editor
slug: howto_make_the_editor_auto_expanding_editor
tags: telerik, kendo, jquery, editor, create, auto, expanding, editors
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

How can I create an auto-expanding Kendo UI for jQuery Editor?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
  <style>
      html{font:12px sans-serif;overflow:auto;}

      html,body{margin:0;padding:0;height:100%;min-height:100%;}

      #Comments{display:block;width:100%;height:100%;border:0;padding:0;}

      table.expandEditor{border-width:0;width:100%;height:100%;}
    </style>

    <textarea id="Comments" cols="60" rows="10"></textarea>

    <script>
      	  $("#Comments").kendoEditor().data("kendoEditor").wrapper.width("").height("").addClass("expandEditor");
    </script>
```

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
