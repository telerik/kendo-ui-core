---
title: Custom Key Handling
page_title: Custom Key Handling
description: "Learn how to customize the keyboard shortcuts of the Telerik UI Menu for {{ site.framework }} using the KendoKeydown event."
components: ["menu"]
slug: custom_keyboard_navigation_menu_htmlhelper
position: 3
---

# Custom Key Handling

The {{ site.product }} Menu wrappers expose the `KendoKeydown` event, which lets you intercept keyboard input before the built-in handler runs and customize how it responds to specific shortcuts.

For event details and the full list of supported wrappers, refer to [Custom Key Handling Overview]({% slug custom_keyboard_navigation_aspnet_wrappers %}).

## How It Works

When the Menu receives keyboard input, the `KendoKeydown` event fires before the built-in handler.

Use the following configuration to subscribe to the event:

```HtmlHelper
    .Events(events => events.KendoKeydown("onMenuKendoKeydown"))
```
{% if site.core %}
```TagHelper
    on-kendo-keydown="onMenuKendoKeydown"
```
{% endif %}

## Overriding a Built-In Key Combination

The following example shows the pattern for overriding a built-in shortcut of the Menu. Replace `kendo.keys.ENTER` with one of the built-in shortcuts that you want to take over.

```javascript
    function onMenuKendoKeydown(e) {
        if (e.keyCode === kendo.keys.ENTER) {
            e.preventKendoKeydown = true;
            console.log("Built-in shortcut overridden.");
        }
    }
```

## Adding a Custom Key Combination

The following example demonstrates how to add a new `Ctrl+Shift+X` shortcut for the Menu.

```javascript
    function onMenuKendoKeydown(e) {
        if (e.ctrlKey && e.shiftKey && e.keyCode === 88) {
            console.log("Custom shortcut activated.");
        }
    }
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Menu Keyboard Navigation Demo](https://demos.telerik.com/{{ site.platform }}/menu/keyboard-navigation) and the [Keyboard Navigation article]({% slug htmlhelpers_menu_keyboardnavigation_aspnetcore %}).

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_navigation_aspnet_wrappers %})
* [Keyboard Navigation by the Menu for {{ site.framework }}]({% slug htmlhelpers_menu_keyboardnavigation_aspnetcore %})
* [Accessibility in the Menu HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_menu_accessibility %})
