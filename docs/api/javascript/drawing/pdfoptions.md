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

#### Example

    <button class='export-doc k-button'>Export PDF with Print Dialog</button>
    <div class="content">
      <p>This PDF will automatically show the print dialog when opened.</p>
    </div>
    <script>
      $(".export-doc").click(function() {
        kendo.drawing.drawDOM($(".content"))
          .then(function(group) {
            return kendo.drawing.exportPDF(group, {
              autoPrint: true,
              paperSize: "A4"
            });
          })
          .done(function(data) {
            kendo.saveAs({
              dataURI: data,
              fileName: "AutoPrint.pdf"
            });
          });
      });
    </script>

### creator `String` *(default: "Kendo UI PDF Generator")*
The creator of the PDF document.

#### Example

    <button class='export-doc k-button'>Export PDF with Custom Creator</button>
    <div class="content">
      <p>This PDF has a custom creator field.</p>
    </div>
    <script>
      $(".export-doc").click(function() {
        kendo.drawing.drawDOM($(".content"))
          .then(function(group) {
            return kendo.drawing.exportPDF(group, {
              creator: "My Application v1.0",
              paperSize: "A4"
            });
          })
          .done(function(data) {
            kendo.saveAs({
              dataURI: data,
              fileName: "CustomCreator.pdf"
            });
          });
      });
    </script>

### date `Date`
The date when the PDF document is created. Defaults to `new Date()`.

#### Example

    <button class='export-doc k-button'>Export PDF with Custom Date</button>
    <div class="content">
      <p>This PDF has a specific creation date.</p>
    </div>
    <script>
      $(".export-doc").click(function() {
        kendo.drawing.drawDOM($(".content"))
          .then(function(group) {
            return kendo.drawing.exportPDF(group, {
              date: new Date(2024, 0, 1), // January 1, 2024
              paperSize: "A4"
            });
          })
          .done(function(data) {
            kendo.saveAs({
              dataURI: data,
              fileName: "CustomDate.pdf"
            });
          });
      });
    </script>

### imgDPI `Number`
The forced resolution (in dpi) of the images in the exported PDF document.
By default, the images are exported at their full resolution.

#### Example

    <button class='export-doc k-button'>Export PDF with Custom Image DPI</button>
    <div class="content">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="Sample"/>
      <p>Image exported at 150 DPI</p>
    </div>
    <script>
      $(".export-doc").click(function() {
        kendo.drawing.drawDOM($(".content"))
          .then(function(group) {
            return kendo.drawing.exportPDF(group, {
              imgDPI: 150,
              paperSize: "A4"
            });
          })
          .done(function(data) {
            kendo.saveAs({
              dataURI: data,
              fileName: "HighDPI.pdf"
            });
          });
      });
    </script>

### jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.

#### Example

    <button class='export-doc k-button'>Export PDF with Low JPEG Quality</button>
    <div class="content">
      <img src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAIAAABMXPacAAABNUlEQVR4nOzRQQkAIADAQBGTGMuA5jTGPdwlGGydfUecqQN+1wCsAVgDsAZgDcAagDUAawDWAKwBWAOwBmANwBqANQBrANYArAFYA7AGYA3AGoA1AGsA1gCsAVgDsAZgDcAagDUAawDWAKwBWAOwBmANwBqANQBrANYArAFYA7AGYA3AGoA1AGsA1gCsAVgDsAZgDcAagDUAawDWAKwBWAOwBmANwBqANQBrANYArAFYA7AGYA3AGoA1AGsA1gCsAVgDsAZgDcAagDUAawDWAKwBWAOwBmANwBqANQBrANYArAFYA7AGYA3AGoA1AGsA1gCsAVgDsAZgDcAagDUAawDWAKwBWAOwBmANwBqANQBrANYArAFYA7AGYA3AGoA1AGsA1gCsAVgDsAZgDcAagL0AAAD//2MDAiVFs2psAAAAAElFTkSuQmCC" alt="Sample"/>
      <p>Image exported with reduced quality (0.5)</p>
    </div>
    <script>
      $(".export-doc").click(function() {
        kendo.drawing.drawDOM($(".content"))
          .then(function(group) {
            return kendo.drawing.exportPDF(group, {
              jpegQuality: 0.5,
              paperSize: "A4"
            });
          })
          .done(function(data) {
            kendo.saveAs({
              dataURI: data,
              fileName: "LowQuality.pdf"
            });
          });
      });
    </script>

### keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.

