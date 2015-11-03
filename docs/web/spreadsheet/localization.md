---
title: Localization
page_title: Localization
position: 10
---

# Localization

## Using external localization file

### Example

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


## In the JavaScript code

### Namespaces

- kendo.spreadsheet.messages.borderPalette
- kendo.spreadsheet.messages.dialogs
- kendo.spreadsheet.messages.filterMenu
- kendo.spreadsheet.messages.toolbar
- kendo.spreadsheet.messages.view

### Example

    <div id="spreadsheet"></div>
    <script>
        //change text of toolbar tabs
        $.extend(true, kendo.spreadsheet.messages.view,{
          "tabs": {
            "home": "foo",
            "insert": "bar",
            "data": "baz"
          }
        });

        //change text of filter menu operators for string
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

        //initialize the spreadsheet
        $("#spreadsheet").kendoSpreadsheet();
    </script>
