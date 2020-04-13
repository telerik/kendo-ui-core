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


## See Also

* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in the Stepper]({% slug accessibility_kendoui_stepper_widget %})
