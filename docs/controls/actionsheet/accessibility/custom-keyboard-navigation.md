---
title: Custom Key Handling
page_title: jQuery ActionSheet Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery ActionSheet by Kendo UI using the kendoKeydown event."
components: ["actionsheet"]
slug: custom_keynav_actionsheet_kendoui
position: 3
---

# Custom Key Handling

The ActionSheet exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When a focused ActionSheet item receives keyboard input, the `kendoKeydown` event fires before the ActionSheet runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the ActionSheet instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the ActionSheet from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The following example demonstrates how to replace the default `Escape` key behavior with the `Q` key to close the ActionSheet.

```dojo
    <div id="actionsheet"></div>
    <script>
    $("#actionsheet").kendoActionSheet({
        title: "Actions",
        items: [{ text: "Edit" }, { text: "Delete" }, { text: "Export" }],
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.ESC) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 81) { // 'Q'
                e.preventKendoKeydown = true;
                e.sender.close();
            }
        }
    });
    $("#actionsheet").data("kendoActionSheet").open();
    </script>
```

## Adding a Custom Key Combination

The following example demonstrates how to add a `Ctrl+A` shortcut to select all action items' text.

```dojo
    <div id="actionsheet"></div>
    <script>
    $("#actionsheet").kendoActionSheet({
        title: "Actions",
        items: [{ text: "Edit" }, { text: "Delete" }, { text: "Export" }],
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === 65) { // Ctrl+A
                e.preventKendoKeydown = true;
                var items = e.sender.options.items;
                console.log("All actions:", items.map(function(i) { return i.text; }).join(", "));
            }
        }
    });
    $("#actionsheet").data("kendoActionSheet").open();
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [ActionSheet Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/actionsheet/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_actionsheet_jquery %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the ActionSheet]({% slug jquery_actionsheet_accessibility %})
