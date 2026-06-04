---
title: Custom Key Handling
page_title: jQuery Timeline Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Timeline by Kendo UI using the kendoKeydown event."
components: ["timeline"]
slug: custom_keynav_timeline_kendoui
position: 3
---

# Custom Key Handling

The Timeline exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When a focused Timeline item receives keyboard input, the `kendoKeydown` event fires before the Timeline runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the Timeline instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Timeline from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The Timeline uses `Arrow Left` and `Arrow Right` to navigate between events. The following example replaces them with `L` and `R`.

```dojo
    <div id="timeline"></div>
    <script>
    $("#timeline").kendoTimeline({
        dataSource: {
            data: [
                { date: new Date("2024-01-01"), title: "Event 1", description: "Description 1" },
                { date: new Date("2024-06-01"), title: "Event 2", description: "Description 2" }
            ],
            schema: { model: { fields: { date: { type: "date" } } } }
        },
        kendoKeydown: function(e) {
            var keys = kendo.keys;
            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            var focused = $(document.activeElement).closest(".k-timeline-event");
            if (e.keyCode === 76) {
                e.preventKendoKeydown = true;
                focused.prev(".k-timeline-event").trigger("focus");
            }

            if (e.keyCode === 82) {
                e.preventKendoKeydown = true;
                focused.next(".k-timeline-event").trigger("focus");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Home` and `End` shortcuts to jump to the first and last events.

```dojo
    <div id="timeline"></div>
    <script>
    $("#timeline").kendoTimeline({
        dataSource: {
            data: [
                { date: new Date("2024-01-01"), title: "Event 1", description: "Description 1" },
                { date: new Date("2024-06-01"), title: "Event 2", description: "Description 2" }
            ],
            schema: { model: { fields: { date: { type: "date" } } } }
        },
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.HOME) {
                e.sender.element.find(".k-timeline-event:first").trigger("focus");
            }

            if (e.keyCode === kendo.keys.END) {
                e.sender.element.find(".k-timeline-event:last").trigger("focus");
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Timeline Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/timeline/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_timeline_jquery %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the Timeline]({% slug keynav_timeline_jquery %})
* [Accessibility in the Timeline]({% slug jquery_timeline_accessibility %})
