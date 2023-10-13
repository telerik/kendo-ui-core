---
title: Overview
page_title: jQuery ButtonGroup Documentation - ButtonGroup Accessibility
description: "Get started with the jQuery ButtonGroup by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_buttongroup_jquery
position: 1
---

# ButtonGroup Accessibility

The ButtonGroup is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to:
* [Keyboard navigation by the Kendo UI ButtonGroup]({% slug keynav_buttongroup_jquery %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})

## WAI-ARIA

The component follows the WAI-ARIA Authoring Practices for implementing the keyboard navigation for its component role and is tested against the popular screen readers:

* The ButtonGroup container has a `role=group` attribute that semantically defines the group of the buttons.
* The togglable buttons use the `aria-pressed` attribute and adopt the `role="button"` role.
* Initializing a ButtonGroup from a `ul` element requires you to set a corresponding tab index to the child `li` elements.

For more information, refer to the article on [WAI-ARIA support in Kendo UI for jQuery]({% slug wai_aria_accessibility_support %}).

## Section 508

The ButtonGroup is compliant with the Section 508 requirements. For more information, refer to the article on [Section 508 support in Kendo UI for jQuery]({% slug section508_accessibility_support %}).

## WCAG 2.2

The ButtonGroup supports the standards for providing accessible web content which are set by the [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG/). For more information, refer to the article on [WCAG 2.2 compliance in Kendo UI for jQuery]({% slug section508_wcag21_accessibility_support %})

## See Also

* [Keyboard Navigation by the ButtonGroup (Demo)](https://demos.telerik.com/kendo-ui/buttongroup/keyboard-navigation)
* [Keyboard Navigation by the ButtonGroup]({% slug keynav_buttongroup_jquery %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
