---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI FileManager TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_filemanager_aspnetcore_overview
position: 1
---

# FileManager TagHelper Overview

The {{ site.product }} FileManager TagHelper is a server-side wrapper for the Kendo UI FileManager widget.
The FileManager is an Explorer-like component enabling you to manage files and folders

It enables you to organize and manage files and folders and provides you with a rich API for customization. You can show additional information about the selected file in a template-customizable Preview Pane, which you can show or hide via a switch button. The widget is built entirely by Kendo UI for jQuery components: [Grid]({% slug taghelpers_grid_aspnetcore %}), [ListView]({% slug htmlhelpers_listview_aspnetcore %}), [TreeView]({% slug taghelpers_treeview_aspnetcore %}), [Toolbar]({% slug taghelpers_toolbar_aspnetcore %}), [Breadcrumb]({% slug taghelpers_breadcrumb_aspnetcore_overview %}).


* [Demo page for the FileManager](https://demos.telerik.com/{{ site.platform }}/filemanager/tag-helper)

## Initializing the Filter

The following example demonstrates initialization of the FileManager with a local binding. The file structure is served as JSON though the FileManager DataSource object.

```Razor
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

## Referencing Existing Instances

To refer to an existing Grid instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [FileManager client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/filemanager#methods) to control its behavior.

        var filemanager = $("#filemanager").data("kendoFileManager");

## Functionality and Features

* [Data binding]({% slug taghelpers_filemanager_aspnetcore_binding_overview %})
* [ContextMenu]({% slug taghelpers_filemanager_aspnetcore_contextmenu %})
* [Drag and Drop]({% slug taghelpers_filemanager_aspnetcore_dragndrop %})
* [Views]({% slug taghelpers_filemanager_aspnetcore_views %})
* [Navigation]({% slug taghelpers_filemanager_aspnetcore_navigation %})
* [PreviewPane]({% slug taghelpers_filemanager_aspnetcore_previewpane %})
* [Search]({% slug taghelpers_filemanager_aspnetcore_search %})
* [Sort]({% slug taghelpers_filemanager_aspnetcore_sort %})
* [Toolbar Commands]({% slug taghelpers_filemanager_aspnetcore_toolbar %})
* [Accessibility]({% slug accessibility_aspnetcore_filemanager %})
* [Globalization]({% slug globalization_filemanager_aspnetcore %})

Visit the [Client API section](https://docs.telerik.com/kendo-ui/api/javascript/ui/filemanager) for full description of the configurations methods and events of the Kendo UI for jQuery FileManager component.

## See Also

* [Basic Usage of the FileManager (Demo)](https://demos.telerik.com/{{ site.platform }}/filemanager/index)
* [Binding Overview of the FileManager]({% slug taghelpers_filemanager_aspnetcore_binding_overview %})
* [Globalization in {{ site.product }}]({% slug overview_globalization_core %})

