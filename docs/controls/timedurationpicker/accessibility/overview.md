---
title: Wai-Aria Support
page_title: jQuery TimeDurationPicker Documentation | TimeDurationPicker Accessibility
description: "Get started with the jQuery TimeDurationPicker by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: jquery_timedurationpicker_accessibility
position: 1
---

# TimeDurationPicker Accessibility

The TimeDurationPicker is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).




Out of the box, the Kendo UI for jQuery TimeDurationPicker provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The TimeDurationPicker is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### TimeDurationPicker Wrapping Element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-input-inner` | `role=combobox` | The input element should follow the `combobox` specification. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-expanded=true/false` | Announces whether the Popup is visible or not. |
|  | `aria-haspopup=dialog` | Indicates the component has a Dialog Popup |
|  | `aria-controls=.k-popup id` | Points to the popup element. Signifies that the `combobox` element controls the `dialog` popup. |
|  | `readonly` or `aria-readonly` | Attribute is rendered only when the DatePicker is readonly. |
| `.k-invalid .k-input-inner,.ng-invalid .k-input-inner` | `aria-invalid=true` | Attribute is rendered only when the picker is in form and announces the valid state of the component. |
| `.k-disabled .k-input-inner` | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the DatePicker is disabled. |
| `.k-input-button` | `aria-hidden=true` | The button element must be hidden from the assistive technologies. |
|  | `tabindex=-1` | Button element must not be focusable. |
| `k-timedurationpicker.k-disabled .k-button` | `disabled` or `aria-disabled=true` | Attribute is rendered only when the picker is disabled. |

### List Elements on the Popup

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-time-list` | `role=listbox` | The timelist elements must have `listbox` role assigned. |
|  | `aria-label` or `aria-labelledby` | The listbox needs an accessible name to be assigned to it. |
| `.k-time-list .k-reset` | `role=none/presentation` | The k-rest `<ul>` element semantic meaning must be removed from the accessibility tree. |
| `.k-time-list .k-item` | `role=option` | The available options in the listbox must be marked as such. |
|  | `aria-selected=true/false` | Selected option must have its `aria-selected` attribute set to `true`. |

## Resources

[WAI-ARIA specification for combobox](https://www.w3.org/TR/wai-aria-1.2/#combobox)

[WAI-ARIA specification for listbox](https://www.w3.org/TR/wai-aria-1.2/#listbox)

## Section 508


The TimeDurationPicker is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The TimeDurationPicker has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The TimeDurationPicker has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The TimeDurationPicker has been tested with [axe-core](https://github.com/dequelabs/axe-core).
## See Also
* [Keyboard Navigation by the TimeDurationPicker (Demo)](https://demos.telerik.com/kendo-ui/timedurationpicker/keyboard-navigation)
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)