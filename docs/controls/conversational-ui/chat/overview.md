---
title: Overview
page_title: Overview | Kendo UI Chat
description: "Learn how to create a Chat UI, integrate it with different frameworks and configure its templates."
slug: overview_kendoui_chat_widget
position: 1
---

# Chat Overview

The [Kendo UI Chat](http://demos.telerik.com/kendo-ui/chat/index) widget allows the user to participate in chat sessions with other users or with chat bots.

This widget provides rich conversational experience that goes beyond the natural language understanding and personality of your chatbot. This allows developers to easily implement conversational UI in their applications by utilizing AI powered framework that works with natural language processing, by following a predefined logical tree, or just for integrating P2P chat capabilities in their applications.

 **Figure 1: Chat widget structure**

![Template of the MediaPlayer](images/chat-structure-no-toolbar.png)

## Getting Started

### Create the Chat

To create a Chat:

1. Add an empty `div` to the HTML.

1. Provide it with an ID.

1. (Optional) Set the width and height of the desired chat inline or by using CSS.

```html
<div id="chart" style="width: 400px; height: 600px"></div>
```

### Initialize the Chat

To render the Chat:

1. Select the `div` with a jQuery selector.

1. Call the `kendoChat()` function.

1. Configure its implementation for the [`post`](/api/javascript/ui/chat/events/post) event.

```html
<div id="chart" style="width: 400px; height: 600px"></div>
<script>
	var chat = $("#chat").kendoChat({
		post: function (args) {
			// react on a user post action
		}
	}).data("kendoChat");
</script>
```

## Features

The following are the major features of the Kendo UI Chat widget:

* The Chat facilitates the `integration with all the major conversational UI APIs or services` available today – Microsoft Bot, Google’s API.AI, Amazon LEX, and more.

* The Chat offers a variety of [`Chat Items`]({% slug chat_items %}) for better user experience.

* The Chat can use any of the [`Kendo predefined themes`]({% slug sassbasedthemes_kendoui %}).

## See Also

* [Connecting to Chat Bot Services]({% slug connect_to_chatbot_service %})
* [Chat Items]({% slug chat_items %})
* [Chat JavaScript API Reference](/api/javascript/ui/chat)

For runnable examples on Kendo UI Chat, refer to the [Kendo UI Demos site](http://demos.telerik.com/kendo-ui/chat/index).
