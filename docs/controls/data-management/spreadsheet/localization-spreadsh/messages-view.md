---
title: List of view Messages
page_title: List of view Messages | Kendo UI Spreadsheet
description: "A list of the view messages used for localization of the Kendo UI Spreadsheet widget via JavaScript."
slug: localization_view_messages_spreadsheet_widget
---

# List of view Messages

Below is the list of the messages and their namespaces under the `view` category. These are used to [localize the Kendo UI Spreadsheet widget via JavaScript]({% slug localization_ofmessages_spreadsheet_widget %}).

    if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
        kendo.spreadsheet.messages.view =
        $.extend(true, kendo.spreadsheet.messages.view,{
          //"nameSpace": "Message"
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

* [List of `borderpalette` Messages]({% slug localization_borderpalette_messages_spreadsheet_widget %})
* [List of `dialogs` Messages]({% slug localization_dialogs_messages_spreadsheet_widget %})
* [List of `filterMenu` Messages]({% slug localization_filter_menu_messages_spreadsheet_widget %})
* [List of `toolbar` Messages]({% slug localization_toolbar_messages_spreadsheet_widget%})
* [Localization of the Spreadsheet Widget]({% slug localization_ofmessages_spreadsheet_widget %})
* [Localization Overview of Kendo UI Widgets](/framework/localization/overview)
