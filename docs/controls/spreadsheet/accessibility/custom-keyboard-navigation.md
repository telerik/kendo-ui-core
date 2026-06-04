---
title: Custom Key Handling
page_title: jQuery Spreadsheet Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Spreadsheet by Kendo UI using the kendoKeydown event."
components: ["spreadsheet"]
slug: custom_keynav_spreadsheet_kendoui
position: 2
---

# Custom Key Handling

The Spreadsheet exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Spreadsheet sheet receives keyboard input, the `kendoKeydown` event fires before the Spreadsheet runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the Spreadsheet instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Spreadsheet from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The Spreadsheet uses `Arrow` keys to navigate between cells. The following example replaces `Arrow Up` and `Arrow Down` with `U` and `D`.

```dojo
    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            rows: [
                { cells: [{ value: "A1" }, { value: "B1" }] },
                { cells: [{ value: "A2" }, { value: "B2" }] },
                { cells: [{ value: "A3" }, { value: "B3" }] }
            ]
        }],
        kendoKeydown: function(e) {
            var keys = kendo.keys;
            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            var sheet = e.sender.activeSheet();
            var ref = sheet.activeCell();
            var row = ref.topLeft.row;
            var col = ref.topLeft.col;

            if (e.keyCode === 85) {
                e.preventKendoKeydown = true;
                if (row > 0) {
                    sheet.range(row - 1, col).select();
                }
            }

            if (e.keyCode === 68) {
                e.preventKendoKeydown = true;
                sheet.range(row + 1, col).select();
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Ctrl+Home` to navigate to cell A1.

```dojo
    <div id="spreadsheet"></div>
    <script>
    $("#spreadsheet").kendoSpreadsheet({
        sheets: [{
            rows: [
                { cells: [{ value: "A1" }, { value: "B1" }] },
                { cells: [{ value: "A2" }, { value: "B2" }] }
            ]
        }],
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === kendo.keys.HOME) {
                var sheet = e.sender.activeSheet();
                sheet.range("A1").select();
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the Spreadsheet]({% slug jquery_spreadsheet_accessibility %})
