---
title: Drag and Drop
page_title: jQuery FileManager Documentation | Drag and Drop in FileManager | Kendo UI
description: "Understand how the Drag and Drop functionality in the FileManager enable you to manage the files"
slug: dragndrop_kendoui_filemanager_widget
position: 4
---

# Drag and Drop Overview


The FileManager provides inbuilt Drag and Drop functionality, which allows you to move files or folders within the hierarchical structure of the component. The functionality is enabled by default and it can be controlled by the `draggable` option.


The following exampel demonstrated how to disable the Drag and Drop functionality of the FileManager:
```js
    <div id="filemanager"></div>

    $("#filemanager").kendoFileManager({
        draggable: false,
        dataSource: {
            data: myData //dummy json for local data binding
        }
    });
```

## See Also

* [Preview Panes in Kendo UI FileManager]({% slug previewpane_kendoui_filemanager_widget %})
* [ToolbarCommands in Kendo UI FileManager]({% slug toolbar_kendoui_filemanager_widget %})
