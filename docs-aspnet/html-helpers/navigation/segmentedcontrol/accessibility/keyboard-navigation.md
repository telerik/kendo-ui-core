---
title: Keyboard Navigation
page_title: SegmentedControl Keyboard Navigation
description: "Learn how to navigate the Telerik UI SegmentedControl for {{ site.framework }} using keyboard shortcuts."
components: ["segmentedcontrol"]
slug: keynav_aspnetcore_segmentedcontrol
position: 2
---

# Keyboard Navigation

The keyboard navigation of the SegmentedControl is always available.

For a complete example, refer to the [demo on keyboard navigation of the SegmentedControl](https://demos.telerik.com/{{ site.platform }}/segmentedcontrol/keyboard-navigation).

The SegmentedControl supports the following keyboard shortcuts:

| SHORTCUT | DESCRIPTION |
|:--- |:--- |
| `Tab` | Moves the focus into the SegmentedControl (to the selected or first button). Pressing `Tab` again moves the focus out of the component to the next focusable element on the page. |
| `Shift`+`Tab` | Moves the focus out of the SegmentedControl to the previous focusable element on the page. |
| `ArrowLeft` | Moves the focus to the previous button and selects it. |
| `ArrowRight` | Moves the focus to the next button and selects it. |
| `Enter` or `Space` | Activates the focused button and selects the corresponding segment. |

> Starting with the 2026 Q4 release, the SegmentedControl is a single tab stop that uses a roving `tabindex`. To move between the buttons, use `ArrowLeft` and `ArrowRight` instead of `Tab` and `Shift`+`Tab`. For more information, refer to the [2026 breaking changes]({% slug breakingchanges_2026 %}).

## See Also

* [Keyboard Navigation by the SegmentedControl for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/segmentedcontrol/keyboard-navigation)
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})
