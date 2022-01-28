---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the {{ site.product }} Wizard and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_aspnetcore_wizard
position: 2
---

# Keyboard Navigation

The keyboard navigation of the Wizard is always available.

The Wizard widget itself is not focusable, but its elements (Stepper, steps and focusable elements within each step content) are part of the tab sequence on the page. Thus, when navigating with the Tab key, the selected Step will be focused within the Wizard widget. For a complete example, refer to the [demo on keyboard navigation of the Wizard](https://demos.telerik.com/{{ site.platform }}/wizard/keyboard-navigation).

Telerik UI Wizard HtmlHelper for {{ site.framework }} supports the following keyboard shortcuts:

| SHORTCUT | DESCRIPTION |
|:--- |:--- |
| `Left arrow` or `Up arrow` | Focuses previous Step |
| `Right arrow` or `Down arrow` | Focuses next Step |
| `Home` | Focuses first Step if the lenear configuration of the Stepper is disabled |
| `End` | Focuses last Step if the lenear configuration of the Stepper is disabled |
| `Tab` | Focuses the next element in the tab sequence |
| `Shift`+`Tab` | Focuses the previous element in the tab sequence |

## See Also

* [Keyboard Navigation in the Wizard HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/wizard/keyboard-navigation)
* [Accessibility in the Wizard HtmlHelper for {{ site.framework }}]({% slug accessibility_aspnetcore_wizard %})
