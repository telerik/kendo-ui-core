---
title: Wai-Aria Support
page_title: jQuery CheckBox Documentation | CheckBox Accessibility
description: "Get started with the jQuery CheckBox by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_checkbox_widget
position: 1
---

# CheckBox Accessibility

The CheckBox is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).




Out of the box, the Kendo UI for jQuery CheckBox provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The CheckBox is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-checkbox` | `role=checkbox` or `type=checkbox` | Announces the `checkbox` role of the element. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input requires an accessible name to which it will be assigned. |
|  | `aria-required=true` | The attribute is rendered only when the CheckBox is in a `form` HTML element and announces the required state of the component. |
|  | `aria-describedby=.k-form-hint id/.k-form-error id` | Points to the hint for the checkbox, or if the value of the checkbox is invalid, to the error message. This attribute should only be present when a hint is set or when the checkbox value is invalid. |
|  | `aria-checked=true` or `checked=checked` | Announces the checked state of the CheckBox. |
|  | `disabled=disabled` or `aria-disabled=true` | The attribute is rendered only when the CheckBox is disabled. |
| `.k-invalid,.ng-invalid` | `aria-invalid=true` | The attribute is rendered only when the CheckBox is in a `form` HTML element and announces the invalid state of the component. |

## Resources

[WAI-ARIA Authoring Practices: CheckBox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)

## Section 508


The CheckBox is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The CheckBox has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The CheckBox has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing

The CheckBox has been tested with [axe-core](https://github.com/dequelabs/axe-core).

## See Also

* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)