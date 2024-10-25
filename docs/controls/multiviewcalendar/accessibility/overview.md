---
title: Overview
page_title: jQuery MultiViewCalendar Documentation | MultiViewCalendar Accessibility
description: "Get started with the jQuery MultiViewCalendar by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_multiviewcalendar
position: 1
---

# MultiViewCalendar Accessibility

The MultiViewCalendar is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI MultiViewCalendar]({% slug keyboard_navigation_multiviewcalendar %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery MultiViewCalendar provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The MultiViewCalendar is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### MultiViewCalendar Grid


The element wrapping the tables in the component should follow the requirements for the `grid` role (https://www.w3.org/TR/wai-aria-1.2/#grid).

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-calendar-view` | `role=grid` | Specifies the role of the Calendar dates table. |
|  | `aria-labelledby` | Pointing to the `k-calendar-title` element (e.g. `March 2022 - April 2022`). |
|  | `aria-activedescendant=.k-calendar-td.k-focus id` | Pointing to the currently active (focused) date/month/year/decade cell in the table. |
|  | `tabindex=0` | Makes the grid focusable. |
| `.k-calendar-table` | `role=none` | All `k-calendar-table` elements must have their role set to `none`. That is because their content must be made belonging to a single `grid` component. |
| `.k-content:first-of-type>.k-calendar-head` | `role=rowgroup` | The first `k-calendar-thead` must explicitly have its role set to `rowgroup` as its semantics has been removed while setting its `<table>` role to `none`. |
| `.k-calendar-tbody` | `role=rowgroup` | The `k-calendar-tbody` elements must explicitly have their roles set to `rowgroup` as their semantics have been removed while setting their `<table>` elements role to `none`. |
| `.k-content:first-of-type>.k-calendar-head>.k-calendar-tr,.k-calendar-head>.k-calendar-tr` | `role=row` | The `k-calendar-tr` elements must explicitly have their roles set to `row` as their semantics have been removed while setting their `<table>` elements role to `none`. Does not apply for fully empty rows, header rows after the first month, and initial data rows in Month views after the first month that have at least one cell missing |
| `.k-content:first-of-type>.k-calendar-head>.k-calendar-tr>.k-calendar-th` | `role=columnheader` | The `k-calendar-th` elements must explicitly have their roles set to `columnheader` as their semantics have been removed while setting their `<table>` elements role to `none`. |
|  | `scope=col` | Specifies that the header is applied to a column. |
|  | `aria-label` | Specifies the full name of the day of the week (the column header). |
| `.k-calendar-td:not(.k-out-of-range)` | `role=gridcell` | The cells must explicitly have their roles set to `gridcell` as their semantics have been removed while setting their `<table>` elements role to `none`. |
|  | `aria-label ` or `title` | Applicable in year view - for better context contains the full name of the month. May also be applied in month view to specify the full text for a date. |
| `.k-calendar-td.k-selected` | `aria-selected` | Specifies whether the date is selected or not. |
| `.k-calendar-td.k-disabled` | `aria-disabled` | When a date is not available for selection, its gridcell element must have the attribute set to `true`. |
| `.k-content:first-of-type>.k-calendar-tbody>.k-calendar-tr:first-of-type>.k-out-of-range` | `role=gridcell` | The cells must explicitly have their roles set to `gridcell` as their semantics have been removed while setting their `<table>` elements role to `none`. |

### Button and Link elements

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-prev-view,.k-next-view` | `tabindex=-1` | The buttons must not be focusable. |
| `.k-calendar-title` | `tabindex=-1` | The button must not be focusable. |
| `.k-nav-today` | `tabindex=-1` | The link must not be focusable. |

## Resources

[ARIA practices Date Picker Dialog Example](https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/datepicker-dialog.html)

## Section 508


The MultiViewCalendar is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The MultiViewCalendar has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The MultiViewCalendar has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The MultiViewCalendar has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the MultiViewCalendar component could be found here: https://demos.telerik.com/kendo-ui/accessibility/multiviewcalendar
## See Also
* [Keyboard Navigation by the MultiViewCalendar (Demo)](https://demos.telerik.com/kendo-ui/multiviewcalendar/keyboard-navigation)
* [Keyboard Navigation by the MultiViewCalendar]({% slug keyboard_navigation_multiviewcalendar %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})