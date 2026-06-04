---
title: Custom Key Handling
page_title: jQuery Rating Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Rating by Kendo UI using the kendoKeydown event."
components: ["rating"]
slug: custom_keynav_rating_kendoui
position: 3
---

# Custom Key Handling

The Rating exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Rating is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the Rating instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Rating from running its own handler for this key press.

## Overriding a Built-In Key Combination

The Rating uses `Arrow Left` and `Arrow Right` to change the value. The following example replaces them with `L` and `R`.

```dojo
    <input id="rating" />
    <script>
    $("#rating").kendoRating({
        min: 1,
        max: 5,
        value: 3,
        kendoKeydown: function(e) {
            var keys = kendo.keys;

            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 76) {
                e.preventKendoKeydown = true;
                var val = e.sender.value();
                if (val > e.sender.options.min) { e.sender.value(val - 1); }
            }

            if (e.keyCode === 82) {
                e.preventKendoKeydown = true;
                var val = e.sender.value();
                if (val < e.sender.options.max) { e.sender.value(val + 1); }
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds digit keys `1`-`5` to set the rating directly.

```dojo
    <input id="rating" />
    <script>
    $("#rating").kendoRating({
        min: 1,
        max: 5,
        value: 3,
        kendoKeydown: function(e) {
            if (e.keyCode >= 49 && e.keyCode <= 53) {
                e.sender.value(e.keyCode - 48);
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Rating Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/rating/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_kendoui_rating_widget %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the Rating]({% slug keynav_kendoui_rating_widget %})
* [Accessibility in the Rating]({% slug jquery_rating_accessibility %})
