---
title: Wai-Aria Support
page_title: jQuery PromptBox Documentation | PromptBox Accessibility
description: "Get started with the jQuery PromptBox by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_kendoui_promptbox
position: 0
components: ["promptbox"]
---

# PromptBox Accessibility

The PromptBox is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).

Out of the box, the Kendo UI for jQuery PromptBox provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The PromptBox is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation]({% slug keyboard_navigation_kendoui_promptbox %}) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The PromptBox is an input component designed for AI-assisted interactions. It supports single-line and multi-line text input modes, and integrates with the Speech-to-Text Button component.

### Single-line Input

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-prompt-box-singleline .k-prompt-box-input` | `nodeName=input` | Ensures the input field has the proper textbox role. |
|  | `aria-label` or `aria-labelledby` | Provides an accessible label for the input. Use `aria-label` or associate with a visible label via `aria-labelledby`. |
|  | `placeholder` | Provides a short hint to the user about the expected input. Should not replace proper labeling. |

### Multi-line Input

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-prompt-box-multiline .k-prompt-box-textarea` | `nodeName=textarea` | Ensures the textarea has the proper textbox role. |
|  | `aria-label` or `aria-labelledby` | Provides an accessible label for the textarea. Use `aria-label` or associate with a visible label via `aria-labelledby`. |
|  | `placeholder` | Provides a short hint to the user about the expected input. Should not replace proper labeling. |
|  | `aria-multiline=true` | Indicates the textarea supports multiple lines of text. |

### Affix Buttons

The PromptBox can have prefix and suffix elements containing buttons and icons.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-prompt-box-affix .k-button` | `role=button` or `nodeName=button` | Buttons in affixes must have appropriate role. |
|  | `aria-label` | Affix buttons must be properly labelled to describe their function. |

### Send/Stop Button

The primary action button for submitting the prompt or stopping generation.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-prompt-box-affix .k-button:has(.k-svg-i-arrow-up), .k-prompt-box-affix .k-button:has(.k-svg-i-stop)` | `aria-live=polite` | The send button renders the aria-live attribute to announce the change in status. |
|  | `aria-label` | The send button is labelled to indicate its current action (e.g., 'Send prompt' or 'Stop generating'). |

[SpeechToTextButton accessibility specification]({% slug jquery_speechtotextbutton_accessibility %})

## Section 508

The PromptBox is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The PromptBox has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The PromptBox has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Automated Testing

The PromptBox has been tested with [axe-core](https://github.com/dequelabs/axe-core).

### Test Example

A live test example of the PromptBox component could be found here: https://demos.telerik.com/kendo-ui/accessibility/promptbox

## See Also

* [Keyboard Navigation by the PromptBox]({% slug keyboard_navigation_kendoui_promptbox %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)
