---
title: WAI-ARIA Support
related: a11y-accessibility-overview, a11y-keyboard-support
position: 2
---

# WAI-ARIA Support

## The Purpose of WAI-ARIA

[WAI-ARIA](http://www.w3.org/WAI/PF/aria-practices/) is a World Wide Web Consortium specification that is designed to be a framework for web
developers to use in developing applications that leverage Ajax, scripting and other "rich application" techniques. The framework specifies a series
of steps that developers can use in their own applications to make them more accessible to "assistive technologies" like screen readers.

WAI-ARIA was created to bridge the gap between rich applications and disabled users by introducing additional metadata (through HTML element
attributes) that screen readers can use to reason about a control or DOM element. These attributes, like `role`, `aria-haspopup,` `aria-selected` and
others provide vital information to screen readers, which can then be used to provide a richer level of interaction with your site for disabled
visitors.

## Built-in WAI-ARIA Support

ARIA is especially important for applications that rely heavily upon scripted widgets, Ajax and partial page updates to deliver user experience. And
because we know that Kendo UI is often used in these types of applications, we thought it best to provide full ARIA support to all Kendo UI
Widgets out of the box.

The beautiful thing is that we've done all of the heavily lifting for you, making Kendo UI the first HTML5 Framework to provide full ARIA support for
its web widgets. We closely followed the W3C's "[Widget Design Patterns](http://www.w3.org/WAI/PF/aria-practices/#aria_ex)" in the WAI-ARIA
specification, and will automatically add the necessary role value and additional attributes, based on the widget in question. There's nothing more
you need to do to take advantage of these features than to just use the widgets as you do today.

For example, let's take a look at the `NumericTextBox` widget. I'll start with a numeric input:

	<input id="amountOwed" type="number" value="17" min="0" max="100" step="1" />

Now, I'll wire this up as a `kendoNumericTextBox`:

	$("#numeric").kendoNumericTextBox();

If I view this control in the browser, and inspect it using the developer tools, I'll see the following:

	<input id="numeric" type="text" value="17" min="0" max="100" step="1" data-role="numerictextbox" class="k-input" role="spinbutton" style="display: none;" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="17">

The `role`, `aria-valuemin`,`aria-valuemax` and `aria-valuenow` properties are all outlined in the W3C's [Design
Patterns](http://www.w3.org/WAI/PF/aria-practices/#aria_ex) document for WAI-ARIA, so Kendo UI adds them for you, automatically. The impact to you as
a developer is transparent, but the benefit to assistive technologies is huge, as screen readers can use
this extra information to improve a disabled user's experience with your applications.
