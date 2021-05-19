---
title: Razor Page
page_title: Configure the PDFViewer in Razor Page
description: "Learn how to configure the Telerik UI PDFViewer for {{ site.framework }} in RazorPages scenario."
slug: htmlhelpers_pdfviewer_aspnetcore_razor_page
position: 5
---

# Razor Page

This article demonstrates how to configure the Telerik UI PDFViewer HtmlHelper for {{ site.framework }} in a RazorPage scenario.

For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

## PDFjs Processing

The following example demonstrates how to initialize the PDFViewer HtmlHelper in RazorPage project by using [PDF.JS](https://mozilla.github.io/pdf.js/):

```tab-RazorPage(csthml)
    @page
    @model Telerik.Examples.RazorPages.Pages.PDFViewer.PDFViewerIndexModel

    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <h1>PDFViewerPDFJSProcessing</h1>

    @(Html.Kendo().PDFViewer()
            .Name("pdfviewer")
            .PdfjsProcessing(pdf => pdf.File(Url.Content("~/sample.pdf")))
            .Height(1200)
    )
```
```tab-PageModel(cshtml.cs)      
	public class PDFViewerIndexModel : PageModel
    {
        public void OnGet()
        {
        }
    }
```

## DPL Processing

The following example demonstrates how to initialize the PDFViewer by using the [Telerik Document Processing library](https://docs.telerik.com/devtools/document-processing/introduction):

```tab-RazorPage(csthml)
    @page
    @model Telerik.Examples.RazorPages.Pages.PDFViewer.PDFViewerDPLModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <h1>PDFViewerDPLProcessing</h1>

    @(Html.Kendo().PDFViewer()
            .Name("pdfviewer")
            .DplProcessing(dpl =>
            {
                dpl.Read(r=>r.Url("/PDFViewer/PDFViewerDPL?handler=Read"));
            })
    )
```
```tab-PageModel(cshtml.cs)      
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

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [PDFViewer Overview]({% slug htmlhelpers_pdfviewer_aspnetcore %})