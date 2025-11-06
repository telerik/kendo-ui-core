---
title: Wai-Aria Support
page_title: jQuery Sortable Documentation | Sortable Accessibility
description: "Get started with the jQuery Sortable by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: jquery_sortable_accessibility
position: 1
---

# Sortable Accessibility

The Sortable is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to:
* [Keyboard navigation by the Kendo UI Sortable]({% slug keynav_kendoui_sortable %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery Sortable provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Sortable is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `n/a - wrapper element` | `role=list` | Sets the proper role for Sortable. |
| `n/a - list item element within the wrapper` | `role=listitem` | Sets the proper role for Sortable items. |
|  | `aria-label=Consists of text description of the item, information about the current item index and the total number of items, and indication that the item is movable` | Sets the proper label for the Sortable item. |
|  | `tabindex=The focused item gets tabindex '0' (if wrapper element is not a focusable DOM element), all other items - '-1' (if the element is a focusable DOM element) or the attribute is removed.` | Sets tabindex 0 to the active item. |
|  | `aria-grabbed=true/false` | Sets the aria-grabbed attribute value to indicate dragging. |
|  | `aria-dropeffect=move` | Sets the aria-dropeffect attribute value. |
|  | `aria-keyshortcuts=Control+ArrowLeft Control+ArrowRight Meta+ArrowLeft Meta+ArrowRight` | Sets the aria-keyshortcuts attribute value to announce available keyboard shortcuts. Some are omitted for brevity. |
| `n/a - disabled list item element within the wrapper` | `aria-disabled=true/false` | Sets the aria-disabled attribute value. |

## Section 508


The Sortable is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Sortable has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Sortable has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The Sortable has been tested with [axe-core](https://github.com/dequelabs/axe-core).
## See Also
* [Keyboard Navigation by the Sortable (Demo)](https://demos.telerik.com/kendo-ui/sortable/keyboard-navigation)
* [Keyboard Navigation by the Sortable]({% slug keynav_kendoui_sortable %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)