#### Example

    <button class='export-doc k-button'>Export PDF with PNG Format Preserved</button>
    <div class="content">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="PNG Image"/>
      <p>PNG images will remain in PNG format</p>
    </div>
    <script>
      $(".export-doc").click(function() {
        kendo.drawing.drawDOM($(".content"))
          .then(function(group) {
            return kendo.drawing.exportPDF(group, {
              keepPNG: true,
              paperSize: "A4"
            });
          })
          .done(function(data) {
            kendo.saveAs({
              dataURI: data,
              fileName: "KeepPNG.pdf"
            });
          });
      });
    </script>

### keywords `String` *(default: null)*
Specifies the keywords of the exported PDF file.

#### Example

    <button class='export-doc k-button'>Export PDF with Keywords</button>
    <div class="content">
      <p>This PDF has search keywords defined.</p>
    </div>
    <script>
      $(".export-doc").click(function() {
        kendo.drawing.drawDOM($(".content"))
          .then(function(group) {
            return kendo.drawing.exportPDF(group, {
              keywords: "report, data, analysis, kendo ui",
              paperSize: "A4"
            });
          })
          .done(function(data) {
            kendo.saveAs({
              dataURI: data,
              fileName: "KeywordsDemo.pdf"
            });
          });
      });
    </script>

### landscape `Boolean` *(default: false)*
Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.

#### Example

    <button class='export-doc k-button'>Export PDF in Landscape Mode</button>
    <div class="content">
      <p>This content will be exported in landscape orientation.</p>
      <table style="width:100%; border-collapse: collapse;">
        <tr><td style="border:1px solid #ccc; padding:5px;">Column 1</td><td style="border:1px solid #ccc; padding:5px;">Column 2</td><td style="border:1px solid #ccc; padding:5px;">Column 3</td><td style="border:1px solid #ccc; padding:5px;">Column 4</td></tr>
        <tr><td style="border:1px solid #ccc; padding:5px;">Data 1</td><td style="border:1px solid #ccc; padding:5px;">Data 2</td><td style="border:1px solid #ccc; padding:5px;">Data 3</td><td style="border:1px solid #ccc; padding:5px;">Data 4</td></tr>
      </table>
    </div>
    <script>
      $(".export-doc").click(function() {
        kendo.drawing.drawDOM($(".content"))
          .then(function(group) {
            return kendo.drawing.exportPDF(group, {
              landscape: true,
              paperSize: "A4"
            });
          })
          .done(function(data) {
            kendo.saveAs({
              dataURI: data,
              fileName: "Landscape.pdf"
            });
          });
      });
    </script>

### margin `Object`
Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).

#### Example

    <button class='export-doc k-button'>Export PDF with Custom Margins</button>
    <div class="content">
      <p>This content will have custom margins on all sides.</p>
    </div>
    <script>
      $(".export-doc").click(function() {
        kendo.drawing.drawDOM($(".content"))
          .then(function(group) {
            return kendo.drawing.exportPDF(group, {
              margin: {
                top: "2cm",
                right: "1in", 
                bottom: "20mm",
                left: 72 // 72pt = 1 inch
              },
              paperSize: "A4"
            });
          })
          .done(function(data) {
            kendo.saveAs({
              dataURI: data,
              fileName: "CustomMargins.pdf"
            });
          });
      });
    </script>

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

#### Example

    <button class='export-doc k-button'>Export PDF with Subject</button>
    <div class="content">
      <p>This PDF has a custom subject field.</p>
    </div>
    <script>
      $(".export-doc").click(function() {
        kendo.drawing.drawDOM($(".content"))
          .then(function(group) {
            return kendo.drawing.exportPDF(group, {
              subject: "Monthly Sales Report Analysis",
              paperSize: "A4"
            });
          })
          .done(function(data) {
            kendo.saveAs({
              dataURI: data,
              fileName: "SubjectDemo.pdf"
            });
          });
      });
    </script>

### title `String` *(default: null)*
Sets the title of the PDF file.

#### Example

    <button class='export-doc k-button'>Export PDF with Title</button>
    <div class="content">
      <p>This PDF has a custom title field.</p>
    </div>
    <script>
      $(".export-doc").click(function() {
        kendo.drawing.drawDOM($(".content"))
          .then(function(group) {
            return kendo.drawing.exportPDF(group, {
              title: "Quarterly Business Report - Q4 2024",
              paperSize: "A4"
            });
          })
          .done(function(data) {
            kendo.saveAs({
              dataURI: data,
              fileName: "TitleDemo.pdf"
            });
          });
      });
    </script>

