---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to configure the Telerik UI PDFViewer for {{ site.framework }} in RazorPages scenario."
components: ["pdfviewer"]
slug: htmlhelpers_pdfviewer_aspnetcore_razor_page
position: 7
---

# PDFViewer in Razor Pages 

This article describes how to seamlessly integrate and configure the Telerik UI Loader for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## PDFjs Processing

> Starting with version 2024 R4, the PDFViewer requires PDF.js version 4+. For more information, refer to the [PDF.js processing documentation]({% slug htmlhelpers_pdfviewer_pdfjs_processing_aspnetcore%}).

The following example demonstrates how to initialize the PDFViewer in a Razor Pages application by using [PDF.JS](https://mozilla.github.io/pdf.js/):

{% if site.core %}
```C# Program.cs
    builder.Services.AddKendo(x => x.RenderAsModule = true);
```
{% else %}
```Global.asax
    KendoMvc.Setup(options =>
    {
        options.RenderAsModule = true;
    });
```
{% endif %}
```HtmlHelper
    @page
    @model PDFViewerIndexModel

    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.mjs" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.mjs" type="module"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" type="module"></script>
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.all.min.js" type="module"></script>
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.aspnetmvc.min.js" type="module"></script>

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <h1>PDFViewerPDFJSProcessing</h1>

    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")
        .PdfjsProcessing(pdf => pdf.File(Url.Content("~/sample.pdf")))
        .Height(1200)
    )
```
{% if site.core %}
```TagHelper
    @page
    @model PDFViewerIndexModel

    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.mjs" type="module"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.mjs" type="module"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" type="module"></script>
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.all.min.js" type="module"></script>
    <script src="https://cdn.kendostatic.com/2024.4.1112/js/kendo.aspnetmvc.min.js" type="module"></script>

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <h1>PDFViewerPDFJSProcessing</h1>

    <kendo-pdfviewer height="1200" name="pdfviewer">
        <pdfjs-processing file="@Url.Content("~/sample.pdf")"/>
    </kendo-pdfviewer>
```
{% endif %}
```C# PageModel
	public class PDFViewerIndexModel : PageModel
    {
        public void OnGet()
        {
        }
    }
```

For the complete project, refer to the [PDFViewer in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/PDFViewer/PDFViewerIndex.cshtml).

## DPL Processing

The following example demonstrates how to initialize the PDFViewer by using the [Telerik Document Processing library](https://docs.telerik.com/devtools/document-processing/introduction) in a Razor Pages application.

```HtmlHelper
    @page
    @model PDFViewerDPLModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <h1>PDFViewerDPLProcessing</h1>

    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")
        .DplProcessing(dpl =>
        {
            dpl.Read(r => r.Url(Url.Page("PDFViewerDPL", "Read")));
        })
    )
```
{% if site.core %}
```TagHelper
    @page
    @model PDFViewerDPLModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <h1>PDFViewerDPLProcessing</h1>

    <kendo-pdfviewer name="pdfviewer">
        <dpl-processing>
            <read url="@Url.Page("PDFViewerDPL", "Read")"/>
        </dpl-processing>
    </kendo-pdfviewer>
```
{% endif %}
```C# PageModel
	public class PDFViewerDPLModel : PageModel
    {
        private IHostingEnvironment _hostingEnvironment;

        public PDFViewerDPLModel(IHostingEnvironment environment)
        {
            _hostingEnvironment = environment;
        }

        public void OnGet()
        {
        }

        public IActionResult OnGetRead(int? pageNumber)
        {
            string filePath = Path.Combine(_hostingEnvironment.WebRootPath, "sample.pdf");
            FileStream stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            JsonResult jsonResult;
            FixedDocument doc = FixedDocument.Load(stream);

            if (pageNumber == null)
            {
                jsonResult = new JsonResult(doc.ToJson());
            }
            else
            {
                jsonResult = new JsonResult(doc.GetPage((int)pageNumber));
            }

            return jsonResult;
        }
    }
```

For the complete project, refer to the [PDFViewer in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/PDFViewer/PDFViewerDPL.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the PDFViewer](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer)
* [Server-Side HtmlHelper API of the PDFViewer](/api/pdfviewer)
* [Server-Side TagHelper API of the PDFViewer](/api/taghelpers/pdfviewer)
* [Knowledge Base Section](/knowledge-base)
