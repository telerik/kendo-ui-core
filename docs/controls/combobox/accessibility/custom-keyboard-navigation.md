---
title: Custom Key Handling
page_title: jQuery ComboBox Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery ComboBox by Kendo UI using the kendoKeydown event to override built-in key mappings and add custom key combinations."
components: ["combobox"]
slug: custom_keynav_combobox_kendoui
position: 3
---

# Custom Key Handling

The ComboBox exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs. You can use this event to override existing key mappings or to introduce completely new key combinations.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the ComboBox input is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the ComboBox instance.
* `e.keyCode` — the code of the pressed key. Use the `kendo.keys` constants for readable comparisons.
* `e.preventKendoKeydown` — set to `true` to prevent the ComboBox from running its own handler for this key press.

## Overriding a Built-In Key Combination

The ComboBox uses `Arrow Up` and `Arrow Down` to navigate through items in the popup list. The following example replaces them with the `U` and `D` keys. When one of these keys is pressed while the popup is closed, the popup opens first. The `e.preventDefault()` call prevents the letter from being typed in the input.

```dojo
    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        dataSource: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"],
        kendoKeydown: function(e) {
            var cb = e.sender;
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 85) { // 'U'
                e.preventKendoKeydown = true;
                e.preventDefault();
                if (!cb.popup.visible()) {
                    cb.open();
                }
                var current = cb.select();
                if (current > 0) {
                    cb.select(current - 1);
                }
            }

            if (e.keyCode === 68) { // 'D'
                e.preventKendoKeydown = true;
                e.preventDefault();
                if (!cb.popup.visible()) {
                    cb.open();
                }
                var current = cb.select();
                if (current < cb.dataSource.total() - 1) {
                    cb.select(current + 1);
                }
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Home` and `End` shortcuts to jump to the first and last items in the list.

```dojo
    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        dataSource: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"],
        kendoKeydown: function(e) {
            var cb = e.sender;

            if (e.keyCode === kendo.keys.HOME) {
                e.preventKendoKeydown = true;
                cb.select(0);
            }

            if (e.keyCode === kendo.keys.END) {
                e.preventKendoKeydown = true;
                cb.select(cb.dataSource.total() - 1);
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [ComboBox Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/combobox/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_kendoui_combobox_widget %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the ComboBox]({% slug keynav_kendoui_combobox_widget %})
* [Accessibility in the ComboBox]({% slug jquery_combobox_accessibility %})
