---
title: Overview
page_title: jQuery ListBox Documentation | ListBox Accessibility
description: "Get started with the jQuery ListBox by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_listbox_widget
position: 1
---

# ListBox Accessibility

The ListBox is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).




Out of the box, the Kendo UI for jQuery ListBox provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ListBox is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### ListBox List

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-list-ul` | `role=listbox` | Specifies the role of the ListBox `ul` element. |
|  | `aria-label` or `aria-labelledby` | Adds a label to the `ul` element of the ListBox. |
|  | `aria-multiselectable=true` | Signifies that the ListBox allows multiple selection. Present only when the multiple selection of the component is enabled. |
|  | `tabindex=0` | Makes the ListBox focusable. |
| `.k-list-item` | `role=option` | Specifies the role of the ListBox `item` element. |
|  | `aria-selected=true/false` | Set to `true` if the item is selected. |

### ListBox Toolbar


The ListBox toolbar follows the specification of the ToolBar component.

[ToolBar accessibility specification]({{toolbar_a11y_link}})

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-listbox-actions` | `role=toolbar` | The toolbar is a collection of command buttons. |
|  | `aria-label` | Clarifies the purpose of the toolbar. |
|  | `aria-controls=.k-list-ul id` | Points to the ids of the `role=listbox` elements that are being controlled by the ToolBar. |
| `.k-listbox-actions .k-button` | `aria-label` or `title` | All buttons in the ToolBar must have lables, so that their purpose is clear. |

## Resources

[WAI-ARIA Authoring Practices: ListBox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)

## Section 508


The ListBox is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ListBox has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ListBox has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The ListBox has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the ListBox component could be found here: https://demos.telerik.com/kendo-ui/accessibility/listbox
## See Also
* [Keyboard Navigation by the ListBox (Demo)](https://demos.telerik.com/kendo-ui/listbox/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})