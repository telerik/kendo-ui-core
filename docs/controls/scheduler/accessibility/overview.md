---
title: Overview
page_title: jQuery Scheduler Documentation | Scheduler Accessibility
description: "Get started with the jQuery Scheduler by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_scheduler_widget
position: 1
---

# Scheduler Accessibility

The Scheduler is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).




Out of the box, the Kendo UI for jQuery Scheduler provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Scheduler is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The component is a single tab stop, so the arrows must be used for internal navigation. Notable exception is that scrollable containers in non-agenda views should be focusable too.

### Scheduler Wrapping Element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-scheduler` | `role=application` | Specifies the role of the component. |
|  | `aria-activedescendant=.k-event.k-selected id` | Points to the currently active appointment in the Scheduler. |

### Scheduler Toolbar


The Scheduler toolbar must implement the specification for a ToolBar component.

[ToolBar accessibility specification]({{toolbar_a11y_link}})


Below are listed the requirements for those components part of the ToolBar.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-nav-prev,.k-nav-next` | `aria-label` | Required as those buttons contain only icon (no text). |
| `.k-nav-current` | `aria-live=polite` | The new date of the Scheduler view will be announced upon navigation to new time span / view type. |
| `.k-views-dropdown` | `aria-label` | Specifies the purpose of the element. The `<select>` element visible on the toolbar on small screens must have its `aria-label` set. |


Depending on the current view, The Scheduler component implements different roles. Below are described the three possible approaches:

### Scheduler in Agenda view


In case of an Agenda view, the role assigned to the Scheduler layout table (`k-scheduler-layout` element) must be `grid`.

#### Table element

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-scheduler-agendaview` | `role=grid` | The main table of the Agenda view must indicate it is a Data Grid. |
| `.k-scheduler-agendaview>tbody` | `role=none/presentation` | The `<tbody>` element must have its semantics removed. |
| `.k-scheduler-agendaview .k-scheduler-table` | `role=none/presentation` | Those `<table>` elements within the Scheduler must have their semantic role removed. |
| `.k-scheduler-agendaview .k-scheduler-table>tbody` | `role=rowgroup` | Those elements must have their role explicitly set as it has been removed by the `<table>` role set (none/presentation). |
| `.k-scheduler-agendaview .k-scheduler-table>tbody>tr` | `role=row` | Those elements must have their role explicitly set as it has been removed by the `<table>` role set (none/presentation). |
| `.k-scheduler-agendaview .k-scheduler-table>tbody>tr>th` | `role=columnheader` | Those elements must have their role explicitly set as it has been removed by the `<table>` role set (none/presentation). |
| `.k-scheduler-agendaview .k-scheduler-content tr .k-selected` | `aria-selected` | `aria-selected` attribute must be used to signify the currently selected row. As in Agenda view the selection follows focus, that would be the current `active descendant` row. |

#### Content table td.k-scheduler-groupcolumn and td.k-scheduler-datecolumn elements

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-scheduler-content>.k-scheduler-table>tbody>tr>.k-scheduler-groupcolumn,.k-scheduler-content>.k-scheduler-table>tbody>tr>.k-scheduler-datecolumn` | `role=rowheader` | Those elements must have their role explicitly set as it has been removed by the `<table>` role set (none/presentation). |
| `.k-scheduler-content>.k-scheduler-table>tbody>tr>.k-scheduler-timecolumn,.k-scheduler-content>.k-scheduler-table>tbody>tr>.k-scheduler-timecolumn+td` | `role=gridcell` | Those elements must have their role explicitly set as it has been removed by the `<table>` role set (none/presentation). |

### Scheduler in Year view


Scheduler in Year view implements the ARIA specification of the **MultiViewCalendar**.

### Scheduler in all other views


For the rest of the views the `role="none/presentation"` must be used on all inner `<table>` elements in the widget. This way we could freely implement managed focused inside the component based on the arrow keys.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-scheduler-dayview,.k-scheduler-monthview,.k-scheduler-timelineview` | `role=none/presentation` | All `<table>` elements within the Scheduler must have their semantic role removed. |
| `.k-event` | `role=button` | Indicating that the events element is interactive. |
|  | `aria-label` | Label containing the title, start, and end date of the appointment, so that all of them are announced upon navigation to an appointment. |
| `.k-scheduler-layout:not(.k-scheduler-agendaview) .k-scheduler-content` | `tabindex=0` | Scrollable elements need to be focusable (does not apply to agenda view) to ensure scrolling with the arrow keys is available. |

## Resources

[WAI-ARIA specification for grid](https://www.w3.org/TR/wai-aria-1.2/#grid)

[WAI-ARIA specification for application](https://www.w3.org/TR/wai-aria-1.2/#application)

## Section 508


The Scheduler is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Scheduler has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Scheduler has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The Scheduler has been tested with [axe-core](https://github.com/dequelabs/axe-core).
## See Also
* [Keyboard Navigation by the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})