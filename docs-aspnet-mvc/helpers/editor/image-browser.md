---
title: Image Browser
page_title: Image Browser | Kendo UI Editor HtmlHelper
description: "Import and export different types of documents with the Kendo UI Editor widget for ASP.NET MVC."
slug: overview_imagebrowser_aspnetmvc
position: 2
---

# Image Browser

By default, the **Insert Image** tool opens a simple dialog that allows you to type in or paste the URL of an image and, optionally, specify a tooltip.

![Insert Image Dialog](/controls/editors/editor/editor-insert-image.png)

## Overview

As of the Q3 2012 release, the Editor has supported a new way of picking an image by browsing a list of predefined files and directories. Uploading new images is also supported.

![Image Browser Dialog](/controls/editors/editor/editor-image-browser.png)

## Configuration

The ImageBrowser tool will show up as a file browser automatically when `ImageBrowser` method is defined in the code.

###### Example

```tab-Razor
@(Html.Kendo().Editor()
    .Name("Editor")
    .ImageBrowser(imageBrowser => imageBrowser
        // {0} is a placeholder, which will be replaced with the item's Name—the file.
        .Image("~/Content/UserFiles/Images/{0}")
        .Read("Read", "ImageBrowser")
        .Create("Create", "ImageBrowser")
        .Destroy("Destroy", "ImageBrowser")
        .Upload("Upload", "ImageBrowser")
        .Thumbnail("Thumbnail", "ImageBrowser"))
    .FileBrowser(fileBrowser => fileBrowser
         // {0} is a placeholder, which will be replaced with the item's Name—the file.
        .File("~/Content/UserFiles/Images/{0}")
        .Read("Read", "FileBrowser")
        .Create("Create", "FileBrowser")
        .Destroy("Destroy", "FileBrowser")
        .Upload("Upload", "FileBrowser")
    )
)
```
```tab-ASPX
<%: Html.Kendo().Editor()
    .Name("Editor")
    .ImageBrowser(imageBrowser => imageBrowser
        .Image("~/Content/UserFiles/Images/{0}")
        .Read("Read", "ImageBrowser")
        .Create("Create", "ImageBrowser")
        .Destroy("Destroy", "ImageBrowser")
        .Upload("Upload", "ImageBrowser")
        .Thumbnail("Thumbnail", "ImageBrowser"))
    .FileBrowser(fileBrowser => fileBrowser
        .File("~/Content/UserFiles/Images/{0}")
        .Read("Read", "FileBrowser")
        .Create("Create", "FileBrowser")
        .Destroy("Destroy", "FileBrowser")
        .Upload("Upload", "FileBrowser")
    )
%>
```

### Using the Built-in EditorImageBrowserController class

With Kendo.Mvc assembly you can use the ready-to-use EditorImageBrowserController class. This class enables you to easyly implement an MVC controller that consumes data from the ImageBrowser tool so that you can populate it with images from the server, update them and upload new ones.

###### Example

```csharp
public class ImageBrowserController : EditorImageBrowserController
{
    private const string contentFolderRoot = "~/Content/";
    private const string prettyName = "Images/";
    private static readonly string[] foldersToCopy = new[] { "~/Content/shared/" };


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
}
```

Similarly, you can use the `EditorFileBrowserController` class to create a controller for the FileBrowser tool as well.

>Note
>
>If you have checked the Kendo UI Editor widget and the [Image Browser article](http://docs.telerik.com/kendo-ui/controls/editors/editor/imagebrowser), you may have noticed a difference in the consumed parameters for the `create`, `read`, `destroy`, and `upload` operations. The following explains the parameters used with the Kendo UI Editor HtmlHelper.

The following list provides information about the default requests and responses for the create, read, destroy, and upload operations:

- `create`&mdash;Makes a `POST` request for the creation of a directory with the following parameters and does not expect a response.

        {"Name":"New folder name","Size":0,"EntryType":1}

- `read`&mdash;Makes a `POST` request that contains the `Name` parameter to specify the path which is browsed and expects a file listing in the following format.

        [
            { "Name": "Folder", "Size": 73289, "EntryType": 1 },
            { "Name": "file.jpg", "Size": 15289, "EntryType": 0 },
            ...
        ]

    Where `Name` is the file or directory name, `EntryType` is either an **0** for a file or a **1** for a directory, and `Size` is the file size (optional).

- `destroy`&mdash;Makes a `POST` request with the following parameters:

    - `Name`&mdash;The file or directory to be deleted.
    - `path`&mdash;The directory in which the file or the directory resides.
    - `EntryType`&mdash;Whether a file or a directory is to be deleted (an **0** or a **1**).
    - `Size`&mdash;(Optional) The file size, as provided by the `read` response.

- `upload`&mdash;Makes a `POST` request to the `Upload` action. The request contains `FormData` containing the upload path, file name and type. Its payload consists of the uploaded file. The expected response is a `file` object in the following format:

        { "Name": "foo.png", "Size": 12345, "EntryType":0 }

- `thumbnailUrl`&mdash;Makes a `GET` request for each individual image in order to display its thumbnail in the explorer window. The single request parameter is the `path` to the image. The service is expected to respond with the image file for the thumbnail.

- `imageUrl`&mdash;Used by the Editor to generate the `src` attribute of the original image when it is inserted. It results in a `GET` request generated by the browser for each inserted image. The URL can point to a file system or to a service and is parameterized&mdash;the `{0}` placeholder denotes the `path` and `fileName` as received from the `Read` service. By default, the placeholder value is URL-encoded.

### Customizing MVC Controllers for ImageBrowser

Due to various application needs it may be required to get files not from the server, but from different source (like database, cloud storage, etc.). In such cases you can use the `IImageBrowserController` and  `IFileBrowserController` interfaces to create a controller that will enable you to have more control over the controller actions intended to serve and consume files.

You can checkout an example of such a custom controller in [Store Images in Database with ImageBrowser]({%slug howto_storeimagesindatabases_editoraspnetmvc%})

## See Also

* [ASP.NET MVC API Reference: EditorBuilder](/api/Kendo.Mvc.UI.Fluent/EditorBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Editor Widget](http://docs.telerik.com/kendo-ui/controls/editors/editor/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

For runnable examples on the Kendo UI Editor in ASP.NET MVC applications, browse its [**How To** documentation folder](/helpers/editor/how-to/).
