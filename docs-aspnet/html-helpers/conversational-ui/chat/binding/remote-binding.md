---
title: Remote Binding
page_title: Telerik UI Chat Documentation | Remote Data Binding
description: "Learn how to bind the Telerik UI for {{ site.framework }} Chat component to data received from a remote endpoint."
slug: htmlhelpers_remotebinding_chat
position: 3
---

# Remote Binding

The Chat supports remote data binding that enables you to load messages through a remote endpoint.

For a runnable example, refer to the [demo on binding the Chat to remote data](https://demos.telerik.com/{{ site.platform }}/chat/data-binding).

## Field Mapping

When the Chat is configured for remote data binding, you must specify the following field mapping options in the Chat configuration to map Model properties to DataSource fields:

- `TextField()`&mdash;Maps to the message text content.
- `AuthorNameField()`&mdash;Maps to the author's display name.
- `AuthorIdField()`&mdash;Maps to the author's unique identifier.
- `AuthorImageUrlField()`&mdash;Maps to the author's profile image URL.
- `AuthorImageAltTextField()`&mdash;Maps to the alternative text for the author's image.
- `TimestampField()`&mdash;Maps to the message timestamp.
- `IdField()`&mdash;Maps to the unique message identifier.
- `FilesField()`&mdash;Maps to attached files.
- `IsDeletedField()`&mdash;Maps to the deleted status of the message.
- `IsTypingField()`&mdash;Maps to the typing indicator status.
- `IsPinnedField()`&mdash;Maps to the pinned indicator status.

## Ajax Data Binding

> If the `AutoAssignId()` configuration method is set to `false`, the *Id* field should be assigned on the server-side.

To configure the Chat for Ajax data binding, follow these steps:

1. Create a controller action that returns the chat messages when the DataSource triggers a `Read` request.

    ```C# HomeController.cs      
    public JsonResult GetMessages()
    {
        // Populate the "data" collection with data.
        var data = new List<ChatMessage>();

        return Json(new DataSourceResult
        {
            Data = data.Select(message => new
            {
                message.Id,
                message.AuthorId,
                message.AuthorName,
                message.AuthorImageUrl,
                message.AuthorImageAltText,
                message.Text,
                message.TimeStamp,
                message.IsDeleted,
                message.IsPinned,
                message.IsTyping,
                Files = message.Files.Select(file => new
                {
                    extension = file.Extension,
                    size = file.Size,
                    type = file.Type,
                    name = file.Name
                })
            })
        });
    }
    ```
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

1. Define actions for `Create` and `Update` operations.

    ```C# HomeController.cs
        public JsonResult CreateMessage([DataSourceRequest] DataSourceRequest request, ChatMessage message)
        {
            message.Id = Guid.NewGuid().ToString();
            // Set the Message ID explicitly and perform a custom create operation to the database.
            return Json(new[] { message }.ToDataSourceResult(request));
        }

        public JsonResult UpdateMessage([DataSourceRequest] DataSourceRequest request, ChatMessage message)
        {
            // Perform a custom update operation to the existing database.
            return Json(new[] { message }.ToDataSourceResult(request));
        }
    ```

1. Configure the Chat with the appropriate field mappings and a DataSource.

    ```HtmlHelper
    @(Html.Kendo().Chat()
        .Name("chat")
        .Height("600px")
        .Width("400px")
        .AuthorId("1")
        .AutoAssignId(false)
        .TextField("Text")
        .AuthorNameField("AuthorName")
        .FilesField("Files")
        .AuthorIdField("AuthorId")
        .AuthorImageUrlField("AuthorImageUrl")
        .AuthorImageAltTextField("AuthorImageAltTextField")
        .TimestampField("TimeStamp")
        .IdField("Id")
        .IsPinnedField("IsPinned")
        .IsDeletedField("IsDeleted")
        .IsTypingField("IsTyping")
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("GetMessages", "Home"))
            .Create(create => create.Action("CreateMessage", "Home"))
            .Update(update => update.Action("UpdateMessage", "Home"))
        )
        .Events(events => events.SendMessage("onSendMessage"))
    )
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-chat name="chat"
          height="600"
          width="400"
          author-id="1"
          text-field="Text"
          author-name-field="AuthorName"
          files-field="Files"
          author-id-field="AuthorId"
          author-image-url-field="AuthorImageUrl"
          author-image-alt-text-field="AuthorImageAltTextField"
          timestamp-field="TimeStamp"
          id-field="Id"
          is-pinned-field="IsPinned"
          is-deleted-field="IsDeleted"
          is-typing-field="IsTyping"
          on-send-message="onSendMessage">
         <datasource type="DataSourceTagHelperType.Ajax">
             <transport>
                <read url="@Url.Action("GetMessages", "Home")" />
                <create url="@Url.Action("CreateMessage", "Home")" />
                <update url="@Url.Action("UpdateMessage", "Home")" />
            </transport>
         </datasource>
    </kendo-chat>
    ```
    {% endif %}
    ```JS Scripts
    <script>
        function onSendMessage(e){
            const currentUser = {
                id: 1,
                name: "Lora",
                iconUrl: "https://demos.telerik.com/aspnet-core/shared/web/Customers/RICSU.jpg",
                iconAltText: "Lora's profile picture"
            };

            e.message.authorId = currentUser.id;
            e.message.authorName = currentUser.name;
            e.message.authorImageUrl = currentUser.iconUrl;
            e.message.authorImageAltText = currentUser.iconAltText;

            setTimeout(() => {
                e.sender.scrollToBottom();
            }, 30);
        }
    </script>
    ```

## Custom DataSource

Also, you can use a Custom DataSource for more advanced scenarios with schema mapping.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .Height("600px")
    .Width("400px")
    .AuthorId("1")
    .Events(events => events.SendMessage("onSendMessage"))
    .DataSource(dataSource => dataSource
        .Custom()
        .Transport(transport => transport
            .Read("GetMessages", "Home")
            .Update("UpdateMessage", "Home")
            .Create("CreateMessage", "Home")
        )
        .Schema(schema => schema
            .Model(model => {
                model.Id("id");
                model.Field("id", typeof(string)).From("Id");
                model.Field("authorId", typeof(string)).From("AuthorId");
                model.Field("authorName", typeof(string)).From("AuthorName");
                model.Field("authorImageUrl", typeof(string)).From("AuthorImageUrl");
                model.Field("timestamp", typeof(DateTime)).From("TimeStamp");
                model.Field("isDeleted", typeof(Boolean)).From("IsDeleted");
                model.Field("isTyping", typeof(Boolean)).From("IsTyping");
                model.Field("isPinned", typeof(Boolean)).From("IsPinned");
            })
        )
    )
)
```
{% if site.core %}
```TagHelper
<kendo-chat name="chat"
           width="600px"
           height="400px"
           author-id="1"
           on-send-message="onSendMessage">
    <datasource type="DataSourceTagHelperType.Custom">
        <schema>
            <model id="id">
                <fields>
                    <field name="id" type="string" from="Id"></field>
                    <field name="authorId" type="string" from="AuthorId"></field>
                    <field name="authorName" type="string" from="AuthorName"></field>
                    <field name="authorImageUrl" type="string" from="AuthorImageUrl"></field>
                    <field name="timestamp" type="date" from="TimeStamp"></field>
                    <field name="isDeleted" type="boolean" from="IsDeleted"></field>     
                    <field name="isTyping" type="boolean" from="IsTyping"></field>     
                    <field name="isPinned" type="boolean" from="IsPinned"></field>  
                </fields>
            </model>
        </schema>
        <transport>
            <read url="@Url.Action("GetMessages","Home")"/>
            <create url="@Url.Action("CreateMessage", "Home")" />
            <update url="@Url.Action("UpdateMessage", "Home")" />
        </transport>
    </datasource>
</kendo-chat>
```
{% endif %}
```JS Scripts
<script>
    function onSendMessage(e){
        const currentUser = {
            id: 1,
            name: "Lora",
            iconUrl: "https://demos.telerik.com/aspnet-core/shared/web/Customers/RICSU.jpg",
            iconAltText: "Lora's profile picture"
        };

        e.message.authorId = currentUser.id;
        e.message.authorName = currentUser.name;
        e.message.authorImageUrl = currentUser.iconUrl;
        e.message.authorImageAltText = currentUser.iconAltText;

        setTimeout(() => {
            e.sender.scrollToBottom();
        }, 30);
    }
</script>
```

## See Also

* [Binding the Chat to Local Data]({% slug htmlhelpers_localbinding_chat %})
* [Binding the Chat for {{ site.framework }} to Remote Data (Demo)](https://demos.telerik.com/{{ site.platform }}/chat/data-binding)
* [Server-Side API of the Chat HtmlHelper](/api/chat)
{% if site.core %}
* [Server-Side API of the Chat TagHelper](/api/taghelpers/chat)
{% endif %}