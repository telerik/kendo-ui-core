---
title: Custom Key Handling
page_title: jQuery BottomNavigation Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery BottomNavigation by Kendo UI using the kendoKeydown event."
components: ["bottomnavigation"]
slug: custom_keynav_bottomnavigation_kendoui
position: 3
---

# Custom Key Handling

The BottomNavigation exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When a focused BottomNavigation item receives keyboard input, the `kendoKeydown` event fires before the BottomNavigation runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the BottomNavigation instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the BottomNavigation from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The following example demonstrates how to replace the default `Arrow Left`/`Arrow Right` keys with `L` and `R` for item navigation.

```dojo
    <nav id="bottomnav"></nav>
    <script>
    $("#bottomnav").kendoBottomNavigation({
        items: [
            { text: "Home", icon: "home", selected: true },
            { text: "Search", icon: "search" },
            { text: "Profile", icon: "user" }
        ],
        kendoKeydown: function(e) {
            var keys = kendo.keys;

            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            var focused = $(document.activeElement);
            if (e.keyCode === 76) { // 'L'
                e.preventKendoKeydown = true;
                focused.prev(".k-bottom-nav-item").trigger("focus");
            }

            if (e.keyCode === 82) { // 'R'
                e.preventKendoKeydown = true;
                focused.next(".k-bottom-nav-item").trigger("focus");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example demonstrates how to add digit keys `1`-`3` to jump to an item by position.

```dojo
    <nav id="bottomnav"></nav>
    <script>
    $("#bottomnav").kendoBottomNavigation({
        items: [
            { text: "Home", icon: "home", selected: true },
            { text: "Search", icon: "search" },
            { text: "Profile", icon: "user" }
        ],
        kendoKeydown: function(e) {
            if (e.keyCode >= 49 && e.keyCode <= 51) {
                var idx = e.keyCode - 49;
                e.sender.element.find(".k-bottom-nav-item").eq(idx).trigger("click");
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [BottomNavigation Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/bottomnavigation/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_bottomnavigation_jquery %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the BottomNavigation]({% slug jquery_bottomnavigation_accessibility %})
