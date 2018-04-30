---
title: Configure Chat Agent
page_title: Configure Agent | Kendo UI Chat
description: "Learn how to configure and agent for the Chat widget, which will communicate with the Bot framework / service of choice."
slug: configure_chat_agent
position: 2
---

# Configure Chat Agent

By configuring an `agent` for the [Kendo UI Chat](http://demos.telerik.com/kendo-ui/chat/index), the logic, that communicates with the Bot framework / service can be encapsulated in a single Class.

## Configure the Chat Agent

Each Kendo Chat can use an `agent` that would communicate with the Bot framework of choice. The `agent` class should implement its `init()` method, where the connection to the Bot framework should be established. Depending on the API of the framework chosen, the `agent` should be configured to listen for responses from the service.

For the needs of the below example the [Microsoft Bot Framework](https://dev.botframework.com/) is used. You will notice, that the `agent` is subscribed to listen for any `activity$` of the remote service. When such is detected, the `onResponse` method of the `agent` gets executed. Then the `renderMessage()`, `renderAttachments()` and `renderSuggestedActions()` methods are executed and depending on the response content the applicable data is being presented in the Chat View.

The `postMessage()` method is also implemented. It is used by the Chat widget to react on the [`post`](/api/javascript/ui/chat/events/post) event, which signifies a user interaction:

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
