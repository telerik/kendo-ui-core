---
title: Wai-Aria Support
page_title: jQuery TileLayout Documentation | TileLayout Accessibility
description: "Get started with the jQuery TileLayout by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_tilelayout_widget
position: 1
---

# TileLayout Accessibility

The TileLayout is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI TileLayout]({% slug keynav_kendoui_tilelayout_widget %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery TileLayout provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The TileLayout is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AAA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-tilelayout` | `role=list` | Sets list role to the TileLayout wrapper. |
| `.k-tilelayout-item` | `role=listitem` | Sets listitem role to the TileLayout items. |
|  | `aria-labelledby` | Associates the focusable item wrapper with the respective header text element (.k-tilelayout-item-header .k-card-title). |
|  | `tabindex=0` | Makes the item wrapper element focusable. |
|  | `aria-keyshortcuts=Enter` | Announces Enter as an available key shortcut when the item is focused. |
|  | `aria-dropeffect=execute` | Announces that an action, supported by the drop-target (resizing or reordering) will be executed when the item is dropped. |
|  | `aria-grabbed=true/false` | The aria-grabbed state indicates an element's 'grabbed' state in a drag-and-drop operation. |
| `.k-tilelayout-item-header .k-card-title` | `id` | Unique and deterministic identifier to link the header text element to the focusable wrapper. |

## Section 508


The TileLayout is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The TileLayout has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The TileLayout has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The TileLayout has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the TileLayout component could be found here: https://demos.telerik.com/kendo-ui/accessibility/tilelayout
## See Also
* [Keyboard Navigation by the TileLayout (Demo)](https://demos.telerik.com/kendo-ui/tilelayout/keyboard-navigation)
* [Keyboard Navigation by the TileLayout]({% slug keynav_kendoui_tilelayout_widget %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)