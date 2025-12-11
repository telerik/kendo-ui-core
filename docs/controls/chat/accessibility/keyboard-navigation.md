---
title: Keyboard Navigation
page_title: jQuery Chat Documentation - Keyboard Navigation
description: "Get started with the Kendo UI for jQuery Chat and learn about the component keyboard navigation functionality."
components: ["chat"]
slug: keynav_kendoui_chat
position: 2
---

# Keyboard Navigation

The keyboard navigation of the Chat is always available.

For a runnable example, refer to the [demo on using the keyboard navigation of the Chat](https://demos.telerik.com/kendo-ui/chat/keyboard-navigation).  

## Managing the Focus

Focusable elements in the Chat are part of the page tab sequence:

- `.k-suggestion` (if present);
- `.k-message-box textarea`;
- all `.k-input-suffix button` elements;
- all `.k-chat-file .k-menu-button` elements (if any);
- all `.k-chat-download-button` elements (if any);
- all `.k-message-reference .k-button` elements (if any);

## Keyboard Shortcuts

This section lists the keyboard shortcuts supported by the Chat composite component.

### ToolBar Component

The Chat includes a ToolBar component for message actions and file operations. Refer to the [ToolBar keyboard navigation documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/toolbar/keyboard-navigation) for the available shortcuts.

### DropDownButton Component

The Chat uses DropDownButtons for various actions. Refer to the [DropDownButton keyboard navigation documentation]({% slug keynav_kendoui_dropdownbutton_widget %}) for the available shortcuts.

### Speech-to-Text Functionality

When speech-to-text functionality is enabled, the microphone button supports standard button keyboard interactions with `Enter` and `Space` keys to activate voice recording.

### ContextMenu Component

The ContextMenu component provides a context menu for the chat bubble upon `Right Click` or `Shift + F10` key press. Refer to the [ContextMenu keyboard navigation documentation]({% slug keynav_contextmenu_jquery %}) for the available shortcuts.

## Keyboard Shortcuts Applicable to Chat Bubbles

The Chat supports the following keyboard shortcuts when a chat bubble is focused:

| SHORTCUT | DESCRIPTION |
| -------- | -------- |
| `Up Arrow` | Selects and focuses the previous Chat bubble. |
| `Down Arrow` | Selects and focuses the next Chat bubble. |
| `Home` | Selects and focuses the first Chat bubble. |
| `End` | Selects and focuses the last Chat bubble. |

## Keyboard Shortcuts Applicable to Suggestions and Button Elements

| SHORTCUT | DESCRIPTION |
| -------- | -------- |
| `Enter` or `Space` | Triggers a `click` action on the element. |

## Keyboard Shortcuts Applicable to Message Box

| SHORTCUT | DESCRIPTION |
| -------- | -------- |
| `Enter` | Sends the message. |
| `Shift + Enter` | Start a new line in the textarea message box. |

## See Also

* [Keyboard Navigation by the Chat for jQuery (Demo)](https://demos.telerik.com/kendo-ui/chat/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}#keyboard-navigation)
* [Accessibility in the Chat]({% slug jquery_chat_accessibility %})

