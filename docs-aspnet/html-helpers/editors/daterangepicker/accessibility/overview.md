---
title: Overview
page_title: DateRangePicker Documentation | DateRangePicker Accessibility
description: "Get started with the {{ site.product }} DateRangePicker and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_daterangepicker_accessibility
position: 1
---

# DateRangePicker Accessibility





Out of the box, the {{ site.product }} DateRangePicker provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The DateRangePicker is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### Input elements

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-input-inner` | `role=combobox` | The input element should follow the `combobox` specification. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-required=true` | The attribute is rendered only when the DateRangePicker is in a `form` HTML element and announces the required state of the component. |
|  | `aria-describedby=.k-form-hint id/.k-form-error id` | Points to the hint for the input, or if the input is invalid, to the error message. This attribute should only be present when a hint is set or when the input is invalid. |
|  | `aria-haspopup=grid` | Indicates the component has a Calendar Popup that implements `role="grid"`. |
|  | `aria-expanded=true/false` | Announces whether the Popup is visible or not. |
|  | `aria-controls=.k-calendar-container id` | Points to the popup element. Signifies that the `combobox` element controls the Calendar `grid`. |
| `.k-input-inner.k-focus` | `aria-activedescendant=.k-calendar-td.k-focus id` | Points to the focused item (date/month/year) in the Calendar Popup. Should only be present when the Popup is open. |
|  | `readonly=readonly` or `aria-readonly=true` | Attribute is rendered only when the DateRangePicker is readonly. |
|  | `tabindex=0` | The element should be focusable. |
| `.k-invalid .k-input-inner,.ng-invalid .k-input-inner` | `aria-invalid=true` | Attribute is rendered only when the combobox is in form and announces the valid state of the component. |
| `.k-disabled .k-input-inner` | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the DateRangePicker is disabled. |

### Calendars Popup


The Calendars in the Popup element of the component should implement the specification for the **MultiViewCalendar** component.

[Calendar accessibility specification]({% slug htmlhelpers_calendar_accessibility %})

## Resources

[WAI ARIA specification for combobox](https://www.w3.org/TR/wai-aria-1.2/#combobox)

[ARIA practices Date Picker Dialog Example](https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/datepicker-dialog.html)

## Section 508


The DateRangePicker is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The DateRangePicker has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The DateRangePicker has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the DateRangePicker component, refer to the [DateRangePicker Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/daterangepicker).

## Keyboard Navigation

For details on how the DateRangePicker keyboard navigation works, refer to the [DateRangePicker Keyboard Navigation]({%slug keynav_daterangepicker_aspnetcore%}) article.

## See Also

* [Keyboard Navigation by the DateRangePicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/daterangepicker/keyboard-navigation)
* [Keyboard Navigation by the DateRangePicker for {{ site.framework }}]({% slug keynav_daterangepicker_aspnetcore %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})