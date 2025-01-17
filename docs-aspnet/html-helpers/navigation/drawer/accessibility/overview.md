---
title: Overview
page_title: Drawer Documentation | Drawer Accessibility
description: "Get started with the {{ site.product }} Drawer and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_aspnetcore_drawer
position: 1
---

# Drawer Accessibility

Out of the box, the {{ site.product }} Drawer provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The Drawer is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The Drawer component allows rendering a whole template inside of it. Thus, the accessibility roles are applied only when the built-in data-binding is used.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-drawer ul` | `role=menubar` | Indicates that the list of drawer items is a menubar. |
|  | `aria-orientation=vertical` | Indicates that the orientation of the drawer is vertical. |
| `.k-drawer-item:not(.k-drawer-separator)` | `role=menuitem` | Indicates that the item of a Drawer serves as a menuitem. |
|  | `aria-label` | The Drawer item requires an `aria-label` attribute when in mini mode and no content is rendered in the item. The `aria-label` points to the text field value of the item. |
| `.k-drawer-item.k-drawer-separator` | `role=separator` | Indicates that the item of a Drawer serves as a separator. |

## Section 508

The Drawer is fully compliant with the [Section 508 requirements](https://www.section508.gov/).

## Testing

The Drawer has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The Drawer has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Test Example

To test the Drawer component, refer to the [Drawer Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/drawer).

## Keyboard Navigation

For details on how the Drawer keyboard navigation works, refer to the [Drawer Keyboard Navigation]({%slug htmlhelpers_actionsheet_keyboardnavigation_aspnetcore%}) article.

## See Also

* [Keyboard Navigation by the Drawer for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/drawer/keyboard-navigation)
* [Keyboard Navigation by the Drawer for {{ site.framework }}]({% slug htmlhelpers_actionsheet_keyboardnavigation_aspnetcore %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})