---
title: Spreadsheet
page_title: Configuration, methods and events of Kendo UI Spreadsheet
description: Code examples for Spreadsheet UI widget configuration. Learn how to use methods and which events to set once the Spreadsheet UI widget is initialized.
res_type: api
component: spreadsheet
---

# kendo.ui.Spreadsheet

Represents the Kendo UI Spreadsheet widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### activeSheet `String`

The name of the currently active sheet. Must exactly match one of the (sheet names)[#configuration-sheets.name].


<div class="meta-api-description">
How to get the currently active sheet in Kendo UI for jQuery Spreadsheet widget? Control or retrieve the current visible or focused sheet within a spreadsheet by selecting, setting, or switching the active tab, page, or worksheet name to determine which sheet is displayed, focused, or interacted with. This feature enables dynamically setting, getting, or changing which worksheet or sheet tab is currently active or frontmost, ensuring that user actions or automated scripts target the correct sheet based on exact sheet names or identifiers within multi-sheet workbooks. It supports scenarios like navigating to, highlighting, or programmatically focusing on specific sheets by their precise names for viewing, editing, or processing tasks.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        activeSheet: "Sheet2",
        sheets: [
          { name: "Sheet1" },
          { name: "Sheet2" },
          { name: "Sheet3" }
        ]
      });
    </script>

### columnWidth `Number` *(default: 64)*

The default column width in pixels.


<div class="meta-api-description">
How do I set default column widths in Kendo UI Spreadsheet? Set or adjust the default width of spreadsheet columns in pixels, controlling the initial sizing and layout for all columns unless individually specified; configure, define, customize, or change column widths for better data presentation, appearance, spacing, and grid formatting, enabling consistent or dynamic column sizing when loading or rendering tabular data in spreadsheet or grid components.
</div>

#### Example - setting the default columns' width

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        columnWidth: 150,
      });
    </script>

### columns `Number` *(default: 50)*

The number of columns in the document.


<div class="meta-api-description">
How do I set the total number of columns in a Kendo UI Spreadsheet widget? Set or configure the total number of columns in a spreadsheet or grid layout during initialization, controlling how many vertical divisions the document contains; adjusting column count impacts layout structure, cell indexing, navigation through columns, resizing behavior, copy and paste boundaries, data binding across columns, and overall grid operations, enabling developers to define column quantity for custom data presentation, user interface arrangement, spreadsheet dimensions, dynamic or fixed column setups, and seamless multi-column interactions within the spreadsheet component.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        columns: 100
      });
    </script>

### defaultCellStyle `Object`

The default cell styles that will be applied to the sheet cells.


<div class="meta-api-description">
How do I customize the default appearance of cells in a Kendo UI for jQuery Spreadsheet? Set or customize the default appearance and formatting applied to all spreadsheet cells, including font choices, text colors, backgrounds, alignment, borders, and numeric or date formats. Control baseline cell styles to establish consistent sheet-wide formatting, enabling configuration of how text looks, how numbers display, how cell backgrounds and borders appear, and how content aligns by default across the entire sheet. Adjust initial general styling for spreadsheet cells, including text styling, colors, borders, alignment options, and number presentation to create uniform and visually coherent sheets.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        defaultCellStyle: {
          background: "#f5f5f5",
          color: "#333",
          fontFamily: "Arial",
          fontSize: "12px",
          bold: true
        }
      });
    </script>

### defaultCellStyle.background `String`

The background [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) of the cell.


<div class="meta-api-description">
How can I change the default background color in Kendo UI Spreadsheet? Configure or change the default cell fill color and background shade using any CSS-compatible color value such as hexadecimal codes, RGB or RGBA values, HSL formats, or named color keywords to control the default appearance of spreadsheet cells, enabling setting and customizing cell backgrounds, fill styles, or default shading for all unstyled cells in spreadsheet grids or tables.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        defaultCellStyle: {
          background: "#e6f3ff"
        }
      });
    </script>

### defaultCellStyle.color `String`

The text [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) of the cell.


<div class="meta-api-description">
How to set default font color for all cells in Kendo UI Spreadsheet? Configure or set the default text color and font hue for spreadsheet cells, controlling cell content appearance by specifying any standard CSS color format such as named colors, hex codes, RGB, RGBA, or HSL values; adjust, customize, or style the base font color for all cells on initialization to manage uniform text styling, enhance readability, or apply theme colors across the entire sheet content by changing default cell font color settings.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        defaultCellStyle: {
          color: "#ff6600"
        }
      });
    </script>

### defaultCellStyle.fontFamily `String`

The font family of the cell.


<div class="meta-api-description">
How do I set the default font family for cells in a Kendo UI Spreadsheet? Choose, configure, or set the default text font for spreadsheet cells by specifying the font family style such as Arial, Helvetica, or other CSS font-family strings to control cell typography, appearance, and text styling across the entire grid; this includes adjusting or enabling default typeface settings for uniform or customized fonts in cell content display, ensuring consistent font rendering, and managing the overall visual design of spreadsheet data presentation.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        defaultCellStyle: {
          fontFamily: "Times New Roman"
        }
      });
    </script>

### defaultCellStyle.fontSize `String`

The font size of the cell in pixels.


<div class="meta-api-description">
How to set default font size in Kendo UI Spreadsheet cells? Control and configure the standard text size within spreadsheet cells by setting the default font size in pixels, enabling consistent and uniform text scaling, improving readability, and managing cell layout and row height predictability. Adjust, set, or define the base font size for cells to ensure clarity, uniform formatting, and optimal display across the entire spreadsheet grid, impacting text appearance, cell dimensions, and user interface coherence.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        defaultCellStyle: {
          fontSize: "14px"
        }
      });
    </script>

### defaultCellStyle.Italic `Boolean`

If set to `true`, sets the cell font to italic.


<div class="meta-api-description">
How do I set default italic font style for cells in Kendo UI Spreadsheet? Set or enable the default italic font style for spreadsheet cells, allowing all cells to display text in italics by default when configured; control or apply the default slanted or emphasized font style across the entire spreadsheet grid, customize the standard cell appearance for italicized text, toggle or configure italic formatting as the baseline style for cell content, and manage the initial font styling to have all cells render text with an italic emphasis automatically during setup or initialization.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        defaultCellStyle: {
          italic: true
        }
      });
    </script>

### defaultCellStyle.bold `Boolean`

If set to `true`, sets the cell font to bold.


<div class="meta-api-description">
How do I make all cells in the Kendo UI Spreadsheet bold by default? Enable or configure the default text in spreadsheet cells to appear in bold font weight, setting the standard cell appearance to use strong, emphasized typography by adjusting the base styling options or default font settings. Control and toggle the application of bold emphasis on all spreadsheet cells by specifying a boolean value or style option that governs the default rendering of cell text, allowing users to emphasize data visibility, highlight important content naturally, or customize the look and feel of cell text with a thicker font style applied globally across the sheet during initialization or styling setup.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        defaultCellStyle: {
          bold: true
        }
      });
    </script>

### defaultCellStyle.underline `Boolean`

If set to `true`, sets the cell font to underline.


<div class="meta-api-description">
How to enable underlined font as default style in Kendo UI Spreadsheet cells? Control and configure the default text decoration for spreadsheet cells by enabling or disabling underlined fonts as the standard style, allowing you to set or toggle underlining on cells universally, apply or remove default underlined formatting for all cell text, manage default font styles to include underlining, and customize the baseline text appearance in spreadsheets by turning underline on or off at the default style level for consistent cell font decoration.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        defaultCellStyle: {
          underline: true
        }
      });
    </script>

### defaultCellStyle.wrap `Boolean`

If set to `true`, sets the cell wrap.


<div class="meta-api-description">
How to enable automatic text wrapping in Kendo UI Spreadsheet cells? Enable or disable automatic text wrapping within spreadsheet cells to control whether long content breaks onto multiple lines, configure cell content to wrap or truncate, set multiline display for cell text, manage text overflow by toggling wrap, adjust cell style for readability by enabling wrap mode, control wrapping behavior in grids or tables, specify if text should flow across rows or remain single line, apply or remove wrapping for cells with lengthy data entries, handle content formatting by switching wrap on or off to improve viewing and editing experience.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        defaultCellStyle: {
          wrap: true
        }
      });
    </script>

### headerHeight `Number` *(default: 30)*

The height of the header row in pixels.


<div class="meta-api-description">
How do I adjust the height of the header row in a Kendo UI Spreadsheet? Adjust or configure the height of the top header row in a spreadsheet to control vertical spacing, improve layout, enhance readability, and customize the design by setting pixel-based dimensions; this setting can be used to increase or decrease header row size during initialization or dynamic updates, enabling precise control over how much space the header occupies and tailoring the visual structure for better user experience or presentation.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        headerHeight: 40
      });
    </script>

### headerWidth `Number` *(default: 32)*

The width of the header column in pixels.


<div class="meta-api-description">
How do I set the width of the leftmost header column in a Kendo UI Spreadsheet? Adjust or configure the width of the leftmost header column in a spreadsheet interface by setting its size in pixels, enabling precise control over row header dimensions to align with cell content, improve layout consistency, customize header sizing during setup or dynamically update it to fit different display or data presentation needs, and manage or fine-tune the header column width to enhance readability and user interface alignment in grid or table views.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        headerWidth: 50
      });
    </script>

### excel `Object`

Configures the Excel export settings of the Spreadsheet.


<div class="meta-api-description">
How to customize Excel export settings in Kendo UI Spreadsheet? Control and customize exporting spreadsheets to Excel by configuring file format options, setting workbook structure and sheet names, managing how Excel files are generated and downloaded, enabling or disabling export features, defining export parameters like format types and naming conventions, adjusting workbook and worksheet properties, specifying download behavior and file handling, and tailoring Excel export settings to meet diverse requirements during initialization or runtime.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        excel: {
          fileName: "MySpreadsheet.xlsx",
          forceProxy: true
        }
      });
    </script>

### excel.fileName `String` *(default: "Spreadsheet.xlsx")*

Specifies the file name of the exported Excel file.


<div class="meta-api-description">
How do I customize the filename when exporting Excel spreadsheets with Kendo UI for jQuery? Set or customize the output filename for exported Excel spreadsheets to specify, control, or rename the saved Excel file during download, enabling precise naming for exported Excel files from spreadsheet data, including controlling the download name, defining export file identity, or configuring the spreadsheet’s Excel export filename for better organization and clarity.
</div>

#### Example - setting the default Excel file name

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                name: "Food Order",
                mergedCells: [
                    "A1:G1"
                ],
                rows: [{
                    height: 70,
                    cells: [{
                        value: "My Company", fontSize: 32, textAlign: "center"
                    }]
                }],
            }],
            excel: {
                fileName: "Order.xlsx"
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsExcel();
    </script>

### excel.forceProxy `Boolean` *(default: false)*

If set to `true`, the content will be forwarded to [`proxyURL`](/api/javascript/ui/spreadsheet#configuration-excel.proxyURL) even if the browser supports the saving of files locally.


<div class="meta-api-description">
How to configure Kendo UI Spreadsheet to force download Excel exports through a proxy URL? Manage how Excel file exports are handled by configuring server-side proxy routing, enabling or disabling forced upload of spreadsheet export data through a specified proxy URL instead of relying on the browser's native download mechanisms, allowing control over export delivery methods, file download interception, server forwarding of generated Excel content, bypassing client-side saving, and ensuring exports are processed via backend routes for scenarios requiring centralized exporting, security, or download customization.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        excel: {
          forceProxy: true,
          proxyURL: "/save"
        }
      });
    </script>

### excel.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user. A proxy will be used when the browser is not capable of saving files locally. Such browsers are IE version 9 and lower and Safari. The developer is responsible for implementing the server-side proxy. The proxy will return the decoded file with the `Content-Disposition` header set to `attachment; filename="<fileName.xlsx>"`.

The proxy will receive a POST request with the following parameters in the request body:
* `contentType` - The MIME type of the file.
* `base64` - The base-64 encoded file content.
* `fileName` - The file name as requested by the caller.


<div class="meta-api-description">
How to configure Kendo UI Spreadsheet to export Excel files using a proxy URL? Configure server-side file export by setting a proxy URL to enable streaming and downloading Excel spreadsheet files when local file saving is disabled or unsupported in browsers like IE9 and Safari. This setup supports scenarios requiring file export through a remote endpoint, allowing POST submission of base64-encoded Excel data along with MIME type and target filename, ensuring seamless file delivery via the proxy’s content-disposition attachment headers. Ideal for controlling and enabling Excel export workflows where client-side saving limitations exist, this approach facilitates smooth file downloads through custom server proxies, handling encoded spreadsheet data conversion and delivery for legacy or restrictive browsing environments.
</div>

#### Example - setting the server proxy URL

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                name: "Food Order",
                mergedCells: [
                    "A1:G1"
                ],
                rows: [{
                    height: 70,
                    cells: [{
                        value: "My Company", fontSize: 32, textAlign: "center"
                    }]
                }],
            }],
            excel: {
                proxyURL: "/save"
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsExcel();
    </script>

### images `Object` *(default: null)*

An object containing any images used in the Spreadsheet.  The keys
should be image ID-s (they are referenced by this ID in
[`sheets.drawings`](/api/javascript/ui/spreadsheet/configuration/sheets.drawings)) and the values
should be image URLs.

The image URLs can be either
[data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs),
in which case the images are fully contained by the JSON, or can be external
URLs.

Note that when external URLs are used, they should reside on the same domain, or
the server must be configured with the proper
[CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), for the
Spreadsheet to be able to fetch binary image data using a XMLHttpRequest.  If it
cannot fetch the image, export to Excel or PDF might not work.


<div class="meta-api-description">
How do I configure images in Kendo UI Spreadsheet to load from a data URL versus an external link? Configure and manage image resources by mapping unique image identifiers to corresponding URLs within spreadsheet drawings and exports, enabling loading, fetching, and embedding of image binary content from either embedded data URLs or external links. Control image references by associating image IDs with URLs that support data URLs for fully contained inline images or external URLs requiring proper same-origin or CORS-enabled servers to allow XMLHttpRequest fetching of image binaries, ensuring that graphical elements render correctly during spreadsheet viewing, drawing manipulation, and export to formats like Excel and PDF. Set up images for spreadsheet drawings with flexible linking options, handle inline versus remote image sources, and ensure compatibility for binary image retrieval to maintain accurate visual exports and seamless integration of images into spreadsheets.
</div>

#### Example - declaring images in JSON

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            images: {
                "1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAMAAACrgNoQAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9Tix9UHewgopChdbIgKuKoVShChVIrtOpgcukXNGlIUlwcBdeCgx+LVQcXZ10dXAVB8APExdVJ0UVK/F9SaBHjwXE/3t173L0DhHqZqWbHOKBqlpGKx8RMdlXsfEUA3ejDCCISM/W5ZDIBz/F1Dx9f76I8y/vcn6NXyZkM8InEs0w3LOIN4ulNS+e8TxxiRUkhPiceM+iCxI9cl11+41xwWOCZISOdmicOEYuFNpbbmBUNlXiKOKyoGuULGZcVzluc1XKVNe/JXxjMaSvLXKc5jDgWsYQkRMioooQyLERp1UgxkaL9mId/yPEnySWTqwRGjgVUoEJy/OB/8LtbMz854SYFY0DgxbY/IkDnLtCo2fb3sW03TgD/M3CltfyVOjDzSXqtpYWPgP5t4OK6pcl7wOUOMPikS4bkSH6aQj4PvJ/RN2WBgVugZ83trbmP0wcgTV0lboCDQ2C0QNnrHu/uau/t3zPN/n4AUk5ymuNOeXwAAAMAUExURUK6WDi2Tvb893/Qjej369bw23rOiabesFLAZsDoyMfqzYbTlK7huBmrNMvs0Uq9X3bNhv///4DQj7nlwZDWnYXSk2TGdoPRkWLFdOH05KLdrXDKgLLjuk++YzS1TJPXnzq3Ua3htnTMhKXer0S6WrznxG7Kf53bqFXAaP3+/snr0EG5V6nfsmDFciiwQSSuPYjUlpvapqvgtWnIeuL05iqxQ8TpyljBa2fHeWvIfB2sOLTkvVjCazS0S0i8XWzJfCGuOiavPiSvPSKuPDm2T1rCbSCtOi2yRer37Pn9+rbkvja1Td7z4j24U6ngs0S6WZHXnrDiufL689Pv2M7t0+L05W3Kfv7//vz+/C6yRj24VEm8Xi+zRo3VmkW7Wvv9+0e7XOT155TYoFC/ZOX26P3+/dfx3DG0ST+5Vcnrz9jx3fX79vj8+F/Ecff8+PH68zCzSPj9+TK0SUu9YC+zR9Lu10e8XM7t1PP79Uy9YUK6V9zy4JfZozO0SpjZpGrIe9Xw2vT79tvy39Tv2fr9+/P69JXYoT64VOz47lG/ZfD68u758LvmwsXqzOD04+f26oPSknHLgn3PjHPMg8/t1V3Eb3jNh9Hu1nLLgorUl6Tdru/58O3478zs0o/WnJrapb/nxi6yRTy3UlfBatrx3l7EcNnx3SewQLrmwrPjvOX16JnapXzPi9/z47flwOv47YzVmZbZol7Ecc3t07Hiuje2TsPpyrvmwyyyRO/58er37cjrzlzDb2XHd+b26cDox8LpyY7Wm9Du1VvDbqzhtb3nxd3z4VXBaSuxQ5bYop/cqlPAZyyxRE2+YS6zRj65VCmxQvr9+rfkv0+/ZB+tOSKtO5zbp/v+/N3z4P7//zCzR4vUmCOuPG3JfhGoLEa8Wza2Tfn9+fz+/d/049Dt1f7+/v7//S2yRo7Vm4HRj4LSkfP79CuyQ+358On360G6Vs/u1UC5Vd7z4dzz4SawP93y4YfTlSyyRZbYocjrz1C/ZWPGdLPkvC2yRLTjvKffsVPVlv4AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfjBQkOHwu5+vlqAAAC0ElEQVRIx2MQxA4a/uOQYMAunJXgXkeKhqZid3d3Q+I1ZEW7g8B8YjVklblDQB1xGpYVu8OAITEa0srcEaCOsIa0BHdkUENIQ5qdOypYjV9DQ5w7OjiJTwOaeyBgI24NrGXu2EANLg1Y3AMBSdg14DAfzR8IDc1x7rhBEqaGYH93fCAAXQNe85HtYCDKfBCQR9YAVb/whJOju3uknpPjBRDD/YvTDnf35Xf0FiK5CqwhGOqeEw9kgTHn6JLcmSF7f4e7KUPx878n2jk+nkByFUhDKcw9DsaNwe7OGc0XpVzz+9sdb6XlX3a6cLSQ2Q0qLwLRgHC/g6XgJ8cTPwU3uxewCP7m7YwQfMl7Pjvil747QgcDwnyghnrBtKtHBG9EOd1ZJyh/75Wg4Ere34JN504ghS7D7ip3ZA3BPwRZKh0ir7wUPGD1T9Pz8fIAwf9XIhFKZjIYuKNoiBAs3MQb6a5/+pkJQ+KhP+GXVwhORtbQzpCzBkUDU2H4iytn3PWKvl7fINhmL9j22TPaCaGCYQqDYMskZA0f2G4+nXbFfcdVHsF3gmLnH759NP3NBbiCuGBQKMUzI2nIsqoTfG1jdc6NTVCwK2N5qaCglBtcvX8zJB4iJiGCtVrPaYXgKgYnx+IcwV69K1KCgnfdYF6IK4XFdIsQzIaLrO5OcuXhfHJ6O560iLg52HvOeb8cqj6BFZGWIiCuOsHIwe++0NHltDnjiRMqpxlPnElPLv6O5B5EaoX4A5L43C84OZ1YuHC5k6l7JEQAbH4zan6IF8KfuMvS0HNcKl4dUPeg5Gl8dtixYis1IsRxqs/CXi5pvsSuPqEBV8mH3Q7+LNxlq+YELOGzDF/prSmOx79Y64cINDv4mwjVQOGieNyDtY5LRbKjOIuYWjT1G1x9NZEVuygu9+DSkArWUbmE+LaG5jfs7sHdmhEU588iqfkjyNWmiV0CAAlw59i21O4WAAAAAElFTkSuQmCC"
            },

            sheets: [{
                name: "Sample image",
                drawings: [
                    {
                        topLeftCell: "C2",
                        offsetX: 32,
                        offsetY: 10,
                        width: 48,
                        height: 48,
                        image: "1"
                    }, {
                        topLeftCell: "E3",
                        offsetX: 16,
                        offsetY: 10,
                        width: 48,
                        height: 48,
                        image: "1"
                    }
                ]
            }]
        });
    </script>

Note, we can reference the same image ID in two different drawings,
anchored to cells C2 and E3.  See the
[`sheets.drawings`](/api/javascript/ui/spreadsheet/configuration/sheets.drawings) property for more
information about a drawing's properties.

### pdf `Object`

Configures the PDF export settings of the Spreadsheet.


<div class="meta-api-description">
How to customize the PDF export options for Kendo UI Spreadsheet? Configure PDF export options for spreadsheets including setting the output file name, selecting paper size and orientation such as landscape or portrait, adjusting margins and scaling parameters, and customizing how spreadsheet data is converted, formatted, and saved as a PDF file for download or sharing. Control PDF generation settings to fine-tune document layout, page setup, print scaling, and export behavior, enabling precise formatting and file customization during spreadsheet to PDF conversion. Adjust PDF output characteristics including page dimensions, print layout, scaling ratio, and margin sizes to tailor the exported document for printing, presentation, or archiving purposes.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        pdf: {
          area: "selection",
          fileName: "MySpreadsheet.pdf",
          forceProxy: false
        }
      });
    </script>

### pdf.area `String`

The area that will be exported.

The supported values are:
* `workbook` - Exports the full workbook, including all sheets.
* `sheet` - Exports the active sheet.
* `selection` - Exports the selected area on the active sheet.


<div class="meta-api-description">
How do I customize the area of a spreadsheet that gets exported to PDF in Kendo UI for jQuery? Manage which parts of a spreadsheet are included in PDF exports by setting options to export the entire workbook with all sheets, just the currently active sheet, or only a specific selected range within the sheet. Configure the scope of exported content to control whether users get a full document export, a single worksheet, or a custom selection, enabling precise output for reporting, sharing, or printing purposes according to needs like exporting whole files, single pages, or highlighted data ranges. Adjust export areas to customize PDF generation by targeting all sheets, current sheet view, or user-defined cell ranges within the spreadsheet.
</div>

#### Example - setting the area for export

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                area: "selection"
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### pdf.author `String` *(default: null)*

The author of the PDF document.


