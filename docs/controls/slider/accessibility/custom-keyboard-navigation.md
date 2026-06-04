---
title: Custom Key Handling
page_title: jQuery Slider Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Slider by Kendo UI using the kendoKeydown event."
components: ["slider"]
slug: custom_keynav_slider_kendoui
position: 3
---

# Custom Key Handling

The Slider exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Slider is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the Slider instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Slider from running its own handler for this key press.

## Overriding a Built-In Key Combination

The Slider uses `Arrow` keys to change its value. The following example replaces `Arrow Left`/`Arrow Right` with `L`/`R`.

```dojo
    <input id="slider" />
    <script>
    $("#slider").kendoSlider({
        min: 0,
        max: 100,
        value: 50,
        smallStep: 5,
        kendoKeydown: function(e) {
            var keys = kendo.keys;
            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 76) {
                e.preventKendoKeydown = true;
                e.sender.value(e.sender.value() - e.sender.options.smallStep);
            }

            if (e.keyCode === 82) {
                e.preventKendoKeydown = true;
                e.sender.value(e.sender.value() + e.sender.options.smallStep);
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Home` and `End` shortcuts to set the Slider to its minimum and maximum values.

```dojo
    <input id="slider" />
    <script>
    $("#slider").kendoSlider({
        min: 0,
        max: 100,
        value: 50,
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.HOME) {
                e.sender.value(e.sender.options.min);
            }

            if (e.keyCode === kendo.keys.END) {
                e.sender.value(e.sender.options.max);
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Slider Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/slider/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_kendoui_slider %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the Slider]({% slug keynav_kendoui_slider %})
* [Accessibility in the Slider]({% slug jquery_slider_accessibility %})
