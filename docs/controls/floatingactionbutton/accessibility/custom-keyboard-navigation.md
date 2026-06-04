---
title: Custom Key Handling
page_title: jQuery FloatingActionButton Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery FloatingActionButton by Kendo UI using the kendoKeydown event."
components: ["floatingactionbutton"]
slug: custom_keynav_floatingactionbutton_kendoui
position: 3
---

# Custom Key Handling

The FloatingActionButton exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the FloatingActionButton is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the FloatingActionButton instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the FloatingActionButton from running its own handler for this key press.

## Overriding a Built-In Key Combination

The FloatingActionButton uses `Enter` to activate items. The following example replaces `Enter` with `Space` only.

```dojo
    <div id="fab"></div>
    <script>
    $("#fab").kendoFloatingActionButton({
        icon: "plus",
        items: [
            { icon: "edit", label: "Edit" },
            { icon: "delete", label: "Delete" }
        ],
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.ENTER) {
                e.preventKendoKeydown = true;
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds a `Q` key shortcut to close the speed dial.

```dojo
    <div id="fab"></div>
    <script>
    $("#fab").kendoFloatingActionButton({
        icon: "plus",
        items: [
            { icon: "edit", label: "Edit" },
            { icon: "delete", label: "Delete" }
        ],
        kendoKeydown: function(e) {
            if (e.keyCode === 81) {
                e.sender.element.closest(".k-fab").find(".k-fab-items").hide();
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [FloatingActionButton Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/floatingactionbutton/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_floatingactionbutton_jquery %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the FloatingActionButton]({% slug keynav_floatingactionbutton_jquery %})
* [Accessibility in the FloatingActionButton]({% slug jquery_floatingactionbutton_accessibility %})
