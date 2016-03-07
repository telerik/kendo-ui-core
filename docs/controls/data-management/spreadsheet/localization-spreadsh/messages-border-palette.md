---
title: List of borderPalette Messages
page_title: List of borderPalette Messages | Kendo UI Spreadsheet
description: "A list of the borderPalette messages used for localization of the Kendo UI Spreadsheet widget via JavaScript."
slug: localization_borderpalette_messages_spreadsheet_widget
---

# List of borderPalette Messages

Below is the list of the messages and their namespaces under the `borderPalette` category. These are used to [localize the Kendo UI Spreadsheet widget via JavaScript]({% slug localization_ofmessages_spreadsheet_widget %}).

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

## See Also

* [List of `dialogs` Messages]({% slug localization_dialogs_messages_spreadsheet_widget %})
* [List of `filterMenu` Messages]({% slug localization_filter_menu_messages_spreadsheet_widget %})
* [List of `toolbar` Messages]({% slug localization_toolbar_messages_spreadsheet_widget%})
* [List of `view` Messages]({% slug localization_view_messages_spreadsheet_widget%})
* [Localization of the Spreadsheet Widget]({% slug localization_ofmessages_spreadsheet_widget %})
* [Localization Overview of Kendo UI Widgets](/framework/localization/overview)