<div class="meta-api-description">
How to set author metadata in exported PDFs from Kendo UI Spreadsheet? Configure or specify the creator or author name embedded in the metadata of exported PDF documents generated from spreadsheets, enabling the setting or customizing of the document’s author information for identification, display in PDF viewers, file properties, document metadata, and export settings. This covers adding or modifying the author string, controlling document creator details, labeling PDFs with author metadata, and ensuring the exported file reflects the desired author information for tracking, compliance, or presentation purposes.
</div>

#### Example - setting the author

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                author: "John Doe"
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### pdf.autoPrint `Boolean` *(default: false)*
Specifies if the Print dialog should be opened immediately after loading the document.

> **Note:** Some PDF Readers/Viewers will not allow opening the Print Preview by default, it might be necessary to configure the corresponding add-on or application.


<div class="meta-api-description">
How to enable automatic print dialog in Kendo UI Spreadsheet PDF export? Configure automatic print dialog triggering upon PDF export completion from spreadsheets, enabling the print preview or print prompt to launch instantly after the PDF loads in the browser or PDF viewer. Control whether the print dialog pops up automatically versus requiring manual print initiation for exported spreadsheet PDFs. Set up or enable immediate print prompts on loading PDF documents, supporting use cases where auto-launch of print preview is desired or disabled, and account for potential viewer or browser restrictions that impact automatic print or print preview dialogs. Manage the automatic opening of print interfaces for spreadsheet-generated PDFs to streamline printing workflows or defer to manual print commands.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        pdf: {
          autoPrint: true
        }
      });
    </script>

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.


<div class="meta-api-description">
How to set creator information for exported PDF in Kendo UI Spreadsheet? Set or customize the PDF author, creator, or metadata information embedded during spreadsheet export to PDF, configure the document creator name, specify the author string for PDF metadata, control the metadata fields that identify the origin or source of the PDF file, enable setting custom creator or author tags to improve document tracking, indexing, and identification in PDF viewers, search engines, and content management systems, and manage how exported PDF files specify their producing application or creator identity.
</div>

#### Example - setting the creator

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                creator: "John Doe"
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.


<div class="meta-api-description">
How to set custom creation date in Kendo UI Spreadsheet PDF export? Control and customize the creation date metadata embedded in exported PDF files, enabling setting or overriding the PDF document’s timestamp to a specific date or time. Configure, specify, or adjust the document’s original creation time within the PDF output when converting spreadsheet data to PDF format, allowing precise management of PDF metadata for version tracking, auditing, or compliance purposes. This feature supports defining exact creation timestamps during PDF export to reflect accurate or custom dates rather than defaulting to the current system time.
</div>

#### Example - setting the date

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                date: new Date("2014/10/10")
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.


<div class="meta-api-description">
How can I customize the filename of a PDF file exported from Kendo UI Spreadsheet? Configure, define, or customize the exported PDF document's filename when saving or downloading spreadsheet content as a PDF file, enabling control over the output file name, specifying the exact name to use for the generated PDF, setting the desired title for saved or exported spreadsheets in PDF format, and managing how the PDF file is named during export operations to ensure consistent, descriptive, and user-friendly file naming conventions.
</div>

#### Example - setting the default PDF file name

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                fileName: "Foo.pdf"
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### pdf.fitWidth `Boolean` *(default: false)*

Indicates whether to fit the content of the Spreadsheet to the width of the page.


<div class="meta-api-description">
How to prevent horizontal overflow in Kendo UI Spreadsheet PDF export? Configure automatic scaling to adjust spreadsheet columns to fit within the page width during PDF export or printing, ensuring content does not overflow horizontally and the layout remains clean and readable. Control column resizing and page fitting to optimize print margins, avoid cutoff content, enable page width adjustment for exports, set scaling for printable area alignment, and enhance PDF layouts by matching sheet width to page boundaries without truncation or distortion. Facilitate seamless print formatting by enabling sheet content to shrink or expand to match the page’s printable width for better visual presentation in exported documents.
</div>

#### Example - fitting the Spreadsheet to the page width

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [
                        { value: "A" }, { value: "B" }, { value: "C" },
                        { value: "1" }, { value: "2" }, { value: "3" },
                        { value: "4" }, { value: "5" }, { value: "6" },
                        { value: "7" }, { value: "8" }, { value: "9" }
                    ]
                }]
            }],
            pdf: {
                landscape: false,
                fitWidth: true
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### pdf.forceProxy `Boolean` *(default: false)*

If set to `true`, the content will be forwarded to [`proxyURL`](/api/javascript/ui/spreadsheet#configuration-pdf.proxyURL) even if the browser supports the saving of files locally.


<div class="meta-api-description">
How to force PDF exports from Kendo UI Spreadsheet to go through a proxy server? Control how PDF exports from spreadsheets are handled by enabling server-side routing to funnel generated PDF files through a centralized proxy server, facilitating authentication, access control, file generation management, or bypassing browser download restrictions. This setting lets you configure whether PDF outputs are forced to be sent via a proxy URL for secure, authenticated processing and storage, or allowed to be saved directly on the client device, supporting use cases like centralized logging, compliance enforcement, secure file handling, or client-side download optimization. Adjust options to enable, disable, or control PDF file delivery paths from spreadsheet exports, ensuring flexibility for environments with download limitations, proxy-based workflows, or custom server integrations.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        pdf: {
          forceProxy: true,
          proxyURL: "/save"
        }
      });
    </script>

### pdf.guidelines `Boolean` *(default: false)*

Indicates whether to export the cell guidelines.


<div class="meta-api-description">
How to control cell gridlines in Kendo UI Spreadsheet PDF export? Configure whether cell gridlines or borders are included in PDF exports from spreadsheet data, enabling control over visibility of cell boundaries, lines, or guidelines in the generated PDF file, with options to show or hide these cell edges for clearer layout, formatting, or presentation purposes when printing or saving spreadsheets as PDF documents.
</div>

#### Example - disabling the guidelines

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                guidelines: false
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### pdf.hCenter `Boolean` *(default: false)*

Indicates whether to center the content horizontally. For more information, refer to [`vCenter`](/api/javascript/ui/spreadsheet#configuration-pdf.vCenter).


<div class="meta-api-description">
How to center spreadsheet data horizontally in PDF exports using Kendo UI for jQuery? Control horizontal alignment of spreadsheet data in PDF exports by enabling or disabling centering of content across the page width; configure the export settings to center cells, tables, or entire sheets horizontally, adjust layout positioning for balanced margins, or keep default left or right alignment. This setting helps manage page formatting by shifting content side-to-side, accommodating user preferences for centered or standard alignment in generated PDF reports, printable documents, or presentations derived from spreadsheet data. Toggle horizontal centering on or off to influence how exported tables and data blocks appear in the PDF output, ensuring the layout meets aesthetic or formatting requirements for horizontal distribution of content.
</div>

#### Example - centering the content horizontally

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                hCenter: true
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.


<div class="meta-api-description">
How do I adjust the JPEG quality when exporting a spreadsheet to PDF using Kendo UI for jQuery? Adjust or set image compression levels, control JPEG encoding quality, configure picture clarity and file size balance when exporting or saving spreadsheets to PDF format, optimize embedded image resolution by specifying compression ratio from low quality/high compression to high quality/low compression, manage export image fidelity and performance trade-offs, enhance image sharpness or reduce file size in PDF exports, tailor embedded JPEG picture parameters for output documents.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        pdf: {
          jpegQuality: 0.8
        }
      });
    </script>

### pdf.keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.


<div class="meta-api-description">
How do I preserve PNG images when exporting a Kendo UI spreadsheet to PDF? Configure PDF export settings to preserve PNG images in their original format rather than converting them to other image types, enabling you to maintain image quality and transparency when exporting spreadsheets to PDF files. Enable or set options to keep embedded PNG pictures intact during PDF generation, control image format retention for exports, and ensure that all PNG graphics remain unaltered within the resulting PDF document. This covers scenarios where maintaining bitmap fidelity, color accuracy, and original compression of images are essential during spreadsheet to PDF conversions.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        pdf: {
          keepPNG: true
        }
      });
    </script>

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.


<div class="meta-api-description">
How to add keywords to exported PDFs from Kendo UI Spreadsheet? Configure and set metadata keywords, tags, or search terms embedded in exported PDF documents from spreadsheets to enhance document indexing, searchability, and retrieval; control the inclusion of descriptive terms, phrases, or labels in PDF metadata for improved accessibility, content discovery, and property definition when generating PDF files from spreadsheet data.
</div>

#### Example - setting the keywords

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                keywords: "food order"
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### pdf.landscape `Boolean` *(default: true)*

If set to `true`, reverses the paper dimensions if that width is needed as the larger edge.


<div class="meta-api-description">
How do I set the layout to landscape when exporting a spreadsheet as a PDF with Kendo UI for jQuery? Control page orientation for PDF exports of spreadsheets by setting the layout to landscape, enabling the width to become the longer edge and swapping the paper dimensions so that the page is wider than it is tall; adjust export settings to configure horizontal or vertical output, toggle between portrait and landscape modes, set page direction, reverse width and height dimensions, customize page orientation for printing or sharing spreadsheets as PDFs, and ensure the exported document uses the preferred aspect ratio for better readability and presentation.
</div>

#### Example - setting the portrait mode

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                landscape: false
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### pdf.margin `Object`

Specifies the margins of the page (numbers or strings with units).

The supported values are:

* `mm`
* `cm`
* `in`
* `pt` (default)


<div class="meta-api-description">
How do I set margins for PDF exports from a Kendo UI Spreadsheet? Set or control page margins for PDF exports from spreadsheets by specifying margin sizes using numbers or strings with measurement units, including millimeters, centimeters, inches, and points. Adjust or configure printable area spacing by inputting numeric values or formatted strings like "10mm," "1in," or "12pt" to customize the document's whitespace around content. Manage PDF layout, padding, and edge alignment with flexible margin settings compatible with common units, enabling precise output formatting during spreadsheet-to-PDF conversion or export processes.
</div>

#### Example - setting the margins

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                margin: {
                    left: 10,
                    right: "10pt",
                    top: "10mm",
                    bottom: "1in"
                }
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### pdf.margin.bottom `Number|String` *(default: 0)*

The bottom margin. Numbers are considered as `pt` units.


<div class="meta-api-description">
How do I set the bottom margin when exporting to PDF in Kendo UI Spreadsheet? Control the bottom margin size in points when exporting spreadsheets to PDF, enabling customization of page layout, spacing, and printable area at the bottom edge. Adjust or set the lower page boundary, bottom whitespace, or footer margin for precise PDF formatting, page setup, or document styling during export or initialization processes. Tailor padding, bottom offset, or layout margins to manage content positioning and ensure consistent visual spacing in exported PDF files.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        pdf: {
          margin: {
            bottom: 20
          }
        }
      });
    </script>

### pdf.margin.left `Number|String` *(default: 0)*

The left margin. Numbers are considered as `pt` units.


<div class="meta-api-description">
How to adjust left page margin size when exporting Kendo UI spreadsheet to PDF? Adjust the left page margin size or whitespace for PDF exports of spreadsheet documents, controlling the distance or padding on the left edge of each page; configure, set, or control left-side margins in points or units to modify page layout, boundary spacing, printable area, or formatting when converting spreadsheets to PDF format, affecting how content aligns and appears near the left page border during export or printing processes.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        pdf: {
          margin: {
            left: 15
          }
        }
      });
    </script>

### pdf.margin.right `Number|String` *(default: 0)*

The right margin. Numbers are considered as `pt` units.


<div class="meta-api-description">
How do I adjust the right page margin size when exporting a Kendo UI Spreadsheet to PDF? Adjust or configure the right page margin size for PDF exports from spreadsheets to control print layout spacing, page boundaries, and document formatting when generating PDFs. Set, enable, or modify the right margin value in points to influence the amount of whitespace on the right edge of exported PDF pages, ensuring proper alignment, spacing, and print-ready formatting for spreadsheet exports. Optimize the right side margin for PDF output to manage layout constraints, page breaks, and printable area when exporting spreadsheet data to PDF format.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        pdf: {
          margin: {
            right: 15
          }
        }
      });
    </script>

### pdf.margin.top `Number|String` *(default: 0)*

The top margin. Numbers are considered as `pt` units.


<div class="meta-api-description">
How do I adjust the top margin when exporting a spreadsheet to PDF? Configure the top page margin or top whitespace when exporting or printing spreadsheets to PDF by specifying a numeric value in points; adjust, set, control, or customize the upper page padding, header margin, or printable area offset to define the vertical space at the top edge of the PDF document, ensuring precise layout and spacing for headers, content alignment, or print formatting in generated PDF exports from spreadsheet files.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        pdf: {
          margin: {
            top: 20
          }
        }
      });
    </script>

### pdf.paperSize `String|Array` *(default: "auto")*

Specifies the paper size of the PDF document. The default `auto` setting means that the paper size is determined by the content.

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

The supported values are:
* A predefined size - `A4`, `A3`, and so on.
* An array of two numbers which specify the width and height in points (1pt = 1/72in).
* An array of two strings which specify the width and height in units. The supported values are `mm`, `cm`, `in`, and `pt`.


<div class="meta-api-description">
How to set paper size when exporting spreadsheet data to PDF in Kendo UI for jQuery? Control, configure, or set the PDF page dimensions and paper size when exporting spreadsheet data to PDF format for printing, report generation, or layout customization. Specify standard paper formats like A4, A3, letter size, or define custom page width and height using numeric arrays or strings with measurement units such as millimeters, centimeters, inches, or points. Adjust page size to match content scaling and resolution, optimize print output, select paper dimensions for portrait or landscape orientation, manage export layout precision, and ensure proper formatting of spreadsheet data within PDF documents by specifying exact page sizes or letting the system auto-adjust based on content dimensions.
</div>

#### Example - setting a custom paper size

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                paperSize: ["100mm", "50mm"]
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### pdf.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user. A proxy will be used when the browser is not capable of saving files locally, for example, Internet Explorer 9 and Safari. The developer is responsible for implementing the server-side proxy. The proxy will return the decoded file with the `Content-Disposition` header set to `attachment; filename="<fileName.pdf>"`.

The proxy will receive a POST request with the following parameters in the request body:

* `contentType` - The MIME type of the file.
* `base64` - The base-64 encoded file content.
* `fileName` - The file name as requested by the caller.


<div class="meta-api-description">
How do I enable PDF export in Kendo UI Spreadsheet for Internet Explorer 9? Configure and set a server-side proxy URL endpoint to stream exported PDF files from spreadsheets to users when direct local file saving in browsers is restricted or unsupported, such as in Internet Explorer 9 or Safari. Enable routing of the generated PDF data through a backend service that accepts POST requests containing base64-encoded file content, MIME type, and desired filename, ensuring proper streaming with content-disposition headers for attachment downloads. Control and implement a server proxy solution to handle PDF exports securely and reliably, supporting scenarios where client-side saving is disabled, blocked, or incompatible, providing seamless file delivery for exported spreadsheet PDFs across diverse browser environments and compatibility constraints.
</div>

#### Example - setting the server proxy URL

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                proxyURL: "/save"
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword which indicates where to display the document that is returned from the proxy. To display the document in a new window or iframe, set the proxy `Content-Disposition` header to `inline; filename="<fileName.pdf>"`.


<div class="meta-api-description">
How to specify where exported PDF files from Kendo UI Spreadsheet are displayed? Control how and where exported PDF files from spreadsheets are displayed or opened by specifying target windows, tabs, iframes, or named frames that handle the PDF output; configure the display location for PDF exports by setting target identifiers or keywords directing whether the document opens in new browser windows, embedded frames, or specific named containers, ensuring seamless integration with proxy-based PDF generation and inline content disposition settings that govern whether the PDF appears inline within the viewer or triggers download dialogs across different embedding scenarios and export workflows.
</div>

#### Example - opening the generated document in a new window

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                forceProxy: true,
                proxyURL: "/save",
                proxyTarget: "_blank"
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.


<div class="meta-api-description">
How do I set the subject metadata in a PDF exported from Kendo UI Spreadsheet? Set or customize the PDF document subject metadata embedded during export from spreadsheet or grid data, enabling control over the searchable, descriptive title that appears in PDF readers’ information or metadata panels. Configure, specify, or update the file’s subject attribute when generating PDFs from tabular data, spreadsheets, or grids to help with identification, organization, and search relevance in document management systems, viewers, or when automating export workflows involving subject metadata tagging.
</div>

#### Example - setting the subject

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                subject: "Products"
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### pdf.title `String` *(default: null)*

Sets the title of the PDF file.


<div class="meta-api-description">
How do I set the title of a PDF file exported from Kendo UI for jQuery Spreadsheet? Control the title metadata embedded in exported or downloaded PDF files from spreadsheets, enabling you to specify or customize the document title seen in PDF viewers, browser tabs, and search indexes. Configure, set, or change the PDF file’s displayed title for better identification, organization, or branding of sheet exports, ensuring the PDF document info and viewer title match your desired naming conventions in exported or saved spreadsheet PDFs.
</div>

#### Example - setting the title

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                title: "Products"
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### pdf.vCenter `Boolean` *(default: false)*

Indicates whether to center the content vertically. For more information, refer to [`hCenter`](/api/javascript/ui/spreadsheet#configuration-pdf.hCenter).


<div class="meta-api-description">
How to vertically center content when exporting Kendo UI Spreadsheet data to PDF using vCenter? Configure vertical alignment and enable content to be centered along the page height when exporting spreadsheets to PDF formats, controlling the vertical positioning of the generated PDF output. Adjust the layout to ensure that the content appears centrally aligned from top to bottom within the PDF page, balancing vertical spacing for a polished, professional look. Combine vertical centering with horizontal alignment controls to precisely position exported spreadsheet content in the middle of the PDF page, improving readability and presentation for printed or shared documents. Optimize vertical layout settings for PDF export workflows involving spreadsheet data, reports, or tabular content requiring balanced vertical placement.
</div>

#### Example - centerign the content vertically

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                vCenter: true
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### rowHeight `Number` *(default: 30)*

The default row height in pixels.


<div class="meta-api-description">
How do I set a default row height in a Kendo UI for jQuery Spreadsheet? Set or adjust the default height of rows in a spreadsheet to control vertical spacing for display or print output, enabling consistent row sizing by specifying pixel values. Manage or configure row dimensions to ensure uniform row height across sheets, customize spacing for better readability or layout, define pixel-based vertical measurements for rows, and apply default row height settings during spreadsheet creation or rendering. Adjust, control, or set row height parameters to influence how rows appear visually or on printed documents, providing consistent spacing and layout control within spreadsheet grids.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        rowHeight: 40
      });
    </script>

### rows `Number` *(default: 200)*

The number of rows in the document.


<div class="meta-api-description">
How to set the maximum number of rows in a Kendo UI for jQuery Spreadsheet? Configure or set the total number of rows in a spreadsheet or grid, control the sheet’s vertical size, define the row count during initialization, adjust the spreadsheet row limit, customize the number of rows available for data entry or display, manage grid height by specifying rows, determine navigation boundaries within rows, set initial layout dimensions related to rows, control vertical scrolling range, and adjust the row count to fit content or application requirements.
</div>

#### Example - configure the rows count

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            rows: 300
        });
    </script>

### sheets `Array`

An array which defins the document sheets and their content.


<div class="meta-api-description">
How to configure multiple worksheets in Kendo UI Spreadsheet? Configure, create, modify, or access multiple worksheets within a spreadsheet document by setting or retrieving an array of sheet objects that define individual tab content, layout, data, and settings; control workbook sheets for tasks such as initializing new tabs, loading existing sheet data, serializing sheet states, updating sheet properties, managing sheet order, or dynamically changing workbook composition to support complex multi-sheet spreadsheet management and interaction.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [
          {
            name: "Sheet1",
            rows: [
              { cells: [{ value: "A1" }, { value: "B1" }] },
              { cells: [{ value: "A2" }, { value: "B2" }] }
            ]
          },
          {
            name: "Sheet2",
            activeCell: "B2"
          }
        ]
      });
    </script>

### sheets.activeCell `String`

The active cell in the sheet, for example, `A1`.


<div class="meta-api-description">
How do I set the active cell in Kendo UI for jQuery Spreadsheet to a specific row and column? Control or retrieve the currently selected or focused cell within a spreadsheet sheet, enabling navigation, cell selection, or cursor positioning using typical cell references like A1 notation. Adjust, set, or query the active cell to programmatically highlight, activate, or move the focus within a sheet grid for editing, reading values, or triggering cell-specific actions. Manage current cell focus dynamically to configure which cell is targeted, selected, or accessed during spreadsheet operations, supporting tasks like setting the input cursor location, determining where input or formulas will be entered, or identifying the user’s current selection context.
</div>

#### Example - configure the initially active cell

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [
          {
            activeCell: "C3"
          }
        ]
      });
    </script>

### sheets.name `String`

The name of the sheet.


<div class="meta-api-description">
How do I programmatically change the title of a sheet in a Kendo UI Spreadsheet? Set, change, or retrieve the label or title of a spreadsheet tab to identify individual sheets, control sheet naming, customize or rename tabs, access sheets by their displayed name, specify and update sheet names programmatically, handle sheet references via names instead of indexes, and manage sheet identifiers for organization, navigation, or scripting purposes in a spreadsheet application.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [
          { name: "Employees" },
          { name: "Sales Data" }
        ]
      });
    </script>

### sheets.columns `Array`

An array which defines the columns in this sheet and their content.


<div class="meta-api-description">
How to customize individual column settings in Kendo UI Spreadsheet? Configure and control the structure, layout, and content of spreadsheet columns by defining column arrays with detailed settings that specify each column’s formatting, width, header, and default or initial cell values. Enable precise customization of individual column behaviors, control cell content rendering, adjust appearance and organization within sheets, and set up data presentation and interactions for spreadsheet grids by supplying structured column definitions. Manage column configuration for spreadsheets to set up headers, data types, styles, default content, and layout properties, optimizing how tabular data appears and functions upon initialization or update.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          columns: [
            { index: 0, width: 100 },
            { index: 1, width: 200 },
            { index: 2, width: 150 }
          ]
        }]
      });
    </script>

### sheets.columns.index `Number`

The zero-based index of the column. Required to ensure correct positioning.


<div class="meta-api-description">
How do I set the position of a column in Kendo UI Spreadsheet? Set or retrieve the zero-based position of a column within a spreadsheet to control column ordering, insert columns at specific positions, move columns by index, or reference them accurately in code; this positioning value determines the column's placement starting from 0 for the first column and enables dynamic rearrangement, initialization, or updates of columns based on their positional index for precise layout management.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          columns: [
            { index: 0, width: 100 },
            { index: 2, width: 150 }
          ]
        }]
      });
    </script>

### sheets.columns.width `Number`

The width of the column in pixels. Defaults to [`columnWidth`](/api/javascript/ui/spreadsheet#configuration-columnWidth).


<div class="meta-api-description">
How to set fixed column width in Kendo UI Spreadsheet? Control and customize the exact pixel width of individual spreadsheet columns by setting fixed column sizes during initialization or dynamically adjusting them for consistent layout and display, enabling precise column width configuration, column resizing, column dimension control, pixel-based column sizing, customizing spreadsheet grids, setting column widths in data sheets, modifying column layout, adjusting cell width parameters, defining spreadsheet column measurements, and managing column width appearance for improved formatting and user interface consistency.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          columns: [
            { index: 0, width: 120 },
            { index: 1, width: 80 }
          ]
        }]
      });
    </script>

