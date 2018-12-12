---
title: Connecting to Google DialogFlow
page_title: Connecting to Google DialogFlow | Kendo UI Chat
description: "Configure and connect the Kendo UI Chat widget to the Google DialogFlow."
slug: connect_to_google_dialogflow
position: 6
---

# Connecting to Google DialogFlow

The following example demonstrates how to configure a [Chat `agent` class]({% slug connect_to_chatbot_service %}) that handles the communication between the [Chat](http://demos.telerik.com/kendo-ui/chat/index) for jQuery and the [Google DialogFlow](https://dialogflow.com/).

In this case, the `postMessage` method of the agent class implements the logic that will be executed on user interaction. When the `textRequest()` promise of the DialogFlowClient is resolved, the `onResponse()` method of the agent is executed. It then passes the received data to the `renderMessages()` method that renders the response in the Chat widget.

```dojo
<div id="chat"></div>

<!-- Load Promise Polyfill. Required by the DialogFlow Client API.-->
<script src="https://www.promisejs.org/polyfills/promise-6.1.0.js"></script>

<!-- Load DialogFlow Client API -->
<script src="https://cdn.rawgit.com/dialogflow/dialogflow-javascript-client/50e82e62/target/ApiAi.min.js"></script>

<script>
  $(document).ready(function () {
    // Initialize the Chat widget
    var chat = $("#chat").kendoChat({
      post: function (args) {
        agent.postMessage(args.text);
      }
    }).data("kendoChat");

    // Create the agent instance and pass the Chat widget to it
    var agent = new DialogFlowAgent(chat);
  });
</script>

<script>
  window.DialogFlowAgent = kendo.Class.extend({
    init: function (chat) {
      this.chat = chat;
      this.userInfo = {
        id: "botty",
        iconUrl: "https://demos.telerik.com/kendo-ui/content/chat/InsuranceBot.png",
        name: "Botty McbotFace"
      };

      // Assign the DialogFlow client to a property of the agent
      this.dialogFlowClient = new ApiAi.ApiAiClient({ accessToken: "280344fb165a461a8ccfef7e1bb47e65" });

      // Post a predefined event to the DialogFlow
      // It will return predefined messages to be rendered in the Chat widget
      this.postEvent("Welcome");

      this._timestamp;
    },
    // Post the predefined event and attach the listener for the resolved promise
    postEvent: function (event) {
      this.dialogFlowClient
        .eventRequest(event)
        .then($.proxy(this.onResponse, this));
    },
    // Post a user message to the DialogFlow and attach the listener for the resolved promise
    postMessage: function (text) {
      this.dialogFlowClient
        .textRequest(text)
        .then($.proxy(this.onResponse, this));
    },
    // The promise.then() implementation
    onResponse: function (response) {
      this._timestamp = response.timestamp;

      if (response.result && response.result.fulfillment) {
        var fulfillment = response.result.fulfillment;
        var data = fulfillment.data;

        this.renderMessages(fulfillment.messages);
      }
    },
    // Render the returned messages in the Chat widget
    renderMessages: function (messages) {
      var that = this;

      $(messages).each(function (index, message) {
        switch (message.type) {
          case 0:
            that.chat.renderMessage({
                type: "text",
                text: message.speech,
                timestamp: that._timestamp
            }, that.userInfo);
            break;
          case 2:
            that.renderSuggestedActions(message.replies.map(function (reply) {
                return {
                    title: reply,
                    value: reply
                };
            }));
            break;
          default:
        }
      });
    }
  });
</script>
```

## See Also

* [Chat Overview]({% slug overview_kendoui_chat_widget %})
* [Chat Items]({% slug chat_items %})
* [Connecting to Chat Bot Services]({% slug connect_to_chatbot_service %})
* [Connecting to Microsoft Bot Framework]({% slug connect_to_ms_bot_framework %})
* [Chat JavaScript API Reference](/api/javascript/ui/chat)

For runnable examples on Kendo UI Chat, refer to the [Kendo UI Demos site](http://demos.telerik.com/kendo-ui/chat/index).
