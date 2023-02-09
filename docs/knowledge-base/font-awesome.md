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
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Drawing API</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I embed custom fonts while working with the Kendo UI Drawing API library and exporting content in PDF?

## Solution

Custom fonts, including icon fonts such as [Font Awesome](https://fortawesome.github.io/Font-Awesome/), must be [available for embedding]({% slug drawingofhtmlelements_drawingapi %}#configuration-Custom) during the PDF export. Otherwise, the generated document will use a standard set of fonts as defined by the PDF Standard. These fonts normally cover only the [ASCII](https://en.wikipedia.org/wiki/ASCII) range.

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
               <span class="title">Title: #: Title #</span>
                </td>
            <td class="country">
                #: Country #
               </td>
            <td class="employeeID">
               #: EmployeeID #
                </td>
      </tr>
    </script>
    <script>
      $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
          fileName: "Kendo UI Grid Export.pdf",
          proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
        },
        dataSource: {
          type: "odata",
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees",
            }
          }
        },
        columns: [
          { title: "Photo", width: 140 },
          { title: "Details", width: 400 },
          { title: "Country" },
          { title: "EmployeeID" }
        ],
        rowTemplate: kendo.template($("#rowTemplate").html()),
        scrollable: false
      });
    </script>
```

## See Also

* [JavaScript API Reference: kendo.drawing.surface](/api/javascript/drawing/surface)
* [JavaScript API Reference: kendo.geometry.Transformation](/api/javascript/geometry/transformation)
