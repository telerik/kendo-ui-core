---
title: Upload PDF File and Load it in PDFViewer
page_title: Upload PDF File and Load it in PDFViewer
description: Learn how to upload a PDF file through the Telerik UI for {{ site.framework }} Upload component and load it into the Telerik UI for {{ site.framework }} PDFViewer component.
slug: upload-file-and-load-in-pdfviewer
tags: telerik, upload, file, pdf, load, pdfviewer
component: upload
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Upload and {{ site.product }} PDFViewer</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.2.718 version</td>
 </tr>
</table>

## Description

How can I upload a `PDF` file by using the Telerik UI for {{ site.framework }} Upload and display the uploaded file into the Telerik UI for {{ site.framework }} PDFViewer?

## Solution

1. Define an Upload component in [asynchronous mode]({% slug htmlhelpers_upload_modes_of_operation_aspnetcore%}#asynchronous-mode).
1. Define a PDFViewer component and hide it with CSS.
1. Subscribe to the [`Success`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/uploadeventbuilder#successsystemstring) event to access the file information when it is uploaded successfully.
1. Within the handler, get the name of the uploaded `PDF` file from the event data, get a reference to the PDFViewer, and call the [`fromFile()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer/methods/fromfile) to load the file that is uploaded on the server.
1. Call the jQuery [`show()`](http://api.jquery.com/show/) method to show the hidden PDFViewer.

```View_HtmlHelper
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
  <script>
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
  </script>

  @(Html.Kendo().Upload()
      .Name("files")
      .Multiple(false)
      .Async(a => a
          .Save("Async_Save", "Home")
          .Remove("Async_Remove", "Home")
          .AutoUpload(true)
      )
      .Events(e => e.Success("onSuccess"))
  )

  <div class="pdf-viewer-container" style="display: none;">
    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")
    )
  </div>
```
{% if site.core %}
```View_TagHelper
  @addTagHelper *, Kendo.Mvc

  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
  <script>
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
  </script>

   <kendo-upload name="files" multiple="false" on-success="onSuccess">
      <async auto-upload="true" save-url="@Url.Action("Async_Save", "Home")" remove-url="@Url.Action("Async_Remove", "Home")" />
    </kendo-upload>

  <div class="pdf-viewer-container" style="display: none;">
    <kendo-pdfviewer name="pdfviewer">
    </kendo-pdfviewer>
  </div>
```
{% endif %}
```Script.js
  <script>
      function onSuccess(e) {
          if (e.operation == "upload") {
              var viewer = $("#pdfviewer").data("kendoPDFViewer");
              var appRootDirectory = "@Url.Content("~")";
              var filePath = appRootDirectory + '/uploadedFiles/' + e.files[0].name;
              $(".pdf-viewer-container").show();
              viewer.fromFile(filePath);
          }
      }
  </script> 
```
{% if site.core %}
```HomeController
  using System.Net.Http.Headers;

  public async Task<ActionResult> Async_Save(IFormFile files)
  {
    var fileContent = ContentDispositionHeaderValue.Parse(files.ContentDisposition);
    var fileName = Path.GetFileName(fileContent.FileName.ToString().Trim('"'));
    var physicalPath = Path.Combine("wwwroot/uploadedFiles", fileName);

    using (var fileStream = new FileStream(physicalPath, FileMode.Create))
    {
        await files.CopyToAsync(fileStream);
    }

    // Return an empty string to signify success.
    return Content("");
  }

  public ActionResult Async_Remove(string fileNames)
  {
      if (fileNames != null)
      {
        var fileName = Path.GetFileName(fileNames);
        var physicalPath = Path.Combine("wwwroot/uploadedFiles", fileName);
        // TODO: Verify user permissions.
        if (System.IO.File.Exists(physicalPath))
        {
            System.IO.File.Delete(physicalPath);
        }
      }
      // Return an empty string to signify success.
      return Content("");
  }
```
{% else %}
```HomeController
    public ActionResult Async_Save(HttpPostedFileBase files)
    {
        if (files != null)
        {
            var fileName = Path.GetFileName(files.FileName.Trim('"'));
            var physicalPath = Path.Combine(Server.MapPath("~/wwwroot/uploadedFiles"), fileName);
            file.SaveAs(physicalPath);
        }

        // Return an empty string to signify success
        return Content("");
    }

    public ActionResult RemoveFile(string fileNames)
    {
        // The parameter of the Remove action must be called "fileNames"
        if (fileNames != null)
        {
            var fileName = Path.GetFileName(fileNames);
            var physicalPath = Path.Combine(Server.MapPath("~/wwwroot/uploadedFiles"), fileName);

            // TODO: Verify user permissions
            if (System.IO.File.Exists(physicalPath))
            {
                System.IO.File.Delete(physicalPath);
            }
        }

        // Return an empty string to signify success
        return Content("");
    }
```
{% endif %}

## More {{ site.framework }} Upload Resources

* [{{ site.framework }} Upload Documentation]({%slug htmlhelpers_upload_aspnetcore%})

* [{{ site.framework }} Upload Demos](https://demos.telerik.com/{{ site.platform }}/upload)

{% if site.core %}
* [{{ site.framework }} Upload Product Page](https://www.telerik.com/aspnet-core-ui/upload)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Upload Product Page](https://www.telerik.com/aspnet-mvc/upload)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Upload for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Server-Side API Reference of the Upload for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/upload)
* [Server-Side TagHelper API Reference of the Upload for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/upload)
* [Client-Side API Reference of the PDFViewer for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer)
* [Server-Side API Reference of the PDFViewer for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/pdfviewer)
* [Server-Side TagHelper API Reference of the PDFViewer for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/pdfviewer)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
