---
title: Custom Key Handling
page_title: Custom Key Handling
description: "Learn how to customize the keyboard shortcuts of the Telerik UI Spreadsheet for {{ site.framework }} using the KendoKeydown event."
components: ["spreadsheet"]
slug: custom_keyboard_navigation_spreadsheet_htmlhelper
position: 3
---

# Custom Key Handling

The {{ site.product }} Spreadsheet wrappers expose the `KendoKeydown` event, which lets you intercept keyboard input before the built-in handler runs and customize how it responds to specific shortcuts.

For event details and the full list of supported wrappers, refer to [Custom Key Handling Overview]({% slug custom_keyboard_navigation_aspnet_wrappers %}).

## How It Works

When the Spreadsheet receives keyboard input, the `KendoKeydown` event fires before the built-in handler.

Use the following configuration to subscribe to the event:

```HtmlHelper
    .Events(events => events.KendoKeydown("onSpreadsheetKendoKeydown"))
```
{% if site.core %}
```TagHelper
    on-kendo-keydown="onSpreadsheetKendoKeydown"
```
{% endif %}

## Overriding a Built-In Key Combination

The following example shows the pattern for overriding a built-in shortcut of the Spreadsheet. Replace `kendo.keys.ENTER` with one of the built-in shortcuts that you want to take over.

```javascript
    function onSpreadsheetKendoKeydown(e) {
        if (e.keyCode === kendo.keys.ENTER) {
            e.preventKendoKeydown = true;
            console.log("Built-in shortcut overridden.");
        }
    }
```

## Adding a Custom Key Combination

The following example demonstrates how to add a new `Ctrl+Shift+X` shortcut for the Spreadsheet.

```javascript
    function onSpreadsheetKendoKeydown(e) {
        if (e.ctrlKey && e.shiftKey && e.keyCode === 88) {
            console.log("Custom shortcut activated.");
        }
    }
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Spreadsheet Keyboard Navigation Demo](https://demos.telerik.com/{{ site.platform }}/spreadsheet/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_aspnetcore_spreadsheet %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_navigation_aspnet_wrappers %})
* [Keyboard Navigation by the Spreadsheet for {{ site.framework }}]({% slug keynav_aspnetcore_spreadsheet %})
* [Accessibility in the Spreadsheet HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_spreadsheet_accessibility %})
