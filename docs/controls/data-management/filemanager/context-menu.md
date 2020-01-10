---
title: Context Menu
page_title: jQuery FileManager Documentation | FileManager ContextMenu | Kendo UI
description: "Get familiar with the ContextMenu usage in the FileManager component, in order to delete add or move files"
slug: contextmenu_kendoui_filemanager_widget
position: 3
---

# ContextMenu in FileManager
The FileManager's ContextMenu enables you to easily execute a preferable action on the selected file or folder. 

The component uses the Kendo ContextMenu, enabling you to get full advantage of its [Client API](/api/javascript/ui/filemanager). Once an item is selected, the corresponding command is executed. 

The default items in the ContextMenu are `rename` and `delete`. You can define your custom items which can execute custom commands. You can also manage what items should be visible, by enumerating the needed ones in the initialization of the component (see Example below)

```js
    <div id="filemanager"></div>

    $("#filemanager").kendoFileManager({
        contextMenu: {
            items: [{text: "RemoveSelected", name: "remove", command: "DeleteCommand"}]
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
