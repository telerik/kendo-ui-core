---
title: Wai-Aria Support
page_title: jQuery DatePicker Documentation | DatePicker Accessibility
description: "Get started with the jQuery DatePicker by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: jquery_datepicker_accessibility
position: 1
---

# DatePicker Accessibility

The DatePicker is accessible by screen readers and provides [`WAI-ARIA`](https://www.w3.org/WAI/ARIA/apg/), [`Section 508`](https://www.section508.gov/), [`WCAG 2.2`](https://www.w3.org/TR/WCAG22/), and keyboard support.

For more information, refer to:
* [Keyboard navigation by the Kendo UI DatePicker]({% slug keynav_datepicker %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery DatePicker provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The DatePicker is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### DatePicker Wrapping Element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-input-inner` | `role=combobox` | The input element should follow the `combobox` specification. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-required=true` | The attribute is rendered only when the DatePicker is in a `form` HTML element and announces the required state of the component. |
|  | `aria-haspopup=grid` | Indicates the component has a Calendar Popup that implements `role="grid"`. |
|  | `aria-expanded=true/false` | Announces whether the Popup is visible or not. |
|  | `aria-controls=.k-animation-container id` | Points to the popup element. Signifies that the `combobox` element controls the Calendar `grid`. |
|  | `aria-activedescendant=.k-calendar-td.k-focus id` | Points to the focused item (date/month/year) in the Calendar Popup. Should only be present when the Popup is open. |
|  | `aria-describedby=.k-form-hint id/.k-form-error id` | Points to the hint for the input, or if the input is invalid, to the error message. This attribute should only be present when a hint is set or when the input is invalid. |
|  | `readonly=readonly` or `aria-readonly=true` | The attribute is rendered only when the DatePicker is readonly. |
|  | `aria-invalid=true` | The attribute is rendered only when the DatePicker is in a `form` HTML element and announces the valid state of the component. |
|  | `tabindex=0` | The element must be focusable. |
| `.k-disabled .k-input-inner` | `disabled=disabled` or `aria-disabled=true` | The attribute is rendered only when the DatePicker is disabled. |
| `.k-input-button` | `role=button` or `nodeName=button` | The element should either be a `<button>` element or should have `role="button"` assigned. |
|  | `aria-label` | The button needs an accessible name to be assigned to it. |
|  | `tabindex=-1` | The button element should not be focusable. |

### Calendar Popup


The Calendar in the Popup element of the component should implement the specification for the **Calendar** component.

[Calendar accessibility specification]({{calendar_a11y_link}})

## Resources

[WAI ARIA specification for combobox](https://www.w3.org/TR/wai-aria-1.2/#combobox)

[ARIA practices Date Picker Dialog Example](https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/datepicker-dialog.html)

## Section 508


The DatePicker is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The DatePicker has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The DatePicker has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing

The DatePicker has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

A live test example of the DatePicker component could be found here: https://demos.telerik.com/kendo-ui/accessibility/combobox

## See Also

* [Keyboard Navigation by the DatePicker (Demo)](https://demos.telerik.com/kendo-ui/datepicker/keyboard-navigation)
* [Keyboard Navigation by the DatePicker]({% slug keynav_datepicker %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)