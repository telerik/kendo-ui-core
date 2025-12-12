---
title: Wai-Aria Support
page_title: jQuery SpeechToTextButton Documentation | SpeechToTextButton Accessibility
description: "Get started with the jQuery SpeechToTextButton by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["speechtotextbutton"]
slug: jquery_speechtotextbutton_accessibility
position: 1
---

# SpeechToTextButton Accessibility

The SpeechToTextButton is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

 For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).




Out of the box, the Kendo UI for jQuery SpeechToTextButton provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The SpeechToTextButton is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AAA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-button.k-speech-to-text-button` | `role=button` or `nodeName=button` | If the used element is not `<button>`, explicitly set its `role` to `button`. |
|  | `aria-pressed=true/false` | Announced the toggle behaviour of the button. |

## Resources

[WAI-ARIA Authoring Practices: Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

## Section 508


The SpeechToTextButton is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The SpeechToTextButton has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The SpeechToTextButton has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Automated Testing
The SpeechToTextButton has been tested with [axe-core](https://github.com/dequelabs/axe-core).
### Test Example
A live test example of the SpeechToTextButton component could be found here: https://demos.telerik.com/kendo-ui/accessibility/speechtotextbutton
## See Also
* [Keyboard Navigation by the SpeechToTextButton (Demo)](https://demos.telerik.com/kendo-ui/speechtotextbutton/keyboard-navigation)
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)