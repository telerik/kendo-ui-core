---
title: Embed Font Awesome in Exported PDF
page_title: Embed Font Awesome in Exported PDF
description: This article demonstrates how to embed Font Awesome Icons during PDF Export
---

# Embed Font Awesome in Exported PDF

Custom fonts, including icon fonts such as [Font Awesome](https://fortawesome.github.io/Font-Awesome/),
must be [available for embedding](/framework/drawing/drawing-dom#custom-fonts-and-pdf) during PDF Export.

Otherwise the generated document will use a standard set of fonts as defined by the PDF Standard.
These fonts normally cover only the ASCII range.

## Example - Embedding Font Awesome
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
