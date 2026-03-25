---
title: Wai-Aria Support
page_title: jQuery SegmentedControl Documentation | SegmentedControl Accessibility
description: "Get started with the jQuery SegmentedControl by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["segmentedcontrol"]
slug: jquery_segmentedcontrol_accessibility
position: 1
---

# SegmentedControl Accessibility

The SegmentedControl is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI SegmentedControl]({% slug keynav_segmentedcontrol_jquery %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})

Out of the box, the Kendo UI for jQuery SegmentedControl provides accessibility support and enables users with disabilities to acquire complete control over its features.

The SegmentedControl is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-segmented-control` | `role=group` | Sets the proper role for the group of buttons. |
| `.k-segmented-control-button` | `role=button` | Each button must have the appropriate button role. |
|  | `aria-label` | Each button should be properly labelled. Use `aria-label` if the button contains only an icon without text. |
| `.k-segmented-control-button.k-selected` | `aria-pressed=true` | Only the selected button within the group will have this attribute set to true. |
| `.k-segmented-control-button.k-disabled` | `aria-disabled=true` | Indicates that the button is disabled and cannot be interacted with. |
| `.k-segmented-control-thumb` | `aria-hidden=true` | The thumb is purely decorative and should be hidden from screen readers. |

## Resources

[WAI-ARIA `button` Role Specification](https://www.w3.org/TR/wai-aria-1.2/#button)
[WAI-ARIA `group` Role Specification](https://www.w3.org/TR/wai-aria-1.2/#group)

## Section 508

The SegmentedControl is compliant with the [Section 508 requirements](http://www.section508.gov/).

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).


### Test Example

A live test example of the SegmentedControl component could be found here: https://demos.telerik.com/kendo-ui/accessibility/segmentedcontrol

## See Also

* [Keyboard Navigation by the SegmentedControl (Demo)](https://demos.telerik.com/kendo-ui/segmentedcontrol/keyboard-navigation)
* [Keyboard Navigation by the SegmentedControl]({% slug keynav_segmentedcontrol_jquery %})
