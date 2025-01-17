---
title: Overview
page_title: Tooltip Documentation | Tooltip Accessibility
description: "Get started with the {{ site.product }} Tooltip and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_tooltip_overview
position: 1
---

# Tooltip Accessibility

Out of the box, the {{ site.product }} Tooltip provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The Tooltip is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-tooltip` | `role=tooltip` | Specifies the `tooltip` role of the tooltip container. |
|  | `id` | The element needs an `id` to be associated with the `aria-describedby` attribute of the trigger element. |
|  | `aria-describedby=.k-tooltip id` | Links the tooltip trigger/anchor element with its corresponding tooltip container. |

## Resources

[WAI-ARIA specification for tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

[MDN description for tooltip role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role)

## Section 508

The Tooltip is fully compliant with the [Section 508 requirements](https://www.section508.gov/).

## Testing

The Tooltip has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The Tooltip has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Test Example

To test the Tooltip component, refer to the [Tooltip Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/tooltip).

## Keyboard Navigation

For details on how the keyboard navigation works in {{ site.product }}, refer to the [Accessibility Overview]({%slug overview_accessibility%}#keyboard-navigation) article.

## See Also

* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})