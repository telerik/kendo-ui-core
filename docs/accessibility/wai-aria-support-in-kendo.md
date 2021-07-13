---
title: WAI-ARIA Support
page_title: WAI-ARIA Support | Kendo UI Accessibility Support
related: a11y-accessibility-overview, a11y-keyboard-support
description: "Learn more about the WAI-ARIA Accessibility standards and their built-in support in Kendo UI components."
slug: wai_aria_accessibility_support
position: 4
---

# WAI-ARIA Support

[WAI-ARIA](https://www.w3.org/WAI/PF/aria-practices/) is a World Wide Web Consortium specification that is designed to be a framework for web developers to use in developing applications that leverage AJAX, scripting and other rich application techniques.

The framework specifies a series of steps that developers can use in their own applications to make them more accessible to assistive technologies such as screen readers.

## Overview

WAI-ARIA was created to bridge the gap between rich applications and disabled users by introducing additional metadata (through HTML element attributes) that screen readers can use to reason about a control or DOM element. These attributes, like `role`, `aria-haspopup,` `aria-selected` and others provide vital information to screen readers, which can then be used to provide a richer level of interaction with your site for disabled visitors.

## Built-In Support

WAI-ARIA is important for applications that heavily rely upon scripted widgets, AJAX, and partial page updates to deliver user experience. Kendo UI is often used in such types of applications and, therefore, provides full WAI-ARIA support to all widgets out of the box which makes it the first HTML5 framework to provide full WAI-ARIA support for its web widgets.

The built-in WAI-ARIA support closely follows the defined W3C [Widget Design Patterns](https://www.w3.org/WAI/PF/aria-practices/#aria_ex) and automatically adds the necessary `role` value and additional attributes based on the specified widget.

The following scenario demonstrates how to work with the NumericTextbox in terms of WAI-ARIA support.  

1. Add the `<input id="amountOwed" type="number" value="17" min="0" max="100" step="1" />` numeric input.
1. Wire it up as a `kendoNumericTextBox` through `$("#numeric").kendoNumericTextBox();`.
1. View the control in the browser and inspect it by using the developer tools.

			<input id="numeric" type="text" value="17" min="0" max="100" step="1" data-role="numerictextbox" class="k-input" role="spinbutton" style="display: none;" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="17">

	The `role`, `aria-valuemin`,`aria-valuemax` and `aria-valuenow` properties are all outlined in the W3C [Design Patterns](https://www.w3.org/WAI/PF/aria-practices/#aria_ex) document for WAI-ARIA and the Kendo UI widgets automatically provide them.

## See Also

* [Overview of Accessibility Features in Kendo UI]({% slug overview_accessibility_support_kendoui %})
* [Section 508 Support in Kendo UI]({% slug section508_accessibility_support %})
* [Section 508 and WCAG 2.1 Compliance of Kendo UI Widgets]({% slug section508_wcag21_accessibility_support %})
* [Keyboard Support in Kendo UI]({% slug keyboard_shortcuts_accessibility_support %})
* [Right-to-Left Language Support in Kendo UI]({% slug right_toleft_languages_accessibility_support %})
* [Working with the Kendo UI High-Contrast Theme]({% slug high_contrast_theme_accessibility_support %})
* [Five Tips for Accessible Charts with Kendo UI]({% slug charts_accessibility_support %})
