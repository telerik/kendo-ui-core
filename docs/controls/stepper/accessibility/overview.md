---
title: Wai-Aria Support
page_title: jQuery Stepper Documentation | Stepper Accessibility
description: "Get started with the jQuery Stepper by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: jquery_stepper_accessibility
position: 1
---

# Stepper Accessibility

The Stepper is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI Stepper]({% slug keynav_stepper_jquery %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery Stepper provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Stepper is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The Stepper component is a landmark `<nav>` element or an element with `role="navigation"`(https://www.w3.org/TR/wai-aria-1.2/#navigation). It contains an ordered list of navigation items. Each navigation item contains a link.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-stepper` | `role=navigation` or `nodeName=nav` | The landmark role `navigation` must be assigned to the component. |
| `.k-step-disabled>.k-step-link` | `aria-disabled=true` | A disabled (inactive) link. |
| `.k-step-current>.k-step-link` | `aria-current=step` | The currently selected link. |
| `.k-step.k-focus .k-step-link` | `tabindex=0` | Adds an element to the page's tab order. Set based on the roving tabindex navigation when the tab is focused. |
| `.k-step:not(.k-focus) .k-step-link` | `tabindex=-1` | Removes the element from the page's tab order. Set based on the roving tabindex navigation when a tab is not focused. |


No aria attributes should be applied to the Stepper as the ProgressBar serves a purely aesthetic purpose.

## Resources

[WAI-ARIA specification for navigation](https://www.w3.org/TR/wai-aria-1.2/#navigation)

## Section 508


The Stepper is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Stepper has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Stepper has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The Stepper has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the Stepper component could be found here: https://demos.telerik.com/kendo-ui/accessibility/stepper
## See Also
* [Keyboard Navigation by the Stepper (Demo)](https://demos.telerik.com/kendo-ui/stepper/keyboard-navigation)
* [Keyboard Navigation by the Stepper]({% slug keynav_stepper_jquery %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)