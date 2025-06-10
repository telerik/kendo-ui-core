---
title: PDFOptions
page_title: API reference for methods and fields of the PDF generation options
res_type: api
---

# kendo.drawing.PDFOptions

PDF generation options.

## Fields


### autoPrint `Boolean` *(default: false)*
Specifies if the Print dialog should be opened immediately after loading the document.

> **Note:** Some PDF Readers/Viewers will not allow opening the Print Preview by default, it might be necessary to configure the corresponding add-on or application.

### creator `String` *(default: "Kendo UI PDF Generator")*
The creator of the PDF document.

### date `Date`
The date when the PDF document is created. Defaults to `new Date()`.

### imgDPI `Number`
The forced resolution (in dpi) of the images in the exported PDF document.
By default, the images are exported at their full resolution.

### jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.

### keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.

### keywords `String` *(default: null)*
Specifies the keywords of the exported PDF file.

### landscape `Boolean` *(default: false)*
Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.

### margin `Object`
Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).

#### margin.bottom `Number|String` *(default: 0)*
The bottom margin. Numbers are considered as "pt" units.

#### margin.left `Number|String` *(default: 0)*
The left margin. Numbers are considered as "pt" units.

#### margin.right `Number|String` *(default: 0)*
The right margin. Numbers are considered as "pt" units.

#### margin.top `Number|String` *(default: 0)*
The top margin. Numbers are considered as "pt" units.

### paperSize `Object` *(default: "auto")*
Specifies the paper size of the PDF document.
The default "auto" means paper size is determined by content.

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

Supported values:

* A predefined size. The supported paper sizes are: A0-A10, B0-B10, C0-C10, Executive, Folio, Legal, Letter, Tabloid.
* An array of two numbers specifying the width and height in points (1pt = 1/72in)
* An array of two strings specifying the width and height in units.
  Supported units are "mm", "cm", "in" and "pt".

#### Example - set the paper size of the PDF document

    <button class='export-doc k-button'>Export as PDF</button>
    <div class="content">
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam est justo, fermentum id nisl at, luctus tincidunt augue. Vestibulum dui lorem, imperdiet id condimentum vitae, rutrum sit amet velit. Curabitur neque arcu, tristique sit amet turpis eget, blandit accumsan velit. Praesent facilisis quam at mauris finibus, aliquet semper ligula viverra. Cras dolor diam, dignissim ut luctus vel, imperdiet in velit. Integer suscipit non leo eu commodo. Phasellus tempus mi sem, non faucibus metus semper ac. Etiam arcu nulla, laoreet ac risus sit amet, imperdiet condimentum diam. Fusce mollis porta arcu, id accumsan lectus tempor ut. Phasellus at risus justo. Integer quis vulputate enim
      </div>
    </div>
    <script>
      $(".export-doc").click(function() {
        // Convert the DOM element to a drawing using kendo.drawing.drawDOM
        kendo.drawing.drawDOM($(".content"))
          .then(function(group) {

          var content = new kendo.drawing.Group();
          content.append(group);

          return kendo.drawing.exportPDF(content,{
            paperSize: "A4",
            margin: "1cm"
          });
        })
          .done(function(data) {
          kendo.saveAs({
            dataURI: data,
            fileName: "Map.pdf",
            proxyURL: "https://demos.telerik.com/service/v2/core/export"
          });
        });
      });
    </script>

### subject `String` *(default: null)*
Sets the subject of the PDF file.

### title `String` *(default: null)*
Sets the title of the PDF file.

