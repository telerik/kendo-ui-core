---
title: Custom Key Handling
page_title: jQuery Breadcrumb Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Breadcrumb by Kendo UI using the kendoKeydown event."
components: ["breadcrumb"]
slug: custom_keynav_breadcrumb_kendoui
position: 3
---

# Custom Key Handling

The Breadcrumb exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Breadcrumb wrapper or editable input receives keyboard input, the `kendoKeydown` event fires before the Breadcrumb runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the Breadcrumb instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Breadcrumb from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The following example demonstrates how to replace the default `Arrow Left`/`Arrow Right` keys with `L` and `R` for crumb navigation.

```dojo
    <nav id="breadcrumb"></nav>
    <script>
    $("#breadcrumb").kendoBreadcrumb({
        items: [
            { type: "rootitem", text: "Home", href: "/" },
            { text: "Products", href: "/products" },
            { text: "Details", href: "/products/1" }
        ],
        kendoKeydown: function(e) {
            var keys = kendo.keys;

            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            var focused = $(document.activeElement);
            if (e.keyCode === 76) { // 'L'
                e.preventKendoKeydown = true;
                focused.closest(".k-breadcrumb-item").prev(".k-breadcrumb-item")
                    .find("a,span[tabindex]").trigger("focus");
            }

            if (e.keyCode === 82) { // 'R'
                e.preventKendoKeydown = true;
                focused.closest(".k-breadcrumb-item").next(".k-breadcrumb-item")
                    .find("a,span[tabindex]").trigger("focus");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example demonstrates how to add the `Home` key to jump to the root crumb.

```dojo
    <nav id="breadcrumb"></nav>
    <script>
    $("#breadcrumb").kendoBreadcrumb({
        items: [
            { type: "rootitem", text: "Home", href: "/" },
            { text: "Products", href: "/products" },
            { text: "Details", href: "/products/1" }
        ],
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.HOME) {
                e.sender.element.find(".k-breadcrumb-item:first a").trigger("focus");
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Breadcrumb Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/breadcrumb/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_kendoui_breadcrumb_widget %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the Breadcrumb]({% slug jquery_breadcrumb_accessibility %})
