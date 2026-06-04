---
title: Custom Key Handling
page_title: jQuery Filter Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Filter by Kendo UI using the kendoKeydown event."
components: ["filter"]
slug: custom_keynav_filter_kendoui
position: 3
---

# Custom Key Handling

The Filter exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Filter is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the Filter instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Filter from running its own handler for this key press.

## Overriding a Built-In Key Combination

The Filter uses `Escape` to close editors. The following example replaces `Escape` with `Q`.

```dojo
    <div id="filter"></div>
    <script>
    $("#filter").kendoFilter({
        dataSource: new kendo.data.DataSource({ data: [{ name: "Alice", age: 30 }] }),
        expression: { logic: "and", filters: [] },
        fields: [
            { name: "name", type: "string" },
            { name: "age", type: "number" }
        ],
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.ESC) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 81) {
                e.preventKendoKeydown = true;
                console.log("Custom close triggered");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds a `Ctrl+A` shortcut to apply the filter.

```dojo
    <div id="filter"></div>
    <script>
    var ds = new kendo.data.DataSource({ data: [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }] });
    $("#filter").kendoFilter({
        dataSource: ds,
        expression: { logic: "and", filters: [] },
        fields: [
            { name: "name", type: "string" },
            { name: "age", type: "number" }
        ],
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === 65) {
                e.preventKendoKeydown = true;
                e.sender.applyFilter();
                console.log("Filter applied");
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Filter Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/filter/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_filter_jquery %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the Filter]({% slug keynav_filter_jquery %})
* [Accessibility in the Filter]({% slug jquery_filter_accessibility %})
