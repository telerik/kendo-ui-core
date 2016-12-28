---
title: Cell Formatting
page_title: Cell Formatting | Kendo UI Spreadsheet
description: "Learn how to format cells in the Kendo UI Spreadsheet widget."
slug: cell_formatting_spreadsheet_widget
position: 2
---

# Cell Formatting

Kendo UI Spreadsheet supports many cell-formatting options such as formatting of strings, text, numbers, dates, and time.

## Formatting

### Strings

The format strings are compatible with the [Excel number formats](https://support.office.com/en-au/article/Create-or-delete-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4), with some [notable exceptions](#differences-to-excel).

A format string consists of one or more sections, separated by semicolons. A section optionally specifies a color and a condition.

The example below demonstrates how to display a number with up to three decimals.

###### Example

    #.###

The example below demonstrates how to display positive numbers, or zero, in green, and negative numbers in red.

###### Example

    [Green]#.###;[Red]#.###

The example below demonstrates how to display positive numbers in green, negative numbers in red, and the `"Zero"` text in blue if the number is zero.

###### Example

    [Green]#.###;[Red]#.###;[Blue]"Zero"

This example is the same as the previous one, with the difference to display any possible text in the cell in magenta.

###### Example

    [Green]#.###;[Red]#.###;[Blue]"Zero";[Magenta]@

###### Example

```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js"></script>

    <div id="example">
    <div id="spreadsheet" style="width: 100%;"></div>
    <script>
    $(function() {
        $("#spreadsheet").kendoSpreadsheet({
            excel: {                
                // Required to enable saving files in older browsers
                proxyURL: "//demos.telerik.com/kendo-ui/service/export"
            },
            pdf: {                
                proxyURL: "//demos.telerik.com/kendo-ui/service/export"
            },
            sheets: [
                {
                    name: "Food Order",
                    mergedCells: [
                        "A1:G1",
                        "C15:E15"
                    ],
                    rows: [
                        {
                            height: 70,
                            cells: [
                                {
                                    index: 0, value: "Invoice #52 - 06/23/2015", fontSize: 32, background: "rgb(96,181,255)",
                                    textAlign: "center", color: "white"
                                }
                            ]
                        },
                        {
                            height: 25,
                            cells: [
                                {
                                    value: "ID", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
                                },
                                {
                                    value: "Product", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
                                },
                                {
                                    value: "Quantity", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
                                },
                                {
                                    value: "Price", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
                                },
                                {
                                    value: "Tax", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
                                },
                                {
                                    value: "Amount", background: "rgb(167,214,255)", textAlign: "center", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(167,214,255)", color: "rgb(0,62,117)"
                                }
                            ]
                        },
                        {
                            cells: [
                                {
                                    value: 216321, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: "Calzone", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 1, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 12.39, format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C3*D3*0.2", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C3*D3+E3", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                }
                            ]
                        },
                        {
                            cells: [
                                {
                                    value: 546897, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: "Margarita", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 2, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 8.79, format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C4*D4*0.2", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C4*D4+E4", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                }
                            ]
                        },
                        {
                            cells: [
                                {
                                    value: 456231, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: "Pollo Formaggio", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 1, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 13.99, format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C5*D5*0.2", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C5*D5+E5", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                }
                            ]
                        },
                        {
                            cells: [
                                {
                                    value: 455873, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: "Greek Salad", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 1, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 9.49, format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C6*D6*0.2", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C6*D6+E6", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                }
                            ]
                        },
                        {
                            cells: [
                                {
                                    value: 456892, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: "Spinach and Blue Cheese", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 3, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 11.49, format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C7*D7*0.2", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C7*D7+E7", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                }
                            ]
                        },
                        {
                            cells: [
                                {
                                    value: 546564, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: "Rigoletto", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 1, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 10.99, format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C8*D8*0.2", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C8*D8+E8", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                }
                            ]
                        },
                        {
                            cells: [
                                {
                                    value: 789455, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: "Creme Brulee", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 5, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 6.99, format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C9*D9*0.2", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C9*D9+E9", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                }
                            ]
                        },
                        {
                            cells: [
                                {
                                    value: 123002, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: "Radeberger Beer", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 4, textAlign: "center", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 4.99, format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C10*D10*0.2", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C10*D10+E10", format: "$#,##0.00", background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                }
                            ]
                        },
                        {
                            cells: [
                                {
                                    value: 564896, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: "Budweiser Beer", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 3, textAlign: "center", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: 4.49, format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C11*D11*0.2", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    formula: "C11*D11+E11", format: "$#,##0.00", background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                }
                            ]
                        },
                        {
                            index: 11,
                            cells: [
                                {
                                    background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(229,243,255)", color: "rgb(0,62,117)"
                                }
                            ]
                        },
                        {
                            index: 12,
                            cells: [
                                {
                                    background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(255,255,255)", color: "rgb(0,62,117)"
                                }
                            ]
                        },
                        {
                            height: 25,
                            index: 13,
                            cells: [
                                {
                                    background: "rgb(193,226,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(193,226,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(193,226,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    background: "rgb(193,226,255)", color: "rgb(0,62,117)"
                                },
                                {
                                    value: "Tip:", background: "rgb(193,226,255)", color: "rgb(0,62,117)", textAlign: "right", verticalAlign: "bottom"
                                },
                                {
                                    formula: "SUM(F3:F11)*0.1", background: "rgb(193,226,255)", color: "rgb(0,62,117)", format: "$#,##0.00", bold: "true", verticalAlign: "bottom"
                                },
                                {
                                    background: "rgb(193,226,255)", color: "rgb(0,62,117)"
                                }
                            ]
                        },
                        {
                            height: 50,
                            index: 14,
                            cells: [
                                {
                                    index: 0, background: "rgb(193,226,255)", color: "rgb(0,62,117)",
                                },
                                {
                                    index: 1, background: "rgb(193,226,255)", color: "rgb(0,62,117)",
                                },
                                {
                                    index: 2, fontSize: 20, value: "Total Amount:",
                                    background: "rgb(193,226,255)", color: "rgb(0,62,117)", textAlign: "right"
                                },
                                {
                                    index: 5, fontSize: 20, formula: "SUM(F3:F14)", background: "rgb(193,226,255)", color: "rgb(0,62,117)",
                                    format: "$#,##0.00", bold: "true"
                                },
                                {
                                    index: 6, background: "rgb(193,226,255)", color: "rgb(0,62,117)"
                                }
                            ]
                        }
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
                        },
                        {
                            width: 155
                        }
                    ]
                }
            ]
        }).data('kendoSpreadsheet').sheets()[0].range("C3:C11").format('[=1][GREEN]#,##0;[=2][YELLOW]#,##0;[=3][CYAN]#,##0;[RED]#,###');
    });
    </script>
</div>
```

Excel documentation mentions that a maximum of four sections are supported, and if all are present, they are interpreted in the following order:

- Positive numbers format
- Negative numbers format
- Format for zero
- Format for text

Excel also supports a more flexible conditional formatting.

The example below demonstrates how to display numbers greater than 100 in green, numbers less than minus 100 in yellow, and other numbers in cyan.

###### Example

    [>100][GREEN]#,##0;[<=-100][YELLOW]#,##0;[CYAN]#,##0

In this case it is not clear whether only up to four sections are allowed, of which the last one must be text, while the Spreadsheet formatter allows for any number of conditional sections.

### Default Format Strings

The default format strings that are shown in the formatting drop-down are stored in the `kendo.spreadsheet.formats` object.

| FORMAT IDENTIFIER | VALUE                                                                         |
|-------------------|-------------------------------------------------------------------------------|
| automatic         | Infer formatting by parsing the cell value                                    |
| number            | Format number, with precision of 2 decimals                                   |
| percent           | Format percentage points, with precision of 2 decimals                        |
| financial         | Format financial value, accounting for positive / negative / zero values      |
| currency          | Format currency value, accounting for positive / negative values              |
| date              | Format value as date                                                          |
| time              | Format value as time                                                          |
| dateTime          | Format value as date-time                                                     |
| duration          | Format as elapsed duration (in hours / minutes / seconds)                     |

You can use the above formats with the [`range` value method](/api/javascript/spreadsheet/range#methods-format), like this: `sheet.range("A1").format(kendo.spreadsheet.formats.currency)`.

### Text and Numbers

| Character | Meaning       |
|-----------|---------------|
| `0`       | Digit placeholder. Use this to display insignificant zeroes. For example, `8.9` with the format `00.000` displays as `08.900`.    |
| `#`       | Digit placeholder. This does not display insignificant zeroes. For example, `12.34` in the `###.###` format displays as `12.34`.  |
| `?`       | Digit placeholder. It is similar to `0`, but displays a space character instead of a zero. You can use this to align numbers by decimal point, but you should use a fixed-width font for this to be effective.        |
| `.`       | Decimal point. |
| `,`       | Thousands separator, or scale (see below).    |
| `\`       | Escape the next character (display literally).|
| `_`       | Skip the width of the next character.         |
| `"text"`  | Includes a piece of text in the format. Characters inside will not be interpreted in any way, they will just output literally.    |
| `@`       | Text placeholder. Will be replaced with the text in the cell. |

The thousands separator (`,`) has a double role. When between any digit placeholders, it will output a number in thousands separated by the separator in the current culture. For instance, `#,#` formats `1234567` as `1,234,567`. When a comma follows a digit placeholder but is not followed by one, it scales the number by one thousand. For instance, `#.##,` formats `12345` as `12.35`. Here is a more complicated format that shows where this could be useful:

    [>1000000]#.##,,"M";[>1000]#.##,"K";[>0]#"B";[=0]"Empty";[<0]"Replace HDD!"

###### Example

|    Value | Display      |
|----------|--------------|
| 12345678 | 12.35M       |
|    34567 | 34.57K       |
|      123 | 123B         |
|        0 | Empty        |
|      -10 | Replace HDD! |

### Dates and Time

| Format String | Meaning                                                                           |
|---------------|-----------------------------------------------------------------------------------|
| m             | Display month number without leading zero                                         |
| mm            | Display month number with leading zero                                            |
| mmm           | Display short month name in current culture                                       |
| mmmm          | Display full month name in current culture                                        |
| d             | Display date number without leading zero                                          |
| dd            | Display date number with leading zero                                             |
| ddd           | Display the abbreviated week day name                                             |
| dddd          | Display the full week day name                                                    |
| yy            | Display the year as two digit number                                              |
| yyyy          | Display the full year number                                                      |
|---------------|-----------------------------------------------------------------------------------|
| h             | Display hour without leading zero                                                 |
| hh            | Display hour including leading zero                                               |
| m             | Display minute without leading zero                                               |
| mm            | Display minute including leading zero                                             |
| s             | Display second without leading zero                                               |
| ss            | Display second including leading zero                                             |
| [h]           | Elapsed time, in hours                                                            |
| [m]           | Elapsed time in minutes                                                           |
| [s]           | Elapsed time in seconds                                                           |
| AM/PM         | Forces hours to display in 12-hour clock, and displays `AM` or `PM` as necessary |
| am/pm         | Same as above, but displays lower-case `am` or `pm`                               |
| A/P           | Same as above, but displays `A` or `P`                                            |
| a/p           | Idem, but displays `a` or `p`                                                     |

Note that the month and minute specifiers are ambiguous (`m` or `mm`). These strings are interpreted as a month number, unless preceded by an hour part (`h` or `hh`) in which case it displays minutes. Therefore:

| Format String             | Example Display         |
|---------------------------|-------------------------|
| d m yyyy                  | 22 9 2015               |
| h "hours and" m "minutes" | 12 hours and 25 minutes |

## Spreadsheet vs. Excel

The Spreadsheet does not support the following options otherwise available in Excel:

- Exponent (“scientific”) notation (`E+`, `E-` Excel formats)
- Filling cell width (`*` Excel format)

## See Also

Other articles on the Kendo UI Spreadsheet:

* [Overview]({% slug overview_spreadsheet_widget %})
* [Custom Functions]({% slug custom_functions_spreadsheet_widget %})
* [Custom Cell Editors]({% slug custom_editors_spreadsheet_widget %})
* [Store Data as JSON]({% slug loadand_saveas_json_spreadsheet_widget %})
* [Export to Excel]({% slug export_toexcel_spreadsheet_widget %})
* [Server-Side Processing]({% slug serverside_processing_spreadsheet_widget %})
* [User Guide]({% slug user_guide_spreadsheet_widget %})