### sheets.dataSource `kendo.data.DataSource`

The DataSource instance for this sheet. For more information, refer to the article on [binding to the DataSource](/web/spreadsheet/import-and-export-data/bind-to-data-source).


<div class="meta-api-description">
How do I bind data to a Kendo UI Spreadsheet tab using its dataSource property? Connect or associate a spreadsheet tab with a data source to populate, filter, sort, and update the table’s rows and cells dynamically, enabling real-time syncing between the sheet and underlying data objects or databases. Configure, link, or bind the sheet to a data provider or source for two-way data flow that supports programmatic data management, live updates, automatic refreshes, and interaction with external datasets, allowing developers to control and respond to data changes within the spreadsheet interface. This enables seamless integration of data-driven content, manipulation of rows and columns based on filters or sort criteria, and synchronization of edits between the display and the data backend.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          dataSource: new kendo.data.DataSource({
            data: [
              { Name: "John", Age: 30 },
              { Name: "Jane", Age: 25 }
            ]
          })
        }]
      });
    </script>

### sheets.drawings `Array`

An array which contains the drawings used in this sheet.


<div class="meta-api-description">
How can I access and manipulate drawings in a Kendo UI Spreadsheet sheet? Control, access, and manipulate all visual elements such as shapes, images, and drawings on a spreadsheet sheet, including adding new graphics, deleting existing ones, iterating through all embedded visuals, and exporting or serializing them for processing. Enable rendering and customization of graphical objects within spreadsheet sheets, allowing developers to list, modify, or remove drawings, shapes, and images programmatically with ease. Manage collections of embedded visual elements in sheets by handling arrays of pictures, shapes, and other drawing objects, useful for dynamically updating or extracting graphics in spreadsheet applications.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        images: {
          "1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        },
        sheets: [{
          drawings: [{
            topLeftCell: "A1",
            offsetX: 10,
            offsetY: 10,
            width: 100,
            height: 100,
            image: "1"
          }]
        }]
      });
    </script>

### sheets.drawings.topLeftCell `String`

A cell to which the drawing's top-left corner is anchored.


<div class="meta-api-description">
How do I set the top-left corner of a drawing in Kendo UI Spreadsheet to align with a specific cell? Control the anchor point of a drawing by setting or specifying the cell that aligns with the drawing’s top-left corner, enabling precise positioning of images, charts, or shapes within a spreadsheet by linking their starting location to a specific grid cell, allowing you to configure, move, or adjust the drawing’s placement relative to cells for better layout management and dynamic updates based on cell references.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          drawings: [{
            topLeftCell: "B2",
            width: 50,
            height: 50
          }]
        }]
      });
    </script>

### sheets.drawings.offsetX `Number`

The horizontal offset from the anchor cell's top-left corner, in pixels.


<div class="meta-api-description">
How do I adjust the horizontal position of an image in a Kendo UI Spreadsheet cell? Set or adjust the horizontal position, offset, or left-right alignment of images, shapes, or drawing elements within spreadsheet cells using pixel-based measurements from the cell's top-left anchor point. Control horizontal spacing, placement, or margins for drawings embedded in sheets, enabling precise layout adjustments, fine-tuning image or shape coordinates, and positioning decorations or graphical elements exactly where needed inside a grid cell. Configure or shift the drawing’s left offset, move objects horizontally, or align visuals relative to the cell boundary for custom spreadsheet visual arrangements and spatial control.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          drawings: [{
            topLeftCell: "A1",
            offsetX: 15,
            width: 50,
            height: 50
          }]
        }]
      });
    </script>

### sheets.drawings.offsetY `Number`

The vertical offset from the anchor cell's top-left corner, in pixels.


<div class="meta-api-description">
How do I adjust the vertical position of a drawing in Kendo UI Spreadsheet? Adjust vertical positioning of a drawing within a spreadsheet by specifying a pixel-based offset from the top edge of the anchor cell, enabling control over upward or downward movement relative to the cell’s starting point, configuring placement precision for graphical elements, fine-tuning drawing alignment, setting vertical displacement, controlling drawing location along the Y-axis, enabling customized vertical spacing or margin adjustments within spreadsheet cells, and managing visual layout by shifting images or shapes vertically in relation to their cell anchors.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          drawings: [{
            topLeftCell: "A1",
            offsetY: 20,
            width: 50,
            height: 50
          }]
        }]
      });
    </script>

### sheets.drawings.width `Number`

The drawing's width in pixels.


<div class="meta-api-description">
How do I resize the width of drawings in a Kendo UI Spreadsheet sheet? Control or set the pixel width of drawings, images, shapes, or graphic elements within a spreadsheet sheet by specifying numeric values to resize or scale their horizontal dimension. Enable precise adjustment, configuration, or customization of image or shape width in spreadsheets for rendering, layout, or design purposes, supporting use cases such as resizing embedded pictures, drawings, or visual elements programmatically or via settings. Manage the horizontal size in pixels to ensure consistent presentation, fit content accurately, or adapt visual components for better alignment and display inside sheet environments.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          drawings: [{
            topLeftCell: "A1",
            width: 120,
            height: 80
          }]
        }]
      });
    </script>

### sheets.drawings.height `Number`

The drawing's height in pixels.


<div class="meta-api-description">
How do I adjust the height of drawings in Kendo UI Spreadsheet? Control, adjust, or specify the vertical pixel size of drawings or images embedded within spreadsheet sheets, enabling precise height configuration for layout management, visual scaling, rendering accuracy, and placement optimization in spreadsheet documents. This includes setting, reading, or modifying the numeric pixel height to tailor drawing dimensions for design, presentation, or interface consistency in spreadsheet applications.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          drawings: [{
            topLeftCell: "A1",
            width: 100,
            height: 150
          }]
        }]
      });
    </script>

### sheets.drawings.image `String`

The ID of the image to display.


<div class="meta-api-description">
How do I link an external image to a drawing in Kendo UI Spreadsheet? Set or configure an image within a spreadsheet drawing by specifying the image's unique identifier or reference ID, allowing control over which picture appears embedded in chart objects, shapes, or drawing layers. This enables linking, inserting, or binding external or internal image assets directly into sheet drawings, managing and updating visual content dynamically by image resource identifiers, image references, or asset IDs for customized image rendering inside spreadsheet graphical elements.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        images: {
          "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        },
        sheets: [{
          drawings: [{
            topLeftCell: "A1",
            width: 100,
            height: 100,
            image: "logo"
          }]
        }]
      });
    </script>

### sheets.filter `Object`

Defines the filtering criteria for this sheet, if any.


<div class="meta-api-description">
How do I configure filtering criteria in Kendo UI for jQuery Spreadsheet? Control visibility of rows by setting, configuring, or updating filtering criteria, rules, or conditions on spreadsheet columns to show or hide data dynamically; define operators and values per column to create custom filters that persist or change programmatically, enabling complex, multi-column filtering scenarios, filtering state management, and conditional data display within spreadsheets for searching, sorting, or slicing datasets based on specific measurements, text matches, or logical operations.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          filter: {
            ref: "A1:C10",
            columns: [
              { index: 0, type: "value", value: "John", filter: "custom", criteria: [{ value: "J", operator: "contains" }] }
            ]
          }
        }]
      });
    </script>

### sheets.filter.columns `Array`

An array which defines the filter configuration of individual columns.


<div class="meta-api-description">
How do I configure filtering options for individual columns in a Kendo UI Spreadsheet? Set or customize filtering options for each column in a spreadsheet by specifying an array that controls individual column filter parameters including filter criteria, operators like equals or contains, specific filter values, and whether filtering is enabled or disabled per column at initialization. Configure column-based filters to refine data views, apply conditional operators, enable or disable filters dynamically, and tailor filtering behavior on a per-column basis for spreadsheet components, supporting use cases like multi-column searches, customized filter logic, and preset filter states.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          filter: {
            ref: "A1:C10",
            columns: [
              { index: 0, type: "value", value: "Product A", filter: "custom", criteria: [{ value: "A", operator: "contains" }] },
              { index: 1, type: "custom", logic: "and", filter: "custom", criteria: [{ value: "A", operator: "contains" }] }
            ]
          }
        }]
      });
    </script>

### sheets.filter.columns.criteria `Array`

An array of filter criteria for custom filters.


<div class="meta-api-description">
How do I configure custom column filters in Kendo UI Spreadsheet with multiple conditions? Define and configure custom column filters by setting multiple filter conditions with specific operators, values, and optional logical connectors to control how data is filtered within spreadsheet columns; customize filtering logic using arrays of criteria for advanced, multi-condition filters, supporting complex queries, conditional filtering, and tailored data views within column filters.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          filter: {
            columns: [{
              index: 0,
              type: "custom",
              criteria: [
                { operator: "gte", value: "100" },
                { operator: "lte", value: "500" }
              ]
            }]
          }
        }]
      });
    </script>

### sheets.filter.columns.criteria.operator `String`

The operator type of the criterion.

The supported types vary based on the inferred column data type (inferred):

*   `Text`
        - `contains` - The text contains the value.
        - `doesnotcontain` - The text does not contain the value.
        - `startswith` - The text starts with the value.
        - `endswith` - The text ends with the value.
*   `Date`
        - `eq` - The date is the same as the value.
        - `neq` - The date is not the same as the value.
        - `lt` -  The date is before the value.
        - `gt` -  The date is after the value.
*   `Number`
        - `eq` - Is equal to the value.
        - `neq` - Is not equal to the value.
        - `gte` - Is greater than or equal to the value.
        - `gt` - Is greater than the value.
        - `lte` - Is less than or equal to the value.
        - `lt` - Is less than the value.


<div class="meta-api-description">
How do I configure date comparison operators in Kendo UI Spreadsheet? Configure and control how filter conditions compare values within spreadsheet columns by setting comparison operators that adjust behavior based on data types such as text, dates, or numbers. Enable filtering to check if text contains, does not contain, starts with, or ends with specific substrings; configure date comparisons to find dates equal to, not equal to, before, or after a given date; and set numeric filters using equality, inequality, greater than, greater than or equal to, less than, or less than or equal to operators. Customize and fine-tune column-level filtering logic with comparison criteria that align with common filtering needs and operator variations for string, date, and numeric data to optimize data slicing, querying, and conditional display in spreadsheet interfaces.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          filter: {
            columns: [{
              index: 0,
              criteria: [
                { operator: "contains", value: "text" }
              ]
            }]
          }
        }]
      });
    </script>

### sheets.filter.columns.criteria.value `String`

The value for the criteria operator.


<div class="meta-api-description">
How to set the filtering value in Kendo UI for jQuery Spreadsheet column filter? Set or configure the filtering value or operand used in a spreadsheet column filter to define how column data is compared, matched, or evaluated against specific criteria; control the target value for filter conditions in programmatic filtering operations or API calls, enabling precise column filtering based on exact matches, ranges, or custom comparison values.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          filter: {
            columns: [{
              index: 0,
              criteria: [
                { operator: "eq", value: "Product A" }
              ]
            }]
          }
        }]
      });
    </script>

### sheets.filter.columns.filter `String`

The filter that will apply to this column.

The supported filters are:

* `value` - Filters based on unique values.
* `custom` - Applies custom filtering criteria.
* `top` - Filters the top or bottom records.
* `dynamic` - Filters based on dynamic criteria.


<div class="meta-api-description">
How do I apply dynamic filtering on specific columns in a Kendo UI Spreadsheet? Set, apply, or configure filtering on individual spreadsheet columns using various filter types such as value-based filtering to show unique values, custom filters for specific criteria, top or bottom record filtering to highlight highest or lowest data points, and dynamic filters to adjust results based on changing conditions or rules, allowing flexible control over which rows appear in a column during initialization or updates to the spreadsheet’s filter settings.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          filter: {
            columns: [{
              index: 0,
              filter: "value",
              value: "Category A"
            }]
          }
        }]
      });
    </script>

### sheets.filter.columns.index `Number`

The index of the column relative to the [`filter` range](/api/javascript/ui/spreadsheet#configuration-sheets.filter.ref).


<div class="meta-api-description">
How do I target a specific column in a Kendo UI Spreadsheet filter? Specify, select, or target a particular column position within a filter range in a spreadsheet by setting the column index relative to the filtered data area; this enables controlling, configuring, referencing, or updating individual columns inside filter settings, adjusting filter behaviors based on column order, and precisely managing filter criteria on specific column positions within a table or data grid, including scenarios where you need to identify, apply, or modify filters for distinct columns by their zero-based or relative index number.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          filter: {
            ref: "A1:D10",
            columns: [{
              index: 2,
              type: "value",
              value: "Active",
              filter: "custom",
              criteria: [{ value: "A", operator: "contains" }]
            }]
          }
        }]
      });
    </script>

### sheets.filter.columns.logic `String`

The logical operator that will apply to [`filter` criteria](/api/javascript/ui/spreadsheet#configuration-sheets.filter.columns.criteria).

The supported values are:

* `and`
* `or`


<div class="meta-api-description">
How do I configure multiple filtering conditions for a single column in Kendo UI Spreadsheet? Control how multiple filtering conditions for a single column combine using logical operators like AND or OR, enabling configuration of whether all criteria must be met simultaneously or any one condition triggers inclusion, useful for setting complex filter logic, customizing multi-criteria filters, defining boolean expressions in column filtering, adjusting filter behavior to use conjunctions or disjunctions, and managing combined conditions during spreadsheet setup to tailor data views based on multiple rules applied to the same column.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          filter: {
            columns: [{
              index: 0,
              type: "custom",
              logic: "and",
              criteria: [
                { operator: "gte", value: "100" },
                { operator: "lte", value: "500" }
              ]
            }]
          }
        }]
      });
    </script>

### sheets.filter.columns.type `String`

The filter sub-type, if any.

The applicable types according to the [main `filter`](/api/javascript/ui/spreadsheet#configuration-sheets.filter.columns.filter) are:

* `top`
    * `topNumber`
    * `topPercent`
    * `bottomNumber`
    * `bottomPercent`
* `dynamic`
    * `aboveAverage`
    * `belowAverage`
    * `tomorrow`
    * `today`
    * `yesterday`
    * `nextWeek`
    * `thisWeek`
    * `lastWeek`
    * `nextMonth`
    * `thisMonth`
    * `lastMonth`
    * `nextQuarter`
    * `thisQuarter`
    * `lastQuarter`
    * `nextYear`
    * `thisYear`
    * `lastYear`
    * `yearToDate`


<div class="meta-api-description">
How do I configure custom filter types for specific columns in a Kendo UI Spreadsheet? Configure and set column-level filter sub-types to refine spreadsheet data filtering with precise control over numeric, percentage, relative, and date-based criteria, enabling options such as top or bottom values by number or percent, dynamic filters for date ranges like today, yesterday, tomorrow, this week, last month, next quarter, and year-to-date, as well as statistical filters including above average or below average, allowing developers to enable, adjust, or customize filtering behavior on specific spreadsheet columns to match complex queries and fine-tune the visible dataset according to various time frames, value thresholds, or percentile distributions.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          filter: {
            columns: [{
              index: 0,
              filter: "top",
              type: "topNumber",
              value: 10
            }]
          }
        }]
      });
    </script>

### sheets.filter.columns.value `Number|String|Date`

The filter value for filters that require a single value, for example, `top`.


<div class="meta-api-description">
How do I configure the filter value in Kendo UI for jQuery Spreadsheet when using an operator like "equals"? Configure or set the single comparison value used in a spreadsheet column filter to control filtering criteria based on specific values, keywords, or conditions when using operators that require one, such as equals, contains, or top N filters. Enable precise filter value definition for individual columns to customize filtering behavior during sheet initialization, allowing scenarios like filtering by exact match, threshold values, keywords like “top,” or other comparison inputs. Control and define the filter value condition applied within column filters to refine data views dynamically, supporting use cases from simple value comparison to advanced filter expressions in spreadsheet data management.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          filter: {
            columns: [{
              index: 0,
              type: "value",
              value: "Category A"
            }]
          }
        }]
      });
    </script>

### sheets.filter.columns.values `Array`

The filter values for filters that support multiple values.


<div class="meta-api-description">
How do I customize the filter dropdown options in Kendo UI Spreadsheet multi-value column filters? Control and configure the allowed set of selectable values for multi-value column filters in spreadsheet columns, enabling filtering by specifying or updating which values appear in the filter dropdown, managing the list of permitted filter options to refine the data view, set or modify the filter criteria based on multiple selectable entries, handle user selection for multi-select filters, and customize how rows are matched and displayed based on allowed filter values in columns.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          filter: {
            columns: [{
              index: 0,
              type: "value",
              values: ["Category A", "Category B", "Category C"]
            }]
          }
        }]
      });
    </script>

### sheets.filter.ref `String`

The active range for the filter, for example, `B1:D8`.


<div class="meta-api-description">
How do I set the active filtered cell range in a Kendo UI for jQuery spreadsheet using A1 notation? Control and configure the active filtered cell range within a spreadsheet by specifying the target area using standard A1 notation like B1:D8, enabling users to apply, update, or modify filters across specific rows and columns. This includes setting precise filter boundaries, adjusting filter scopes on selected sheets, targeting particular cell ranges for data filtering, and managing the span of filter application dynamically to control visibility and data sorting on defined sheet segments. Address use cases involving filtering subsets of data, refining filter ranges, updating filtering criteria on different sheets, and tailoring filters to custom cell selections within spreadsheets.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          filter: {
            ref: "A1:C10",
            columns: [{
              index: 0,
              type: "value",
              value: "Product",
              filter: "custom",
              criteria: [{ value: "A", operator: "contains" }]
            }]
          }
        }]
      });
    </script>

### sheets.frozenColumns `Number`

The number of frozen columns in this sheet.


<div class="meta-api-description">
How do I set the number of frozen columns in a Kendo UI Spreadsheet? Control the number of leading columns that stay fixed or locked in place during horizontal scrolling within a spreadsheet, enabling freeze or lock column functionality to keep important data visible while navigating wide tables, configure how many initial columns remain constantly displayed without moving as you scroll sideways, set or adjust the count of persistent fixed columns for easier data comparison and header visibility in large sheets, manage frozen, locked, or pinned columns for enhanced readability and usability in spreadsheet interfaces.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          frozenColumns: 2
        }]
      });
    </script>

### sheets.frozenRows `Number`

The number of frozen rows in this sheet.


<div class="meta-api-description">
How do I freeze rows in Kendo UI Spreadsheet to keep headers visible while scrolling? Set or adjust the number of top rows in a spreadsheet that remain fixed or locked in place during vertical scrolling, enabling control over frozen or pinned header rows for better data visibility and navigation; customize how many rows stay visible as you scroll down through the sheet by specifying an integer count, allowing users to freeze headers, lock rows, or keep important information always in view regardless of scroll position.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          frozenRows: 1
        }]
      });
    </script>

### sheets.mergedCells `Array`

An array of merged cell ranges, for example, `B1:D2`.


<div class="meta-api-description">
How do I specify merged cell ranges in Kendo UI Spreadsheet using A1 notation? Configure, set, or retrieve merged cell ranges within spreadsheets by specifying arrays of cell ranges using A1 notation like B1:D2, enabling control over combined or split cells for formatting, layout, or data organization purposes. Manage cell merging and unmerging programmatically during initialization or runtime, handling grouped cells, spanning multiple rows or columns, and defining complex merged structures across sheets to customize display and usability. Adjust or query merged areas dynamically to optimize spreadsheet appearance, ensure data clarity, or automate layout adjustments in spreadsheet applications.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          mergedCells: ["A1:C1", "B2:D3"]
        }]
      });
    </script>

### sheets.rows `Array`

The row data for this sheet.


<div class="meta-api-description">
How can I control and customize individual rows in a Kendo UI for jQuery Spreadsheet? Control and configure the collection of rows within a spreadsheet sheet including loading, binding, updating, or manipulating row data and layout attributes such as row indices, cell contents, row height, visibility, and hiding or showing individual rows. Manage row-level data structures for initialization or dynamic updates in tabular data, customize row properties for display, editing, or data processing tasks, and handle ordered sequences of cells organized by rows to support operations like adding, removing, hiding, resizing, or modifying content across multiple rows in the spreadsheet context.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [
            {
              height: 25,
              cells: [
                { value: "Name", bold: true },
                { value: "Age", bold: true }
              ]
            },
            {
              cells: [
                { value: "John" },
                { value: 30 }
              ]
            }
          ]
        }]
      });
    </script>

### sheets.rows.cells `Array`

The cells for this row.


<div class="meta-api-description">
How to access individual cells in a Kendo UI spreadsheet row? Access or configure individual cells within a specific row of a spreadsheet sheet by managing the collection of cell objects, enabling setting or retrieving cell values, formulas, formatting options, styles, read-only status, data binding, metadata, and layout attributes like colspan and rowspan. This supports initializing, updating, iterating over, or programmatically manipulating cells in any row across multiple sheets, controlling data content, appearance, and behavior of spreadsheet grid cells within rows and sheets.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [
              { value: "Product", fontFamily: "Arial", fontSize: "14px" },
              { value: "Price", textAlign: "center" },
              { value: "Quantity", color: "#ff0000" }
            ]
          }]
        }]
      });
    </script>

### sheets.rows.cells.background `String`

The background color of the cell. Many standard CSS formats are supported. However, the canonical form is `#ccff00`.


<div class="meta-api-description">
How do I set a custom background color for individual cells in a Kendo UI Spreadsheet? Control and customize the color fill or background shading of individual spreadsheet cells using various color formats like hex codes (#ccff00), RGB, RGBA, or common color names, enabling dynamic styling, theming, and color binding of cells either when the spreadsheet loads or during user interaction or programmatic updates to highlight, differentiate, or label data visually within grid-like table structures.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [
              { value: "Header", background: "#ffff00" }
            ]
          }]
        }]
      });
    </script>

### sheets.rows.cells.borderBottom `Object`

The style information for the bottom border of the cell.


<div class="meta-api-description">
How do I set the bottom border style for cells in a Kendo UI Spreadsheet? Configure, customize, or set the bottom border of spreadsheet cells by adjusting the border style, color, thickness, or width for each cell's lower edge. Control cell border appearance to highlight, separate, or format table rows and columns, supporting styling needs like solid, dashed, or custom borders. Enable precise control over cell bottom border formatting within spreadsheet data grids for visual clarity, row delineation, or enhanced user interface design while initializing or modifying sheets, rows, and cells.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Cell with bottom border",
              borderBottom: {
                color: "#000000",
                size: "2px"
              }
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.borderBottom.color `String`

The bottom border color of the cell. Many standard CSS formats are supported. However, the canonical form is `#ccff00`.


