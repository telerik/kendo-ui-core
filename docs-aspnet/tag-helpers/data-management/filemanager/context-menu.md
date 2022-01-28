---
title: Context Menu
page_title: Context Menu
description: "Get familiar with the ContextMenu usage in the {{ site.product }} FileManager component, in order to delete add or move files"
slug: taghelpers_filemanager_aspnetcore_contextmenu
position: 3
---


# ContextMenu in FileManager
The {{ site.product }} FileManager's ContextMenu enables you to easily execute FileManager commands on the selected file or folder.

The component uses the {{ site.product }} ContextMenu, enabling you to get full advantage of its [Client API](/api/javascript/ui/filemanager). Once an item is selected, the corresponding command is executed.

The default items in the ContextMenu are `rename` and `delete`. You can define your custom items which can execute custom commands. You can also manage what items should be visible, by enumerating the needed ones in the initialization of the component (see Example below)

        <kendo-filemanager name="filemanager" upload-url="@Url.Action("Upload", "FileManagerData")">
            <filemanager-datasource>
                <transport>
                    <read url="@Url.Action("Read", "FileManagerData")" />
                    <create url="@Url.Action("Destroy", "FileManagerData")" />
                    <destroy url="@Url.Action("Create", "FileManagerData")" />
                    <update url="@Url.Action("Update", "FileManagerData")" />
                </transport>
            </filemanager-datasource>
            <context-menu>
                <items>
                    <item name="rename"></item>
                    <item name="delete"></item>
                </items>
            </context-menu>
        </kendo-filemanager>

## See Also

* [Overview of FileManager]({% slug taghelpers_filemanager_aspnetcore_overview %})
* [Drag and Drop FileManager]({% slug taghelpers_filemanager_aspnetcore_dragndrop %})
* [Navigation in FileManager]({% slug taghelpers_filemanager_aspnetcore_navigation %})

