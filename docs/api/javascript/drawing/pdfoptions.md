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


<div class="meta-api-description">
configure automatic print dialog on PDF load control automatic printing trigger print preview popup immediately after PDF rendering enable or disable print prompt on document open manage print dialog behavior when loading PDF in drawing control auto-launch of system print window upon PDF display set print dialog auto-trigger for PDF viewer control print preview popup timing for PDF documents adjust automatic print dialog activation on PDF open toggle print dialog prompt when PDF finishes loading manage print dialog visibility during PDF rendering in drawing interface
</div>

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


<div class="meta-api-description">
Configure or modify the PDF document's author or creator metadata string during export from drawing or graphic components, enabling setting, updating, or retrieving the creator information embedded within the PDF file properties. This functionality supports controlling the metadata tag that identifies the document creator, author name, or originator details for generated PDFs, useful for customizing or automating document identification, tracking, and metadata management in export workflows.
</div>

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


<div class="meta-api-description">
Configure or override the PDF file creation date and timestamp embedded in the document metadata by setting or specifying the exact date and time for the generated PDF file, controlling document creation timestamps, modifying or customizing the file’s date attribute, adjusting or defining the PDF generation datetime, setting the creation time to a specific JavaScript Date value, controlling metadata dates, customizing the embedded date field, enabling accurate document date tracking, and managing timestamp information within the PDF output.
</div>

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


<div class="meta-api-description">
Set or adjust the image resolution and quality in exported PDFs by specifying the dots-per-inch (DPI) value for embedded images, enabling control over image sharpness, clarity, and file size during PDF generation. Configure the image export DPI to enforce a fixed resolution regardless of source image properties, optimize output visuals for printing or screen display by scaling image dpi, or reduce PDF file size by lowering image dpi settings. This option helps customize the pixel density of images inside PDFs created through drawing or export components, supporting use cases like high-quality print export, performance tuning, or balanced quality-size trade-offs.
</div>

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


<div class="meta-api-description">
Adjust image compression quality for JPEG images when exporting drawings to PDF by setting or retrieving the compression level as a value between 0 and 1, where higher numbers increase image clarity and detail but also result in larger PDF file sizes; control the balance between image fidelity and file size for exported graphics, optimize visual quality in exported documents, configure JPEG compression ratio, set image quality for PDF export, manage file size versus visual sharpness, and fine-tune export image settings for drawings.
</div>

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


<div class="meta-api-description">
Control the preservation of PNG image quality, transparency, and original file format when exporting drawings or graphics to PDF by embedding PNG files directly instead of converting them to other formats. Enable or disable the retention of PNG images in their native format within PDF exports to avoid loss of fidelity, maintain transparent backgrounds, and ensure accurate image reproduction. Adjust settings to keep embedded PNGs intact during PDF generation for better image clarity, transparency support, and precise visual output. This option is useful for configuring image export behavior, maintaining original raster image properties, and optimizing PDF content with unaltered PNG graphics.
</div>

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


<div class="meta-api-description">
Set or update the searchable metadata terms, keywords, tags, or phrases embedded in a PDF file generated from drawings to improve document indexing, searchability, content discovery, and metadata customization, enabling control over the PDF’s keyword properties for better organization, retrieval, and classification in exported files.
</div>

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


<div class="meta-api-description">
Enable or configure landscape orientation for PDF export by setting the page layout to use wider horizontal dimensions instead of the default vertical portrait style, allowing control over the page orientation, paper size reversal, and layout formatting to ensure drawings or documents print and display correctly with width as the dominant edge on exported PDFs.
</div>

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


<div class="meta-api-description">
Set or adjust export margins for PDF files generated from drawings, specifying distances around page content using numbers or strings with units such as millimeters, centimeters, inches, or points. Control page border spacing, page padding, printable area edges, and layout margins by entering values like plain numbers interpreted as points or styled strings like "10mm" or "0.5in" to customize PDF page boundaries when exporting vector graphics or drawings. Configure, define, or customize printable margins and page offsets to ensure proper whitespace and alignment in exported PDFs.
</div>

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


<div class="meta-api-description">
Configure, set, or control the PDF export paper dimensions by specifying standard paper sizes like A0 through A10, B0 through B10, C0 through C10, Executive, Folio, Legal, Letter, or Tabloid, or by defining custom width and height using numeric or string-based units including points, inches, centimeters, or millimeters; enable automatic sizing to fit content dimensions where 1 pixel corresponds to 1/72 inch, allowing flexible adjustment of PDF page layout, page format, document size, printable area, and output scale for exporting vector or raster drawings, ensuring precise control over PDF page measurements for drawing exports.
</div>

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


<div class="meta-api-description">
Configure the PDF document subject metadata to customize or set the descriptive subject field embedded within exported PDF files, control the PDF's subject property for identification and categorization, specify or update the metadata tag for PDF export, assign a meaningful subject label that appears in document properties, and manage the exported PDF's metadata content related to the subject for better searchability and organization when generating PDFs from drawing or design components.
</div>

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


<div class="meta-api-description">
Configure or set the document title metadata for the exported PDF file when converting or saving drawings, graphics, or components to PDF format, enabling control over the file’s title property visible in PDF viewers and document info. Adjust or update the PDF output’s title field for identification, indexing, searchability, and proper labeling of generated PDF documents, ensuring the exported file carries the desired descriptive title metadata used for document management, display, or printing purposes.
</div>

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

