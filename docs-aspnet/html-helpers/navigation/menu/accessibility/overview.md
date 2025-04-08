---
title: Overview
page_title: Menu Documentation | Menu Accessibility
description: "Get started with the {{ site.product }} Menu and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_menu_accessibility
position: 1
---

# Menu Accessibility





Out of the box, the {{ site.product }} Menu provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Menu is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-menu:not(.k-context-menu)` | `role=menubar` | Announces the Menu menubar role |
| `.k-menu.k-menu-vertical` | `aria-orientation=vertical` | Announces the Menu orientation when vertical. |
| `.k-menu-item` | `role=menuitem` | Announces the Menu item role. |
|  | `tabindex=0/-1` | The focused item has tabindex '0', the rest - '-1' |
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



### Test Example

To test the Menu component, refer to the [Menu Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/menu).

## Keyboard Navigation

For details on how the Menu keyboard navigation works, refer to the [Menu Keyboard Navigation]({%slug htmlhelpers_menu_keyboardnavigation_aspnetcore%}) article.

## See Also

* [Keyboard Navigation by the Menu for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/menu/keyboard-navigation)
* [Keyboard Navigation by the Menu for {{ site.framework }}]({% slug htmlhelpers_menu_keyboardnavigation_aspnetcore %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})