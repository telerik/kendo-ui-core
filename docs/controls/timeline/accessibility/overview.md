---
title: Overview
page_title: jQuery Timeline Documentation | Timeline Accessibility
description: "Get started with the jQuery Timeline by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_timeline_jquery
position: 1
---

# Timeline Accessibility

The Timeline is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI Timeline]({% slug keynav_timeline_jquery %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery Timeline provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Timeline is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The Timeline component features two very different modes of rendering: vertical and horizontal. Those two modes require two very different approaches in terms of WAI-ARIA implementation:


 - Horizontal Timeline: should be implement as a `role: tablist` component.
 - Vertical Timeline should be implemented as a collection of Buttons. Each event on the Timeline is a Button.

### Horizontal Timeline

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-timeline.k-timeline-horizontal .k-timeline-track-wrap .k-timeline-scrollable-wrap` | `role=tablist` | Indicates the tablist role for the ul element of the Timeline. |
| `.k-timeline.k-timeline-horizontal .k-timeline-track-item:not(.k-timeline-flag-wrap)` | `role=tab` | The tab `li` element. |
| `.k-timeline.k-timeline-horizontal .k-timeline-track-item[aria-selected=true]` | `aria-describedby` | The current selected tab element must be described by its tabpanel. |
| `.k-timeline.k-timeline-horizontal .k-timeline-track-item:not(.k-timeline-flag-wrap).k-focus` | `aria-selected=true` | Announces the selected state of the tab. |
| `.k-timeline.k-timeline-horizontal .k-timeline-flag-wrap` | `role=none` | The flag wrap elements must have its semantics removed. |
|  | `aria-hidden=true` | The flag wrap should not be present in the accessibility tree. |
| `.k-timeline.k-timeline-horizontal .k-card:not(:empty)` | `role=tabpanel` | The content `div` of the tab. |
|  | `aria-label` | Refers to the tab element that controls the panel. |
| `.k-timeline.k-timeline-horizontal .k-timeline-event[style='transform: translate3d(0px, 0px, 0px);'] .k-card` | `tabindex=0` | The current tab panel elements must be focusable, so that its contents would be announced. |
| `.k-timeline-arrow` | `aria-hidden=true` | Introduce aria-hidden attribute for the scrollable buttons. The buttons are not included in the tabsequence. |

### Vertical Timeline

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-timeline.k-timeline-vertical .k-card` | `role=button` | The items in the vertical Timeline are represented as buttons. |
|  | `aria-describedby=.k-timeline-date id` | The items in the vertical Timeline are described by their date elements. |
|  | `aria-live=polite` | The items in the vertical Timeline must be marked as live regions. |
|  | `tabindex=0` | The items in the vertical Timeline must be focusable. |
| `.k-timeline.k-timeline-vertical .k-collapsed .k-card` | `aria-expanded=false` | When collapsed, the items in the vertical Timeline must have their aria-expanded attribute set to false. |
| `.k-timeline.k-timeline-vertical .k-timeline-card:not(.k-collapsed) .k-card` | `aria-expanded=true` | When expanded, the items in the vertical Timeline must have their aria-expanded attribute set to true. |

## Resources

[WAI-ARIA specification for tablist](https://www.w3.org/TR/wai-aria-1.2/#tablist)

[WAI-ARIA practices: TabList example](https://www.w3.org/WAI/ARIA/apg/example-index/tabs/tabs-automatic.html)

## Section 508


The Timeline is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Timeline has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Timeline has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The Timeline has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the Timeline component could be found here: https://demos.telerik.com/kendo-ui/accessibility/timeline
## See Also
* [Keyboard Navigation by the Timeline (Demo)](https://demos.telerik.com/kendo-ui/timeline/keyboard-navigation)
* [Keyboard Navigation by the Timeline]({% slug keynav_timeline_jquery %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})