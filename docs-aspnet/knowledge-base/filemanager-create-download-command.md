---
title: Create Download Command For The File Manager
page_title: Create Download Command For The File Manager
description: "An example on how to create a Download command for the Kendo UI File Manager."
slug: howto_create_download_command_filemanager
tags: filemanager, custom command, download command
component: filemanager
type: how-to
res_type: kb
---


## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product_long }}</td>
 </tr>
</table>

## Description

How can I create a download command in the conext menu of the Kendo UI File Manager for {{ site.product }}?

## Creating a Download Command

As of Kendo UI R1 2020 SP1 the kendo.ui.filemanager namespace exposes the `FileManagerCommand` class that could be extended to implement a download command.

Initilaize the Kendo FileManager and define a Download command for the Context Menu
```View
  @(Html.Kendo().FileManager().Name("filemanager")
  ...
        .ContextMenu(context => context.Items(items =>
        {
            items.Add("download").Command("DownloadCommand").Text("Download").SpriteCssClass("k-icon k-i-download");
        }))
    )
```

Extend the `FileManagerCommand` class and pass the selected file path to a controller action method.
```javascript
  var filemanagerNS = kendo.ui.filemanager;

      filemanagerNS.commands.DownloadCommand = filemanagerNS.FileManagerCommand.extend({
          exec: function(){
              var that = this,
                  filemanager = that.filemanager, // get the kendo.ui.FileManager instance
                  options = that.options, // get the options passed through the tool
                  target = options.target // options.target is available only when command is executed from the context menu
                  selectedFiles = filemanager.getSelected(); // get the selected files

                  window.location = '/FileManager/Download?path=' + selectedFiles[0].path;

          }
      });
```

On the server-side you will need to implement a server-side action to return the file for download. The example below extends the [File Manager demo for {{ site.product }}]{% if site.core %}(https://demos.telerik.com/aspnet-core/filemanager/index){% else %}(https://demos.telerik.com/aspnet-mvc/filemanager){% endif %}

{% if site.core %}
```Controller
  [HttpGet]
  public FileResult Download(string path)
  {
      var filePath = Path.Combine(HostingEnvironment.WebRootPath, ContentPath, path);
      FileInfo file = new FileInfo(filePath);

      System.Net.Mime.ContentDisposition cd = new System.Net.Mime.ContentDisposition
      {
          FileName = file.Name,
          Inline = false
      };
      Response.Headers.Add("Content-Disposition", cd.ToString());
      Response.Headers.Add("X-Content-Type-Options", "nosniff");

      string contentType;
      new FileExtensionContentTypeProvider().TryGetContentType(file.Name, out contentType);
      var readStream = System.IO.File.ReadAllBytes(filePath);
      return File(readStream, contentType);
  }
```
{% else %}
```Controller
  [HttpGet]
  public FileResult Download(string path)
  {
      var virtualPath = "~/Content/UserFiles/Folders/" + path;
      var filePath = HostingEnvironment.MapPath(virtualPath);
      FileInfo file = new FileInfo(filePath);

      System.Net.Mime.ContentDisposition cd = new System.Net.Mime.ContentDisposition
      {
          FileName = file.Name,
          Inline = false
      };
      Response.Headers.Add("Content-Disposition", cd.ToString());
      Response.Headers.Add("X-Content-Type-Options", "nosniff");

      string contentType = MimeMapping.GetMimeMapping(file.Name);
      var readStream = System.IO.File.ReadAllBytes(filePath);
      return File(readStream, contentType);
  }
```
{% endif %}
## See Also

* [Create custom Kendo UI Widget](https://docs.telerik.com/kendo-ui/intro/widget-basics/create-custom-kendo-widget)
* [Create custom Kendo File Manager command](https://docs.telerik.com/kendo-ui/knowledge-base/filemanager-create-custom-command)
