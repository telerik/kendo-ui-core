---
title: Overview
page_title: jQuery AutoComplete Documentation | AutoComplete Accessibility
description: "Get started with the jQuery AutoComplete by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_autocomplete_widget
position: 1
---

# AutoComplete Accessibility

The AutoComplete is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

> According to [WAI-ARIA 1.1](https://www.w3.org/TR/wai-aria/#combobox) specification *"Authors must ensure an element with role combobox contains or owns a text input element with role textbox or searchbox..."*. Note, that in our implementation, the text input element is the one that has role="combobox", and does not contain another text input element. **This approach is valid for the [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/#combobox) specification and also for the [WAI-ARIA 1.0](https://www.w3.org/TR/wai-aria/#combobox) specification .**
>
> As it is stated in [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/#combobox) *"The Guidance for combobox has changed significantly in ARIA 1.2 due to problems with implementation of the previous patterns"*. Therefore, we will keep the current state, even if it contradicts the WAI-ARIA 1.1 specification.

For more information, refer to:
* [Keyboard navigation by the Kendo UI AutoComplete]({% slug keynav_kendoui_autocomplete_widget %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery AutoComplete provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The AutoComplete is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


The following table lists the selectors, attributes, and behavior patterns supported by the AutoComplete component:

### AutoComplete wrapper

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-input-inner` | `role=combobox` | Announces the presence of a autocomplete as inner element of the autocomplete used for filtering. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-haspopup=listbox` | Indicates the component has a listbox Popup. |
|  | `aria-expanded=true/false` | Announces the state of the visibility of the popup. |
|  | `aria-controls=.k-list-ul id` | Points to the listbox element. Signifies that the `combobox` element controls the `listbox`. |
|  | `aria-activedescendant=.k-list-item.k-focus id` | Points to the focused item in the popup. The focused item is changed via keyboard navigation. If the popup is not visible, the attribute should not point to any element or should be removed. |
|  | `aria-autocomplete=list` | Attribute is rendered and value is set to list when **filtering** feature is enabled. |
|  | `aria-autocomplete=both` | Attribute is rendered and value is set to both when both **filtering** and **suggest** features are enabled. |
|  | `aria-autocomplete=inline` | Attribute is rendered and value is set to only **suggest** feature is enabled. |
|  | `readonly` or `aria-readonly` | Attribute is rendered only when the autocomplete is readonly. |
|  | `aria-busy=true` | Attribute is rendered only when the autocomplete is loading data. |
|  | `tabindex=0` | The element must be focusable. |
| `.k-invalid .k-input-inner,.ng-invalid .k-input-inner` | `aria-invalid=true` | Attribute is rendered only when the autocomplete is in form and announces the valid state of the component. |
| `.k-disabled .k-input-inner` | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the autocomplete is disabled. |

### ListBox Popup


The Popup element of the component should implement the specification for a **Popup List** component.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-animation-container` | `role=region` | When the component container is appended to the `<body>` element of the document, it needs a landmark role to be assigned to it. Otherwise, it should be appended to an element with an appropriate landmark role. |
|  | `aria-label` or `aria-labelledby` | Provides a label when the container has a `region` role assigned. |
| `.k-list-ul` | `role=listbox` | Identifies the ul element as a listbox. |
|  | `aria-label` or `aria-labelledby` |  Provides a label for the listbox of the combobox. |
| `.k-list-item` | `role=option` | Identifies the li element as a listbox option. |
| `.k-list-item.k-selected` | `aria-selected=true` | Indicates the selected state of the item. |

## Resources

[ARIA practices: Editable Combobox With Both List and Inline Autocomplete Example](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-both.html)

[ARIA Practices: Editable Combobox With List Autocomplete Example](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-list.html)

## Section 508


The AutoComplete is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The AutoComplete has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The AutoComplete has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing

The AutoComplete has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

A live test example of the AutoComplete component could be found here: https://demos.telerik.com/kendo-ui/accessibility/autocomplete

## See Also

* [Keyboard Navigation by the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/keyboard-navigation)
* [Keyboard Navigation by the AutoComplete]({% slug keynav_kendoui_autocomplete_widget %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})