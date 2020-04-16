---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the {{ site.product }} Stepper and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_aspnetcore_stepper
position: 2
---

# Keyboard Navigation

The keyboard navigation of the Stepper is always available.

The Stepper widget itself is not focusable, as the links within the widget are part of the tab sequence on the page. Thus, when navigating with the Tab key, the selected Step will be focused within the Stepper widget. For a complete example, refer to the [demo on keyboard navigation of the Stepper](https://demos.telerik.com/{{ site.platform }}/stepper/keyboard-navigation).

Kendo UI Stepper supports the following keyboard shortcuts:

| SHORTCUT						| DESCRIPTION				                                                        |
|:---                 |:---                                                                                |
| `Left arrow`               | Focuses previous Step |
| `Up arrow`               | Focuses previous Step |
| `Right arrow`               | Focuses next Step |
| `Down arrow`               | Focuses next Step |
| `Home`               | Focuses first Step |
| `End`               | Focuses last Step |
| `Enter`             | Selects the focused Step|
| `Space`             | Selects the focused Step|
| `Tab`               | Move the focus away from the Stepper |
| `Shift`+`Tab`    | Move the focus away from the Stepper |

> When using keyboard navigation the focusing and selecting behavior of the Stepper can be configured via the `selectOnFocus` configuration option. By default this option is disabled and additional action is required by the user to select the focused step.

## See Also

* [Keyboard Navigation in the Stepper HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/stepper/keyboard-navigation)
* [Accessibility in the Stepper HtmlHelper for {{ site.framework }}]({% slug accessibility_aspnetcore_stepper %})
