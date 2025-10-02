---
title: Embed Font Awesome Icons in PDF Files Exported with the Drawing API
page_title: Embed Font Awesome Icons in PDF Files Exported with the Drawing API Library
description: "Learn how to embed custom fonts while working with the Kendo UI Drawing API and exporting content in PDF."
slug: howto_embedfontawesome_inexportedpdf_drawingapi
previous_url: /framework/drawing/how-to/font-awesome
tags: telerik, kendo, jquery, drawing, library, api, embed, fontawesome, icons, in, exported, pdf
component: drawing
type: how-to
res_type: kb
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI Grid for jQuery</td>
</tr>
<tr>
<td>Version</td>
<td>2025.2.520</td>
</tr>
</tbody>
</table>

## Description

How can I embed custom fonts while working with the Kendo UI Drawing API library and exporting content in PDF?

## Solution

Custom fonts, including icon fonts such as [Font Awesome](https://github.com/FortAwesome/Font-Awesome), must be [available for embedding]({% slug drawingofhtmlelements_drawingapi %}#configuration-Custom) during the PDF export. Otherwise, the generated document will use a standard set of fonts as defined by the PDF Standard. These fonts normally cover only the [ASCII](https://en.wikipedia.org/wiki/ASCII) range.

The following example demonstrates how to achieve the desired scenario.

```dojo
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.css">

    <script>
      // The font file location must be set explicitly if it's not hosted in the same domain
      kendo.pdf.defineFont({
        "FontAwesome":
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/fonts/fontawesome-webfont.ttf"
      });
    </script>

    <div id="grid" />

    <script id="rowTemplate" type="text/x-kendo-tmpl">
        <tr class="k-alt" data-uid="#: uid #">
            <td class="photo">
               <i class="fa fa-2x">&\#xf164;</i>
               <i class="fa fa-thumbs-down fa-2x"></i>
                </td>
            <td class="details">
               <span class="name">Name: #: FullName #</span>
                </td>
            <td class="employees">
                #: HasEmployees #
               </td>
            <td class="employeeId">
               #: EmployeeId #
            </td>
      </tr>
    </script>
    <script>
      $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
          fileName: "Kendo UI Grid Export.pdf",
          proxyURL: "https://demos.telerik.com/service/v2/core/export"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/Employees",
            }
          }
        },
        columns: [
          { title: "Photo", width: 140 },
          { title: "FullName", width: 400 },
          { title: "HasEmployees" },
          { title: "EmployeeId" }
        ],
        rowTemplate: kendo.template($("#rowTemplate").html()),
        scrollable: false
      });
    </script>
```

## See Also

* [JavaScript API Reference: kendo.drawing.surface](/api/javascript/drawing/surface)
* [JavaScript API Reference: kendo.geometry.Transformation](/api/javascript/geometry/transformation)
