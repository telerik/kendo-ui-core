---
title: Overview
page_title: jQuery NumericTextBox Documentation | NumericTextBox Accessibility
description: "Get started with the jQuery NumericTextBox by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_numerictextbox
position: 1
---

# NumericTextBox Accessibility

The NumericTextBox is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI NumericTextBox]({% slug keynav_numerictextbox %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery NumericTextBox provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The NumericTextBox is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-input-inner` | `role=spinbutton` | Announces the spin button capabilities of the NumericTextBox. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input requires an accessible name that will be assigned to it. |
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


The NumericTextBox is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

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



### Automated Testing
The NumericTextBox has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the NumericTextBox component could be found here: https://demos.telerik.com/kendo-ui/accessibility/numerictextbox
## See Also
* [Keyboard Navigation by the NumericTextBox (Demo)](https://demos.telerik.com/kendo-ui/numerictextbox/keyboard-navigation)
* [Keyboard Navigation by the NumericTextBox]({% slug keynav_numerictextbox %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})