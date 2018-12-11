---
title: Peer-to-Peer Chat with SignalR
page_title: Peer-to-Peer Chat with SignalR | Kendo UI Chat HtmlHelper for ASP.NET MVC
description: "Learn how to create a peer-to-peer Knedo UI Chat UI with ASP.NET MVC and SignalR 2."
slug: signalr_chathelper_aspnetmvc
position: 2
---

# Peer-to-Peer Chat with SignalR

This article demonstrates how to configure a Telerik UI for ASP.NET MVC Chat and a [SignalR 2](https://www.asp.net/signalr) service to create a Peer-to-Peer Chat application.

## Implementing the SignalR Server Hub

This section explains how to implement the SignalR Chat Hub server.

### Creating the New Application

Depending on your preferred editor, use either of the following approaches:

* [Create a new Telerik UI for ASP.NET MVC application form the Standard template]({% slug newprojectwizards_visualstudio_aspnetmvc %}), or
* [Create a new ASP.NET MVC application in Visual Studio and include the Telerik UI for ASP.NET MVC to the project]({% slug aspnetmvc5_aspnetmvc %})

#### Configuring the SignalR Hub

1. Add the `Microsoft.AspNet.SignalR` package to the application.

    ###### Example

        install-package Microsoft.AspNet.SignalR

1. Create a `Startup.cs` file to configure the hub connection.

    ###### Example

        using Microsoft.Owin;
        using Owin;

        [assembly: OwinStartup(typeof(SignalR.Startup))]

        namespace SignalR
        {
            public class Startup
            {
                public void Configuration(IAppBuilder app)
                {
                    // Map the SignalR service
                    app.MapSignalR();
                }
            }
        }

1. Create a `Hubs` folder and create a `ChatHub` class in it.

    ###### Example

        using Microsoft.AspNet.SignalR;

        namespace SignalR.Hubs
        {
            // The Hub class should inherit from the Microsoft.AspNet.SignalR.Hub
            public class ChatHub : Hub
            {
                public void Send(object sender, string message)
                {
                    // Broadcast the message to all clients except the sender
                    Clients.Others.broadcastMessage(sender, message);
                }
                public void SendTyping(object sender)
                {
                    // Broadcast the typing notification to all clients except the sender
                    Clients.Others.typing(sender);
                }
            }
        }

## Implementing the Application Client

This section explains how to implement the P2P Chat application client.

### Initializing the Chat

In the `Views\Home\Index.cshtml` fie, initialize the Chat and implement handlers for its [`post`](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat/events/post) and [`typingStart`](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat/events/typingstart) events.

###### Example

    @{
        var name = Guid.NewGuid().ToString();
    }

    @(Html.Kendo().Chat()
        .Name("chat")
        .User(user => user
            // Each instance of the app will generate a unique username.
            // In this way, the SignalR Hub "knows" who is the user that sends the message
            // and who are the clients that have to receive that message.
            .Name(@name)
            .IconUrl("http://demos.telerik.com/kendo-ui/content/chat/avatar.png")
        )
        .Events(events => events
            .TypingStart("onTypingStart")
            .Post("onPost")
        )
    )

    <script>
        // The `typingStart` will notify the SignallR Hub that the current client is typing.
        // The Hub, in turn, will notify all the other clients that the user has started typing.
        function onTypingStart(e) {
            chatHub.invoke("sendTyping", chat.getUser());
        }

        // The `post` handler will send the user data and the typed text to the SignalR Hub.
        // The Hub will then forward that info to the other clients.
        function onPost(args) {
            chatHub.invoke("send", chat.getUser(), args.text);
        }
    </script>

### Configuring the SignalR Client Hub Proxy

1. Include the SignalR 2 script in the page. It is distributed with the SignalR NuGet package.

    ###### Example

        <script src="~/Scripts/jquery.signalR-2.3.0.min.js"></script>

1. Reference the auto-generated SignalR hub script for the application.

    ###### Example

        <script src="~/signalr/hubs"></script>

1. Implement the initialization logic for the SignalR Hub proxy.

    ###### Example

        function startHub(startCallback) {
            var hub = $.connection.chatHub;

            $.connection.hub.start().done(function () {
                startCallback(hub)
            });

            return hub;
        }

1. In the `$(document).ready()` handler start the Hub proxy and attach event handlers for the respective remote hub actions:

    ###### Example

        $(document).ready(function () {
            window.chat = $('#chat').getKendoChat();
            window.chatHub = startHub(function (hub) { });

            chatHub.on("broadcastMessage", function (sender, message) {
                var message = {
                    type: "text",
                    text: message
                };

                // Render the received message in the Chat
                chat.renderMessage(message, sender);
            });

            chatHub.on("typing", function (sender) {
                // Display the typing notification in the Chat
                chat.renderMessage({ type: "typing" }, sender);
            });
        });

1. Start the Peer-to-Peer Chat Application.

## See Also

* [Overview of the Chat HtmlHelper]({% slug overview_chathelper_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference: ChatBuilder](/api/Kendo.Mvc.UI.Fluent/ChatBuilder)
* [Overview of the Kendo UI Chat Widget](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview)
