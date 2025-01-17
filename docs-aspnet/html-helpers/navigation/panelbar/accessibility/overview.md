---
title: Overview
page_title: PanelBar Documentation | PanelBar Accessibility
description: "Get started with the {{ site.product }} PanelBar and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_aspnetcore_panelbar
position: 1
---

# PanelBar Accessibility

Out of the box, the {{ site.product }} PanelBar provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The PanelBar is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-panelbar` | `role=tree` | The root element of the PanelBar has role `tree`. |
|  | `aria-activedescendant=.k-item id` | Points to the currently focused item in the PanelBar. |
| `.k-panelbar-group` | `role=group` | The `ul` element that wraps child nodes. |
| `[aria-expanded='false']>.k-panelbar-group` | `aria-hidden=true` | Hides the `group` element from assistive technologies when its parent is not expanded. |
| `.k-item` | `role=treeitem` | The `li` element rendered for a PanelBar item. |
|  | `aria-expanded=true/false` | Announces the expanded state of the item (if expandable). It is `true` when expanded, and `false` when collapsed. |
|  | `aria-selected=true/false` | Announces the selected state of the item. |

## Resources

[ARIA practices Navigation Treeview Example](https://www.w3.org/WAI/ARIA/apg/example-index/treeview/treeview-navigation.html)

## Section 508

The PanelBar is fully compliant with the [Section 508 requirements](https://www.section508.gov/).

## Testing

The PanelBar has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The PanelBar has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Test Example

To test the PanelBar component, refer to the [PanelBar Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/panelbar).

## Keyboard Navigation

For details on how the PanelBar keyboard navigation works, refer to the [PanelBar Keyboard Navigation]({%slug keynav_aspnetcore_panelbar%}) article.

## See Also

* [Keyboard Navigation by the PanelBar for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar/keyboard-navigation)
* [Keyboard Navigation by the PanelBar for {{ site.framework }}]({% slug keynav_aspnetcore_panelbar %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})