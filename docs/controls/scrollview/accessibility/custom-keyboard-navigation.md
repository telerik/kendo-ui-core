---
title: Custom Key Handling
page_title: jQuery ScrollView Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery ScrollView by Kendo UI using the kendoKeydown event."
components: ["scrollview"]
slug: custom_keynav_scrollview_kendoui
position: 2
---

# Custom Key Handling

The ScrollView exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the ScrollView is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the ScrollView instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the ScrollView from running its own handler for this key press.

## Overriding a Built-In Key Combination

The ScrollView uses `Arrow Left` and `Arrow Right` to navigate pages. The following example replaces them with `L` and `R`.

```dojo
    <div id="scrollview" style="width:300px;height:200px;">
        <div data-role="page"><h1>Page 1</h1></div>
        <div data-role="page"><h1>Page 2</h1></div>
        <div data-role="page"><h1>Page 3</h1></div>
    </div>
    <script>
    $("#scrollview").kendoScrollView({
        contentHeight: "100%",
        kendoKeydown: function(e) {
            var keys = kendo.keys;
            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            if (e.keyCode === 76) {
                e.preventKendoKeydown = true;
                e.sender.prev();
            }

            if (e.keyCode === 82) {
                e.preventKendoKeydown = true;
                e.sender.next();
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Home` and `End` shortcuts to navigate to the first and last pages.

```dojo
    <div id="scrollview" style="width:300px;height:200px;">
        <div data-role="page"><h1>Page 1</h1></div>
        <div data-role="page"><h1>Page 2</h1></div>
        <div data-role="page"><h1>Page 3</h1></div>
    </div>
    <script>
    $("#scrollview").kendoScrollView({
        contentHeight: "100%",
        kendoKeydown: function(e) {
            if (e.keyCode === kendo.keys.HOME) {
                e.sender.scrollTo(0);
            }

            if (e.keyCode === kendo.keys.END) {
                e.sender.scrollTo(e.sender.element.find("[data-role='page']").length - 1);
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the ScrollView]({% slug jquery_scrollview_accessibility %})
