---
title: Adding a Barcode to the Editor and Exporting It to PDF
description: "Learn how to add a barcode to the {{ site.product }} Editor and export its content as a PDF document."
type: how-to
page_title: Adding a Barcode to the Editor and Exporting It to PDF
slug: editor-add-barcode-and-export-to-pdf
tags: editor, barcode, export, pdf
ticketid: 1528213
ticketed: true
res_type: kb
components: ["general"]
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Editor</td>
 </tr>
</table>

## Description

I want to have a Barcode inside the Editor and export everything to PDF when working with the {{ site.product }} components.

## Solution

You can achieve this requirement using the following approach:


```Razor Index.cshtml
<div id="barcodeContainer" style="display: none;">
    <div style="text-align:center;">
        @(Html.Kendo().Barcode().Name("barcode")
        .Value("2346722")
        .Width(280)
        .Height(100))
    </div>
</div>

<br />

@(Html.Kendo().Editor()
          .Name("editor")
          .HtmlAttributes(new { style = "width: 100%; height:700px", aria_label = "editor" })
          .Pdf(pdf => pdf
              .Margin(20, 20, 20, 20)
              .PaperSize("A4")
              .ProxyURL(Url.Action("Pdf_Export_Save", "Editor"))
          )
          .Tools(tools => tools
              .Clear()
              .Pdf()
          )
          .Value(@<text>
                <br/>
                <p style="text-align:center;">
                    <span style="font-family:Verdana, Geneva, sans-serif;font-size:large;">
                        <strong>Click the Export to PDF button</strong>
                    </span>
                </p>
           </text>)
    )
```
{% if site.core %}
```TagHelper Index.cshtml
@addTagHelper *, Kendo.Mvc

<div id="barcodeContainer" style="display: none;">
    <div style="text-align:center;">
        <kendo-barcode name="barcode" value="2346722" width="280" height="100"></kendo-barcode>
    </div>
</div>

<br />

<kendo-editor name="editor">
    <pdf paper-size="A4" proxy-url="@Url.Action("Pdf_Export_Save", "Editor")">
        <margin top="20" right="20" bottom="20" left="20" />
    </pdf>
    <tools>
        <tool name="clear" />
        <tool name="pdf" />
    </tools>
    <content>
        <br />
        <p style="text-align:center;">
            <span style="font-family:Verdana, Geneva, sans-serif;font-size:large;">
                <strong>Click the Export to PDF button</strong>
            </span>
        </p>
    </content>
</kendo-editor>
```
{% endif %}
```JS script.js
    $(document).ready(function () {
        var editor = $("#editor").data().kendoEditor;
        var barcode = $("#barcode").data().kendoBarcode;

        var image;
        barcode.exportImage().done(function (data) {
            image = data;
            editor.value("<div style='width: 100%; text-align: center;'><img src='" +
                image + "' />" + "<br/>" + editor.value());
        });
    });
```

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

* [Client-Side API Reference of the Editor for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
* [Server-Side API Reference of the Editor for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/editor)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
