---
title: Overview
page_title: ChipList Documentation | ChipList Accessibility
description: "Get started with the {{ site.product }} ChipList and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["chiplist"]
slug: htmlhelpers_chiplist_accessibility
position: 1
---

# ChipList Accessibility





Out of the box, the {{ site.product }} ChipList provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ChipList is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-chip-list` | `role=listbox` | Announces the list role of the chip list. |
|  | `aria-label` or `aria-labelledby` | Adds label to the ChipList element. ListBox element requires an accessible name attached to it. |
|  | `aria-orientation=horizontal` | Specifies the horizontal orientation of the chiplist that gives context about the navigation shortcuts. |
|  | `aria-multiselectable=true` | Announces the multiple selection ability of the chiplist. Only when the selection mode is set to multiple. |
| `.k-chip` | `role=option` | Announces the chip is an option inner component of the chip list. |
| `.k-chip.k-selected` | `aria-selected=true` | Announces the chip is selected. |
| `.k-chip:not(.k-selected)` | `aria-selected=false` | Announces the chip is not selected. |
| `.k-chip:has(.k-i-x-circle),.k-chip:has(.k-svg-i-x-circle)` | `aria-keyshortcuts=Enter Delete` | Announces the Delete action along with the default Enter key used for selection/click action. |


When selection is disabled in the ChipList, it should not have its role set to `listbox`. Instead, the attribute should either be omitted, or its value should be set to `none`. In that case the `role` of the Chip elements should remain `button` as per the Chip component specification.

## Resources

[ARIA practices list pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)

## Section 508


The ChipList is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ChipList has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ChipList has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the ChipList component, refer to the [ChipList Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/chiplist).

## Keyboard Navigation

For details on how the ChipList keyboard navigation works, refer to the [Accessibility Overview]({%slug overview_accessibility%}#keyboard-navigation) article.

## See Also

* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})