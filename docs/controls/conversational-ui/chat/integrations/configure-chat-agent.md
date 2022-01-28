---
title: Chat Bot Services
page_title: jQuery Chat Documentation | Chat Bot Services
description: "Get started with the jQuery Chat by Kendo UI and configure and connect the Kendo UI Chat widget to an existing Bot framework / service of choice."
previous_url: /controls/conversational-ui/chat/configure-chat-agent
slug: connect_to_chatbot_service
---

# Chat Bot Services

The [Chat](https://demos.telerik.com/kendo-ui/chat/index) allows you to connect to any remote service that can return content to the widget.

## Communicating with the Remote Service

To connect the Chat to and render the responses from any service, utilize the `post` event of the widget and its public [API](/api/javascript/ui/chat). The `post` event allows you to react on user interaction. Its event arguments object contains all the information about the typed message or the taken action, and the user data. This approach allows you to send all the data to the remote Chat Bot service of your choice. Then, depending on the service architecture, the implementation will react on the response from the remote server and display it appropriately in the Chat.

An example of such communication is to send an AJAX request to a server endpoint and display the returned data in the Chat widget.

```dojo
<div id="chat"></div>

<script>
  $(document).ready(function () {
    // The post event handler.
    function onPost(args) {
      var chat = args.sender;

      // Initiate an AJAX request and pass the args.text value.
      $.ajax("https://demos.telerik.com/kendo-ui/service/Products/Read", {
        dataType: "jsonp",
        data: {
          skip: args.text,
          take: 1
        }
      }).then(function(response) {
        // Retrieve the needed data from the received response.
        var userName = response[0].ProductName;
        var text = "Response from " + userName;

        // Render a the returned text in the Chat.
        // Pass also the user (remote) info as a second parameter.
        chat.renderMessage({
          type: "text",
          text:  text,
          timestamp: new Date()
        }, {
          name: userName
        });
      }).fail(function(error) {
        // Handle failed AJAX.
      })
    }

    // Initialize the Chat widget.
    var chat = $("#chat").kendoChat({
      post: onPost
    }).data("kendoChat");

    // Initially render a hint message to the user.
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

## Encapsulating the Communication Logic

You can achieve the same result by encapsulating the communication logic in an `agent` class. The `agent` class will handle the communication with the external Chat Bot service.

```dojo
<div id="chat"></div>

<script>
  $(document).ready(function () {
    // Initialize the Chat
    var chat = $("#chat").kendoChat({
      post: function (args) {
        agent.postMessage(args);
      }
    }).data("kendoChat");

    // Create a new agent and pass the Chat widget.
    var agent = new ChatAgent(chat);

    // Initially render a hint message to the user.
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
    // Initialize the ChatAgent object.
    init: function (chat) {
      this.chat = chat;
    },
    // Implement the postMessage logic.
    postMessage: function (args) {
      var chat = this.chat;

      // Initiate an AJAX request and pass the args.text value.
      $.ajax("https://demos.telerik.com/kendo-ui/service/Products/Read", {
        dataType: "jsonp",
        data: {
          skip: args.text,
          take: 1
        }
      }).then(function(response) {
        // Retrieve the needed data from the received response.
        var userName = response[0].ProductName;
        var text = "Response from " + userName;

        // Render a the returned text in the Chat.
        // Pass also the user (remote) information as a second parameter.
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

* [Basic Usage of the Chat (Demo)](https://demos.telerik.com/kendo-ui/chat/index)
* [JavaScript API Reference of the Chat](/api/javascript/ui/chat)
