---
title: Overview
page_title: TimePicker Documentation | TimePicker Accessibility
description: "Get started with the {{ site.product }} TimePicker and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_timepicker_accessibility
position: 1
---

# TimePicker Accessibility





Out of the box, the {{ site.product }} TimePicker provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The TimePicker is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### TimePicker Wrapping Element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-input-inner` | `role=combobox` | The input element should follow the `combobox` specification. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-required=true` | The attribute is rendered only when the TimePicker is in a `form` HTML element and announces the required state of the component. |
|  | `aria-describedby=.k-form-hint id/.k-form-error id` | Points to the hint for the input, or if the input is invalid, to the error message. This attribute should only be present when a hint is set or when the input is invalid. |
|  | `aria-expanded=true/false` | Announces whether the Popup is visible or not. |
|  | `aria-haspopup=dialog` | Indicates the component has a Dialog Popup. |
|  | `aria-controls=.k-animation-container id` | Points to the popup element. Signifies that the `combobox` element controls the `dialog` popup. |
|  | `readonly` or `aria-readonly` | Attribute is rendered only when the DatePicker is readonly. |
| `.k-invalid .k-input-inner,.ng-invalid .k-input-inner` | `aria-invalid=true` | Attribute is rendered only when the picker is in form and announces the valid state of the component. |
| `.k-disabled .k-input-inner` | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the DatePicker is disabled. |
| `.k-input-button` | `role=button` or `nodeName=button` | The element must either be a `<button>` element or must have `role=button` assigned. |
|  | `aria-label` | The button needs an accessible name to be assigned to it. |
|  | `tabindex=-1` | Button element must not be focusable. |
| `.k-timepicker.k-disabled .k-button` | `disabled` or `aria-disabled` | Attribute is rendered only when the picker is disabled. |

### List Elements on the Popup

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-time-list` | `role=listbox` | The timelist elements must have `listbox` role assigned. |
|  | `aria-label` or `aria-labelledby` | The listbox needs an accessible name to be assigned to it. |
| `.k-reset` | `role=none/presentation` | The k-rest `<ul>` element semantic meaning must be removed from the accessibility tree. |
| `.k-item` | `role=option` | The available options in the listbox must be marked as such. |
|  | `aria-selected=true/false` | Selected option must have its `aria-selected` attribute set to `true`. |

## Resources

[WAI-ARIA specification for combobox](https://www.w3.org/TR/wai-aria-1.2/#combobox)

[WAI-ARIA specification for listbox](https://www.w3.org/TR/wai-aria-1.2/#listbox)

## Section 508


The TimePicker is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The TimePicker has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The TimePicker has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the TimePicker component, refer to the [TimePicker Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/timepicker).

## Keyboard Navigation

For details on how the TimePicker keyboard navigation works, refer to the [TimePicker Keyboard Navigation]({%slug keynav_timepicker_aspnetcore%}) article.

## See Also

* [Keyboard Navigation by the TimePicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timepicker/keyboard-navigation)
* [Keyboard Navigation by the TimePicker for {{ site.framework }}]({% slug keynav_timepicker_aspnetcore %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})