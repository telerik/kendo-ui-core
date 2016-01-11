---
title: Embed Font Awesome in Exported PDF
page_title: Embed Font Awesome in Exported PDF | Kendo UI Drawing API
description: "Learn how to embed custom fonts while working with the Kendo UI Drawing API and exporting content in PDF."
slug: howto_embedfontawesome_inexportedpdf_drawingapi
---

# Embed Font Awesome in Exported PDF

Custom fonts, including icon fonts such as [Font Awesome](https://fortawesome.github.io/Font-Awesome/), must be [available for embedding]({% slug drawingofhtmlelements_drawingapi %}#configuration-Custom) during PDF Export. Otherwise, the generated document will use a standard set of fonts as defined by the PDF Standard. These fonts normally cover only the [ASCII](https://en.wikipedia.org/wiki/ASCII) range.

The example below demonstrates how to embed custom fonts while working with the Kendo UI Drawing API and exporting content in PDF.

###### Example

```html
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.css">

    <script>
      // The font file location must be set explicitly if it's not hosted in the same domain
      kendo.pdf.defineFont({
        "FontAwesome":
            "http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/fonts/fontawesome-webfont.ttf"
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
          proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
        },
        dataSource: {
          type: "odata",
          transport: {
            read: {
              url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees",
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

Other articles and how-to examples on Kendo UI Drawing API:

* [JavaScript API Reference: kendo.drawing.surface](/api/javascript/drawing/surface)
* [JavaScript API Reference: kendo.geometry.Transformation](/api/javascript/geometry/transformation)
* [PDF Options JavaScript API Reference](/api/javascript/drawing/pdfoptions)
* [Overview of the Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Apply Transformations During Export]({% slug howto_applytransformationsduringexport_drawingapi %})
* [How to Implement Free-Form Drawing]({% slug howto_embedfontawesome_inexportedpdf_drawingapi %})
