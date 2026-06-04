---
title: Custom Key Handling
page_title: jQuery AutoComplete Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery AutoComplete by Kendo UI using the kendoKeydown event to override built-in key mappings and add custom key combinations."
components: ["autocomplete"]
slug: custom_keynav_autocomplete_kendoui
position: 3
---

# Custom Key Handling

The AutoComplete exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs. You can use this event to override existing key mappings or to introduce completely new key combinations.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the AutoComplete input receives keyboard input, the `kendoKeydown` event fires before the AutoComplete runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the AutoComplete instance.
* `e.keyCode` — the code of the pressed key. Use the `kendo.keys` constants for readable comparisons.
* `e.preventKendoKeydown` — set to `true` to prevent the AutoComplete from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The AutoComplete uses `Arrow Up` and `Arrow Down` to highlight suggestions in the popup list. The following example replaces them with the `U` and `D` keys. When one of these keys is pressed while the popup is closed, the popup opens first. The `e.preventDefault()` call prevents the letter from being typed in the input.

```dojo
    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataSource: ["Albania", "Andorra", "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus"],
        kendoKeydown: function(e) {
            var ac = e.sender;
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 85) { // 'U'
                e.preventKendoKeydown = true;
                e.preventDefault();
                if (!ac.popup.visible()) {
                    ac.search(ac.value());
                }
                var items = ac.ul.children(".k-list-item");
                var focused = ac.listView.focus();
                if (focused) {
                    var idx = items.index(focused);
                    if (idx > 0) {
                        ac.listView.focusPrev();
                    }
                } else if (items.length) {
                    ac.listView.focusLast();
                }
            }

            if (e.keyCode === 68) { // 'D'
                e.preventKendoKeydown = true;
                e.preventDefault();
                if (!ac.popup.visible()) {
                    ac.search(ac.value());
                }
                var items = ac.ul.children(".k-list-item");
                var focused = ac.listView.focus();
                if (focused) {
                    var idx = items.index(focused);
                    if (idx < items.length - 1) {
                        ac.listView.focusNext();
                    }
                } else if (items.length) {
                    ac.listView.focusFirst();
                }
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds a `Ctrl+Delete` shortcut that clears the AutoComplete input. This shortcut does not conflict with any built-in AutoComplete key.

```dojo
    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataSource: ["Albania", "Andorra", "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus"],
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === kendo.keys.DELETE) {
                e.sender.value("");
                e.sender.close();
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [AutoComplete Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/autocomplete/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_kendoui_autocomplete_widget %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the AutoComplete]({% slug keynav_kendoui_autocomplete_widget %})
* [Accessibility in the AutoComplete]({% slug jquery_autocomplete_accessibility %})
