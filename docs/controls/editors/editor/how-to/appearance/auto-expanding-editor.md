---
title: Create Auto-Expanding Editors
page_title: Create Auto-Expanding Editors | Kendo UI Editor
description: "Learn how to make the Editor automatically expand."
previous_url: /controls/editors/editor/how-to/auto-expanding-editor
slug: howto_make_the_editor_auto_expanding_editor
---

# Create Auto-Expanding Editors

The following example demonstrates how to create an auto-expanding Editor.

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
