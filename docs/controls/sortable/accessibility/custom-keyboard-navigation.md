---
title: Custom Key Handling
page_title: jQuery Sortable Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Sortable by Kendo UI using the kendoKeydown event."
components: ["sortable"]
slug: custom_keynav_sortable_kendoui
position: 3
---

# Custom Key Handling

The Sortable exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Sortable is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the Sortable instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Sortable from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example replaces `Arrow Up` and `Arrow Down` with `U` and `D` for reordering items.

```dojo
    <ul id="sortable">
        <li class="k-listview-item">Item 1</li>
        <li class="k-listview-item">Item 2</li>
        <li class="k-listview-item">Item 3</li>
    </ul>
    <script>
    $("#sortable").kendoSortable({
        navigatable: true,
        kendoKeydown: function(e) {
            var keys = kendo.keys;
            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            var focused = $(document.activeElement);
            if (e.keyCode === 85) {
                e.preventKendoKeydown = true;
                var prev = focused.prev();
                if (prev.length) { focused.insertBefore(prev); focused.trigger("focus"); }
            }

            if (e.keyCode === 68) {
                e.preventKendoKeydown = true;
                var next = focused.next();
                if (next.length) { focused.insertAfter(next); focused.trigger("focus"); }
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Home` and `End` shortcuts to move an item to the first or last position.

```dojo
    <ul id="sortable">
        <li class="k-listview-item">Item 1</li>
        <li class="k-listview-item">Item 2</li>
        <li class="k-listview-item">Item 3</li>
    </ul>
    <script>
    $("#sortable").kendoSortable({
        navigatable: true,
        kendoKeydown: function(e) {
            var focused = $(document.activeElement);
            if (e.keyCode === kendo.keys.HOME) {
                focused.prependTo(focused.parent());
                focused.trigger("focus");
            }

            if (e.keyCode === kendo.keys.END) {
                focused.appendTo(focused.parent());
                focused.trigger("focus");
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Sortable Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/sortable/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_kendoui_sortable %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the Sortable]({% slug keynav_kendoui_sortable %})
* [Accessibility in the Sortable]({% slug jquery_sortable_accessibility %})
