---
title: Custom Key Handling
page_title: jQuery ExpansionPanel Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery ExpansionPanel by Kendo UI using the kendoKeydown event."
components: ["expansionpanel"]
slug: custom_keynav_expansionpanel_kendoui
position: 2
---

# Custom Key Handling

The ExpansionPanel exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the ExpansionPanel is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the ExpansionPanel instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the ExpansionPanel from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example demonstrates how to replace the default `Enter` key behavior so that only `Space` toggles the ExpansionPanel.

```dojo
    <div id="expansionpanel">Panel content</div>
    <script>
    $("#expansionpanel").kendoExpansionPanel({
        title: "Details",
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.ENTER) {
                e.preventKendoKeydown = true;
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example demonstrates how to add the `O` key to toggle the ExpansionPanel open or closed.

```dojo
    <div id="expansionpanel">Panel content</div>
    <script>
    $("#expansionpanel").kendoExpansionPanel({
        title: "Details",
        kendoKeydown: function(e) {
            if (e.keyCode === 79) { // 'O'
                e.sender.toggle();
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the ExpansionPanel]({% slug jquery_expansionpanel_accessibility %})
