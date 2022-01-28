---
title: Views
page_title: Views
description: "Get familiar with Grid and Thumbs Views in Telerik UI FileManager for {{ site.framework }}."
slug: taghelpers_filemanager_aspnetcore_views
position: 4
---

# Views Overview

The {{ site.product }} FileManager provides two inbuilt views for content visualization: `Grid` and `List` Views.

You can switch between views from the Toolbar button group.

## List View (Thumbnails)

The List view is implemented with the help of the {{ site.product }} ListView component. The content in this view is rendered as a list of thumbnails, representing the files. You can control the configuration of this view trough the `views.list` object of the FileManager.


        <kendo-filemanager name="filemanager" upload-url="@Url.Action("Upload", "FileManagerData")">
            <views>
                <list template-id="myTemplateID"/>
            </views>
            <filemanager-datasource>
                <transport>
                    <read url="@Url.Action("Read", "FileManagerData")" />
                    <create url="@Url.Action("Destroy", "FileManagerData")" />
                    <destroy url="@Url.Action("Create", "FileManagerData")" />
                    <update url="@Url.Action("Update", "FileManagerData")" />
                </transport>
            </filemanager-datasource>
        </kendo-filemanager>

**Image1: ListView type in FileManager:**

<img src="listview.png">

## See Also

* [ContextMenu in {{ site.product }} FileManager]({% slug taghelpers_filemanager_aspnetcore_contextmenu %})
* [Drag and Drop in {{ site.product }} FileManager]({% slug taghelpers_filemanager_aspnetcore_dragndrop %})
