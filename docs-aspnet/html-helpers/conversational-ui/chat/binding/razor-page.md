---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to configure the Telerik UI Chat component for {{ site.framework }} in Razor Pages."
previous_url: /html-helpers/conversational-ui/chat/razor-page
slug: htmlhelpers_chat_razorpage_aspnetcore
position: 4
---

# Chat in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Chat for {{ site.framework }} in Razor Pages applications.

This article showcases how to configure a basic Chat component in a Razor Pages scenario.

## Getting Started

To connect the Chat to a data set retrieved from a remote endpoint in a Razor Pages application, proceed with the following steps:

1. Specify the `Read`, `Create`, and `Update` options of the `DataSource` configuration. The URL in each of these options must refer to the method name in the `PageModel`.

    ```HtmlHelper
    @page
    @model IndexModel

    @(Html.Kendo().Chat()
        .Name("chat")
        .Height("600px")
        .Width("400px")
        .AuthorId("1")
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
            .Read(r => r.Url("/Index?handler=ReadMessages").Data("forgeryToken"))
            .Create(r => r.Url("/Index?handler=CreateMessage").Data("forgeryToken"))
            .Update(r => r.Url("/Index?handler=UpdateMessage").Data("forgeryToken"))
        )
    )
    ```
    ```TagHelper
    @page
    @model IndexModel

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
                <read url="/Index?handler=ReadMessages" data="forgeryToken"/>
                <create url="/Index?handler=CreateMessage" data="forgeryToken" />
                <update url="/Index?handler=UpdateMessage" data="forgeryToken" />
            </transport>
        </datasource>
    </kendo-chat>
    ```
    
1. Add an `AntiForgeryToken` at the top of the page.

    ```
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()
    ```

1. Send the `AntiForgeryToken` with the Read request.

    ```JavaScript
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied.

    ```JavaScript
        <script>
            function forgeryToken() {
                return {
                    __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                    additionalParameter: "test"
                }
            }
        </script>
    ```
    
1. Within the `cshtml.cs` file, add a handler method for each data operation.

    ```C# Index.cshtml.cs
        public static List<ChatMessage> messages;

        public void OnGet(string culture)
        {
            if (!String.IsNullOrEmpty(culture))
            {
                CultureInfo.DefaultThreadCurrentCulture = CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo(culture);
            }

            if (messages == null)
            {
                messages = GetData();
            }
        }

        public JsonResult OnPostReadMessages()
        {
            var dsResult = new DataSourceResult
            {
                Data = messages.Select(message => new
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
            };
            return new JsonResult(dsResult);
        }

        public JsonResult OnPostCreateMessage([DataSourceRequest] DataSourceRequest request, ChatMessage message)
        {
            message.Id = Guid.NewGuid().ToString();
            // Set the Message ID explicitly and perform a custom create operation to the database.
            return new JsonResult(new[] { message }.ToDataSourceResult(request));
        }

        public JsonResult OnPostUpdateMessage([DataSourceRequest] DataSourceRequest request, ChatMessage message)
        {
            // Perform a custom update operation to the existing database.
            return new JsonResult(new[] { message }.ToDataSourceResult(request));
        }

        private static List<ChatMessage> GetData()
        {
            return new List<ChatMessage>()
            {
                 new ChatMessage {
                     Id = "1",
                     AuthorId = "1",
                     AuthorName = "Lora",
                     AuthorImageUrl = "https://demos.telerik.com/aspnet-core/shared/web/Customers/ANATR.jpg",
                     AuthorImageAltText = "Lora's profile picture",
                     Text = "Hey Emma! I just booked my trip to Japan for next month! I'm so excited but also a bit nervous since it's my first time there. Any tips?",
                     TimeStamp = new DateTime(2025, 7, 20),
                     IsPinned = true,
                     IsTyping = false,
                     IsDeleted = false
                 },
                 new ChatMessage {
                     Id = "2",
                     AuthorId = "2",
                     AuthorName = "Emma",
                     AuthorImageUrl = "https://demos.telerik.com/aspnet-core/shared/web/Customers/DUMON.jpg",
                     AuthorImageAltText = "Emma's profile picture",
                     Text = "Don't miss the cherry blossoms if they're still blooming! And try the street food in Osaka - it's the best!",
                     TimeStamp = new DateTime(2025, 7, 20),
                     IsPinned = false,
                     IsTyping = false,
                     IsDeleted = false
                 },
                 new ChatMessage {
                     Id = "3",
                     AuthorId = "1",
                     AuthorName = "Lora",
                     AuthorImageUrl = "https://demos.telerik.com/aspnet-core/shared/web/Customers/ANATR.jpg",
                     AuthorImageAltText = "Lora's profile picture",
                     Text = "Perfect! I'm definitely going during cherry blossom season. Should I book accommodations in advance, or can I find places as I go?",
                     TimeStamp = new DateTime(2025, 7, 20),
                     IsPinned = false,
                     IsTyping = false,
                     IsDeleted = false
                 },
                 new ChatMessage
                 {
                     Id = "4",
                     AuthorId = "2",
                     AuthorName = "Emma",
                     AuthorImageUrl = "https://demos.telerik.com/aspnet-core/shared/web/Customers/DUMON.jpg",
                     AuthorImageAltText = "Emma's profile picture",
                     Text = "Definitely book in advance, especially during cherry blossom season! It gets super busy. I recommend staying in a ryokan in Kyoto for the traditional experience. Here you will find the schedule we used when we were there.",
                     TimeStamp = new DateTime(2025, 7, 20),
                     IsPinned = false,
                     IsTyping = false,
                     IsDeleted = false,
                     Files = new List<ChatFile>
                     {
                         new ChatFile
                         {
                             Name = "Sightseeing_schedule.pdf",
                             Size = 245760,
                             Extension = "pdf",
                             Type = "application/pdf"
                         },
                         new ChatFile
                         {
                             Name = "Favourite_place.jpg",
                             Size = 156000,
                             Extension = "jpg",
                             Type = "image/jpeg"
                         }
                     }
                 },
                 new ChatMessage
                 {
                     Id = "5",
                     AuthorId = "1",
                     AuthorName = "Lora",
                     AuthorImageUrl = "https://demos.telerik.com/aspnet-core/shared/web/Customers/ANATR.jpg",
                     AuthorImageAltText = "Lora's profile picture",
                     Text = "Thanks for all the advice, Emma. I'll definitely send you photos!",
                     TimeStamp = new DateTime(2025, 7, 20),
                     IsPinned = false,
                     IsTyping = false,
                     IsDeleted = false
                 }
            };
        }
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Chat](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat)
* [Server-Side HtmlHelper API of the Chat](/api/chat)
* [Server-Side TagHelper API of the Chat](/api/taghelpers/chat)
* [Knowledge Base Section](/knowledge-base)

