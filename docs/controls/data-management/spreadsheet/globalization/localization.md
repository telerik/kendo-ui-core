---
title: Localization
page_title: jQuery Spreadsheet Documentation | Spreadsheet Localization
description: "Get started with the jQuery Spreadsheet by Kendo UI and learn how to localize its border palette, color picker, dialog, menu, toolbar, and view text messages in your project."
previous_url: /controls/data-management/spreadsheet/localization-spreadsh/localization, /controls/data-management/spreadsheet/localization-spreadsh/messages-border-palette, /controls/data-management/spreadsheet/localization-spreadsh/messages-colorpicker, /controls/data-management/spreadsheet/localization-spreadsh/messages-dialogs, /controls/data-management/spreadsheet/localization-spreadsh/messages-filter-menu, /controls/data-management/spreadsheet/localization-spreadsh/messages-toolbar, /controls/data-management/spreadsheet/localization-spreadsh/messages-view
slug: localization_ofmessages_spreadsheet_widget
position: 1
---

# Spreadsheet Localization

Language localization of software is the process of its adaptation to a specific country, area, or culture that uses a different language from the ones in which the software is released into.

## Getting Started

In terms of the Spreadsheet widget, you can localize its messages by using either of the following approaches:

1. An external localization file where all text messages are translated in the language you need for your project.
2. JavaScript to manipulate the translation of only certain text entities.

The messages represent the default written content of a widget that appears to end users. For example, the **Copy**, **Cut**, and **Paste** Toolbar commands.

### Using External Files

To change the messages that are displayed in the Spreadsheet, add a script file to the document. For more information, refer to the article on [localization in Kendo UI for jQuery]({% slug overview_localization_kendoui %}).

    <!DOCTYPE>
    <html>
        <head>
            <link href="styles/kendo.common.min.css" rel="stylesheet" />
            <link href="styles/kendo.default.min.css" rel="stylesheet" />

            <script src="jquery.js"></script>
            <script src="kendo.all.min.js"></script>
            <script src="kendo.messages.bg-BG.js"></script>
        </head>
        <body>
            <div id="spreadsheet"></div>
            <script>
                $("#spreadsheet").kendoSpreadsheet();
            </script>
        </body>
    </html>

### Using JavaScript

To manipulate the content of a specific message and not of all messages, use JavaScript. Depending on its location or function representation within the widget, each message has a corresponding namespace listed under a category. The following list provides all namespace categories that the Spreadsheet supports.

