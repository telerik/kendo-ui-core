---
title: Overview
page_title: Gantt Documentation | Gantt Accessibility
description: "Get started with the {{ site.product }} Gantt and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["gantt"]
slug: htmlhelpers_gantt_accessibility
position: 1
---

# Gantt Accessibility





Out of the box, the {{ site.product }} Gantt provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Gantt is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The Gantt component is a composite component that is used to represent project planning.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-gantt` | `role=application` | Indicates the Gantt's role as an application. |


The Gantt component integrates the toolbar component and follows its wai-aria support.

[ToolBar accessibility specification]({% slug htmlhelpers_toolbar_accessibility %})


The main inner component in the Gantt is the TreeList.

[TreeList accessibility specification]({% slug htmlhelpers_treelist_accessibility %})


Another part of the component is the Splitter component and Wai-Aria support.

[Splitter accessibility specification]({% slug htmlhelpers_splitter_accessibility %})


The following Wai-Aria support is implemented in the TimeLine of the Gantt.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-gantt-timeline .k-grid-content` | `role=tree` | Associates the role of the timeline as a tree. |
| `.k-gantt-timeline .k-gantt-rows` | `role=presentation` | Used to build the accessibility tree. |
| `.k-gantt-timeline .k-gantt-columns` | `role=presentation` | Used to build the accessibility tree. |
| `.k-gantt-timeline .k-gantt-tasks` | `role=presentation` | Used to build the accessibility tasks. |
| `.k-gantt-timeline .k-task` | `role=treeitem` | Associates the role of the timeline task as a tree item. |
|  | `aria-level` | Specifies the level of the task. |
|  | `aria-describedby=.k-tooltip id` | Gives more details for the task through its tooltip. |
| `.k-gantt-timeline .k-task .k-task-complete` | `aria-hidden=true` | Hides the status element from the task. |
| `.k-gantt-timeline .k-task .k-task-actions` | `aria-hidden=true` | Hides the actions element from the task. |

## Section 508


The Gantt is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Gantt has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Gantt has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the Gantt component, refer to the [Gantt Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/gantt).

## Keyboard Navigation

For details on how the Gantt keyboard navigation works, refer to the [Gantt Keyboard Navigation]({%slug keynav_aspnetcore_gantt%}) article.

## See Also

* [Keyboard Navigation by the Gantt for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt/keyboard-navigation)
* [Keyboard Navigation by the Gantt for {{ site.framework }}]({% slug keynav_aspnetcore_gantt %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})