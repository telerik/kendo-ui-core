---
title: Overview
page_title: jQuery Chip Documentation | Chip Accessibility
description: "Get started with the jQuery Chip by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_chip_widget
position: 1
---

# Chip Accessibility

The Chip is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).




Out of the box, the Kendo UI for jQuery Chip provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Chip is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `*:not(.k-chip-list) > .k-chip` | `role=button` | Announces that a chip is an optional inner component within the Chip list. |
| `*:not(.k-chip-list) > .k-chip.k-selected` | `aria-pressed=true` | Announces that the Chip has been selected. |
| `*:not(.k-chip-list) > .k-chip:not(.k-selected)` | `aria-pressed=false` | Announces that the Chip has not benn selected. |

## Resources

[WAI-ARIA Authoring Practices: Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

## Section 508


The Chip is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Chip has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Chip has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The Chip has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the Chip component could be found here: https://demos.telerik.com/kendo-ui/accessibility/chip
## See Also
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})