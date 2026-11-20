---
title: Wai-Aria Support
page_title: jQuery RadialGauge Documentation | RadialGauge Accessibility
description: "Get started with the jQuery RadialGauge by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["radialgauge"]
slug: jquery_radialgauge_accessibility
position: 1
---

# RadialGauge Accessibility

The RadialGauge is accessible by screen readers and provides WAI-ARIA, Section 508, and WCAG 2.2 support.

For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).

Out of the box, the Kendo UI for jQuery RadialGauge provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The RadialGauge is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the keyboard navigation for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The RadialGauge component renders as an SVG element. As such, it relies on the `role` attribute and accessible labels to convey its meaning to assistive technologies.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-radialgauge` | `role=img` | The RadialGauge element serves as a visual representation of data. |
|  | `aria-label` or `aria-labelledby` | The RadialGauge needs an accessible name to be assigned to it. Must describe the purpose of the gauge and its current value. |

## Section 508

The RadialGauge is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The RadialGauge has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The RadialGauge has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Automated Testing

The RadialGauge has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

For a live test example, see the [RadialGauge accessibility demo](https://demos.telerik.com/kendo-ui/accessibility/radialgauge).

## See Also

* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)
