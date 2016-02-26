---
title: Spreadsheet
page_title: Configuration, methods and events of Kendo UI Spreadsheet
description: Code examples for Spreadsheet UI widget configuration. Learn how to use methods and which events to set once the Spreadsheet UI widget is initialized.
---

# kendo.ui.Spreadsheet
Represents the Kendo UI Spreadsheet widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### activeSheet `String`
The name of the currently active sheet.

Must match one of the (sheet names)[#configuration-sheets.name] exactly.

### columnWidth `Number` *(default: 64)*
The default column width in pixels.

### columns `Number` *(default: 50)*
The number of columns in the document.

### headerHeight `Number` *(default: 20)*
The height of the header row in pixels.

### headerWidth `Number` *(default: 32)*
The width of the header column in pixels.

### excel `Object`

Configures the Kendo UI Spreadsheet Excel export settings.

### excel.fileName `String` *(default: "Spreasheet.xslx")*

Specifies the file name of the exported Excel file.

#### Example - set the default Excel file name
```
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
```

### excel.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](#configuration-excel.proxyURL) even if the browser supports saving files locally.

### excel.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user.

A proxy will be used when the browser isn't capable of saving files locally.
Such browsers are IE version 9 and lower and Safari.

The developer is responsible for implementing the server-side proxy.

The proxy will receive a POST request with the following parameters in the request body:

* contentType: The MIME type of the file
* base64: The base-64 encoded file content
* fileName: The file name, as requested by the caller.

The proxy should return the decoded file with the "Content-Disposition" header set to
`attachment; filename="<fileName.xslx>"`.

#### Example - set the server proxy URL
```
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
```

### pdf `Object`

Configures the Kendo UI Spreadsheet PDF export settings.

### pdf.area `String`
The area to export. Possible values:

* "workbook": Exports the full workbook, including all sheets.
* "sheet": Exports the active sheet.
* "selection": Exports the selected area on the active sheet.

#### Example - set export area
```
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
```

### pdf.author `String` *(default: null)*

The author of the PDF document.

#### Example - set the author
```
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
```

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.

#### Example - set the creator
```
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
```

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.

#### Example - set the date
```
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
```

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.

#### Example - set the default PDF file name
```
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
```

### pdf.fitWidth `Boolean` *(default: false)*
An option indicating whether to fit the spreadsheet content to page width.

#### Example - fit spreadsheet to page width
```
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
```

### pdf.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](#configuration-pdf.proxyURL) even if the browser supports saving files locally.

### pdf.guidelines `Boolean` *(default: false)*
An option indicating whether to export the cell guidelines.

#### Example - disable guidelines
```
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
```

### pdf.hCenter `Boolean` *(default: false)*
An option indicating whether to center the content horizontally.

See also [vCenter](#configuration-pdf.vCenter).

#### Example - center content horizontally
```
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
```

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.

#### Example - set the keywords
```
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
```

### pdf.landscape `Boolean` *(default: true)*

Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.

#### Example - set portrait mode
```
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
```

### pdf.margin `Object`

Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).

#### Example - set the margins
```
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
```

### pdf.margin.bottom `Number|String` *(default: 0)*

The bottom margin. Numbers are considered as "pt" units.

### pdf.margin.left `Number|String` *(default: 0)*

The left margin. Numbers are considered as "pt" units.

### pdf.margin.right `Number|String` *(default: 0)*

The right margin. Numbers are considered as "pt" units.

### pdf.margin.top `Number|String` *(default: 0)*

The top margin. Numbers are considered as "pt" units.

### pdf.paperSize `String|Array` *(default: "auto")*

Specifies the paper size of the PDF document.
The default "auto" means paper size is determined by content.

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

Supported values:

* A predefined size: "A4", "A3" etc
* An array of two numbers specifying the width and height in points (1pt = 1/72in)
* An array of two strings specifying the width and height in units.
  Supported units are "mm", "cm", "in" and "pt".

#### Example - set custom paper size
```
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
```

### pdf.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user.

A proxy will be used when the browser isn't capable of saving files locally e.g. Internet Explorer 9 and Safari. PDF export is not supported in Internet Explorer 8 and below.

The developer is responsible for implementing the server-side proxy.

The proxy will receive a POST request with the following parameters in the request body:

* contentType: The MIME type of the file
* base64: The base-64 encoded file content
* fileName: The file name, as requested by the caller.

The proxy should return the decoded file with the "Content-Disposition" header set to
`attachment; filename="<fileName.pdf>"`.

#### Example - set the server proxy URL
```
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
```

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

If you want to display the document in a new window or iframe,
the proxy should set the "Content-Disposition" header to `inline; filename="<fileName.pdf>"`.

#### Example - open the generated document in a new window
```
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
```

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.

#### Example - set the subject
```
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
```

### pdf.title `String` *(default: null)*

Sets the title of the PDF file.

#### Example - set the title
```
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
```

### pdf.vCenter `Boolean` *(default: false)*
An option indicating whether to center the content vertically.

See also [hCenter](#configuration-pdf.hCenter).

#### Example - center content vertically
```
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
```

### rowHeight `Number` *(default: 20)*
The default row height in pixels.

### rows `Number` *(default: 200)*
The number of rows in the document.

### sheets `Array`
An array defining the document sheets and their content.

### sheets.activeCell `String`
The active cell in the sheet, e.g. "A1".

### sheets.name `String`
The name of the sheet.

### sheets.columns `Array`
An array defining the columns in this sheet and their content.

### sheets.columns.index `Number`
The zero-based index of the column. Required to ensure correct positioning.

### sheets.columns.width `Number`
The width of the column in pixels. Defaults to [columnWidth](#configuration-columnWidth).

### sheets.dataSource `kendo.data.DataSource`
The data source instance for this sheet.

See [Bind to Data Source](/web/spreadsheet/import-and-export-data/bind-to-data-source).

### sheets.filter `Object`
Defines the filtering criteria for this sheet, if any.

### sheets.filter.columns `Array`
An array defining the filter configuration of individual columns.

### sheets.filter.columns.criteria `Array`
An array of filter criteria for custom filters.

### sheets.filter.columns.criteria.operator `String`
The criterion operator type.

Supported types vary based on the inferred column data type (inferred):
* Text
    * contains - the text contains the value
    * doesnotcontain - text does not contain the value
    * startswith - text starts with the value
    * endswith - text ends with the value
* Date
    * eq -  date is the same as the value
    * neq - date is not the same as the value
    * lt -  date is before the value
    * gt -  date is after the value
* Number
    * eq - is equal to the value
    * neq - is not equal to the value
    * gte - is greater than or equal to the value
    * gt - is greater than the value
    * lte - is less than or equal to the value
    * lt - is less than the value

### sheets.filter.columns.criteria.value `String`
The value for the criteria operator.

### sheets.filter.columns.filter `String`
The filter to apply to this column.

The supported filters are:
  * value - filters based on unique values
  * custom - applies custom filtering criteria
  * top - filters the top or bottom records
  * dynamic - filters based on dynamic criteria

### sheets.filter.columns.index `Number`
The index of the column **relative to** the [filter range](#configuration-sheets.filter.ref).

### sheets.filter.columns.logic `String`
The logical operator to apply to [filter criteria](#configuration-sheets.filter.columns.criteria).

Possible values are `and`, `or`.

### sheets.filter.columns.type `String`
The filter sub-type, if any.

Applicable types according to the [main filter](#configuration-sheets.filter.columns.filter).
* top
    * topNumber
    * topPercent
    * bottomNumber
    * bottomPercent
* dynamic
    * aboveAverage
    * belowAverage
    * tomorrow
    * today
    * yesterday
    * nextWeek
    * thisWeek
    * lastWeek
    * nextMonth
    * thisMonth
    * lastMonth
    * nextQuarter
    * thisQuarter
    * lastQuarter
    * nextYear
    * thisYear
    * lastYear
    * yearToDate

### sheets.filter.columns.value `Number|String|Date`
The filter value for filters that require a single value, e.g. "top".

### sheets.filter.columns.values `Array`
The filter values for filters that support multiple values.

### sheets.filter.ref `String`
The active range for the filter, e.g. "B1:D8".

### sheets.frozenColumns `Number`
The number of frozen columns in this sheet.

### sheets.frozenRows `Number`
The number of frozen rows in this sheet.

### sheets.mergedCells `Array`
An array of merged cell ranges, e.g. "B1:D2".

### sheets.rows `Array`
The row data for this sheet.

### sheets.rows.cells `Array`
The cells for this row.

### sheets.rows.cells.background `String`
The background color of the cell.

Many standard CSS formats are supported, but the canonical form is "#ccff00".

### sheets.rows.cells.borderBottom `Object`
The style information for the bottom border of the cell.

### sheets.rows.cells.borderBottom.color `String`
The bottom border color of the cell.

Many standard CSS formats are supported, but the canonical form is "#ccff00".

### sheets.rows.cells.borderBottom.size `String`
The width of the border in pixels.

### sheets.rows.cells.borderLeft `Object`
The style information for the left border of the cell.

### sheets.rows.cells.borderLeft.color `String`
The left border color of the cell.

Many standard CSS formats are supported, but the canonical form is "#ccff00".

### sheets.rows.cells.borderLeft.size `String`
The width of the border in pixels.

### sheets.rows.cells.borderTop `Object`
The style information for the top border of the cell.

### sheets.rows.cells.borderTop.color `String`
The top border color of the cell.

Many standard CSS formats are supported, but the canonical form is "#ccff00".

### sheets.rows.cells.borderTop.size `String`
The width of the border in pixels.

### sheets.rows.cells.borderRight `Object`
The style information for the right border of the cell.

### sheets.rows.cells.borderRight.color `String`
The right border color of the cell.

Many standard CSS formats are supported, but the canonical form is "#ccff00".

### sheets.rows.cells.borderRight.size `String`
The width of the border in pixels.

### sheets.rows.cells.color `String`
The font color of the cell.

Many standard CSS formats are supported, but the canonical form is "#ccff00".

### sheets.rows.cells.fontFamily `String`
The font family for the cell.

### sheets.rows.cells.fontSize `Number`
The font size of the cell in pixels.

### sheets.rows.cells.italic `Boolean`
Sets the cell font to italic, if set to `true`.

### sheets.rows.cells.bold `Boolean`
Sets the cell font to bold, if set to `true`.

### sheets.rows.cells.enable `Boolean`
Disables the cell, if set to `false`.

### sheets.rows.cells.format `String`
The format of the cell text.

See [Create or delete a custom number format on MS Office](https://support.office.com/en-au/article/Create-or-delete-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4).

### sheets.rows.cells.formula `String`
The cell formula **without the leading equals** sign, e.g. `A1 * 10`.

### sheets.rows.cells.index `Number`
The zero-based index of the cell. Required to ensure correct positioning.

### sheets.rows.cells.textAlign `String`
The text align setting for the cell content.

Available options are:
* left
* center
* right
* justify

### sheets.rows.cells.underline `Boolean`
Sets the cell font to underline, if set to `true`.

### sheets.rows.cells.value `Number|String|Boolean|Date`
The cell value.

### sheets.rows.cells.validation `Object`
The validation rule applied to the cell.

#### Initialize Spreadsheet with validation data, using `sheets.rows` configuration option
```
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
```

### sheets.rows.cells.validation.type `String`
Defines the validation type. The acceptable options are *reject* or *warning*

### sheets.rows.cells.validation.comparerType `String`
Defines the comparer type used to validate the cell value, e.g. "greaterThan", "between" and etc.

### sheets.rows.cells.validation.dataType `String`
Defines the data type of the cell value.

### sheets.rows.cells.validation.from `String`
Defines a *formula* or *value* used for the comparison process. Used as *only* if comparer type does not require second argument.

### sheets.rows.cells.validation.to `String`
Defines a *formula* or *value* used for the comparison process. Will be used if comparer type requies second argument.

### sheets.rows.cells.validation.allowNulls `Boolean`
Specifies whether to allow nulls.

### sheets.rows.cells.validation.messageTemplate `String`
Defines the *hint* message that will be displayed if value is invalid.

### sheets.rows.cells.validation.titleTemplate `String`
Defines the *hint* title that will be displayed if value is invalid.

### sheets.rows.cells.verticalAlign `String`
The vertical align setting for the cell content.

Available options are:
* left
* center
* right
* justify

### sheets.rows.cells.wrap `Boolean`
Will wrap the cell content if set to `true`.

### sheets.rows.height `Number`
The row height in pixels. Defaults to [rowHeight](#configuration-rowHeight).

### sheets.rows.index `Number`
The absolute row index. Required to ensure correct positioning.

### sheets.selection `String`
The selected range in the sheet, e.g. "A1:B10".

### sheets.sort `Object`
Defines the sort criteria for the sheet.

### sheets.sort.columns `Array`
Specifies the sort options for individual columns.

### sheets.sort.columns.ascending `Boolean`
Indicates if the data in the cell should be sorted ascending (`true`) or descending or (`false`).

### sheets.sort.columns.index `Number`
The index of the column **within the sheet**.

For example, column C will have index 2.

### sheets.sort.ref `String`
The sorted range, e.g. "A1:D5".

### sheetsbar `Boolean` *(default: true)*
A boolean value indicating if the sheetsbar should be displayed.

### toolbar `Boolean|Object` *(default: true)*
A boolean value indicating if the toolbar should be displayed.

### toolbar.home `Boolean|Array` *(default: true)*
A boolean value indicating if the "home" tab should be displayed or a collection of tools that will be shown in the "home" tab.

The available tools are:

* **open**
* **exportAs**
* [**cut**, **copy**, **paste**]
* [**bold**, **italic**, **underline**]
* **backgroundColor**, **textColor**
* **borders**
* **fontSize**, **fontFamily**
* **alignment**
* **textWrap**
* [**formatDecreaseDecimal**, **formatIncreateDecimal**]
* **format**
* **merge**
* **freeze**
* **filter**

Those tools which are part of a tool group are defined as array. For example `["bold", "italic", "underline"]`

#### Example - customize home tab
```
    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                home: [ ["bold", "italic"], "format" ]
            }
        });
    </script>
```

#### Example - disable home tab
```
    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                home: false
            }
        });
    </script>
```

### toolbar.insert `Boolean|Array` *(default: true)*
A boolean value indicating if the "insert" tab should be displayed or a collection of tools that will be shown in the "insert" tab.

The available tools are:

* [ **addColumnLeft**, **addColumnRight**, **addRowBelow**, **addRowAbove** ]
* [ **deleteColumn**, **deleteRow** ]

Those tools which are part of a tool group are defined as array. For example `["deleteColumn", "deleteRow"]`

#### Example - customize insert tab
```
    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                insert: [ ["deleteColumn", "deleteRow"] ]
            }
        });
    </script>
```

#### Example - disable insert tab
```
    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                insert: false
            }
        });
    </script>
```

### toolbar.data `Boolean|Array` *(default: true)*
A boolean value indicating if the "insert" tab should be displayed or a collection of tools that will be shown in the "insert" tab.

The available tools are:

* **sort**
* **filter**
* **validation**

#### Example - customize data tab
```
    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                data: ["validation"]
            }
        });
    </script>
```

#### Example - disable data tab
```
    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            toolbar: {
                data: false
            }
        });
    </script>
```

## Methods

### activeSheet
Gets or sets the active sheet.

#### Parameters

##### sheet `kendo.spreadsheet.Sheet` *optional*
The sheet to set as active.

#### Returns

`kendo.spreadsheet.Sheet` the active sheet.

### sheets
Returns an array with the sheets in the workbook.

#### Returns

`Array` the available sheets.

### fromFile
Clears the spreadsheets and populates it with data from the specified Excel (.xlsx) file.

> Requires Internet Explorer 10 or a recent version of other browsers.

#### Parameters

##### blob `Blob|File`
The file or blob, usually obtained through a file input.

#### Returns
`Promise` a promise that will be resolved when the import operation completes.

#### Example - import file
```
    <input id="file" type="file" />
    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet();

        $("#file").on("change", function() {
            var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
            spreadsheet.fromFile(this.files[0]);
        });
    </script>
```

### saveAsExcel

Initiates the Excel export. Also fires the [`excelExport`](#events-excelExport) event.

> Calling this method could trigger the browser built-in popup blocker in some cases. To avoid that, always call it as a response to an end-user action e.g. button click.

#### Example - manually initiate Excel export
```
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
    <script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/jszip.min.js"></script>
```

### saveAsPDF

Initiates the PDF export. Also fires the [`pdfExport`](#events-pdfExport) event.

> Calling this method could trigger the browser built-in popup blocker in some cases. To avoid that, always call it as a response to an end-user action e.g. button click.

#### Parameters
##### options `Object`
An options object with the same structure as the [pdf](#configuration-pdf) options.

#### Returns
`Promise` A promise that will be resolved when the export completes. The same promise is available in the [pdfExport](#events-pdfExport) event arguments.


#### Example - manually initiate PDF export
```
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
    <script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>
```

### sheetByName
Returns a sheet matching the specified name, if any.

#### Parameters

##### name `String`
The name of the sheet to locate.

#### Returns

`kendo.spreadsheet.Sheet` the sheet that match the name.

### sheetIndex
Returns the index of the specified sheet.

#### Parameters

##### sheet `kendo.spreadsheet.Sheet`
The sheet to determine the index of.

#### Returns

`Number` the sheet index.

### sheetByIndex
Locates a sheet by its index in the workbook.

#### Parameters

##### index `Number`
The index of the sheet to locate.

#### Returns

`kendo.spreadsheet.Sheet` the sheet that match the index.

### insertSheet
Inserts a sheet with the specified options.

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
The sheet state and data as `Object`.  The schema follows the same structure as the [widget configuration](/api/javascript/ui/spreadsheet#configuration).

#### Returns

`kendo.spreadsheet.Sheet` the inserted sheet.

### moveSheetToIndex
Moves the sheet to the specified index.

#### Parameters

##### sheet `kendo.spreadsheet.Sheet`
The sheet instance to move.

##### index `Number`
The new zero-based index of the sheet.

### removeSheet
Removes the specified sheet.

#### Parameters

##### sheet `kendo.spreadsheet.Sheet`
The sheet instance to remove.

### renameSheet
Renames the specified sheet.

#### Parameters

##### sheet `kendo.spreadsheet.Sheet`
The sheet instance to rename.

##### newSheetName `String`
The new name of the sheet.

#### Returns

`kendo.spreadsheet.Sheet` the renamed sheet.

### toJSON
Serializes the workbook in the format defined in the [configuration](#configuration).

#### Example - Store spreadsheet to JSON

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

`Object` the serialized workbook.

### fromJSON
Loads the workbook data from an object with the format defined in the [configuration](#configuration).

> All existing sheets and their data will be lost.

#### Parameters

##### data `Object`

The object to load data from.  This should be **the deserialized object**, not the JSON string.

#### Example - Load spreadsheet from JSON

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

## Events

### change

Triggered when a value in the spreadsheet has been changed. Introduced in 2016.Q1.SP1.

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.range `kendo.spreadsheet.Range`

The [Range](/api/javascript/spreadsheet/range) that has triggered the change.

### render
Triggered after the widget has completed rendering.

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.


### excelExport
Fired when the user clicks the "Export to Excel" toolbar button.

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.data `Array`

The array of data items used to create the Excel workbook.

##### e.workbook `kendo.ooxml.Workbook`

The Excel [workbook configuration object](/api/javascript/ooxml/workbook#configuration). Used to initialize a `kendo.ooxml.Workbook` class. Modifications of the workbook will reflect in the output Excel document.

##### e.preventDefault `Function`

If invoked the spreadsheet will not save the generated file.

#### Example - subscribe to the "excelExport" event during initialization
```
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
```

#### Example - subscribe to the "excelExport" event after initialization
```
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
```

### excelImport
Fired when the user clicks the "Open" toolbar button.

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.file `Blob|File`

The file that is being imported.

##### e.preventDefault `Function`

If invoked the spreadsheet will not import the file.

##### e.progress `Promise`

A promise that will be resolved when the import operation completes.

The promise [progress handler](http://api.jquery.com/deferred.progress/) will be called periodically with the following arguments:
* sheet - The current sheet. An instance of [kendo.spreadsheet.Sheet](/api/javascript/spreadsheet/sheet)
* progress - Number if the range 0 to 1, indicating the progress of the current import operation

#### Example - monitor the progress of an import operation
```
    <div id="spreadsheet"></div>
    <script>
        $("#spreadsheet").kendoSpreadsheet({
            excelImport: function(e) {
                e.promise
                .progress(function(e) {
                    console.log(kendo.format("{0:P} complete", e.progress));
                })
                .done(function() {
                    alert("Export completed!");
                });
            }
        });

        // Click the Open command and select a file to import
    </script>
```

### pdfExport

Fired when the user initiates PDF export.

#### Event Data

##### e.sender `kendo.ui.Spreadsheet`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked the spreadsheet will not save the generated file.

##### e.promise `Promise`

A promise that will be resolved when the export completes.

#### Example - Monitor export progress
```
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
                    alert("Export completed!");
                });
            }
        });

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
        spreadsheet.saveAsPDF();
    </script>
```

