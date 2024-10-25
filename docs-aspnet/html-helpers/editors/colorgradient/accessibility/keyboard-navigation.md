---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Learn about the accessibility support that the {{ site.product }} ColorGradient component provides through its keyboard navigation functionality."
slug: keynav_colorgradient_aspnetcore
position: 2
---

# Keyboard Navigation

The {{site.product}} ColorGradient is a single-tab-stop component. The component implements inner navigation that you can activate by pressing the Enter key. When inner navigation is activated, the focus is trapped within the component. To return to the page navigation, press Esc. The keyboard navigation of the ColorGradient is always available.

The {{site.product_short}} ColorGradient supports the following keyboard shortcuts:

| SHORTCUT						| DESCRIPTION				|
|:---                 |:---                  |
| **When ColorGradient wrapper is focused** | - |                  |
| `Tab` | Navigates to the next focusable element after the ColorGradient. |
| `Shift`+`Tab` | Navigates to the previous focusable element before the ColorGradient. |
| `Enter` | Activates the inner ColorGradient navigation. |
| **When ColorGradient inner navigation is activated** | - |                                        |
| `Space` or `Enter`             | When the **Toggle** format button is focused, changes the format between RGB and HEX.|
| `Tab`               | Navigates to the next ColorGradient element.|
| `Shift`+`Tab`    | Navigates to the previous ColorGradient element.|
| `Arrow Up` or `Arrow Right`    | When any of the ColorGradient sliders is focused, increases their value. When the drag handle in the ColorGradient canvas is focused, moves in the corresponding direction.|
| `Arrow Down` or `Arrow Left`    | When any of the ColorGradient sliders is focused, decreases their value. When the drag handle in the ColorGradient canvas is focused, moves in the corresponding direction.|

For a complete example, refer to the [demo on keyboard navigation of the ColorGradient](https://demos.telerik.com/{{ site.platform }}/colorgradient/keyboard-navigation).

## See Also

* [Keyboard Navigation in the ColorGradient for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/colorgradient/keyboard-navigation)
* [Accessibility in the ColorGradient for {{ site.framework }}]({% slug htmlhelpers_accessibility_colorgradient %})
