---
title: Custom Key Handling
page_title: jQuery Wizard Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Wizard by Kendo UI using the kendoKeydown event."
components: ["wizard"]
slug: custom_keynav_wizard_kendoui
position: 3
---

# Custom Key Handling

The Wizard exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Wizard is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the Wizard instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Wizard from running its own handler for this key press.

## Overriding a Built-In Key Combination

The Wizard uses `Arrow Left` and `Arrow Right` to navigate between steps. The following example replaces them with `L` and `R`.

```dojo
    <div id="wizard"></div>
    <script>
    $("#wizard").kendoWizard({
        steps: [
            { title: "Account", content: "Step 1 content" },
            { title: "Details", content: "Step 2 content" },
            { title: "Confirm", content: "Step 3 content" }
        ],
        kendoKeydown: function(e) {
            var keys = kendo.keys;
            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 76) {
                e.preventKendoKeydown = true;
                var step = e.sender.activeStep();
                if (step > 0) { e.sender.select(step - 1); }
            }

            if (e.keyCode === 82) {
                e.preventKendoKeydown = true;
                var step = e.sender.activeStep();
                e.sender.select(step + 1);
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Home` and `End` shortcuts to jump to the first and last steps.

```dojo
    <div id="wizard"></div>
    <script>
    $("#wizard").kendoWizard({
        steps: [
            { title: "Account", content: "Step 1 content" },
            { title: "Details", content: "Step 2 content" },
            { title: "Confirm", content: "Step 3 content" }
        ],
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.HOME) {
                e.sender.select(0);
            }

            if (e.keyCode === kendo.keys.END) {
                e.sender.select(e.sender.steps().length - 1);
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Wizard Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/wizard/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_wizard_jquery %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the Wizard]({% slug keynav_wizard_jquery %})
* [Accessibility in the Wizard]({% slug jquery_wizard_accessibility %})
