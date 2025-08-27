---
title: Local Binding
page_title: Telerik UI Chat Documentation | Local Data Binding
description: "Learn how to bind the {{ site.product }} Chat component to a local data collection."
slug: htmlhelpers_localbinding_chat
position: 2
---

# Local Binding

The Chat supports local data binding that enables you to pass an arbitrary Model directly within the boundaries of the component.

## Model Requirements

The local binding mode uses the `ChatMessage` abstraction, available through the `Kendo.Mvc.UI` namespace, which has the following properties:

```C# ChatMessage
public class ChatMessage : IChatMessage
{
        /// <summary>
        /// The constructor that will create a <see cref="ChatMessage" /> instance.
        /// </summary>
        public ChatMessage()
        {
            Files = new List<ChatFile>();
        }

        /// <summary>
        /// The unique identifier of the message.
        /// </summary>
        public string Id { get; set; }


        /// <summary>
        /// ID of message being replied to
        /// </summary>
        public string RepliedToId { get; set; }

        /// <summary>
        /// The text of the message.
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        /// The author's unique identifier.
        /// </summary>
        public string AuthorId { get; set; }

        /// <summary>
        /// The author's name.
        /// </summary>
        public string AuthorName { get; set; }

        /// <summary>
        /// The author's image.
        /// </summary>
        public string AuthorImageUrl { get; set; }

        /// <summary>
        /// The message's timestamp.
        /// </summary>
        public DateTime? TimeStamp { get; set; }

        /// <summary>
        /// The alternative text that will be displayed if no image is present.
        /// </summary>
        public string AuthorImageAltText { get; set; }

        /// <summary>
        /// The pin mode of the message.
        /// </summary>
        public bool? IsPinned { get; set; }

        /// <summary>
        /// Sets the IsTyping mode.
        /// </summary>
        public bool? IsTyping { get; set; }

        /// <summary>
        /// Sets the IsDeleted mode.
        /// </summary>
        public bool? IsDeleted { get; set; }

        /// <summary>
        /// The initial files that will be set to the chat message.
        /// </summary>
        public IEnumerable<ChatFile> Files { get; set; }
}
```
```C# ChatFile
public class ChatFile: UploadFile
{
    /// <summary>
    /// Download/access URL
    /// </summary>
    public string Url { get; set; }

    /// <summary>
    /// MIME type
    /// </summary>
    public string Type { get; set; }
}

public partial class UploadFile 
{
    /// <summary>
    /// The extension of the initial file.
    /// </summary>
    public string Extension { get; set; }

    /// <summary>
    /// The name of the initial file.
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// The size of the initial file.
    /// </summary>
    public double? Size { get; set; }
}
```

## Configuration

To configure the Chat to bind to a local data collection, follow these steps:

1. Create a data collection of type `ChatMessage` in the controller action and pass it to the View that contains the Chat definition.

    {% if site.core %}
    ```C# HomeController.cs      
    public IActionResult Index()
    {
        var chatData = new List<ChatMessage>()
        {
            new ChatMessage {
                Id = "1",
                AuthorId = "1",
                AuthorName = "John Doe",
                AuthorImageUrl = "https://demos.telerik.com/aspnet-core/shared/web/Customers/RICSU.jpg",
                Text = "How can I help you?",
                TimeStamp = new DateTime(2025, 6, 1),
                IsPinned = true
            },
            new ChatMessage {
                Id = "2",
                AuthorId = "2",
                AuthorName = "Jane Smith",
                AuthorImageUrl = "https://demos.telerik.com/aspnet-core/shared/web/Customers/GOURL.jpg",
                AuthorImageAltText = "Jane's profile picture",
                Text = "I need assistance with my order",
                TimeStamp = new DateTime(2025, 6, 2),
                Files = new List<ChatFile> {
                    new ChatFile {
                        Extension = "txt",
                        Size = 5315153,
                        Name = "OrderDetails.txt"
                    }
                }
            }
        };
        
        return View(chatData);
    }
    ```
    {% else %}
    ```C# HomeController.cs  
    public ActionResult Index()
    {
        var chatData = new List<ChatMessage>()
        {
            new ChatMessage {
                Id = "1",
                AuthorId = "1",
                AuthorName = "John Doe",
                AuthorImageUrl = "https://demos.telerik.com/aspnet-mvc/content/web/Customers/RICSU.jpg",
                Text = "How can I help you?",
                TimeStamp = new DateTime(2025, 6, 1),
                IsPinned = true
            },
            new ChatMessage {
                Id = "2",
                AuthorId = "2",
                AuthorName = "Jane Smith",
                AuthorImageUrl = "https://demos.telerik.com/aspnet-mvc/content/web/Customers/GOURL.jpg",
                AuthorImageAltText = "Jane's profile picture",
                Text = "I need assistance with my order",
                TimeStamp = new DateTime(2025, 6, 2),
                Files = new List<ChatFile> {
                    new ChatFile {
                        Extension = "txt",
                        Size = 5315153,
                        Name = "OrderDetails.txt"
                    }
                }
            }
        };
        
        return View(chatData);
    }  
    ```
    {% endif %}

2. Within the `Index.cshtml` View, set the Model to the data collection `List<ChatMessage>` and define the Chat component using the `BindTo()` method.

    ```HtmlHelper
        @model List<ChatMessage>

        @(Html.Kendo().Chat()
            .Name("chat")
            .AuthorId("1")
            .Width("1200px")
            .Height("800px")
            .BindTo(Model)
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc
        @model List<ChatMessage>

        <kendo-chat name="chat"
            bind-to="@Model"
            width="1200px"
            height="800px"
            author-id="1">
        </kendo-chat>
    ```
    {% endif %}

## See Also

* [Binding the Chat to Remote Data]({% slug htmlhelpers_remotebinding_chat %})
* [Server-Side API of the Chat HtmlHelper](/api/chat)
{% if site.core %}
* [Server-Side API of the Chat TagHelper](/api/taghelpers/chat)
{% endif %}