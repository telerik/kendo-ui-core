---
title: Overview
page_title: Accessibility
description: "Get started with the Telerik UI NumericTextBox for {{ site.framework }} and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_numerictextbox_aspnetcore
position: 1
---

# NumericTextBox Accessibility

The NumericTextBox is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to:
* [Keyboard navigation by the Telerik UI NumericTextBox]({% slug keynav_numerictextbox_aspnetcore %})
* [Accessibility in {{ site.product }}](https://docs.telerik.com/{{ site.platform }}/accessibility/overview)

## WAI-ARIA

The component follows the WAI-ARIA Authoring Practices for implementing the keyboard navigation for its component role and is tested against the popular screen readers.

## Section 508

The NumericTextBox is compliant with the Section 508 requirements.

## WCAG 2.2

The NumericTextBox supports the standards for providing accessible web content which are set by the [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG/).

## Label Element Support

Because of the NumericTextBox complex rendering, to focus the widget through the `label` element, you need to manually handle the `click` event of the label and `focus` the NumericTextBox.

Another possible solution is to use the NumericTextBox [`Label` property]({% slug htmlhelpers_labels_numerictextbox %}), which automatically focuses on the input.

## See Also

* [Keyboard Navigation by the NumericTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/numerictextbox/keyboard-navigation)
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})
