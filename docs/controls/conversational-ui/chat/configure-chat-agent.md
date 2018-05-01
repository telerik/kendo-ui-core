---
title: Connect to Chatbot service
page_title: Connect to Chatbot | Kendo UI Chat
description: "Learn how to configure and connect the Kendo UI Chat widget to an existing Bot framework / service of choice."
slug: connect_to_chatbot_service
position: 2
---

# Connect to Any Service

In order to connect the [Kendo UI Chat](http://demos.telerik.com/kendo-ui/chat/index) to any service, one has to utilize the post event of the widget, and its public [API](/api/javascript/ui/chat) to render the responses from the service. To encapsulate the communication with the specific service an `agent` class can be used.

## Configure the Chat Agent

The `agent` class handles the communication with the external Chatbot service. Within the `init` method the connection to the service is established, and the appropriate events are bound, so that the agent can receive the responses.

For the needs of the below example the [Microsoft Bot Framework](https://dev.botframework.com/) is used. You will notice that the `agent` is subscribed to listen for any `activity$` of the remote service. When such is detected, the appropriate method from the Chat public API is invoked to render the data.

To handle user input the [`post`](/api/javascript/ui/chat/events/post) event handler of the Kendo UI Chat widget is implemented, and the arguments are passed to the Chatbot service:

```html
<div id="chat"></div>

<!-- Load Bot Framework Client API -->
<script src="http://unpkg.com/botframework-directlinejs/directLine.js"></script>

<script>
  $(document).ready(function () {
	// Initialize the Chat
    var chat = $("#chat").kendoChat({
      post: function (args) {
        agent.postMessage(args);
      }
    }).data("kendoChat");

	// Create a new agent and pass the Chat widget
    var agent = new DirectLineAgent(chat);
  });
</script>

<script>
  window.DirectLineAgent = kendo.Class.extend({
    init: function (chat) {
      this.chat = chat;
      this.userInfo = {
        id: "botty",
        iconUrl: "../content/chat/avatar.png",
        name: "Botty McbotFace"
      };

      // Assign here the Bot framework agent
      // The below example uses the Microsoft's Bot Framework
      this.agent = new DirectLine.DirectLine({ secret: "Y_ly-If6haE.cwA.PQE.ZwOOsq4MlHcD3_YLFI-t9oW6L6DXMMBoi67LBz9WaWA" });

      // The below code would depend on the Bot framework of choice
      // In this case, the agent is subscribed to listen for any activity of the service
      // Its onResponse method would be executed on any activity detected
      this.agent.activity$.subscribe($.proxy(this.onResponse, this));
    },
	// The implementation of the below methods would depend on the Bot framework of choice
    // This example uses the Microsoft's Bot Framework API to demonstrate a possible implementation
    postMessage: function (args) {
      this.agent.postActivity(args)
        .subscribe();
    },
    onResponse: function (response) {
      if (response.from.id === this.chat.getUser().id) {
        return;
      }

      response.from.iconUrl = this.userInfo.iconUrl;

      this.renderMessage(response);
      this.renderAttachments(response);
      this.renderSuggestedActions(response.suggestedActions);
    },
    renderMessage: function (message) {
      if (message.text || message.type == "typing") {
        this.chat.renderMessage(message, message.from);
      }
    },
    renderAttachments: function (data) {
      this.chat.renderAttachments(data, data.from);
    },
    renderSuggestedActions: function (suggestedActions) {
      var actions = [];

      if (suggestedActions && suggestedActions.actions) {
        actions = suggestedActions.actions;
      }

      this.chat.renderSuggestedActions(actions);
    }
  });
</script>
```

## See Also

* [Chat Overview]({% slug overview_kendoui_chat_widget %})
* [Chat JavaScript API Reference](/api/javascript/ui/chat)

For runnable examples on Kendo UI Chat, refer to the [Kendo UI Demos site](http://demos.telerik.com/kendo-ui/chat/index).
