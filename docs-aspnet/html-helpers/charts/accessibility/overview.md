---
title: Overview
page_title: Telerik UI Charts Documentation | Charts Accessibility
description: "Get started with the Telerik UI Chart component for {{ site.framework }} and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_chart_accessibility
position: 1
---

# Chart Accessibility

Out of the box, the {{ site.product }} Chart provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The Chart is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The Chart is an interactive [Graphics Document](https://www.w3.org/TR/graphics-aria-1.0/#graphics-document). All actions available for mouse users are also available through keyboard shortcuts.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-chart` | `role=graphics-document` | Indicates that the Chart element is a Graphics Document. |
|  | `aria-roledescription` | User-set value that clarifies the type of Chart to screen reader users. |
|  | `aria-label` | Announces the user-set title of the Chart. |
| `.k-chart-point` | `role=graphics-symbol` | Specifies the role of the series point elements. |
|  | `aria-roledescription=Point` | Describes the role of the series point elements. |
| `.k-chart-legend-item` | `role=checkbox` | Specifies the role of the legend item element. |
|  | `aria-label` | Specifies the name of the series associated with this legend item. |
|  | `aria-roledescription=Legend item` | Specifies the name of the series associated with this legend item. |

## Resources

[WAI-ARIA Graphics Module](https://www.w3.org/TR/graphics-aria-1.0/)

[Accessibility Style Guide: SVGs](https://a11y-style-guide.com/style-guide/section-media.html#kssref-media-svgs)

## Section 508

The Chart is fully compliant with the [Section 508 requirements](https://www.section508.gov/).

## Testing

The Chart has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The Chart has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Test Example

To test the Chart component, refer to the [Charts Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/chart).

## Keyboard Navigation

For details on how the Chart keyboard navigation works, refer to the [Chart Keyboard Navigation]({%slug keynav_aspnetcore_charts%}) article.

## See Also

* [Keyboard Navigation by the Chart for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/charts/keyboard_navigation)
* [Keyboard Navigation by the Chart for {{ site.framework }}]({% slug keynav_aspnetcore_charts %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})
* [Interacting with {{ site.product }} Charts and Graphs]({%slug accessible_charts%})

