---
title: Add Barcode to Editor and Export to PDF
description: An example on how to add barcode to edtior and export to PDF.
type: how-to
page_title: Add Barcode to Editor and Export to PDF
slug: editor-add-barcode-and-export-to-pdf
tags: editor, barcode, export, pdf
ticketid: 1528213
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Editor for Progress® Telerik® UI</td>
 </tr>
</table>

## Description

I want to have a Barcode inside the Editor and export everything to PDF.

## Solution

You can achieve this requirement using the following approach:


```Index.cshtml
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
```script.js
    $(document).ready(function () {
        var editor = $("#editor").data().kendoEditor;
        var barcode = $("#barcode").data().kendoBarcode;

        var image;
        barcode.exportImage().done(function (data) {
            image = data;
            editor.value("<div style='width: 100%; text-align: center;'><img src='" +
                image + "'></img>" + "<br/>" + editor.value());
        });
    });
```
