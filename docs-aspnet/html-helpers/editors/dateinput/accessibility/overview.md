---
title: Overview
page_title: DateInput Documentation | DateInput Accessibility
description: "Get started with the {{ site.product }} DateInput and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_dateinput_accessibility
position: 1
---

# DateInput Accessibility





Out of the box, the {{ site.product }} DateInput provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The DateInput is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-input-inner` | `role=textbox` or `nodeName=input` | The element should either be an `<input type="text">` element or should have `role="textbox"` assigned. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-required=true` | The attribute is rendered only when the DateInput is in a `form` HTML element and announces the required state of the component. |
|  | `aria-invalid=true` | The attribute is rendered only when the DateInput is in a `form` HTML element and announces the valid state of the component. |
|  | `aria-describedby=.k-form-hint id/.k-form-error id` | Points to the hint for the input, or if the input is invalid, to the error message. This attribute should only be present when a hint is set or when the input is invalid. |
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



### Test Example

To test the DateInput component, refer to the [DateInput Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/dateinput).

## Keyboard Navigation

For details on how the DateInput keyboard navigation works, refer to the [DateInput Keyboard Navigation]({%slug htmlhelpers_dateinput_accessibility_keyboardnavigation%}) article.

## See Also

* [Keyboard Navigation by the DateInput for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dateinput/keyboard-navigation)
* [Keyboard Navigation by the DateInput for {{ site.framework }}]({% slug htmlhelpers_dateinput_accessibility_keyboardnavigation %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})