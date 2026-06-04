---
title: Custom Key Handling
page_title: jQuery MultiSelect Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery MultiSelect by Kendo UI using the kendoKeydown event to override built-in key mappings and add custom key combinations."
components: ["multiselect"]
slug: custom_keynav_multiselect_kendoui
position: 3
---

# Custom Key Handling

The MultiSelect exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs. You can use this event to override existing key mappings or to introduce completely new key combinations.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the MultiSelect input is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the MultiSelect instance.
* `e.keyCode` — the code of the pressed key. Use the `kendo.keys` constants for readable comparisons.
* `e.preventKendoKeydown` — set to `true` to prevent the MultiSelect from running its own handler for this key press.

## Overriding a Built-In Key Combination

The MultiSelect uses `Arrow Up` and `Arrow Down` to navigate the popup list. The following example replaces them with the `U` and `D` keys. When one of these keys is pressed while the popup is closed, the popup opens first. The `e.preventDefault()` call prevents the letter from being typed in the input.

```dojo
    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
        dataSource: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"],
        kendoKeydown: function(e) {
            var ms = e.sender;
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 85) { // 'U'
                e.preventKendoKeydown = true;
                e.preventDefault();
                if (!ms.popup.visible()) {
                    ms.open();
                }
                var items = ms.ul.children(".k-list-item");
                var focused = ms.listView.focus();
                if (focused) {
                    var idx = items.index(focused);
                    if (idx > 0) {
                        ms.listView.focusPrev();
                    }
                } else if (items.length) {
                    ms.listView.focusLast();
                }
            }

            if (e.keyCode === 68) { // 'D'
                e.preventKendoKeydown = true;
                e.preventDefault();
                if (!ms.popup.visible()) {
                    ms.open();
                }
                var items = ms.ul.children(".k-list-item");
                var focused = ms.listView.focus();
                if (focused) {
                    var idx = items.index(focused);
                    if (idx < items.length - 1) {
                        ms.listView.focusNext();
                    }
                } else if (items.length) {
                    ms.listView.focusFirst();
                }
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds a `Ctrl+Delete` shortcut that removes all selected items.

```dojo
    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
        dataSource: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"],
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === kendo.keys.DELETE) {
                e.preventKendoKeydown = true;
                e.sender.value([]);
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [MultiSelect Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/multiselect/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_multiselect %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the MultiSelect]({% slug keynav_multiselect %})
* [Accessibility in the MultiSelect]({% slug jquery_multiselect_accessibility %})
