---
title: Overview
page_title: jQuery Captcha Documentation | Captcha Accessibility
description: "Get started with the jQuery Captcha by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_captcha_widget
position: 1
---

# Captcha Accessibility

The Captcha is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to:
* [Keyboard navigation by the Kendo UI Captcha]({% slug keynav_captcha_jquery %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})




Out of the box, the Kendo UI for jQuery Captcha provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Captcha is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2  AA](https://www.w3.org/TR/WCAG22/) standards](https://www.w3.org/TR/WCAG22/) and [Section 508](http://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.


No role attribute is implemented as the  `html input type="text"` element is sufficient for definining purpose of the component.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-captcha-image>img` | `alt` | The Captcha image must have an `alt` tag, so that the. |
| `.k-captcha-image-controls>.k-button` | `role=button` or `nodeName=button` | The image control buttons must have an appropriate role. |
|  | `aria-label` or `title` | Each button must have an accessible name as they are all represented by icons and no text is available in their contents. |
| `.k-captcha-input .k-input-inner` | `role=textbox` or `nodeName=input` | Describes the role of the component. |
|  | `label for` or `aria-label` or `aria-labelledby` | The input needs an accessible name to be assigned to it. |
|  | `aria-invalid=true` | Attribute is rendered only when the captcha is in form and announces the valid state of the component. |
| `.k-disabled .k-input-inner` | `disabled=disabled` or `aria-disabled=true` | Attribute is rendered only when the textbox is disabled. |
| `.k-captcha-input>input` | `type=hidden` | The hidden input holding the Captcha ID value so that the remote could validate the user input. |

## Resources

[WAI-ARIA specification for textbox](https://www.w3.org/TR/wai-aria-1.2/#textbox)

## Section 508


The Captcha is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The Captcha has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The Captcha has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing

The Captcha has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

A live test example of the Captcha component could be found here: https://demos.telerik.com/kendo-ui/accessibility/captcha

## See Also

* [Keyboard Navigation by the Captcha (Demo)](https://demos.telerik.com/kendo-ui/captcha/keyboard-navigation)
* [Keyboard Navigation by the Captcha]({% slug keynav_captcha_jquery %})
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})