---
title: Overview
page_title: jQuery MultiSelect Documentation | MultiSelect Accessibility
description: "Get started with the jQuery MultiSelect by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_multiselect_widget
position: 1
---

# MultiSelect Accessibility

The MultiSelect is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI MultiSelect]({% slug keynav_multiselect %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery MultiSelect provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The MultiSelect is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### MultiSelect Wrapping Element


The following table summarizes the selectors and attributes supported by the MultiSelect wrapper element:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-input-inner` | `role=combobox` | Announces the presence of a combobox as the inner element of the MultiSelect used for filtering. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name that will be assigned to it. |
|  | `aria-haspopup=listbox` | Indicates the presence of a listbox popup. |
|  | `aria-expanded=true/false` | Announces the state of the popup visibility. |
|  | `aria-controls=.k-list-ul id` | Points to the listbox element. Signifies that the `combobox` element controls the `listbox` one. |
|  | `aria-autocomplete=list` | When the filtering feature is enabled, the attribute is rendered and the value is set to the list. |
|  | `aria-describedby=.k-chip-list id` | Points to the `taglist` element that contains the selected items. |
|  | `aria-activedescendant=.k-list-item.k-focus id` | Points to the focused item,which is either an item from the popup or a tag item from the selected items. The focused item is changed through keyboard navigation. If the focus is not currently on a tag item and the popup is not visible, the attribute must not point to any element or must be removed. |
|  | `aria-readonly=true` | The attribute is rendered only when the MultiSelect is read-only. |
|  | `aria-invalid=true` | The attribute is rendered only when the MultiSelect is in a form and announces the valid state of the component. |
|  | `aria-busy=true` | The attribute is rendered only when the MultiSelect is loading data. |
|  | `tabindex=0` | The element must be focusable. |
| `.k-disabled .k-input-inner` | `aria-disabled=true` | The attribute is rendered only when the MultiSelect is disabled. |
| `.k-input-button` | `role=button` or `nodeName=button` | The element must either be a `<button>` element or have the `role="button"` assigned. |
|  | `aria-label` | The button needs an accessible name that will be assigned to it. |
|  | `tabindex=-1` | The button element must not be focusable. |

### Popup Listbox


The popup element of the MultiSelect must implement the WAI-ARIA specification for a Popup List component. The following table summarizes the selectors and attributes supported by the listbox popup of the MultiSelect:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-list-ul` | `aria-multiselectable=true` | Announces multiselection of the listbox popup. |

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-animation-container` | `role=region` | When the component container is appended to the `<body>` element of the document, it requires you to assing a `landmark` role to it. Otherwise, append it to an element with an appropriate `landmark` role. |
|  | `aria-label` or `aria-labelledby` | When the container has a `region` role assigned, povides a label. |
| `.k-list-ul` | `role=listbox` | Identifies the `ul` element as a listbox. |
|  | `aria-label` or `aria-labelledby` | Provides a label for the listbox of the ComboBox. |
| `.k-list-item` | `role=option` | Identifies the `li` element as a listbox option. |
|  | `id` | When grouped, the list items must have an `id` attribute specified, so that the `aria-owns` attribute of their group header elements (with `role=group`) point to that ids. |
|  | `aria-describedby` | When grouped, the list items must have an `aria-describedby` attribute pointing to the id of the `k-list-item-text` element in their `k-list-group-item`. |
| `.k-list-item.k-selected` | `aria-selected=true` | Indicates the selected state of the item. |
| `.k-list-group-item` | `role=group` | The group elements in the popup list must be have `role=group`. |
|  | `aria-owns` | The group elements in the popup list must own the list items belonging to their group. |
| `.k-list-group-item>.k-list-item-text` | `id` | The `k-list-item-text` elements of the `k-list-group-item` must have an id specified. The `aria-labelledby` attribute of the list items in the group must point to that id. |

## Resources

[WAI-ARIA Authoring Practices: Select-Only Combobox Example](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html)

[WAI-ARIA Authoring Practices: Scrollable Listbox Example](https://www.w3.org/WAI/ARIA/apg/example-index/listbox/listbox-scrollable.html)

## Section 508


The MultiSelect is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The MultiSelect has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The MultiSelect has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The MultiSelect has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the MultiSelect component could be found here: https://demos.telerik.com/kendo-ui/accessibility/multiselect
## See Also
* [Keyboard Navigation by the MultiSelect (Demo)](https://demos.telerik.com/kendo-ui/multiselect/keyboard-navigation)
* [Keyboard Navigation by the MultiSelect]({% slug keynav_multiselect %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})