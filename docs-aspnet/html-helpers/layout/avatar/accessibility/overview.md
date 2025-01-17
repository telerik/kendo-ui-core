---
title: Overview
page_title: Avatar Documentation | Avatar Accessibility
description: "Get started with the {{ site.product }} Avatar and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_avatar_overview
position: 1
---

# Avatar Accessibility

Out of the box, the {{ site.product }} Avatar provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The Avatar is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-avatar img` | `alt` | Assures the presence of an `alt` attribute in a nested `img` tag inside the Avatar. |

## Section 508

The Avatar is fully compliant with the [Section 508 requirements](https://www.section508.gov/).

## Testing

The Avatar has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The Avatar has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Test Example

To test the Avatar component, refer to the [Avatar Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/avatar).

## Keyboard Navigation

For details on how the keyboard navigation works in {{ site.product }}, refer to the [Accessibility Overview]({%slug overview_accessibility%}#keyboard-navigation) article.

## See Also

* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})