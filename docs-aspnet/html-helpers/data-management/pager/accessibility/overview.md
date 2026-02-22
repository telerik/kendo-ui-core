---
title: Overview
page_title: Pager Documentation | Pager Accessibility
description: "Get started with the {{ site.product }} Pager and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["pager"]
slug: htmlhelpers_pager_accessibility
position: 1
---

# Pager Accessibility





Out of the box, the {{ site.product }} Pager provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Pager is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The `PageSize` select must be implemented either as a DropDownList component with no filtering or through a native `<select>` element.


The `Page` select, which is present for mobile devices and smaller screens with limited space for page links, must be a native `<select>` element.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-pager` | `role=application` | Indicates that the `pager` element has its own keyboard navigation implemented. |
|  | `aria-roledescription=pager` | Clarifies the role of the Pager. |
|  | `aria-keyshortcuts=Enter ArrowRight ArrowLeft` | Announces the available keyboard shortcuts while the `pager` element is focused. |
|  | `aria-label` | Announces the currently selected page and the number of available pages. |
|  | `aria-controls` | Points to the `id` of the element that is being controlled, for example, a Grid. |
| `.k-pager-nav` | `role=button` or `nodeName=button` | Specifies the role of the element. |
|  | `aria-disabled=true` | The attribute is present when the `Arrow` button is disabled, for example, present on the **Previous** button when the current page is the first one. |
|  | `title` | Specifies the purpose of each button. |
|  | `aria-label` or `title` | Specifies the purpose of each link, for example, `Page 6`. |
|  | `aria-current=page` | The attribute must be present on the currently selected page element. |
| `.k-pager-sizes>.k-dropdownlist` | `aria-label` | The element requires an `aria-label` to specify its purpose. |
| `.k-pager-numbers-wrap>.k-dropdown` | `aria-label` | The element requires an `aria-label` to specify its purpose. |
| `.k-pager-input>.k-input>.k-input-inner` | `aria-label` | The element requires an `aria-label` to specify its purpose. |

## Resources

[WAI-ARIA Specification for Navigation](https://www.w3.org/TR/wai-aria-1.2/#navigation)

[Accessibility Style Guide: Pagination](https://a11y-style-guide.com/style-guide/section-navigation.html#kssref-navigation-pagination)

## Section 508


The Pager is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Pager has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Pager has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the Pager component, refer to the [Pager Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/pager).

## Keyboard Navigation

For details on how the Pager keyboard navigation works, refer to the [Pager Keyboard Navigation]({%slug keynav_aspnetcore_pager%}) article.

## See Also

* [Keyboard Navigation by the Pager for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pager/keyboard-navigation)
* [Keyboard Navigation by the Pager for {{ site.framework }}]({% slug keynav_aspnetcore_pager %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})