---
title: Wai-Aria Support
page_title: jQuery ColorPalette Documentation | ColorPalette Accessibility
description: "Get started with the jQuery ColorPalette by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["colorpalette"]
slug: jquery_colorpalette_accessibility
position: 1
---

# ColorPalette Accessibility

The ColorPalette is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to:
* [Keyboard navigation by the Kendo UI ColorPalette]({% slug keynav_colorpalette_jquery %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery ColorPalette provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ColorPalette is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-colorpalette` | `role=grid` | The focusable wrapper of the component should announce its role as a `grid`. |
|  | `aria-label` or `aria-labelledby` | The component needs an accessible name to be assigned to it. Must also include the currently selected value in the component. |
|  | `aria-activedescendant=.k-colorpalette-tile.k-focus id` | Points to the focused cell in the table. The focused cell is changed via keyboard navigation. |
|  | `tabindex=0` | The element must be focusable. |
| `.k-colorpalette.k-disabled` | `aria-disabled=true` | Attribute is rendered only when the ColorPalette is disabled. |
| `.k-colorpalette-table` | `role=none/presentation` | Negates the default role of the element, as it is wrapped within a `role="grid"` element. |
| `.k-colorpalette-table>tbody>tr` | `role=row` | Required as the semantic role of its parent `<table>` has been removed. |
| `.k-colorpalette-tile` | `role=gridcell` | Required as the semantic role of its parent `<table>` has been removed. |
|  | `aria-label` or `title` | The text representation of the color value for the current cell. |
| `.k-colorpalette-tile.k-selected` | `aria-selected=true` | Present on the currently selected cell in the component. |

## Section 508


The ColorPalette is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ColorPalette has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ColorPalette has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing

The ColorPalette has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

A live test example of the ColorPalette component could be found here: https://demos.telerik.com/kendo-ui/accessibility/colorpalette

## See Also

* [Keyboard Navigation by the ColorPalette (Demo)](https://demos.telerik.com/kendo-ui/colorpalette/keyboard-navigation)
* [Keyboard Navigation by the ColorPalette]({% slug keynav_colorpalette_jquery %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)