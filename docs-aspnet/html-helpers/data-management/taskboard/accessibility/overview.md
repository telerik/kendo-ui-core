---
title: Overview
page_title: TaskBoard Documentation | TaskBoard Accessibility
description: "Get started with the {{ site.product }} TaskBoard and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_taskboard_aspnetcore_accessibility
position: 1
---

# TaskBoard Accessibility





Out of the box, the {{ site.product }} TaskBoard provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The TaskBoard is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The TaskBoard component is a composite component that contains:


 - `ToolBar` - on top of the component
 - `Columns` - it represents a list of tasks


Each Column contains:


 - `Buttons` - action buttons present on the top of each column
 - `Tasks` - a collection of tasks (cards/list items)

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-taskboard` | `role=application` | The TaskBoard has `role=application` as its inner navigation requires the use of arrows. |
| `.k-taskboard-column` | `role=list` | The TaskBoard Column is a collection of list items. |
|  | `tabindex=0` | The TaskBoard Column must be focusable. |
|  | `aria-labelledby=.k-taskboard-column-header id` | The TaskBoard Column must be labelled by its header. |
| `.k-taskboard-column-action-button` | `role=button` or `nodeName=button` | The TaskBoard Column actions are buttons. |
|  | `aria-label` or `title` | Each action must have an accessible name as they are represented by icons and no text is available in their contents. |
| `.k-taskboard-card` | `role=listitem` | The TaskBoard Tasks (cards) are list items. |
|  | `tabindex=0` | The TaskBoard Card must be focusable. |
| `.k-taskboard-card-menu-button` | `role=button` or `nodeName=button` | The TaskBoard card menu element must be a button. |
|  | `aria-label` or `title` | The menu button must have an accessible name as it is represented by an icon and no text is available in its contents. |
| `.k-taskboard-pane-header-actions>.k-button` | `role=button` or `nodeName=button` | The TaskBoard edit form close element must be a button. |
|  | `aria-label` or `title` | The edit form close button must have an accessible name as it is represented by an icon and no text is available in its contents. |
| `.k-taskboard-edit-pane .k-form` | `role=form` | The edit Form needs the appropriate role to be assigned to it. |
|  | `aria-labelledby=.k-taskboard-pane-header-text id` | The TaskBoard edit form must be labeled by the header text of the pane it is located at. |

## Resources

[WAI-ARIA spec: Role List](https://www.w3.org/TR/wai-aria-1.2/#listt)

## Section 508


The TaskBoard is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The TaskBoard has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The TaskBoard has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the TaskBoard component, refer to the [TaskBoard Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/taskboard).

## Keyboard Navigation

For details on how the TaskBoard keyboard navigation works, refer to the [TaskBoard Keyboard Navigation]({%slug htmlhelpers_taskboard_aspnetcore_keynav%}) article.

## See Also

* [Keyboard Navigation by the TaskBoard for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard/keyboard-navigation)
* [Keyboard Navigation by the TaskBoard for {{ site.framework }}]({% slug htmlhelpers_taskboard_aspnetcore_keynav %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})