<div class="meta-api-description">
How do I change the color of the bottom border in a Kendo UI Spreadsheet cell? Control and customize the bottom border color of spreadsheet cells by setting styles during sheet setup or updates, enabling precise border coloring with a variety of CSS-compatible formats including hex codes, RGB, RGBA, and named color values to highlight, differentiate, or emphasize cell boundaries; adjust the cell border color to enhance readability, apply themes, enforce design consistency, or visually separate rows and data segments within grid layouts.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Cell",
              borderBottom: {
                color: "#ff0000"
              }
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.borderBottom.size `String`

The width of the border in pixels.


<div class="meta-api-description">
How do I set the size of the bottom border in Kendo UI Spreadsheet cells? Adjust or set the thickness, width, or size of the bottom border on spreadsheet cells, rows, or sheets by specifying pixel values to style, customize, or update cell borders dynamically during configuration or runtime; enables control over cell bottom line appearance, formatting, border styling, line weight, and visual separation for individual cells, rows, or entire sheets within spreadsheet-like data grids or tables.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Cell",
              borderBottom: {
                size: "3px"
              }
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.borderLeft `Object`

The style information for the left border of the cell.


<div class="meta-api-description">
How do I customize the left border of cells in a Kendo UI for jQuery Spreadsheet? Control and customize the left border of spreadsheet cells by setting properties like color, width, thickness, style variations such as solid or dashed lines, and visual appearance to enhance cell layout and formatting in rows and sheets. Enable, configure, or adjust the left cell border to influence cell outlines, gridlines, or divider effects within spreadsheet data views and rendering, supporting varied styling preferences and display customizations for precise cell border presentation.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Cell",
              borderLeft: {
                color: "#0000ff",
                size: "1px"
              }
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.borderLeft.color `String`

The left border color of the cell. Many standard CSS formats are supported. However, the canonical form is `#ccff00`.


<div class="meta-api-description">
How to set custom color for left border of individual cells in Kendo UI Spreadsheet? Control and customize the left border color of individual spreadsheet cells by specifying colors using various formats such as hex codes, RGB, RGBA, HSL, or named color values to style cell edges, highlight data, set borders for cell ranges, adjust border styling in grids or tables, and apply consistent color schemes to left edges for improved visual organization and formatting flexibility.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Cell",
              borderLeft: {
                color: "#00ff00"
              }
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.borderLeft.size `String`

The width of the border in pixels.


<div class="meta-api-description">
How do I set the width of the left border in a Kendo UI Spreadsheet cell? Adjust, configure, or set the thickness, width, or pixel size of the left cell border within spreadsheet rows to customize cell outlines or styling. Control how thick or thin the left border line appears on individual cells or entire rows, supporting changes through code or sheet settings. Enable precise border width adjustments on the left edge of cells for design, formatting, or UI purposes, defining the border thickness in pixels or numeric values to enhance visual separation or highlight in spreadsheets.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Cell",
              borderLeft: {
                size: "2px"
              }
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.borderTop `Object`

The style information for the top border of the cell.


<div class="meta-api-description">
How do I customize the top border of individual cells in a Kendo UI Spreadsheet? Configure, customize, or control the top border appearance of individual spreadsheet cells by setting properties related to border color, thickness, style (such as solid, dashed, or dotted), and visibility along the top edge of rows and cells within sheets. Enable precise styling and formatting of the upper cell boundary for enhanced visual separation, layout design, or data highlighting in spreadsheets, allowing adjustments to the cell's top border line to fit themes, formatting rules, or user preferences.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Cell",
              borderTop: {
                color: "#ff00ff",
                size: "3px"
              }
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.borderTop.color `String`

The top border color of the cell. Many standard CSS formats are supported. However, the canonical form is `#ccff00`.


<div class="meta-api-description">
How can I set the color of the top border for cells in a Kendo UI Spreadsheet? Set, configure, or customize the top border color of spreadsheet cells using various color formats such as named colors, hexadecimal codes, RGB, and RGBA values, enabling precise control over cell styling and appearance for rows and columns. Adjust or change the upper border shading to highlight, differentiate, or format cells within sheets, controlling the visual design through color customization of the top edge border in grids or tables. Easily define or modify the cell top border color for spreadsheet interfaces, supporting multiple CSS-compatible color inputs to match themes, highlight data, or create visual separation between rows and cells.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Cell",
              borderTop: {
                color: "#ff6600"
              }
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.borderTop.size `String`

The width of the border in pixels.


<div class="meta-api-description">
How do I adjust the top border size of a cell in Kendo UI for jQuery Spreadsheet? Adjust, set, or configure the thickness, width, or size of the top border line of a spreadsheet cell, row, or sheet edge by specifying a numeric pixel value to control the cell’s upper border thickness or outline, enabling fine-tuned border styling, formatting, or visual separation of cells with customizable top edge dimensions for cells, rows, or sheets.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Cell",
              borderTop: {
                size: "4px"
              }
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.borderRight `Object`

The style information for the right border of the cell.


<div class="meta-api-description">
How to set custom border style for right side of a cell in Kendo UI Spreadsheet? Set, customize, and control the style, color, thickness, and pattern of the right border line on individual spreadsheet cells or rows, including options like solid, dashed, dotted, or custom line styles, enabling precise visual formatting and border design for table layouts, grid lines, cell outlines, and spreadsheet edges in applications that handle tabular data or Excel-like interfaces.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Cell",
              borderRight: {
                color: "#000000",
                size: "1px"
              }
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.borderRight.color `String`

The right border color of the cell. Many standard CSS formats are supported. However, the canonical form is `#ccff00`.


<div class="meta-api-description">
How can I customize the right border color of individual cells in a Kendo UI for jQuery Spreadsheet? Control and customize the color of the right border on individual spreadsheet cells by setting the cell’s right edge color using various CSS-compatible formats such as named colors, hexadecimal codes, rgb(), and rgba(); enable styling, highlighting, or differentiating cells by configuring the right border color for visual emphasis, design consistency, or conditional formatting effects within spreadsheets and tables.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Cell",
              borderRight: {
                color: "#cccccc"
              }
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.borderRight.size `String`

The width of the border in pixels.


<div class="meta-api-description">
How do I change the width of the right border in a Kendo UI Spreadsheet cell? Adjust or configure the thickness, width, or size of the right border line for individual cells in a spreadsheet grid, controlling pixel dimensions to customize cell right-edge borders, enabling developers to set, change, or style the right cell border width dynamically for layout, formatting, or visual separation purposes in spreadsheet interfaces.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Cell",
              borderRight: {
                size: "2px"
              }
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.color `String`

The font color of the cell. Many standard CSS formats are supported. However, the canonical form is `#ccff00`.


<div class="meta-api-description">
How to change cell color in Kendo UI Spreadsheet using hexadecimal code? Set or customize the font color of spreadsheet cells using various CSS color formats including named colors, hexadecimal codes, rgb(), rgba(), and hsl() values to style text appearance, highlight data, apply color coding, adjust readability, or differentiate content by changing cell text color dynamically in tabular data or grid layouts.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Colored text",
              color: "#ff0000"
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.comment `String`

The comment of the cell - a tooltip that appears when the cell is hovered.


<div class="meta-api-description">
How to add inline comments to individual spreadsheet cells in Kendo UI for jQuery? Control, add, or set inline tooltip notes, annotations, or comments for individual spreadsheet cells to display helpful information or explanations when hovering over a cell. Enable or configure cell-level hover tooltips that show descriptive text, remarks, or user notes inline within spreadsheet grids. Customize cell comments or notes as annotations, hover tooltips, or popup hints to provide context, guidance, or metadata within spreadsheet rows and columns. Facilitate showing, editing, or initializing cell-specific remarks visible on mouseover to enhance user understanding or data clarification. Provide cell comment text, inline notes, or hover annotations to support interactive data grids with contextual information displayed dynamically over spreadsheet cells.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Hover me",
              comment: "This is a cell comment"
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.fontFamily `String`

The font family of the cell.


<div class="meta-api-description">
How do I change the font type for specific cells in a Kendo UI spreadsheet? Set or change the typeface, font face, or text style for individual spreadsheet cells by specifying CSS font-family values, including font stacks like Arial, Helvetica, or generic fonts such as sans-serif. Control and customize how text appears within spreadsheet cells by configuring the font family to match desired typography preferences, enable consistent or varied fonts across rows, sheets, or specific cells, and apply custom or system fonts for improved readability, branding, or design requirements. Adjust font settings to override default text rendering, support cross-platform font compatibility, and tailor the cell content’s visual presentation with flexible font-family options.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Custom Font",
              fontFamily: "Courier New"
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.fontSize `Number`

The font size of the cell in pixels.


<div class="meta-api-description">
How do I change the font size of text in a Kendo UI Spreadsheet cell? Adjust or configure the size of text inside spreadsheet cells by setting the font dimension in pixels, enabling control over how large or small the cell content appears; useful for customizing cell text scale, enhancing readability, modifying display fonts, changing text size, and formatting cell appearance with specific pixel-based font sizing in spreadsheet tools or grid interfaces.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Large Text",
              fontSize: 18
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.italic `Boolean`

If set to `true`, sets the cell font to italic.


<div class="meta-api-description">
How to italicize cell content in Kendo UI Spreadsheet? Control the text style within spreadsheet cells by enabling or disabling italic formatting to render cell content in an italicized font style or keep it normal, allowing you to apply, set, toggle, or configure italic font emphasis for individual cells or ranges, adjusting font styles dynamically for enhanced readability, styling, or emphasis in spreadsheets, whether through boolean flags, styling options, or font attributes.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Italic text",
              italic: true
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.bold `Boolean`

If set to `true`, sets the cell font to bold.


<div class="meta-api-description">
How to set bold font in individual cells of a Kendo UI Spreadsheet? Control and enable bold text styling for individual spreadsheet cells by setting font weight to bold or normal within the hierarchical structure of sheets, rows, and cells; adjust cell text formatting to appear emphasized with bold font or standard weight to highlight or differentiate content, support dynamic styling, customize cell appearance in tabular data, toggle emphasis on cell values, and configure font emphasis programmatically for cells inside spreadsheets, enhancing readability and visual hierarchy in data grids or tables.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Bold text",
              bold: true
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.enable `Boolean`

If set to `false`, disables the cell.


<div class="meta-api-description">
How to make specific cells in Kendo UI Spreadsheet read-only? Control whether individual spreadsheet cells are interactive or locked by configuring their enabled state to allow or prevent editing and user input, including options to disable specific cells to make them read-only or inactive, managing cell accessibility within sheets, rows, and cells structure, setting or toggling cell responsiveness to user actions, enabling or disabling editing features at the cell level, restricting user modifications on certain spreadsheet entries, and configuring cell activation status during initialization for fine-grained control over editable and non-editable cells in spreadsheets.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [{
              value: "Disabled cell",
              enable: false
            }]
          }]
        }]
      });
    </script>

### sheets.rows.cells.format `String`

The format of the cell text. For more information, refer to the article on [creating or deleting a custom number format on MS Office](https://support.office.com/en-au/article/Create-or-delete-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4).


<div class="meta-api-description">
How do I customize the format of individual cells in a Kendo UI for jQuery Spreadsheet? Adjust cell text appearance by specifying formatting options such as number, date, currency, percentage, or custom patterns to display data according to desired style. Enable configuring how spreadsheet cell contents show with flexible format strings, including predefined and user-defined number formats for precise control over text presentation, data styling, or currency and date layouts. Set or modify display settings for individual cells to manage numeric, financial, percentage, date formats, and customize visual output for spreadsheet data in various contexts and locales.
</div>

#### Example - setting the format of a cell

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                name: "Order",
                rows: [{
                    cells: [{
                        value: 12.39, format: "$#,##0.00"
                    }]
                }],
            }]
        });
    </script>

### sheets.rows.cells.formula `String`

The cell formula without the leading equals sign, for example, `A1 * 10`.


<div class="meta-api-description">
How do I set or update a formula in a specific cell of a Kendo UI Spreadsheet row? Set, read, or update the expression or calculation assigned to a spreadsheet cell, enabling control over formulas, mathematical operations, references, and dynamic computations within cells without including the initial equals symbol; manipulate cell formulas to perform calculations, link to other cells, create functions, or automate value updates in rows and columns across sheets, supporting formula editing, retrieval, and evaluation for spreadsheet automation or data processing.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{
                    value: 10
                }, {
                    formula: "A1 * 2"
                }]
            }]
        }]
    });
    </script>

### sheets.rows.cells.html `Boolean`

If set to `true`, renders the cell value as HTML.
It is important to sanitize the value of the cell on the server for passing safe html because there is no client-side sanitizing. When editing a cell the new value can be checked and prevented in the client `changing` event.


<div class="meta-api-description">
How to allow HTML content in Kendo UI Spreadsheet cells? Control whether cell content in spreadsheet grids renders as raw HTML or plain text by enabling or disabling HTML interpretation within cells, allowing embedded HTML tags, formatting, and markup to display inside spreadsheet cells; configure this to insert HTML strings directly for rich content but ensure server-side sanitization to prevent security risks, and handle input validation or sanitize user changes dynamically during editing through event hooks to block unsafe HTML or scripts, supporting use cases like displaying styled text, links, images, or custom HTML components within spreadsheet cells.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{
                    value: "<strong>Bold Text</strong>",
                    html: true
                }, {
                    value: "Regular Text",
                    html: false
                }]
            }]
        }]
    });
    </script>

### sheets.rows.cells.index `Number`

The zero-based index of the cell. Required to ensure correct positioning.


<div class="meta-api-description">
How do I set the position of a cell in a Kendo UI Spreadsheet row? Set or control the zero-based position of a cell within a row to define its exact order and placement, enabling precise cell addressing, retrieval, insertion, or repositioning inside a spreadsheet grid or table. Configure the cell’s location index to ensure accurate mapping and alignment when navigating, rendering, or manipulating individual cells by their sequential position, supporting row-level cell arrangement, indexing, and address calculations for dynamic or static data layouts.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{
                    index: 0,
                    value: "Cell A1"
                }, {
                    index: 2,
                    value: "Cell C1"
                }]
            }]
        }]
    });
    </script>

### sheets.rows.cells.link `String`

The hyperlink (URL) of the cell.


<div class="meta-api-description">
How to enable clickable links in Kendo UI Spreadsheet cells? Set, update, or retrieve the hyperlink URL associated with a spreadsheet cell to enable clickable links, navigate from cells to external websites, internal anchors, or resources, configure cell navigation with URLs, control link assignment on individual cells, access and modify cell hyperlink properties, make cells act as hyperlinks for directing users to specific addresses or targets, manage URL connections within cell data, and enable or disable link functionality on spreadsheet cells.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{
                    value: "Visit Telerik",
                    link: "https://www.telerik.com"
                }, {
                    value: "Email Us",
                    link: "mailto:info@telerik.com"
                }]
            }]
        }]
    });
    </script>

### sheets.rows.cells.textAlign `String`

The text-align setting for the cell content.

The available options are:
* `left`
* `center`
* `right`


<div class="meta-api-description">
How to set alignment for text in individual cells of a Kendo UI Spreadsheet? Adjust or configure the horizontal positioning of content inside spreadsheet cells by setting alignment options such as left, center, or right alignment per individual cell or group of cells. Enable precise control over text layout within table grids, allowing users to align cell text horizontally for improved readability, formatting consistency, or to match specific design requirements when displaying data. This feature supports customization of cell content orientation horizontally across rows and columns, facilitating layout adjustments, centering numeric data, or aligning labels to the left for spreadsheet presentation and editing scenarios.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{
                    value: "Left aligned",
                    textAlign: "left"
                }, {
                    value: "Center aligned",
                    textAlign: "center"
                }, {
                    value: "Right aligned",
                    textAlign: "right"
                }]
            }]
        }]
    });
    </script>
* `justify`

### sheets.rows.cells.underline `Boolean`

If set to `true`, sets the cell font to underline.


<div class="meta-api-description">
How do I enable underlining in Kendo UI Spreadsheet cells? Control whether a cell’s text displays an underline by enabling, disabling, or toggling underline font styling within spreadsheet cells, allowing configuration of text decorations such as underlined content, highlighting specific data with underlined fonts, customizing cell text appearance, and applying or removing underlining effects for clarity, emphasis, or formatting purposes in tabular or spreadsheet data environments.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{
                    value: "Underlined text",
                    underline: true
                }, {
                    value: "Normal text",
                    underline: false
                }]
            }]
        }]
    });
    </script>

### sheets.rows.cells.value `Number|String|Boolean|Date`

The cell value.


<div class="meta-api-description">
How can I access and modify cell values in Kendo UI for jQuery Spreadsheet? Access, retrieve, modify, or assign the content of individual spreadsheet cells by reading or setting their data values programmatically; interact with cell contents for data entry, update, import/export operations, capturing user edits, or dynamically controlling spreadsheet information by manipulating the stored value within each cell to reflect displayed content, handle formulas, text, numbers, or empty cells in rows and columns.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [
          {
            rows: [
              {
                cells: [{ value: "Name" },{ value: "age" }]
              },
              {
                cells: [{ value: "Peter" },{ value: 34 }]
              }
            ]
          }
        ]
      });
    </script>

### sheets.rows.cells.validation `Object`

The validation rule that is applied to the cell.


<div class="meta-api-description">
How to enforce specific data types in individual cells of a Kendo UI Spreadsheet widget? Set up cell-level input controls by specifying validation rules that enforce accepted data types, numeric or date ranges, dropdown lists, or custom validation logic for individual spreadsheet cells. Enable configuring strict input constraints, define allowed values or patterns, apply custom checks, or restrict entries to ensure data integrity within cells. Control user input validation by configuring single-cell rules during spreadsheet setup, including type enforcement, list selection options, range limits, or custom validators matching complex conditions. Tailor cell content acceptance through customizable validation settings, supporting data restrictions, dropdown menus, and formula-driven checks at the cell level.
</div>

#### Example - initializing the Spreadsheet with validation data by using the `sheets.rows` configuration option

    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [
                {
                    name: "Populated" ,
                    rows: [
                        {
                            index: 2,
                            cells: [
                                { index: 3, background: "red", color: "green", value: "D3" },
                                { index: 10, color: "blue", value: "a value" }
                            ]
                        },
                        {
                            index: 5,
                            cells: [
                                {
                                    index: 0,
                                    color: "red",
                                    value: "A6",
                                    validation: {
                                        from: "1",
                                        to: "2",
                                        comparerType: "between",
                                        dataType: "number",
                                        messageTemplate: "Number should match the validation."
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    </script>

### sheets.rows.cells.validation.type `String`

Defines the validation type.

The supported options are:

* `reject`
* `warning` (default)


<div class="meta-api-description">
How do I prevent invalid data from being entered into cells in a Kendo UI Spreadsheet? Control input validation behavior for spreadsheet cells by specifying whether invalid entries should be rejected outright or allowed with a warning message. Enable blocking of incorrect data to enforce strict input rules or opt for non-blocking alerts that notify users without preventing their entry. Adjust validation settings to either prevent invalid cell inputs, display warnings on invalid data, set error handling modes for cell input, configure rejection or warning on bad inputs, and manage how invalid values are treated within spreadsheet cells during data entry or initialization.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{
                    value: 10,
                    validation: {
                        type: "reject",
                        dataType: "number",
                        comparerType: "greaterThan",
                        from: 5
                    }
                }]
            }]
        }]
    });
    </script>

### sheets.rows.cells.validation.comparerType `String`

Defines the comparer type that is used to validate the cell value.


<div class="meta-api-description">
How to configure comparison logic for validating cell values in a Kendo UI Spreadsheet? Control and configure the method by which spreadsheet cell values are compared during validation, enabling selection of comparison operators such as equality checks, range validations, pattern matching, or custom comparator functions; set or adjust how data is evaluated within cells by choosing appropriate comparison logic for validation rules, including operators for greater than, less than, equals, between ranges, regex patterns, or user-defined comparison, optimizing input validation, data integrity, and conditional checks within spreadsheet cells.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{
                    value: 15,
                    validation: {
                        dataType: "number",
                        comparerType: "between",
                        from: 10,
                        to: 20
                    }
                }]
            }]
        }]
    });
    </script>

The supported values are:

* `greaterThan`
* `lessThan`
* `between`
* `equalTo`
* `notEqualTo`
* `greaterThanOrEqualTo`
* `lessThanOrEqualTo`
* `notBetween`
* `custom`

### sheets.rows.cells.validation.dataType `String`

Defines the data type of the cell value.

The supported values are:

* `date`
* `text`
* `number`
* `list`
* `custom`


<div class="meta-api-description">
How to restrict data type in individual spreadsheet cells using Kendo UI for jQuery? Control and enforce the specific data type allowed in individual spreadsheet cells, enabling validation rules for inputs as dates, text strings, numeric values, predefined lists, or custom formats; configure cell-level restrictions to ensure data integrity, parse inputs correctly, restrict user entry to expected types, specify validation logic for dates, numbers, text, dropdown selections, or tailor custom validation criteria for dynamic spreadsheet data handling.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{
                    value: "test@example.com",
                    validation: {
                        dataType: "custom",
                        from: "AND(EXACT(FIND(\"@\",A1),FIND(\"@\",SUBSTITUTE(A1,\"@\",\"\",ROW(INDIRECT(\"1:\"&LEN(A1)-LEN(SUBSTITUTE(A1,\"@\",\"\"))))))),ISERROR(FIND(\" \",A1)))"
                    }
                }]
            }]
        }]
    });
    </script>

### sheets.rows.cells.validation.from `String`

Defines a formula or a value that is used for the comparison process. Used as the only compare value if the comparer type does not require a second argument. Mandatory for validation to work.


<div class="meta-api-description">
How do I configure the comparison operand in Kendo UI Spreadsheet cell validation rules? Configure or set the source value, reference, or formula used as the comparison operand in spreadsheet cell validation rules, enabling you to specify a literal value, cell address, or expression (like "=A1") that defines the baseline or criteria for data validation checks; this input is essential for comparison operations requiring one or more arguments, controlling how validation rules evaluate cell contents against constants, formulas, or other cell values to enforce data integrity in grid or tabular components.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{
                    value: 8,
                    validation: {
                        dataType: "number",
                        comparerType: "greaterThan",
                        from: "5"
                    }
                }]
            }]
        }]
    });
    </script>

### sheets.rows.cells.validation.showButton `Boolean` *(default: false)*

A Boolean value which indicates if a button for selecting list items will be displayed (`dataType` set to `list`).


<div class="meta-api-description">
How to show dropdown button in Kendo UI Spreadsheet cell with data validation? Enable or disable the display of a dropdown or picker button inside spreadsheet cells that have data validation enforcing list-type inputs, controlling whether users see a clickable UI element to select from predefined options within a cell, often used for setting or toggling the visibility of the list selection control in spreadsheet interfaces to improve data entry, user interaction, and validation feedback for cells constrained to specific allowed values.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{
                    validation: {
                        dataType: "list",
                        from: "A,B,C",
                        showButton: true
                    }
                }]
            }]
        }]
    });
    </script>

