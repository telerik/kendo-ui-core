---
title: Overview
page_title: Slider Documentation | Slider Accessibility
description: "Get started with the {{ site.product }} Slider and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_aspnetcore_slider
position: 1
---

# Slider Accessibility





Out of the box, the {{ site.product }} Slider provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Slider is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### Slider Drag Handle

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-draghandle` | `role=slider` | Sets the proper role for Slider. |
|  | `aria-label` or `aria-labelledby` or `title` | The Slider needs an accessible name to be assigned to it. |
|  | `aria-valuetext` | Specifies the text that would be announced based on the currently selected value in the Slider. |
|  | `aria-readonly=true` | Attribute is rendered only when the Slider is readonly. |
|  | `aria-invalid=true` | Attribute is rendered only when the Slider is in form and announces the valid state of the component. |
|  | `tabindex=0` | The element must be focusable. |
| `.k-draghandle:not(.k-hsv-draghandle)` | `aria-valuenow` | Specifies the currently selected value in the Slider. |
|  | `aria-valuemin` | Specifies the minimum available value in the Slider. |
|  | `aria-valuemax` | Specifies the maximum available value in the Slider. |
| `.k-slider-vertical .k-draghandle` | `aria-orientation=vertical` | Present only when slider is vertical. |
| `.k-disabled .k-draghandle` | `aria-disabled=true` | Attribute is rendered only when the Slider is disabled. |

> Note that using an `<a>` element for `role="slider"` is not allowed.

### Slider Buttons

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-slider .k-button-decrease, .k-slider .k-button-increase` | `aria-hidden=true` | Hides the decrease/increase button elements and all their children from assistive technologies. |
|  | `tabindex=-1` | Excludes the decorative decrease/increase buttons from the natural tab order of the page. |

## Resources

[WAI-ARIA specification for slider](https://www.w3.org/TR/wai-aria-1.2/#slider)

## Section 508


The Slider is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Slider has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Slider has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the Slider component, refer to the [Slider Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/slider).

## Keyboard Navigation

For details on how the Slider keyboard navigation works, refer to the [Slider Keyboard Navigation Demo](https://demos.telerik.com/{{ site.platform }}/slider/keyboard-navigation).

## See Also

* [Keyboard Navigation by the Slider for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/slider/keyboard-navigation)
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})