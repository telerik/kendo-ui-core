---
title: Overview
page_title: jQuery DateInput Documentation | DateInput Accessibility
description: "Get started with the jQuery DateInput by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_dateinput_widget
position: 1
---

# DateInput Accessibility

The DateInput is accessible by screen readers and provides [`WAI-ARIA`](https://www.w3.org/WAI/ARIA/apg/), [`Section 508`](https://www.section508.gov/), [`WCAG 2.2`](https://www.w3.org/TR/WCAG22/), and keyboard support.

For more information, refer to:
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery DateInput provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The DateInput is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-input-inner` | `role=textbox` or `nodeName=input` | The element should either be an `<input type="text">` element or should have `role="textbox"` assigned. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `readonly=readonly` or `aria-readonly=true` | Attribute is rendered only when the DateInput is readonly. |
|  | `tabindex=0` | The element should be focusable. |
| `.k-disabled .k-input-inner` | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the DateInput is disabled. |

## Resources

[ARIA practices Date Picker Dialog Example](https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/datepicker-dialog.html)

## Section 508


The DateInput is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The DateInput has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The DateInput has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing

The DateInput has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

A live test example of the DateInput component could be found here: https://demos.telerik.com/kendo-ui/accessibility/dateinput

## See Also

* [Keyboard Navigation by the DateInput (Demo)](https://demos.telerik.com/kendo-ui/dateinput/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})