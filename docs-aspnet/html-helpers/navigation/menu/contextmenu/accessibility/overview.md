---
title: Overview
page_title: Telerik UI ContextMenu for {{ site.framework }} Documentation | ContextMenu Accessibility
description: "Get started with the Telerik UI ContextMenu component for {{ site.framework }} and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["menu"]
slug: htmlhelpers_contextmenu_accessibility
position: 1
---

# ContextMenu Accessibility

Out of the box, the {{ site.product }} ContextMenu provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The ContextMenu is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-context-menu` | `role=menu` | The context menu implements the `menu` role. |

Apart from the above, the ContextMenu element must implement the [specification for a vertical Menu component]({% slug htmlhelpers_menu_accessibility%}).

## Resources

[ARIA patterns Menu](https://www.w3.org/WAI/ARIA/apg/patterns/menu/)

## Section 508

The ContextMenu is fully compliant with the [Section 508 requirements](https://www.section508.gov/).

## Testing

The ContextMenu has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The ContextMenu has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

## Keyboard Navigation

For details on how the ContextMenu keyboard navigation works, refer to the [ContextMenu Keyboard Navigation]({% slug htmlhelpers_contextmenu_keyboardnavigation_aspnetcore %}) article.

## See Also

* [Keyboard Navigation by the ContextMenu for {{ site.framework }}]({% slug htmlhelpers_contextmenu_keyboardnavigation_aspnetcore %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})
