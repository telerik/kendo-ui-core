---
title: Overview
page_title: jQuery Popover Documentation - Popover Accessibility
description: "Get started with the jQuery Popover by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_popover_widget
position: 1
---

# Popover Accessibility

The Popover is accessible by screen readers and provides WAI-ARIA, Section 508, and WCAG 2.2.

For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).

## WAI-ARIA

The component follows the WAI-ARIA Authoring Practices for implementing the keyboard navigation for its component role and is tested against the popular screen readers. For more information, refer to the article on [WAI-ARIA support in Kendo UI for jQuery]({% slug wai_aria_accessibility_support %}).

## Section 508

The Popover is compliant with the Section 508 requirements. For more information, refer to the article on [Section 508 support in Kendo UI for jQuery]({% slug section508_accessibility_support %}).

## WCAG 2.2

The Popover supports the standards for providing accessible web content which are set by the [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG/).

For more information, refer to [WCAG 2.2 compliance in Kendo UI for jQuery]({% slug section508_wcag21_accessibility_support %}).

## Accessibility Behavior

Screen readers behave differently depending on the content of the Popover:

* Dialog behavior—When the Popover is displayed on click and it has form elements that can be focused, it matches the [dialog aria behavior](https://www.w3.org/TR/wai-aria-practices-1.2/#dialog_modal).
When shown, the focus will be moved to the first focusable element inside the Popover.

* Tooltip behavior—Screen readers will read the Popover's content, however the focus will remain on the element that triggers the Popover.

## See Also

* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})

