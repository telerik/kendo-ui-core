---
title: Wai-Aria Support
page_title: jQuery LinearGauge Documentation | LinearGauge Accessibility
description: "Get started with the jQuery LinearGauge by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["lineargauge"]
slug: jquery_lineargauge_accessibility
position: 1
---

# LinearGauge Accessibility

The LinearGauge is accessible by screen readers and provides WAI-ARIA, Section 508, and WCAG 2.2 support.

For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).

Out of the box, the Kendo UI for jQuery LinearGauge provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The LinearGauge is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the keyboard navigation for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The LinearGauge component renders as an SVG element. As such, it relies on the `role` attribute and accessible labels to convey its meaning to assistive technologies.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-lineargauge` | `role=img` | The LinearGauge element serves as a visual representation of data. |
|  | `aria-label` or `aria-labelledby` | The LinearGauge needs an accessible name to be assigned to it. Must describe the purpose of the gauge and its current value. |

## Section 508

The LinearGauge is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The LinearGauge has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The LinearGauge has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Automated Testing

The LinearGauge has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

For a live test example, see the [LinearGauge accessibility demo](https://demos.telerik.com/kendo-ui/accessibility/lineargauge).

## See Also

* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)
