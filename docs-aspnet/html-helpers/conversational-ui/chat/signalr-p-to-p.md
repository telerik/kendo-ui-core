---
title: Peer-to-Peer Chat
page_title: Peer-to-Peer Chat with SignalR
description: "Learn how to create a peer-to-peer Telerik UI Chat with {{ site.framework }} SignalR."
previous_url: /helpers/conversational-ui/chat/signalr-p-to-p
slug: htmlhelpers_chat_aspnetcore_signalr
position: 2
---

# Peer-to-Peer Chat

You can configure a Telerik UI Chat HtmlHelper for {{ site.framework }} and a {% if site.core %}[.Net Core SignalR](https://docs.microsoft.com/en-us/aspnet/signalr/){% else %}[SignalR 2](https://www.asp.net/signalr){% endif %} service to create a Peer-to-Peer Chat application.

To create the Peer-to-Peer Chat you have to implement the SignalR Hub server and, then, to implement the application client:

1. [Create the new application](#creating-the-new-application)
1. [Configure the SignalR Hub server](#configuring-the-signalr-hub-server)
1. [Initialize the Chat](#initializing-the-chat)
1. [Configure the SignalR client Hub proxy](#configuring-the-signalr-client-hub-proxy)

## Creating the New Application

Depending on your preferred editor, use any of the following approaches:

{% if site.core %}

* [Create a new {{ site.product }} application from the Standard template]({% slug newprojectwizards_visualstudio_aspnetcore %})
* [Create a new .Net Core application in Visual Studio and include the {{ site.product }} package]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Create a new .Net Core application with the CLI and include the {{ site.product }} package]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})

{% else %}

* [Create a new Telerik UI for ASP.NET MVC application from the Standard template]({% slug newprojectwizards_visualstudio_aspnetmvc %})
* [Create a new ASP.NET MVC application in Visual Studio and include the Telerik UI for ASP.NET MVC package]({% slug gettingstarted_aspnetmvc %})

{% endif %}

## Configuring the SignalR Hub Server

{% if site.core %}

1. Modify `Startup.cs`. The new lines have to be added to the bottom of the `ConfigureServices` and `Configure` methods.

    > If in the `app.UseSignalR` line the editor throws an `IApplicationBuilder does not contain definition for UseSignalR` error, add the Microsoft.AspNetCore.SignalR v.1.0.0 package to the project.

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

                // Add the SignalR service.
                services.AddSignalR();
            }

            public void Configure(IApplicationBuilder app, IHostingEnvironment env)
            {
                ...

                // Point to the route that will return the SignalR Hub.
                app.UseSignalR(routes =>
                {
                    routes.MapHub<ChatHub>("/chat");
                });
            }
        }
    }
    ```

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
{% else %}

1. Add the `Microsoft.AspNet.SignalR` package to the application.

        install-package Microsoft.AspNet.SignalR

1. Create a `Startup.cs` file to configure the hub connection.

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

        using Microsoft.AspNet.SignalR;

        namespace SignalR.Hubs
        {
            // The Hub class has to inherit from the Microsoft.AspNet.SignalR.Hub.
            public class ChatHub : Hub
            {
                public void Send(object sender, string message)
                {
                    // Broadcast the message to all clients except the sender.
                    Clients.Others.broadcastMessage(sender, message);
                }
                public void SendTyping(object sender)
                {
                    // Broadcast the typing notification to all clients except the sender.
                    Clients.Others.typing(sender);
                }
            }
        }

{% endif %}

## Initializing the Chat

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
        .IconUrl("https://demos.telerik.com/kendo-ui/content/chat/avatar.png")
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

## Configuring the SignalR Client Hub Proxy

{% if site.core %}

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
    // Point to the Hub remote endpoint.
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

1. Attach the event handlers for the respective remote Hub actions.

    ```
    $(document).ready(function() {
        window.chat = $("#chat").getKendoChat();

        chatHub.on('broadcastMessage', function(sender, message) {
            var message = {
                type: 'text',
                text: message
            };

            // Render the received message in the Chat.
            chat.renderMessage(message, sender);
        });

        chatHub.on('typing', function(sender) {
            // Display the typing notification in the Chat.
            chat.renderMessage({ type: 'typing' }, sender);
        });
    });
    ```

1. Start the Peer-to-Peer Chat application.

{% else %}

1. Include the SignalR 2 script in the page. It is distributed with the SignalR NuGet package.

        <script src="~/Scripts/jquery.signalR-2.3.0.min.js"></script>

1. Reference the auto-generated SignalR hub script for the application.

        <script src="~/signalr/hubs"></script>

1. Implement the initialization logic for the SignalR Hub proxy.

        function startHub(startCallback) {
            var hub = $.connection.chatHub;

            $.connection.hub.start().done(function () {
                startCallback(hub)
            });

            return hub;
        }

1. In the `$(document).ready()` handler, start the Hub proxy and attach event handlers for the respective remote hub actions.

        $(document).ready(function () {
            window.chat = $('#chat').getKendoChat();
            window.chatHub = startHub(function (hub) { });

            chatHub.on("broadcastMessage", function (sender, message) {
                var message = {
                    type: "text",
                    text: message
                };

                // Render the received message in the Chat.
                chat.renderMessage(message, sender);
            });

            chatHub.on("typing", function (sender) {
                // Display the typing notification in the Chat.
                chat.renderMessage({ type: "typing" }, sender);
            });
        });

1. Start the Peer-to-Peer Chat Application.

{% endif %}

## See Also

* [Basic Usage of the Chat HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chat/index)
* [Server-Side API](/api/chat)