### sheets.rows.cells.validation.to `String`

Defines a formula or a value that is used for the comparison process. Will be used if the comparer type requires a second argument.


<div class="meta-api-description">
How do I configure the target value in Kendo UI Spreadsheet for two-parameter cell validation? Set or configure the target value or formula used for validating a spreadsheet cell's content against criteria requiring two parameters, such as specifying comparison endpoints for range checks, exact matches, or conditions like "between." Enable or adjust the reference value, whether a literal or formula expression, to define the operand against which the cell’s value is compared during validation processes involving dual-argument comparers, including equality, inequality, or range-based validations. Use this to specify or control the secondary validation input needed for conditions that require a boundary, threshold, or exact match target when ensuring data correctness, enforcing rules, or setting validation constraints in spreadsheet cells.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{
                    value: 15,
                    validation: {
                        dataType: "number",
                        comparerType: "between",
                        from: "10",
                        to: "20"
                    }
                }]
            }]
        }]
    });
    </script>

### sheets.rows.cells.validation.allowNulls `Boolean`

Specifies whether to allow `null` values.


<div class="meta-api-description">
How to allow null values in Kendo UI Spreadsheet cell validation? Control whether empty, missing, or null values are permitted during spreadsheet cell validation by configuring validation rules to accept or reject blank entries, nulls, or missing data in individual cells or ranges. Enable or disable the acceptance of null, undefined, or empty values to enforce strict data entry, prevent validation failures due to empty inputs, allow optional data fields, manage validation behavior for empty cells, and specify how absence of values is treated during validation checks in spreadsheets, tables, or grids. This setting affects whether null or empty cell contents are considered valid or invalid when applying validation constraints, enabling fine-grained control over data completeness and integrity during user input or automated data validation processes.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{
                    validation: {
                        dataType: "number",
                        comparerType: "greaterThan",
                        from: "0",
                        allowNulls: true
                    }
                }]
            }]
        }]
    });
    </script>

### sheets.rows.cells.validation.messageTemplate `String`

Defines the `hint` message that will be displayed if the value is invalid.

The template provides access to the following variables:

* `from{0}`
* `to{1}`
* `fromFormula{2}`
* `toFormula{3}`
* `dataType{4}`
* `type{5}`
* `comparerType{6}`


<div class="meta-api-description">
How to customize validation messages in Kendo UI Spreadsheet cells? Configure and customize validation messages for spreadsheet cells by setting dynamic hint templates that display specific error or guidance text when cell input does not meet criteria, enabling tailored feedback with placeholders for validation range values, formula references, data types, comparison operators, and validation types; this supports defining meaningful user prompts or error hints triggered during data entry, enforcing rules with contextual messages that reflect numeric limits, formulas, data constraints, comparison logic, and validation kinds, useful for controlling validation feedback, error displays, input warnings, and custom validation text in spreadsheet cells.
</div>

#### Example - using validation template variables

	<div id="example">
		<div id="spreadsheet" style="width: 100%;"></div>
		<script>
			$(function() {
			$("#spreadsheet").kendoSpreadsheet({
				columns: 26,
				rows: 30,
				sheetsbar: false,
				excel: {
				// Required to enable Excel Export in some browsers
				proxyURL: "https://demos.telerik.com/service/v2/core/export"
				},
				sheets: [
				{
					name: "Validation Template",

					rows: [
					{
						height: 25,
						cells: [
						{
							value: "15",
							validation: {
							dataType: "number",
							from: "B1",
							to:"C1",
							allowNulls: true,
							comparerType:"between" ,
							type: "reject",
							titleTemplate: "Number validation error",
							messageTemplate: "The number have to be between {0} and {1}"
							}

						},
						{
							value: "10",

						},
						{
							value: "20",

						},

						]
					},
					],
					columns: [
					{
						width: 100
					},
					{
						width: 215
					},
					{
						width: 115
					},
					{
						width: 115
					},
					{
						width: 115
					}
					]
				},
				{
					name: "ListValues",
					rows: [ //A1:B1
					{
						cells: [
						{
							value: true
						},
						{
							value: false
						}
						]
					}
					]
				}
				]
			});
			});
		</script>
    </div>

### sheets.rows.cells.validation.titleTemplate `String`

Defines the `hint` title that will be displayed if the value is invalid.


<div class="meta-api-description">
How to customize the error message title when cell values fail validation in Kendo UI Spreadsheet? Set or customize the validation error message title or tooltip header displayed when spreadsheet cells contain invalid data, enabling control over the hint text shown during cell value validation failures, including configuring custom validation hint titles, error prompts, or tooltip headers for invalid entries in rows and cells, helping to define clear feedback messages for data validation issues within spreadsheet sheets.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{
                    value: 5,
                    validation: {
                        dataType: "number",
                        comparerType: "greaterThan",
                        from: "10",
                        titleTemplate: "Value must be greater than {0}"
                    }
                }]
            }]
        }]
    });
    </script>

### sheets.rows.cells.verticalAlign `String`

The vertical align setting for the cell content.

The available options are:

* `top`
* `center`
* `bottom`


<div class="meta-api-description">
How do I vertically align content in Kendo UI spreadsheet cells? Control or set the vertical position of content inside spreadsheet cells by configuring alignment to the top, middle, or bottom, enabling customization of how text, numbers, or objects appear aligned vertically within rows and cells, useful for adjusting cell content positioning, formatting spreadsheets, aligning data elements vertically, centering content, or anchoring cell items to the top or bottom inside spreadsheet rows and columns.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                height: 60,
                cells: [{
                    value: "Top aligned",
                    verticalAlign: "top"
                }, {
                    value: "Center aligned",
                    verticalAlign: "center"
                }, {
                    value: "Bottom aligned",
                    verticalAlign: "bottom"
                }]
            }]
        }]
    });
    </script>

### sheets.rows.cells.wrap `Boolean`

If set to `true`, wraps the cell content.


<div class="meta-api-description">
How to enable wrapping of text in Kendo UI Spreadsheet cells? Enable or disable text wrapping within spreadsheet cells to control whether cell content displays on multiple lines or remains a single clipped line, allowing preservation of line breaks for better readability or compact display. Configure cell text to wrap inside rows and sheets to prevent overflow issues, improve visualization of lengthy or multiline data entries, and manage how content adjusts dynamically to cell sizes by toggling multiline display versus single-line truncation in grid or table components. This setting impacts how text content fits and flows inside spreadsheet cells, useful for formatting, presentation, editing scenarios, and improving user interface clarity in data grids or sheet views.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                height: 60,
                cells: [{
                    value: "This is a very long text that should wrap to multiple lines",
                    wrap: true
                }, {
                    value: "This text will not wrap and will overflow",
                    wrap: false
                }]
            }]
        }]
    });
    </script>

### sheets.rows.height `Number`

The row height in pixels. Defaults to [`rowHeight`](/api/javascript/ui/spreadsheet#configuration-rowHeight).


<div class="meta-api-description">
How to set custom row height in Kendo UI Spreadsheet? Adjust or configure individual row height in pixels for spreadsheet sheets to control vertical spacing and layout customization, set fixed or dynamic row pixel dimensions per sheet overriding default global rowHeight settings, manage row spacing for grid or table-like spreadsheet interfaces, control row size for better visibility or compactness in spreadsheet views, enable precise row pixel height adjustments during initialization or runtime to tailor sheet appearance, define custom pixel heights for rows to fit content or enhance readability in multi-sheet spreadsheets, manipulate row vertical dimensions for layout optimization in data grids, configure pixel-based row height for sheets to ensure uniform or varied spacing across rows, set or override row height attributes specifically per sheet to control visual row spacing in spreadsheet components.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                height: 80,
                cells: [{
                    value: "Tall row"
                }]
            }, {
                height: 30,
                cells: [{
                    value: "Short row"
                }]
            }]
        }]
    });
    </script>

### sheets.rows.index `Number`

The absolute row index. Required to ensure correct positioning.


<div class="meta-api-description">
How do I set the position of a specific row in a Kendo UI Spreadsheet by its index? Set or configure the absolute position of a row within a spreadsheet or sheet by specifying the exact row number or index to control placement, ordering, and rendering of rows. Enable precise row positioning during initialization or dynamic updates, manage row order, set row indices to ensure correct alignment, interaction, and layout within tables, grids, or sheets, and control row placement for sorting, inserting, or accessing specific rows by their absolute numeric position. Ideal for scenarios requiring exact control over row locations, overriding default ordering, or targeting rows by their fixed position in spreadsheet data structures.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                index: 0,
                cells: [{
                    value: "Row 1"
                }]
            }, {
                index: 3,
                cells: [{
                    value: "Row 4 (skipping rows 2 and 3)"
                }]
            }]
        }]
    });
    </script>

### sheets.rows.type `String`

The table row element role in the context of the Grid table structure.


<div class="meta-api-description">
How do I configure row behavior in Kendo UI for jQuery Spreadsheet? Configure or set the role and behavior of table rows within a spreadsheet or grid structure by specifying how each row is identified, rendered, and interpreted in the document object model and accessibility tree, enabling control over row semantics, presentation, keyboard navigation, selection behavior, and assistive technology roles to manage header rows, data rows, detail rows, or custom row types in complex tabular layouts.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                type: "data",
                cells: [{
                    value: "Data row"
                }]
            }, {
                type: "header",
                cells: [{
                    value: "Header row"
                }]
            }]
        }]
    });
    </script>

### sheets.selection `String`

The selected range in the sheet, for example, `A1:B10`.


<div class="meta-api-description">
How can I set the initial highlighted cells in a Kendo UI for jQuery spreadsheet using A1-style references? Control or retrieve the active cell or range selection within a spreadsheet sheet using familiar A1-style references like A1:B10, enabling setting the initial highlighted cells, updating or querying the current selection boundaries, adjusting or reading selected ranges programmatically, managing focus on specific cell blocks, configuring which cells are highlighted or active, and handling user or code-driven changes to the selected cell area within a worksheet environment.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            selection: "A1:C3",
            rows: [{
                cells: [{
                    value: "Cell A1"
                }, {
                    value: "Cell B1"
                }, {
                    value: "Cell C1"
                }]
            }]
        }]
    });
    </script>

### sheets.showGridLines `Boolean` *(default: true)*

A Boolean value which indicates if the grid lines of the sheet will be displayed.


<div class="meta-api-description">
How to show grid lines in Kendo UI Spreadsheet widget? Configure the visibility of cell boundary lines or grid structure in a spreadsheet to enable or disable grid lines across the sheet, controlling whether the interface displays faint borders that separate cells for easier data alignment, or hides these lines to create a cleaner, uninterrupted layout without visible cell dividers for presentations or simplified views; toggle grid visibility to enhance readability, adjust appearance, or customize the sheet's look by showing or hiding the default cell grid display during initialization or runtime settings.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            showGridLines: false,
            rows: [{
                cells: [{
                    value: "No grid lines"
                }]
            }]
        }]
    });
    </script>

### sheets.sort `Object`

Defines the sort criteria for the sheet.


<div class="meta-api-description">
How to sort spreadsheet rows by multiple columns in Kendo UI for jQuery? Configure or set sorting criteria for spreadsheet rows by specifying one or multiple sort descriptors including columns or fields and sort directions like ascending or descending. Control the ordering and multi-level sorting of sheet data to organize rows based on one or more keys, enabling custom data arrangement, prioritized sorting, or nested sort sequences. Adjust how spreadsheet rows are ordered on initialization by defining sorting rules that handle various sorting scenarios such as single-column sort, multi-column sorting, or layered data ordering. Enable sorting preferences for spreadsheet sheets to determine the order of rows dynamically during setup, supporting use cases like alphabetical sorting, numerical ordering, date-based sorting, or complex hierarchical sorting schemes.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            sort: {
                ref: "A1:B5",
                columns: [{
                    index: 0,
                    ascending: false
                }]
            },
            rows: [{
                cells: [{
                    value: "Name"
                }, {
                    value: "Age"
                }]
            }]
        }]
    });
    </script>

### sheets.sort.columns `Array`

Specifies the sort options for individual columns.


<div class="meta-api-description">
How to set up multi-column sorting in Kendo UI Spreadsheet? Set or configure sorting rules for each spreadsheet column to control the order and priority of data arranged by column, enabling multi-column sorting with options to specify ascending or descending directions per column, define sorting precedence among multiple columns, adjust individual column sort criteria, customize how columns are ordered and prioritized within the sheet, and combine multiple column sort descriptors to create complex, prioritized sorting sequences across various columns.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            sort: {
                ref: "A1:C5",
                columns: [{
                    index: 0,
                    ascending: true
                }, {
                    index: 1,
                    ascending: false
                }]
            }
        }]
    });
    </script>

### sheets.sort.columns.ascending `Boolean`

Indicates if the data in the cell will be sorted in ascending (`true`) or descending order (`false`).


<div class="meta-api-description">
How to set ascending sort order for specific columns in a Kendo UI spreadsheet? Control the sorting order for spreadsheet columns by setting whether data in specified columns should be arranged in ascending or descending sequence, enabling configuration of sort rules to organize rows from smallest to largest, A to Z, earliest to latest, or reverse, supporting flexible sorting preferences within sheet configurations and allowing toggling between increasing and decreasing order for numeric, text, or date values in spreadsheet columns.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            sort: {
                ref: "A1:B5",
                columns: [{
                    index: 0,
                    ascending: true
                }]
            }
        }]
    });
    </script>

### sheets.sort.columns.index `Number`

The index of the column within the sheet. For example, column **C** will have an index of `2`.


<div class="meta-api-description">
How do I specify the column to sort by index in Kendo UI Spreadsheet? Define or set the target column for sorting, filtering, or data manipulation in a spreadsheet using a zero-based numeric position that identifies the exact column order, allowing developers to specify columns by their index number for arranging rows, applying sort criteria, referencing columns dynamically, enabling column-specific operations, or automating updates based on column position rather than header name or label.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            sort: {
                ref: "A1:C5",
                columns: [{
                    index: 2,
                    ascending: true
                }]
            }
        }]
    });
    </script>

### sheets.sort.ref `String`

The sorted range, for example, `A1:D5`.


<div class="meta-api-description">
How to sort data in a specific cell range using A1-style references in Kendo UI Spreadsheet? Control and configure sorting for a specific cell range or subset within a spreadsheet using A1-style references like A1:D5, enabling targeted sorting of selected rows and columns rather than the entire sheet. Enable or set the sorted region boundaries, specify precise cell areas for sort operations, define custom ranges for sorting data segments, adjust sort scope to particular blocks or rectangular zones, and manage sorting filters or preferences by addressing cell intervals or coordinate ranges, ensuring fine-grained control over partial data reordering inside spreadsheet tabs or sheets.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            sort: {
                ref: "A1:D5",
                columns: [{
                    index: 0,
                    ascending: true
                }]
            }
        }]
    });
    </script>

### sheetsbar `Boolean` *(default: true)*

A Boolean value which indicates if the sheets-bar will be displayed.


<div class="meta-api-description">
How can I control the visibility of worksheet tabs in Kendo UI for jQuery Spreadsheet? Configure the visibility of worksheet tabs or the sheets navigation bar to enable or disable tab-based switching between multiple sheets in a spreadsheet interface, allowing users to show, hide, toggle, or control the display of sheet tabs for seamless navigation among worksheets during initialization or runtime settings.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheetsbar: false,
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{
                    value: "No sheets bar"
                }]
            }]
        }]
    });
    </script>

### toolbar `Boolean|Object` *(default: true)*

A Boolean value which indicates if the toolbar will be displayed.

Apart from the built-in tools, the Spreadsheet File, Home, Insert, Format, Data and View ToolBars fully expose the [ToolBar.items API](/api/javascript/ui/toolbar/configuration/items). This way you can specify any custom tools in the widget using the components available in the ToolBar itself:


<div class="meta-api-description">
How can I customize the toolbars in Kendo UI for jQuery Spreadsheet? Control the visibility and configuration of spreadsheet toolbars to enable, disable, show, hide, or customize interface elements such as file options, editing commands, insert tools, formatting features, data manipulation, and viewing layouts. Manage toolbar display dynamically with Boolean settings for toggling visibility, customize toolbar contents through component APIs to add, remove, or modify tools, enhance user interface control by enabling or disabling specific toolbar groups, and tailor the spreadsheet’s action bar to fit different workflows or user preferences with flexible toolbar management and customization options.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                home: [ {
                    type: "button",
                    text: "Button"
                }, {
                    type: "button",
                    text: "Toggle",
                    togglable: true,
                    icon: "cancel"
                }, {
                    type: "splitButton",
                    text: "SplitButton",
                    menuButtons: [{text: "Option 1"}, {text: "Option 2"}]
                } ]
            }
        });
    </script>

### toolbar.file `Boolean|Array` *(default: true)*

A Boolean value which indicates if the **File** tab or a collection of tools that will be shown in the **Home** tab will be displayed.

The following list indicates the available tools.

* `open`
* `exportAs`


<div class="meta-api-description">
How do I hide the File tab in Kendo UI Spreadsheet's toolbar? Control the visibility and availability of file management options like open and export functions within spreadsheet interfaces, including toggling the display of the File tab or embedding these file-related tools within the Home tab layout, enabling configuration to show or hide file operation controls during setup, supporting user needs to access, open, export, or manage spreadsheet files seamlessly through customizable toolbar options and interface layouts.
</div>

#### Example - customizing the File tab

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                file: ["exportAs"]
            }
        });
    </script>

#### Example - disabling the File tab

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                file: false
            }
        });
    </script>

#### Example - showing a custom tool

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                file: [
                    // for all available options, see the toolbar items configuration
                    // https://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar/configuration/items
                    {
                        type: "button",
                        text: "Custom",
                        showText: "both",
                        icon: "k-icon k-i-cog",
                        click: function() {
                            window.alert("custom tool");
                        }
                    }
                ]
            }
        });
    </script>

### toolbar.home `Boolean|Array` *(default: true)*

A Boolean value which indicates if the **Home** tab or a collection of tools that will be shown in the **Home** tab will be displayed.

The following list indicates the available tools. The tools which are part of a tool group are defined as an array. For example `["bold", "italic", "underline"]`.

* [`undo`, `redo`]
* [`cut`, `copy`, `paste`]
* [`bold`, `italic`, `underline`]
* `backgroundColor`, `textColor`
* `borders`
* `fontSize`, `fontFamily`
* `alignment`
* `textWrap`


<div class="meta-api-description">
How can I customize the home tab in Kendo UI Spreadsheet's toolbar? Control the visibility and content of the primary spreadsheet toolbar tab by enabling or disabling the home section or customizing which editing and formatting tools appear, including common actions like undo, redo, cut, copy, paste, text styling such as bold, italic, underline, font adjustments like size and family, color settings including background and text colors, cell borders, alignment options, and text wrapping. Configure the home toolbar to show default sets or select specific groups or individual tools to streamline user interface for editing and formatting tasks, supporting toggling display on or off or providing arrays of features for tailored toolbar layouts. This customization helps tailor the spreadsheet’s main toolbar for various editing workflows, quick access to clipboard operations, font style controls, cell formatting, and alignment settings within the home tab.
</div>

#### Example - customizing the Home tab

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                home: [ ["bold", "italic"], "format" ]
            }
        });
    </script>

#### Example - disabling the Home tab

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                home: false
            }
        });
    </script>

#### Example - showing a custom tool

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                home: [
                    // for all available options, see the toolbar items configuration
                    // https://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar/configuration/items
                    {
                        type: "button",
                        text: "Custom",
                        showText: "both",
                        icon: "k-icon k-i-cog",
                        click: function() {
                            window.alert("custom tool");
                        }
                    }
                ]
            }
        });
    </script>

### toolbar.insert `Boolean|Array` *(default: true)*

A Boolean value which indicates if the **Insert** tab or a collection of tools that will be shown in the **Insert** tab will be displayed.

The following list indicates the available tools. The tools which are part of a tool group are defined as an array. For example `["deleteColumn", "deleteRow"]`.

* `insertComment`
* `hyperlink`
* `insertImage`
* [ `addColumnLeft`, `addColumnRight`, `addRowBelow`, `addRowAbove` ]
* [ `deleteColumn`, `deleteRow` ]


<div class="meta-api-description">
How to hide insert menu in Kendo UI Spreadsheet toolbar? Control whether the insert menu or tab is visible in the spreadsheet toolbar and specify which insertion options appear, such as adding or deleting rows and columns, inserting comments, hyperlinks, images, or batch configuring insertion tools; enable, disable, show, hide, customize, or configure the set of insert operations available for users to modify spreadsheet structure and content dynamically, including fine-grained control over column and row insertion or deletion and content embedding features.
</div>

#### Example - customizing the **Insert** tab

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                insert: [ ["deleteColumn", "deleteRow"] ]
            }
        });
    </script>

#### Example - disable insert tab

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                insert: false
            }
        });
    </script>

### toolbar.format `Boolean|Array` *(default: true)*

A Boolean value which indicates if the **Format** tab or a collection of tools that will be shown in the **Format** tab will be displayed.

The following list indicates the available tools

* `format`
* `formatDecreaseDecimal`
* `formatIncreaseDecimal`


<div class="meta-api-description">
How to show/hide formatting options in Kendo UI Spreadsheet toolbar? Control the visibility of the formatting options and tools in the spreadsheet toolbar, enabling or disabling access to features like text and number format, adjusting decimal places, and managing cell appearance settings; toggle the display of the format tab and its associated buttons to customize the toolbar for showing or hiding formatting controls such as decimal increase and decrease, number formatting, and overall cell style adjustments within spreadsheet applications.
</div>

#### Example - customizing the **Format** tab

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                format: [ ["formatDecreaseDecimal", "formatIncreaseDecimal"] ]
            }
        });
    </script>

#### Example - disable format tab

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                format: false
            }
        });
    </script>

### toolbar.data `Boolean|Array` *(default: true)*

A Boolean value which indicates if the **Data** tab or a collection of tools that will be shown in the **Data** tab will be displayed.

The available tools are:

* `sort`
* `filter`
* `validation`


<div class="meta-api-description">
How do I customize the data tools in the Kendo UI Spreadsheet toolbar? Control or customize the data tools in the spreadsheet toolbar by enabling or disabling the Data tab, choosing to display specific features like sorting, filtering, and data validation controls, or showing the entire data section for managing spreadsheet data operations. Adjust which data-related tools appear in the toolbar by setting options to turn the Data tab on or off, or selectively include sorting, filtering, and validation functionalities to streamline data management, enhance data processing, or configure spreadsheet user interface elements related to data manipulation and quality control. This setting supports toggling visibility and tailoring available data tools within the spreadsheet’s toolbar environment.
</div>

#### Example - customizing the **Data** tab

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                data: ["validation"]
            }
        });
    </script>

#### Example - disabling the **Data** tab

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                data: false
            }
        });
    </script>

