---
title: Wai-Aria Support
page_title: jQuery Diagram Documentation | Diagram Accessibility
description: "Get started with the jQuery Diagram by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["diagram"]
slug: jquery_diagram_accessibility
position: 1
---

# Diagram Accessibility

The Diagram is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to:
* [Keyboard navigation by the Kendo UI Diagram](slug:keynav_kendoui_diagram_widget)
* [Accessibility in Kendo UI for jQuery](slug:overview_accessibility_support_kendoui)

Out of the box, the Kendo UI for jQuery Diagram provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The Diagram is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The Diagram is an interactive [Graphics Document](https://www.w3.org/TR/graphics-aria-1.0/#graphics-document). All actions available for mouse users are also available through keyboard shortcuts.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-diagram` | `role=graphics-document` | Indicates that the Diagram element is a Graphics Document. |
|  | `aria-roledescription` | User-set value that clarifies the type of Diagram to screen reader users. |
|  | `aria-label` | Announces the accessible name of the Diagram. |
| `.k-diagram-shape` | `role=graphics-symbol` | Specifies the role of the shape elements. |
|  | `aria-roledescription=Shape` | Describes the role of the shape elements. |
|  | `aria-label` | Specifies the accessible name of the shape. |
| `.k-diagram-connection` | `role=graphics-symbol` | Specifies the role of the connection elements. |
|  | `aria-roledescription=Connection` | Describes the role of the connection elements. |
|  | `aria-label` | Specifies the accessible name of the connection. |

## Resources

[WAI-ARIA Graphics Module](https://www.w3.org/TR/graphics-aria-1.0/)

[Accessibility Style Guide: SVGs](https://a11y-style-guide.com/style-guide/section-media.html#kssref-media-svgs)

## Section 508

The Diagram is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The Diagram has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The Diagram has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Automated Testing

The Diagram has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

A live test example of the Diagram component could be found here: https://demos.telerik.com/kendo-ui/accessibility/diagram

## Keyboard Navigation

For details on how the Diagram keyboard navigation works, refer to the [Diagram Keyboard Navigation](slug:keynav_kendoui_diagram_widget) article.

## See Also

* [Keyboard Navigation by the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/keyboard-navigation)
* [Keyboard Navigation by the Diagram](slug:keynav_kendoui_diagram_widget)
* [Accessibility in Kendo UI for jQuery](slug:overview_accessibility_support_kendoui)
* [Keyboard Support in Kendo UI for jQuery](slug:overview_accessibility_support_kendoui#keyboard-navigation)
