---
title: Overview
page_title: Data Binding Overview
description: "Learn about the different types of data binding when working with the Telerik UI FileManager HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_filemanager_aspnetcore_binding_overview
position: 0
---

# DataBiding Overview

Depending on the configuration of its [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}), the {{ site.product_short }} FileManager provides different types of data binding.


## Remote Binding

The {{ site.product }} FileManager provides its own `ContentProviderController` which you need to inherit, in order to use the inbuilt `read`, `create`, `update` and `destroy` methods. As those as virtual methods, they can be overwritten and extended.


To bind the FileManager to remote data, specify the `dataSource` option and supply the object with the needed endpoints for `read`, `create`, `update` and `destroy` operations. The following example demonstrates such implementation, where the FileManagerData inherits the `ContentProviderController`:

```Razor
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



The following list provides information about the default requests and responses for the `create`, `read`, `destroy` operations.

- `Create`&mdash;Makes a `POST` request for the creation of a directory with the following parameters.

         {"Name":"...","Size":0,"Path":"...","Extension":".txt","IsDirectory":...,"HasDirectories":...,"Created":"...","CreatedUtc":"...","Modified":"...","ModifiedUtc":"..."}

- `Read`&mdash;Makes a `POST` request that contains the `path` parameter to specify the path which is browsed and expects a file listing in the following format:

        [
           {"Name":"Documents","Size":0,"Path":"Documents","Extension":"","IsDirectory":true,"HasDirectories":false,"Created":"\/Date(1578897289317)\/","CreatedUtc":"\/Date(1578897289317)\/","Modified":"\/Date(1578897289332)\/","ModifiedUtc":"\/Date(1578897289332)\/"},
            ...
        ]


- `Destroy`&mdash;Makes a `POST` request containing `FormData` with the following parameters:

    - `Name`&mdash;The file or directory to be deleted.
    - `Path`&mdash;The directory in which the file or the directory resides.
    - `Extension`&mdash; The extension of the deleted file. No extension in the data, if a folder is deleted.
    - `Size`&mdash The file size, as provided by the `read` response.
    - `IsDirectory`&mdash; Boolean, specifying if the deleted is a file or not.
    - `HasDirectories`&mdash; Boolean, specifying if the deleted contains folders.
    - `Created`&mdash; Created Date of the deleted item.
    - `CreatedUtc`&mdash; Created Date in UTC format of the deleted item.
    - `Modified`&mdash; Modified Date of the deleted item.
    - `mModifiedUtc`&mdash; Created Date in UTC formats of the deleted item.

- `Update`&mdash;Makes a `POST` request, containing the `FileEntry` object. The expected response is a `file` object in the following format:

         {"Name":"...","Size":0,"Path":"...","Extension":".txt","IsDirectory":...,"HasDirectories":...,"Created":"...","CreatedUtc":"...","Modified":"...","ModifiedUtc":"..."}


## See Also
* [Overview of {{ site.product }} FileManager]({% slug htmlhelpers_filemanager_aspnetcore_overview %})
* [Navigation in {{ site.product }} FileManager]({% slug htmlhelpers_filemanager_aspnetcore_navigation %})
* [Preview Panes in {{ site.product }} FileManager]({% slug htmlhelpers_filemanager_aspnetcore_previewpane %})

​​​​​​​ 