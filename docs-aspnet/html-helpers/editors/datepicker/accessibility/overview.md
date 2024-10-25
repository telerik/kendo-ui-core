---
title: Overview
page_title: Accessibility
description: "Get started with the {{ site.product }} DatePicker and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_datepicker_aspnetcore_accessibility
position: 1
---

# DatePicker Accessibility

The DatePicker is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to:
* [Keyboard navigation by the Telerik UI DatePicker]({% slug htmlhelpers_datepicker_aspnetcore_accessibility_keyboardnavigation %})
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})

## WAI-ARIA

The component follows the WAI-ARIA Authoring Practices for implementing the keyboard navigation for its component role and is tested against the popular screen readers. For more information, refer to the article on [WAI-ARIA support in {{ site.product }}](https://docs.telerik.com/kendo-ui/accessibility/wai-aria-support-in-kendo).

To customize the `aria-label` text of the currently focused cell in the calendar, use the [`ARIATemplate`](/api/kendo.mvc.ui.fluent/datepickerbuilder#ariatemplatesystemstring) configuration option.

## Section 508

The DatePicker is compliant with the Section 508 requirements. For more information, refer to the article on [Section 508 support in {{ site.product }}]({% slug compliance_accessibility %}).

## WCAG 2.2

The DatePicker supports the standards for providing accessible web content which are set by the [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG/). For more information, refer to the article on [WCAG 2.2 compliance in {{ site.product }}]({% slug compliance_accessibility %})

## See Also

* [Keyboard Navigation by the DatePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/kendo-ui/datepicker/keyboard-navigation)
* [Keyboard Navigation by the DatePicker HtmlHelper for {{ site.framework }}]({% slug htmlhelpers_datepicker_aspnetcore_accessibility_keyboardnavigation %})
* [Accessibility in {{ site.product }}]({% slug compliance_accessibility %})
