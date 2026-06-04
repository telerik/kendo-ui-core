---
title: Custom Key Handling
page_title: jQuery DropDownList Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery DropDownList by Kendo UI using the kendoKeydown event to override built-in key mappings and add custom key combinations."
components: ["dropdownlist"]
slug: custom_keynav_ddl_kendoui
position: 3
---

# Custom Key Handling

The DropDownList exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs. You can use this event to override existing key mappings or to introduce completely new key combinations.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the DropDownList is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the DropDownList instance.
* `e.keyCode` — the code of the pressed key. Use the `kendo.keys` constants for readable comparisons.
* `e.preventKendoKeydown` — set to `true` to prevent the DropDownList from running its own handler for this key press.

## Overriding a Built-In Key Combination

The DropDownList uses `Arrow Up` and `Arrow Down` to navigate through its items. The following example replaces them with the `U` and `D` keys. When one of these keys is pressed while the popup is closed, the popup opens first.

```dojo
    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        dataSource: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"],
        kendoKeydown: function(e) {
            var ddl = e.sender;
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 85) { // 'U'
                e.preventKendoKeydown = true;
                if (!ddl.popup.visible()) {
                    ddl.open();
                }
                var current = ddl.select();
                if (current > 0) {
                    ddl.select(current - 1);
                }
            }

            if (e.keyCode === 68) { // 'D'
                e.preventKendoKeydown = true;
                if (!ddl.popup.visible()) {
                    ddl.open();
                }
                var current = ddl.select();
                if (current < ddl.dataSource.total() - 1) {
                    ddl.select(current + 1);
                }
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Home` and `End` shortcuts that select the first and last items in the list. These shortcuts do not conflict with any built-in DropDownList key.

```dojo
    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        dataSource: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"],
        kendoKeydown: function(e) {
            var ddl = e.sender;

            if (e.keyCode === kendo.keys.HOME) {
                e.preventKendoKeydown = true;
                ddl.select(0);
            }

            if (e.keyCode === kendo.keys.END) {
                e.preventKendoKeydown = true;
                ddl.select(ddl.dataSource.total() - 1);
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [DropDownList Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/dropdownlist/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_kendoui_ddl_widget %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the DropDownList]({% slug keynav_kendoui_ddl_widget %})
* [Accessibility in the DropDownList]({% slug jquery_dropdownlist_accessibility %})
