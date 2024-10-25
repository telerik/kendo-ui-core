---
title: Context Menu
page_title: jQuery FileManager Documentation - FileManager ContextMenu
description: "Get familiar with the ContextMenu usage in the FileManager component, in order to delete add or move files"
slug: contextmenu_kendoui_filemanager_widget
position: 3
---

# ContextMenu in FileManager
The FileManager's ContextMenu enables you to easily execute FileManager commands on the selected file or folder. 

The component uses the Kendo ContextMenu, enabling you to get full advantage of its [Client API](/api/javascript/ui/filemanager). Once an item is selected, the corresponding command is executed. 

The default items in the ContextMenu are `rename` and `delete`. You can define your custom items which can execute custom commands. You can also manage what items should be visible, by enumerating the needed ones in the initialization of the component (see Example below)

```js
    <div id="filemanager"></div>

    $("#filemanager").kendoFileManager({
        //contextMenu: false, //disables the ContextMenu
        contextMenu: {
            items: ["rename"] //initializing only the `rename` item 
        },
        dataSource: {
            data: myData
        }
    });
```

## Custom ContextMenu Items

To add a custom command to the context menu of the FileManager, follow the instuctions below. There is no limitation for the number of custom items. 

1. Add the item, set text and specify a command name:

    ```js
        <div id="filemanager"></div>

        $("#filemanager").kendoFileManager({
            contextMenu: {
                items: [
                    { name: "rename" },
                    { name: "delete"},
                    { name: "custom", text: "Custom Command", command: "MyCustomCommand"}
                ]
            },
            dataSource: {
                data: myData
            }
        });
    ```

1. Create the command for the FileManager:

    ```
        $(function(){
            var filemanagerNS = kendo.ui.filemanager;

            filemanagerNS.commands.MyCustomCommand = filemanagerNS.FileManagerCommand.extend({
                exec: function () {
                    var that = this,
                        filemanager = that.filemanager, // get the kendo.ui.FileManager instance
                        options = that.options, // get the options passed through the tool
                        target = options.target // options.target is available only when command is executed from the context menu
                    selectedFiles = filemanager.getSelected(); // get the selected files

                    console.log(options.arg, target, selectedFiles);
                    // Proceed with the logic of the custom command.
                }
            });
        }); 
    ```

## ContextMenu Icons

The ContextMenu enables you to add the traditional [Kendo Web Font Icons](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes/font-icons#list-of-font-icons) in order to enhance the look and feel of the incorporated ContextMenu items.

> If the built-in `Rename` and `Delete` commands are to be added, it is mandatory to configure all the required `text`, `command` and `icon` configurations.

```js
    <div id="filemanager"></div>

    $("#filemanager").kendoFileManager({
        contextMenu: {
            items: [
                { name: "rename" },
                { name: "delete", text: "Delete", command: "DeleteCommand", icon: "x" },
                { name: "custom", text: "Custom Command", command: "CustomCommand", icon: "info-circle"}
            ]
        },
        dataSource: {
            data: myData
        }
    });
```

## See Also

* [Overview of Kendo UI FileManager]({% slug overview_kendoui_filemanager_widget %})
* [Drag and Drop in Kendo UI FileManager]({% slug dragndrop_kendoui_filemanager_widget %})
* [Navigation in Kendo UI FileManager]({% slug navigation_kendoui_filemanager_widget %})
