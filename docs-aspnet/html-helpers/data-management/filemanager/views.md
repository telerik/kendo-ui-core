---
title: Views
page_title: Views 
description: "Get familiar with Grid and Thumbs Views in the Telerik UI FileManager for {{ site.framework }}."
slug: htmlhelpers_filemanager_aspnetcore_views
position: 4
---

# Views 

The {{ site.product }} FileManager provides the Grid and List built-in views for content visualization.  

To switch between the views, use the **Toolbar** button group.

## Grid View

The Grid view is based on the {{ site.product }} Grid component and renders the FileManager files in a tabular form. To control the Grid view configuration, use the `views.grid` object of the FileManager. 

```HtmlHelper
    @(Html.Kendo().FileManager()
        .Name("filemanager")
        .Views(v => v.Grid(grid => grid.Columns(cols => cols.Add().Field(....))))
    
    )
```

**A FileManager displaying its Grid view type**

<img src="gridview.png">

### Setting the Grid View as Initial View

By default, the initial view of the FileManager is the List View. To set the initial view to the Grid View, use the `InitialView()` configuration property.

```HtmlHelper
      @(Html.Kendo().FileManager()
        .Name("filemanager")
        .InitialView("grid")
    )
```
{% if site.core %}
```TagHelper
    <kendo-filemanager name="filemanager" initial-view="grid">
    </kendo-filemanager>
```
{% endif %}


## List View 

The List or Thumbnails View is based on the {{ site.product }} ListView component and renders the FileManager content as a list of thumbnails with each thumbnail representing a file. To control the configuration of the List View, use the `views.list` object of the FileManager. 

```HtmlHelper
    @(Html.Kendo().FileManager()
        .Name("filemanager")
        .Views(v=>v.List(list=>list.TemplateId("...")))
    
    )
```
{% if site.core %}
```TagHelper
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
```
{% endif %}

**A FileManager displaying its List view type** 

<img src="listview.png">

## See Also

* [ContextMenu in {{ site.product }} FileManager]({% slug htmlhelpers_filemanager_aspnetcore_contextmenu %})
* [Drag and Drop in {{ site.product }} FileManager]({% slug htmlhelpers_filemanager_aspnetcore_dragndrop %})