### toolbar.view `Boolean|Array` *(default: true)*

A Boolean value which indicates if the **View** tab or a collection of tools that will be shown in the **View** tab will be displayed.

The following list indicates the available tools

* `freeze`
* `merge`
* `toggleGridlines`


<div class="meta-api-description">
How do I hide the View options in the Kendo UI Spreadsheet toolbar? Control the visibility of the View menu or View options in the spreadsheet toolbar, enabling or disabling access to features like freezing panes, merging cells, and toggling gridlines display. Configure whether to show or hide the group of view-related tools, manage display settings such as gridline visibility, set freeze pane functionality, and enable or disable merge cell controls for customizing spreadsheet interface tool access. Adjust visibility settings for view controls to tailor the toolbar for simpler or advanced editing modes, controlling the presence of gridline toggles, cell merging options, and pane freeze capabilities within the spreadsheet environment.
</div>

#### Example - customizing the **View** tab

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                view: [ ["freeze", "toggleGridlines"] ]
            }
        });
    </script>

#### Example - disable view tab

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                view: false
            }
        });
    </script>

### useCultureDecimals `Boolean` *(default: false)*

If set to `true`, the Spreadsheet formula parser will obey the decimal separator of the current culture.  If set to `false` (default), the decimal separator in formulas will always be the dot.

This flag has implications on how formulas are entered. When it is set to `true`, in cultures where the decimal separator is the comma (`,`), similar to Excel, the following additional changes upon entering a formula will occur:

- The semicolon will become a function argument separator. For example, `=SUM(A1;A2)` instead of `=SUM(A1,A2)`.
- The backslash will become an element separator in an array formula. For example, `={1\2;3\4}` instead of `={1,2;3,4}`.

This flag only affects the presentation - the way formulas are entered by the end user or displayed on screen. Serialization to JSON or XLSX as well as the public API functions will continue to use the dot as decimal separator and the comma as an argument separator (canonical form). For example, to apply a formula by using the API, even if `useCultureDecimals` is in effect, you still need to use the canonical form.


<div class="meta-api-description">
How to make Kendo UI Spreadsheet formulas use local decimal separator? Control whether formulas in spreadsheet configurations use the local culture's decimal separator and argument delimiters, enabling support for regional formats such as comma or dot as decimals, and semicolon or comma as function argument separators; configure input and display of formulas according to cultural settings, manage the parsing behavior to align with international decimal and list separators, enable or disable culture-specific number formatting in formulas, handle formula entry in localized decimal formats, adjust for culture-based function argument and array element delimiters, set formula syntax presentation modes, and understand differences between user-facing formula formats and the underlying canonical serialization required by APIs and file exports.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    kendo.culture("de-DE");
    $("#spreadsheet").kendoSpreadsheet({
        useCultureDecimals: true,
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{
                    value: 3.14,
                    format: "0,00"
                }, {
                    formula: "A1*2"
                }]
            }]
        }]
    });
    </script>

    sheet.range('B1').formula('SUM(A1, A2, 3.14)');
    // or:
    sheet.range('B1').input('=SUM(A1, A2, 3.14)');

    // prints: SUM(A1, A2, 3.14)
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(sheet.range('B1').formula());

To make the API functions obey `useCultureDecimals`, wrap your code in a call to `sheet.withCultureDecimals`. Assuming a culture where the comma is used for decimals, compare the previous example with the following one.

    sheet.withCultureDecimals(function(){
        sheet.range('B1').formula('SUM(A1; A2; 3,14)');
        // or:
        sheet.range('B1').input('=SUM(A1; A2; 3,14)');

        // prints: SUM(A1; A2; 3,14)
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(sheet.range('B1').formula());
    });

    // back to canonical form; this prints: SUM(A1, A2, 3.14)
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(sheet.range('B1').formula());

## Methods

### activeSheet

Gets or sets the active sheet.


<div class="meta-api-description">
How to programmatically change the active sheet in Kendo UI Spreadsheet? Switch or retrieve the currently selected spreadsheet tab, change the visible sheet by setting sheet references or names, get the active worksheet for navigation, control which sheet is focused or shown in the interface, update selection to switch tabs programmatically, manage active pages or sheets for user interactions, access current sheet for reading or editing, dynamically set or query the displayed sheet within a workbook, enable automatic sheet changes, and handle switching between tabs to reflect user or code-driven changes.
</div>

#### Parameters

##### sheet `kendo.spreadsheet.Sheet` *optional*

The [sheet](/api/javascript/spreadsheet/sheet) to set as active.

#### Returns

`kendo.spreadsheet.Sheet` - The active [sheet](/api/javascript/spreadsheet/sheet).

#### Example - changing the active sheet

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{ name: "Sheet1" }, { name: "Sheet2" }]
        });
        var sheets = $("#spreadsheet").data("kendoSpreadsheet").sheets();
        $("#spreadsheet").data("kendoSpreadsheet").activeSheet(sheets[1]);
    </script>

### addImage

Adds an image to this spreadsheet.


<div class="meta-api-description">
How to programmatically add images to a Kendo UI for jQuery spreadsheet? Insert, place, embed, or programmatically add images, pictures, graphics, or visual elements into spreadsheet sheets, enabling automation of adding logos, charts, photos, or diagrams for reports, templates, dashboards, or data visualization. Control positioning, sizing, placement, and integration of images within spreadsheet cells or floating layers, and manipulate, update, or remove these visuals dynamically via the spreadsheet API. Support use cases like automatically embedding images from URLs or blobs, customizing image layout on sheets, enhancing data presentations with visual content, or scripting image insertion for repetitive reporting tasks.
</div>

#### Parameters

##### image `Blob|String`

The image to add.  If it's a string it will be interpreted as an URL.
It can be a data URL, or an external URL.  [Read more
information](#configuration-images) about image URLs in the
configuration section.

#### Returns

`String` - The new image ID.

#### Example

    <div id="spreadsheet"></div>
    <script>
        var spreadsheet = $("#spreadsheet").kendoSpreadsheet().getKendoSpreadsheet();
        var imageId = spreadsheet.addImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAMAAACrgNoQAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9Tix9UHewgopChdbIgKuKoVShChVIrtOpgcukXNGlIUlwcBdeCgx+LVQcXZ10dXAVB8APExdVJ0UVK/F9SaBHjwXE/3t173L0DhHqZqWbHOKBqlpGKx8RMdlXsfEUA3ejDCCISM/W5ZDIBz/F1Dx9f76I8y/vcn6NXyZkM8InEs0w3LOIN4ulNS+e8TxxiRUkhPiceM+iCxI9cl11+41xwWOCZISOdmicOEYuFNpbbmBUNlXiKOKyoGuULGZcVzluc1XKVNe/JXxjMaSvLXKc5jDgWsYQkRMioooQyLERp1UgxkaL9mId/yPEnySWTqwRGjgVUoEJy/OB/8LtbMz854SYFY0DgxbY/IkDnLtCo2fb3sW03TgD/M3CltfyVOjDzSXqtpYWPgP5t4OK6pcl7wOUOMPikS4bkSH6aQj4PvJ/RN2WBgVugZ83trbmP0wcgTV0lboCDQ2C0QNnrHu/uau/t3zPN/n4AUk5ymuNOeXwAAAMAUExURUK6WDi2Tvb893/Qjej369bw23rOiabesFLAZsDoyMfqzYbTlK7huBmrNMvs0Uq9X3bNhv///4DQj7nlwZDWnYXSk2TGdoPRkWLFdOH05KLdrXDKgLLjuk++YzS1TJPXnzq3Ua3htnTMhKXer0S6WrznxG7Kf53bqFXAaP3+/snr0EG5V6nfsmDFciiwQSSuPYjUlpvapqvgtWnIeuL05iqxQ8TpyljBa2fHeWvIfB2sOLTkvVjCazS0S0i8XWzJfCGuOiavPiSvPSKuPDm2T1rCbSCtOi2yRer37Pn9+rbkvja1Td7z4j24U6ngs0S6WZHXnrDiufL689Pv2M7t0+L05W3Kfv7//vz+/C6yRj24VEm8Xi+zRo3VmkW7Wvv9+0e7XOT155TYoFC/ZOX26P3+/dfx3DG0ST+5Vcnrz9jx3fX79vj8+F/Ecff8+PH68zCzSPj9+TK0SUu9YC+zR9Lu10e8XM7t1PP79Uy9YUK6V9zy4JfZozO0SpjZpGrIe9Xw2vT79tvy39Tv2fr9+/P69JXYoT64VOz47lG/ZfD68u758LvmwsXqzOD04+f26oPSknHLgn3PjHPMg8/t1V3Eb3jNh9Hu1nLLgorUl6Tdru/58O3478zs0o/WnJrapb/nxi6yRTy3UlfBatrx3l7EcNnx3SewQLrmwrPjvOX16JnapXzPi9/z47flwOv47YzVmZbZol7Ecc3t07Hiuje2TsPpyrvmwyyyRO/58er37cjrzlzDb2XHd+b26cDox8LpyY7Wm9Du1VvDbqzhtb3nxd3z4VXBaSuxQ5bYop/cqlPAZyyxRE2+YS6zRj65VCmxQvr9+rfkv0+/ZB+tOSKtO5zbp/v+/N3z4P7//zCzR4vUmCOuPG3JfhGoLEa8Wza2Tfn9+fz+/d/049Dt1f7+/v7//S2yRo7Vm4HRj4LSkfP79CuyQ+358On360G6Vs/u1UC5Vd7z4dzz4SawP93y4YfTlSyyRZbYocjrz1C/ZWPGdLPkvC2yRLTjvKffsVPVlv4AAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfjBQkOHwu5+vlqAAAC0ElEQVRIx2MQxA4a/uOQYMAunJXgXkeKhqZid3d3Q+I1ZEW7g8B8YjVklblDQB1xGpYVu8OAITEa0srcEaCOsIa0BHdkUENIQ5qdOypYjV9DQ5w7OjiJTwOaeyBgI24NrGXu2EANLg1Y3AMBSdg14DAfzR8IDc1x7rhBEqaGYH93fCAAXQNe85HtYCDKfBCQR9YAVb/whJOju3uknpPjBRDD/YvTDnf35Xf0FiK5CqwhGOqeEw9kgTHn6JLcmSF7f4e7KUPx878n2jk+nkByFUhDKcw9DsaNwe7OGc0XpVzz+9sdb6XlX3a6cLSQ2Q0qLwLRgHC/g6XgJ8cTPwU3uxewCP7m7YwQfMl7Pjvil747QgcDwnyghnrBtKtHBG9EOd1ZJyh/75Wg4Ere34JN504ghS7D7ip3ZA3BPwRZKh0ir7wUPGD1T9Pz8fIAwf9XIhFKZjIYuKNoiBAs3MQb6a5/+pkJQ+KhP+GXVwhORtbQzpCzBkUDU2H4iytn3PWKvl7fINhmL9j22TPaCaGCYQqDYMskZA0f2G4+nXbFfcdVHsF3gmLnH759NP3NBbiCuGBQKMUzI2nIsqoTfG1jdc6NTVCwK2N5qaCglBtcvX8zJB4iJiGCtVrPaYXgKgYnx+IcwV69K1KCgnfdYF6IK4XFdIsQzIaLrO5OcuXhfHJ6O560iLg52HvOeb8cqj6BFZGWIiCuOsHIwe++0NHltDnjiRMqpxlPnElPLv6O5B5EaoX4A5L43C84OZ1YuHC5k6l7JEQAbH4zan6IF8KfuMvS0HNcKl4dUPeg5Gl8dtixYis1IsRxqs/CXi5pvsSuPqEBV8mH3Q7+LNxlq+YELOGzDF/prSmOx79Y64cINDv4mwjVQOGieNyDtY5LRbKjOIuYWjT1G1x9NZEVuygu9+DSkArWUbmE+LaG5jfs7sHdmhEU588iqfkjyNWmiV0CAAlw59i21O4WAAAAAElFTkSuQmCC");
        var sheet = spreadsheet.activeSheet();
        sheet.batch(function(){
            sheet.addDrawing({
                topLeftCell: "B2",
                offsetX: 0,
                offsetY: 0,
                width: 48,
                height: 48,
                image: imageId
            });
        });
    </script>

### cellContextMenu

Gets the `contextMenu` instance of the cell.


<div class="meta-api-description">
How can I customize the context menu in Kendo UI Spreadsheet for cells? Access, customize, or control the context menu for spreadsheet cells by retrieving the cell-specific menu instance to programmatically open the menu, modify menu items, enable or disable commands, attach event listeners, handle user interactions like selection or opening events, dynamically update options based on cell state, and integrate custom behavior or extensions after the spreadsheet is fully initialized.
</div>

#### Returns

`kendo.ui.ContextMenu` - The menu instance.

#### Example

    <div id="spreadsheet"></div>
    <script>
    var spreadsheet = $("#spreadsheet").kendoSpreadsheet().data("kendoSpreadsheet");
    var cellContextMenu = spreadsheet.cellContextMenu();
    cellContextMenu.append([{ text: "Custom Action", cssClass: "custom" }]);
    cellContextMenu.bind("select", function(e) {
        console.log("Custom action selected");
    });
    </script>

#### Dynamically adding a context menu item and associating a selection command

```pseudo
    <div id="spreadsheet"></div>

    <script>
        $(function() {
            var spreadsheet = $("#spreadsheet").kendoSpreadsheet().data("kendoSpreadsheet"),
                cellContextMenu = spreadsheet.cellContextMenu();

          	cellContextMenu.append([{ text: "Highlight", cssClass: "highlight" }]);

            cellContextMenu.bind("select", function(e) {
               var command = $(e.item).text();

              if(command == "Highlight") {
              	var sheet = spreadsheet.activeSheet(),
                    selection = sheet.selection();

                selection.background("green");
              }
           });
        });
    </script>
```
 
### cleanupImages

Discards the images that are no longer in use.  Note that you cannot
remove a particular image directly by ID, for it might be used in
multiple sheets, or they can be referenced by the undo/redo queue.
This function acts like a "garbage collector" — it checks which images
are no longer needed, and removes them.


<div class="meta-api-description">
How do I automatically remove unused images in Kendo UI Spreadsheet? Remove unused or orphaned pictures, clear out redundant or unreferenced images across all sheets, free up storage by deleting images no longer linked anywhere in the spreadsheet including hidden references in undo and redo history, clean up embedded pictures that are no longer in use, discard unused media files that are shared among sheets or stored in history, perform garbage collection for images to optimize file size and performance by eliminating all images not actively referenced in any cell, formula, or sheet, automate image cleanup without specifying individual IDs, manage and prune image storage by scanning all sheet contents and undo/redo buffers.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    var spreadsheet = $("#spreadsheet").kendoSpreadsheet().data("kendoSpreadsheet");
    
    // Add some images then remove them
    // Later cleanup unused images
    spreadsheet.cleanupImages();
    console.log("Unused images cleaned up");
    </script>

### rowHeaderContextMenu

Gets the `contextMenu` instance of the row header.


<div class="meta-api-description">
How do I access and customize the row header context menu in a Kendo UI for jQuery spreadsheet? Retrieve or manipulate the row header context menu in a spreadsheet interface, enabling developers to access the menu instance for customizing, configuring, or controlling its items and behavior such as adding, removing, or updating menu options, attaching event handlers to respond to user interactions, programmatically opening or closing the menu, adjusting settings or options dynamically, inspecting menu properties after initialization, and integrating custom logic related to row headers within spreadsheet applications or interactive grid components.
</div>

#### Returns

`kendo.ui.ContextMenu` - The menu instance.

#### Example

    <div id="spreadsheet"></div>
    <script>
    var spreadsheet = $("#spreadsheet").kendoSpreadsheet().data("kendoSpreadsheet");
    var rowHeaderContextMenu = spreadsheet.rowHeaderContextMenu();
    rowHeaderContextMenu.append([{ text: "Custom Row Action", cssClass: "custom-row" }]);
    rowHeaderContextMenu.bind("select", function(e) {
        console.log("Custom row action selected");
    });
    </script>

#### Removing the hide command for the first row in the rowHeaderContextMenu

```pseudo
    <div id="spreadsheet"></div>

    <script>
    $(function() {
        var spreadsheet = $("#spreadsheet").kendoSpreadsheet().data("kendoSpreadsheet"),
            rowContextMenu = spreadsheet.rowHeaderContextMenu();

        rowContextMenu.bind("open", function(e) {
            var menu = e.sender;
            var spread = $(e.target).getKendoSpreadsheet();
            var sheet = $(e.target).getKendoSpreadsheet().activeSheet();
            var selected = sheet.select();
            var rowNumber = selected.topLeft.row;

            if (rowNumber === 0) {
                $('li[data-action="hide-row"]').hide();
            } else {
                $('li[data-action="hide-row"]').show();
            }
        });
    });
    </script>
```

### colHeaderContextMenu

Gets the `contextMenu` instance of the column header.


<div class="meta-api-description">
How do I access and customize the column header context menu in Kendo UI Spreadsheet? Retrieve and access the column header's contextual menu instance in a spreadsheet to customize or control menu items, dynamically modify and configure options, attach event listeners for menu interactions, programmatically open or close the header menu, inspect menu state, or invoke menu actions related to column headers. This method enables developers to manipulate the header dropdown menu behavior, extend or customize the column header context menu functionality, and control its visibility and contents through code or event-driven logic within spreadsheet components.
</div>

#### Returns

`kendo.ui.ContextMenu` - The menu instance.

#### Example

    <div id="spreadsheet"></div>
    <script>
    var spreadsheet = $("#spreadsheet").kendoSpreadsheet().data("kendoSpreadsheet");
    var colHeaderContextMenu = spreadsheet.colHeaderContextMenu();
    colHeaderContextMenu.append([{ text: "Custom Column Action", cssClass: "custom-col" }]);
    colHeaderContextMenu.bind("select", function(e) {
        console.log("Custom column action selected");
    });
    </script>

#### Removing the hide command for the first column in the colHeaderContextMenu

```pseudo
    <div id="spreadsheet"></div>

    <script>
    $(function() {
        var spreadsheet = $("#spreadsheet").kendoSpreadsheet().data("kendoSpreadsheet"),
            colContextMenu = spreadsheet.colHeaderContextMenu();

        colContextMenu.bind("open", function(e) {
            var menu = e.sender;
            var spread = $(e.target).getKendoSpreadsheet();
            var sheet = $(e.target).getKendoSpreadsheet().activeSheet();
            var selected = sheet.select();
            var colNumber = selected.topLeft.col;

            if (colNumber === 0) {
                $('li[data-action="hide-column"]').hide();
            } else {
                $('li[data-action="hide-column"]').show();
            }
        });
    });
    </script>
```

### sheets

Returns an array with the sheets in the workbook.


<div class="meta-api-description">
How can I access and manipulate all sheets within a Kendo UI for jQuery spreadsheet? Access, list, and manipulate all sheets within a spreadsheet by obtaining an array of sheet objects from the workbook, enabling iteration over sheets, retrieval of individual worksheet data, enumeration of all sheet names or properties, applying batch operations, filtering or transforming sheet collections, passing sheets to functions for serialization, modification, or export, configuring sheet-related workflows, and integrating sheet data handling in scripts or automation tasks.
</div>

#### Returns

`Array` - The available sheets.

#### Example

    <div id="spreadsheet"></div>
    <script>
    var spreadsheet = $("#spreadsheet").kendoSpreadsheet({
        sheets: [
            { name: "Sheet1" },
            { name: "Sheet2" },
            { name: "Sheet3" }
        ]
    }).data("kendoSpreadsheet");
    
    var allSheets = spreadsheet.sheets();
    console.log("Total sheets:", allSheets.length);
    </script>

### fromFile

Clears the spreadsheet and populates it with data from the specified Excel (`.xlsx`) file.

> Requires Internet Explorer 10 or a recent version of other browsers. The JSZip library is a [prerequisite](/intro/supporting/export-support#jszip-library) for the import from file functionality.


<div class="meta-api-description">
How do I import Excel data into a Kendo UI Spreadsheet using JavaScript? Import spreadsheet data from an Excel .xlsx file by loading and replacing the current workbook contents, enabling client-side file import and seamless mapping of the Excel file’s sheets and cells into the application’s data structure, supporting file uploads, data parsing, and workbook reset with compatibility for modern browsers including IE10+ and utilizing JSZip for ZIP archive extraction and file reading.
</div>

#### Parameters

##### blob `Blob|File`

The file or blob that is usually obtained through a file input.

#### Returns

`Promise` - A promise that will be resolved when the import operation completes.

#### Example - importing a file

    <input id="file" type="file" />
    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet();

        $("#file").on("change", function() {
            var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
            spreadsheet.fromFile(this.files[0]);
        });
    </script>

### saveAsExcel

Initiates the Excel export. Also fires the [`excelExport`](/api/javascript/ui/spreadsheet/events/excelexport) event.

> Calling this method may trigger the built-in popup blocker of the browser. To avoid that, always call it as a response to an end-user action, for example, a button click.


<div class="meta-api-description">
How to export Kendo UI Spreadsheet data as an Excel file? Export spreadsheet data as a downloadable Excel file by initiating the Excel export process, enabling saving or exporting spreadsheet contents to XLSX format while handling or customizing the Excel workbook generation before download; configure or trigger the export operation typically in response to user interactions like button clicks to prevent browser popup blockers, intercept export events to modify, customize, or cancel the Excel file creation, and control saving or exporting spreadsheet data seamlessly to Microsoft Excel-compatible formats for reporting, sharing, or backup purposes.
</div>

#### Example - manually initiating the export to Excel

    <button id="export">Export to Excel</button>
    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                name: "Food Order",
                mergedCells: [
                    "A1:G1"
                ],
                rows: [{
                    height: 70,
                    cells: [{
                        value: "My Company", fontSize: 32, textAlign: "center"
                    }]
                }],
            }]
        });
        $("#export").click(function(e) {
            var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
            spreadsheet.saveAsExcel();
        });
    </script>

    <!-- Load JSZIP library to enable Excel export -->
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

### saveAsPDF

Initiates the PDF export. Also fires the [`pdfExport`](/api/javascript/ui/spreadsheet/events/pdfexport) event.

> Calling this method may trigger the built-in popup blocker of the browser. To avoid that, always call it as a response to an end-user action, for example, a button click.


<div class="meta-api-description">
How to export Kendo UI Spreadsheet data as PDF programmatically? Trigger exporting spreadsheet data or a selected range to PDF format on the client side for downloading or printing, enabling programmatic or UI-driven saving of sheets as PDF documents. Configure, initiate, or control PDF exports from scripts or event handlers, with the ability to inspect, modify, or cancel the export payload during the export lifecycle. Manage export triggers while considering browser popup blockers by tying the export action to user interactions like button clicks, ensuring smooth PDF generation, download, and print workflows from spreadsheet data.
</div>

#### Parameters

##### options `Object`

