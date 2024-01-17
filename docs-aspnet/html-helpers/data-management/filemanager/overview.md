---
title: Overview
page_title: Overview
description: "Get started with the Telerik UI for {{ site.framework }} FileManager component and learn how to create, initialize, and enable the widget."
slug: htmlhelpers_filemanager_aspnetcore_overview
position: 0
---

# {{ site.framework }} FileManager Overview

The {{ site.product }} FileManager is an Explorer-like component that enables you to manage files and folders and provides you with a rich API for customization.

The component allows you to show additional information about the selected file in a Preview Pane that you can customize through templates and that you can show or hide through a switch button. The component is built entirely with Kendo UI for jQuery components: [Grid]({% slug htmlhelpers_grid_aspnetcore_overview %}), [ListView]({% slug htmlhelpers_listview_aspnetcore %}), [TreeView]({% slug htmlhelpers_treeview_aspnetcore %}), [Toolbar]({% slug htmlhelpers_toolbar_aspnetcore %}), and [Breadcrumb]({% slug htmlhelpers_breadcrumb_aspnetcore_overview %}).

{% if site.core %}
The Telerik UI FileManager TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI FileManager widget. To add the component to your ASP.NET Core app, you can use either.
{% else %}
The Telerik UI FileManager HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI FileManager widget.
{% endif %}


* [Demo page for the FileManager HtmlHelper](https://demos.telerik.com/{{ site.platform }}/filemanager/index)
{% if site.core %}
* [Demo page for the FileManager TagHelper](https://demos.telerik.com/{{ site.platform }}/filemanager/index)
{% endif %}

## Initializing the FileManager

The following example demonstrates the initialization of the FileManager with remote binding. The file structure is served as JSON through the FileManager DataSource object.

> As of the 2022 R3 release, the `Selectable` mechanism has a new behavior. The `Change` event fires only when performing selection or deselection.

```HtmlHelper
   @(Html.Kendo().FileManager()
    .Name("filemanager")
    .DataSource(ds =>
        {
            ds.Read(operation => operation
            .Type(HttpVerbs.Post)
            .Action("Read", "FileManagerData")
        );
        ds.Destroy(operation => operation
            .Type(HttpVerbs.Post)
            .Action("Destroy", "FileManagerData")
        );
        ds.Create(operation => operation
            .Type(HttpVerbs.Post)
            .Action("Create", "FileManagerData")
        );
        ds.Update(operation => operation
            .Type(HttpVerbs.Post)
            .Action("Update", "FileManagerData")
        );
    })
    .UploadUrl("Upload", "FileManagerData")   
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-filemanager name="filemanager11" upload-url="@Url.Action("Upload", "FileManagerData")">
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
```Controller
 // GET: /FileManager/
        private const string contentFolderRoot = "~/Content/";
        private const string prettyName = "Folders/";
        private static readonly string[] foldersToCopy = new[] { "~/Content/shared/filemanager" };


        /// <summary>
        /// Gets the base paths from which content will be served.
        /// </summary>
        public override string ContentPath
        {
            get
            {
                return CreateUserFolder();
            }
        }

        /// <summary>
        /// Gets the valid file extensions by which served files will be filtered.
        /// </summary>
        public override string Filter
        {
            get
            {
                return "*.*";
            }
        }

        private string CreateUserFolder()
        {
            var virtualPath = Path.Combine(contentFolderRoot, "UserFiles", prettyName);

            var path = Server.MapPath(virtualPath);
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
                foreach (var sourceFolder in foldersToCopy)
                {
                    CopyFolder(Server.MapPath(sourceFolder), path);
                }
            }
            return virtualPath;
        }

        private void CopyFolder(string source, string destination)
        {
            if (!Directory.Exists(destination))
            {
                Directory.CreateDirectory(destination);
            }

            foreach (var file in Directory.EnumerateFiles(source))
            {
                var dest = Path.Combine(destination, Path.GetFileName(file));
                System.IO.File.Copy(file, dest);
            }

            foreach (var folder in Directory.EnumerateDirectories(source))
            {
                var dest = Path.Combine(destination, Path.GetFileName(folder));
                CopyFolder(folder, dest);
            }
        }
```

## Functionality and Features

| Feature | Description |
|---------|-------------|
| [Data binding]({% slug htmlhelpers_filemanager_aspnetcore_binding_overview  %}) | You can bind the FileManager to remote data. |
| [ContextMenu]({% slug htmlhelpers_filemanager_aspnetcore_contextmenu %}) | The FileManager enables you to easily execute FileManager commands on the selected file or folder.  |
| [Drag and Drop]({% slug htmlhelpers_filemanager_aspnetcore_dragndrop %}) | The FileManager allows you to drag and drop files from the different FileManager views (GridView, ListView). |
| [Views]({% slug htmlhelpers_filemanager_aspnetcore_views %}) | The FileManager provides the Grid and List built-in views for content visualization. |
| [Navigation]({% slug htmlhelpers_filemanager_aspnetcore_navigation %}) | The FileManager exposes the ability to drill down to the specific file you need to manipulate. |
| [PreviewPane]({% slug htmlhelpers_filemanager_aspnetcore_previewpane %}) |The Preview Pane in the FileManager enables you to show additional information about the selected files or folders in the view. |
| [Search]({% slug htmlhelpers_filemanager_aspnetcore_search %}) | The FileManager comes with a search panel out-of-the-box and allows you to quickly find the needed files. |
| [Sort]({% slug htmlhelpers_filemanager_aspnetcore_sort %}) | FileManager provides a built-in sort functionality, which allows you to sort the files and folders. |
| [Toolbar Commands]({% slug htmlhelpers_filemanager_aspnetcore_toolbar %}) | You can incorporate a ToolBar component that contains a variety of built-in commands.|
| [Accessibility]({% slug accessibility_aspnetcore_filemanager %}) | The FileManager is accessible for screen readers, supports WAI-ARIA attributes, and delivers keyboard shortcuts for faster navigation. |
| [Globalization]({% slug accessibility_aspnetcore_filemanager %}) | The FileManager supports globalization by combining the translation of component messages (localization) and their adaptation to specific cultures. |

## Next Steps

* [Getting Start with the FileManager]({% slug filemanager_aspnetcore_getting_started %})
* [Basic Usage of the FileManager for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/filemanager/index)
{% if site.core %}
* [FileManager in Razor Pages]({% slug htmlhelpers_filemanager_razorpage_aspnetcore %})
{% endif %}

## See Also

* [Using the API of the FileManager for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/filemanager/api)
* [Knowledge Base Section](/knowledge-base)
