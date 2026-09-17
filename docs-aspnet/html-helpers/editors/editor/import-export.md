---
title: Import and Export of Documents
page_title: Import and Export of Documents
description: "Import and export different types of documents with the Telerik UI Editor for ASP.NET MVC."
components: ["editor"]
slug: overview_importexportdpl_aspnetmvc
position: 11
---

# Import and Export of Documents

As of the R1 2017 release, the Telerik UI Editor for {{ site.framework }} enables you to import and export various types of documents through the dedicated export assembly. In current releases, use the `Telerik.Export.Core` NuGet package.

Along with the server-side integration of the [Telerik Document Processing](https://docs.telerik.com/devtools/document-processing/introduction) suite, the new `ExportAs` and `Import` tools which utilize the import and export functionality are available.

![{{ site.product_short }} Editor importing and exporting animation](import-export-animation.gif)

## Requirements

The import and export capabilities are bundled as part of the [UI for ASP.NET MVC suite]({% slug overview_aspnetmvc6_aspnetmvc %}). You can get the required assemblies from the `telerik.ui.for.aspnetmvc.<version>.zip` archive that contains a `Kendo.MVC.Export` folder with the assemblies for both .NET 4.0 and .NET 4.5 versions. For product versions after Q2 2025, use the `Telerik.Core.Export` NuGet package.

To start using the import and export functionality:

1. Add a reference in your project to the `Telerik.Export.Core` assembly, or install the `Telerik.Export.Core` NuGet package.
1. Add references in your project to the required [Telerik Document Processing libraries](https://docs.telerik.com/devtools/document-processing/introduction#libraries).

## Exporting Content from the Editor

1. Add the `ExportAs` tool.

    ```HtmlHelper
    @(Html.Kendo().Editor()
        .Name("Editor")
        .Tools(tools => tools
            .ExportAs()
        )
    )
    ```

    Alternatively, you can refine the options by configuring the `ExportAs` tool.

    ```HtmlHelper
    @(Html.Kendo().Editor()
        .Name("Editor")
        .Tools(tools => tools
            .ExportAs(export => export
                .Add("DOCX", "docx")
                .Add("RTF", "rtf")
                .Add("PDF", "pdf")
                .Add("HTML", "html")
                .Add("TXT", "txt")
            )
        )
    )
    ```

1. To enable the tool to contact the server and export a file, configure the `Proxy` method and, optionally, set up the name of the exported file through the `FileName` method.

    ```HtmlHelper
    @(Html.Kendo().Editor()
        .Name("Editor")
        .Tools(tools => tools
            .ExportAs()
        )
        .ExportAs(exportAs => exportAs
            .FileName("Export")
            .Proxy("Export", "Editor")
        )
    )
    ```

1. Implement the action method in the corresponding controller.

    ```C#
    using Telerik.Export.Core;
    ...
        [HttpPost]
        public ActionResult Export(EditorExportData data)
        {
            return EditorExport.Export(data);
        }
    ...
    ```

    To retrieve the Editor contents as an HTML string without downloading a file, call the client-side `value()` method. The method returns the serialized HTML, including its tags:

    ```JS dojo
    <script>
        var editor = $("#Editor").data("kendoEditor");
        var html = editor.value();
        console.log(html); // For example: <p><strong>Text</strong></p>
    </script>
    ```

    To download the contents as an HTML file, add `HTML` to the `ExportAs` items and configure the export proxy as shown above. The downloaded file contains HTML markup, which a browser renders as formatted content. To display the tags as text instead, use the `encodedValue()` method.

## Importing Content from Files

1. Add the `Import` tool.

    ```HtmlHelper
    @(Html.Kendo().Editor()
        .Name("Editor")
        .Tools(tools => tools
            .Import()
        )
    )
    ```

1. Configure the `Import` by using the `Proxy` and `AllowedExtensions` methods.

    > To send a file to the server, the `Import` tool integrates the [Telerik UI Upload HtmlHelper]({%slug htmlhelpers_upload_aspnetcore %}). You can configure it through the following exposed helper methods:
    >
    > * [`AllowedExtensions()`](/api/kendo.mvc.ui.fluent/uploadvalidationsettingsbuilder#allowedextensionssystemstring)
    > * [`MaxFileSize()`](/api/kendo.mvc.ui.fluent/uploadvalidationsettingsbuilder#maxfilesizesystemnullable)
    > * [`Complete()`](/api/kendo.mvc.ui.fluent/uploadeventbuilder#completesystemstring)
    > * [`Progress()`](/api/kendo.mvc.ui.fluent/uploadeventbuilder#progresssystemstring)
    > * [`Select()`](/api/kendo.mvc.ui.fluent/uploadeventbuilder#selectsystemstring)
    > * [`Success()`](/api/kendo.mvc.ui.fluent/uploadeventbuilder#successsystemstring)

    ```HtmlHelper
    @(Html.Kendo().Editor()
        .Name("Editor")
        .Tools(tools => tools
            .Import()
        )
        .Import(import => import
            .AllowedExtensions(new[] { "docx", "rtf", "html", "txt" })
            .Proxy("Import","Editor")
        )
    )
    ```

1. Implement the action method in the corresponding controller.

{% if site.core %}
    ```C#
    using Microsoft.AspNetCore.Http;
    using Telerik.Export.Core;
    ...
        public ActionResult Import(IFormFile file)
        {
            var settings = new EditorImportSettings();
            string htmlResult;
            switch (Path.GetExtension(file.FileName))
            {
                case ".docx":
                    htmlResult = EditorImport.ToDocxImportResult(file, settings);
                    break;
                case ".rtf":
                    htmlResult = EditorImport.ToRtfImportResult(file, settings);
                    break;
                default:
                    htmlResult = EditorImport.GetTextContent(file);
                    break;
            }

            return Json(new { html = htmlResult });
        }
    ...
    ```
{% else %}
    ```C#
    using Telerik.Export.Core;
    ...
        public ActionResult Import(HttpPostedFileBase file)
        {
            var settings = new EditorImportSettings();
            string htmlResult;
            switch (Path.GetExtension(file.FileName))
            {
                case ".docx":
                    htmlResult = EditorImport.ToDocxImportResult(file, settings);
                    break;
                case ".rtf":
                    htmlResult = EditorImport.ToRtfImportResult(file, settings);
                    break;
                default:
                    htmlResult = EditorImport.GetTextContent(file);
                    break;
            }

            return Json(new { html = htmlResult });
        }
    ...
    ```
{% endif %}

## Changing Import and Export Settings

The Document Processing Library provides settings for the import and export which enables you to fine-tune the way the content is handled in the supported document types. The following example demonstrates how to use [`HtmlImportSettings`](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/html/settings) so that you can process HTML images before they are exported to `RadFlowDocument`.

```C#
using Telerik.Export.Core;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
...
    [HttpPost]
    public ActionResult Export(EditorExportData data)
    {
        var settings = new EditorDocumentsSettings();
        settings.HtmlImportSettings.LoadImageFromUri += HtmlImportSettings_LoadImageFromUri;

        return EditorExport.Export(data, settings);
    }

    private void HtmlImportSettings_LoadImageFromUri(object sender, LoadImageFromUriEventArgs e)
    {
        var uri = e.Uri;
        var absoluteUrl = uri.StartsWith("http://") || uri.StartsWith("www.");
        if (!absoluteUrl)
        {
            var filePath = Server.MapPath(uri);
            using (var fileStream = System.IO.File.OpenRead(filePath))
            {
                using (var memoryStream = new MemoryStream())
                {
                    fileStream.CopyTo(memoryStream);
                    e.SetImageInfo(memoryStream.ToArray(), "png");
                }
            }
        }
    }
...
```

The following example demonstrates how to configure the import capabilities so that images are generated with inline base64 data in the HTML `<img>` tag. For more information on each setting that is supported by `EditorImportSettings`, refer to the [documentation on HTML export settings](https://docs.telerik.com/devtools/document-processing/libraries/radwordsprocessing/formats-and-conversion/html/settings#export-settings).

{% if site.core %}
```C#
using Microsoft.AspNetCore.Http;
using Telerik.Export.Core;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
...
    public ActionResult Import(IFormFile file)
    {
        var settings = new EditorImportSettings();
        settings.ImagesImportMode = ImagesExportMode.Embedded;
        string htmlResult = EditorImport.ToDocxImportResult(file, settings);

        return Json(new { html = htmlResult });
    }
...
```
{% else %}
```C#
using Telerik.Export.Core;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
...
    public ActionResult Import(HttpPostedFileBase file)
    {
        var settings = new EditorImportSettings();
        settings.ImagesImportMode = ImagesExportMode.Embedded;
        string htmlResult = EditorImport.ToDocxImportResult(file, settings);

        return Json(new { html = htmlResult });
    }
...
```
{% endif %}

## See Also

* [Document Import and Export by the Editor HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/editor/import-export)
* [EditorBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.ui.fluent/editorbuilder)
* [Editor Server-Side API](/api/editor)
