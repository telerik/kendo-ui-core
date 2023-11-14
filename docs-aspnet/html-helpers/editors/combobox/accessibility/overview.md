---
title: Overview
page_title: Accessibility
description: "Get started with the {{ site.product }} ComboBox and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_aspnetcore_combobox
position: 1
---

# ComboBox Accessibility

The ComboBox is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to:
* [Keyboard navigation by the Telerik UI ComboBox]({% slug keynav_aspnetcore_combobox %})
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})

## WAI-ARIA

The component follows the WAI-ARIA Authoring Practices for implementing the keyboard navigation for its component role and is tested against the popular screen readers. For more information, refer to the article on [WAI-ARIA support in {{ site.product }}]({% slug overview_accessibility %}#wai-aria).

> According to [WAI-ARIA 1.1](https://www.w3.org/TR/wai-aria/#combobox) specification *"Authors must ensure an element with role combobox contains or owns a text input element with role textbox or searchbox..."*. Note, that in our implementation, the text input element is the one that has role="combobox", and does not contain another text input element. **This approach is valid for the [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/#combobox) specification and also for the [WAI-ARIA 1.0](https://www.w3.org/TR/wai-aria/#combobox) specification .**
>
> As it is stated in [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/#combobox) *"The Guidance for combobox has changed significantly in ARIA 1.2 due to problems with implementation of the previous patterns"*. Therefore, we will keep the current state, even if it contradicts the WAI-ARIA 1.1 specification.

## Section 508

The ComboBox is compliant with the Section 508 requirements. For more information, refer to the article on [Section 508 support in {{ site.product }}]({% slug overview_accessibility %}#section-508).

## WCAG 2.2

The ComboBox supports the standards for providing accessible web content which are set by the [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG/). For more information, refer to the article on [WCAG 2.2 compliance in {{ site.product_short }} ]({% slug overview_accessibility %}#wcag-21)

## See Also

* [Keyboard Navigation by the ComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/keyboard-navigation)
* [Keyboard Navigation by the ComboBox HtmlHelper for {{ site.framework }}]({% slug keynav_aspnetcore_combobox %})
* [Accessibility in {{ site.product }}]({% slug compliance_accessibility %})
