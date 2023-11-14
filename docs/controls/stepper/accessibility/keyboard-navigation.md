---
title: Keyboard Navigation
page_title: jQuery Stepper Documentation
description: "Get started with the jQuery Stepper by Kendo UI and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_stepper_jquery
position: 2
---

# Keyboard Navigation

The keyboard navigation of the Stepper is always available.

The Stepper widget itself is not focusable, as the links within the widget are part of the tab sequence on the page. Thus, when navigating with the Tab key, the selected Step will be focused within the Stepper widget. For a complete example, refer to the [demo on keyboard navigation of the Stepper](https://demos.telerik.com/kendo-ui/stepper/keyboard-navigation).

Kendo UI Stepper supports the following keyboard shortcuts:

| SHORTCUT						| DESCRIPTION				                                                        |
|:---                 |:---                                                                                |
| `Left arrow` or `Up arrow` or `Shift`+`Tab`               | Focuses previous Step |
| `Right arrow` or `Down arrow` or `Tab`              | Focuses next Step |
| `Home`               | Focuses first Step |
| `End`               | Focuses last Step |
| `Enter`             | Selects the focused Step|
| `Space`             | Selects the focused Step|
| `Tab`               | To move the focus away from the Stepper select last step and press `Tab` |
| `Shift`+`Tab`    | To move the focus away from the Stepper select first step and press `Shift`+`Tab` |

> When using keyboard navigation the focusing and selecting behavior of the Stepper can be configured via the [`selectOnFocus`](/api/javascript/ui/stepper/configuration/selectonfocus) configuration option. By default this option is disabled and additional action is required by the user to select the focused step.

## See Also

* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in the Stepper]({% slug accessibility_kendoui_stepper_widget %})
