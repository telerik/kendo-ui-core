---
title: Overview
page_title: ComboBox Documentation | ComboBox Accessibility
description: "Get started with the {{ site.product }} ComboBox and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_aspnetcore_combobox
position: 1
---

# ComboBox Accessibility





Out of the box, the {{ site.product }} ComboBox provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ComboBox is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### ComboBox Wrapping Element


The following table summarizes the selectors and attributes supported by the ComboBox wrapper element:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-input-inner` | `role=combobox` | Announces the presence of a combobox as an inner element of the combobox used for filtering. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input requires an accessible name that will be assigned to it. |
|  | `aria-haspopup=listbox` | Indicates that the component has a listbox popup. |
|  | `aria-expanded=true/false` | Announces the visibility state of the popup. |
|  | `aria-controls=.k-list-ul id` | Points to the listbox element. Signifies that the `combobox` controls the `listbox` element. |
|  | `aria-activedescendant=.k-list-item.k-focus id` | Points to the focused item in the popup. The focused item is changed through keyboard navigation. If the popup is not visible, the attribute must not point to any element or must be removed. |
|  | `aria-autocomplete=list` | When filtering is enabled, the attribute is rendered and the value is set to `list`. |
|  | `aria-autocomplete=both` | When both the filtering and the suggest featutres are enabled, the attribute is rendered and the value is set to `both`. |
|  | `aria-autocomplete=inline` | When the suggest feature is enabled, the attribute is rendered and the value is set to `inline`. |
|  | `readonly=readonly` or `aria-readonly=true` | The attribute is rendered only when the ComboBox is read-only. |
|  | `aria-busy=true` | The attribute is rendered only when the ComboBox is loading data. |
|  | `tabindex=0` | The element must be focusable. |
| `.k-invalid .k-input-inner,.ng-invalid .k-input-inner` | `aria-invalid=true` | The attribute is rendered only when the ComboBox is in a form, and announces the valid state of the component. |
| `.k-disabled .k-input-inner` | `disabled=disabled` or `aria-disabled=true` | The attribute is rendered only when the ComboBox is disabled. |
| `.k-input-button` | `role=button` or `nodeName=button` | The element must either be a `<button>` element or must have the `role="button"` assigned. |
|  | `aria-label` | The button element must have discernible text. |
|  | `tabindex=-1` | The button element must not be focusable. |
| `.k-combobox.k-disabled .k-button` | `disabled` or `aria-disabled=true` | Attribute is rendered only when the picker is disabled. |

### Popup Listbox


The popup element of the ComboBox has to implement the WAI-ARIA specification for a Popup List component. The following table summarizes the selectors and attributes supported by the listbox popup of the ComboBox:

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

[WAI-ARIA Authoring Practices: Editable Combobox With Both List and Inline Autocomplete Example](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-both.html)

[WAI-ARIA Authoring Practices: Editable Combobox With List Autocomplete Example](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-list.html)

## Section 508


The ComboBox is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ComboBox has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ComboBox has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the ComboBox component, refer to the [ComboBox Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/combobox).

## Keyboard Navigation

For details on how the ComboBox keyboard navigation works, refer to the [ComboBox Keyboard Navigation]({%slug keynav_aspnetcore_combobox%}) article.

## See Also

* [Keyboard Navigation by the ComboBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/keyboard-navigation)
* [Keyboard Navigation by the ComboBox for {{ site.framework }}]({% slug keynav_aspnetcore_combobox %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})