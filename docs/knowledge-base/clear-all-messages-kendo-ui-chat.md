---
title: Clearing All Messages in Kendo UI Chat
description: Learn how to remove all messages from the Chat widget in Kendo UI to allow users to start a fresh conversation.
type: how-to
page_title: How to Reset Chat Messages in Kendo UI Chat Widget
slug: clear-all-messages-kendo-ui-chat
tags: chat, kendo ui, clear messages, reset chat
res_type: kb
ticketid: 1670696
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Chat for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description

In scenarios where you need to clear all messages in the [Chat](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat) widget and allow the user to start a new conversation, for instance, you can remove the content as described below. 

## Solution 

To clear all messages from the Chat widget, you can use one of the following approaches:

1. **Using jQuery to Remove Messages by Class Selector**

   Directly manipulate the DOM to remove all elements with the class `k-message`, which is used for chat messages. 

   ```javascript
   $(".k-message").remove();
   ```

2. **Emptying the Chat View**

Access the chat instance and then empty its list view. This method does not require direct DOM manipulation.

   ```javascript
   $("#chat").data("kendoChat").view.list.empty()
   ```

Both methods effectively clear the chat window, allowing for a fresh start. For a practical implementation, refer to example below:

```dojo
<div id="chat"></div>
    <script>
      $("#chat").kendoChat({
        toolClick: function (ev) {
          if (ev.name === "Clear") {
            $(".k-message").remove();
          }else if(ev.name === "Remove"){
            ev.sender.view.list.empty()
          }
        },
        toolbar: {
          buttons: [
            { name: "Clear", iconClass: "k-icon k-i-apply-format" },
            { name: "Remove", iconClass: "k-icon k-i-trash" }
          ]
        },
        messages: {
          placeholder: "Type here..."
        }
      });

      var chat = $("#chat").data("kendoChat");


      chat.renderMessage({
        type: "text",
        text: "Hello Kendo Chat"
      }, {
        id: kendo.guid(),
        name: "Sample User",
        iconUrl: "https://demos.telerik.com/kendo-ui/content/web/avatar.png"
      });

      chat.renderMessage({
        type: "text",
        text: "Hello!"
      }, chat.getUser());

 </script>
```

## See Also

- [Kendo UI Chat Overview](https://docs.telerik.com/kendo-ui/controls/chat/overview)
- [Kendo UI Chat API](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat/methods)
