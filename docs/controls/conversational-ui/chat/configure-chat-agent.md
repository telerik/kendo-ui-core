---
title: Connecting to Chat Bot Services
page_title: Connecting to Chat Bot Services | Kendo UI Chat
description: "Configure and connect the Kendo UI Chat widget to an existing Bot framework / service of choice."
slug: connect_to_chatbot_service
position: 2
---

# Connecting to Chat Bot Services

To connect the [Chat](http://demos.telerik.com/kendo-ui/chat/index) to any service and render the responses from the service, utilize the `post` event of the widget and its public [API](/api/javascript/ui/chat).


## Configure the Chat Agent

To encapsulate the communication with the specific service, use an `agent` class. The `agent` class handles the communication with the external Chat Bot service. The establishment of the connection to the service and the binding of the appropriate events are done within the `init` method. In this way, the agent is able to receive the responses.

The following example uses the [Microsoft Bot Framework](https://dev.botframework.com/). The `agent` is subscribed to listen for any `activity$` of the remote service. When an activity is detected, the appropriate method from the Chat public API is invoked to render the data. To handle the user input, the example implements the [`post`](/api/javascript/ui/chat/events/post) event handler of the Chat and the arguments are passed to the Chat Bot service.

```html
<div id="chat"></div>

<!-- Load Bot Framework Client API -->
<script src="https://unpkg.com/botframework-directlinejs/directLine.js"></script>

<script>
  $(document).ready(function () {
	// Initialize the Chat
    var chat = $("#chat").kendoChat({
      post: function (args) {
        agent.postMessage(args);
      }
    }).data("kendoChat");

	// Create a new agent and pass the Chat widget
    var agent = new DirectLineAgent(chat, "Y_ly-If6haE.cwA.PQE.ZwOOsq4MlHcD3_YLFI-t9oW6L6DXMMBoi67LBz9WaWA");
  });
</script>

<script>
  window.DirectLineAgent = kendo.Class.extend({
    init: function (chat, secret) {
      this.chat = chat;
      this.iconUrl = "https://demos.telerik.com/kendo-ui/content/chat/avatar.png";

      // Assign here the Bot framework agent
      // The below example uses the Microsoft's Bot Framework
      this.agent = new DirectLine.DirectLine({ secret: secret });

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

      response.from.iconUrl = this.iconUrl;

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
* [Chat Items]({% slug chat_items %})
* [Chat JavaScript API Reference](/api/javascript/ui/chat)

For runnable examples on Kendo UI Chat, refer to the [Kendo UI Demos site](http://demos.telerik.com/kendo-ui/chat/index).
