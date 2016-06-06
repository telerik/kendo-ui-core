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

The example below demonstrates how to display positive numbers in green, negative numbers in red, and the the "Zero" text in blue if the number is zero.

###### Example

    [Green]#.###;[Red]#.###;[Blue]"Zero"

This example is the same as the previous one, with the difference to display any possible text in the cell in magenta.

###### Example

    [Green]#.###;[Red]#.###;[Blue]"Zero";[Magenta]@

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

The default format strings that are shown in the formatting drop-down are stored in the `kendo.spreadsheet.formatting` object.

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

You can use the above formats with the [`range` value method](/api/javascript/spreadsheet/range#methods-format), like this: `sheet.range("A1").format(kendo.spreadsheet.formatting.currency)`.

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
| AM/PM         | Forces hours to display in 12-hours clock, and displays `AM` or `PM` as necessary |
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
