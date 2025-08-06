---
title: Overview
page_title: SpeechToTextButton Documentation | SpeechToTextButton Accessibility
description: "Get started with the {{ site.product }} SpeechToTextButton and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_speechtotextbutton_accessibility
position: 1
---

# SpeechToTextButton Accessibility

Out of the box, the {{ site.product }} SpeechToTextButton provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The SpeechToTextButton is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AAA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-button.k-speech-to-text-button` | `role=button` or `nodeName=button` | If the used element is not `<button>`, explicitly set its `role` to `button`. |
| `.k-button` | `aria-pressed=true/false` | Announced the toggle behaviour of the button. |

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

### Test Example

To test the SpeechToTextSpeechToTextButton component, refer to the [SpeechToTextSpeechToTextButton Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/speechtotextbutton).

## Keyboard Navigation

For details on how the SpeechToTextSpeechToTextButton keyboard navigation works, refer to the [SpeechToTextSpeechToTextButton Keyboard Navigation]({%slug htmlhelpers_speechtotextbutton_keynav%}) article.

## See Also

* [Keyboard Navigation by the SpeechToTextSpeechToTextButton for {{ site.framework }}]({% slug htmlhelpers_speechtotextbutton_keynav %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})