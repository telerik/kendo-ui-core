---
title: Overview
page_title: ToolBar Documentation | ToolBar Accessibility
description: "Get started with the {{ site.product }} ToolBar and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_toolbar_accessibility
position: 1
---

# ToolBar Accessibility





Out of the box, the {{ site.product }} ToolBar provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The ToolBar is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-toolbar` | `role=toolbar` | The component role. |
|  | `aria-label` or `aria-labelledby` | Must be supplied on each toolbar only when the application contains more than one toolbars. |

## Resources

[WAI-ARIA Specification for the ToolBar](https://www.w3.org/TR/wai-aria-1.2/#toolbar)

## Section 508


The ToolBar is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The ToolBar has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The ToolBar has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the ToolBar component, refer to the [ToolBar Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/toolbar).

## Keyboard Navigation

For details on how the ToolBar keyboard navigation works, refer to the [ToolBar Keyboard Navigation Demo](https://demos.telerik.com/{{ site.platform }}/toolbar/keyboard-navigation).

## See Also

* [Keyboard Navigation by the ToolBar for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar/keyboard-navigation)
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})