---
title: Overview
page_title: jQuery Menu Documentation | Menu Accessibility
description: "Get started with the jQuery Menu by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_menu_jquery
position: 1
---

# Menu Accessibility

The Menu is accessible by screen readers and provides [`WAI-ARIA`](https://www.w3.org/WAI/ARIA/apg/), [`Section 508`](https://www.section508.gov/), [`WCAG 2.2`](https://www.w3.org/TR/WCAG22/), and keyboard support.

For more information, refer to:
* [Keyboard navigation by the Kendo UI Menu]({% slug keynav_menu_jquery %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery Menu provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Menu is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-menu:not(.k-context-menu)` | `role=menubar` | Announces the Menu menubar role |
|  | `aria-activedescendent=.k-menu-item.k-focus id` | Points to the currently active menuitem. |
| `.k-menu.k-menu-vertical` | `aria-orientation=vertical` | Announces the Menu orientation when vertical. |
| `.k-menu-item` | `role=menuitem` | Announces the Menu item role. |
| `.k-menu-item[aria-expanded]` | `aria-haspopup=true` | Indicates that there is a popup, associated with the item. Applicable to expandable items only. |
| `.k-menu-item[aria-haspopup]` | `aria-controls=ul.k-menu-group id` | Indicates that there is a popup, associated with the item. Applicable to expandable items only. |
| `.k-menu-item[aria-haspopup]` | `aria-expanded=true/false` | Indicates whether the item is expanded. |
| `.k-menu-item.k-disabled` | `aria-disabled=true` | Informs assistive technologies that a Menu item is disabled. |
| `.k-menu-expand-arrow` | `aria-hidden=true` | The Menu item expand arrow elements are hidden from the assistive technologies. |
| `.k-menu-popup .k-menu-group` | `role=menu` | The role of the nested (not root-level) menu displayed in a popup. |
|  | `id` | Each nested menu has a deterministic id attribute that is linked to the aria-controls attribute ot its parent. |

## Resources

[ARIA patterns Menu](https://www.w3.org/WAI/ARIA/apg/patterns/menu/)

## Section 508


The Menu is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Menu has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Menu has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing

The Menu has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

A live test example of the Menu component could be found here: https://demos.telerik.com/kendo-ui/accessibility/menu

## See Also

* [Keyboard Navigation by the Menu (Demo)](https://demos.telerik.com/kendo-ui/menu/keyboard-navigation)
* [Keyboard Navigation by the Menu]({% slug keynav_menu_jquery %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})