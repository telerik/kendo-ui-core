---
title: Overview
page_title: jQuery DropDownTree Documentation | DropDownTree Accessibility
description: "Get started with the jQuery DropDownTree by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_dropdowntree_widget
position: 1
---

# DropDownTree Accessibility

The DropDownTree is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).




Out of the box, the Kendo UI for jQuery DropDownTree provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The DropDownTree is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### DropDownTree Wrapping Element


The following table summarizes the selectors and attributes supported by the DropDownTree wrapper element:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-dropdowntree` | `role=combobox` | Announces the drop-down element of the button. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input requires an accessible name that will be assigned to it. |
|  | `aria-haspopup=tree` | Indicates the presence of a popup with a tree navigation. |
|  | `aria-expanded=true/false` | Announces the state of the popup visibility. |
|  | `aria-controls=.k-treeview id` | Points to the `treeview` element. Signifies that the `combobox` element controls the `treeview` one. |
|  | `aria-activedescendent=.k-treeview-item id` | Points to the focused item in the popup. The focused item is changed with the keyboard navigation. If the popup is not visible, the attribute must not point to any element or must be removed. |
|  | `aria-readonly=true` | The attribute is rendered only when the drop-down is read-only. |
|  | `aria-autocomplete=list` | The attribute is rendered and the value is set to `list` when the filtering feature is enabled. |
|  | `aria-invalid=true` | The attribute is rendered only when the drop-down is in a form and announces the valid state of the component. |
|  | `aria-busy=true` | The attribute is rendered only when the drop-down is loading data. |
|  | `tabindex=0` | The element must be focusable. |
| `.k-dropdowntree.k-disabled` | `aria-disabled=true` | The attribute is rendered only when the drop-down is disabled. |
| `.k-input-button` | `role=button` or `nodeName=button` | The element must either be a `<button>` element or must have `role="button"` assigned. |
|  | `aria-label` | The button requires an accessible name that will be assigned to it. |
|  | `tabindex=-1` | The `button` element must not be focusable. |

### Popup Listbox


The popup element of the DropDownTree has to implement the WAI-ARIA specification for a Popup List component. The following table summarizes the selectors and attributes supported by the listbox popup of the DropDownTree:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-animation-container` | `role=region` | When the component container is appended to the `<body>` element of the document, it requires you to assign a `landmark` role to it. Otherwise, it must be appended to an element with an appropriate `landmark` role. |
|  | `aria-label` or `aria-labelledby` | Provides a label when the container has a `region` role assigned. |

### TreeView


The tree that is placed in the `popup` element of the component must implement the specification for a TreeView component.

[TreeView accessibility specification]({{treeview_a11y_link}})

## Resources

[WAI-ARIA Authoring Practices: TreeView Example](https://www.w3.org/WAI/ARIA/apg/example-index/treeview/treeview-navigation)

[WAI-ARIA Authoring Practices: Select-Only Combobox Example](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html)

## Section 508


The DropDownTree is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The DropDownTree has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The DropDownTree has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The DropDownTree has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the DropDownTree component could be found here: https://demos.telerik.com/kendo-ui/accessibility/dropdowntree
## See Also
* [Keyboard Navigation by the DropDownTree (Demo)](https://demos.telerik.com/kendo-ui/dropdowntree/keyboard-navigation) 
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})