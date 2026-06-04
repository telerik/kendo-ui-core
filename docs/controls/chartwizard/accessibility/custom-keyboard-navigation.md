---
title: Custom Key Handling
page_title: jQuery ChartWizard Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery ChartWizard by Kendo UI using the kendoKeydown event."
components: ["chartwizard"]
slug: custom_keynav_chartwizard_kendoui
position: 3
---

# Custom Key Handling

The ChartWizard exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the ChartWizard is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the ChartWizard instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the ChartWizard from running its own handler for this key press.

## Overriding a Built-In Key Combination

The following example demonstrates how to replace the default `Escape` key behavior with the `Q` key.

```dojo
    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
        dataSource: [{ category: "A", value: 1 }, { category: "B", value: 2 }],
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.ESC) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 81) { // 'Q'
                e.preventKendoKeydown = true;
                console.log("Custom close action");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example demonstrates how to add a `Ctrl+E` shortcut to trigger an export action.

```dojo
    <div id="chartwizard"></div>
    <script>
    $("#chartwizard").kendoChartWizard({
        dataSource: [{ category: "A", value: 1 }, { category: "B", value: 2 }],
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === 69) { // Ctrl+E
                console.log("Chart export triggered");
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [ChartWizard Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/chartwizard/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_chartwizard_jquery %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the ChartWizard]({% slug jquery_chartwizard_accessibility %})
