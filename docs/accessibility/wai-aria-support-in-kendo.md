---
title: WAI-ARIA
page_title: WAI-ARIA | Kendo UI Accessibility Support
related: a11y-accessibility-overview, a11y-keyboard-support
description: "Learn more about the WAI-ARIA Accessibility standards and their built-in support in Kendo UI components."
slug: wai_aria_accessibility_support
position: 3
---

# WAI-ARIA

[WAI-ARIA](http://www.w3.org/WAI/PF/aria-practices/) is a World Wide Web Consortium specification that is designed to be a framework for web developers to use in developing applications that leverage Ajax, scripting and other rich application techniques. The framework specifies a series of steps that developers can use in their own applications to make them more accessible to assistive technologies such as screen readers.

## Overview

WAI-ARIA was created to bridge the gap between rich applications and disabled users by introducing additional metadata (through HTML element attributes) that screen readers can use to reason about a control or DOM element. These attributes, like `role`, `aria-haspopup,` `aria-selected` and others provide vital information to screen readers, which can then be used to provide a richer level of interaction with your site for disabled visitors.

## Built-In Support

ARIA is especially important for applications that heavily rely upon scripted widgets, Ajax and partial page updates to deliver user experience. Because we know that Kendo UI is often used in these types of applications, we thought it best to provide full ARIA support to all Kendo UI widgets out of the box.

The beautiful thing is that we did all this heavy lifting for you, making Kendo UI the first HTML5 framework to provide full ARIA support for its web widgets. We closely followed the W3C [Widget Design Patterns](http://www.w3.org/WAI/PF/aria-practices/#aria_ex) in the WAI-ARIA specification, and will automatically add the necessary role value and additional attributes, based on the widget in question. There is nothing more you need to do to take advantage of these features other than to just use the widgets as you do today.

For example, let us take a look at the `NumericTextBox` widget. Start with a numeric input:

	<input id="amountOwed" type="number" value="17" min="0" max="100" step="1" />

Now, wire this up as a `kendoNumericTextBox`:

	$("#numeric").kendoNumericTextBox();

If you view this control in the browser, and inspect it using the developer tools, you will see the following:

	<input id="numeric" type="text" value="17" min="0" max="100" step="1" data-role="numerictextbox" class="k-input" role="spinbutton" style="display: none;" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="17">

The `role`, `aria-valuemin`,`aria-valuemax` and `aria-valuenow` properties are all outlined in the W3C [Design Patterns](http://www.w3.org/WAI/PF/aria-practices/#aria_ex) document for WAI-ARIA, so Kendo UI automatically adds them for you. The impact on you as a developer is transparent, while the benefit to assistive technologies is huge, as screen readers can use this extra information to improve the experience a disabled user would have with your applications.

## See Also

Other articles on Kendo UI Accessibility support:

* [Overview of Web Accessibility Standards]({% slug overview_accessibility_support_kendoui %})
* [Charts]({% slug charts_accessibility_support %})
* [High-Contrast Theme]({% slug high_contrast_theme_accessibility_support %})
* [Keyboard Shortcuts]({% slug keyboard_shortcuts_accessibility_support %})
* [Right-to-Left Languages]({% slug right_toleft_languages_accessibility_support %})
* [Section 508]({% slug section508_accessibility_support %})