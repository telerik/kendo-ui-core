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

The built-in items in the ContextMenu are `rename` and `delete`. You can define your custom items which can execute custom commands. You can also manage what items should be visible, by enumerating the needed ones in the initialization of the component (see Example below)

```HtmlHelper
    @(Html.Kendo().FileManager()
        .Name("filemanager")                         
        .ContextMenu(context => context.Items(items =>
        {
            items.Add("rename");
            items.Add("delete");
        })) 
        ...
    )
```
{% if site.core %}
```TagHelper
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
```
{% endif %}

## Custom ContextMenu Items

To add a custom command to the context menu of the FileManager, follow the instuctions below. There is no limitation for the number of custom items. 

1. Add the item, set text and specify a command name:

    ```HtmlHelper
        .ContextMenu(context =>
        {
            context.Items(items =>
            {
                items.Add("rename");
                items.Add("delete");
                items.Add("custom").Text("Custom button").Command("MyCustomCommand");
            });
        })
    ```
    {% if site.core %}
    ```TagHelper
        <context-menu enabled="true">
 		    <items>
 	 		    <item name="rename">
 	 		    </item>
                <item name="delete">
 	 		    </item>
                <item name="custom" text="Custom button" command="MyCustomCommand">
                </item>
 		    </items>
	    </context-menu>
    ```
    {% endif %}

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


## See Also

* [Overview of FileManager]({% slug htmlhelpers_filemanager_aspnetcore_overview %})
* [Drag and Drop FileManager]({% slug htmlhelpers_filemanager_aspnetcore_dragndrop %})
* [Navigation in FileManager]({% slug htmlhelpers_filemanager_aspnetcore_navigation %})

