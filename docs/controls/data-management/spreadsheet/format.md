---
title: Cell Formatting
page_title: Cell Formatting | Kendo UI Spreadsheet
description: "Learn how to format cells in the Kendo UI Spreadsheet widget."
slug: cell_formatting_spreadsheet_widget
position: 2
---

# Cell Formatting

The Kendo UI Spreadsheet widget supports cell-formatting options such as formatting of strings, text, numbers, dates, and time.

## Formatting

### Strings

While the format strings are compatible with the [Excel number formats](https://support.office.com/en-au/article/Create-or-delete-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4), some [notable exceptions](#differences-to-excel) still exist.

A format string consists of one or more sections that are separated by semicolons. Optionally, a section specifies a color and a condition.

The following example demonstrates how to display a number with up to three decimals.

###### Example

    #.###

The following example demonstrates how to display positive numbers, or zero, in green, and negative numbers in red.

###### Example

    [Green]#.###;[Red]#.###

The following example demonstrates how to display positive numbers in green, negative numbers in red, and the `"Zero"` text in blue if the number is zero.

###### Example

    [Green]#.###;[Red]#.###;[Blue]"Zero"

This following example is the same as the previous one, with the difference to display any possible text in the cell in magenta.

###### Example

    [Green]#.###;[Red]#.###;[Blue]"Zero";[Magenta]@

The following example demonstrates how to format the Spreadsheet conditionally.

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

According to the Excel documentation, Excel supports a maximum of four sections. If all of them are present, Excel interprets them in the following order:

- Positive numbers format
- Negative numbers format
- Format for zero
- Format for text

Excel also supports a more flexible conditional formatting.

The following example demonstrates how to display numbers greater than 100 in green, numbers less than minus 100 in yellow, and other numbers in cyan.

###### Example

    [>100][GREEN]#,##0;[<=-100][YELLOW]#,##0;[CYAN]#,##0

In this case, it is not clear whether only up to four sections are allowed, of which the last one must be text, while the Spreadsheet formatter allows for any number of conditional sections.

### Default Format Strings

The default format strings that are shown in the formatting drop-down are stored in the `kendo.spreadsheet.formats` object.

| FORMAT IDENTIFIER | VALUE                                                                         |
|-------------------|-------------------------------------------------------------------------------|
| automatic         | Infer formatting by parsing the cell value.                                   |
| number            | Format numbers with the precision of 2 decimals.                              |
| percent           | Format percentage points with the precision of 2 decimals.                    |
| financial         | Format financial values that account for positive, negative, or zero values.  |
| currency          | Format currency values that account for positive or negative values.          |
| date              | Format values as dates.                                                       |
| time              | Format values as time.                                                        |
| dateTime          | Format values as date-time.                                                   |
| duration          | Format as an elapsed duration in hours, minutes, or seconds.                  |

You can use these formats with the [`range` value method](/api/javascript/spreadsheet/range#methods-format) in the following way: `sheet.range("A1").format(kendo.spreadsheet.formats.currency)`.

### Text and Numbers

| CHARACTER | MEANING       |
|-----------|---------------|
| `0`       | Digit placeholder. Displays insignificant zeroes. For example, `8.9` with the `00.000` format renders `08.900`.    |
| `#`       | Digit placeholder. Does not display insignificant zeroes. For example, `12.34` in the `###.###` format renders `12.34`.                  |
| `?`       | Digit placeholder. Functionally similar to `0`, but displays a space character instead of a zero. To align numbers by decimal points, use this character. Note that you have to use a fixed-width font for this setting to be effective. |
| `.`       | Displays a decimal point. |
| `,`       | Displays a thousands separator or scale (see below).   |
| `\`       | Escapes the next character (display literally).        |
| `_`       | Skips the width of the next character.                 |
| `"text"`  | Includes a piece of text in the format. Characters inside are not interpreted in any way, but are literally output.    |
| `@`       | Text placeholder. Is replaced with the text in the cell. |

The thousands separator (`,`) has a double role:
* When situated between any digit placeholders, it outputs a number in thousands that are separated by the separator in the current culture. For example, `#,#` formats `1234567` as `1,234,567`.
* When a comma follows a digit placeholder but is not followed by one, it scales the number by one thousand. For example, `#.##,` formats `12345` as `12.35`. This is a more complicated format displaying in which cases such behavior is useful: `[>1000000]#.##,,"M";[>1000]#.##,"K";[>0]#"B";[=0]"Empty";[<0]"Replace HDD!"`.

###### Example

| VALUE    | DISPLAY      |
|----------|--------------|
| 12345678 | 12.35M       |
|    34567 | 34.57K       |
|      123 | 123B         |
|        0 | Empty        |
|      -10 | Replace HDD! |

### Dates and Time

| FORMAT STRING | MEANING                                                                           |
|---------------|-----------------------------------------------------------------------------------|
| m             | Displays the month number without a leading zero.                                 |
| mm            | Displays the month number with a leading zero.                                    |
| mmm           | Displays the short month name in the current culture.                             |
| mmmm          | Displays the full month name in the current culture.                              |
| d             | Displays the date number without a leading zero.                                  |
| dd            | Displays the date number with a leading zero.                                     |
| ddd           | Displays the abbreviated weekday name.                                            |
| dddd          | Displays the full weekday name.                                                   |
| yy            | Displays the year as a two-digit number.                                          |
| yyyy          | Displays the full year number.                                                    |
|---------------|-----------------------------------------------------------------------------------|
| h             | Displays the hour without a leading zero.                                         |
| hh            | Displays the hour including a leading zero.                                       |
| m             | Displays the minute without a leading zero.                                       |
| mm            | Displays the minute including a leading zero.                                     |
| s             | Displays the second without a leading zero.                                       |
| ss            | Displays the second including a leading zero.                                     |
| [h]           | Displays the elapsed time in hours.                                               |
| [m]           | Displays the elapsed time in minutes.                                             |
| [s]           | Displays the elapsed time in seconds.                                             |
| AM/PM         | Displays hours in a 12-hour clock accompanied by an `AM` or `PM` indication.      |
| am/pm         | Displays hours in a 12-hour clock accompanied by an `am` or `pm` indication.      |
| A/P           | Displays hours in a 12-hour clock accompanied by an `A` or `P` indication.        |
| a/p           | Displays hours in a 12-hour clock accompanied by an `a` or `p` indication.        |

Note that the month and minute specifiers are ambiguous (`m` or `mm`). These strings are interpreted as a month number, unless preceded by an hour part (`h` or `hh`). In such cases, it displays minutes, as demonstrated in the following table.

| FORMAT STRING             | EXAMPEL DISPLAY         |
|---------------------------|-------------------------|
| d m yyyy                  | 22 9 2015               |
| h "hours and" m "minutes" | 12 hours and 25 minutes |

## Spreadsheet vs. Excel

The Spreadsheet does not support the following options that are otherwise available in Excel:

- Exponent (scientific) notation&mdashh;`E+`, `E-` Excel formats.
- Filling cell width&mdash;`*` Excel format.

## See Also

Other articles on the Kendo UI Spreadsheet:

* [Overview]({% slug overview_spreadsheet_widget %})
* [Custom Functions]({% slug custom_functions_spreadsheet_widget %})
* [Custom Cell Editors]({% slug custom_editors_spreadsheet_widget %})
* [Store Data as JSON]({% slug loadand_saveas_json_spreadsheet_widget %})
* [Export to Excel]({% slug export_toexcel_spreadsheet_widget %})
* [Server-Side Processing]({% slug serverside_processing_spreadsheet_widget %})
* [User Guide]({% slug user_guide_spreadsheet_widget %})
