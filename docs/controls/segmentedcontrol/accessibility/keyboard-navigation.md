---
title: Keyboard Navigation
page_title: jQuery SegmentedControl Documentation - Keyboard Navigation
description: "Get started with the jQuery SegmentedControl by Kendo UI and learn about the accessibility support it provides through its keyboard navigation functionality."
components: ["segmentedcontrol"]
slug: keynav_segmentedcontrol_jquery
position: 2
---

# Keyboard Navigation

The keyboard navigation of the SegmentedControl is always available.

For a complete example, refer to the [demo on keyboard navigation of the SegmentedControl](https://demos.telerik.com/kendo-ui/segmentedcontrol/keyboard-navigation).

The SegmentedControl supports the following keyboard shortcuts:

| SHORTCUT | DESCRIPTION |
|:--- |:--- |
| `Tab` | Moves the focus into the SegmentedControl (to the selected or first button). Pressing `Tab` again moves the focus out of the component to the next focusable element on the page. |
| `Shift`+`Tab` | Moves the focus out of the SegmentedControl to the previous focusable element on the page. |
| `ArrowLeft` | Moves the focus to the previous button and selects it. |
| `ArrowRight` | Moves the focus to the next button and selects it. |
| `Enter` or `Space` | Activates the focused button and selects the corresponding segment. |

> Starting with the 2026 Q4 release, the SegmentedControl is a single tab stop that uses a roving `tabindex`. To move between the buttons, use `ArrowLeft` and `ArrowRight` instead of `Tab` and `Shift`+`Tab`. For more information, refer to the [2026 breaking changes]({% slug breakingchanges2026_kendoui %}).

## See Also

* [Keyboard Navigation by the SegmentedControl (Demo)](https://demos.telerik.com/kendo-ui/segmentedcontrol/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}#keyboard-navigation)
* [Accessibility in the SegmentedControl]({% slug jquery_segmentedcontrol_accessibility %})
