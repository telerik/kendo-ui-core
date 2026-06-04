---
title: Custom Key Handling
page_title: jQuery Stepper Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Stepper by Kendo UI using the kendoKeydown event to override built-in key mappings and add custom key combinations."
components: ["stepper"]
slug: custom_keynav_stepper_kendoui
position: 3
---

# Custom Key Handling

The Stepper exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs. You can use this event to override existing key mappings or to introduce completely new key combinations.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When a focused Stepper step receives keyboard input, the `kendoKeydown` event fires before the Stepper runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the Stepper instance.
* `e.keyCode` — the code of the pressed key. Use the `kendo.keys` constants for readable comparisons.
* `e.preventKendoKeydown` — set to `true` to prevent the Stepper from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The Stepper uses `Arrow Left` and `Arrow Right` to navigate between steps. The following example replaces them with the `L` and `R` keys.

```dojo
    <nav id="stepper"></nav>
    <script>
    $("#stepper").kendoStepper({
        steps: [
            { label: "Account" },
            { label: "Details" },
            { label: "Confirm" }
        ],
        kendoKeydown: function(e) {
            var stepper = e.sender;
            var keys = kendo.keys;

            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            var focusedStep = $(document.activeElement).closest(".k-step");
            var focusedIndex = focusedStep.index();
            var stepsCount = stepper.steps().length;

            if (e.keyCode === 76) { // 'L'
                e.preventKendoKeydown = true;
                if (focusedIndex > 0) {
                    stepper.wrapper
                        .find(".k-step").eq(focusedIndex - 1)
                        .find(".k-step-link").trigger("focus");
                }
            }

            if (e.keyCode === 82) { // 'R'
                e.preventKendoKeydown = true;
                if (focusedIndex < stepsCount - 1) {
                    stepper.wrapper
                        .find(".k-step").eq(focusedIndex + 1)
                        .find(".k-step-link").trigger("focus");
                }
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Home` and `End` shortcuts that jump to the first and last steps.

```dojo
    <nav id="stepper"></nav>
    <script>
    $("#stepper").kendoStepper({
        steps: [
            { label: "Account" },
            { label: "Details" },
            { label: "Confirm" }
        ],
        kendoKeydown: function(e) {
            var stepper = e.sender;

            if (e.keyCode === kendo.keys.HOME) {
                stepper.wrapper.find(".k-step:first .k-step-link").trigger("focus");
            }

            if (e.keyCode === kendo.keys.END) {
                stepper.wrapper.find(".k-step:last .k-step-link").trigger("focus");
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Stepper Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/stepper/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_stepper_jquery %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the Stepper]({% slug keynav_stepper_jquery %})
* [Accessibility in the Stepper]({% slug jquery_stepper_accessibility %})
