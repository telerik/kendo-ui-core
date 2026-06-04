---
title: Custom Key Handling
page_title: Custom Key Handling
description: "Learn how to customize the keyboard shortcuts of the Telerik UI AutoComplete for {{ site.framework }} using the KendoKeydown event."
components: ["autocomplete"]
slug: custom_keyboard_navigation_autocomplete_htmlhelper
position: 3
---

# Custom Key Handling

The {{ site.product }} AutoComplete wrappers expose the `KendoKeydown` event, which lets you intercept keyboard input before the built-in handler runs and customize how it responds to specific shortcuts.

For event details and the full list of supported wrappers, refer to [Custom Key Handling Overview]({% slug custom_keyboard_navigation_aspnet_wrappers %}).

## How It Works

When the AutoComplete receives keyboard input, the `KendoKeydown` event fires before the built-in handler.

Use the following configuration to subscribe to the event:

```HtmlHelper
    .Events(events => events.KendoKeydown("onAutoCompleteKendoKeydown"))
```
{% if site.core %}
```TagHelper
    on-kendo-keydown="onAutoCompleteKendoKeydown"
```
{% endif %}

## Overriding a Built-In Key Combination

The following example shows the pattern for overriding a built-in shortcut of the AutoComplete. Replace `kendo.keys.ENTER` with one of the built-in shortcuts that you want to take over.

```javascript
    function onAutoCompleteKendoKeydown(e) {
        if (e.keyCode === kendo.keys.ENTER) {
            e.preventKendoKeydown = true;
            console.log("Built-in shortcut overridden.");
        }
    }
```

## Adding a Custom Key Combination

The following example demonstrates how to add a new `Ctrl+Shift+X` shortcut for the AutoComplete.

```javascript
    function onAutoCompleteKendoKeydown(e) {
        if (e.ctrlKey && e.shiftKey && e.keyCode === 88) {
            console.log("Custom shortcut activated.");
        }
    }
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [AutoComplete Keyboard Navigation Demo](https://demos.telerik.com/{{ site.platform }}/autocomplete/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_aspnetcore_autocomplete %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_navigation_aspnet_wrappers %})
* [Keyboard Navigation by the AutoComplete for {{ site.framework }}]({% slug keynav_aspnetcore_autocomplete %})
* [Accessibility in the AutoComplete HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_autocomplete_accessibility %})
