---
title: Context Menu
page_title: Context Menu
description: "Get familiar with the ContextMenu usage in the {{ site.product }} FileManager component, in order to delete add or move files" 
slug: htmlhelpers_filemanager_aspnetcore_contextmenu
position: 3
---


# ContextMenu in FileManager
The {{ site.product }} FileManager's ContextMenu enables you to easily execute FileManager commands on the selected file or folder. 

The component uses the {{ site.product }} ContextMenu, enabling you to get full advantage of its [Client API](https://docs.telerik.com/kendo-ui/api/javascript/ui/filemanager). Once an item is selected, the corresponding command is executed. 

The default items in the ContextMenu are `rename` and `delete`. You can define your custom items which can execute custom commands. You can also manage what items should be visible, by enumerating the needed ones in the initialization of the component (see Example below)

        @(Html.Kendo().FileManager()
            .Name("filemanager")              
            .ContextMenu(context => context.Items(items =>
            {
                items.Add("rename");
                items.Add("delete");
            })) 
            ...
        )

## See Also

* [Overview of FileManager]({% slug htmlhelpers_filemanager_aspnetcore_overview %})
* [Drag and Drop FileManager]({% slug htmlhelpers_filemanager_aspnetcore_dragndrop %})
* [Navigation in FileManager]({% slug htmlhelpers_filemanager_aspnetcore_navigation %})

