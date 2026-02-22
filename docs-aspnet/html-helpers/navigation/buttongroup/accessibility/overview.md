---
title: Overview
page_title: ButtonGroup Documentation | ButtonGroup Accessibility
description: "Get started with the {{ site.product }} ButtonGroup and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["buttongroup"]
slug: htmlhelpers_buttongroup_accessibility
position: 1
---

# ButtonGroup Accessibility





Out of the box, the {{ site.product }} ButtonGroup provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ButtonGroup is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-button-group:not(.k-split-button)` | `role=group` | Sets the proper role for the group of buttons. |
| `.k-button-group.k-disabled` | `aria-disabled=true` | The attribute is rendered only when the entire button group is disabled. |
| `.k-button-group:not(.k-split-button):not(.k-scheduler-navigation):not(.k-zoom-control) .k-button` | `aria-pressed` | Specifies the current state of the ButtonGroup. Only the selected button within the group will have this attribute set to `true`. |

## Resources

[WAI-ARIA `button` Role Specification](https://www.w3.org/TR/wai-aria-1.2/#button)

[WAI-ARIA `group` Role Specification](https://www.w3.org/TR/wai-aria-1.2/#group)

## Section 508


The ButtonGroup is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ButtonGroup has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ButtonGroup has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the ButtonGroup component, refer to the [ButtonGroup Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/buttongroup).

## Keyboard Navigation

For details on how the ButtonGroup keyboard navigation works, refer to the [ButtonGroup Keyboard Navigation]({%slug keynav_aspnetcore_buttongroup%}) article.

## See Also

* [Keyboard Navigation by the ButtonGroup for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/buttongroup/keyboard-navigation)
* [Keyboard Navigation by the ButtonGroup for {{ site.framework }}]({% slug keynav_aspnetcore_buttongroup %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})