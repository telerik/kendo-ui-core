---
title:  Razor Page
page_title: Configure a DataSource for the FileManager for Remote Binding in Razor Page.
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI FileManager HtmlHelper for {{ site.framework }} in a Razor Page using CRUD Operations."
slug: htmlhelpers_filemanager_razorpage_aspnetcore
position: 1
---

# Razor Page

This article describes how to configure the DataSource of a Telerik FileManager in a RazorPage scenario.

In order to set up the FileManager component bindings, you need to configure the `Read` , `Create`, `Update` and `Destroy` methods of the `DataSource` instance. The URL in this method should refer the name of the handler in the PageModel. In this method, you can also pass additional parameters, such as the antiforgery token (see `forgeryToken`). See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
    @Html.AntiForgeryToken()

    @(Html.Kendo().FileManager().Name("filemanager")
        .DataSource(ds =>
            {
                ds.Read(operation => operation
                .Type(HttpVerbs.Post)
                .Url("/FileManager/FileManagerIndex?handler=FileManagerRead")
                .Data("forgeryToken")
            );
            ds.Destroy(operation => operation
                .Type(HttpVerbs.Post)
                .Url("/FileManager/FileManagerIndex?handler=FileManagerDestroy")
                .Data("forgeryToken")
            );
            ds.Create(operation => operation
                .Type(HttpVerbs.Post)
                .Url("/FileManager/FileManagerIndex?handler=FileManagerCreate")
                .Data("forgeryToken")
            );
            ds.Update(operation => operation
                .Type(HttpVerbs.Post)
                .Url("/FileManager/FileManagerIndex?handler=FileManagerUpdate")
                .Data("forgeryToken")
            );
        })
        .UploadUrl("/FileManager/FileManagerIndex?handler=FileManagerUpload")
    )

    <script>
        function forgeryToken() {
            return kendo.antiForgeryTokens();
        }
    </script>
```
```tab-PageModel(cshtml.cs)
    public class FileManagerIndexModel : PageModel
    {
        //public static IList<OrderViewModel> orders;

        public FileManagerIndexModel(IWebHostEnvironment hostingEnvironment)
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

                    //return Json(result.ToArray());
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

                //return Json(new object[0]);
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

            //return Json(VirtualizePath(newEntry));
            return new JsonResult(VirtualizePath(newEntry));
        }
    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [DataBinding Overview]({% slug htmlhelpers_filemanager_aspnetcore_binding_overview %})

