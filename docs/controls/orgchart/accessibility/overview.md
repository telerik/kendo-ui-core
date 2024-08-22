---
title: Overview
page_title: jQuery OrgChart Documentation | OrgChart Accessibility
description: "Get started with the jQuery OrgChart by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_orgchart_widget
position: 1
---

# OrgChart Accessibility

The OrgChart is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI OrgChart]({% slug keynav_kendoui_orgchart_widget %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery OrgChart provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The OrgChart is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The `OrgChart` component represents a tree structure and allows editing of its items.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-orgchart-level-1` | `role=tree` | The root `div` element of the OrgChart. Contains all its top level items. |
|  | `aria-orientation=horizontal` | Specifies the orientation of the OrgChart tree. |
| `.k-orgchart-group:not(.k-orgchart-level-1)` | `role=group` | The element that wraps child nodes. |
| `.k-orgchart-card` | `role=treeitem` | The card (node) representing the treeitem in the hierarchical structure. |
|  | `aria-level` | Announces the level of the tree node item. The value of level is number-based(>=1). |
|  | `aria-keyshortcuts=Enter` | Announces the that the edit menu of the OrgChart can be activated via the Enter key. |
| `.k-orgchart-card[aria-owns]` | `aria-expanded=true/false` | Present when a node has subitems. Announces the expanded state of the node. It is true when expanded, and false when collapsed. |
| `.k-orgchart-card[aria-expanded]` | `aria-owns` | Present when a node has subitems. The value of the attribute is the id of the group element containing the current node children |
| `.k-orgchart-card.k-focus` | `aria-selected=true` | Announces the selected (focused) item in the OrgChart. |
| `.k-orgchart-card:not(.k-focus)` | `aria-selected=false` | Announces the not selected (focused) items in the OrgChart. |
| `.k-avatar-image img` | `alt` | Describes the avatar image of an item. Normally contains the name of the person/function represented by the item. |
| `.k-orgchart-card-menu` | `role=button` | Specifies the menu icon of the item is a button. |
|  | `aria-label=Edit menu` | Provides an accessible name for the edit button, as it does not contain text. |
|  | `tabindex=-1` | The Edit menu button must not be part of the page tab sequence. |
| `.k-orgchart-button` | `role=button` or `nodeName=button` | Specifies the expand/collapse element of the OrgChart as a button. |
|  | `aria-label` | Provides an accessible name for the expand/collapse button, as it does not contain text. |
|  | `tabindex=-1` | The expand/collapse button must not be part of the page tab sequence. |


The edit popup of the OrgChart should implement the specification of the Window component with a Form component in it.

[Window accessibility specification]({{window_a11y_link}})

[Form accessibility specification]({{form_a11y_link}})

## Resources

[ARIA practices File Directory Treeview Example](https://www.w3.org/WAI/ARIA/apg/example-index/treeview/treeview-1/treeview-1a.html)

## Section 508


The OrgChart is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The OrgChart has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The OrgChart has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The OrgChart has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the OrgChart component could be found here: https://demos.telerik.com/kendo-ui/accessibility/orgchart
## See Also
* [Keyboard Navigation by the OrgChart (Demo)](https://demos.telerik.com/kendo-ui/orgchart/keyboard-navigation)
* [Keyboard Navigation by the OrgChart]({% slug keynav_kendoui_orgchart_widget %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})