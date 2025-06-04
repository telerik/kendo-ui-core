---
title: DPL Processing
page_title: DPL Processing
description: "Learn how to use the Telerik Document Processing library in the Telerik UI PDFViewer component for {{ site.framework }}."
previous_url: /helpers/pdf/pdfviewer/dpl-processing
slug: htmlhelpers_pdfviewer_dpl_processing_aspnetcore
position: 3
---

# DPL Processing

You can configure the PDFViewer to use the [Telerik Document Processing library](https://docs.telerik.com/devtools/document-processing/introduction) for PDF processing.

> DPL Processing is in its beta version and has the following limitations:
> * The clipping of elements and gradients is currently not supported.
> * SVG or encoded images in other formats might not render correctly.

## Requirements

* DPL Processing depends on the `Telerik.Web.PDF` assembly.
* To use DPL Processing, the application must target <a href="https://learn.microsoft.com/en-us/dotnet/standard/net-standard?tabs=net-standard-2-0#select-net-standard-version" target="_blank">.NET Standard 2.0</a>.
* The `Read()` option is mandatory.

## Basic Configuration

The following example demonstrates how to configure the PDFViewer to use DPL Processing.

```HtmlHelper
@(Html.Kendo().PDFViewer()
    .Name("pdfviewer")
    .DplProcessing(dpl => {
        dpl.Read(r => r.Url(Url.Action("GetInitialPdf", "PDFViewer")));
        dpl.Upload(upload => upload.Url(Url.Action("GetPdf", "PDFViewer")).SaveField("file"));
        dpl.LoadOnDemand(true);
    })
    .Toolbar(toolbar =>
        toolbar.Items(items =>
        {
            items.Add().Command("PageChangeCommand").Type("pager").Name("pager");
            items.Add().Name("spacer").Type("spacer");
            items.Add().Command("OpenCommand").Type("button").Name("open").Icon("folder-open");
        })
    )
    .Height(1200)
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-pdfviewer name="pdfviewer" height="1200">
    <dpl-processing load-on-demand="true">
        <read url="@Url.Action("GetInitialPdf","PDFViewer")" />
        <upload url="@Url.Action("GetPdf","PDFViewer")" save-field="file" />
    </dpl-processing>
    <toolbar enabled="true">
        <pdfviewer-toolbar-items>
            <pdfviewer-toolbar-item name="pager" command="PageChangeCommand" type="pager"></pdfviewer-toolbar-item>
            <pdfviewer-toolbar-item name="spacer" type="spacer"></pdfviewer-toolbar-item>
            <pdfviewer-toolbar-item name="open"
                command="OpenCommand" 
                type="button"
                icon="folder-open">
            </pdfviewer-toolbar-item>
        </pdfviewer-toolbar-items>
    </toolbar>
</kendo-pdfviewer>
```
```C# Controller
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Telerik.Web.PDF;

namespace ProjectName.Controllers
{
    public class PDFViewerController : Controller
    {
        public IActionResult GetInitialPdf(int? pageNumber)
        {
            JsonResult jsonResult;
            byte[] file = System.IO.File.ReadAllBytes($"wwwroot{Path.DirectorySeparatorChar}App_Data{Path.DirectorySeparatorChar}sample.pdf");
            FixedDocument doc = FixedDocument.Load(file, true);

            if (pageNumber == null)
            {
                jsonResult = Json(doc.ToJson());
            }
            else
            {
                jsonResult = Json(doc.GetPage((int)pageNumber));
            }

            return jsonResult;
        }

        [HttpPost]
        public IActionResult GetPdf(IFormFile file)
        {
            byte[] data;
            using (Stream inputStream = file.OpenReadStream())
            {
                MemoryStream memoryStream = inputStream as MemoryStream;
                if (memoryStream == null)
                {
                    memoryStream = new MemoryStream();
                    inputStream.CopyTo(memoryStream);
                }
                data = memoryStream.ToArray();
            }
            FixedDocument dox = FixedDocument.Load(data);
            return Json(dox.ToJson());
        }
    }
}
```
{% else %}
```C# Controller
using Newtonsoft.Json;
using System;
using System.IO;
using System.Web;
using System.Web.Mvc;
using Telerik.Web.PDF;

namespace ProjectName.Controllers
{
    public class PDFViewerController : Controller
    {
        public ActionResult GetInitialPdf(int? pageNumber)
        {
            JsonResult jsonResult;
            byte[] file = System.IO.File.ReadAllBytes(Server.MapPath("~/Content/web/pdfViewer/DPLsample.pdf"));
            FixedDocument doc = FixedDocument.Load(file, true);

            if (pageNumber == null)
            {
                jsonResult = Json(doc.ToJson(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                jsonResult = Json(doc.GetPage((int)pageNumber), JsonRequestBehavior.AllowGet);
            }

            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [HttpPost]
        public ActionResult GetPdf(HttpPostedFileBase file)
        {
            byte[] data;
            using (Stream inputStream = file.InputStream)
            {
                MemoryStream memoryStream = inputStream as MemoryStream;
                if (memoryStream == null)
                {
                    memoryStream = new MemoryStream();
                    inputStream.CopyTo(memoryStream);
                }
                data = memoryStream.ToArray();
            }
            FixedDocument dox = FixedDocument.Load(data);

            var resultData = dox.ToJson();

            var result = new ContentResult
            {
                Content = JsonConvert.SerializeObject(resultData),
                ContentType = "application/json"
            };

            return result;
        }
    }
}
```
{% endif %}

> Starting with version 2024 Q4, the `FixedDocument.Load` and `FixedDocument.Download` methods and their overloads accept an additional, optional parameter—`TimeSpan timeOut`. The parameter indicates the timeout for the operation and defaults to 1 minute.

## See Also

* [DPL Processing by the PDFViewer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pdfviewer/dpl-processing)
* [Server-Side API](/api/pdfviewer)
{% if site.core %}* [Server-Side TagHelper API](/api/taghelpers/pdfviewer){% endif %}
