---
title: Overview
page_title: jQuery Chat Documentation | Chat Overview
description: "Get started with the jQuery Chat by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_chat_widget
position: 1
---

# Chat Overview

The Chat allows the user to participate in chat sessions with other users or with chat bots.

Chats provide support for default cards and actions, and enable the configuration of custom templates and custom components. They provide rich conversational experience that goes beyond the natural language understanding and personality of the chatbot. These features allow you to implement conversational UI in your applications by utilizing AI-powered frameworks that work with natural language processing either by following a predefined logical tree or for integrating P2P chat capabilities in the applications.

* [Demo page for the Chat](https://demos.telerik.com/kendo-ui/chat/index)

![Structure of the Chat](images/chat-structure-no-toolbar.png)

## Initializing the Chat

To create the Chat:

1. Add an empty `div` to the HTML.
1. Provide it with an ID.
1. (Optional) Set the width and height of the desired chat inline or by using CSS.

```dojo
<div id="chat" style="width: 400px; height: 600px"></div>
```

To initialize the Chat:

1. Select the `div` with a jQuery selector.
1. Call the `kendoChat()` function.
1. Configure its implementation for the [`post`](/api/javascript/ui/chat/events/post) event.

```dojo
<div id="chat" style="width: 400px; height: 600px"></div>
<script>
	var chat = $("#chat").kendoChat({
		post: function (args) {
			// React on a user post action.
		}
	}).data("kendoChat");
</script>
```

## Functionality and Features

* [Items]({% slug chat_items %})
* [Toolbar]({% slug toolbar_for_chat %})
* [Peer-to-Peer Chat with SignalR]({% slug peertopeerp_chat_kendoui %})
* [Chat Bot service integration]({% slug connect_to_chatbot_service %})
* [Microsoft Bot Framework integration]({% slug connect_to_ms_bot_framework %})
* [Google DialogFlow integration]({% slug connect_to_google_dialogflow %})

## See Also

* [Basic Usage of the Chat (Demo)](https://demos.telerik.com/kendo-ui/chat/index)
* [JavaScript API Reference of the Chat](/api/javascript/ui/chat)
