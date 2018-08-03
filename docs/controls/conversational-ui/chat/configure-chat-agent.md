---
title: Connecting to Chat Bot Services
page_title: Connecting to Chat Bot Services | Kendo UI Chat
description: "Configure and connect the Kendo UI Chat widget to an existing Bot framework / service of choice."
slug: connect_to_chatbot_service
position: 3
---

# Connecting to Chat Bot Services

The [Chat](http://demos.telerik.com/kendo-ui/chat/index) allows you to connect to any remote service, that would return content to the widget. This article describes the basic set-up of the Chat, that would allow you to handle the service communication.

## Basic Communication with the Remote Service

To connect the Chat to and render the responses from any service, utilize the `post` event of the widget and its public [API](/api/javascript/ui/chat). The `post` event allows you to react on user interaction. Its event arguments object contains all the information about the message typed, or the action undertaken, and the user data. That allows you to send all that data to the remote Chat Bot service of choice. Then, depending on the service architecture, the implementation should react on the response from the remote and display it appropriately in the Chat.

The simplest example of such communication would be to send an AJAX request to a server endpoint and display the returned data in the Chat widget:

```html
<div id="chat"></div>

<script>
  $(document).ready(function () {
    // The post event handler
    function onPost(args) {
      var chat = args.sender;

      // Initiate an AJAX request and pass the args.text value
      $.ajax("https://demos.telerik.com/kendo-ui/service/Products/Read", {
        dataType: "jsonp",
        data: {
          skip: args.text,
          take: 1
        }
      }).then(function(response) {
        // Retrieve the data needed from the response received
        var userName = response[0].ProductName;
        var text = "Response from " + userName;

        // Render a the returned text in the Chat
        // Pass also the user (remote) info as a second parameter
        chat.renderMessage({
          type: "text",
          text:  text,
          timestamp: new Date()
        }, {
          name: userName
        });
      }).fail(function(error) {
        // Handle failed AJAX
      })
    }

    // Initialize the Chat widget
    var chat = $("#chat").kendoChat({
      post: onPost
    }).data("kendoChat");

    // Initially render a hint message to the user
    chat.renderMessage({
      type: "text",
      text:  "Type a number from 1 to 70",
      timestamp: new Date()
    }, {
      name: "Botyo"
    });
  });
</script>
```

## Encapsulate the Communication Logic in a Chat Agent Class

The same could also be achieved by encapsulating the communication logic in an `agent` class. The `agent` class would handle the communication with the external Chat Bot service:

```html
<div id="chat"></div>

<script>
  $(document).ready(function () {
    // Initialize the Chat
    var chat = $("#chat").kendoChat({
      post: function (args) {
        agent.postMessage(args);
      }
    }).data("kendoChat");

    // Create a new agent and pass the Chat widget
    var agent = new ChatAgent(chat);

    // Initially render a hint message to the user
    agent.chat.renderMessage({
      type: "text",
      text:  "Type a number from 1 to 70",
      timestamp: new Date()
    }, {
      name: "Botyo"
    });
  });
</script>

<script>
  window.ChatAgent = kendo.Class.extend({
    // Initialize the ChatAgent object
    init: function (chat) {
      this.chat = chat;
    },
    // Implement the postMessage logic
    postMessage: function (args) {
      var chat = this.chat;

      // Initiate an AJAX request and pass the args.text value
      $.ajax("https://demos.telerik.com/kendo-ui/service/Products/Read", {
        dataType: "jsonp",
        data: {
          skip: args.text,
          take: 1
        }
      }).then(function(response) {
        // Retrieve the data needed from the response received
        var userName = response[0].ProductName;
        var text = "Response from " + userName;

        // Render a the returned text in the Chat
        // Pass also the user (remote) info as a second parameter
        chat.renderMessage({
          type: "text",
          text:  text,
          timestamp: new Date()
        }, {
          name: userName
        });
      }).fail(function(error) {
        // Handle failed AJAX
      })
    }
  });
</script>
```

## See Also

* [Chat Overview]({% slug overview_kendoui_chat_widget %})
* [Chat Items]({% slug chat_items %})
* [Connecting to Microsoft Bot Framework]({% slug connect_to_ms_bot_framework %})
* [Connecting to Google DialogFlow]({% slug connect_to_google_dialogflow %})
* [Chat JavaScript API Reference](/api/javascript/ui/chat)

For runnable examples on Kendo UI Chat, refer to the [Kendo UI Demos site](http://demos.telerik.com/kendo-ui/chat/index).
