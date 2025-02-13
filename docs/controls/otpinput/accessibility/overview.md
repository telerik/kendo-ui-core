---
title: Overview
page_title: jQuery OTPInput Documentation | OTPInput Accessibility
description: "Get started with the jQuery OTPInput by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_otpinput
position: 1
---

# OTPInput Accessibility

The OTPInput is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).




Out of the box, the Kendo UI for jQuery OTP provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The OTP is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


No role attribute is implemented as the `html input type="text"` element is sufficient for defining the purpose of the component.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-otp` | `role=group` | Sets the proper role for the OTP. |
| `.k-otp>input` | `type=hidden` | The hidden input holding the OTP inputs value. |
|  | `aria-hidden=true` | Hides the hidden input from assistive technologies. |
| `.k-otp-input .k-input-inner` | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-required=true` | The attribute is rendered only when the OTP is in a `form` HTML element and announces the required state of the component. |
|  | `aria-describedby=.k-form-hint id/.k-form-error id` | Points to the hint for the input, or if the input is invalid, to the error message. This attribute should only be present when a hint is set or when the input is invalid. |
|  | `autocomplete=off` | Sets the default autocomplete for the input. |
| `.k-invalid .k-input-inner,.ng-invalid .k-input-inner` | `aria-invalid=true` | The attribute is rendered only when the OTP is in a form and announces the valid state of the component. |
| `.k-disabled .k-input-inner` | `disabled=disabled` or `aria-disabled=true` | The attribute is rendered only when the OTP is disabled. |

## Resources

[WAI-ARIA Specification for the TextBox](https://www.w3.org/TR/wai-aria-1.2/#textbox)

## Section 508


The OTP is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The OTP has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The OTP has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The OTPInput has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the OTPInput component could be found here: https://demos.telerik.com/kendo-ui/accessibility/otpinput
## See Also
* [Keyboard Navigation by the OTPInput (Demo)](https://demos.telerik.com/kendo-ui/otpinput/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}#keyboard-navigation)
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
