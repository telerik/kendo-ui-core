---
title: Overview
page_title: jQuery MaskedTextBox Documentation | MaskedTextBox Accessibility
description: "Get started with the jQuery MaskedTextBox by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_maskedtextbox_widget
position: 1
---

# MaskedTextBox Accessibility

The MaskedTextBox is accessible by screen readers and provides [`WAI-ARIA`](https://www.w3.org/WAI/ARIA/apg/), [`Section 508`](https://www.section508.gov/), [`WCAG 2.2`](https://www.w3.org/TR/WCAG22/), and keyboard support.

For more information, refer to:
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery MaskedTextBox provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The MaskedTextBox is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### `input` Element


The following table summarizes the selectors and attributes supported by the `input` element of the MaskedTextBox:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-input-inner` | `role=textbox` or `nodeName=input` | Specifies the role of the component. Not required if the `<input type=text`> configuration is used. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input requires an accessible name that will be assigned to it. |
|  | `aria-placeholder` | Announces the mask or placeolder for the component. |
| `.k-invalid .k-input-inner,.ng-invalid .k-input-inner` | `aria-invalid=true` | The attribute is rendered only when the MaskedTextBox is in a form and announces the valid state of the component. |
| `.k-disabled .k-input-inner` | `disabled=disabled` or `aria-disabled=true` | The attribute is rendered only when the MaskedTextBox is disabled. |

## Section 508


The MaskedTextBox is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The MaskedTextBox has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The MaskedTextBox has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing

The MaskedTextBox has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

A live test example of the MaskedTextBox component could be found here: https://demos.telerik.com/kendo-ui/accessibility/maskedtextbox

## See Also

* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})