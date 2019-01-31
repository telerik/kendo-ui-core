---
title: Localization
page_title: Localization | Kendo UI Spreadsheet
description: "Learn how to localize the text messages of the Kendo UI Spreadsheet widget in your project."
slug: localization_ofmessages_spreadsheet_widget
position: 1
---

# Localization

Language localization of software is the process of its adaptation to a specific country, area, or culture that uses a different language from the ones in which the software is released into.

In terms of the Spreadsheet widget, you can localize its messages either:

1. By using an external localization file where all text messages are translated in the language you need for your project, or
2. By using JavaScript to manipulate the translation of only certain text entities.

The messages represent the default written content of a widget that appears to end users. For example, the **Copy**, **Cut**, and **Paste** Toolbar commands.

## Using External File

To change the messages that are displayed in Kendo UI widgets, add a script file to the document.

###### Example

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

For detailed information on localization via an external source, see the [Localization Overview help article](/framework/localization/overview).

## Using JavaScript

To manipulate the content of only a particular messages and not of all messages, change the messages of the widget by using JavaScript.

### Namespaces

Each message, depending on its location or function representation within the widget, has a corresponding namespace listed under a category. The following list provides all five namespace categories that the Spreadsheet uses. To see the full list of namespaces it holds, click on the respective entry.

- [kendo.spreadsheet.messages.colorPicker]({% slug localization_colorpicker_messages_spreadsheet_widget %})
- [kendo.spreadsheet.messages.borderPalette]({% slug localization_borderpalette_messages_spreadsheet_widget%})
- [kendo.spreadsheet.messages.dialogs]({% slug localization_dialogs_messages_spreadsheet_widget%})
- [kendo.spreadsheet.messages.filterMenu]({% slug localization_filter_menu_messages_spreadsheet_widget%})
- [kendo.spreadsheet.messages.toolbar]({% slug localization_toolbar_messages_spreadsheet_widget%})
- [kendo.spreadsheet.messages.view]({% slug localization_view_messages_spreadsheet_widget%})

When you apply JavaScript to update a particular message, indicate it by using its namespace.

```dojo

    <div id="spreadsheet"></div>

    <script>
        //change the text of the Toolbar tabs
        $.extend(true, kendo.spreadsheet.messages.view,{
          "tabs": {
            "home": "foo",
            "insert": "bar",
            "data": "baz"
          }
        });

        //change the text of the Filter menu operators
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

        //initialize the Spreadsheet
        $("#spreadsheet").kendoSpreadsheet();
    </script>
```

## See Also

* [List of `colorpicker` Messages]({% slug localization_colorpicker_messages_spreadsheet_widget %})
* [List of `borderpalette` Messages]({% slug localization_borderpalette_messages_spreadsheet_widget %})
* [List of `dialogs` Messages]({% slug localization_dialogs_messages_spreadsheet_widget %})
* [List of `filterMenu` Messages]({% slug localization_filter_menu_messages_spreadsheet_widget %})
* [List of `toolbar` Messages]({% slug localization_toolbar_messages_spreadsheet_widget%})
* [Localization Overview of Kendo UI Widgets](/framework/localization/overview)
