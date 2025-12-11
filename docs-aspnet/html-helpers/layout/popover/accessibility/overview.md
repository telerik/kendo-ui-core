---
title: Overview
page_title: Popover Documentation | Popover Accessibility
description: "Get started with the {{ site.product }} Popover and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["popover"]
slug: htmlhelpers_popover_accessibility
position: 1
---

# Popover Accessibility





Out of the box, the {{ site.product }} Popover provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Popover is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-popover` | `role=tooltip/dialog` | Announces the tooltip (no focusable content) or dialog (contains focusable elements) role of the component. |
|  | `id` | The element needs an id to be associated with the aria-describedby attribute of the trigger element. |
|  | `aria-describedby=.k-popover id` | Links the popover trigger/anchor element with its corresponding popover container. |
| `.k-popover` | `aria-labelledby=.k-popover-header id` | Links the popover container with the popover header element when there is focusable content. |
|  | `aria-describedby=.k-popover-body id` | Links the popover container with the popover body element when there is focusable content. |
| `.k-popover-header` | `id` | Links the popover container with the popover header element when there is focusable content. |
| `.k-popover-body` | `id` | Links the popover container with the popover body element when there is focusable content. |

## Resources

[WAI-ARIA specification for tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

[MDN description for tooltip role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role)

[MDN description for dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role)

## Section 508


The Popover is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Popover has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Popover has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the Popover component, refer to the [Popover Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/popover).

## Keyboard Navigation

For details on how the keyboard navigation works in {{ site.product }}, refer to the [Accessibility Overview]({%slug overview_accessibility%}#keyboard-navigation) article.

## See Also

* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})