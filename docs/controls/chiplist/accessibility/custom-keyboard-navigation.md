---
title: Custom Key Handling
page_title: jQuery ChipList Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery ChipList by Kendo UI using the kendoKeydown event."
components: ["chiplist"]
slug: custom_keynav_chiplist_kendoui
position: 2
---

# Custom Key Handling

The ChipList exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the ChipList is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the ChipList instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the ChipList from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example demonstrates how to replace the default `Arrow Left`/`Arrow Right` keys with `L` and `R` for chip navigation.

```dojo
    <div id="chiplist"></div>
    <script>
    $("#chiplist").kendoChipList({
        items: [
            { label: "Home" },
            { label: "Work" },
            { label: "School" }
        ],
        kendoKeydown: function(e) {
            var keys = kendo.keys;

            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            var focused = $(document.activeElement);
            if (e.keyCode === 76) { // 'L'
                e.preventKendoKeydown = true;
                focused.prev(".k-chip").trigger("focus");
            }

            if (e.keyCode === 82) { // 'R'
                e.preventKendoKeydown = true;
                focused.next(".k-chip").trigger("focus");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example demonstrates how to add digit keys `1`-`3` to select a chip by position.

```dojo
    <div id="chiplist"></div>
    <script>
    $("#chiplist").kendoChipList({
        items: [
            { label: "Home" },
            { label: "Work" },
            { label: "School" }
        ],
        kendoKeydown: function(e) {
            if (e.keyCode >= 49 && e.keyCode <= 51) {
                var idx = e.keyCode - 49;
                e.sender.select(e.sender.items().eq(idx));
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the ChipList]({% slug jquery_chiplist_accessibility %})