An `options` object with the same structure as the [`pdf`](/api/javascript/ui/spreadsheet#configuration-pdf) options.

#### Returns

`Promise` - A promise that will be resolved when the export completes. The same promise is available in the [`pdfExport`](/api/javascript/ui/spreadsheet/events/pdfexport) event arguments.

#### Example - manually initiating the export to PDF

    <button id="export">Export to PDF</button>
    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdf: {
                fileName: "Test.pdf"
            }
        });
        $("#export").click(function(e) {
            var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
            spreadsheet.saveAsPDF({ area: "selection" });
        });
    </script>

    <!-- Load Pako library to enable PDF compression -->
    <script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>

### sheetByName

Returns a sheet that matches the specified name, if any.


<div class="meta-api-description">
How can I access a specific spreadsheet tab in Kendo UI for jQuery using its exact name? Find or retrieve a specific spreadsheet tab, worksheet, or sheet by its exact name to access, read, modify, or update its data, rows, cells, formulas, or settings; search for a sheet within a spreadsheet by specifying the sheet’s name, enabling control over individual sheet content, structure, and options when you need to locate or reference a particular table or page by title, label, or identifier for automated processing, editing, or querying; returns the matching worksheet object for manipulation or returns nothing if no sheet matches the given name.
</div>

#### Parameters

##### name `String`

The name of the sheet that will be located.

#### Returns

`kendo.spreadsheet.Sheet` - The sheet that matches the name.

#### Example

    <div id="spreadsheet"></div>
    <script>
    var spreadsheet = $("#spreadsheet").kendoSpreadsheet({
        sheets: [
            { name: "Sheet1" },
            { name: "MyData" },
            { name: "Sheet3" }
        ]
    }).data("kendoSpreadsheet");
    
    var sheet = spreadsheet.sheetByName("MyData");
    if (sheet) {
        console.log("Found sheet:", sheet.name());
    }
    </script>

### sheetIndex

Returns the index of the specified sheet.


<div class="meta-api-description">
How do I get the index of a specific sheet in Kendo UI Spreadsheet? Retrieve or determine the numerical position, order, or index of a specific worksheet within a spreadsheet or workbook, enabling programmatic navigation, access, or management of sheets by their sequence number or placement; find the zero-based or one-based position of a given sheet to control sheet referencing, indexing, or dynamic selection in spreadsheet automation and manipulation tasks.
</div>

#### Parameters

##### sheet `kendo.spreadsheet.Sheet`

The sheet whose index will be determined.

#### Example

    <div id="spreadsheet"></div>
    <script>
    var spreadsheet = $("#spreadsheet").kendoSpreadsheet({
        sheets: [
            { name: "Sheet1" },
            { name: "MyData" },
            { name: "Sheet3" }
        ]
    }).data("kendoSpreadsheet");
    
    var sheet = spreadsheet.sheetByName("MyData");
    var index = spreadsheet.sheetIndex(sheet);
    console.log("Sheet index:", index);
    </script>

#### Returns

`Number` - The sheet index.

### sheetByIndex

Locates a sheet by its index in the workbook.


<div class="meta-api-description">
How do I access a specific sheet in Kendo UI for jQuery Spreadsheet by its index? Find, access, or retrieve a specific sheet within a spreadsheet or workbook using its numerical order or index position; enable selecting sheets by their zero-based or one-based index to programmatically activate, modify, read, or manipulate sheet contents, ranges, and properties based on their position rather than name.
</div>

#### Parameters

##### index `Number`

The index of the sheet to locate.

#### Returns

`kendo.spreadsheet.Sheet` - The sheet that matches the index.

#### Example

    <div id="spreadsheet"></div>
    <script>
    var spreadsheet = $("#spreadsheet").kendoSpreadsheet({
        sheets: [
            { name: "Sheet1" },
            { name: "MyData" },
            { name: "Sheet3" }
        ]
    }).data("kendoSpreadsheet");
    
    var sheet = spreadsheet.sheetByIndex(1);
    console.log("Sheet at index 1:", sheet.name());
    </script>

### insertSheet

Inserts a sheet with the specified options.


<div class="meta-api-description">
How to add a new worksheet in Kendo UI spreadsheet with custom properties? Add or create a new worksheet in a spreadsheet by inserting a sheet at a specific position or appending it to the end, enabling control over placement and order. Configure sheet properties such as custom names, initial content, and layout settings during insertion. Enable programmatic addition, sheet setup, and dynamic management of multiple tabs or pages within a workbook, supporting use cases like automated sheet creation, indexed insertion, naming conventions, and preset data population in spreadsheets.
</div>

#### Example - inseart new sheets on button click

    <div id="spreadsheet"></div>
    <button>Add New Sheet</button>
    <script>
      var i = 2
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{ name: "Sheet1" }, { name: "Sheet2" }]
      });
      var sheets = $("#spreadsheet").data("kendoSpreadsheet").sheets();
      $("button").click(function(){
        $("#spreadsheet").data("kendoSpreadsheet").insertSheet({
          name: "Custom Sheet Name" + ++i,
          frozenRows: 1,
          frozenColumns: 1,
          rows: 15,
          columns: 10,
        });
      })
    </script>

#### Parameters

##### options `Object`

The configuration options for the sheet.

##### options.rows `Number`

The number of rows in this sheet.

##### options.columns `Number`

The number of columns in this sheet.

##### options.rowHeight `Number`

The row height in this sheet in pixels.

##### options.columnWidth `Number`

The column width in this sheet in pixels.

##### options.headerHeight `Number`

The header row height in pixels.

##### options.headerWidth `Number`

The header column width in pixels.

##### options.dataSource  `kendo.data.DataSource`

The data source for this sheet.

##### options.data `Object`

The sheet state and data as `Object`. The schema follows the same structure as the [widget configuration](/api/javascript/ui/spreadsheet#configuration).

#### Returns

`kendo.spreadsheet.Sheet` - The inserted sheet.

### moveSheetToIndex

Moves the sheet to the specified index.


<div class="meta-api-description">
How can I reorder sheets in a Kendo UI for jQuery Spreadsheet by moving one to a specific index? Change, reorder, or rearrange the order of tabs or sheets within a spreadsheet by moving any sheet to a specified position or index, enabling dynamic control over sheet sequence and layout. Enable programmatic repositioning of individual sheets between different slots or indexes for customized navigation, sheet prioritization, or user interface adjustments. Set or control the position of sheets by specifying a target index to update the display order, tab arrangement, or sheet sorting in automated workflows or interactive applications. Update sheet order on the fly using index-based commands to move sheets forward, backward, or to exact locations within the spreadsheet’s collection of sheets.
</div>

#### Parameters

##### sheet `kendo.spreadsheet.Sheet`

The sheet instance that will be moved.

##### index `Number`

The new zero-based index of the sheet.

#### Example

    <div id="spreadsheet"></div>
    <script>
    var spreadsheet = $("#spreadsheet").kendoSpreadsheet({
        sheets: [
            { name: "Sheet1" },
            { name: "Sheet2" },
            { name: "Sheet3" }
        ]
    }).data("kendoSpreadsheet");
    
    var sheet = spreadsheet.sheetByName("Sheet3");
    spreadsheet.moveSheetToIndex(sheet, 0);
    console.log("Sheet3 moved to first position");
    </script>

### refresh

Re-renders all data in the Spreadsheet. In a DataSource binding scenario, uses the current data items to populate the widget.


<div class="meta-api-description">
How do I force Kendo UI Spreadsheet to reload updated data? Trigger an immediate update to reload, re-render, or redraw the entire spreadsheet interface and data display, refreshing all content to reflect the latest bound data source or programmatic changes, syncing visual elements and recalculating displayed values without delay. Whether you need to force the spreadsheet to reload data after external modifications, update the UI to match recent edits, or ensure that any dynamic data binding is current and fully synchronized, this action controls the instant refresh and rebinding process to keep the sheet’s presentation and data aligned and up-to-date.
</div>

#### Example

    <div id="spreadsheet"></div>
    <script>
    var spreadsheet = $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            name: "MySheet",
            rows: [{
                cells: [{ value: "Initial Data" }]
            }]
        }]
    }).data("kendoSpreadsheet");
    
    // Modify data programmatically
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").value("Updated Data");
    
    // Refresh the view
    spreadsheet.refresh();
    </script>

### removeSheet

Removes the specified sheet.


<div class="meta-api-description">
How do I programmatically remove a worksheet from a Kendo UI for jQuery spreadsheet component? Delete or remove a worksheet, tab, or sheet from a workbook programmatically using methods to drop, erase, or eliminate sheets within a spreadsheet component, enabling dynamic management of workbook structure, updating the user interface, and controlling which sheets are included or excluded through code for tasks like modifying, customizing, or maintaining spreadsheet layouts and contents.
</div>

#### Parameters

##### sheet `kendo.spreadsheet.Sheet`

The sheet instance that will be removed.

#### Example

    <div id="spreadsheet"></div>
    <script>
    var spreadsheet = $("#spreadsheet").kendoSpreadsheet({
        sheets: [
            { name: "Sheet1" },
            { name: "TempSheet" },
            { name: "Sheet3" }
        ]
    }).data("kendoSpreadsheet");
    
    var tempSheet = spreadsheet.sheetByName("TempSheet");
    spreadsheet.removeSheet(tempSheet);
    console.log("TempSheet removed");
    </script>

### renameSheet

Renames the specified sheet.


<div class="meta-api-description">
How can I dynamically rename a tab in a Kendo UI Spreadsheet through code? Change or update a spreadsheet tab name dynamically by specifying the target sheet through index or current name and setting a new title to rename the sheet instantly. Control and modify the worksheet label programmatically, enabling automation of sheet title changes, renaming tabs during runtime, refreshing the display name of a sheet, adjusting worksheet identifiers for organization, and managing sheet labels through code to keep the spreadsheet interface synchronized with internal state updates. This covers use cases like scripting sheet renaming, batch renaming sheets, customizing tab names without manual input, and automating workbook structure changes.
</div>

#### Parameters

##### sheet `kendo.spreadsheet.Sheet`

The sheet instance that will be renamed.

##### newSheetName `String`

The new name of the sheet.

#### Example

    <div id="spreadsheet"></div>
    <script>
    var spreadsheet = $("#spreadsheet").kendoSpreadsheet({
        sheets: [
            { name: "Sheet1" },
            { name: "Sheet2" }
        ]
    }).data("kendoSpreadsheet");
    
    var sheet = spreadsheet.sheetByName("Sheet2");
    spreadsheet.renameSheet(sheet, "RenamedSheet");
    console.log("Sheet renamed to:", sheet.name());
    </script>

#### Returns

`kendo.spreadsheet.Sheet` - The renamed sheet.

### saveJSON

Serializes the workbook in the format that is defined in the
[configuration](#configuration).  This method does not return the
JSON, but a `Promise` object which will yield the JSON data when it is
available.

This method is functionally similar to `toJSON`, but it is also able
to save the embedded images (this is the reason why it must be
asynchronous).


<div class="meta-api-description">
How to asynchronously export Kendo UI spreadsheet data to JSON format? Serialize or export a spreadsheet workbook asynchronously to JSON format, enabling conversion of workbook data—including embedded images—into a configurable JSON structure that can be retrieved via a Promise once the export process completes; supports saving complex spreadsheet content to JSON for integration, storage, or transfer purposes, handling asynchronous serialization when embedding media within the output data.
</div>

#### Returns

`Promise` - A Promise object which will be resolved with the JSON
data.

#### Example

    <div id="spreadsheet"></div>
    <pre id="result"></pre>
    <script>
        var spreadsheet = $("#spreadsheet").kendoSpreadsheet().getKendoSpreadsheet();
        spreadsheet
            .saveJSON()
            .then(function(data){
                var json = JSON.stringify(data, null, 2);
                $("#result").text(json);
            });
    </script>

### toJSON

Serializes the workbook in the format that is defined in the configuration.

Note that this method is unable to serialize embedded images.  To
properly save images you need to use [`saveJSON`](#methods-saveJSON),
which is asynchronous (returns a `Promise`).


<div class="meta-api-description">
How to convert Kendo UI Spreadsheet data to JSON? Convert or export the entire spreadsheet workbook into a JSON object or string capturing all sheets, cell values, formatting, styles, and configuration settings according to predefined or customizable JSON schemas; serialize data synchronously for quick snapshots of workbook state excluding embedded images, facilitating data exchange, backup, or manipulation; ideal for developers needing to generate JSON representations of spreadsheet content, automate export processes, or integrate spreadsheet data into web applications, REST APIs, or other systems where a structured JSON format is required, while noting that embedded images require separate asynchronous export methods for complete serialization.
</div>

#### Example - storing the spreadsheet to JSON

    <div id="spreadsheet"></div>
    <pre id="result"></pre>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                name: "Food Order",
                mergedCells: [
                    "A1:G1"
                ],
                rows: [{
                    height: 70,
                    cells: [{
                        value: "My Company", fontSize: 32, textAlign: "center"
                    }]
                }]
            }]
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        var data = spreadsheet.toJSON();
        var json = JSON.stringify(data, null, 2);

        $("#spreadsheet").remove();
        $("#result").text(json);
    </script>

#### Returns

`Object` - The serialized workbook.

### fromJSON

Loads the workbook data from an object with the format that is defined in the [configuration](#configuration).

> All existing sheets and their data will be lost.


<div class="meta-api-description">
How do I import a complete workbook into Kendo UI Spreadsheet using JSON data? Import or load a complete workbook from a structured JavaScript object by deserializing spreadsheet data, including sheets, cell values, formats, formulas, styles, and configuration settings to initialize or replace the current spreadsheet content programmatically. Enable restoring or setting up spreadsheet state from JSON-like data structures while ensuring previous sheets and their data are fully overwritten. Use this method to programmatically recreate or update workbooks, convert JSON representations into fully functional spreadsheets, or import external workbook configurations and content in one operation.
</div>

#### Parameters

##### data `Object`

The object from where data will be loaded. This has to be the deserialized object, not the JSON string.

#### Example - loading the spreadsheet from JSON

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.fromJSON({
            sheets: [{
                name: "Food Order",
                mergedCells: [
                    "A1:G1"
                ],
                rows: [{
                    height: 70,
                    cells: [{
                        value: "My Company", fontSize: 32, textAlign: "center"
                    }]
                }]
            }]
        });
    </script>

### defineName

Defines a custom name that will be available and used in formulas. If the function is not able to parse the name of the value, it will throw an error.

> If the name of the sheet consists of multiple words, separated by space, the sheet name should be wrapped in quotes `'Sheet Name With Space'!$A$1`.


<div class="meta-api-description">
How do I define custom named ranges in Kendo UI for jQuery Spreadsheet to improve formula readability? Configure custom named ranges and expressions for use in spreadsheet formulas by defining reusable variable names or aliases that can be referenced throughout your workbook, enabling easier management and consistent formula usage. This method supports creating and registering unique identifiers for specific cells, ranges, or calculated expressions, allowing you to set, control, or update named references programmatically while ensuring correct parsing and error handling for invalid names or values. Common scenarios include naming cell ranges, defining constants, or assigning formula components with descriptive labels that improve readability, simplify formula writing, and facilitate dynamic data connections across sheets, including handling sheet names with spaces through proper quoting.
</div>

#### Parameters

##### name `String`

A new name that will be defined. The names are case-insensitive. You can provide a name that already exists. In such cases, the value is silently updated. To make the name available only in one sheet, qualify it in the way demonstrated in the next example.

##### value `String`

The value has to be a valid formula in the form of a string, that is, without a leading `=` sign. Generally, a name points to a reference. For a maximum compatibility, use references here that are fully qualified (include the name of the sheet to which they refer) and absolute (prefix both row and column with the `$` sign).

##### hidden `Boolean` *(default: false)*

To hide this name from the custom-name drop-down in the toolbar, pass `true`. Even if `hidden` is set to `false`, only reference names will be displayed in the drop-down.

#### Example - defining a few names

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet();
        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        // cell reference
        spreadsheet.defineName("MyCell", "Sheet1!$A$1");

        // range reference
        spreadsheet.defineName("MyRange", "Sheet1!$A$1:$C$3");

        // qualified name
        spreadsheet.defineName("Sheet1!Foo", "Sheet1!$B$2");

        // relative reference (incompatible with other programs).
        // relative refs in A1 notation are ambiguous, unless we know
        // the cell where they are used, so we use the RC notation here:
        spreadsheet.defineName("CellsAbove", "R1C[0]:R[-1]C[0]");

        // arbitrary formula
        spreadsheet.defineName("GoldenRatio", "(1+SQRT(5))/2");
    </script>

After that, you can use any of those names in formulas. For example, a formula like `=SUM(CellsAbove)` will return the sum of the cells above it, no matter where it sits. Relative references, such as the `CellsAbove` example, are not compatible with other spreadsheets, such as Excel, LibreOffice, or Google Sheets. The "qualified" `Sheet1!Foo` name is visible without qualification only in formulas in the **Sheet1** and, for example, you can type `=Foo * Foo`.  If you need the name in formulas from other sheets, you have to refer to it as `=Sheet1!Foo`.

### undefineName

Deletes a name.


<div class="meta-api-description">
How do I programmatically remove named ranges in a Kendo UI Spreadsheet? Remove, delete, clear, or undefine named ranges, named formulas, or any named definitions within a workbook by controlling the clearing or removal of these named items from a spreadsheet's collection. Manage and manipulate named entries by eliminating previously set names, renaming, or unregistering named references used in formulas or ranges, enabling dynamic cleanup or modification of defined names across sheets. This functionality supports fixing name conflicts, updating data references, or resetting named elements by removing them programmatically or via configuration to maintain accurate and current named entities within a workbook environment.
</div>

#### Parameters

##### name `String` - the name to remove

To delete a fully qualified name, prefix the name of the sheet. For example, `spreadsheet.undefineName("Sheet1!Foo")`.

#### Example

    <div id="spreadsheet"></div>
    <script>
    var spreadsheet = $("#spreadsheet").kendoSpreadsheet().data("kendoSpreadsheet");
    
    // First define a name
    spreadsheet.defineName("MyRange", "A1:B2");
    
    // Later remove the name
    spreadsheet.undefineName("MyRange");
    console.log("Name removed");
    </script>

## Events

### insertSheet

Triggered when a sheet is inserted. Introduced in the 2017 Q1 release.


<div class="meta-api-description">
How do I trigger custom code when a new worksheet is added to a Kendo UI for jQuery spreadsheet? Trigger custom code or workflows when a new worksheet, tab, or sheet is created, added, or inserted into a spreadsheet, whether by user interaction or automation scripts, enabling automatic initialization of data, updating interfaces, logging events, or executing specific actions on sheet insertion events. This event captures real-time additions of sheets, supports monitoring dynamic spreadsheet structure changes, and allows running handlers triggered on new page or tab creation within spreadsheet applications.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked, the Spreadsheet will not insert the sheet.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        insertSheet: function(e) {
            console.log("Sheet is being inserted:", e.sheet);
        }
    });
    </script>

### removeSheet

Triggered when a sheet will be removed. Introduced in the 2017 Q1 release.


<div class="meta-api-description">
How to handle sheet removal in Kendo UI for jQuery Spreadsheet before it's deleted? Detect and handle the moment before a spreadsheet tab, worksheet, or sheet is deleted or removed, enabling responses such as executing cleanup routines, updating interfaces, intercepting or canceling removals, listening for delete or sheet removal events, accessing details on which sheet or tab is being removed, managing dynamic spreadsheet modifications, controlling sheet lifecycle events, triggering actions prior to sheet deletion, or hooking into pre-removal callbacks in spreadsheet components.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.sheet `kendo.spreadsheet.Sheet`

The sheet instance which will be removed.

##### e.preventDefault `Function`

If invoked, the Spreadsheet will not remove the sheet.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        removeSheet: function(e) {
            console.log("Sheet is being removed:", e.sheet.name());
            // e.preventDefault(); // Uncomment to prevent removal
        }
    });
    </script>

### renameSheet

Triggered when a sheet will be renamed. Introduced in the 2017 Q1 release.


<div class="meta-api-description">
How do I capture sheet renaming actions in Kendo UI for jQuery Spreadsheet widget? Capture and respond to sheet renaming actions in spreadsheets by detecting when a worksheet name changes, enabling you to track updates, validate new sheet titles, update interfaces dynamically, log renames, enforce naming rules, or trigger related events during the renaming process in real-time.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.sheet `kendo.spreadsheet.Sheet`

The sheet instance which will be renamed.

##### e.newSheetName `String`

The new sheet name.

##### e.preventDefault `Function`

If invoked, the Spreadsheet will not rename the sheet.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        renameSheet: function(e) {
            console.log("Sheet being renamed from", e.sheet.name(), "to", e.newSheetName);
            // e.preventDefault(); // Uncomment to prevent renaming
        }
    });
    </script>

### selectSheet

Triggered when a sheet will be activated. Introduced in the 2017 Q1 release.


<div class="meta-api-description">
How to trigger custom code when a specific sheet is selected in a Kendo UI Spreadsheet? Detect or handle the action of switching, selecting, or activating a specific worksheet or tab within a spreadsheet application to trigger custom code execution, update interface elements, prepare or validate data before the sheet becomes active, respond to user navigation between sheets, listen for sheet change events, and access event details such as the sheet’s identity and context to automate workflows or interface behavior in response to sheet selection or activation changes.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.sheet `kendo.spreadsheet.Sheet`

The sheet instance which will be activated.

##### e.preventDefault `Function`

If invoked, the Spreadsheet will not activate the sheet.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        selectSheet: function(e) {
            console.log("Sheet being selected:", e.sheet.name());
            // e.preventDefault(); // Uncomment to prevent selection
        }
    });
    </script>

### unhideColumn

Triggered when a column will be shown. Introduced in the 2017 Q1 release.


<div class="meta-api-description">
How can I use the Spreadsheet.unhideColumn event to update my interface when a hidden column is made visible again? Detect and handle events triggered just before a hidden spreadsheet column becomes visible to execute custom actions such as updating interfaces, modifying layout dynamically, loading or refreshing related data, controlling column visibility changes, responding to column unhide triggers, managing display adjustments, configuring spreadsheet behavior on column reveal, enabling pre-visibility logic, and integrating workflows that react to columns being shown again.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.sheet `kendo.spreadsheet.Sheet`

The sheet instance which will be affected.

##### e.index `Number`

The index of the column.

##### e.preventDefault `Function`

If invoked, the Spreadsheet will execute the change.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        unhideColumn: function(e) {
            console.log("Column", e.index, "is being unhidden in sheet", e.sheet.name());
        }
    });
    </script>

### unhideRow

Triggered when a row will be shown. Introduced in the 2017 Q1 release.


<div class="meta-api-description">
How can I detect when a hidden row in Kendo UI Spreadsheet becomes visible again? Detect when a hidden or collapsed row in a spreadsheet becomes visible again, trigger actions or scripts upon row unhide events, listen for changes in row visibility to update user interfaces or recalculate data dynamically, handle events related to rows being shown after being hidden, capture and respond to row unhide triggers for automation, monitor row visibility state transitions to enable responsive adjustments, enable event-driven code execution on row reveal, control or react to spreadsheet row display changes, and integrate workflows that require detection of previously hidden rows becoming accessible.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.sheet `kendo.spreadsheet.Sheet`

