---
title: Getting Started
page_title: jQuery FloatingToolBar Documentation - Getting Started
description: "Initialize the jQuery FloatingToolBar by Kendo UI, add ToolBar commands, and show the floating toolbar in a page."
components: ["floatingtoolbar"]
slug: getting_started_kendoui_floatingtoolbar_widget
position: 2
---

# Getting Started

This guide shows how to initialize a FloatingToolBar, add commands, and retrieve its widget instance.

## Create an Element

Add an empty `<div>` element for the widget.

```html
<div id="floatingtoolbar"></div>
```

## Initialize the FloatingToolBar

Configure the commands through the `items` option. Set `visible` to `true` to show the toolbar after initialization.

```html
<div id="floatingtoolbar"></div>

<script>
    $(document).ready(function () {
        $("#floatingtoolbar").kendoFloatingToolBar({
            visible: true,
            ariaLabel: "Text formatting",
            items: [
                { type: "button", text: "Bold", icon: "bold", togglable: true },
                { type: "button", text: "Italic", icon: "italic", togglable: true },
                { type: "separator" },
                { type: "button", text: "Insert Link", icon: "link" }
            ]
        });
    });
</script>
```

The `items` option uses the same command configuration as the hosted [ToolBar](/api/ui/toolbar/configuration/items). Set `showText: "overflow"` on an item when its text should appear only in the overflow menu while its icon remains on the toolbar.

## Retrieve the Widget Instance

Use `getKendoFloatingToolBar()` to retrieve the initialized instance. Call `show()` and `hide()` to control visibility after initialization.

```js
var floatingToolBar = $("#floatingtoolbar").getKendoFloatingToolBar();

floatingToolBar.hide();
floatingToolBar.show();
```

## Next Steps

* [Positioning of the FloatingToolBar]({% slug positioning_kendoui_floatingtoolbar_widget %})
* [Appearance of the FloatingToolBar]({% slug appearance_kendoui_floatingtoolbar_widget %})
* [Overflow in the FloatingToolBar]({% slug overflow_kendoui_floatingtoolbar_widget %})
* [Events of the FloatingToolBar]({% slug events_kendoui_floatingtoolbar_widget %})
* [Keyboard Navigation of the FloatingToolBar]({% slug keyboard_navigation_kendoui_floatingtoolbar_widget %})
* [Accessibility of the FloatingToolBar]({% slug accessibility_kendoui_floatingtoolbar_widget %})

## See Also

* [FloatingToolBar Overview]({% slug overview_kendoui_floatingtoolbar_widget %})
* [JavaScript API Reference](/api/ui/floatingtoolbar)