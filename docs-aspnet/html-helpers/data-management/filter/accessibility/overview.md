---
title: Overview
page_title: Filter Documentation | Filter Accessibility
description: "Get started with the {{ site.product }} Filter and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["filter"]
slug: htmlhelpers_filter_accessibility
position: 1
---

# Filter Accessibility





Out of the box, the {{ site.product }} Filter provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Filter is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The Filter component represents visually the structure of a filter object. As the filter object can contain nested objects, that hierarchical structure must be represented in the accessibility tree by the `role=tree` assigned to the component.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-filter-container` | `role=tree` | Describes the hierarchical structure of the Filter component. |
|  | `aria-label` | Specifies a label for the Filter component. |
| `.k-filter-group-main,.k-filter-item` | `role=treeitem` | Each FilterGroup and FilterExpression represent a separate `treeitem` in the Filter component structure. |
| `.k-filter-lines` | `role=group` | Represents a group if items in the Filter component. |
| `.k-toolbar` | `role=toolbar` | The role represents a collection of tools. |
|  | `aria-label` | Specifies a label for the toolbar. |


Each toolbar in the Filter should follow the specification for a ToolBar component. The elements inside the FilterGroup follow the ARIA specification applicable to their specific roles.

## Resources

[WAI-ARIA specification for toolbar](https://www.w3.org/TR/wai-aria-1.2/#toolbar)

## Section 508


The Filter is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Filter has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Filter has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the Filter component, refer to the [Filter Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/filter).

## Keyboard Navigation

For details on how the Filter keyboard navigation works, refer to the [Filter Keyboard Navigation]({%slug keynav_filter_aspnetcore%}) article.

## See Also

* [Keyboard Navigation by the Filter for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/filter/keyboard-navigation)
* [Keyboard Navigation by the Filter for {{ site.framework }}]({% slug keynav_filter_aspnetcore %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})