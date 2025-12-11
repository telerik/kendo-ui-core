---
title: Wai-Aria Support
page_title: jQuery DropDownList Documentation | DropDownList Accessibility
description: "Get started with the jQuery DropDownList by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["dropdownlist"]
slug: jquery_dropdownlist_accessibility
position: 1
---

# DropDownList Accessibility

The DropDownList is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI DropDownList]({% slug keynav_kendoui_ddl_widget %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery DropDownList provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The DropDownList is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### DropDownList Wrapping Element


The following table summarizes the selectors and attributes supported by the DropDownList wrapper element:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-dropdownlist:not(.k-views-dropdown)` | `role=combobox` | Announces the button drop-down element. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input requires an accessible name that will be assigned to it. |
|  | `aria-haspopup=listbox` | Indicates the presence of a listbox popup. |
|  | `aria-expanded=true/false` | Announces the visibility state of the popup. |
|  | `aria-controls=.k-list-ul id` | Points to the listbox element. Signifies that the `combobox` controls the `listbox` element. |
|  | `aria-describedby=.k-input-inner id` | Announces the selected value of the drop-down. |
|  | `aria-activedescendant=.k-list-item.k-focus id` | Points to the focused item in the popup. The focused item is changed through keyboard navigation. If the popup is not visible, the attribute must not point to any element or must be removed. |
|  | `aria-readonly=true` | The attribute is rendered only when the DropDownList is read-only. |
|  | `aria-busy=true` | The attribute is rendered only when the DropDownList is loading data. |
|  | `tabindex=0` | The element must be focusable. |
| `.k-invalid .k-input-inner,.ng-invalid .k-input-inner` | `aria-invalid=true` | The attribute is rendered only when the DropDownList is in a form, and announces the valid state of the component. |
| `.k-dropdownlist.k-disabled` | `aria-disabled=true` | The attribute is rendered only when the DropDownList is disabled. |
| `.k-input-button` | `role=button` or `nodeName=button` | The element must either be a `<button>` element or must have the `role="button"` assigned. |
|  | `aria-label` | The button requires an accessible name that will be assigned to it. |
|  | `tabindex=-1` | The button element must not be focusable. |

### Popup


The following table summarizes the selectors and attributes supported by the DropDownList popup:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-list-filter>.k-searchbox>.k-input-inner` | `role=searchbox` | Announces the search box capability of the input. |
|  | `aria-label` | Points to the search label. |
|  | `aria-activedescendant=.k-list-item.k-focus id` | Points to the focused item or to an item from the popup. |
|  | `aria-autocomplete=list` | Indicates the list-filtering capabilities of the selected items. |
|  | `aria-controls=.k-list-ul id` | Points to the popup element. Builds the relationship between the input and the popup. |
|  | `aria-haspopup=listbox` | Indicates the presence of a listbox popup. |
| `.k-list-ul` | `aria-live=polite/off` | Assures the live updates on the selected value of the popup. |

### Popup Listbox


The listbox placed in the popup element of the DropDownList has to implement the WAI-ARIA specification for a Popup List component. The following table summarizes the selectors and attributes supported by the listbox popup of the DropDownList:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-animation-container` | `role=region` | When the component container is appended to the `<body>` element of the document, it requires you to assing a `landmark` role to it. Otherwise, append it to an element with an appropriate `landmark` role. |
|  | `aria-label` or `aria-labelledby` | When the container has a `region` role assigned, povides a label. |
| `.k-list .k-no-data` | `aria-live=polite` | Identifies the element as a live region in the `polite` state, meaning assistive technology users are informed about changes to the region at the next available opportunity. |
| `.k-list-ul` | `role=listbox` | Identifies the `ul` element as a listbox. |
|  | `aria-label` or `aria-labelledby` | Provides a label for the listbox of the ComboBox. |
| `.k-list-item` | `role=option` | Identifies the `li` element as a listbox option. |
|  | `id` | When grouped, the list items must have an `id` attribute specified, so that the `aria-owns` attribute of their group header elements (with `role=group`) point to that ids. |
|  | `aria-describedby` | When grouped, the list items must have an `aria-describedby` attribute pointing to the id of the `k-list-item-text` element in their `k-list-group-item`. |
| `.k-list-item.k-selected` | `aria-selected=true` | Indicates the selected state of the item. |
| `.k-list-group-item` | `role=group` | The group elements in the popup list must be have `role=group`. |
|  | `aria-owns` | The group elements in the popup list must own the list items belonging to their group. |
| `.k-list-group-item>.k-list-item-text` | `id` | The `k-list-item-text` elements of the `k-list-group-item` must have an id specified. The `aria-labelledby` attribute of the list items in the group must point to that id. |

### Adaptive Mode


When the component is in adaptive mode, the popup element follows the specifications of the ActionSheet component.

[ActionSheet accessibility specification]({% slug jquery_actionsheet_accessibility %})

## Resources

[WAI-ARIA Authoring Practices: Select-Only Combobox Example](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html)

## Section 508


The DropDownList is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The DropDownList has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The DropDownList has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The DropDownList has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the DropDownList component could be found here: https://demos.telerik.com/kendo-ui/accessibility/dropdownlist
## See Also
* [Keyboard Navigation by the DropDownList (Demo)](https://demos.telerik.com/kendo-ui/dropdownlist/keyboard-navigation)
* [Keyboard Navigation by the DropDownList]({% slug keynav_kendoui_ddl_widget %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)