---
title: Overview
page_title: jQuery NumericTextBox Documentation - NumericTextBox Accessibility
description: "Get started with the jQuery NumericTextBox by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_numerictextbox
position: 1
---

# NumericTextBox Accessibility

The NumericTextBox is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to:
* [Keyboard navigation by Kendo UI NumericTextBox]({% slug keynav_numerictextbox %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})

## WAI-ARIA

The component follows the WAI-ARIA Authoring Practices for implementing the keyboard navigation for its component role and is tested against the popular screen readers. For more information, refer to the article on [WAI-ARIA support in Kendo UI for jQuery]({% slug wai_aria_accessibility_support %}).

## Section 508

The NumericTextBox is compliant with the Section 508 requirements. For more information, refer to the article on [Section 508 support in Kendo UI for jQuery]({% slug section508_accessibility_support %}).

## WCAG 2.2

The NumericTextBox supports the standards for providing accessible web content which are set by the [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG/). For more information, refer to the article on [WCAG 2.2 compliance in Kendo UI for jQuery]({% slug section508_wcag21_accessibility_support %}).

## Label Element Support

Because of the NumericTextBox complex rendering, to focus the widget through the `label` element, you need to manually handle the `click` event of the label and `focus` the NumericTextBox.

Another possible solution is to use the NumericTextBox [`Label` property]({% slug labels_numerictextbox %}), which automatically focuses on the input.


## See Also

* [Keyboard Navigation by the NumericTextBox (Demo)](https://demos.telerik.com/kendo-ui/numerictextbox/keyboard-navigation)
* [Keyboard Navigation by the NumericTextBox]({% slug keynav_numerictextbox %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
