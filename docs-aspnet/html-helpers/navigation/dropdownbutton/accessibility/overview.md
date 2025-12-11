---
title: Overview
page_title: DropDownButton Documentation | DropDownButton Accessibility
description: "Get started with the {{ site.product }} DropDownButton and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["dropdownbutton"]
slug: htmlhelpers_dropdownbutton_accessibility
position: 1
---

# DropDownButton Accessibility





Out of the box, the {{ site.product }} DropDownButton provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The DropDownButton is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### Main Button Element


The following table summarizes the selectors and attributes supported by the main `button` element of the DropDownButton:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-menu-button` | `role=button` or `nodeName=button` | Omitted if the `<button>` DOM element is used. |
|  | `aria-label` | The attribute must be present when no text is initially visible in the button. |
|  | `aria-expanded=true/false` | Announces the state of the popup visibility. |
|  | `aria-controls=.k-menu-group id` | Points to the popup element. Builds a relationship between the button and the popup. |
| `.k-menu-button.k-disabled` | `aria-disabled=true` | Rendered only when the button is disabled and the `disabled` attribute cannot be used. Applicable to the `<button>` or `<input type="button">` elements. |

### Popup Menu Element


The following table summarizes the selectors and attributes supported by the popup `menu` element of the DropDownButton:

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-menu-group` | `role=list` | Announces the `list` role of the popup. |
| `.k-menu-item` | `role=listitem` | Announces the `listitem` role of the popup items. |

## Resources

[WAI-ARIA Authoring Practices: Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)

## Section 508


The DropDownButton is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The DropDownButton has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The DropDownButton has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the DropDownButton component, refer to the [DropDownButton Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/dropdownbutton).

## Keyboard Navigation

For details on how the DropDownButton keyboard navigation works, refer to the [DropDownButton Keyboard Navigation]({%slug keynav_aspnetcore_dropdownbutton%}) article.

## See Also

* [Keyboard Navigation by the DropDownButton for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownbutton/keyboard-navigation)
* [Keyboard Navigation by the DropDownButton for {{ site.framework }}]({% slug keynav_aspnetcore_dropdownbutton %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})