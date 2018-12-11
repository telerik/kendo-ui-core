---
title: Peer-to-Peer Chat with SignalR
page_title: Peer-to-Peer Chat with SignalR | Kendo UI Chat HtmlHelper for ASP.NET Core
description: "Learn how to create a peer-to-peer Kendo UI Chat with ASP.NET Core SignalR."
slug: htmlhelpers_chat_aspnetcore_signalr
position: 2
---

# Peer-to-Peer Chat with SignalR

This article demonstrates how to configure a Telerik UI for ASP.NET Core Chat HTML helper and a [.Net Core SignalR](https://docs.microsoft.com/en-us/aspnet/signalr/) service to create a Peer-to-Peer Chat application.

## Implementing the SignalR Server Hub

This section explains how to implement the SignalR Chat Hub server.

### Creating the New Application

Depending on your preferred editor, use any of the following approaches:

* [Create a new Telerik UI for ASP.NET Core application form the Standard template]({% slug newprojectwizards_visualstudio_aspnetcore %})
* [Create a new .Net Core application in Visual Studio and include the Telerik UI for ASP.NET Core package]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Create a new .Net Core application with the CLI and include the Telerik UI for ASP.NET Core package]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})

### Configuring the SignalR Hub

1. Modify `Startup.cs`. The new lines have to be added to the bottom of the `ConfigureServices` and `Configure` methods.

    ```
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.DependencyInjection;

    namespace CoreSignalR
    {
        public class Startup
        {
            public void ConfigureServices(IServiceCollection services)
            {
                ...

                // Add the SignalR service
                services.AddSignalR();
            }

            public void Configure(IApplicationBuilder app, IHostingEnvironment env)
            {
                ...

                // Point to the route that will return the SignalR Hub
                app.UseSignalR(routes =>
                {
                    routes.MapHub<ChatHub>("/chat");
                });
            }
        }
    }
    ```

    > **Important**
    >
    > If in the `app.UseSignalR` line the editor throws an `IApplicationBuilder does not contain definition for UseSignalR` error, add the Microsoft.AspNetCore.SignalR v.1.0.0 package to the project.

1. Add a `ChatHub` class to the project.

    ```
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;

    namespace CoreSignalR
    {
        // The Hub class should inherit from the Microsoft.AspNet.SignalR.Hub
        public class ChatHub : Hub
        {
            public async Task Send(object sender, string message)
            {
                // Broadcast the message to all clients except the sender
                await Clients.Others.SendAsync("broadcastMessage", sender, message);
            }

            public async Task SendTyping(object sender)
            {
                // Broadcast the typing notification to all clients except the sender
                await Clients.Others.SendAsync("typing", sender);
            }
        }
    }
    ```

## Implementing the Application Client

This section explains how to implement the P2P Chat application client.

### Initializing the Chat

In the `Views\Home\Index.cshtml` fie, initialize the Chat and implement handlers for its [`post`](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat/events/post) and [`typingStart`](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat/events/typingstart) events.

```
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
```

### Configuring the SignalR Client Hub Proxy

1. Get the SignalR client script from NPM.

    ```
    npm install @aspnet/signalr
    ```

1. Copy the `@aspnet/signalr` folder from the `node_modules` directory to the `wwwroot/lib` folder of the Core project.
1. Include the SignalR script on the HTML page.

    ```
    <script src="lib/signalr/dist/browser/signalr.min.js"></script>
    ```

1. Initialize the SignalR Hub proxy.

    ```
    // Point to the Hub remote endpoint
    window.chatHub = new signalR.HubConnectionBuilder()
        .withUrl('/chat')
        .build();
    ```

1. Start the Hub proxy and configure it to detect errors.

    ```
    chatHub.start()
        .catch(function(err) {
            console.error(err.toString());
        });
    ```

1. Attach the event handlers for the respective remote hub actions.

    ```
    $(document).ready(function() {
        window.chat = $("#chat").getKendoChat();

        chatHub.on('broadcastMessage', function(sender, message) {
            var message = {
                type: 'text',
                text: message
            };

            // Render the received message in the Chat
            chat.renderMessage(message, sender);
        });

        chatHub.on('typing', function(sender) {
            // Display typing notification in the Chat
            chat.renderMessage({ type: 'typing' }, sender);
        });
    });
    ```

1. Start the Peer-to-Peer Chat Application.

## See Also

* [Overview of the Chat TagHelper for .Net Core]({% slug taghelpers_chat_aspnetcore %})
* [Overview of the Chat HtmlHelper for .Net Core]({% slug htmlhelpers_chat_aspnetcore %})
* [Overview of the Kendo UI Chat Widget](http://docs.telerik.com/kendo-ui/controls/conversational-ui/chat/overview)
* [JavaScript API Reference of the Chat](http://docs.telerik.com/kendo-ui/api/javascript/ui/chat)
* [Chat HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/chat/overview)
