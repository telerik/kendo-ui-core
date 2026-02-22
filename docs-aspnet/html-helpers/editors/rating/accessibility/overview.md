---
title: Overview
page_title: Rating Documentation | Rating Accessibility
description: "Get started with the {{ site.product }} Rating and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["rating"]
slug: htmlhelpers_rating_accessibility
position: 1
---

# Rating Accessibility





Out of the box, the {{ site.product }} Rating provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Rating is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-rating` | `role=slider` | Announces the `slider` role of the Rating element. |
|  | `aria-label` or `aria-labelledby` or `title` | The Rating needs an accessible name to be assigned to it. |
|  | `tabindex=0` | The element must be focusable. |
|  | `aria-valuenow` | Specifies the currently selected value in the Rating. |
|  | `aria-valuemin` | Specifies the minimum available value in the Rating. |
|  | `aria-valuemax` | Specifies the maximum available value in the Rating. |

## Resources

[WAI-ARIA specification for slider](https://www.w3.org/TR/wai-aria-1.2/#slider)

## Section 508


The Rating is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Rating has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Rating has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the Rating component, refer to the [Rating Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/rating).

## Keyboard Navigation

For details on how the Rating keyboard navigation works, refer to the [Rating Keyboard Navigation]({%slug keynav_aspnetcore_rating%}) article.

## See Also

* [Keyboard Navigation by the Rating for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/rating/keyboard-navigation)
* [Keyboard Navigation by the Rating for {{ site.framework }}]({% slug keynav_aspnetcore_rating %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})