---
title: Wai-Aria Support
page_title: jQuery TimePicker Documentation | TimePicker Accessibility
description: "Get started with the jQuery TimePicker by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: jquery_timepicker_accessibility
position: 1
---

# TimePicker Accessibility

The TimePicker is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).




Out of the box, the Kendo UI for jQuery TimePicker provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The TimePicker is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### TimePicker Wrapping Element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-input-inner` | `role=combobox` | The input element should follow the `combobox` specification. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-required=true` | The attribute is rendered only when the TimePicker is in a `form` HTML element and announces the required state of the component. |
|  | `aria-describedby=.k-form-hint id/.k-form-error id` | Points to the hint for the input, or if the input is invalid, to the error message. This attribute should only be present when a hint is set or when the input is invalid. |
|  | `aria-expanded=true/false` | Announces whether the Popup is visible or not. |
|  | `aria-controls=.k-animation-container id` | Points to the popup element. Signifies that the `combobox` element controls the `listbox` popup. |
|  | `readonly` or `aria-readonly` | Attribute is rendered only when the DatePicker is readonly. |
| `.k-invalid .k-input-inner,.ng-invalid .k-input-inner` | `aria-invalid=true` | Attribute is rendered only when the picker is in form and announces the valid state of the component. |
| `.k-disabled .k-input-inner` | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the DatePicker is disabled. |
| `.k-input-button` | `role=button` or `nodeName=button` | The element must either be a `<button>` element or must have `role=button` assigned. |
|  | `aria-label` | The button needs an accessible name to be assigned to it. |
|  | `tabindex=-1` | Button element must not be focusable. |
| `.k-timepicker.k-disabled .k-button` | `disabled` or `aria-disabled` | Attribute is rendered only when the picker is disabled. |

### ListBox Popup

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

[WAI-ARIA specification for combobox](https://www.w3.org/TR/wai-aria-1.2/#combobox)

[WAI-ARIA specification for listbox](https://www.w3.org/TR/wai-aria-1.2/#listbox)

[WAI-ARIA practices select only combobox example](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-select-only.html)

## Section 508


The TimePicker is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The TimePicker has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The TimePicker has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The TimePicker has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the TimePicker component could be found here: https://demos.telerik.com/kendo-ui/accessibility/timepicker
## See Also
* [Keyboard Navigation by the TimePicker (Demo)](https://demos.telerik.com/kendo-ui/timepicker/keyboard-navigation)
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)