The sheet instance which will be affected.

##### e.index `Number`

The index of the row.

##### e.preventDefault `Function`

If invoked, the Spreadsheet will execute the change.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        unhideRow: function(e) {
            console.log("Row", e.index, "is being unhidden in sheet", e.sheet.name());
        }
    });
    </script>

### hideColumn

Triggered when a column will be hidden. Introduced in the 2017 Q1 release.


<div class="meta-api-description">
How can I prevent a specific column from being hidden in my Kendo UI Spreadsheet widget? Detect and respond to actions triggered just before a spreadsheet column is hidden, enabling developers to execute custom code or logic prior to the column's concealment. This event supports intercepting hide operations to inspect parameters, perform validations, update the interface dynamically, cancel or modify the hiding process, and manage data consistency or cleanup tasks. Ideal for integrating pre-hide behaviors, conditional hiding rules, user confirmation prompts, or syncing related components when columns are set to be concealed in spreadsheet applications.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.sheet `kendo.spreadsheet.Sheet`

The sheet instance which will be affected.

##### e.index `Number`

The index of the column.

##### e.preventDefault `Function`

If invoked, the Spreadsheet will execute the change.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        hideColumn: function(e) {
            console.log("Column", e.index, "is being hidden in sheet", e.sheet.name());
        }
    });
    </script>

### hideRow

Triggered when a row will be hidden. Introduced in the 2017 Q1 release.


<div class="meta-api-description">
How do I prevent rows from being hidden in a Kendo UI Spreadsheet? Detect and respond to the action of a row being hidden in a spreadsheet by configuring event listeners or handlers that trigger before a row becomes invisible. Enable pre-hide validation, capture which specific row is targeted for hiding, update user interfaces dynamically, save application state related to hidden rows, or run custom logic tied to row visibility changes. This event-driven mechanism supports monitoring, controlling, or extending spreadsheet behavior when users or code hide rows, facilitating seamless integration with workflows involving row visibility, conditional hiding, or UI refresh triggers on row hide actions.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.sheet `kendo.spreadsheet.Sheet`

The sheet instance which will be affected.

##### e.index `Number`

The index of the row.

##### e.preventDefault `Function`

If invoked, the Spreadsheet will execute the change.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        hideRow: function(e) {
            console.log("Row", e.index, "is being hidden in sheet", e.sheet.name());
        }
    });
    </script>

### deleteColumn

Triggered when a column will be deleted. Introduced in the 2017 Q1 release.


<div class="meta-api-description">
How can I prevent users from deleting specific columns in a Kendo UI Spreadsheet? Listen for column removal events to intercept or respond when a user attempts to delete a column in a spreadsheet, enabling you to validate actions, update dependent data, adjust or refresh the user interface, log deletion activities, prevent unintended column deletions, handle event-driven workflows, enforce business rules, trigger custom functions before columns are removed, and control spreadsheet modifications in real time.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.sheet `kendo.spreadsheet.Sheet`

The sheet instance which will be affected.

##### e.index `Number`

The index of the column.

##### e.preventDefault `Function`

If invoked, the Spreadsheet will execute the change.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        deleteColumn: function(e) {
            console.log("Column", e.index, "is being deleted from sheet", e.sheet.name());
        }
    });
    </script>

### deleteRow

Triggered when a row will be deleted. Introduced in the 2017 Q1 release.


<div class="meta-api-description">
How to handle row deletion in Kendo UI Spreadsheet before it's removed? Capture and respond to pending spreadsheet row removals by detecting when a row deletion is initiated, enabling pre-deletion logic such as validating which row and sheet are affected, updating related data or user interface elements, logging or auditing changes before the row disappears, performing cleanup tasks, intercepting or cancelling unwanted deletions, and integrating custom workflows triggered by the imminent removal of spreadsheet rows.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.sheet `kendo.spreadsheet.Sheet`

The sheet instance which will be affected.

##### e.index `Number`

The index of the row.

##### e.preventDefault `Function`

If invoked, the Spreadsheet will execute the change.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        deleteRow: function(e) {
            console.log("Row", e.index, "is being deleted from sheet", e.sheet.name());
        }
    });
    </script>

### insertColumn

Triggered when a column will be inserted. Introduced in the 2017 Q1 release.


<div class="meta-api-description">
How to intercept column insertion in Kendo UI Spreadsheet widget? Capture and handle events triggered immediately before a new column is inserted into a spreadsheet to execute custom logic, validate or modify insertion parameters, update user interface or application state dynamically, respond to column addition attempts, intercept and control column insertion actions, listen for and react to pending column insert events, hook into column insertion workflow for preprocessing or conditional checks, enable custom behaviors when columns are about to be added, monitor or override default column insertions, and manage spreadsheet structure changes programmatically just before they occur.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.sheet `kendo.spreadsheet.Sheet`

The sheet instance which will be affected.

##### e.index `Number`

The index of the column.

##### e.preventDefault `Function`

If invoked, the Spreadsheet will execute the change.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        insertColumn: function(e) {
            console.log("Column being inserted at index", e.index, "in sheet", e.sheet.name());
        }
    });
    </script>

### insertRow

Triggered when a row will be inserted. Introduced in the 2017 Q1 release.


<div class="meta-api-description">
How do I prevent default insertion of new rows in a Kendo UI Spreadsheet? Detect, handle, or customize actions triggered just before a new row is added in a spreadsheet environment, enabling developers to respond to row insertion events by validating incoming data, modifying adjacent cells, preventing default insertions, or synchronizing application state prior to the actual row addition. Capture or intercept row insert triggers to implement pre-insertion logic, event listeners, or callbacks that monitor and control the addition process in real time, supporting workflows that require dynamic adjustments or checks before altering spreadsheet structure.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.sheet `kendo.spreadsheet.Sheet`

The sheet instance which will be affected.

##### e.index `Number`

The index of the row.

##### e.preventDefault `Function`

If invoked, the Spreadsheet will execute the change.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        insertRow: function(e) {
            console.log("Row being inserted at index", e.index, "in sheet", e.sheet.name());
        }
    });
    </script>

### select

Triggered when the Spreadsheet selection is changed. Introduced in the 2017 Q1 release.


<div class="meta-api-description">
How do I detect changes to selections in a Kendo UI Spreadsheet? Detect changes to selected cells, ranges, or active cells in a spreadsheet when users highlight, click, or modify selections, enabling synchronization of selection state, UI updates, validation checks, or external state management in response to selection shifts, with event data providing comprehensive details about the current highlighted area, chosen cells, or selected ranges.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.range `kendo.spreadsheet.Range`

The [`Range`](/api/javascript/spreadsheet/range) that is selected.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        select: function(e) {
            console.log("Selection changed to:", e.range.ref());
        }
    });
    </script>

### changeFormat

Triggered when the range format is changed from the UI. Introduced in the 2017 Q1 release.


<div class="meta-api-description">
How do I detect when users change font styles in a Kendo UI spreadsheet? Detect modifications to cell or range formatting within spreadsheets, capturing events triggered by user actions like applying styles, changing fonts, colors, borders, or number formats through the interface. Enable monitoring or responding to format updates in spreadsheet components for purposes such as saving changes, updating dependent views, applying validation rules, enforcing design consistency, or triggering automation workflows when users adjust formatting properties interactively. This event supports detection of formatting alterations from UI interactions, versatile for scenarios involving dynamic style control, change tracking, or custom formatting logic in spreadsheet applications.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.range `kendo.spreadsheet.Range`

The [`Range`](/api/javascript/spreadsheet/range) whose format is changed.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        changeFormat: function(e) {
            console.log("Format changed for range:", e.range.ref());
        }
    });
    </script>

### changing

Triggered when a value or validation in the Spreadsheet is about to be changed upon user interaction.


<div class="meta-api-description">
How can I detect changes made by users in my Kendo UI for jQuery spreadsheet before they are finalized? Detect and handle user edits in a spreadsheet before they are finalized by capturing changes to cell values or validations triggered through interaction, enabling inspection, validation, modification, or cancellation of pending updates to cells, with the ability to review affected ranges, adjust input dynamically, enforce rules, apply custom logic, update interface elements, or synchronize data models prior to committing the new data in real time.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.range `kendo.spreadsheet.Range`

The [Range](/api/javascript/spreadsheet/range) which values are about to be changed in the spreadsheet.

##### e.changeType `String`

The type of command that triggered the changing event. The possible types are:
* `autoFill` - when the user uses the Spreadsheet AutoFill functionality.
* `clear` - when the user clears content by selecting a cell / range and pressing Delete or Backspace keys.
* `cut` - when the user cuts a range from the Spreadsheet.
* `edit` - when the user types in a cell.
* `paste` - when the user pastes some data in a range.
* `validation` - when the user alters validation for a cell or range of cells.

##### e.data `Object`

The new value(s) that is(are) about to be applied to the range. Depending on the changeType the data parameter will be the following:
* `autoFill` - the data will be an `Array` of `Arrays` holding all properties for the cells (including the values) that are about to be changed.
* `clear` - the data will be an `Array` of `Arrays` holding null values.
* `cut` - the data will be an `Array` of `Arrays` holding empty objects.
* `edit` - the data will be a `String`.
* `paste` - the data will be an `Array` of `Arrays` holding all properties for the cells (including the values) that are about to be changed.
* `validation` - the data will hold the new `validation Object`.

##### e.preventDefault `Function`

If invoked the changing will not be performed and no changes will be applied to the sheet.

#### Example - subscribe to the "changing" event during initialization

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [
              { value: "First"},
              { value: "Second"},
              { value: "Third"}
            ]
          }]
        }],
        changing: function(e){
        		console.log("The netered value is: " + e.data)
        }
      });
    </script>

#### Example - subscribe to the "changing" event after initialization

    <div id="spreadsheet"></div>
    <script>
      function spread_changing(e){
        console.log("The netered value is: " + e.data)
      }
      $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
          rows: [{
            cells: [
              { value: "First"},
              { value: "Second"},
              { value: "Third"}
            ]
          }]
        }]
      });

      var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
      spreadsheet.bind("changing", spread_changing);
    </script>

### change

Triggered when a value in the Spreadsheet has been changed. Introduced in the 2016.Q1.SP1 release.


<div class="meta-api-description">
How to detect cell edits in Kendo UI for jQuery Spreadsheet? Detect and handle spreadsheet modifications or cell edits by capturing change events triggered when users update values, enabling monitoring of individual cell changes, ranges, or sheet recalculations. Configure listeners to respond to data input alterations, validate user entries, update application state dynamically, persist changes, or refresh calculations automatically after edits occur. Support reactive interaction designs by intercepting all spreadsheet value updates, enabling real-time processing of cell-level or bulk changes for maintaining data consistency, enforcing validations, or triggering dependent updates within spreadsheets.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.range `kendo.spreadsheet.Range`

The [`Range`](/api/javascript/spreadsheet/range) that triggered the change.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        change: function(e) {
            console.log("Value changed in range:", e.range.ref());
        }
    });
    </script>

### render

Triggered after the widget has completed rendering. The event will also fire when a cell is selected or when the Spreadsheet's tools (bold, italic) are used, as the target element is re-generated with new styles (e.g background-color, box-shadow, font-weight, etc.).


<div class="meta-api-description">
How to trigger custom code after Kendo UI Spreadsheet finishes rendering? Handle or trigger custom code, callbacks, or logic immediately after the spreadsheet finishes rendering or updates the user interface, including when cells are selected, styles like bold or italic are applied, or any visual elements such as background colors or fonts are re-rendered; capture these post-render moments to run scripts that refresh UI components, rebind events, perform DOM manipulations, apply dynamic updates, or execute custom post-processing after every visual change or re-creation of spreadsheet elements.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        render: function(e) {
            console.log("Spreadsheet rendered");
        }
    });
    </script>

### excelExport

Fires when the user clicks the **Export to Excel** toolbar button.


<div class="meta-api-description">
How to intercept excel export commands in Kendo UI for jQuery Spreadsheet widget? Capture and respond to user actions initiating Excel file exports from a spreadsheet interface, intercepting export commands to validate or transform data, perform custom pre-export or post-export processing, trigger programmatic downloads, display confirmation dialogs, customize export workflows, automate data preparation, or integrate with external systems handling Excel output generation.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.data `Array`

The array of data items that is used to create the Excel workbook.

##### e.workbook `kendo.ooxml.Workbook`

The Excel [workbook configuration object](/api/javascript/ooxml/workbook#configuration). Used to initialize a `kendo.ooxml.Workbook` class. Modifications of the workbook will reflect in the output Excel document.

##### e.preventDefault `Function`

If invoked, the Spreadsheet will not save the generated file.

#### Example - subscribing to the excelExport event during initialization

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                name: "Food Order",
                mergedCells: [
                    "A1:G1"
                ],
                rows: [{
                    height: 70,
                    cells: [{
                        value: "My Company", fontSize: 32, textAlign: "center"
                    }]
                }],
            }],
            excelExport: function(e) {
            e.workbook.fileName = "Spreadsheet1.xlsx";
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsExcel();
    </script>

#### Example - subscribing to the excelExport event after initialization

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                name: "Food Order",
                mergedCells: [
                    "A1:G1"
                ],
                rows: [{
                    height: 70,
                    cells: [{
                        value: "My Company", fontSize: 32, textAlign: "center"
                    }]
                }],
            }]
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.bind("excelExport", function(e) {
            e.workbook.fileName = "Spreadsheet1.xlsx";
        });

        spreadsheet.saveAsExcel();
    </script>

### excelImport

Fired when the user imports a file after selecting it from the window prompt. The event is fired before the file importing has finished.


<div class="meta-api-description">
How to handle Excel file imports in Kendo UI for jQuery Spreadsheet widget? Capture and handle events triggered when users select or upload Excel files for import, enabling immediate access to file data before processing completes; configure event listeners to inspect, validate, or manipulate spreadsheet content right after file selection but prior to full import, supporting scenarios like pre-import checks, data previews, input validation, intercepting file uploads, and preparing or transforming Excel sheet data dynamically upon user file input.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.file `Blob|File`

The file that is being imported.

##### e.preventDefault `Function`

If invoked, the Spreadsheet will not import the file.

##### e.promise `Promise`

A promise that will be resolved when the import operation completes.

The [progress handler](https://api.jquery.com/deferred.progress/) of the promise will be called periodically with the following arguments:
* `sheet` - The current sheet. An instance of [`kendo.spreadsheet.Sheet`](/api/javascript/spreadsheet/sheet).
* `progress` - A number if the range is from `0` to `1` which indicates the progress of the current import operation.

#### Example - monitoring the progress of an import operation

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            excelImport: function(e) {
                e.promise
                .progress(function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                    console.log(kendo.format("{0:P} complete", e.progress));
                })
                .done(function() {
                    alert("Export completed!");
                });
            }
        });

        // Click the Open command and select a file to import
    </script>

### pdfExport

Fired when the user initiates the export to PDF.


<div class="meta-api-description">
How can I detect when PDF export begins in Kendo UI Spreadsheet? Capture the moment when exporting spreadsheet data to PDF begins, enabling detection of export initiation to trigger custom logic, run pre-export validations or adjustments, gather and modify export options, present user confirmations or progress feedback, and handle asynchronous tasks or preparations before the PDF generation starts. This event hooks into the start of PDF export processes, allowing developers to monitor, control, or extend the export workflow, respond to user actions, configure export parameters dynamically, and integrate with UI notifications or backend operations tied to PDF conversion from spreadsheet content.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked, the Spreadsheet will not save the generated file.

##### e.promise `Promise`

A promise that will be resolved when the export completes.

#### Example - monitoring the export progress

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets: [{
                rows: [{
                    cells: [{ value: "A" }, { value: "B" }, { value: "C" }]
                }, {
                    cells: [{ value: "1" }, { value: "2" }, { value: "3" }]
                }, {
                    cells: [{ value: "4" }, { value: "5" }, { value: "6" }]
                }]
            }],
            pdfExport: function(e) {
                e.promise.done(function() {
                    /* The result can be observed in the DevTools(F12) console of the browser. */
                    console.log("Export completed!");
                });
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>

### copy

Fired when a range of a sheet is about to be copied.


<div class="meta-api-description">
How can I intercept copy commands on selected ranges in a Kendo UI Spreadsheet? capture and handle sheet or cell data before copying, intercept copy commands on selected ranges in spreadsheets, monitor and validate copy actions, respond to copy events to run custom code or UI changes, detect cell coordinates and range selections during copy, control or modify copy behavior in spreadsheet components, trigger functions before clipboard operations in sheets, access and process copied content details programmatically, enforce validation or restrictions on copy, enable developers to hook into copy workflows for data processing or interface updates
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.range `kendo.spreadsheet.Range`

The [Range](/api/javascript/spreadsheet/range) that is selected and about to be copied.

##### e.preventDefault `Function`

If invoked the range data will not be retained in the clipboard.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        copy: function(e) {
            console.log("Copying range:", e.range.ref());
        }
    });
    </script>

### cut

Fired when a range of a sheet is about to be cut.


<div class="meta-api-description">
How to handle cut operation events in Kendo UI for jQuery Spreadsheet? Trigger actions or handle logic when a user initiates a cut operation on a spreadsheet selection, capturing events before the data is removed; this enables detecting and responding to cut commands to prepare or save data, update user interfaces, coordinate clipboard behavior, synchronize with back-end systems, intercept or modify cut actions, and manage application state changes related to removing cell ranges or selections.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.range `kendo.spreadsheet.Range`

The [Range](/api/javascript/spreadsheet/range) that is selected and about to be cut.

##### e.preventDefault `Function`

If invoked the range will not be cut and it will not be passed to the clipboard.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        cut: function(e) {
            console.log("Cutting range:", e.range.ref());
        }
    });
    </script>

### paste

Fired when a data is about to be pasted in a sheet.


<div class="meta-api-description">
How can I customize the paste action in Kendo UI Spreadsheet? Intercept clipboard paste actions in spreadsheet cells before data insertion, capturing incoming content and context to validate, transform, or modify pasted values dynamically. Enable handling of paste events to inspect clipboard data, control data flow, customize cell input, prevent unwanted content, apply real-time validation rules, trigger UI updates, or adjust values prior to final rendering, supporting scenarios like data sanitization, conditional pasting, or enhanced user interactions around pasting operations in tabular data environments.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.range `kendo.spreadsheet.Range`

The [Range](/api/javascript/spreadsheet/range) that is currently selected in the spreadsheet. The actual selection will change according to the pasted range / values.

##### e.clipboardContent `Object`

The content that has been passed from the clipboard to the paste command. This data allows you to prevent the default execution of the paste functionality, manipulate the data and paste it properly in the widget content area.

#### Example - paste only values in the Spreadsheet

    <div id="example">
        <div id="spreadsheet"></div>
    </div>

    <script>
        $("#spreadsheet").kendoSpreadsheet({
            sheets:[{
                name: 'test',
                rows: [{
                    cells: [{
                        value: 12.39,
                        format: "$#,##0.00",
                        background: "rgb(255,255,255)",
                        color: "rgb(0,62,117)"
                    }]
                }]
            }],
            paste: function(e) {
                e.preventDefault()

                var currentRange = e.range;
                var fullData = e.clipboardContent.data;
                var mergedCells = e.clipboardContent.mergedCells;
                var topLeft = currentRange.topLeft();
                var initialRow = topLeft.row;
                var initialCol = topLeft.col;
                var origRef = e.clipboardContent.origRef;
                var numberOfRows = origRef.bottomRight.row - origRef.topLeft.row + 1;
                var numberOfCols = origRef.bottomRight.col - origRef.topLeft.col + 1;
                var spread = e.sender;
                var sheet = spread.activeSheet();
                var rangeToPaste =  sheet.range(initialRow, initialCol, numberOfRows, numberOfCols);

                sheet.batch(function() {
                    for(var i = 0; i < fullData.length; i += 1) {
                        var currentFullData = fullData[i];

                        for(var j = 0; j < currentFullData.length; j += 1 ) {
                            var range = sheet.range(initialRow + i, initialCol + j);
                            var value = currentFullData[j].value;

                            if (value !== null) {
                                range.input(value);
                                range.format(null);
                            }
                        }
                    }
                });

                sheet.select(rangeToPaste);

                for(var i = 0; i < mergedCells.length; i += 1) {
                    var initialMergedRange = sheet.range(mergedCells[i]);
                    var mergeTopLeft = initialMergedRange.topLeft();
                    var mergeInitialRow = mergeTopLeft.row + initialRow;
                    var mergedInitialCol = mergeTopLeft.col + initialCol;
                    var mergedNumberOfRows = initialMergedRange.values.length;
                    var mergedNumberOfCols = initialMergedRange.values()[0].length;

                    sheet.range(mergeInitialRow, mergedInitialCol, mergedNumberOfRows, mergedNumberOfCols).merge();
                }
            }
        });
    </script>

##### e.preventDefault `Function`

If invoked the paste will not be performed and no new data / formatting will be populate on the sheet.

### dataBinding

Fired when the data retrieved from a DataSource is about to be bound to a sheet. Available only if DataSource has been defined for at least one sheet.


<div class="meta-api-description">
How can I intercept data before it populates a spreadsheet sheet in Kendo UI for jQuery? Handle events triggered before data from any connected data source populates a spreadsheet sheet, intercepting the loading or binding process to inspect, modify, filter, or cancel the incoming records prior to rendering. Enable custom reactions, validation, transformation, or asynchronous operations during data retrieval and binding workflows for sheets linked to external or defined data sources. Capture changes, control data injection, or hook into the lifecycle of data loading in spreadsheet applications or grid components supporting dynamic data population from various sources.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.sheet `kendo.spreadsheet.Sheet`

The sheet that is about to be populated with the DataSource data.

##### e.preventDefault `Function`

If invoked the spreadsheet will not be populated with the data from its DataSource.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        dataBinding: function(e) {
            console.log("Data binding to sheet:", e.sheet.name());
        }
    });
    </script>

### dataBound

Fired when the data from a DataSource is already populated in a sheet. Available only if DataSource has been defined for at least one sheet.


<div class="meta-api-description">
What event triggers when data is fully loaded in Kendo UI Spreadsheet? Detect when spreadsheet data loading or data source population completes by capturing events that signal the sheet has finished binding or refreshing data, enabling triggering of UI updates, conditional formatting, recalculations, or custom logic after data is fully loaded into the grid; useful for monitoring data source synchronization, loading states, or applying changes post data integration when at least one sheet contains external or internal data sources.
</div>

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.sheet `kendo.spreadsheet.Sheet`

The sheet that has been populated with the DataSource data.

#### Example

    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        dataBound: function(e) {
            console.log("Data bound to sheet:", e.sheet.name());
        }
    });
    </script>
