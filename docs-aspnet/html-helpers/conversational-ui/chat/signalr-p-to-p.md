---
title: Peer-to-Peer Chat
page_title: Peer-to-Peer Chat with SignalR
description: "Learn how to create a peer-to-peer Telerik UI Chat with {{ site.framework }} SignalR."
components: ["chat"]
previous_url: /helpers/conversational-ui/chat/signalr-p-to-p
slug: htmlhelpers_chat_aspnetcore_signalr
position: 8
---

# Peer-to-Peer Chat

You can configure the Telerik UI Chat component for {{ site.framework }} and a {% if site.core %}[ASP.NET Core SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/){% else %}[SignalR 2](https://www.asp.net/signalr){% endif %} service to create a Peer-to-Peer Chat application.

For the complete project, refer to the [Chat Peer to Peer example]({% if site.core %}https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Chat/ChatPeerToPeer.cshtml{% else %}https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/ChatPeerToPeer{% endif %}).

To create the Peer-to-Peer Chat, you have to implement the SignalR Hub server and then to implement the application client:

1. [Create the new application](#creating-the-new-application)
1. [Configure the SignalR Hub server](#configuring-the-signalr-hub-server)
1. [Initialize the Chat](#initializing-the-chat)
1. [Configure the SignalR client Hub proxy](#configuring-the-signalr-client-hub-proxy)

## Creating the New Application

Depending on your preferred editor, use any of the following approaches:

{% if site.core %}

* [Create a new {{ site.product }} application from the Standard template]({% slug newprojectwizards_visualstudio_aspnetcore %})
* [Create a new .NET Core application in Visual Studio and include the {{ site.product }} package]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Create a new .NET Core application with the CLI and include the {{ site.product }} package]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})

> For .NET 6 and later versions, SignalR is included as part of the ASP.NET Core shared framework, so no additional package installation is required for the server-side SignalR functionality.

{% else %}

* [Create a new Telerik UI for ASP.NET MVC application from the Standard template]({% slug newprojectwizards_visualstudio_aspnetcore %})
* [Create a new ASP.NET MVC application in Visual Studio and include the Telerik UI for ASP.NET MVC package]({% slug gettingstarted_aspnetmvc %})

{% endif %}

## Configuring the SignalR Hub Server

{% if site.core %}

1. Modify `Program.cs` to configure SignalR services and routing.

    ```C#
    using Microsoft.AspNetCore.SignalR;

    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    builder.Services.AddControllersWithViews();

    // Add the SignalR service.
    builder.Services.AddSignalR();

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (!app.Environment.IsDevelopment())
    {
        app.UseExceptionHandler("/Home/Error");
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();

    app.UseRouting();

    app.UseAuthorization();

    app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");

    // Map the SignalR Hub to the specified route.
    app.MapHub<ChatHub>("/chat");

    app.Run();
    ```

1. Add a `ChatHub` class to the project.

    ```C#
    using Microsoft.AspNetCore.SignalR;

    namespace YourAppNamespace
    {
        // The Hub class should inherit from Microsoft.AspNetCore.SignalR.Hub
        public class ChatHub : Hub
        {
            public async Task Send(string senderId, string senderName, string message)
            {
                // Broadcast the message to all clients except the sender.
                await Clients.Others.SendAsync("broadcastMessage", senderId, senderName, message);
            }

            public async Task SendTyping(string senderId, string senderName)
            {
                // Broadcast the typing notification to all clients except the sender.
                await Clients.Others.SendAsync("typing", senderId, senderName);
            }
        }
    }
    ```
{% else %}

1. Add the[ `Microsoft.AspNet.SignalR`](https://www.nuget.org/packages/Microsoft.AspNet.SignalR) NuGet package to the application.

        Install-Package Microsoft.AspNet.SignalR

1. Create a `Startup.cs` file to configure the hub connection.

        using Microsoft.Owin;
        using Owin;

        namespace YourAppNamespace
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

        namespace YourAppNamespace.Hubs
        {
            // The Hub class has to inherit from the Microsoft.AspNet.SignalR.Hub.
            public class ChatHub : Hub
            {
                public void Send(string senderId, string senderName, string message)
                {
                    // Broadcast the message to all clients except the sender.
                    Clients.Others.broadcastMessage(senderId, senderName, message);
                }
                
                public void SendTyping(string senderId, string senderName)
                {
                    // Broadcast the typing notification to all clients except the sender.
                    Clients.Others.typing(senderId, senderName);
                }
            }
        }

{% endif %}

## Initializing the Chat

Initialize the Chat and implement handlers for its [`SendMessage`](/api/kendo.mvc.ui.fluent/chateventbuilder#sendmessagesystemstring) and [`Input`](/api/kendo.mvc.ui.fluent/chateventbuilder#inputsystemstring) events.

```HtmlHelper
    @{
        var name = Guid.NewGuid().ToString();
    }

    @(Html.Kendo().Chat()
        .Name("chat")
        .AuthorId(@name)
        .IsTypingField("isTyping")
        .Events(events => events
            .Input("onInput")
            .SendMessage("onSendMessage")
        )
    )
```
{% if site.core %}
```TagHelper
    @{
        var name = Guid.NewGuid().ToString();
    }

    <kendo-chat name="chat" 
        author-id="@name"
        is-typing-field="isTyping"
        on-send-message="onSendMessage"
        on-input="onInput">
    </kendo-chat>
```
```JS Scripts
<script>
    const currentUser = {
        id: '@name',
        name: 'User123',
        iconUrl: "https://demos.telerik.com/kendo-ui/content/chat/avatar.png"
    };
    let isTyping = false;

    // The 'Input' will notify the SignallR Hub that the current client is typing.
    // The Hub, in turn, will notify all the other clients that the user has started typing.
    function onInput(e) {
        // If not already typing, send typing notification.
        if (!isTyping) {
            isTyping = true;
            chatHub.invoke("sendTyping", currentUser.id, currentUser.name);
        }
    }

    // The 'SendMessage' handler will send the user data and the typed text to the SignalR Hub.
    // The Hub will then forward that info to the other clients.
    function onSendMessage(args) {
        // Update the message data based on the current user's data.
        args.message.id = kendo.guid();
        args.message.authorId = currentUser.id;
        args.message.authorName = currentUser.name;
        args.message.authorImageUrl = currentUser.iconUrl;

        // Stop typing when sending a message.
        if (isTyping) {
            isTyping = false;
        }
        chatHub.invoke("send", args.message.authorId, args.message.authorName, args.message.text);
    }
</script>
```
{% else %}
```JS Scripts
<script>
    const currentUser = {
        id: '@name',
        name: 'User123',
        iconUrl: "https://demos.telerik.com/kendo-ui/content/chat/avatar.png"
    };
    let isTyping = false;

    // The 'Input' will notify the SignallR Hub that the current client is typing.
    // The Hub, in turn, will notify all the other clients that the user has started typing.
    function onInput(e) {
        // If not already typing, send typing notification.
        if (!isTyping) {
            isTyping = true;
            chatHub.server.sendTyping(currentUser.id, currentUser.name);
        }
    }

    // The 'SendMessage' handler will send the user data and the typed text to the SignalR Hub.
    // The Hub will then forward that info to the other clients.
    function onSendMessage(args) {
        // Update the message data based on the current user's data.
        args.message.id = kendo.guid();
        args.message.authorId = currentUser.id;
        args.message.authorName = currentUser.name;
        args.message.authorImageUrl = currentUser.iconUrl;

        // Stop typing when sending a message.
        if (isTyping) {
            isTyping = false;
        }
        chatHub.server.send(args.message.authorId, args.message.authorName, args.message.text);
    }
</script>
```
{% endif %}

## Configuring the SignalR Client Hub Proxy

{% if site.core %}

1. Add the SignalR JavaScript client library. You can use NPM to install the package or reference the library directly from CDN.

    **Using npm**
    
    ```bash
    npm install @microsoft/signalr
    ```
    
    Then copy the file from `node_modules/@microsoft/signalr/dist/browser/signalr.min.js` to `wwwroot/lib/signalr/`.

    **Using CDN**
    
    Reference the library directly from CDN in the View.

    ```HTML
    <script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/7.0.0/signalr.min.js"></script>
    ```

1. Include the SignalR script on the View that contains the Chat declaration.

    ```HTML View
    <script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/7.0.0/signalr.min.js"></script>
    ```

1. Initialize the SignalR Hub connection.

    ```JS
    // Point to the Hub remote endpoint.
    window.chatHub = new signalR.HubConnectionBuilder()
        .withUrl('/chat')
        .build();
    ```

1. Start the Hub connection and configure it to handle errors.

    ```JS
    chatHub.start()
        .then(function () {
            console.log('SignalR connection started.');
        })
        .catch(function(err) {
            console.error('Error starting SignalR connection: ' + err.toString());
        });
    ```

1. Attach the event handlers for the respective remote Hub actions.

    ```JS
    $(document).ready(function() {
        chatHub.on('broadcastMessage', function(senderId, senderName, message) {
            const chat = $("#chat").getKendoChat();

            // Check for a "typing" message.
            let typingMessages = $.grep(chat.dataSource.data(), function(item){
                return item.isTyping == true ? item.id : "";
            });

            if(typingMessages.length > 0) {
                if(typingMessages[0].id != null) {
                    let messageObject = chat.dataSource.get(typingMessages[0].id);
                    if (messageObject) {
                        // Update the "typing" message with the received message text.
                        let updatedMessage = chat.updateMessage(messageObject, {
                            text: message,
                            isTyping: false
                        });
                    }
                }
            } else {
                // Post the received message in the Chat.
                chat.postMessage({
                    id: kendo.guid(),
                    authorId: senderId,
                    authorName: senderName,
                    authorImageUrl:currentUser.iconUrl,
                    text: message,
                    isTyping: false
                });
            }
        });

        chatHub.on('typing', function(senderId, senderName) {
            console.log(senderName + ' is typing');
            const chat = $("#chat").getKendoChat();

            chat.postMessage({
                id: kendo.guid(),
                isTyping: true,
                authorId: senderId,
                authorName: senderName,
                authorImageUrl: currentUser.iconUrl
            });
        });
    });
    ```

{% else %}

1. Include the SignalR 2 script in the page. You can install [`Microsoft.AspNet.SignalR.JS`](https://www.nuget.org/packages/microsoft.aspnet.signalr.js/) NuGet package or reference the library directly from CDN.

    **Using NuGet package**
    
    ```
    Install-Package Microsoft.AspNet.SignalR.JS
    ```
    
    Then reference the library in the View:

    ```HTML
    <script src="~/Scripts/jquery.signalR-2.4.3.min.js"></script>
    ```

    **Using CDN**
    
    Reference the library directly from CDN in the View.

    ```HTML
    <script src="https://cdnjs.cloudflare.com/ajax/libs/signalr.js/2.4.3/jquery.signalR.min.js"></script>
    ```

1. Reference the auto-generated SignalR hub script for the application.
    ```HTML
        <script src="~/signalr/hubs"></script>
    ```

1. Implement the initialization logic for the SignalR Hub proxy.
    ```JS
    <script>
        const currentUser = {
            id: '@name',
            name: 'User123',
            iconUrl: "https://demos.telerik.com/kendo-ui/content/chat/avatar.png"
        };

        var isTyping = false;
        var chatHub;

        // Start the Hub proxy and attach event handlers for the respective remote hub actions.
        $(document).ready(function () {
            chatHub = $.connection.chatHub;

            chatHub.client.broadcastMessage = function (senderId, senderName, message) {
                const chat = $("#chat").getKendoChat();

                // Check for a "typing" message.
                let typingMessages = $.grep(chat.dataSource.data(), function (item) {
                    return item.isTyping == true ? item.id : "";
                });

                if (typingMessages.length > 0) {
                    if (typingMessages[0].id != null) {
                        let messageObject = chat.dataSource.get(typingMessages[0].id);
                        if (messageObject) {
                            // Update the "typing" message with the received message text.
                            let updatedMessage = chat.updateMessage(messageObject, {
                                text: message,
                                isTyping: false
                            });
                        }
                    }
                } else {
                    // Post the received message in the Chat.
                    chat.postMessage({
                        id: kendo.guid(),
                        authorId: senderId,
                        authorName: senderName,
                        authorImageUrl: currentUser.iconUrl,
                        text: message,
                        isTyping: false
                    });
                }
            };

            chatHub.client.typing = function (senderId, senderName) {
                console.log(senderName + ' is typing');
                const chat = $("#chat").getKendoChat();

                chat.postMessage({
                    id: kendo.guid(),
                    isTyping: true,
                    authorId: senderId,
                    authorName: senderName,
                    authorImageUrl: currentUser.iconUrl
                });
            };

            // Start the connection.
            $.connection.hub.start().done(function () {
                console.log('SignalR connection started.');
            }).fail(function (err) {
                console.error('Error starting SignalR connection: ' + err.toString());
            });
        });
    </script>
    ```
{% endif %}

1. Start the Peer-to-Peer Chat application. To test the real-time messages, open the page with the Chat in two browser windows.

## See Also

* [Basic Usage of the Chat for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chat/index)
* [Client-Side API of the Chat](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat)
* [Server-Side API of the Chat](/api/chat)
{% if site.core %}
* [Server-Side API of the Chat TagHelper](/api/taghelpers/chat)
{% endif %}
