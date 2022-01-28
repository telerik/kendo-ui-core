---
title: PDF Export
page_title: Editor PDF Export
description: "Learn about the export capabilities of the Telerik UI Editor HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_editor_pfd_export_aspnetcore
position: 13
---

# PDF Export

The Telerik UI Editor for {{ site.framework }} comes with a built-in option to export its content to PDF. To enable the PDF export, add the `Pdf` tool to the widget' toolbox:

````CSHTML
    @(Html.Kendo().Editor()
            .Name("editor")
            .Tools(tools => tools
                .Pdf()
            )
    )
````

Customizations such as file name, font size, export of all pages can be added to the [`Pdf`](/api/Kendo.Mvc.UI.Fluent/EditorPdfSettingsBuilder) option of the widget:

````CSHTML
    @(Html.Kendo().Editor()
        .Name("editor")
        .Pdf(pdf => pdf
            .Margin(20, 20, 20, 20)
            .FileName("Telerik UI Editor Export")
            .PaperSize("A4")
        )
        .Tools(tools => tools
            .Pdf()
        )
    )
````

## See Also

* [PDF Export in the Editor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/pdf-export)
* [Server-Side API](/api/editor)
