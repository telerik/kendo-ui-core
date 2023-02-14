---
title: Keyboard Navigation
page_title: The {{ site.product }} FlatColorPicker Documentation - Keyboard Navigation
description: "Get started with the {{ site.product }} FlatColorPicker by Kendo UI and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keyboard_navigation_flatcolorpickerhelper_aspnetcore
position: 2
---

# Keyboard Navigation

The {{site.product}} FlatColorPicker is a single-tab-stop component. The component implements inner navigation that you can activate by pressing the Enter key. When inner navigation is activated, the focus is trapped within the component. To return to the page navigation, press Esc. The keyboard navigation of the FlatColorPicker is always available.

The {{site.product_short}} FlatColorPicker supports the following keyboard shortcuts:

| SHORTCUT						| DESCRIPTION				                                                        |
|:---                 |:---                                                                                |
| **When FlatColorPicker wrapper is focused** | - |                  |
| `Tab` | Navigates to the next focusable element after the FlatColorPicker. |
| `Shift`+`Tab` | Navigates to the previous focusable element before the FlatColorPicker. |
| `Enter` | Activates the inner FlatColorPicker navigation. |
| **When FlatColorPicker inner navigation is activated** | - |                                           |
| `Space/Enter`             | When the Toggle format button is focused, changes the format between RGB and HEX. When a View button is focused, switches to Palette or Gradient view.|
| `Tab`               | navigates to the next FlatColorPicker element.|
| `Shift`+`Tab`    | navigates to the previous FlatColorPicker element.|
| `Arrow Up/Right`    | When any of the FlatColorPicker's sliders is focused, increases their value. When the drag handle in the FlatColorPicker canvas is focused, moves in the corresponding direction.|
| `Arrow Down/Left`    | When any of the FlatColorPicker's sliders is focused, decreases their value. When the drag handle in the FlatColorPicker canvas is focused, moves in the corresponding direction.|

For a complete example, refer to the [demo on keyboard navigation of the FlatColorPicker](https://demos.telerik.com/{{ site.platform }}/flatcolorpicker/keyboard-navigation).

## See Also

* [Keyboard Navigation of the FlatColorPicker (Demo)](https://demos.telerik.com/{{ site.platform }}/flatcolorpicker/keyboard-navigation)
* [FlatColorPicker Accessibility Overview]({% slug accessibility_flatcolorpickerhelper_aspnetcore %})
