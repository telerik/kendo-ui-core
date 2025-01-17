---
title: Overview
page_title: NumericTextBox Documentation | NumericTextBox Accessibility
description: "Get started with the {{ site.product }} NumericTextBox and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_numerictextbox_aspnetcore
position: 1
---

# NumericTextBox Accessibility

Out of the box, the {{ site.product }} NumericTextBox provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The NumericTextBox is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-input-inner` | `role=spinbutton` | Announces the spin button capabilities of the NumericTextBox. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input requires an accessible name that will be assigned to it. |
|  | `aria-required=true` | The attribute is rendered only when the NumericTextBox is in a `form` HTML element and announces the required state of the component. |
|  | `aria-describedby=.k-form-hint id/.k-form-error id` | Points to the hint for the input, or if the input is invalid, to the error message. This attribute must only be present when a hint is set or when the input is invalid. |
|  | `aria-valuemnow` | Announces the value for the component. |
|  | `aria-valuemin` | Announces the minimum value allowed for the component. |
|  | `aria-valuemax` | Announces the maximum value allowed for the component. |
|  | `aria-invalid=true` | The attribute is rendered only when the NumericTextBox is in a form and announces the valid state of the component. |
| `.k-disabled .k-input-inner` | `disabled=disabled` or `aria-disabled=true` | The attribute is rendered only when the NumericTextBox is disabled. |
| `.k-spin-button>.k-button` | `role=button` or `nodeName=button` | Announces the spin button capabilities of the NumericTextBox. |
|  | `aria-label` | The button element must have discernible text. |

## Resources

[WAI-ARIA Authoring Practices: Spinbutton Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/)

## Section 508

The NumericTextBox is fully compliant with the [Section 508 requirements](https://www.section508.gov/).

## Testing

The NumericTextBox has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The NumericTextBox has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Test Example

To test the NumericTextBox component, refer to the [NumericTextBox Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/numerictextbox).

## Keyboard Navigation

For details on how the NumericTextBox keyboard navigation works, refer to the [NumericTextBox Keyboard Navigation]({%slug keynav_numerictextbox_aspnetcore%}) article.

## See Also

* [Keyboard Navigation by the NumericTextBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/numerictextbox/keyboard-navigation)
* [Keyboard Navigation by the NumericTextBox for {{ site.framework }}]({% slug keynav_numerictextbox_aspnetcore %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})