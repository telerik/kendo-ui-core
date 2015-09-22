---
title: Cell Formatting
page_title: An overview of the custom formats supported by the Kendo UI Spreadsheet widget
position: 2
---

# Format strings

The supported format string is mostly Excel-compatible.  A format string consists of one or more sections (separated
with semicolons).  A section can optionally specify a color and a condition.  Here are some examples:

Display a number with at most 3 decimals:

    #.###

Display pozitive numbers (or zero) in green, negative numbers in red:

    [Green]#.###;[Red]#.###

Display pozitive numbers in green, negative numbers in red, and the text "Zero" in blue if the number is zero.

    [Green]#.###;[Red]#.###;[Blue]"Zero"

Same as above, but if the cell contains text display it in magenta:

    [Green]#.###;[Red]#.###;[Blue]"Zero";[Magenta]@

Excel documentation mentions that at most 4 sections are supported, and if all are present then they are interpreted in
this order:

- pozitive numbers format
- negative numbers format
- format for zero
- format for text

Excel also supports a more flexible conditional formatting, for example to display numbers bigger than 100 in green,
numbers smaller than -100 in yellow, and other numbers in cyan:

    [>100][GREEN]#,##0;[<=-100][YELLOW]#,##0;[CYAN]#,##0

It is not clear in this case whether only at most four sections are allowed, of which the last one must be text.  Our
formatter allows any number of conditional sections.

##### Text and number formatting

| Character | Meaning                                                                                                                                                                                                                    |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `0`       | Digit placeholder.  Use this to display insignificant zeroes, for example `8.9` with the format `00.000` will display as `08.900`                                                                                          |
| `#`       | Digit placeholder.  This does not display insignificant zeroes, for example `12.34` in format `###.###` will display as `12.34`                                                                                            |
| `?`       | Digit placeholder.  Similar to `0`, but this displays a space character instead of zero.  You can use this to align numbers by decimal point, for example (but you should use a fixed-width font for this to be effective) |
| `.`       | Decimal point.                                                                                                                                                                                                             |
| `,`       | Thousands separator, or scale (see below)                                                                                                                                                                                  |
| `\`       | Escape the next character (display literally)                                                                                                                                                                              |
| `_`       | Skip the width of the next character.                                                                                                                                                                                      |
| `"text"`  | Includes a piece of text in the format.  Characters inside will not be interpreted in any way, they will just output literally.                                                                                            |
| `@`       | Text placeholder.  Will be replaced with the text in the cell.                                                                                                                                                             |

The thousands separator (`,`) has a double role.  When between any digit placeholders, it will output a number with
thousands separated by the separator in the current culture.  For instance `#,#` will format `1234567` as `1,234,567`.
When a comma follows a digit placeholder but is not followed by one, it will scale the number by one thousand.  For
instance `#.##,` will format `12345` as `12.35`.  Here is a more complicated format that shows where this could be
useful:

    [>1000000]#.##,,"M";[>1000]#.##,"K";[>0]#"B";[=0]"Empty";[<0]"Replace HDD!"

Example values:

|    Value | Display      |
|----------|--------------|
| 12345678 | 12.35M       |
|    34567 | 34.57K       |
|      123 | 123B         |
|        0 | Empty        |
|      -10 | Replace HDD! |

##### Date and time formatting

| Format string | Meaning                                                                           |
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

You can notice that the month and minute specifiers are ambiguous (`m` or `mm`).  It is interpreted as month number,
unless preceded by a hour part (`h` or `hh`) in which case it'll display minutes.  Therefore:

| Format string             | Example display         |
|---------------------------|-------------------------|
| d m yyyy                  | 22 9 2015               |
| h "hours and" m "minutes" | 12 hours and 25 minutes |

##### Differences to Excel

- no support for exponent (“scientific”) notation (Excel's `E+`, `E-` formats).
- no support for filling cell width (Excel's `*` format).
