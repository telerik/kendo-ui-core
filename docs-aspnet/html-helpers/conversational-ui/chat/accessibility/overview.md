---
title: Overview
page_title: Chat Documentation | Chat Accessibility
description: "Get started with the {{ site.product }} Chat and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: accessibility_chat_overview
position: 1
---

# Chat Accessibility

Out of the box, the {{ site.product }} Chat provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The Chat is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-message-list` | `role=log` | The role of the Chat message list must imply that there is a log (list) of messages. |
|  | `aria-label` | Announces the purpose of the Chat message list (for ex. 'Message list'). |
| `.k-quick-reply` | `role=button` | The quick reply elements must be exposed as buttons. |
|  | `tabindex=0` | The quick reply elements must be part of the page tabsequence. |
| `.k-message-box>.k-input-inner` | `role=textbox` or `nodeName=input` | The message must have an input or an element with `role=textbox`. |
|  | `label for` or `aria-label` or `aria-labelledby` | The message box input must have a label. |
| `.k-input-suffix>.k-button` | `role=button` or `nodeName=button` | The buttons must have appropriate role. |
|  | `aria-label` or `title` | The buttons must be properly labelled. |
| `.k-button-toggle` | `aria-controls=.k-toolbar-box id` | The ToolBar toggle button must have an `aria-controls` attribute pointing to the ToolBar element. |
| `.k-toolbar-box` | `role=toolbar` | The Chat ToolBar must have an appropriate role. |


Chat ToolBar follows the specification for the the ToolBar component.

[ToolBar accessibility specification]({% slug accessibility_toolbar_overview %})

## Resources

[WAI-ARIA specification for log](https://www.w3.org/TR/wai-aria-1.2/#log)

## Section 508

The Chat is fully compliant with the [Section 508 requirements](https://www.section508.gov/).

## Testing

The Chat has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The Chat has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Test Example

To test the Chat component, refer to the [Chat Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/chat).

## Keyboard Navigation

For details on how the Chat keyboard navigation works, refer to the [Accessibility Overview]({%slug overview_accessibility%}#keyboard-navigation) article.

## See Also

* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})