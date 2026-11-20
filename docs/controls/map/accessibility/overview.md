---
title: Wai-Aria Support
page_title: jQuery Map Documentation | Map Accessibility
description: "Get started with the jQuery Map by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["map"]
slug: jquery_map_accessibility
position: 1
---

# Map Accessibility

The Map is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).

Out of the box, the Kendo UI for jQuery Map provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The Map is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The Map component renders an interactive geographic map. It relies on the `role` attribute and accessible labels to convey its meaning to assistive technologies.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-map` | `role=img` | The Map element serves as a visual representation of geographic data. |
|  | `aria-label` or `aria-labelledby` | The Map needs an accessible name to be assigned to it. Must describe the purpose of the map. |
|  | `tabindex=0` | Makes the Map focusable so keyboard users can interact with it. |

## Section 508

The Map is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The Map has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The Map has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Automated Testing

The Map has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

For a live test example, see the [Map accessibility demo](https://demos.telerik.com/kendo-ui/accessibility/map).

## See Also

* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)
