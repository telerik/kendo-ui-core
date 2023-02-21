---
title: Peer-to-Peer Chat
page_title: jQuery Chat Documentation - Peer-to-Peer Chat
description: "Get started with the jQuery Chat by Kendo UI and learn how to create a peer-to-peer Chat UI with ASP.NET Core SignalR."
previous_url: /controls/conversational-ui/chat/signalr-p-to-p
slug: peertopeerp_chat_kendoui
---

# Peer-to-Peer Chat

You can configure a Kendo UI Chat widget and a [.Net Core SignalR](https://docs.microsoft.com/en-us/aspnet/signalr/) service to create a Peer-to-Peer Chat application.

To create the Peer-to-Peer Chat, first you have to implement the SignalR Hub, and, then, to implement the application client by following the steps below:

1. [Set up the project](#setting-up-the-project)
1. [Initialize the Chat](#initializing-the-chat)
1. [Configure the SignalR Hub](#configuring-the-signalr-hub)

## Setting Up the Project

1. Create a new ASP.NET Core Web App project.

1. Add a `Hubs` folder with a `ChatHub` class to the project:

    ```cs
    using Microsoft.AspNetCore.SignalR;

    namespace SignalRChat.Hubs
    {
        public class ChatHub : Hub
        {
            public async Task Send(object sender, string message)
            {
                // Broadcast the message to all clients except the sender.
                await Clients.Others.SendAsync("broadcastMessage", sender, message);
            }

            public async Task SendTyping(object sender)
            {
                // Broadcast the typing notification to all clients except the sender.
                await Clients.Others.SendAsync("typing", sender);
            }
        }
    }

    ```
1. In the `Index.cshtml` Razor Page, add a `div` from which the chat will be created:

```
    @page
    @{
        ViewData["Title"] = "Kendo UI Chat Peer-to-peer example";
        Layout = "_Layout";
    }

    <div id="chat"></div>


    <script src="~/js/chat.js"></script>
```

1. On the `_Layout.cshtml` page and in the `<head>` tag, add a reference to Kendo UI and SignalR:

```
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2023.1.117/styles/kendo.default-ocean-blue.min.css">

    <script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2023.1.117/js/angular.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2023.1.117/js/jszip.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2023.1.117/js/kendo.all.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/7.0.2/signalr.min.js"></script>
```

## Initializing the Chat

In the `wwwroot/js` folder, create a `chat.js` file where the Chat will be initialized.

```js
    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

    connection.start().then(function () {

    }).catch(function (err) {
        return console.error(err.toString());
    });

    var chat = $("#chat").kendoChat({
        // Each instance of the application will generate a unique username.
        // In this way, the SignalR Hub "knows" who is the user that sends the message
        // and who are the clients that have to receive that message.
        user: {
            name: kendo.guid(),
            iconUrl: "https://demos.telerik.com/kendo-ui/content/chat/avatar.png"
        },
        // This will notify the SignallR Hub that the current client is typing.
        // The Hub, in turn, will notify all the other clients
        // that the user has started typing.
        typingStart: function () {
            connection.invoke("sendTyping", chat.getUser());
        },
        // The post handler will send the user data and the typed text to the SignalR Hub.
        // The Hub will then forward that info to the other clients.
        post: function (args) {
            connection.invoke("send", chat.getUser(), args.text);
        }
    }).data("kendoChat");


    connection.on('broadcastMessage', function (sender, message) {
        var message = {
            type: 'text',
            text: message
        };

        // Render the received message in the Chat.
        chat.renderMessage(message, sender);
    });

    connection.on('typing', function (sender) {
        // Display the typing notification in the Chat.
        chat.renderMessage({ type: 'typing' }, sender);
    });
```

You are now ready to run the project! Open the Chat in two separate tabs and start typing.

To review the complete project, go to the [Kendo UI examples repository](https://github.com/telerik/kendo-examples-asp-net).


## See Also

* [Basic Usage of the Chat (Demo)](https://demos.telerik.com/kendo-ui/chat/index)
* [JavaScript API Reference of the Chat](/api/javascript/ui/chat)
