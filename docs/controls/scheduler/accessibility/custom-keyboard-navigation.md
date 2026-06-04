---
title: Custom Key Handling
page_title: jQuery Scheduler Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Scheduler by Kendo UI using the kendoKeydown event."
components: ["scheduler"]
slug: custom_keynav_scheduler_kendoui
position: 2
---

# Custom Key Handling

The Scheduler exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Scheduler view receives keyboard input, the `kendoKeydown` event fires before the Scheduler runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the Scheduler instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Scheduler from running its own keyboard handler for this key press.

The Scheduler keyboard navigation requires the `selectable` option to be set to `true`. By default, `selectable` is `false` and the Scheduler does not handle key presses for slot navigation.

## Overriding a Built-In Key Combination

The Scheduler uses `Arrow` keys to navigate between time slots. The following example replaces `Arrow Up` and `Arrow Down` with `U` and `D`.

```dojo
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2026-07-06"),
              selectable: true,
              views: ["week"],
              dataSource: [
          {
            id: 1,
            start: new Date("2026/7/6 08:00 AM"),
            end: new Date("2026/7/6 09:00 AM"),
            title: "Interview"
          },
          {
            id: 2,
            start: new Date("2026/7/8 08:00 AM"),
            end: new Date("2026/7/8 09:00 AM"),
            title: "Meeting"
          },
          {
            id: 3,
            start: new Date("2026/7/9 08:00 AM"),
            end: new Date("2026/7/9 09:00 AM"),
            title: "Main Meeting"
          }
        ],
        kendoKeydown: function(e) {
            var keys = kendo.keys;
            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            var scheduler = e.sender;
            var selection = scheduler._selection;

            if (e.keyCode === 85 && selection) {
                e.preventKendoKeydown = true;
                if (scheduler.view().moveToEvent(selection, true)) {
                    scheduler._select();
                }
            }

            if (e.keyCode === 68 && selection) {
                e.preventKendoKeydown = true;
                if (scheduler.view().moveToEvent(selection, false)) {
                    scheduler._select();
                }
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds a `T` key shortcut that navigates the Scheduler to today.

```dojo
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
        date: new Date("2024-01-01"),
        selectable: true,
        views: ["day"],
        dataSource: [],
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
* [Accessibility in the Scheduler]({% slug jquery_scheduler_accessibility %})
