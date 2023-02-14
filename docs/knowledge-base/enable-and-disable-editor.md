---
title: Enable and Disable the Editor
page_title: Enable and Disable the Editor
description: "Learn how to enable and disable the Kendo UI Editor."
previous_url: /controls/editors/editor/how-to/enable-and-disable-editor, /controls/editors/editor/how-to/customize/enable-and-disable-editor
slug: howto_enable_and_disable_the_editor_editor
tags: telerik, kendo, jquery, editor, enable, and, disable
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

How can I enable and disable the Kendo UI for jQuery Editor?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
  <style>
      #overlay{
        top:100;
        position:absolute;
        background-color:black;
        opacity:0.1;

      }
      #content{
        top:100;
        position:absolute;

      }
    </style>

    <input type="button" class="k-button" value="Disable" onclick="setzIndex(2)">
    <input type="button" class="k-button" value="Enable" onclick="setzIndex(0)">

    <div id="overlay" style="width:740px;height:440px"></div>
    <div id="content">
      <textarea id="editor" rows="10" cols="30" style="width:740px;height:440px"></textarea>
    </div>
    <script>
      function setzIndex(index){
        $("#overlay").css("z-index", index);
      }
      $(document).ready(function() {
        // Create the Editor from a textarea HTML element with the default set of tools.
        $("#editor").kendoEditor();
      });
    </script>
```

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
