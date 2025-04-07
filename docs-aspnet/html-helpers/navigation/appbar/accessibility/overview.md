---
title: Overview
page_title: AppBar Documentation | AppBar Accessibility
description: "Get started with the {{ site.product }} AppBar and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_appbar_accessibility
position: 1
---

# AppBar Accessibility




Out of the box, the {{ site.product }} AppBar provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The AppBar is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


The AppBar component is a container for elements and does not implement any wai-aria attributes.

## Section 508


The AppBar is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The AppBar has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The AppBar has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the AppBar component, refer to the [AppBar Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/appbar).

## Keyboard Navigation

For details on how the keyboard navigation works in {{ site.product }}, refer to the [Accessibility Overview]({%slug overview_accessibility%}#keyboard-navigation) article.

## See Also

* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})