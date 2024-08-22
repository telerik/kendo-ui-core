---
title: Overview
page_title: jQuery RadioButton Documentation | RadioButton Accessibility
description: "Get started with the jQuery RadioButton by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_radiobutton_widget
position: 1
---

# RadioButton Accessibility

The RadioButton is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery RadioButton provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The RadioButton is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-radio` | `type=radio` | Announces the radio type of the input. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input requires an accessible name that will be assigned to it. |
|  | `checked=checked` | Announces the checked state of the radio button. |
|  | `disabled=disabled` or `aria-disabled=true` | The attribute is rendered only when the radio input is disabled. |
| `.k-invalid,.ng-invalid` | `aria-invalid=true` | The attribute is rendered only when the radio button is in a form and announces the valid state of the component. |

## Resources

[WAI-ARIA Authoring Practices: Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)

## Section 508


The RadioButton is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The RadioButton has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The RadioButton has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The RadioButton has been tested with [axe-core](https://github.com/dequelabs/axe-core).
## See Also
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})