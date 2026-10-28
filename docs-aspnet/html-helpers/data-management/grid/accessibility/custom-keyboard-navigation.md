---
title: Custom Key Handling
page_title: Custom Key Handling
description: "Learn how to customize the keyboard shortcuts of the Telerik UI Grid for {{ site.framework }} using the KendoKeydown event."
components: ["grid"]
slug: custom_keyboard_navigation_grid_htmlhelper
position: 3
---

# Custom Key Handling

Use the `KendoKeydown` event to customize how the {{ site.product }} Grid handles keyboard shortcuts.
The event fires before the built-in keyboard handler, so you can override built-in combinations or add your own.

For event details and the full list of supported wrappers, refer to [Custom Key Handling Overview]({% slug custom_keyboard_navigation_aspnet_wrappers %}).

## How It Works

When the Grid receives keyboard input, the `KendoKeydown` event runs first.
Attach a handler to inspect the pressed keys and decide whether to keep the built-in behavior or replace it.
The event object includes the pressed key code and modifier-key state, which lets you branch for different combinations in one handler.
This approach keeps keyboard logic in one place and makes custom behavior easier to maintain.

Use the following configuration to subscribe to the event:

```HtmlHelper
    .Events(events => events.KendoKeydown("onGridKendoKeydown"))
```
{% if site.core %}
```TagHelper
    on-kendo-keydown="onGridKendoKeydown"
```
{% endif %}

## Overriding a Built-In Key Combination

The following example shows how to override a built-in shortcut.
Set `e.preventKendoKeydown = true` to stop the Grid from executing its default keyboard action.
Replace `kendo.keys.ENTER` with the shortcut that you want to override.
Use this pattern when a built-in key action conflicts with your app flow, such as custom row editing logic or command routing.

```javascript
    function onGridKendoKeydown(e) {
        if (e.keyCode === kendo.keys.ENTER) {
            e.preventKendoKeydown = true;
            console.log("Built-in shortcut overridden.");
        }
    }
```

## Adding a Custom Key Combination

The following example adds a custom `Ctrl+Shift+X` shortcut.
In this case, `88` is the key code for the X key.
You can extend this pattern for additional combinations by checking different key codes and modifier keys in the same handler.
When you add custom shortcuts, avoid combinations that overlap with common browser or assistive-technology shortcuts.

```javascript
    function onGridKendoKeydown(e) {
        if (e.ctrlKey && e.shiftKey && e.keyCode === 88) {
            console.log("Custom shortcut activated.");
        }
    }
```

## Built-In Keyboard Shortcuts

For the full list of built-in keyboard shortcuts, see the [Grid Keyboard Navigation Demo](https://demos.telerik.com/{{ site.platform }}/grid/keyboard-navigation) and the [Keyboard Navigation article]({% slug keynav_aspnetcore_grid %}).
Review these defaults before adding custom combinations so users keep a predictable keyboard experience in the Grid.

## See Also

* [Custom Key Handling Overview]({% slug custom_keyboard_navigation_aspnet_wrappers %})
* [Keyboard Navigation by the Grid for {{ site.framework }}]({% slug keynav_aspnetcore_grid %})
* [Accessibility in the Grid HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_grid_accessibility %})
