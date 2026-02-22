---
title: Tools
page_title: jQuery Editor Documentation - Tools
description: "Get started with the jQuery Editor by Kendo UI and use and customize its tools."
components: ["editor"]
slug: tools_kendoui_editor_widget
position: 5
---

# Tools

The Editor provides a predefined collection of tools that are used to interact with the component.

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

For a runnable example, refer to the [Custom tools Editor Demo](https://demos.telerik.com/kendo-ui/editor/custom-tools)

```dojo
    <textarea id="editor"></textarea>
    <script>
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
       //Apply an icon for the custom tool
       kendo.ui.icon($('.k-editor [title="Custom editor tool"] .k-icon'), { icon: 'camera' });
    </script>
```

## Extending the Editor with a Custom Tool

To extend the Editor with a custom tool:

1. Create a custom command through the `kendo.ui.editor.Command.extend` method
    ```
        var MyCustomCommand = kendo.ui.editor.Command.extend({
          exec: function (e) {
             // Custom Logic.
          }
        });
    ```

1. Insert the Command in the Editor widget object instance.

    ```
        kendo.ui.editor.MyCustomCommand = MyCustomCommand;
    ```

1. Register the tool by using the built-in `registerTool()` method.

    ```
         kendo.ui.editor.EditorUtils.registerTool(
          'MyCustomCommand', new kendo.ui.editor.Tool({
              command: MyCustomCommand, 
              ui:{
                  type:"button",
                  component: "Button",
                  componentOptions: {
                  		 themeColor: "success",
                        click: () => $("#editor").getKendoEditor().exec    ("MyCustomCommand", "test")
                  }
              }
        }));
     ```

1. Initialize the Editor

        $("#editor").kendoEditor({
            tools: [
               "MyCustomCommand"
            ]
        });

## See Also

* [Using the Tools of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/all-tools)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
