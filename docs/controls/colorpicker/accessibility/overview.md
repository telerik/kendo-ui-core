---
title: Wai-Aria Support
page_title: jQuery ColorPicker Documentation | ColorPicker Accessibility
description: "Get started with the jQuery ColorPicker by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: jquery_colorpicker_accessibility
position: 1
---

# ColorPicker Accessibility

The ColorPicker is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to:
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery ColorPicker provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ColorPicker is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The ColorPicker popup contains in itself ColorGradient, ColorPalette, a UI to switch between them, and a button to reset its value. All the containing elements must implement their own specification apart from the ColorGradient element where some changes are required.

### ColorPicker Wrapping Element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-colorpicker` | `role=combobox` | The focusable element of the component should have role `combobox` (an input with popup). |
|  | `aria-label` or `aria-labelledby` | The component needs an accessible name to be assigned to it. Must also include the currently selected value in the component. |
|  | `aria-haspopup=dialog` | Indicates the component has a Dialog Popup. |
|  | `aria-expanded` | Announces the state of the visibility of the popup. |
|  | `aria-controls=.k-colorpicker-popup id` | Points to the popup element. Signifies that the `combobox` element controls the `dialog`. |
|  | `tabindex=0` | The element must be focusable. |
| `.k-invalid,.ng-invalid` | `aria-invalid=true` | Attribute is rendered only when the picker is in form and announces the valid state of the component. |
| `.k-colorpicker.k-disabled` | `aria-disabled=true` | Attribute is rendered only when the picker is disabled. |
| `.k-colorpicker.k-disabled .k-button` | `disabled` or `aria-disabled=true` | Attribute is rendered only when the picker is disabled. |

### ColorGradient in the Popup

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-colorgradient` | `role=none/undefined` | The ColorGradient element must have its role removed. |
|  | `aria-label=undefined` | The ColorGradient element must have its `aria-label` attribute removed. |
|  | `tabindex=-1/undefined` | The ColorGradient must be removed from the page tab sequence. |

### Adaptive Mode


When the component is in adaptive mode, the popup element follows the specifications of the ActionSheet component.

[ActionSheet accessibility specification]({% slug jquery_actionsheet_accessibility %})

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-colorgradient` | `role=none/undefined` | The ColorGradient element must have its role removed. |
|  | `aria-label=undefined` | The ColorGradient element must have its `aria-label` attribute removed. |

## Section 508


The ColorPicker is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ColorPicker has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ColorPicker has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing

The ColorPicker has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

A live test example of the ColorPicker component could be found here: https://demos.telerik.com/kendo-ui/accessibility/colorpicker

## See Also

* [Keyboard Navigation by the ColorPicker (Demo)](https://demos.telerik.com/kendo-ui/colorpicker/keyboard-navigation)
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)