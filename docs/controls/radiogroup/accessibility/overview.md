---
title: Overview
page_title: jQuery RadioGroup Documentation | RadioGroup Accessibility
description: "Get started with the jQuery RadioGroup by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_radiogroup_widget
position: 1
---

# RadioGroup Accessibility

The RadioGroup is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI RadioGroup]({% slug keynav_radiogroup_jquery %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery RadioGroup provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The RadioGroup is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-radio-list` | `role=radiogroup` | Announces the `radiogroup` role of the element. |
| `.k-radio-item` | `role=none` | Due to issues with nested items, forces a no-role state. |
| `.k-radio` | `readonly` or `aria-readonly` | The attribute is rendered only when the radio button is read-only. |
|  | `aria-invalid=true` | The attribute is rendered only when the radio button is in a `form` HTML element and announces the invalid state of the component. |
| `.k-disabled > .k-radio` | `disabled` or `aria-disabled` | The attribute is rendered only when the radio button is disabled. |

## Resources

[WAI-ARIA Radio Group Specification](https://www.w3.org/TR/wai-aria-1.2/#radiogroup)

[WAI-ARIA Authoring Practices: Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton/)

## Section 508


The RadioGroup is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The RadioGroup has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The RadioGroup has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The RadioGroup has been tested with [axe-core](https://github.com/dequelabs/axe-core).
## See Also
* [Keyboard Navigation by the RadioGroup (Demo)](https://demos.telerik.com/kendo-ui/radiogroup/keyboard-navigation)
* [Keyboard Navigation by the RadioGroup]({% slug keynav_radiogroup_jquery %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})