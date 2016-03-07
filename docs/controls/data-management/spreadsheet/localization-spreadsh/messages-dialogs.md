---
title: List of dialogs Messages
page_title: List of dialogs Messages | Kendo UI Spreadsheet
description: "A list of the dialogs messages used for localization of the Kendo UI Spreadsheet widget via JavaScript."
slug: localization_dialogs_messages_spreadsheet_widget
---

# List of dialogs Messages

Below is the list of the messages and their namespaces under the `dialogs` category. These are used to [localize the Kendo UI Spreadsheet widget via JavaScript]({% slug localization_ofmessages_spreadsheet_widget %}).

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
          "saveAsDialog": {
            "title": "Save As...",
            "labels": {
              "fileName": "File name",
              "saveAsType": "Save as type"
            }
          },
          "excelExportDialog": {
            "title": "Export to Excel..."
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

## See Also

* [List of `borderpalette` Messages]({% slug localization_borderpalette_messages_spreadsheet_widget %})
* [List of `filterMenu` Messages]({% slug localization_filter_menu_messages_spreadsheet_widget %})
* [List of `toolbar` Messages]({% slug localization_toolbar_messages_spreadsheet_widget%})
* [List of `view` Messages]({% slug localization_view_messages_spreadsheet_widget%})
* [Localization of the Spreadsheet Widget]({% slug localization_ofmessages_spreadsheet_widget %})
* [Localization Overview of Kendo UI Widgets](/framework/localization/overview)
