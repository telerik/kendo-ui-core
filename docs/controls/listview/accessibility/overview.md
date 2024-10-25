---
title: Overview
page_title: jQuery ListView Documentation | ListView Accessibility
description: "Get started with the jQuery ListView by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_listview_widget
position: 1
---

# ListView Accessibility

The ListView is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).




Out of the box, the Kendo UI for jQuery ListView provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ListView is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AAA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-listview:not(.k-selectable) .k-listview-content` | `role=list` | Specifies the role of non selectable ListView content element. |
| `.k-listview.k-selectable .k-listview-content` | `role=listbox` | Specifies the role of selectable ListView content element. |
| `.k-listview:not(.k-selectable) .k-listview-item` | `role=listitem` | Specifies the role of each item in a non selectable ListView. |
| `.k-listview.k-selectable .k-listview-item` | `role=option` | Specifies the role of each item in a selectable ListView. |
| `.k-listview-item` | `aria-setsize` | Specifies the total number of items present in the ListView. |
|  | `aria-posinset` | Specifies the position of the current item in the entire list of items present in the ListView. Value must be greated than or equal to 1 and smaller than or equal to the total number of items in the ListView. |
| `.k-listview-item:nth-child(1)` | `tabindex=0` | The first item in the ListView must be focusable by default. |

## Resources

[WAI-ARIA Specification: List](https://www.w3.org/TR/wai-aria-1.2/#list)

[WAI-ARIA Specification: Listitem](https://www.w3.org/TR/wai-aria-1.2/#listitem)

## Section 508


The ListView is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ListView has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ListView has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The ListView has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the ListView component could be found here: https://demos.telerik.com/kendo-ui/accessibility/listview
## See Also
* [Keyboard Navigation by the ListView (Demo)](https://demos.telerik.com/kendo-ui/listview/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})