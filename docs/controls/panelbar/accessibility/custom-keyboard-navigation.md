---
title: Custom Key Handling
page_title: jQuery PanelBar Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery PanelBar by Kendo UI using the kendoKeydown event."
components: ["panelbar"]
slug: custom_keynav_panelbar_kendoui
position: 2
---

# Custom Key Handling

The PanelBar exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When a focused PanelBar item receives keyboard input, the `kendoKeydown` event fires before the PanelBar runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the PanelBar instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the PanelBar from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The PanelBar uses `Arrow Up` and `Arrow Down` to navigate items. The following example replaces them with `U` and `D`.

```dojo
    <ul id="panelbar">
        <li>Item 1<ul><li>Sub 1</li></ul></li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
    <script>
    $("#panelbar").kendoPanelBar({
        kendoKeydown: function(e) {
            var keys = kendo.keys;

            if (e.keyCode === keys.UP || e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            var focused = $(document.activeElement).closest(".k-panelbar-item");
            if (e.keyCode === 85) {
                e.preventKendoKeydown = true;
                focused.prev(".k-panelbar-item").find("> .k-link").trigger("focus");
            }

            if (e.keyCode === 68) {
                e.preventKendoKeydown = true;
                focused.next(".k-panelbar-item").find("> .k-link").trigger("focus");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Home` and `End` shortcuts to jump to the first and last item.

```dojo
    <ul id="panelbar">
        <li>Item 1<ul><li>Sub 1</li></ul></li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
    <script>
    $("#panelbar").kendoPanelBar({
        kendoKeydown: function(e) {
            var pb = e.sender;
            if (e.keyCode === kendo.keys.HOME) {
                pb.element.find("> .k-panelbar-item:first > .k-link").trigger("focus");
            }

            if (e.keyCode === kendo.keys.END) {
                pb.element.find("> .k-panelbar-item:last > .k-link").trigger("focus");
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the PanelBar]({% slug jquery_panelbar_accessibility %})
