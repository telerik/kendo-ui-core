---
title: Wai-Aria Support
page_title: jQuery Switch Documentation | Switch Accessibility
description: "Get started with the jQuery Switch by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["switch"]
slug: jquery_switch_accessibility
position: 1
---

# Switch Accessibility

The Switch is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI Switch]({% slug keynav_kendoui_switch %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery Switch provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Switch is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-switch` | `role=switch` | Announces the switch role of the element. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input requires an accessible name that will be assigned to it. |
|  | `aria-required=true` | The attribute is rendered only when the Switch is in a `form` HTML element and announces the required state of the component. |
|  | `aria-describedby=.k-form-hint id/.k-form-error id` | Points to the hint for the input, or if the input is invalid, to the error message. This attribute should only be present when a hint is set or when the input is invalid. |
|  | `aria-checked` | Announces the checked state of the Switch. |
|  | `tabindex=0` | The element must be focusable. |
|  | `aria-invalid=true` | The attribute is rendered only when the Switch is in a form and announces the valid state of the component. |
| `.k-switch.k-disabled` | `aria-disabled=true` | The attribute is rendered only when the Switch is disabled. |

## Resources

[WAI-ARIA Specification for the Switch](https://www.w3.org/TR/wai-aria-1.2/#switch)

## Section 508


The Switch is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Switch has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Switch has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The Switch has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the Switch component could be found here: https://demos.telerik.com/kendo-ui/accessibility/switch
## See Also
* [Keyboard Navigation by the Switch (Demo)](https://demos.telerik.com/kendo-ui/switch/keyboard-navigation)
* [Keyboard Navigation by the Switch]({% slug keynav_kendoui_switch %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)