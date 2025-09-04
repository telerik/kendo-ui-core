---
title: Overview
page_title: Chat Documentation | Chat Accessibility
description: "Get started with the {{ site.product }} Chat and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_chat_accessibility
position: 1
---

# Chat Accessibility





Out of the box, the {{ site.product }} Chat provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The Chat is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

### Chat component


The Chat component is a composite one and integrates the accessibility of the ToolBar, Dialog, DropDownButton and ContextMenu components.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-message-list` | `role=log` | The role of the Chat message list must imply that there is a log (list) of messages. |
|  | `aria-label` | Announces the purpose of the Chat message list (for ex. 'Message list'). |
| `.k-bubble` | `tabindex=0` | The Chat bubble must be focusable. |
| `.k-bubble .k-typing-indicator` | `tabindex=-1` | The Chat bubble typing indicator should not be focusable. |
| `.k-suggestion-group` | `role=group` | Indicates that the suggestion container element is a group. |
| `.k-suggestion` | `role=button` | The suggestion elements must be exposed as buttons. |
|  | `tabindex=0` | The suggestion elements must be part of the page tabsequence. |
| `.k-input-suffix>.k-button` | `role=button` or `nodeName=button` | The buttons must have appropriate role. |
|  | `aria-label` or `title` | The buttons must be properly labelled. |
| `.k-input-suffix>.k-chat-send.k-disabled` | `aria-disabled=true` | Announces send action as disabled if necessary. |
| `.k-message-group-content>.k-chat-download-button` | `aria-label` or `title` | The download button must be properly labelled. |
|  | `role=button` or `nodeName=button` | The download button must have an appropriate role. |
| `.k-message-reference>.k-button` | `aria-label` or `title` | The reference close button must be properly labelled. |
|  | `role=button` or `nodeName=button` | The reference close button must have an appropriate role. |
| `k-bubble-expandable-indicator` | `role=button` | The expandable indicator must have an appropriate role. |
|  | `aria-label` or `title` | The expandable indicator must be properly labelled. |
|  | `tabindex=0` | The expandable indicator must be part of the page tabsequence. |

### ToolBar Component


Chat Message ToolBar follows the specification for the the ToolBar component.

[ToolBar accessibility specification]({% slug htmlhelpers_toolbar_accessibility %})

### Textarea Component

[Textarea accessibility specification]({% slug htmlhelpers_textarea_accessibility %})

### DropDownButton Component

[DropDownButton accessibility specification]({% slug htmlhelpers_dropdownbutton_accessibility %})

### SpeechToTextButton Component

[SpeechToTextButton accessibility specification]({% slug htmlhelpers_speechtotextbutton_accessibility %})

### ContextMenu Component

[ContextMenu accessibility specification]({% slug htmlhelpers_contextmenu_accessibility %})

## Resources

[WAI-ARIA specification for log](https://www.w3.org/TR/wai-aria-1.2/#log)

## Section 508


The Chat is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

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

For details on how the Chat keyboard navigation works, refer to the [Chat Keyboard Navigation]({%slug keynav_aspnetcore_chat%}) article.

## See Also

* [Keyboard Navigation by the Chat for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chat/keyboard-navigation)
* [Keyboard Navigation by the Chat for {{ site.framework }}]({% slug keynav_aspnetcore_chat %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})