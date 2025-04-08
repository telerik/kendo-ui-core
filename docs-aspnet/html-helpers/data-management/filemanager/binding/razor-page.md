---
title:  Razor Page
page_title: Razor Pages
description: "An example on how to configure the Telerik UI for {{ site.framework }} FileManager component for remote binding in a Razor Page scenario using CRUD Operations."
slug: htmlhelpers_filemanager_razorpage_aspnetcore
position: 1
---

# FileManager in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI FileManager for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the FileManager component in a Razor Pages scenario.

For the complete project, refer to the [FileManager in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/FileManager/FileManagerIndex.cshtml).

## Getting Started

To configure the CRUD operations in the FileManager within a Razor Pages application, follow the next steps:

1. Specify the `Read`, `Create`, `Update`, and `Destroy` options of the `DataSource` configuration. The URL in each of these options must refer to the method name in the `PageModel`.

    ```HtmlHelper
        @page
        @model IndexModel

        @(Html.Kendo().FileManager()
            .Name("filemanager")
            .DataSource(ds =>
                {
                    ds.Read(operation => operation
                    .Type(HttpVerbs.Post)
                    .Url("/Index?handler=FileManagerRead")
                    .Data("forgeryToken")
                );
                ds.Destroy(operation => operation
                    .Type(HttpVerbs.Post)
                    .Url("/Index?handler=FileManagerDestroy")
                    .Data("forgeryToken")
                );
                ds.Create(operation => operation
                    .Type(HttpVerbs.Post)
                    .Url("/Index?handler=FileManagerCreate")
                    .Data("forgeryToken")
                );
                ds.Update(operation => operation
                    .Type(HttpVerbs.Post)
                    .Url("/Index?handler=FileManagerUpdate")
                    .Data("forgeryToken")
                );
            })
            .UploadUrl("/Index?handler=FileManagerUpload")
        )
    ```
    ```TagHelper
        @page
        @model IndexModel

        <kendo-filemanager name="filemanager" upload-url="/Index?handler=FileManagerUpload">
            <filemanager-datasource>
                <transport>
                    <read url="/Index?handler=FileManagerRead" data="forgeryToken" type="POST" />
                    <destroy url="/Index?handler=FileManagerDestroy" data="forgeryToken" type="POST" />
                    <create url="/Index?handler=FileManagerCreate" data="forgeryToken" type="POST" />
                    <update url="/Index?handler=FileManagerUpdate" data="forgeryToken" type="POST" />
                </transport>
            </filemanager-datasource>
        </kendo-filemanager>
    ```

1. Add an `AntiForgeryToken` at the top of the page.

    ```
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the `AntiForgeryToken` with the Read request.

    ```JavaScript
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied.

    ```JavaScript
        <script>
            function forgeryToken() {
                return {
                    __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                    additionalParameter: "test"
                }
            }
        </script>
    ```
1. Within the `cshtml.cs` file, add a handler method for each data operation.

    ```C# Index.cshtml.cs

        public IndexModel(IWebHostEnvironment hostingEnvironment)
        {
            HostingEnvironment = hostingEnvironment;
            directoryBrowser = new FileContentBrowser();
        }

        protected readonly IWebHostEnvironment HostingEnvironment;
        private readonly FileContentBrowser directoryBrowser;
    
        public virtual JsonResult OnPostFileManagerRead(string target)
        {
            var path = NormalizePath(target);
            if (Authorize(path))
            {
                try
                {
                    var files = directoryBrowser.GetFiles(path, Filter);
                    var directories = directoryBrowser.GetDirectories(path);
                    var result = files.Concat(directories).Select(VirtualizePath);
                    return new JsonResult(result.ToArray());
                }
                catch (DirectoryNotFoundException)
                {
                    throw new Exception("File Not Found");
                }
            }
            throw new Exception("Forbidden");
        }

        public virtual ActionResult OnPostFileManagerCreate(string target, FileManagerEntry entry)
        {
            FileManagerEntry newEntry;
            if (!Authorize(NormalizePath(target)))
            {
                throw new Exception("Forbidden");
            }

            if (String.IsNullOrEmpty(entry.Path))
            {
                newEntry = CreateNewFolder(target, entry);
            }
            else
            {
                newEntry = CopyEntry(target, entry);
            }
            return new JsonResult(VirtualizePath(newEntry));
        }

        public virtual ActionResult OnPostFileManagerDestroy(FileManagerEntry entry)
        {
            var path = NormalizePath(entry.Path);
            if (!string.IsNullOrEmpty(path))
            {
                if (entry.IsDirectory)
                {
                    DeleteDirectory(path);
                }
                else
                {
                    DeleteFile(path);
                }
                return new JsonResult(new object[0]);
            }
            throw new Exception("File Not Found");
        }

        public virtual ActionResult OnPostFileManagerUpdate(string target, FileManagerEntry entry)
        {
            FileManagerEntry newEntry;
            if (!Authorize(NormalizePath(entry.Path)) && !Authorize(NormalizePath(target)))
            {
                throw new Exception("Forbidden");
            }
            newEntry = RenameEntry(entry);
            return new JsonResult(VirtualizePath(newEntry));
        }
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the FileManager](https://docs.telerik.com/kendo-ui/api/javascript/ui/filemanager)
* [Server-Side HtmlHelper API of the FileManager](/api/filemanager)
* [Server-Side TagHelper API of the FileManager](/api/taghelpers/filemanager)
* [Knowledge Base Section](/knowledge-base)

