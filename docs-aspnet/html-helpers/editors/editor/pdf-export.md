---
title: PDF Export
page_title: Editor PDF Export
description: "Learn about the export capabilities of the Telerik UI Editor component for {{ site.framework }}."
slug: htmlhelpers_editor_pfd_export_aspnetcore
position: 13
---

# PDF Export

The Telerik UI Editor for {{ site.framework }} comes with a built-in option to export its content to PDF. To enable the PDF export, add the `Pdf` tool to the widget' toolbox:

```HtmlHelper
    @(Html.Kendo().Editor()
            .Name("editor")
            .Tools(tools => tools
                .Pdf()
            )
    )
```
{% if site.core %}
```TagHelper
    <kendo-editor name="editor">
        <tools>
	 	    <tool name="pdf">
	 	    </tool>
	    </tools>
    </kendo-editor>
```
{% endif %}

Customizations such as file name, font size, export of all pages can be added to the [`Pdf`](/api/Kendo.Mvc.UI.Fluent/EditorPdfSettingsBuilder) option of the widget:

```HtmlHelper
    @(Html.Kendo().Editor()
        .Name("editor")
        .Pdf(pdf => pdf
            .Margin(20, 20, 20, 20)
            .FileName("Telerik UI Editor Export")
            .ProxyURL(Url.Action("Pdf_Export_Save", "Editor"))
            .PaperSize("A4")
        )
        .Tools(tools => tools
            .Pdf()
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-editor name="editor">
        <tools>
	 	    <tool name="pdf">
	 	    </tool>
	    </tools>
	    <pdf paper-size="A4" file-name="Telerik UI Editor Export" proxy-url="/Editor/Pdf_Export_Save">
            <margin left="20" right="20" top="20" bottom="20" />
	    </pdf>
    </kendo-editor>
```
{% endif %}

## See Also

* [PDF Export in the Editor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/pdf-export)
* [Server-Side API](/api/editor)
