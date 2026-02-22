---
title: Wai-Aria Support
page_title: jQuery FlatColorPicker Documentation | FlatColorPicker Accessibility
description: "Get started with the jQuery FlatColorPicker by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["flatcolorpicker"]
slug: jquery_flatcolorpicker_accessibility
position: 1
---

# FlatColorPicker Accessibility

The FlatColorPicker is accessible by screen readers and provides [`WAI-ARIA`](https://www.w3.org/WAI/ARIA/apg/), [`Section 508`](https://www.section508.gov/), [`WCAG 2.2`](https://www.w3.org/TR/WCAG22/), and keyboard support.

> The described level of compliance is achievable with the [`Ocean Blue A11y Accessibility Swatch`](/accessibility/themes-swatches).

For more information, refer to:
* [Keyboard navigation by the Kendo UI FlatColorPicker]({% slug keynav_flatcolorpicker_jquery %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery FlatColorPicker provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The FlatColorPicker is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The FlatColorPicker contains in itself ColorGradient, ColorPalette, a UI to switch between them, Cancel, Apply, and a button to reset its value. All the containing elements must implement their own specification apart from the ColorGradient element where some changes are required.

### FlatColorPicker Wrapping Element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-flatcolorpicker` | `role=textbox` | The focusable wrapper of the component should be considered a `textbox`. That signifies it has a value that could be submitted. |
|  | `aria-label` or `aria-labelledby` | The component needs an accessible name to be assigned to it. Must also include the currently selected value in the component. |
|  | `aria-invalid=true` | Attribute is rendered only when the selected value in the component is not valid against the current validation rules. |
|  | `tabindex=0` | The element must be focusable. |
| `.k-flatcolorpicker.k-disabled` | `aria-disabled=true` | Attribute is rendered only when the ColorPalette is disabled. |

### ColorGradient

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-colorgradient` | `role=none/` | The ColorGradient element must have its role removed. |
|  | `aria-label` | The ColorGradient element must have its `aria-label` attribute removed. |
|  | `tabindex=-1/` | The ColorGradient must be removed from the page tab sequence. |

## Section 508


The FlatColorPicker is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The FlatColorPicker has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The FlatColorPicker has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing

The FlatColorPicker has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

A live test example of the FlatColorPicker component could be found here: https://demos.telerik.com/kendo-ui/accessibility/flatcolorpicker

## See Also

* [Keyboard Navigation by the FlatColorPicker (Demo)](https://demos.telerik.com/kendo-ui/flatcolorpicker/keyboard-navigation)
* [Keyboard Navigation by the FlatColorPicker]({% slug keynav_flatcolorpicker_jquery %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)