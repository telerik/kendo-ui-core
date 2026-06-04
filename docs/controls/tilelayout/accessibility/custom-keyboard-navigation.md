---
title: Custom Key Handling
page_title: jQuery TileLayout Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery TileLayout by Kendo UI using the kendoKeydown event."
components: ["tilelayout"]
slug: custom_keynav_tilelayout_kendoui
position: 3
---

# Custom Key Handling

The TileLayout exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When a focused TileLayout item receives keyboard input, the `kendoKeydown` event fires before the TileLayout runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the TileLayout instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the TileLayout from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The TileLayout uses `Arrow` keys to navigate between tiles. The following example replaces `Arrow Left` and `Arrow Right` with `L` and `R`.

```dojo
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        columns: 2,
        navigatable: true,
        containers: [
            { header: { text: "Tile 1" }, bodyTemplate: "Content 1" },
            { header: { text: "Tile 2" }, bodyTemplate: "Content 2" },
            { header: { text: "Tile 3" }, bodyTemplate: "Content 3", colSpan: 2 }
        ],
        kendoKeydown: function(e) {
            var keys = kendo.keys;
            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            var focused = $(document.activeElement).closest(".k-tilelayout-item");
            if (e.keyCode === 76) {
                e.preventKendoKeydown = true;
                focused.prev(".k-tilelayout-item").trigger("focus");
            }

            if (e.keyCode === 82) {
                e.preventKendoKeydown = true;
                focused.next(".k-tilelayout-item").trigger("focus");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds an `I` key shortcut that logs the currently focused tile header.

```dojo
    <div id="tilelayout"></div>
    <script>
    $("#tilelayout").kendoTileLayout({
        columns: 2,
        navigatable: true,
        containers: [
            { header: { text: "Tile 1" }, bodyTemplate: "Content 1" },
            { header: { text: "Tile 2" }, bodyTemplate: "Content 2" }
        ],
        kendoKeydown: function(e) {
            if (e.keyCode === 73) {
                var tile = $(document.activeElement).closest(".k-tilelayout-item");
                console.log("Tile:", tile.find(".k-tilelayout-item-header").text());
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [TileLayout Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/tilelayout/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_kendoui_tilelayout_widget %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the TileLayout]({% slug keynav_kendoui_tilelayout_widget %})
* [Accessibility in the TileLayout]({% slug jquery_tilelayout_accessibility %})
