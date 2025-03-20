---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the {{ site.product_short }} Chat by Telerik UI and learn about the component keyboard navigation functionality."
slug: keynav_aspnetcore_chat
position: 2
---

# Keyboard Navigation

The keyboard navigation of the Chat is always available.

For a runnable example, refer to the [demo on using the keyboard navigation of the Chat](https://demos.telerik.com/{{ site.platform }}/chat/keyboard-navigation).  

## Managing the Focus

Focusable elements in the Chat are part of the page tab sequence:

- `k-quick-reply` (if present);
- `k-message-box input`;
- `k-input-suffix button` elements;
- `k-toolbar-box` (if present)&mdash;it implements the keyboard navigation for a ToolBar component.

## Keyboard Shortcuts Applicable to the Message Input

The Chat supports the following keyboard shortcuts when the message input is focused:

| SHORTCUT | DESCRIPTION |
| -------- | -------- |
| `F10` | Opens and focuses the Chat ToolBar (if present). |

## Keyboard Shortcuts Аpplicable to the Buttons

The Chat supports the following keyboard shortcuts when any of the buttons is focused:

| SHORTCUT | DESCRIPTION |
| -------- | -------- |
| `Enter` or `Space` | Triggers a `click` action on the button. |

## See Also

* [Keyboard Navigation by the Chat HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chat/keyboard-navigation)
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})
