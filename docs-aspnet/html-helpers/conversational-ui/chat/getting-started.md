---
title: Getting Started
page_title: Getting Started
description: "Make your first steps with the Telerik UI for {{ site.framework }} Chat component by following a complete step-by-step tutorial."
slug: aspnetcore_chat_getting_started
position: 1
---

# Getting Started with the Chat

This tutorial explains how to set up a basic Telerik UI for {{ site.framework }} Chat and highlights the major steps in the configuration of the component.

You will learn how to initialize a Chat component, load messages from a data collection, define quick actions, configure commands and elements in the header, and handle context menu actions.

 ![Sample Telerik UI for {{ site.framework }} Chat](./images/chat-getting-started.png)

@[template](/_contentTemplates/core/getting-started-prerequisites.md#repl-component-gs-prerequisites)

## 1. Prepare the CSHTML File

@[template](/_contentTemplates/core/getting-started-directives.md#gs-adding-directives)

## 2. Initialize the Chat

Use the Chat HtmlHelper{% if site.core %} or TagHelper{% endif %} to add the component to a page:

* The `Name()` configuration method is mandatory as its value is used for the `id` and the `name` attributes of the Chat element.
* The `AuthorId()` specifies the unique identifier of the current user. If not set, a GUID is generated automatically. 
* Set the `Height()` and `Width()` options based on your layout requirements.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .AuthorId("customer")
    .Height("600px")
    .Width("500px")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" author-id="customer" width="500" height="600">
</kendo-chat>
```
{% endif %}

## 3. Load Conversation from a Data Collection

The next step is to load messages from a local data collection. As a result, the Chat will display message history on load.

1. Create a data collection of type `ChatMessage` in the controller action and pass it to the View that contains the Chat definition.

    {% if site.core %}
    ```C# HomeController.cs  
    using Kendo.Mvc.UI;

    public IActionResult Index()
    {
        var chatHistory = new List<ChatMessage>()
        {
            new ChatMessage {
                Id = "1",
                AuthorId = "support_agent",
                AuthorName = "Sarah Johnson",
                AuthorImageUrl = "https://demos.telerik.com/aspnet-core/shared/web/Customers/LONEP.jpg",
                AuthorImageAltText = "Sarah's profile picture",
                Text = "Welcome to our support chat! How can I help you today?",
                TimeStamp = new DateTime(2025,8,1).AddHours(10),
                IsPinned = true
            },
            new ChatMessage {
                Id = "2",
                AuthorId = "customer",
                AuthorName = "John Doe",
                AuthorImageUrl = "https://demos.telerik.com/aspnet-core/shared/web/Customers/RICSU.jpg",
                Text = "Hi! I have a question about your products.",
                TimeStamp = new DateTime(2025,8,1).AddHours(10).AddMinutes(5),
            },
            new ChatMessage {
                Id = "3",
                AuthorId = "support_agent",
                AuthorName = "Sarah Johnson",
                AuthorImageUrl = "https://demos.telerik.com/aspnet-core/shared/web/Customers/LONEP.jpg",
                AuthorImageAltText = "Sarah's profile picture",
                Text = "I'd be happy to help! What specific product information do you need?",
                TimeStamp = new DateTime(2025,8,1).AddHours(10).AddMinutes(6),
            }
        };
        return View(chatHistory);
    }
    ```
    {% else %}
    ```C# HomeController.cs  
    using Kendo.Mvc.UI;

    public ActionResult Index()
    {
        var chatHistory = new List<ChatMessage>()
        {
            new ChatMessage {
                Id = "1",
                AuthorId = "support_agent",
                AuthorName = "Sarah Johnson",
                AuthorImageUrl = "https://demos.telerik.com/aspnet-core/shared/web/Customers/LONEP.jpg",
                AuthorImageAltText = "Sarah's profile picture",
                Text = "Welcome to our support chat! How can I help you today?",
                TimeStamp = new DateTime(2025,8,1).AddHours(10),
                IsPinned = true
            },
            new ChatMessage {
                Id = "2",
                AuthorId = "customer",
                AuthorName = "John Doe",
                AuthorImageUrl = "https://demos.telerik.com/aspnet-core/shared/web/Customers/RICSU.jpg",
                Text = "Hi! I have a question about your products.",
                TimeStamp = new DateTime(2025,8,1).AddHours(10).AddMinutes(5),
            },
            new ChatMessage {
                Id = "3",
                AuthorId = "support_agent",
                AuthorName = "Sarah Johnson",
                AuthorImageUrl = "https://demos.telerik.com/aspnet-core/shared/web/Customers/LONEP.jpg",
                AuthorImageAltText = "Sarah's profile picture",
                Text = "I'd be happy to help! What specific product information do you need?",
                TimeStamp = new DateTime(2025,8,1).AddHours(10).AddMinutes(6),
            }
        };
        return View(chatHistory);
    }  
    ```
    {% endif %}
    ```Razor Index.cshtml_HtmlHelper
    @model List<ChatMessage>

    @(Html.Kendo().Chat()
        .Name("chat")
        .AuthorId("customer")
        .Height("600px")
        .Width("500px")
    )
    ```
    {% if site.core %}
    ```Razor Index.cshtml_TagHelper
    @addTagHelper *, Kendo.Mvc
    @model List<ChatMessage>

    <kendo-chat name="chat" author-id="customer" width="500" height="600">
    </kendo-chat>
    ```
    {% endif %}

1. Pass the data to the Chat using the `BindTo()` option.

    ```HtmlHelper
    @model List<ChatMessage>

    @(Html.Kendo().Chat()
        .Name("chat")
        .AuthorId("customer")
        .Height("600px")
        .Width("500px")
        .BindTo(Model)
    )
    ```
    {% if site.core %}
    ```TagHelper
    @addTagHelper *, Kendo.Mvc
    @model List<ChatMessage>

    <kendo-chat name="chat" 
        author-id="customer" 
        width="500" 
        height="600"
        bind-to="@Model">
    </kendo-chat>
    ```
    {% endif %}

## 4. Add Message Suggestions

Configure predefined [suggestions](slug:htmlhelpers_quick_actions_chat) that serve as quick-select options for common responses or phrases. The specified suggestions appear as clickable items above the message box, allowing users to instantly insert the text into their message or send it directly.

Define the desired suggestions by using the `Suggestions()` configuration:

```HtmlHelper
@model List<ChatMessage>

@(Html.Kendo().Chat()
    .Name("chat")
    .AuthorId("customer")
    .Height("600px")
    .Width("500px")
    .BindTo(Model)
    .Suggestions(suggestions => {
        suggestions.Add().Text("Product Information");
        suggestions.Add().Text("Pricing Details");
        suggestions.Add().Text("Technical Support");
        suggestions.Add().Text("Contact Sales");
        suggestions.Add().Text("Thank you");
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
@model List<ChatMessage>

<kendo-chat name="chat"
    author-id="customer" 
    width="500" 
    height="600"
    bind-to="@Model">
    <suggestions>
        <suggestion text="Product Information" />
        <suggestion text="Pricing Details" />
        <suggestion text="Technical Support" />
        <suggestion text="Contact Sales" />
        <suggestion text="Thank you" />
    </suggestions>
</kendo-chat>
```
{% endif %}

## 5. Configure Header Items

Define items in the Chat's header to customize the default header appearance and include additional functionalities, such as a **Settings** button.

Specify the desired header items through the `HeaderItems()` configuration.

```HtmlHelper
@model List<ChatMessage>

@(Html.Kendo().Chat()
    .Name("chat")
    .AuthorId("customer")
    .Height("600px")
    .Width("500px")
    .BindTo(Model)
    .HeaderItems(items =>
    {
        items.Add().Type(AppBarItemType.ContentItem).Template("<strong>Customer Support Chat</strong>");
        items.Add().Type(AppBarItemType.Spacer);
        items.Add().Type(AppBarItemType.ContentItem).Template(Html.Kendo().Template().AddComponent(btn => btn
        .Button()
        .Name("settingsBtn")
        .Icon("gear")
        .FillMode(ButtonFillMode.Flat)
        .Events(ev => ev.Click("onSettingsClick"))
        ));
    })
)

<script>
    function onSettingsClick() {
        // Handle button's click event.
    }
</script>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
@model List<ChatMessage>

<kendo-chat name="chat"
    author-id="customer" 
    width="500" 
    height="600"
    bind-to="@Model">
    <!-- additional configuration. -->
    <header-items>
        <header-item type="AppBarItemType.ContentItem" template="<strong>Customer Support Chat</strong>" />
        <header-item type="AppBarItemType.Spacer"/>
        <header-item type="AppBarItemType.ContentItem" template="<button id='settingsBtn'></button>"/>
    </header-items>
</kendo-chat>

<script>
    $(document).ready(function() {
         $('#settingsBtn').kendoButton({
            icon: "gear",
            fillMode: "outline",
            click: function() {
                // Handle button's click event.
            }
         });
    });
</script>
```
{% endif %}

## 6. Set up Context Menu Actions

The Chat component provides an option to customize its default [context menu actions](slug:htmlhelpers_tools_chat) of the messages. Right-click on a specified message to review the available built-in context menu.

Utilize the `MessageActions()` configuration to define the actions that will appear in the messages context menu. Also, handle the `ContextMenuAction` event that fires when a context menu action is executed.

```HtmlHelper
@model List<ChatMessage>

@(Html.Kendo().Chat()
    .Name("chat")
    .AuthorId("customer")
    ... // Additional configuration.
    .MessageActions(actions => {
        actions.Add().Name("reply").Text("Reply").Icon("undo");
        actions.Add().Name("copy").Text("Copy").Icon("copy");
        actions.Add().Name("pin").Text("Pin").Icon("pin");
        actions.Add().Name("forward").Text("Forward").Icon("share");
        actions.Add().Name("delete").Text("Delete").Icon("trash");
    })
    .Events(ev =>
    {
        ev.ContextMenuAction("onContextMenuAction");
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
@model List<ChatMessage>

<kendo-chat name="chat" on-context-menu-action="onContextMenuAction"
    author-id="customer" 
    width="500" 
    height="600"
    bind-to="@Model">
    <!-- additional configuration. -->
    <message-actions>
        <message-action name="reply" text="Reply" icon="undo" />
        <message-action name="copy" text="Copy" icon="copy" />
        <message-action name="pin" text="Pin" icon="pin" />
        <message-action name="forward" text="Forward" icon="share" />
        <message-action name="delete" text="Delete" icon="trash" />
    </message-actions>
</kendo-chat>
```
{% endif %}
```JS Scripts
<script>
    // Handle context menu actions.
    function onContextMenuAction(e) {
        console.log("Context action:", e.type, "on message:", e.message.text);
                
        switch(e.type) {
            case "reply":
                alert("Replying to: " + e.message.text.substring(0, 50) + "...");
                break;
            case "copy":
                alert("Message copied to clipboard!");
                break;
            case "pin":
                alert("Message pinned successfully!");
                break;
            case "forward":
                alert("Forwarding message...");
                break;
            case "delete":
                if (confirm("Are you sure you want to delete this message?")) {
                    this.removeMessage(e.message);
                }
                break;
        }
    }
</script>
```

## 7. Handle Message Events

Handle the `SendMessage` event and implement custom logic that checks if the submitted message contains any of the predefined quick-actions and posts the respective reply using the [`postMessage()`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/methods/postmessage) client-side method.

```HtmlHelper
@model List<ChatMessage>

@(Html.Kendo().Chat()
    .Name("chat")
    .AuthorId("customer")
    ... // Additional configuration.
    .Events(ev =>
    {
        ev.SendMessage("onSendMessage");
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
@model List<ChatMessage>

<kendo-chat name="chat" on-send-message="onSendMessage"
    author-id="customer" 
    width="500" 
    height="600"
    bind-to="@Model">
    <!-- additional configuration. -->
</kendo-chat>
```
{% endif %}
```JS Scripts
<script>
    const currentUser = {
        id: "customer",
        name: "John Doe",
        iconUrl: "https://demos.telerik.com/aspnet-core/shared/web/Customers/RICSU.jpg",
        iconAltText: "John's profile picture"
    };
    
    function onSendMessage(e) {
        // Assign the user's data to the submitted message.
        e.message.authorId = currentUser.id;
        e.message.authorName = currentUser.name;
        e.message.authorImageUrl = currentUser.iconUrl;
        e.message.authorImageAltText = currentUser.iconAltText;
        e.message.id = kendo.guid();
    
        // Simulate bot response based on the selected suggestion.
        let response = "";
        console.log("Suggestion clicked:", e.message.text);
        switch(e.message.text) {
            case "Product Information":
                response = "Here's information about our products. What specific product are you interested in?";
                break;
            case "Pricing Details":
                response = "I can help you with pricing. Which product or service would you like to know about?";
                break;
            case "Technical Support":
                response = "I'll connect you with technical support. What issue are you experiencing?";
                break;
            case "Contact Sales":
                response = "Let me connect you with our sales team. What are you looking to purchase?";
                break;
            default:
                response = "Thank you for your interest! How else can I assist you?";
        }

        setTimeout(function() {
            const messages = [];
            // The message that will be posted as a reply from the Support Agent.
            messages.push({
                id: kendo.guid(),
                text: response,
                authorId: "support_agent",
                authorName: "Sarah Johnson",
                authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
                timestamp: new Date()
            });
            sendMessagesSequentially(e.sender, messages);
        }, 200);
    }

    async function sendMessagesSequentially(sender, messages) {
        for (const msg of messages) {
            sender.postMessage(msg);
            await delay(300); // Adjust delay as needed.
        }
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
</script>
```

## 8. (Optional) Reference Existing Chat Instances

Referencing existing component instances allows you to build on top of their configuration. To reference an existing Chat instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method.

1. Use the `Name()` option of the component to establish a reference.

    ```JS script
        <script>
            $(document).ready(function() {
                var chatReference = $("#chat").data("kendoChat"); // chatReference is a reference to the existing Chat instance of the helper.
            });
        </script>
    ```

1. Use the [Chat client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat#methods) to control the behavior of the component. In this example, you will clear the message history of the Chat (for example, when a button is clicked).

    ```HtmlHelper
        @(Html.Kendo().Button()
            .Name("btn")
            .Content("Clear History")
            .Events(ev => ev.Click("onBtnClick")))
        
        <script>
            function onBtnClick() {
                var chatReference = $("#chat").data("kendoChat");
                chatReference.clearMessages();
            }
        </script>
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-button name="btn" on-click="onBtnClick">
            Clear History
        </kendo-button>

        <script>
            function onBtnClick() {
                var chatReference = $("#chat").data("kendoChat");
                chatReference.clearMessages();
            }
        </script>
    ```
    {% endif %}

For more information on referencing specific helper instances, see the [Methods and Events]({% slug methodevents_core %}) article.

## Next Steps

* [Integrating AI services with the Chat]({% slug htmlhelpers_ai_integration_chat %})
* [Using templates in the Chat]({% slug htmlhelpers_templates_chat %})
* [Handling JavaScript Events of User Interactions]({% slug events_chat_aspnetcore %}) 

## See Also

* [Using the API of the Chat for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chat/api)
* [Client-Side API of the Chat](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat)
* [Server-Side API of the Chat](/api/chat)
{% if site.core %}
* [Server-Side API of the Chat TagHelper](/api/taghelpers/chat)
{% endif %}