- [`kendo.spreadsheet.messages.borderPalette`](#border-palette-messages)
- [`kendo.spreadsheet.messages.colorPicker`](#color-picker-messages)
- [`kendo.spreadsheet.messages.dialogs`](#dialogs-messages)
- [`kendo.spreadsheet.messages.filterMenu`](#filter-menu-messages)
- [`kendo.spreadsheet.messages.toolbar`](#toolbar-messages)
- [`kendo.spreadsheet.messages.view`](#view-messages)

When you apply JavaScript to update a particular message, indicate it by using its namespace.

```dojo

    <div id="spreadsheet"></div>

    <script>
        // Change the text of the Toolbar tabs.
        $.extend(true, kendo.spreadsheet.messages.view,{
          "tabs": {
            "home": "foo",
            "insert": "bar",
            "data": "baz"
          }
        });

        // Change the text of the Filter menu operators.
        $.extend(true, kendo.spreadsheet.messages.filterMenu,{
          "operators": {
            "string": {
              "contains": "foo",
              "doesnotcontain": "bar",
              "startswith": "baz",
              "endswith": "qux"
            }
          }
        });

        // Initialize the Spreadsheet.
        $("#spreadsheet").kendoSpreadsheet();
    </script>
```

## Border Palette Messages

The following list provides the messages and their namespaces under the `borderPalette` category.

    if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
        kendo.spreadsheet.messages.borderPalette =
        $.extend(true, kendo.spreadsheet.messages.borderPalette,{
          //"nameSpace": "Message"
          "allBorders": "All borders",
          "insideBorders": "Inside borders",
          "insideHorizontalBorders": "Inside horizontal borders",
          "insideVerticalBorders": "Inside vertical borders",
          "outsideBorders": "Outside borders",
          "leftBorder": "Left border",
          "topBorder": "Top border",
          "rightBorder": "Right border",
          "bottomBorder": "Bottom border",
          "noBorders": "No border"
        });
        }

## Color Picker Messages

The following list provides the messages and their namespaces under the `colorpicker` category.

    if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
      kendo.spreadsheet.messages.colorPicker =
      $.extend(true, kendo.spreadsheet.messages.colorPicker,{
        "reset": "Reset color",
        "customColor": "Custom color...",
        "apply": "Apply",
        "cancel": "Cancel"
      });
    }

## Dialogs Messages

The following list provides the messages and their namespaces under the `dialogs` category.

    if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
        kendo.spreadsheet.messages.dialogs =
        $.extend(true, kendo.spreadsheet.messages.dialogs,{
          //"nameSpace": "Message"
          "apply": "Apply",
          "save": "Save",
          "cancel": "Cancel",
          "remove": "Remove",
          "okText": "OK",
          "formatCellsDialog": {
            "title": "Format",
            "categories": {
              "number": "Number",
              "currency": "Currency",
              "date": "Date"
              }
          },
          "fontFamilyDialog": {
            "title": "Font"
          },
          "fontSizeDialog": {
            "title": "Font size"
          },
          "bordersDialog": {
            "title": "Borders"
          },
          "alignmentDialog": {
            "title": "Alignment",
            "buttons": {
             "justtifyLeft": "Align left",
             "justifyCenter": "Center",
             "justifyRight": "Align right",
             "justifyFull": "Justify",
             "alignTop": "Align top",
             "alignMiddle": "Align middle",
             "alignBottom": "Align bottom"
            }
          },
          "mergeDialog": {
            "title": "Merge cells",
            "buttons": {
              "mergeCells": "Merge all",
              "mergeHorizontally": "Merge horizontally",
              "mergeVertically": "Merge vertically",
              "unmerge": "Unmerge"
            }
          },
          "freezeDialog": {
            "title": "Freeze panes",
            "buttons": {
              "freezePanes": "Freeze panes",
              "freezeRows": "Freeze rows",
              "freezeColumns": "Freeze columns",
              "unfreeze": "Unfreeze panes"
            }
          },
          "validationDialog": {
            "title": "Data Validation",
            "hintMessage": "Please enter a valid {0} value {1}.",
            "hintTitle": "Validation {0}",
            "criteria": {
              "any": "Any value",
              "number": "Number",
              "text": "Text",
              "date": "Date",
              "custom": "Custom Formula"
            },
            "comparers": {
              "greaterThan": "greater than",
              "lessThan": "less than",
              "between": "between",
              "notBetween": "not between",
              "equalTo": "equal to",
              "notEqualTo": "not equal to",
              "greaterThanOrEqualTo": "greater than or equal to",
              "lessThanOrEqualTo": "less than or equal to"
            },
            "comparerMessages": {
              "greaterThan": "greater than {0}",
              "lessThan": "less than {0}",
              "between": "between {0} and {1}",
              "notBetween": "not between {0} and {1}",
              "equalTo": "equal to {0}",
              "notEqualTo": "not equal to {0}",
              "greaterThanOrEqualTo": "greater than or equal to {0}",
              "lessThanOrEqualTo": "less than or equal to {0}",
              "custom": "that satisfies the formula: {0}"
            },
            "labels": {
              "criteria": "Criteria",
              "comparer": "Comparer",
              "min": "Min",
              "max": "Max",
              "value": "Value",
              "start": "Start",
              "end": "End",
              "onInvalidData": "On invalid data",
              "rejectInput": "Reject input",
              "showWarning": "Show warning",
              "showHint": "Show hint",
              "hintTitle": "Hint title",
              "hintMessage": "Hint message"
            },
            "placeholders": {
              "typeTitle": "Type title",
              "typeMessage": "Type message"
            }
          },
          "exportAsDialog": {
            "title": "Save As...",
            "labels": {
              "fileName": "File name",
              "saveAsType": "Save as type"
            }
          },
          "modifyMergedDialog": {
            "errorMessage": "Cannot change part of a merged cell."
          },
          "useKeyboardDialog": {
            "title": "Copying and pasting",
            "errorMessage": "These actions cannot be invoked through the menu. Please use the keyboard shortcuts instead:",
            "labels": {
              "forCopy": "for copy",
              "forCut": "for cut",
              "forPaste": "for paste"
            }
          },
          "unsupportedSelectionDialog": {
            "errorMessage": "That action cannot be performed on multiple selection."
          }
        });
        }

## Filter Menu Messages

The following list provides the messages and their namespaces under the `filterMenu` category.

    if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
        kendo.spreadsheet.messages.filterMenu =
        $.extend(true, kendo.spreadsheet.messages.filterMenu,{
          //"nameSpace": "Message"
          "sortAscending": "Sort range A to Z",
          "sortDescending": "Sort range Z to A",
          "filterByValue": "Filter by value",
          "filterByCondition": "Filter by condition",
          "apply": "Apply",
          "search": "Search",
          "clear": "Clear",
          "blanks": "(Blanks)",
          "operatorNone": "None",
          "and": "AND",
          "or": "OR",
          "operators": {
            "string": {
              "contains": "Text contains",
              "doesnotcontain": "Text does not contain",
              "startswith": "Text starts with",
              "endswith": "Text ends with"
            },
            "date": {
              "eq":  "Date is",
              "neq": "Date is not",
              "lt":  "Date is before",
              "gt":  "Date is after"
            },
            "number": {
              "eq": "Is equal to",
              "neq": "Is not equal to",
              "gte": "Is greater than or equal to",
              "gt": "Is greater than",
              "lte": "Is less than or equal to",
              "lt": "Is less than"
            }
          }
        });
        }

## Toolbar Messages

The following list provides the messages and their namespaces under the `toolbar` category.

    if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
        kendo.spreadsheet.messages.toolbar =
        $.extend(true, kendo.spreadsheet.messages.toolbar,{
          //"nameSpace": "Message"
          "addColumnLeft": "Add column left",
          "addColumnRight": "Add column right",
          "addRowAbove": "Add row above",
          "addRowBelow": "Add row below",
          "alignment": "Alignment",
          "alignmentButtons": {
            "justtifyLeft": "Align left",
            "justifyCenter": "Center",
            "justifyRight": "Align right",
            "justifyFull": "Justify",
            "alignTop": "Align top",
            "alignMiddle": "Align middle",
            "alignBottom": "Align bottom"
          },
          "backgroundColor": "Background",
          "bold": "Bold",
          "borders": "Borders",
          "copy": "Copy",
          "cut": "Cut",
          "deleteColumn": "Delete column",
          "deleteRow": "Delete row",
          "exportAs": "Export",
          "filter": "Filter",
          "fontFamily": "Font",
          "fontSize": "Font size",
          "format": "Custom format...",
          "formatTypes": {
            "automatic": "Automatic",
            "number": "Number",
            "percent": "Percent",
            "financial": "Financial",
            "currency": "Currency",
            "date": "Date",
            "time": "Time",
            "dateTime": "Date time",
            "duration": "Duration",
            "moreFormats": "More formats..."
          },
          "formatDecreaseDecimal": "Decrease decimal",
          "formatIncreaseDecimal": "Increase decimal",
          "freeze": "Freeze panes",
          "freezeButtons": {
            "freezePanes": "Freeze panes",
            "freezeRows": "Freeze rows",
            "freezeColumns": "Freeze columns",
            "unfreeze": "Unfreeze panes"
          },
          "italic": "Italic",
          "merge": "Merge cells",
          "mergeButtons": {
            "mergeCells": "Merge all",
            "mergeHorizontally": "Merge horizontally",
            "mergeVertically": "Merge vertically",
            "unmerge": "Unmerge"
          },
          "paste": "Paste",
          "quickAccess": {
            "redo": "Redo",
            "undo": "Undo"
          },
          "sort": "Sort",
          "sortButtons": {
            "sortRangeAsc": "Sort range A to Z",
            "sortRangeDesc": "Sort range Z to A"
          },
          "textColor": "Text Color",
          "textWrap": "Wrap text",
          "underline": "Underline",
          "validation": "Data validation..."
        });
        }

## View Messages

The following list provides the messages and their namespaces under the `view` category.

    if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
        kendo.spreadsheet.messages.view =
        $.extend(true, kendo.spreadsheet.messages.view,{
          "nameBox": "Name Box",
          "errors": {
            "shiftingNonblankCells": "Cannot insert cells due to data loss possibility. Select another insert location or delete the data from the end of your worksheet."
          },
          "tabs": {
            "home": "Home",
            "insert": "Insert",
            "data": "Data"
          }
        });
        }

## See Also

* [Localization in Kendo UI for jQuery]({% slug overview_localization_kendoui %})
