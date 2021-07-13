---
title: Overview
page_title: jQuery AutoComplete Documentation | AutoComplete Accessibility
description: "Get started with the jQuery AutoComplete by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
slug: accessibility_kendoui_autocomplete_widget
position: 1
---

# AutoComplete Accessibility

The AutoComplete is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.1, and keyboard support.

For more information, refer to:
* [Keyboard navigation by the Kendo UI AutoComplete]({% slug keynav_kendoui_autocomplete_widget %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})

## WAI-ARIA

The component follows the WAI-ARIA Authoring Practices for implementing the keyboard navigation for its component role and is tested against the popular screen readers. For more information, refer to the article on [WAI-ARIA support in Kendo UI for jQuery]({% slug wai_aria_accessibility_support %}).

> According to [WAI-ARIA 1.1](https://www.w3.org/TR/wai-aria/#combobox) specification *"Authors must ensure an element with role combobox contains or owns a text input element with role textbox or searchbox..."*. Note, that in our implementation, the text input element is the one that has role="combobox", and does not contain another text input element. **This approach is valid for the [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/#combobox) specification and also for the [WAI-ARIA 1.0](https://www.w3.org/TR/wai-aria/#combobox) specification .**
>
> As it is stated in [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/#combobox) *"The Guidance for combobox has changed significantly in ARIA 1.2 due to problems with implementation of the previous patterns"*. Therefore, we will keep the current state, even if it contradicts the WAI-ARIA 1.1 specification.

## Section 508

The AutoComplete is compliant with the Section 508 requirements. For more information, refer to the article on [Section 508 support in Kendo UI for jQuery]({% slug section508_accessibility_support %}).

## WCAG 2.1

The AutoComplete supports the standards for providing accessible web content which are set by the [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG/). For more information, refer to the article on [WCAG 2.1 compliance in Kendo UI for jQuery]({% slug section508_wcag21_accessibility_support %})

## See Also

* [Keyboard Navigation by the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/keyboard-navigation)
* [Keyboard Navigation by the AutoComplete]({% slug keynav_kendoui_autocomplete_widget %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
