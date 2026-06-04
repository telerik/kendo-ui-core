---
title: Custom Key Handling
page_title: jQuery MultiViewCalendar Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery MultiViewCalendar by Kendo UI using the kendoKeydown event."
components: ["multiviewcalendar"]
slug: custom_keynav_multiviewcalendar_kendoui
position: 3
---

# Custom Key Handling

The MultiViewCalendar exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the MultiViewCalendar is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the MultiViewCalendar instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the MultiViewCalendar from running its own handler for this key press.

## Overriding a Built-In Key Combination

The MultiViewCalendar uses `Arrow` keys to navigate dates. The following example replaces them with `U`, `D`, `L`, and `R`.

```dojo
    <div id="multiviewcalendar"></div>
    <script>
    $("#multiviewcalendar").kendoMultiViewCalendar({
        kendoKeydown: function(e) {
            var cal = e.sender;
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN ||
                e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 76) {
                e.preventKendoKeydown = true;
                var d = new Date(cal.current());
                d.setDate(d.getDate() - 1);
                cal.navigate(d, "month");
            }

            if (e.keyCode === 82) {
                e.preventKendoKeydown = true;
                var d = new Date(cal.current());
                d.setDate(d.getDate() + 1);
                cal.navigate(d, "month");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds a `Ctrl+Shift+Y` shortcut to jump to the year view for the current date. 

```dojo
    <div id="multiviewcalendar"></div>
    <script>
    $("#multiviewcalendar").kendoMultiViewCalendar({
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.shiftKey && e.keyCode === 89) { // Ctrl+Shift+Y
                e.preventKendoKeydown = true;
                e.sender.navigate(new Date(), "year");
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [MultiViewCalendar Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/multiviewcalendar/keyboard-navigation) and the [Keyboard Navigation article]({% slug keyboard_navigation_multiviewcalendar %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the MultiViewCalendar]({% slug keyboard_navigation_multiviewcalendar %})
* [Accessibility in the MultiViewCalendar]({% slug jquery_multiviewcalendar_accessibility %})
