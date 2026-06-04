---
title: Custom Key Handling
page_title: jQuery Calendar Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Calendar by Kendo UI using the kendoKeydown event."
components: ["calendar"]
slug: custom_keynav_calendar_kendoui
position: 3
---

# Custom Key Handling

The Calendar exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Calendar is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the Calendar instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Calendar from running its own handler for this key press.

## Overriding a Built-In Key Combination

The Calendar uses `Arrow` keys to navigate between dates. The following example replaces `Arrow Up`, `Arrow Down`, `Arrow Left`, and `Arrow Right` with the `U`, `D`, `L`, and `R` keys.

```dojo
    <div id="calendar"></div>
    <script>
    $("#calendar").kendoCalendar({
        kendoKeydown: function(e) {
            var cal = e.sender;
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN ||
                e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 85) { // 'U' — one week back
                e.preventKendoKeydown = true;
                var d = new Date(cal.current());
                d.setDate(d.getDate() - 7);
                cal.navigate(d, "month");
            }

            if (e.keyCode === 68) { // 'D' — one week forward
                e.preventKendoKeydown = true;
                var d = new Date(cal.current());
                d.setDate(d.getDate() + 7);
                cal.navigate(d, "month");
            }

            if (e.keyCode === 76) { // 'L' — one day back
                e.preventKendoKeydown = true;
                var d = new Date(cal.current());
                d.setDate(d.getDate() - 1);
                cal.navigate(d, "month");
            }

            if (e.keyCode === 82) { // 'R' — one day forward
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

The following example adds a `Ctrl+Shift+Y` shortcut to jump to the year view for the current date. This key combination has no built-in meaning in the Calendar. The `T` key alone is already handled by the Calendar and should not be used for custom combinations.

```dojo
    <div id="calendar"></div>
    <script>
    $("#calendar").kendoCalendar({
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

For the full list of built-in keyboard shortcuts, see the [Calendar Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/calendar/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_calendar %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the Calendar]({% slug keynav_calendar %})
* [Accessibility in the Calendar]({% slug jquery_calendar_accessibility %})
