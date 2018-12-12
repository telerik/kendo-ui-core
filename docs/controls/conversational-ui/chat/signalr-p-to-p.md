---
title: Peer-to-Peer Chat with SignalR
page_title: Peer-to-Peer Chat with SignalR | Kendo UI Chat
description: "Learn how to create a peer-to-peer Chat UI with ASP.NET Core SignalR."
slug: signalr-p-to-p
position: 7
---

# Peer-to-Peer Chat with SignalR

This article demonstrates how to configure a Kendo UI Chat widget and a [.Net Core SignalR](https://docs.microsoft.com/en-us/aspnet/signalr/) service to create a Peer-to-Peer Chat application.

## Implementing the SignalR Server Hub

This section explains how to implement the SignalR Chat Hub server.

### Initializing the Chat

Initialize the Chat widget and implement the handlers for its [`post`](/api/javascript/ui/chat/events/post) and [`typingStart`](/api/javascript/ui/chat/events/typingstart) events.

```JavaScript
var chat = $("#chat").kendoChat({
    // Each instance of the app will generate a unique username.
    // In this way, the SignalR Hub "knows" who is the user that sends the message
    // and who are the clients that have to receive that message.
    user: {
        name: kendo.guid(),
        iconUrl: "http://demos.telerik.com/kendo-ui/content/chat/avatar.png"
    },
    // This will notify the SignallR Hub that the current client is typing.
    // The Hub, in turn, will notify all the other clients
    // that the user has started typing.
    typingStart: function() {
        chatHub.invoke("sendTyping", chat.getUser());
    },
    // The post handler will send the user data and the typed text to the SignalR Hub.
    // The Hub will then forward that info to the other clients.
    post: function(args) {
        chatHub.invoke("send", chat.getUser(), args.text);
    }
}).data("kendoChat");
```

### Configuring the SignalR Client Hub Proxy

1. Get the SignalR client script from NPM.

    ```sh
    npm install @aspnet/signalr
    ```

1. Include the SignalR script on the HTML page.

    ```dojo
    <script src="@aspnet/signalr/dist/browser/signalr.min.js"></script>
    ```

1. Initialize the SignalR Hub proxy.

    ```js
    // Point to the Hub remote endpoint
    window.chatHub = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5000/chat')
        .build();
    ```

1. Start the Hub proxy and configure it to detect errors.

    ```js
    chatHub.start()
        .catch(function(err) {
            console.error(err.toString());
        });
    ```

1. Attach event handlers for the respective remote hub actions.

    ```js
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
    ```

## Implementing the SignalR Server Hub

This section explains how to implement the SignalR Chat Hub server.

### Setting Up the Project

1. Create a new ASP.NET Core Empty Web Application.

    ```sh
    dotnet new web
    ```

1. Add the `AspNetCore.App` package which includes the SignalR to the application.

    ```sh
    dotnet add package Microsoft.AspNetCore.App
    ```

1. Run the application to test whether it is properly built.

    ```sh
    dotnet run
    ```

### Configuring the SignalR Hub

This section demonstrates how to configure and implement the SignaR Hub.

1. Implement `Startup.cs`.

    ```cs
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.DependencyInjection;

    namespace CoreSignalR
    {
        public class Startup
        {
            public void ConfigureServices(IServiceCollection services)
            {
                // Configure CORS to allow requests from other domains
                services.AddCors(options => options.AddPolicy("AllowCors",
                    builder =>
                    {
                        builder
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowAnyOrigin()
                            .AllowCredentials();
                    })
                );

                // Add the SignalR service
                services.AddSignalR();
            }

            public void Configure(IApplicationBuilder app, IHostingEnvironment env)
            {
                // Use the CORS configuration
                app.UseCors("AllowCors");

                // Point to the route that would return the SignalR Hub
                app.UseSignalR(routes =>
                {
                    routes.MapHub<ChatHub>("/chat");
                });
            }
        }
    }

    ```

1. Add a `ChatHub` class to the project.

    ```cs
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

1. Start the Chat SignalR Hub. The hub is now accessible on the `http://localhost:5000/chat` URL.

    ```sh
    dotnet run
    ```

## See Also

* [Chat Overview]({% slug overview_kendoui_chat_widget %})
* [Chat Items]({% slug chat_items %})
* [Connecting to Chat Bot Services]({% slug connect_to_chatbot_service %})
* [Chat JavaScript API Reference](/api/javascript/ui/chat)

For runnable examples on Kendo UI Chat, refer to the [Kendo UI Demos site](http://demos.telerik.com/kendo-ui/chat/index).
