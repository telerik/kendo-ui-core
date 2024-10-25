---
title: Creating a Download Command For The FileManager
page_title: Create Download Command For The FileManager
description: An example on how to create a Download command for the {{ site.product }} FileManager. Follow the steps in the Knowledge Base section of the {{ site.product }} components.
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

How can I create a Download command in the context menu of the FileManager component for {{ site.product }}?

## Creating a Download Command

As of {{ site.product }} version R1 2020 SP1, the `kendo.ui.filemanager` namespace exposes the `FileManagerCommand` class that you can extend and implement a download command.

Include [Font Icons](https://www.telerik.com/design-system/docs/foundation/iconography/font-icons/#usage) for [`SpriteCssClass`](https://docs.telerik.com/kendo-ui/api/javascript/ui/filemanager/configuration/contextmenu.items.spritecssclass) by referencing the following link extracted from [unpkg](https://unpkg.com/):

```html
<link rel="stylesheet" href="http://unpkg.com/%40progress/kendo-font-icons/dist/index.css" rel="stylesheet" type="text/css" />
```

Initialize the {{ site.product }} FileManager and define a Download command for the Context Menu.

```View
  @(Html.Kendo().FileManager().Name("filemanager")
  ...
        .ContextMenu(context => context.Items(items =>
        {
            items.Add("download").Command("DownloadCommand").Text("Download").SpriteCssClass("k-icon k-font-icon k-i-download");
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

On the server-side, implement a server-side action to return the file for download. The example below extends the [File Manager demo for {{ site.product }}]{% if site.core %}(https://demos.telerik.com/aspnet-core/filemanager/index){% else %}(https://demos.telerik.com/aspnet-mvc/filemanager){% endif %}

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

## More {{ site.framework }} FileManager Resources

* [{{ site.framework }} FileManager Documentation](({%slug htmlhelpers_filemanager_aspnetcore_overview%})

* [{{ site.framework }} FileManager Demos](https://demos.telerik.com/{{ site.platform }}/filemanager)

{% if site.core %}
* [{{ site.framework }} FileManager Product Page](https://www.telerik.com/aspnet-core-ui/file-manager)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} FileManager Product Page](https://www.telerik.com/aspnet-mvc/file-manager)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the FileManager for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/filemanager)
* [Server-Side API Reference of the FileManager for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/filemanager)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
