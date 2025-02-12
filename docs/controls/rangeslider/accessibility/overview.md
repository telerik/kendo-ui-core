---
title: Wai-Aria Support
page_title: jQuery RangeSlider Documentation | RangeSlider Accessibility
description: "Get started with the jQuery RangeSlider by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_rangeslider_widget
position: 1
---

# RangeSlider Accessibility

The RangeSlider is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).




Out of the box, the Kendo UI for jQuery RangeSlider provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The RangeSlider is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

[Slider accessibility specification]({{slider_a11y_link}})


The two focusable elements of the RangeSlider must implement the specification for the **Slider** component. Here is just one clarification for the use of `aria-valuetext` attribute:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-draghandle` | `aria-valuetext` | Specifies the text that would be announced based on the currently selected values in both handle elements (e.g. `aria-valuetext="10 - 50"`). |

## Resources

[WAI-ARIA specification for Slider](https://www.w3.org/TR/wai-aria-1.2/#slider)

## Section 508


The RangeSlider is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The RangeSlider has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The RangeSlider has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The RangeSlider has been tested with [axe-core](https://github.com/dequelabs/axe-core).

## See Also
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)