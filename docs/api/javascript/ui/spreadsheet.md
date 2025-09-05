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

#### Example - setting the default columns' width

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        columnWidth: 150,
      });
    </script>

### columns `Number` *(default: 50)*

The number of columns in the document.

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        columns: 100
      });
    </script>

### defaultCellStyle `Object`

The default cell styles that will be applied to the sheet cells.

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

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        headerHeight: 40
      });
    </script>

### headerWidth `Number` *(default: 32)*

The width of the header column in pixels.

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        headerWidth: 50
      });
    </script>

### excel `Object`

Configures the Excel export settings of the Spreadsheet.

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

#### Example

    <div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        rowHeight: 40
      });
    </script>

### rows `Number` *(default: 200)*

The number of rows in the document.

#### Example - configure the rows count

    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            rows: 300
        });
    </script>

### sheets `Array`

An array which defins the document sheets and their content.

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
