---
title: Microsoft Bot Framework
page_title: jQuery Chat Documentation | Microsoft Bot Framework
description: "Get started with the jQuery Chat by Kendo UI and configure and connect the Kendo UI Chat widget to the Microsoft Bot Framework."
previous_url: /controls/conversational-ui/chat/connect-to-ms-bot-framework
slug: connect_to_ms_bot_framework
---

# Microsoft Bot Framework

You can configure a [Chat `agent` class]({% slug connect_to_chatbot_service %}) that handles the communication between the [Chat](https://demos.telerik.com/kendo-ui/chat/index) widget and the [Microsoft Bot Framework](https://dev.botframework.com/).

In this case, the establishment of a connection to the service and the binding of the appropriate events are done within the `init` method. The `agent` is subscribed to listen for any `activity$` of the remote service. When an activity is detected, the appropriate method from the Chat public API is invoked to render the data. To handle the user input, the example implements the [`post`](/api/javascript/ui/chat/events/post) event handler of the Chat and the arguments are passed to the Chat Bot service.

```dojo
<div id="chat"></div>

<!-- Load Bot Framework Client API -->
<script src="https://unpkg.com/botframework-directlinejs/directLine.js"></script>

<script>
  $(document).ready(function () {
	// Initialize the Chat.
    var chat = $("#chat").kendoChat({
      post: function (args) {
        agent.postMessage(args);
      }
    }).data("kendoChat");

	// Create a new agent and pass the Chat widget.
    var agent = new DirectLineAgent(chat, "Y_ly-If6haE.cwA.PQE.ZwOOsq4MlHcD3_YLFI-t9oW6L6DXMMBoi67LBz9WaWA");
  });
</script>

<script>
  window.DirectLineAgent = kendo.Class.extend({
    init: function (chat, secret) {
      this.chat = chat;
      this.iconUrl = "https://demos.telerik.com/kendo-ui/content/chat/avatar.png";

      // Assign here the Bot framework agent.
      // The following example uses the Microsoft Bot Framework.
      this.agent = new DirectLine.DirectLine({ secret: secret });

      // The following code will depend on the Bot framework of choice.
      // In this case, the agent is subscribed to listen for any activity of the service.
      // Its onResponse method will be executed on any detected activity.
      this.agent.activity$.subscribe($.proxy(this.onResponse, this));
    },
	  // The implementation of the following methods will depend on the Bot framework of choice.
    // This example uses the Microsoft Bot Framework API to demonstrate a possible implementation.
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

* [Basic Usage of the Chat (Demo)](https://demos.telerik.com/kendo-ui/chat/index)
* [JavaScript API Reference of the Chat](/api/javascript/ui/chat)
