---
title: Custom Key Handling
page_title: jQuery Splitter Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery Splitter by Kendo UI using the kendoKeydown event."
components: ["splitter"]
slug: custom_keynav_splitter_kendoui
position: 2
---

# Custom Key Handling

The Splitter exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When the Splitter is focused and the user presses a key, the `kendoKeydown` event fires. The event argument (`e`) exposes:

* `e.sender` — the Splitter instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the Splitter from running its own handler for this key press.

## Overriding a Built-In Key Combination

The Splitter uses `Arrow Left` and `Arrow Right` to resize panes. The following example replaces them with `L` and `R`.

```dojo
    <div id="splitter">
        <div>Pane 1</div>
        <div>Pane 2</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
        panes: [{ size: "50%" }, { size: "50%" }],
        kendoKeydown: function(e) {
            var keys = kendo.keys;
            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            var splitbar = e.sender.element.find(".k-splitbar");
            if (e.keyCode === 76) {
                e.preventKendoKeydown = true;
                e.sender.size(splitbar.prev(), parseInt(splitbar.prev().css("width"), 10) - 20 + "px");
            }

            if (e.keyCode === 82) {
                e.preventKendoKeydown = true;
                e.sender.size(splitbar.prev(), parseInt(splitbar.prev().css("width"), 10) + 20 + "px");
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds `Ctrl+E` to equalize pane sizes.

```dojo
    <div id="splitter">
        <div>Pane 1</div>
        <div>Pane 2</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
        panes: [{ size: "50%" }, { size: "50%" }],
        kendoKeydown: function(e) {
            if (e.ctrlKey && e.keyCode === 69) {
                var panes = e.sender.element.children(".k-pane");
                var size = (100 / panes.length) + "%";
                panes.each(function() {
                    e.sender.size($(this), size);
                });
            }
        }
    });
    </script>
```

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Accessibility in the Splitter]({% slug jquery_splitter_accessibility %})
