---
title: WAI-ARIA Support
page_title: WAI-ARIA Support - Kendo UI Accessibility Support
related: a11y-accessibility-overview, a11y-keyboard-support
description: "Learn more about the WAI-ARIA Accessibility standards and their built-in support in Kendo UI components."
slug: wai_aria_accessibility_support
position: 4
---

# WAI-ARIA Support

[WAI-ARIA](https://www.w3.org/WAI/PF/aria-practices/) is a set of technical specifications which were developed by the W3C and which provide the semantics for the assistive technologies to access and interpret web content and web applications. The WAI-ARIA recommendations (standards) divide the semantics into roles and into states and properties that those roles support. For example, a [`checkbox` role](https://www.w3.org/TR/wai-aria-1.2/#checkbox) supports the [`aria-checked`](https://www.w3.org/TR/wai-aria-1.2/#aria-checked) state which indicates whether a checkbox, radio button, or a similar UI element is checked.

The WAI-ARIA framework targets web developers who create web applications by using AJAX, scripting, and other rich application techniques.

## Built-In Support

WAI-ARIA is important for applications that rely upon scripted components, AJAX, and partial page updates to deliver user experience. Kendo UI is often used in such types of applications and, therefore, provides full WAI-ARIA support to all components out of the box which makes it the first HTML5 framework to provide full WAI-ARIA support for its web components.

The built-in WAI-ARIA support closely follows the defined W3C [Components Design Patterns](https://www.w3.org/WAI/PF/aria-practices/#aria_ex) and automatically adds the necessary `role` value and additional attributes based on the specified component.

The following scenario demonstrates how to work with the NumericTextbox in terms of WAI-ARIA support.  

1. Add the `<input id="amountOwed" type="number" value="17" min="0" max="100" step="1" />` numeric input.
1. Wire it up as a `kendoNumericTextBox` through `$("#numeric").kendoNumericTextBox();`.
1. View the component in the browser and inspect it by using the developer tools.

			<input id="numeric" type="text" value="17" min="0" max="100" step="1" data-role="numerictextbox" class="k-input" role="spinbutton" style="display: none;" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="17">

	The `role`, `aria-valuemin`,`aria-valuemax` and `aria-valuenow` properties are all outlined in the W3C [Design Patterns](https://www.w3.org/WAI/PF/aria-practices/#aria_ex) document for WAI-ARIA and the Kendo UI components automatically provide them.

## See Also

* [Overview of Accessibility Features in Kendo UI]({% slug overview_accessibility_support_kendoui %})
* [Section 508 Support in Kendo UI]({% slug section508_accessibility_support %})
* [Section 508 and WCAG 2.2 Compliance of Kendo UI Components]({% slug section508_wcag21_accessibility_support %})
* [Keyboard Support in Kendo UI]({% slug keyboard_shortcuts_accessibility_support %})
* [Right-to-Left Language Support in Kendo UI]({% slug right_toleft_languages_accessibility_support %})
* [Working with the Kendo UI High-Contrast Theme]({% slug high_contrast_theme_accessibility_support %})
* [Five Tips for Accessible Charts with Kendo UI]({% slug charts_accessibility_support %})
