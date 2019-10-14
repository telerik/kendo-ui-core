---
title: Enable and Disable the Editor
page_title: Enable and Disable the Editor | Kendo UI Editor
description: "Learn how to enable and disable the Kendo UI Editor."
previous_url: /controls/editors/editor/how-to/enable-and-disable-editor
slug: howto_enable_and_disable_the_editor_editor
---

# Enable and Disable the Editor

The following example demonstrates how to enable and disable the Kendo UI Editor.

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
