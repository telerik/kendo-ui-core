---
title: Overview
page_title: jQuery TreeView Documentation | TreeView Accessibility
description: "Get started with the jQuery TreeView by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_treeview
position: 1
---

# TreeView Accessibility

The TreeView is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).




Out of the box, the Kendo UI for jQuery TreeView provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The TreeView is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


If the tree supports the load-more functionality, the **Load More** button is rendered as the `li.k-treeview-item` element and has `role="button"`. The list item does not implement any of the following attributes.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-treeview-lines` | `role=tree` | The root `div` element of the treeview. |
| `.k-treeview-group:not(.k-treeview-lines)` | `role=group` | The `ul` element that wraps child nodes. |
| `.k-input-inner` | `aria-label` | Specifies the announced name for the filter input. |
|  | `role=searchbox` | Specifies the role of the filter input. |
|  | `aria-controls=.k-treeview-lines id` | Points to the main ul element .k-treeview-lines. |
| `.k-treeview-item` | `role=treeitem` | The `li` element rendered for a tree node. |
|  | `aria-level` | Announces the level of the tree node item. The value of the level is number-based (>=1). Must be added when only a subsection of the TreeView is rendered in the DOM. |
|  | `aria-setsize` | Announces the total count of the items at this level. Enables the user to understand the position of the navigation, for example, item 3 of 14. Must be added only when the load-more functionality of the tree is enabled and there are still nodes belonging to the group that are not loaded (rendered) yet. |
|  | `aria-expanded=true/false` | Announces the expanded state of the node. The value is `true` when expanded, and `false` when collapsed. |
|  | `aria-checked=true/false` | Rendered only when checkboxes are enabled. Announces the checked state of the node. If the checkbox is indeterminate, the value is `mixed`. |
| `.k-treeview-item:has(.k-selected)` | `aria-selected=true` | Rendered only when selection is enabled. Announces the selected state of the node. |
| `.k-checkbox` | `role=none/presentation` | Added to the wrapper element of the checkbox to prevent duplicated information announced to the user. The checked state is controlled by `aria-checked`. |
|  | `aria-hidden=true` | Added to the checkbox element to prevent duplicated information announced to the user. The checked state is controlled by `aria-checked`. |

## Resources

[WAI-ARIA Authoring Practices: File Directory Treeview Example](https://www.w3.org/WAI/ARIA/apg/example-index/treeview/treeview-1/treeview-1a.html)

## Section 508


The TreeView is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The TreeView has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The TreeView has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The TreeView has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the TreeView component could be found here: https://demos.telerik.com/kendo-ui/accessibility/treeview
## See Also
* [Keyboard Navigation by the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})