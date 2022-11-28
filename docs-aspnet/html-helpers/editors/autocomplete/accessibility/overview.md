---
title: Overview
page_title: "{{ site.product }} AutoComplete Documentation - AutoComplete Accessibility"
description: "Get started with the {{ site.product }} AutoComplete and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.1."
slug: accessibility_aspnetcore_autocomplete
position: 1
---

# AutoComplete Accessibility

The AutoComplete is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.1, and keyboard support.

> According to [WAI-ARIA 1.1](https://www.w3.org/TR/wai-aria/#combobox) specification *"Authors must ensure an element with role combobox contains or owns a text input element with role textbox or searchbox..."*. Note, that in our implementation, the text input element is the one that has role="combobox", and does not contain another text input element. **This approach is valid for the [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/#combobox) specification and also for the [WAI-ARIA 1.0](https://www.w3.org/TR/wai-aria/#combobox) specification .**
>
> As it is stated in [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/#combobox) *"The Guidance for combobox has changed significantly in ARIA 1.2 due to problems with implementation of the previous patterns"*. Therefore, we will keep the current state, even if it contradicts the WAI-ARIA 1.1 specification.

For more information, refer to:
* [Keyboard navigation by the Telerik UI AutoComplete]({% slug keynav_aspnetcore_autocomplete %})
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})




The Kendo UI for jQuery AutoComplete component is [WCAG 2.1 AAA](https://www.w3.org/TR/WCAG21/) and [Section 508](http://www.section508.gov/) compliant. The component also follows the [WAI-ARIA best practices](https://www.w3.org/WAI/ARIA/apg/) for implementing the keyboard navigation for its component role, and is tested against the popular screen readers.

## Wai-Aria

### AutoComplete wrapper

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-input-inner | `role=combobox` | Announces the presence of a autocomplete as inner element of the autocomplete used for filtering. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-haspopup=listbox` | Indicates the component has a listbox Popup. |
|  | `aria-expanded=true/false` | Announces the state of the visibility of the popup. |
|  | `aria-controls=.k-animation-container id` | Points to the popup element. Signifies that the `combobox` element controls the `listbox`. |
|  | `aria-activedescendant=.k-list-item.k-focus id` | Points to the focused item in the popup. The focused item is changed via keyboard navigation. If the popup is not visible, the attribute should not point to any element or should be removed. |
|  | `aria-autocomplete=list` | Attribute is rendered and value is set to list when **filtering** feature is enabled. |
|  | `aria-autocomplete=both` | Attribute is rendered and value is set to both when both **filtering** and **suggest** features are enabled. |
|  | `aria-autocomplete=inline` | Attribute is rendered and value is set to only **suggest** feature is enabled. |
|  | `readonly` or `aria-readonly` | Attribute is rendered only when the autocomplete is readonly. |
|  | `aria-invalid=true` | Attribute is rendered only when the autocomplete is in form and announces the valid state of the component. |
|  | `aria-busy=true` | Attribute is rendered only when the autocomplete is loading data. |
|  | `tabindex=0` | The element must be focusable. |
| .k-disabled .k-input-inner | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the autocomplete is disabled. |

### ListBox Popup


The Popup element of the component should implement the specification for a **Popup List** component.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| .k-animation-container | `role=region` | When the component container is appended to the `<body>` element of the document, it needs a landmark role to be assigned to it. Otherwise, it should be appended to an element with an appropriate landmark role. |
|  | `aria-label` or `aria-labelledby` | Provides a label when the container has a `region` role assigned. |
| .k-list-ul | `role=listbox` | Identifies the ul element as a listbox. |
|  | `aria-label` or `aria-labelledby` |  Provides a label for the listbox of the combobox. |
| .k-list-item | `role=option` | Identifies the li element as a listbox option. |
| .k-list-item.k-selected | `aria-selected=true` | Indicates the selected state of the item. |

## Resources

[ARIA practices: Editable Combobox With Both List and Inline Autocomplete Example](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-both.html)

[ARIA Practices: Editable Combobox With List Autocomplete Example](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-list.html)

## Section 508


The AutoComplete is compliant with the [Section 508](http://www.section508.gov/) requirements

## Testing


The component has been extensively tested automatically with static code analyzers and manually with the most popular screen readers.

> Any Accessibility Issues could be reported in [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing

The AutoComplete has been tested with [axe-core](https://github.com/dequelabs/axe-core).

## See Also

* [Keyboard Navigation by the AutoComplete HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/autocomplete/keyboard-navigation)
* [Keyboard Navigation by the AutoComplete HtmlHelper for {{ site.framework }}]({% slug keynav_aspnetcore_autocomplete %})
* [Accessibility in {{ site.product }}]({% slug compliance_accessibility %})