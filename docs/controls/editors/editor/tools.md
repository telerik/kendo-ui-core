---
title: Tools
page_title: jQuery Editor Documentation | Tools
description: "Get started with the jQuery Editor by Kendo UI and use and customize its tools."
slug: tools_kendoui_editor_widget
position: 4
---

# Tools

The Editor provides a predefined collection of tools that are used to interact with the widget.

You can enable any of these tools by using the [`tools`](/api/web/editor#tools) configuration option.

## Default Tools

If you do not define a set of specific tools, the Editor creates a set of default tools for text formatting. For a runnable example, refer to the [demo on the built-in tools in the Editor](https://demos.telerik.com/kendo-ui/editor/all-tools).

The following example demonstrates how to implement a set of specific Editor tools.

       $(document).ready(function(){
          $("#editor").kendoEditor({
             tools: [
                 "bold",
                 "italic",
                 "underline",
                 "foreColor"
             ]
          });
      });

## Custom Tools

Apart from the available built-in tools, you can extend the Editor functionality through custom tools that are defined in the `tools` array.

The following example demonstrates how to add a custom tool button. To enable styling where `toolName` is the specified name in the custom tool configuration, the custom buttons get a `k-toolName` CSS class. The `undo` and `redo` tool names are reserved.

       $("#editor").kendoEditor({
           tools: [
               {
                   name: "toolName",
                   tooltip: "Custom editor tool",
                   exec: function(e) {
                       var editor = $(this).data("kendoEditor");

                       // execute command
                   }
               }
           ]
       });

## See Also

* [Using the Tools of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/all-tools)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
