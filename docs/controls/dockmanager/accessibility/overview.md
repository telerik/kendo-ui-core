---
title: Wai-Aria Support
page_title: jQuery DockManager Documentation | DockManager Accessibility
description: "Get started with the jQuery DockManager by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["dockmanager"]
slug: jquery_dockmanager_accessibility
position: 1
---

# DockManager Accessibility

The DockManager is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).

Out of the box, the Kendo UI for jQuery DockManager provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The DockManager is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The DockManager component consists of multiple inner panes, each containing tools, tabs, and content that can be resized, rearranged, and interacted with.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-dock-manager` | `role=application` | Indicates that the DockManager has its own keyboard navigation implemented. |
|  | `aria-live=polite` | Defines dynamic content changes within the DockManager container that need to be announced by screen readers. |
| `.k-dock-navigator` | `aria-hidden=true` | The navigator needs to be hidden from the readers as it appears only on drag. |

The Toolbar in the DockManager element of the component should implement the specification for the **Toolbar** component.

[Toolbar accessibility specification]({% slug jquery_toolbar_accessibility %})

The TabStrip in the DockManager element of the component should implement the specification for the **TabStrip** component.

[TabStrip accessibility specification]({% slug jquery_tabstrip_accessibility %})

The Splitter in the DockManager element of the component should implement the specification for the **Splitter** component.

[Splitter accessibility specification]({% slug jquery_splitter_accessibility %})

The Window elements in the DockManager element of the component should implement the specification for the **Window** component.

[Window accessibility specification]({% slug jquery_window_accessibility %})

## Section 508

The DockManager is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The DockManager has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The DockManager has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Automated Testing

The DockManager has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

For a live test example, see the [DockManager accessibility demo](https://demos.telerik.com/kendo-ui/accessibility/dockmanager).

## See Also

* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)
