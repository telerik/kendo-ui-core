---
title: Overview
page_title: Breadcrumb Documentation | Breadcrumb Accessibility
description: "Get started with the {{ site.product }} Breadcrumb and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_aspnetcore_breadcrumb
position: 1
---

# Breadcrumb Accessibility

Out of the box, the {{ site.product }} Breadcrumb provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The Breadcrumb is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The Breadcrumb component renders the semantic `nav` HTML element that automatically associated navigation role.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-breadcrumb` | `aria-label=Breadcrumb` | Indicates the type of navigation provided by the `nav` element. |
| `.k-breadcrumb-item .k-breadcrumb-link,.k-breadcrumb-item .k-breadcrumb-root-link` | `role=link` or `nodeName=a` | The Breadcrumb item must render either an `<a>` element, or must have `role="link"` assigned. |
| `.k-breadcrumb-last-item .k-breadcrumb-link,.k-breadcrumb-last-item .k-breadcrumb-root-link` | `aria-current=page` | The last Breadcrumb item that points to the active page must have `aria-current="page"`. |
| `.k-breadcrumb-last-item .k-breadcrumb-link` | `aria-disabled=true` | Indicates that the last Breadcrumb item is disabled. |
| `.k-breadcrumb-delimiter-icon` | `aria-hidden=true` | The Breadcrumb delimiter icon must not be accessed through assistive technology. |

## Resources

[ARIA practices: BreadCrumb Example](https://www.w3.org/WAI/ARIA/apg/example-index/breadcrumb/index.html)

## Section 508

The Breadcrumb is fully compliant with the [Section 508 requirements](https://www.section508.gov/).

## Testing

The Breadcrumb has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The Breadcrumb has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Test Example

To test the Breadcrumb component, refer to the [Breadcrumb Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/breadcrumb).

## Keyboard Navigation

For details on how the Breadcrumb keyboard navigation works, refer to the [Breadcrumb Keyboard Navigation]({%slug keynav_aspnetcore_breadcrumb%}) article.

## See Also

* [Keyboard Navigation by the Breadcrumb for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/breadcrumb/keyboard-navigation)
* [Keyboard Navigation by the Breadcrumb for {{ site.framework }}]({% slug keynav_aspnetcore_breadcrumb%})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})