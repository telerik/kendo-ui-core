---
title: Custom Key Handling
page_title: jQuery TabStrip Documentation - Custom Key Handling
description: "Learn how to customize the key handling of the jQuery TabStrip by Kendo UI using the kendoKeydown event."
components: ["tabstrip"]
slug: custom_keynav_tabstrip_kendoui
position: 3
---

# Custom Key Handling

The TabStrip exposes a `kendoKeydown` event that lets you intercept keyboard interactions before the component's built-in behavior runs.

For the list of all components that support `kendoKeydown`, refer to [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %}).

## How It Works

When a focused TabStrip tab receives keyboard input, the `kendoKeydown` event fires before the TabStrip runs its own keyboard handler. The event argument (`e`) exposes:

* `e.sender` — the TabStrip instance.
* `e.keyCode` — the code of the pressed key.
* `e.preventKendoKeydown` — set to `true` to prevent the TabStrip from running its own keyboard handler for this key press.

## Overriding a Built-In Key Combination

The TabStrip uses `Arrow Left` and `Arrow Right` to navigate between tabs. The following example replaces them with `L` and `R`.

```dojo
    <div id="tabstrip">
        <ul>
            <li class="k-active">Tab 1</li>
            <li>Tab 2</li>
            <li>Tab 3</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
        <div>Content 3</div>
    </div>
    <script>
    $("#tabstrip").kendoTabStrip({
        kendoKeydown: function(e) {
            var ts = e.sender;
            var keys = kendo.keys;

            if (e.keyCode === keys.LEFT || e.keyCode === keys.RIGHT) {
                e.preventKendoKeydown = true;
            }

            var tabs = ts.tabGroup.children(".k-item");
            var activeIndex = tabs.index(ts.select());

            if (e.keyCode === 76) {
                e.preventKendoKeydown = true;
                if (activeIndex > 0) { ts.activateTab(tabs.eq(activeIndex - 1)); }
            }

            if (e.keyCode === 82) {
                e.preventKendoKeydown = true;
                if (activeIndex < tabs.length - 1) { ts.activateTab(tabs.eq(activeIndex + 1)); }
            }
        }
    });
    </script>
```

## Adding a Custom Key Combination

The following example adds digit keys `1`-`3` to select tabs by position.

```dojo
    <div id="tabstrip">
        <ul>
            <li class="k-active">Tab 1</li>
            <li>Tab 2</li>
            <li>Tab 3</li>
        </ul>
        <div>Content 1</div>
        <div>Content 2</div>
        <div>Content 3</div>
    </div>
    <script>
    $("#tabstrip").kendoTabStrip({
        kendoKeydown: function(e) {
            if (e.keyCode >= 49 && e.keyCode <= 51) {
                var idx = e.keyCode - 49;
                e.sender.activateTab(e.sender.tabGroup.children(".k-item").eq(idx));
            }
        }
    });
    </script>
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [TabStrip Keyboard Navigation Demo](https://demos.telerik.com/kendo-ui/tabstrip/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_tabstrip %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_nav_kendoui %})
* [Keyboard Navigation by the TabStrip]({% slug keynav_tabstrip %})
* [Accessibility in the TabStrip]({% slug jquery_tabstrip_accessibility %})
