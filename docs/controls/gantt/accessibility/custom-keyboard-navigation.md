---
title: Custom Key Handling
page_title: jQuery Gantt Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Gantt by Kendo UI using the kendoKeydown event."
components: ["gantt"]
slug: custom_keynav_gantt_kendoui
position: 2
---

# Custom Key Handling

The Gantt exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Gantt list or timeline receives keyboard input, the `kendoKeydown` event fires before the Gantt runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the Gantt instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Gantt from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The Gantt uses `Arrow Up` and `Arrow Down` to navigate tasks. The following example replaces them with `U` and `D`.

```dojo
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, orderId: 1, title: "Task 1", start: new Date("2024-01-01"), end: new Date("2024-01-05") },
            { id: 2, orderId: 2, title: "Task 2", start: new Date("2024-01-06"), end: new Date("2024-01-10") }
        ],
        views: ["week"],
        kendoKeydown: function(e) {
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            var gantt = e.sender;
            var selected = $(gantt.select());

            if (e.keyCode === 85) {
                e.preventKendoKeydown = true;
                var prev = selected.prev("tr");
                if (prev.length) { gantt.select(prev); }
            }

            if (e.keyCode === 68) {
                e.preventKendoKeydown = true;
                var next = selected.next("tr");
                if (next.length) { gantt.select(next); }
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds a `T` key shortcut to navigate to today.

```dojo
    <div id="gantt"></div>
    <script>
    $("#gantt").kendoGantt({
        dataSource: [
            { id: 1, orderId: 1, title: "Task 1", start: new Date("2024-01-01"), end: new Date("2024-01-05") }
        ],
        views: ["week"],
        kendoKeydown: function(e) {
            if (e.keyCode === 84) {
                e.sender.date(new Date());
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the Gantt]({% slug jquery_gantt_accessibility %})
