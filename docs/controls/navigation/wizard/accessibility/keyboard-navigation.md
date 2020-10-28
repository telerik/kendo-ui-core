---
title: Keyboard Navigation
page_title: jQuery Wizard Documentation | Wizard Keyboard Navigation
description: "Get started with the jQuery Wizard by Kendo UI and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_wizard_jquery
position: 2
---

# Keyboard Navigation

The keyboard navigation of the Wizard is always available.

The Wizard widget itself is not focusable, as the links within the widget are part of the tab sequence on the page. Thus, when navigating with the Tab key, the selected Step will be focused within the Wizard widget. For a complete example, refer to the [demo on keyboard navigation of the Wizard](https://demos.telerik.com/kendo-ui/wizard/keyboard-navigation).

Kendo UI Wizard supports the following keyboard shortcuts:

| SHORTCUT | DESCRIPTION |
|:--- |:--- |
| `Left arrow` or `Up arrow` | Focuses previous Step |
| `Right arrow` or `Down arrow` | Focuses next Step |
| `Home` | Focuses first Step if the linear configuration of the Stepper is disabled |
| `End` | Focuses last Step if the linear configuration of the Stepper is disabled |
| `Tab` | Focuses next element in the tab sequence |
| `Shift`+`Tab` | Focuses previous element in the tab sequence |


## See Also

* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in the Wizard]({% slug accessibility_kendoui_wizard_widget %})
