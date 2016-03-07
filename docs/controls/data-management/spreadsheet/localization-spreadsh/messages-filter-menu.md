---
title: List of filterMenu Messages
page_title: List of filterMenu Messages | Kendo UI Spreadsheet
description: "A list of the filterMenu messages used for localization of the Kendo UI Spreadsheet widget via JavaScript."
slug: localization_filter_menu_messages_spreadsheet_widget
---

# List of filterMenu Messages

Below is the list of the messages and their namespaces under the `filterMenu` category. These are used to [localize the Kendo UI Spreadsheet widget via JavaScript]({% slug localization_ofmessages_spreadsheet_widget %}).

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

## See Also

* [List of `borderpalette` Messages]({% slug localization_borderpalette_messages_spreadsheet_widget %})
* [List of `dialogs` Messages]({% slug localization_dialogs_messages_spreadsheet_widget %})
* [List of `toolbar` Messages]({% slug localization_toolbar_messages_spreadsheet_widget%})
* [List of `view` Messages]({% slug localization_view_messages_spreadsheet_widget%})
* [Localization of the Spreadsheet Widget]({% slug localization_ofmessages_spreadsheet_widget %})
* [Localization Overview of Kendo UI Widgets](/framework/localization/overview)
