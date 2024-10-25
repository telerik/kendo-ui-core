---
title: Export PDF file from an Editor and Load it into a PDFViewer
description: How can I export a PDF file from a hidden Editor and load it into a PDFViewer? Follow the steps in the Knowledge Base section of the {{ site.product }} components.
type: how-to
page_title: Export PDF file from an Editor and Load it into a PDFViewer
slug: editor-export-pdf-load-in-pdfviewer
tags: editor, pdfviewer, export, pdf
res_type: kb
ticketid: 1581592
component: editor, pdfviewer
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2022.3.913</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Editor for Progress® Telerik® {{ site.product_short }}</td>
		</tr>
        <tr>
			<td>Product</td>
			<td>PDFViewer for Progress® Telerik® {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>


## Description

How can I export a PDF file with a page template from a hidden Editor and load it into a PDFViewer?

## Solution

The example below relies on the following key steps:

1. Create a hidden [Editor with specified PDF export settings](https://demos.telerik.com/{{ site.platform }}/editor/pdf-export), a [page template](https://docs.telerik.com/kendo-ui/framework/drawing/pdf-output/page-templates), and a [PDFViewer](https://demos.telerik.com/{{ site.platform }}/pdfviewer).
1. Override the default implementation of the [`saveAsPDF()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor/methods/saveaspdf) method of the Editor so the data about the PDF file is accessible in the returned promise in the PdfExport event handler.
1. Handle the [`PdfExport event`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/editoreventbuilder#pdfexportsystemfunc) of the editor and pass the file to the PDFViewer by using the [`fromFile()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer/methods/fromfile) method.
1. When the page is loaded, get a reference to the hidden Editor, set the page template in the Editor's PDF options, and trigger its `saveAsPDF()` method.


    ```Index.cshtml
        @(Html.Kendo().PDFViewer()
            .Name("pdfviewer")
        )

        <div class="editor-block" style="visibility: hidden;">
            @(Html.Kendo().Editor()
                .Name("editor")
                .Pdf(pdf => pdf
                    .Margin(20, 20, 20, 20)
                    .PaperSize("A4")
                )
                .Tools(tools => tools
                    .Pdf()
                )
                .Events(events => events.PdfExport("onPdfExport"))
                .Value(@<text>Editor content</text>)
            )   
        </div>
    ```
    ```JavaScript
        <script>
            // Ensure that the script below is included before the initialization of the Editor.
            kendo.ui.Editor.fn.saveAsPDF = function() {
                var progress = new $.Deferred();
                var promise = progress.promise();
                var args = { promise: promise };

                if (this.trigger("pdfExport", args)) {
                return;
                }

                var options = this.options.pdf;

                this._drawPDF(progress)
                .then(function(root) {
                return kendo.drawing.exportPDF(root, options);
                })
                .done(function(dataURI) {
                progress.resolve(dataURI);
                })
                .fail(function(err) {
                progress.reject(err);
                });
                return promise;
            };

            function onPdfExport(e) {
                e.promise.then(function(data) {
                    var viewer = $("#pdfviewer").data("kendoPDFViewer");
                    viewer.fromFile({ data: data.split(',')[1] });
                });
            }

            $(document).ready(function () {
                var editorComponent = $("#editor").getKendoEditor();
                editorComponent.options.pdf.template = $("#page-template").html();
                editorComponent.saveAsPDF();
            });
        </script>

    ```
    ```PDF_PageTemplate
        <script type="x/kendo-template" id="page-template">
            <div class="page-template" style="position:absolute; top:0; left:0; width:100%; height:100%">
                <div class="header" style="position:absolute; top:10px; left:20px; width:100%; font-size:18px; border-bottom: 1px solid black;">
                    Header Text
                </div>
                <div class="footer" style="position:absolute; bottom:20px; right:10px; width:100%;">
                    <div style="float: right">Page #: pageNum # of #: totalPages #</div>
                </div>
            </div>
        </script>
    ```

For a runnable example based on the code above, refer to the [REPL example on exporting a PDF file from an Editor](https://netcorerepl.telerik.com/wmFaGhGv31uIA5d258).

## More {{ site.framework }} Editor Resources

* [{{ site.framework }} Editor Documentation]({%slug htmlhelpers_editor_aspnetcore%})

* [{{ site.framework }} Editor Demos](https://demos.telerik.com/{{ site.platform }}/editor)

{% if site.core %}
* [{{ site.framework }} Editor Product Page](https://www.telerik.com/aspnet-core-ui/editor)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Editor Product Page](https://www.telerik.com/aspnet-mvc/editor)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Exporting a PDF File from an Editor and Loading It into a PDFViewer](https://netcorerepl.telerik.com/wmFaGhGv31uIA5d258)
* [Client-Side API Reference of the Editor for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
* [Client-Side API Reference of the PDFViewer for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer)
* [Server-Side API Reference of the Editor for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/editor)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
