---
title: List of toolbar Messages
page_title: List of toolbar Messages | Kendo UI Spreadsheet
description: "A list of the toolbar messages used for localization of the Kendo UI Spreadsheet widget via JavaScript."
slug: localization_toolbar_messages_spreadsheet_widget
---

# List of toolbar Messages

Below is the list of the messages and their namespaces under the `toolbar` category. These are used to [localize the Kendo UI Spreadsheet widget via JavaScript]({% slug localization_ofmessages_spreadsheet_widget %}).

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
          "excelExport": "Export to Excel...",
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
          "sortAsc": "Sort ascending",
          "sortDesc": "Sort descending",
          "sortButtons": {
            "sortSheetAsc": "Sort sheet A to Z",
            "sortSheetDesc": "Sort sheet Z to A",
            "sortRangeAsc": "Sort range A to Z",
            "sortRangeDesc": "Sort range Z to A"
          },
          "textColor": "Text Color",
          "textWrap": "Wrap text",
          "underline": "Underline",
          "validation": "Data validation..."
        });
        }

## See Also

* [List of `borderpalette` Messages]({% slug localization_borderpalette_messages_spreadsheet_widget %})
* [List of `dialogs` Messages]({% slug localization_dialogs_messages_spreadsheet_widget %})
* [List of `filterMenu` Messages]({% slug localization_filter_menu_messages_spreadsheet_widget %})
* [List of `view` Messages]({% slug localization_view_messages_spreadsheet_widget%})
* [Localization of the Spreadsheet Widget]({% slug localization_ofmessages_spreadsheet_widget %})
* [Localization Overview of Kendo UI Widgets](/framework/localization/overview)
