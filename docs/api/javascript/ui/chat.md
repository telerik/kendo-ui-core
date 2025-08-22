---
title: Chat
description: Configuration, methods and events of the Kendo UI Chat
res_type: api
component: chat
---

# kendo.ui.Chat

Represents the Kendo UI Chat component. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### allowMessageCollapse `Boolean` *(default: false)*

Enables or disables message collapsing functionality for expandable messages. When enabled, long messages can be collapsed to save screen space.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This is a very long message that will be expandable when allowMessageCollapse is enabled. Users can click to expand or collapse it to save space in the chat interface.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Short reply",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        allowMessageCollapse: true,
        authorId: "user1",
        dataSource: messagesData
    });
    </script>

### fileActions `Array`

Defines the collection of actions that will be rendered in the context menu for file attachments. Each action represents an operation that users can perform on files (download, delete, preview, etc.).

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Here's the document you requested:",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            files: [{ name: "report.pdf", size: 245760, extension: "pdf" }],
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Thanks! I'll review it.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        fileActions: [
            { name: "download", text: "Download", icon: "download" },
            { name: "delete", text: "Delete", icon: "trash" },
            { name: "preview", text: "Preview", icon: "eye" }
        ],
        authorId: "user2",
        dataSource: messagesData
    });
    </script>

### fileActions.icon `String`

Defines the icon class for the context menu action. The icon appears next to the action text in the context menu.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Check out this file:",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            files: [{ name: "image.jpg", size: 156000, extension: "jpg" }],
            timestamp: new Date(2026, 0, 1, 9, 0)
        }
    ];
    
    $("#chat").kendoChat({
        fileActions: [
            { name: "download", text: "Download", icon: "download" }
        ],
        authorId: "user1",
        dataSource: messagesData
    });
    </script>

### fileActions.name `String`

Defines the name identifier for the context menu action. This is used internally to identify which action was triggered.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Document attached:",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            files: [{ name: "contract.pdf", size: 890000, extension: "pdf" }],
            timestamp: new Date(2026, 0, 1, 9, 0)
        }
    ];
    
    $("#chat").kendoChat({
        fileActions: [
            { name: "preview", text: "Preview", icon: "eye" }
        ],
        authorId: "user2",
        dataSource: messagesData
    });
    </script>

### fileActions.text `String`

Defines the display text for the context menu action. This text is shown to users in the context menu.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Here's the spreadsheet:",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            files: [{ name: "data.xlsx", size: 45000, extension: "xlsx" }],
            timestamp: new Date(2026, 0, 1, 9, 0)
        }
    ];
    
    $("#chat").kendoChat({
        fileActions: [
            { name: "download", text: "Download File", icon: "download" }
        ],
        authorId: "user2",
        dataSource: messagesData
    });
    </script>

### autoBind `Boolean` *(default: true)*

Controls whether the Chat will automatically fetch data from the data source when initialized. When set to false, you must manually call the data source's fetch() method.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        { 
            id: 1, 
            text: "Hello! How are you today?", 
            authorId: "user1", 
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0) 
        },
        { 
            id: 2, 
            text: "I'm doing great, thanks for asking!", 
            authorId: "user2", 
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5) 
        }
    ];
    
    let chat = $("#chat").kendoChat({
        autoBind: false,
        authorId: "user1",
        dataSource: messagesData
    }).data("kendoChat");
    
    // Manually fetch data later
    setTimeout(function() {
        chat.dataSource.fetch();
    }, 2000);
    </script>

### authorId `String|Number`

Specifies the unique identifier of the current user. If not set, a GUID will be generated automatically. This determines which messages are displayed as "own messages" (right-aligned) versus "other messages" (left-aligned).

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Hello from John!",
            authorId: "user-123",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Hi John! Nice to meet you.",
            authorId: "user-456",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        authorId: "user-123", // John's messages will appear as "own messages"
        dataSource: messagesData
    });
    </script>

### authorIdField `String` *(default: "authorId")*

Specifies the field name in the data source from which the message author's unique identifier will be read.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        { id: 1, text: "Hello!", userId: "user1", authorName: "John", timestamp: new Date() }
    ];
    
    $("#chat").kendoChat({
        authorIdField: "userId",
        dataSource: messagesData
    });
    </script>

### authorImageAltTextField `String` *(default: "authorImageAltText")*

Specifies the field name in the data source from which the alt text for the author's avatar image will be read.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        { 
            id: 1, 
            text: "Hello!", 
            authorId: "user1", 
            authorName: "John",
            authorImageUrl: "avatar.jpg",
            authorAltText: "John's profile picture",
            timestamp: new Date() 
        }
    ];
    
    $("#chat").kendoChat({
        authorImageAltTextField: "authorAltText",
        dataSource: messagesData
    });
    </script>

### authorImageUrlField `String` *(default: "authorImageUrl")*

Specifies the field name in the data source from which the URL for the author's avatar image will be read.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        { 
            id: 1, 
            text: "Hello!", 
            authorId: "user1", 
            authorName: "John",
            avatarUrl: "https://example.com/avatar.jpg",
            timestamp: new Date() 
        }
    ];
    
    $("#chat").kendoChat({
        authorImageUrlField: "avatarUrl",
        dataSource: messagesData
    });
    </script>

### authorNameField `String` *(default: "authorName")*

Specifies the field name in the data source from which the author's display name will be read.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        { 
            id: 1, 
            text: "Hello!", 
            authorId: "user1", 
            displayName: "John Doe",
            timestamp: new Date() 
        }
    ];
    
    $("#chat").kendoChat({
        authorNameField: "displayName",
        dataSource: messagesData
    });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source configuration or instance that contains the Chat messages. The data source should contain message objects with fields for text, author information, timestamps, and other message properties.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Welcome to our chat!",
            authorId: "admin",
            authorName: "Chat Admin",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0),
            isPinned: true
        },
        {
            id: 2,
            text: "Thank you! Excited to be here.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        },
        {
            id: 3,
            text: "Here's a document with more information:",
            authorId: "admin",
            authorName: "Chat Admin",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            files: [{ name: "welcome_guide.pdf", size: 234567, extension: "pdf" }],
            timestamp: new Date(2026, 0, 1, 9, 10)
        }
    ];
    
    $("#chat").kendoChat({
        authorId: "user2",
        dataSource: messagesData
    });
    </script>

### dir `String` *(default: "ltr")*

Specifies the text direction of the Chat. Supported values are "ltr" (left-to-right) and "rtl" (right-to-left).

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "مرحبا! هذا مثال على النص العربي في اتجاه من اليمين إلى اليسار",
            authorId: "user1",
            authorName: "أحمد",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "شكرا لك! هذا يظهر كيف يعمل النص في الاتجاه الصحيح",
            authorId: "user2",
            authorName: "فاطمة",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        dir: "rtl",
        authorId: "user1",
        dataSource: messagesData
    });
    </script>

### fileAttachment `Boolean` *(default: true)*

Enables or disables file attachment functionality in the message input.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Welcome! Note that file attachments have been disabled in this chat.",
            authorId: "admin",
            authorName: "Chat Admin",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "I understand. I'll use text messages only.",
            authorId: "user",
            authorName: "User",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        fileAttachment: false,
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### filesField `String` *(default: "files")*

Specifies the field name in the data source from which the array of files attached to a message will be read.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        { 
            id: 1, 
            text: "Check out these files!", 
            authorId: "user1", 
            authorName: "John",
            attachments: [
                { name: "document.pdf", size: 12345, extension: "pdf" }
            ],
            timestamp: new Date() 
        }
    ];
    
    $("#chat").kendoChat({
        filesField: "attachments",
        dataSource: messagesData
    });
    </script>

### filesTemplate `Function`

The template that is used to render the files in the message box when selected.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Here are some files with custom rendering:",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            files: [
                { name: "report.pdf", size: 245760, extension: "pdf" },
                { name: "image.jpg", size: 156000, extension: "jpg" }
            ],
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "The files look different with the custom template!",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        filesTemplate: function(files, downloadAll, messages, closeButton) {
            // Custom file rendering logic
            return "<div class='custom-files'><strong>Custom Files:</strong> " + files.length + " file(s)</div>";
        },
        authorId: "user2",
        dataSource: messagesData
    });
    </script>

### headerItems `Array`

Defines the collection of items that will be rendered in the Chat header. Each item represents a component or content that appears in the header area above the message list. The items follow the same structure as [AppBar items](/api/javascript/ui/appbar/configuration/items).

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Welcome to our chat!",
            authorId: "user1",
            authorName: "Support",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        }
    ];
    
    $("#chat").kendoChat({
        headerItems: [
            {
                type: "contentItem",
                template: () => "<strong>Customer Support Chat</strong>"
            },
            {
                type: "spacer"
            },
            {
                type: "contentItem",
                template: () => "<button>Button</button>"
            }
        ],
        authorId: "user2",
        dataSource: messagesData
    });
    </script>

### height `String|Number`

Sets the height of the Chat component.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This chat has a custom height of 600px. You can see how it affects the overall appearance.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "The height setting is useful for integrating the chat into different layouts.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        height: 600,
        authorId: "user1",
        dataSource: messagesData
    });
    </script>

### idField `String` *(default: "id")*

Specifies the field name in the data source from which the unique identifier for each message will be read.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        { 
            messageId: 1, 
            text: "Hello!", 
            authorId: "user1", 
            authorName: "John",
            timestamp: new Date() 
        }
    ];
    
    $("#chat").kendoChat({
        idField: "messageId",
        dataSource: messagesData
    });
    </script>

### isDeletedField `String` *(default: "isDeleted")*

Specifies the field name in the data source that indicates whether a message has been deleted.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        { 
            id: 1, 
            text: "This message was removed", 
            authorId: "user1", 
            authorName: "John",
            deleted: true,
            timestamp: new Date() 
        }
    ];
    
    $("#chat").kendoChat({
        isDeletedField: "deleted",
        dataSource: messagesData
    });
    </script>

### isPinnedField `String` *(default: "isPinned")*

Specifies the field name in the data source that indicates whether a message is pinned.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        { 
            id: 1, 
            text: "Important announcement!", 
            authorId: "user1", 
            authorName: "Admin",
            pinned: true,
            timestamp: new Date() 
        }
    ];
    
    $("#chat").kendoChat({
        isPinnedField: "pinned",
        dataSource: messagesData
    });
    </script>

### isTypingField `String` *(default: "isTyping")*

Specifies the field name in the data source that indicates whether a message is currently being typed.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        { 
            id: 1, 
            text: "This message was removed", 
            authorId: "user1", 
            authorName: "John",
            typing: true,
            timestamp: new Date() 
        }
    ];
    
    $("#chat").kendoChat({
        isTypingField: "typing",
        dataSource: messagesData
    });
    </script>

### messageActions `Array`

Defines the collection of actions that will be rendered in the context menu for messages. By default, the Chat includes four actions: Reply, Copy, Pin, and Delete. You can customize this list by providing your own actions or combining default actions with custom ones.

**Default actions:**
- `{ name: "reply", text: "Reply", icon: "undo" }`
- `{ name: "copy", text: "Copy", icon: "copy" }`
- `{ name: "pin", text: "Pin", icon: "pin" }`
- `{ name: "delete", text: "Delete", icon: "trash" }`

#### Example - Using default actions

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This message can be replied to, copied, pinned, or deleted",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Right-click on messages to see the context menu",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        // Uses default context menu actions
        authorId: "user1",
        dataSource: messagesData
    });
    </script>

#### Example - Custom actions with some defaults

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This message has custom context menu actions",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Try right-clicking to see the custom menu",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        messageActions: [
            { name: "reply", text: "Reply", icon: "undo" },        // Default action
            { name: "copy", text: "Copy", icon: "copy" },          // Default action
            { name: "forward", text: "Forward", icon: "share" }    // Custom action
        ],
        authorId: "user1",
        dataSource: messagesData,
        contextMenuAction: function(e) {
            console.log(e);
        }
    });
    </script>

### messageActions.icon `String`

Defines the icon class for the context menu action.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Right-click this message to see the context menu with a reply action that has an undo icon.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Icons make context menu actions more intuitive and visually appealing.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        messageActions: [
            { name: "reply", text: "Reply", icon: "undo" }
        ],
        authorId: "user2",
        dataSource: messagesData
    });
    </script>

### messageActions.name `String`

Defines the name identifier for the context menu action.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Right-click this message to see the forward action. The 'name' property identifies which action was clicked.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Action names are crucial for handling user interactions programmatically.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        messageActions: [
            { name: "forward", text: "Forward", icon: "share" }
        ],
        authorId: "user2",
        dataSource: messagesData
    });
    </script>

### messageActions.text `String`

Defines the display text for the context menu action.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Right-click this message to see the context menu with custom text for the copy action.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Custom text makes the actions more descriptive and user-friendly.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        messageActions: [
            { name: "copy", text: "Copy Message", icon: "copy" }
        ],
        authorId: "user2",
        dataSource: messagesData
    });
    </script>

### messageGroupTemplate `Function`

The template used to render message groups.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This is the first message in a group from John.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "This is another message from John in the same group.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 1)
        },
        {
            id: 3,
            text: "This message is from Jane, starting a new message group.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        messageGroupTemplate: function(data) {
            return "<div class='custom-message-group'>" + 
                   "<span class='custom-author'>" + data.author.name + "</span>" +
                   "<div class='custom-message-content'>" + data.message.text + "</div>" +
                   "</div>";
        },
        authorId: "user2",
        dataSource: messagesData
    });
    </script>

### messageReferenceTemplate `Function`

The template used to render message references (replies and pinned messages).

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This is the original message that can be replied to.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "This is a reply to the first message with custom reference template.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            replyToId: 1,
            timestamp: new Date(2026, 0, 1, 9, 5)
        },
        {
            id: 3,
            text: "This message is pinned and uses the reference template.",
            authorId: "admin",
            authorName: "Admin",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 10),
            isPinned: true
        }
    ];
    
    $("#chat").kendoChat({
        messageReferenceTemplate: function(data) {
            return "<div class='custom-reference'>" + 
                   "<span class='custom-reference-text'>" + data.text + "</span>" +
                   "</div>";
        },
        authorId: "user2",
        dataSource: messagesData
    });
    </script>

### messages `Object`

Allows localization of the strings that are used in the component.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Welcome! Notice the custom placeholder text and send button text.",
            authorId: "admin",
            authorName: "Admin",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Thanks! The custom messages make the interface more personalized.",
            authorId: "user",
            authorName: "User",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        messages: {
            placeholder: "Type your message here...",
            sendButton: "Send"
        },
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### messages.downloadAll `String` *(default: "Download all")*

The text for the download all files button.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Here are the documents you requested.",
            authorId: "support",
            authorName: "Support Agent",
            timestamp: new Date(2026, 0, 1, 9, 0),
            files: [
                { name: "document1.pdf", size: 1024000, url: "path/to/document1.pdf" },
                { name: "document2.pdf", size: 2048000, url: "path/to/document2.pdf" }
            ]
        }
    ];
    
    $("#chat").kendoChat({
        messages: {
            downloadAll: "Download all files"
        },
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### messages.fileButton `String` *(default: "Attach file")*

The title and aria-label for the file attachment button.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        messages: {
            fileButton: "Upload file"
        },
        authorId: "user",
        fileAttachment: true
    });
    </script>

### messages.messageListLabel `String` *(default: "Message list")*

The aria-label for the message list container.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Welcome to our chat support!",
            authorId: "support",
            authorName: "Support Agent",
            timestamp: new Date(2026, 0, 1, 9, 0)
        }
    ];
    
    $("#chat").kendoChat({
        messages: {
            messageListLabel: "Chat conversation"
        },
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### messages.otherMessageDeleted `String` *(default: "This message was removed by its sender.")*

The text displayed when another user's message has been deleted.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This message will be deleted",
            authorId: "support",
            authorName: "Support Agent",
            timestamp: new Date(2026, 0, 1, 9, 0),
            isDeleted: true
        }
    ];
    
    $("#chat").kendoChat({
        messages: {
            otherMessageDeleted: "Message was removed by the sender."
        },
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### messages.placeholder `String` *(default: "Type a message...")*

The placeholder text displayed in the message input field.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Notice the custom placeholder text in the input field below!",
            authorId: "admin",
            authorName: "Admin",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "I can see it says 'Enter your message...' instead of the default text.",
            authorId: "user",
            authorName: "User",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        messages: {
            placeholder: "Enter your message..."
        },
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### messages.selfMessageDeleted `String` *(default: "You removed this message.")*

The text displayed when the user deletes their own message.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Delete this message to see the selfMessageDeleted property.",
            authorId: "user",
            authorName: "Current User",
            timestamp: new Date(2026, 0, 1, 9, 0)
        }
    ];
    
    $("#chat").kendoChat({
        messages: {
            selfMessageDeleted: "You deleted this message."
        },
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### messages.sendButton `String` *(default: "Send message")*

The title and aria-label for the send button.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Look at the send button - it says 'Send now' instead of the default text!",
            authorId: "admin",
            authorName: "Admin",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "That's a nice customization for the send button tooltip!",
            authorId: "user",
            authorName: "User",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        messages: {
            sendButton: "Send now"
        },
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### messages.speechToTextButton `String` *(default: "Toggle speech to text")*

The title and aria-label for the speech-to-text button.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        messages: {
            speechToTextButton: "Start voice input"
        },
        authorId: "user",
        speechToText: true
    });
    </script>

### messages.pinnedMessageCloseButton `String` *(default: "Unpin message")*

The title and aria-label for the button that unpins a pinned message.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This is an important message that was pinned.",
            authorId: "support",
            authorName: "Support Agent",
            timestamp: new Date(2026, 0, 1, 9, 0),
            isPinned: true
        }
    ];
    
    $("#chat").kendoChat({
        messages: {
            pinnedMessageCloseButton: "Remove pin"
        },
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### messages.replyMessageCloseButton `String` *(default: "Remove reply")*

The title and aria-label for the button that removes a reply reference when composing a message.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "How can I help you today?",
            authorId: "support",
            authorName: "Support Agent",
            timestamp: new Date(2026, 0, 1, 9, 0)
        }
    ];
    
    $("#chat").kendoChat({
        messages: {
            replyMessageCloseButton: "Cancel reply"
        },
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### messages.fileMenuButton `String` *(default: "File menu")*

The title and aria-label for the button that opens the context menu for file attachments.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Here's the document you requested.",
            authorId: "support",
            authorName: "Support Agent",
            timestamp: new Date(2026, 0, 1, 9, 0),
            files: [{
                name: "document.pdf",
                size: 1024000,
                url: "path/to/document.pdf"
            }]
        }
    ];
    
    $("#chat").kendoChat({
        messages: {
            fileMenuButton: "File options"
        },
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### messageTemplate `Function`

The template used to render individual messages.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This message uses a custom template that shows time in HH:mm format.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 30)
        },
        {
            id: 2,
            text: "The custom template makes each message look different!",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 10, 15)
        }
    ];
    
    $("#chat").kendoChat({
        messageTemplate: function(message, replyMessage, downloadAll, messages, expandable, messageTimeFormat) {
            return "<div class='custom-message'>" + 
                   "<div class='custom-message-text'>" + message.text + "</div>" +
                   "<div class='custom-message-time'>" + kendo.toString(message.timestamp, "HH:mm") + "</div>" +
                   "</div>";
        },
        authorId: "user1",
        dataSource: messagesData
    });
    </script>

### messageTimeFormat `String` *(default: "ddd MMM dd yyyy")*

The format string used to display message timestamps.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Notice how the timestamp format is different - it shows only hours and minutes!",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 14, 30)
        },
        {
            id: 2,
            text: "Yes, the HH:mm format is much more compact and user-friendly.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 15, 45)
        }
    ];
    
    $("#chat").kendoChat({
        messageTimeFormat: "HH:mm",
        authorId: "user1",
        dataSource: messagesData
    });
    </script>

### messageToolbarActions `Array`

Defines the collection of actions that will be rendered in the message toolbar.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Hover over this message to see the custom toolbar with edit and delete actions.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "The toolbar actions make it easy to interact with messages!",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        messageToolbarActions: [
            { name: "edit", icon: "pencil" },
            { name: "delete", icon: "trash" }
        ],
        authorId: "user1",
        dataSource: messagesData
    });
    </script>

### messageToolbarActions.icon `String`

Defines the icon class for the toolbar action.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This message has a custom toolbar with an edit icon. Hover over the message to see it.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "The pencil icon makes it clear what the action does.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        messageToolbarActions: [
            { name: "edit", icon: "pencil" }
        ],
        authorId: "user1",
        dataSource: messagesData
    });
    </script>

### messageToolbarActions.name `String`

Defines the name identifier for the toolbar action.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This message has a bookmark action in its toolbar. The 'name' property is used to identify which action was clicked.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Action names are important for handling clicks in event handlers.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        messageToolbarActions: [
            { name: "bookmark", icon: "star" }
        ],
        authorId: "user1",
        dataSource: messagesData
    });
    </script>

### messageWidthMode `String` *(default: "standard")*

Controls the width mode of messages. Supported values are "standard" and "full".

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This message is displayed in full width mode, which makes it take up the entire available width of the chat container.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Full width mode is useful when you want messages to use all available space.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        messageWidthMode: "full",
        authorId: "user1",
        dataSource: messagesData
    });
    </script>

### skipSanitization `Boolean` *(default: false)*

Controls whether HTML sanitization is skipped when rendering message content. When set to `true`, the Chat component will not automatically encode HTML entities in message text, allowing for rich HTML content to be displayed. This is useful when integrating with markdown parsers or when you need to display pre-formatted HTML content.

**Warning:** Setting this to `true` can introduce security vulnerabilities if user input is not properly sanitized elsewhere in your application. Only use this option when you trust the content source or have implemented your own sanitization logic.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "<strong>Bold text</strong> and <em>italic text</em> will be rendered as HTML",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Check out this <a href='https://example.com'>link</a> in my message!",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        skipSanitization: true,
        authorId: "user1",
        dataSource: messagesData
    });
    </script>

### replyToIdField `String` *(default: "replyToId")*

Specifies the field name in the data source that contains the ID of the message being replied to.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        { 
            id: 1, 
            text: "Hello!", 
            authorId: "user1", 
            authorName: "John",
            timestamp: new Date() 
        },
        { 
            id: 2, 
            text: "Hi there!", 
            authorId: "user2", 
            authorName: "Jane",
            parentMessageId: 1,
            timestamp: new Date() 
        }
    ];
    
    $("#chat").kendoChat({
        replyToIdField: "parentMessageId",
        dataSource: messagesData
    });
    </script>

### speechToText `Boolean` *(default: true)*

Enables or disables speech-to-text functionality in the message input.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Speech-to-text functionality has been disabled in this chat. You won't see the microphone button.",
            authorId: "admin",
            authorName: "Chat Admin",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "That's fine, I can type my messages manually.",
            authorId: "user",
            authorName: "User",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        speechToText: false,
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### suggestedActionsScrollable `Boolean` *(default: false)*

Enables or disables scrollable behavior for suggested actions.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Speech-to-text functionality has been disabled in this chat. You won't see the microphone button.",
            authorId: "admin",
            authorName: "Chat Admin",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "That's fine, I can type my messages manually.",
            authorId: "user",
            authorName: "User",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5),
            suggestedActions: [
                { text: "Yes" }, { text: "No" }, { text: "Maybe" }, 
                { text: "Cancel" }, { text: "Continue" }, { text: "Help" }
            ]
        }
    ];
    $("#chat").kendoChat({
        dataSource: chatData,
        suggestedActionsScrollable: true
    });
    </script>

### suggestedActionsTemplate `Function`

The template used to render suggested actions. The `k-suggestions` class must be applied to the individual suggestion elements. The wrapping element must have the `ref-chat-suggestion-group` attribute.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "How would you like to proceed with your order?",
            authorId: "bot",
            authorName: "Order Bot",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0),
            suggestedActions: [
                { text: "Continue Shopping" },
                { text: "Checkout Now" },
                { text: "Save for Later" },
                { text: "Cancel Order" }
            ]
        }
    ];
    
    $("#chat").kendoChat({
        suggestedActionsTemplate: function(suggestions) {
            let html = "<div class='custom-actions' ref-chat-suggestion-group>";
            for (let i = 0; i < suggestions.length; i++) {
                html += "<button class='custom-action-btn k-suggestion'>" + suggestions[i].text + "</button>";
            }
            html += "</div>";
            return html;
        },
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### suggestions `Array`

Defines the collection of suggested messages that users can quickly select. These appear as clickable buttons below the message input area, allowing users to send common responses quickly.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "How would you rate our service today?",
            authorId: "support",
            authorName: "Support Agent",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "I'm happy to help with any questions!",
            authorId: "user2",
            authorName: "Customer",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        suggestions: [
            { text: "Excellent" },
            { text: "Good" },
            { text: "Average" },
            { text: "Poor" },
            { text: "I need more help" },
            { text: "Thank you" }
        ],
        authorId: "user2",
        dataSource: messagesData,
        suggestionClick: function(e) {
            console.log("User selected suggestion:", e.text);
        }
    });
    </script>

### suggestionsScrollable `Boolean` *(default: false)*

Enables or disables scrollable behavior for message suggestions.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "What would you like to do today? Notice the scrollable suggestions below:",
            authorId: "assistant",
            authorName: "Virtual Assistant",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "I'd like to check the weather please.",
            authorId: "user",
            authorName: "User",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        suggestions: [
            { text: "Check Weather" },
            { text: "Set Reminder" },
            { text: "Play Music" },
            { text: "Get News Updates" },
            { text: "Schedule Meeting" },
            { text: "Send Email" },
            { text: "View Calendar" },
            { text: "Help & Support" }
        ],
        suggestionsScrollable: true,
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### suggestionsTemplate `Function`

The template used to render message suggestions. The individual suggestion elements must have the `k-suggestion` class. The wrapping element must have the `ref-chat-suggestion-group` attribute.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "What would you like to do today? Check out the custom suggestions below:",
            authorId: "assistant",
            authorName: "Virtual Assistant",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "I'd like to check the weather please.",
            authorId: "user",
            authorName: "User",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        suggestions: [
            { text: "Check Weather" },
            { text: "Set Reminder" },
            { text: "Play Music" },
            { text: "Get News" },
            { text: "Help" }
        ],
        suggestionsTemplate: function(suggestions) {
            let html = "<div class='custom-suggestions' ref-chat-suggestion-group>";
            for (let i = 0; i < suggestions.length; i++) {
                html += "<button class='custom-suggestion-btn k-suggestion'>" + suggestions[i].text + "</button>";
            }
            html += "</div>";
            return html;
        },
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### timestampTemplate `Function` *(default: null)*

The template used to render timestamp elements that separate message groups by date. When set to null, the default timestamp logic is used which displays relative dates like "Today", "Yesterday", "Last Wednesday", or absolute dates for older messages.

The template function receives an object with `date` (parsed Date object) and `message` (current message object) properties and should return the complete HTML structure for the timestamp element.

Returning **null** or an empty string will hide the time breaks from the chat.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Good morning! How are you today?",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "I'm doing well, thanks for asking!",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 2, 10, 30)
        },
        {
            id: 3,
            text: "Did you see the news today?",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 5, 14, 15)
        }
    ];
    
    $("#chat").kendoChat({
        timestampTemplate: function(data) {
            const date = data.date;
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
            return "<div class='custom-timestamp'>" +
                "<span class='timestamp-text'>" + 
                dayNames[date.getDay()] + ", " + 
                monthNames[date.getMonth()] + " " + 
                date.getDate() + 
                "</span>" +
                "</div>";
        },
        authorId: "user2",
        dataSource: messagesData
    });
    </script>

### textField `String` *(default: "text")*

Specifies the field name in the data source from which the message text content will be read.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        { 
            id: 1, 
            content: "Hello world!", 
            authorId: "user1", 
            authorName: "John",
            timestamp: new Date() 
        }
    ];
    
    $("#chat").kendoChat({
        textField: "content",
        dataSource: messagesData
    });
    </script>

### timestampField `String` *(default: "timestamp")*

Specifies the field name in the data source from which the message timestamp will be read.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        { 
            id: 1, 
            text: "Hello!", 
            authorId: "user1", 
            authorName: "John",
            createdAt: new Date() 
        }
    ];
    
    $("#chat").kendoChat({
        timestampField: "createdAt",
        dataSource: messagesData
    });
    </script>

### width `String|Number`

Sets the width of the Chat component.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This chat has a custom width of 800px. You can adjust the width to fit your layout requirements.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "The width setting helps with responsive design and integration into different page layouts.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        width: 800,
        authorId: "user1",
        dataSource: messagesData
    });
    </script>

## Methods

### clearMessages

Clears all messages from the view without affecting the data source.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This message will be cleared when you click the button below.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "All messages will disappear from the view!",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    let chat = $("#chat").kendoChat({
        authorId: "user1",
        dataSource: messagesData
    }).data("kendoChat");
    
    // Clear messages after 3 seconds
    setTimeout(function() {
        chat.clearMessages();
    }, 3000);
    </script>

### clearPinnedMessage

Clears the currently pinned message from the chat.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This is a pinned message that will be cleared automatically after 4 seconds.",
            authorId: "admin",
            authorName: "Admin",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0),
            isPinned: true
        },
        {
            id: 2,
            text: "You can see the pinned message at the top of the chat.",
            authorId: "user",
            authorName: "User",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    let chat = $("#chat").kendoChat({
        authorId: "user",
        dataSource: messagesData
    }).data("kendoChat");
    
    // Clear pinned message after 4 seconds
    setTimeout(function() {
        chat.clearPinnedMessage();
    }, 4000);
    </script>

### clearReplyState

Clears the current reply state, removing any active reply context.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This is the original message you can reply to.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Right-click the message above to reply, then the reply state will be cleared automatically.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    let chat = $("#chat").kendoChat({
        authorId: "user2",
        dataSource: messagesData
    }).data("kendoChat");
    
    // Clear reply state after 3 seconds (if any)
    setTimeout(function() {
        chat.clearReplyState();
    }, 3000);
    </script>

### dataItem

Gets the data item (Message object) associated with a jQuery message element.

#### Parameters

##### message `jQuery`

The jQuery message element.

#### Returns

`Object` - The message data object.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This is the first message. Click this message to see its data in the console.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "This is the second message with different data.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    let chat = $("#chat").kendoChat({
        authorId: "user1",
        dataSource: messagesData
    }).data("kendoChat");
    
    // Example: Get data item of the first message
    setTimeout(function() {
        let messageElement = chat.wrapper.find(".k-message").first();
        if (messageElement.length > 0) {
            let messageData = chat.dataItem(messageElement);
            console.log("Message text:", messageData.text);
            console.log("Author:", messageData.authorName);
        }
    }, 1000);
    </script>

### destroy

Destroys the Chat component and cleans up all resources.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This chat will be destroyed after 3 seconds to demonstrate the destroy method.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "You'll see the chat component disappear when destroy() is called.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    let chat = $("#chat").kendoChat({
        authorId: "user1",
        dataSource: messagesData
    }).data("kendoChat");
    
    // Destroy the chat after 3 seconds
    setTimeout(function() {
        chat.destroy();
    }, 3000);
    </script>

### fileDataItem

Gets the file data item associated with a jQuery file element within a message.

#### Parameters

##### message `Object`

The message object containing the file.

##### file `jQuery`

The jQuery file element.

#### Returns

`Object` - The file data object.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This message has files attached. Check the console to see file data.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            files: [
                { name: "document.pdf", size: 245760, extension: "pdf" },
                { name: "image.jpg", size: 156000, extension: "jpg" }
            ],
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "The fileDataItem method helps you get file information.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    let chat = $("#chat").kendoChat({
        authorId: "user2",
        dataSource: messagesData
    }).data("kendoChat");
    
    // Example: Get file data item from the first message
    setTimeout(function() {
        let messageElement = chat.wrapper.find(".k-message").first();
        if (messageElement.length > 0) {
            let messageData = chat.dataItem(messageElement);
            let fileElement = messageElement.find(".k-chat-file").first();
            if (fileElement.length > 0) {
                let fileData = chat.fileDataItem(messageData, fileElement);
                console.log("File name:", fileData.name);
                console.log("File size:", fileData.size);
            }
        }
    }, 1000);
    </script>

### getMessageByUid

Gets a message by its unique identifier (UID).

#### Parameters

##### uid `String`

The message UID.

#### Returns

`Object` - The message object or null if not found.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This message has a specific UID that can be used to retrieve it later.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "You can use getMessageByUid to find messages by their unique identifier.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    let chat = $("#chat").kendoChat({
        authorId: "user1",
        dataSource: messagesData
    }).data("kendoChat");
    
    // Example: Try to get a message by its UID (after the component is initialized)
    setTimeout(function() {
        // In a real scenario, you would have the actual UID
        console.log("Attempting to get message by UID...");
        let message = chat.getMessageByUid("message-uid-123");
        if (message) {
            console.log("Found message:", message.text);
        } else {
            console.log("Message with UID 'message-uid-123' not found");
        }
    }, 1000);
    </script>

### getUserId

Gets the current user's unique identifier.

#### Returns

`String` - The current user's ID.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Welcome! Your user ID will be displayed in the console.",
            authorId: "admin",
            authorName: "Admin",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Thanks! I can see my user ID in the console.",
            authorId: "currentUser",
            authorName: "Current User",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    let chat = $("#chat").kendoChat({
        authorId: "currentUser",
        dataSource: messagesData
    }).data("kendoChat");
    
    // Get and display the current user's ID
    let userId = chat.getUserId();
    console.log("Current user ID:", userId);
    </script>

### postMessage

Posts a new message to the chat and renders it. The message will be automatically associated with the current user (specified by authorId) and timestamped.

#### Parameters

##### message `String|Object`

The message text or message object to post.

#### Returns

`Object` - The posted message data object.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Welcome! Feel free to ask any questions.",
            authorId: "support",
            authorName: "Support Agent",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        }
    ];
    
    let chat = $("#chat").kendoChat({
        authorId: "customer",
        dataSource: messagesData
    }).data("kendoChat");
    
    // Post a simple text message
    chat.postMessage({
        text: "Thank you for the welcome!",
        authorName: "Tom"
    });
    
    // Post a message object with additional properties
    setTimeout(function() {
        chat.postMessage({
            authorId: "support",
            text: "I have a question about your services:",
            files: [{ name: "inquiry.pdf", size: 12345, extension: "pdf" }]
        });
    }, 2000);
    </script>

### removeMessage

Removes a message from the chat by marking it as deleted.

#### Parameters

##### message `Object`

The message object to remove.

#### Returns

`Boolean` - Success status of the removal operation.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This message will be removed automatically after 3 seconds.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "This message will remain visible.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    let chat = $("#chat").kendoChat({
        authorId: "user1",
        dataSource: messagesData
    }).data("kendoChat");
    
    // Remove the first message after 3 seconds
    setTimeout(function() {
        let messageObject = chat.dataSource.get(1); // Get message with id 1
        if (messageObject) {
            let success = chat.removeMessage(messageObject);
            console.log("Message removal success:", success);
        }
    }, 3000);
    </script>

### scrollToBottom

Scrolls the chat view to the bottom to show the latest messages.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This is the first message at the top.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Here's another message in the middle.",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        },
        {
            id: 3,
            text: "And this is the latest message. The chat will scroll to show this message.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 10)
        }
    ];
    
    let chat = $("#chat").kendoChat({
        authorId: "user1",
        dataSource: messagesData,
        height: 300 // Limited height to demonstrate scrolling
    }).data("kendoChat");
    
    // Scroll to bottom after 2 seconds
    setTimeout(function() {
        chat.scrollToBottom();
    }, 2000);
    </script>

### setDataSource

Sets a new data source for the Chat component.

#### Parameters

##### dataSource `kendo.data.DataSource|Object|Array`

The new data source configuration or instance.

#### Example

    <div id="chat"></div>
    <script>
    let chat = $("#chat").kendoChat().data("kendoChat");
    let newMessagesData = [
        { id: 1, text: "New message", authorId: "user1", authorName: "John", timestamp: new Date() }
    ];
    chat.setDataSource(newMessagesData);
    </script>

### setOptions

Sets new options for the Chat component and reinitializes components as needed.

#### Parameters

##### options `Object`

The new configuration options.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This chat will change its height and message width mode after 3 seconds.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Watch how the appearance changes when setOptions is called!",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    let chat = $("#chat").kendoChat({
        authorId: "user1",
        dataSource: messagesData,
        height: 400,
        messageWidthMode: "standard"
    }).data("kendoChat");
    
    // Change options after 3 seconds
    setTimeout(function() {
        chat.setOptions({
            height: 500,
            messageWidthMode: "full"
        });
        console.log("Chat options updated!");
    }, 3000);
    </script>

### toggleSendButtonGenerating

Toggles the send button generating state, showing a loading indicator.

#### Parameters

##### generating `Boolean`

Whether to show the generating state.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Type a message and see the send button change to a loading state.",
            authorId: "bot",
            authorName: "Chat Bot",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "The generating state is useful for AI chat applications.",
            authorId: "user",
            authorName: "User",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    let chat = $("#chat").kendoChat({
        authorId: "user",
        dataSource: messagesData
    }).data("kendoChat");
    
    // Toggle generating state every 3 seconds to demonstrate
    let isGenerating = false;
    setInterval(function() {
        isGenerating = !isGenerating;
        chat.toggleSendButtonGenerating(isGenerating);
        console.log("Send button generating state:", isGenerating);
    }, 3000);
    </script>

### updateMessage

Updates an existing message with new data.

#### Parameters

##### message `Object`

The message object to update.

##### newData `Object`

The new data to apply to the message.

#### Returns

`Object` - The updated message object.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This message will be updated after 3 seconds.",
            authorId: "user1",
            authorName: "John Doe",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "Watch the first message change its text content!",
            authorId: "user2",
            authorName: "Jane Smith",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    let chat = $("#chat").kendoChat({
        authorId: "user1",
        dataSource: messagesData
    }).data("kendoChat");
    
    // Update the first message after 3 seconds
    setTimeout(function() {
        let messageObject = chat.dataSource.get(1); // Get message with id 1
        if (messageObject) {
            let updatedMessage = chat.updateMessage(messageObject, {
                text: "✅ This message has been updated successfully!"
            });
            console.log("Message updated:", updatedMessage.text);
        }
    }, 3000);
    </script>

## Events

### input

Fired when the user types in the message input field.

#### Event Data

##### e.value `String`

The current value of the input field.

#### Example

    <div id="chat"></div>
    <script>
    $("#chat").kendoChat({
        input: function(e) {
            console.log("User is typing:", e.value);
        }
    });
    </script>

### sendMessage

Fired when a message is about to be sent or when the send process is triggered. This event allows you to modify the message before it's sent or handle stop generation requests.

The `postMessage` method do not trigger this event.

#### Event Data

##### e.message `Object`

The message object being sent (if not generating).

##### e.generating `Boolean`

Indicates if this is a stop generation request.

#### Example - Basic message sending

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Welcome! Type a message below to see the sendMessage event in action.",
            authorId: "assistant",
            authorName: "Chat Assistant",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "I'm ready to chat!",
            authorId: "user",
            authorName: "Customer",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        authorId: "user",
        dataSource: messagesData,
        sendMessage: function(e) {
            console.log("Message being sent:", e.message.text);
            
            // Set author information for outgoing messages
            e.message.authorName = "Customer";
            e.message.authorImageUrl = "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg";
            
            // You can modify the message before it's sent
            if (e.message.text.toLowerCase().includes("help")) {
                e.message.text = "[HELP REQUEST] " + e.message.text;
            }
            
            // Log all message properties
            console.log("Final message object:", e.message);
        }
    });
    </script>

#### Example - Handling generating state and bot responses

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "I'm an AI assistant. Type a message and I'll respond! You can also use the send button to stop my response generation.",
            authorId: "bot",
            authorName: "AI Assistant",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "That sounds great! Let me ask you something.",
            authorId: "user",
            authorName: "User",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    let currentGenerationTimeout;
    
    $("#chat").kendoChat({
        authorId: "user",
        dataSource: messagesData,
        sendMessage: function(e) {
            if (e.generating) {
                // User clicked the send button while AI was generating - stop generation
                console.log("Stop generation requested");
                clearTimeout(currentGenerationTimeout);
                e.sender.toggleSendButtonGenerating(false);
                
                // Optionally add a message indicating generation was stopped
                e.sender.postMessage({
                    text: "Response generation stopped by user.",
                    authorId: "system",
                    authorName: "System",
                    timestamp: new Date()
                });
            } else {
                console.log("User message:", e.message.text);
                
                // Set author information
                e.message.authorName = "User";
                e.message.authorImageUrl = "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg";
                
                // Show generating state immediately
                e.sender.toggleSendButtonGenerating(true);
                
                // Simulate AI response generation with delay
                currentGenerationTimeout = setTimeout(function() {
                    e.sender.toggleSendButtonGenerating(false);
                    
                    // Safe to call postMessage here - no infinite loop risk
                    e.sender.postMessage({
                        text: "Thanks for your message: '" + e.message.text + "'. I'm processing your request and will provide a detailed response shortly.",
                        authorId: "bot",
                        authorName: "AI Assistant",
                        authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                        timestamp: new Date()
                    });
                }, 3000); // 3 second delay to simulate generation
            }
        }
    });
    </script>

### suggestionClick

Fired when a user clicks on a suggested message or action. This event is useful for tracking user engagement with suggestions and handling custom suggestion logic.

#### Event Data

##### e.text `String`

The text of the suggestion that was clicked.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "How can I assist you today? Choose from the suggestions below:",
            authorId: "bot",
            authorName: "Support Bot",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0)
        },
        {
            id: 2,
            text: "I'm looking for help with something specific",
            authorId: "user",
            authorName: "Customer",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
            timestamp: new Date(2026, 0, 1, 9, 2)
        }
    ];
    
    $("#chat").kendoChat({
        authorId: "user",
        dataSource: messagesData,
        suggestions: [
            { text: "Technical Support" },
            { text: "Billing Question" },
            { text: "General Inquiry" },
            { text: "Product Information" },
            { text: "Contact Sales" }
        ],
        suggestionClick: function(e) {
            console.log("User selected suggestion:", e.text);
            
            // Provide contextual responses based on suggestion
            let response = "";
            switch(e.text) {
                case "Technical Support":
                    response = "I'll connect you with our technical support team. What issue are you experiencing?";
                    break;
                case "Billing Question":
                    response = "I can help with billing questions. What would you like to know about your account?";
                    break;
                case "General Inquiry":
                    response = "I'm here to help! What would you like to know?";
                    break;
                default:
                    response = "Thanks for selecting '" + e.text + "'. How can I assist you further?";
            }
            
            // Simulate bot response
            setTimeout(function() {
                let chat = $("#chat").data("kendoChat");
                chat.postMessage({
                    id: Date.now(),
                    text: response,
                    authorId: "bot",
                    authorName: "Support Bot",
                    authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                    timestamp: new Date()
                });
            }, 1000);
        }
    });
    </script>

### unpin

Fired when a pinned message is unpinned. This event is triggered when a user clicks the close (X) button on a pinned message.

#### Event Data

##### e.message `Object`

The message object that was unpinned.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Welcome to our support chat! This message is pinned for important information.",
            authorId: "admin",
            authorName: "Chat Admin",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            timestamp: new Date(2026, 0, 1, 9, 0),
            isPinned: true  // This message is pinned by default
        },
        {
            id: 2,
            text: "Thank you! I can see the pinned message at the top.",
            authorId: "user",
            authorName: "Customer",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/GOURL.jpg",
            timestamp: new Date(2026, 0, 1, 9, 5)
        }
    ];
    
    $("#chat").kendoChat({
        authorId: "user",
        dataSource: messagesData,
        unpin: function(e) {
            console.log("Message unpinned:", e.message.text);
            
            // You can perform additional actions when a message is unpinned
            alert("The pinned message has been removed: " + e.message.text);
        }
    });
    
    // Click the X button on the pinned message at the top to trigger the unpin event
    </script>

### toolbarAction

Fired when a toolbar action is executed on a message. This event allows you to handle custom toolbar actions and respond to user interactions with message controls.

#### Event Data

##### e.type `String`

The type of toolbar action that was executed.

##### e.message `Object`

The message object associated with the action.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Hello! How can I help you today?",
            authorId: "support",
            authorName: "Support Agent",
            timestamp: new Date(2026, 0, 1, 9, 0)
        }
    ];
    
    $("#chat").kendoChat({
        authorId: "user",
        dataSource: messagesData,
        messageToolbarActions: [
            { name: "like", text: "Like", icon: "heart" },
            { name: "translate", text: "Translate", icon: "globe" }
        ],
        toolbarAction: function(e) {
            console.log("Toolbar action executed:", e.type);
            console.log("On message:", e.message.text);
            
            if (e.type === "like") {
                alert("You liked this message!");
            } else if (e.type === "translate") {
                alert("Translating message: " + e.message.text);
            }
        }
    });
    </script>

### fileMenuAction

Fired when a file context menu action is executed. This event allows you to handle custom file actions and respond to user interactions with file attachments.

#### Event Data

##### e.type `String`

The type of file action that was executed.

##### e.file `Object`

The file object associated with the action.

##### e.message `Object`

The message object containing the file.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Here's the document you requested:",
            authorId: "support",
            authorName: "Support Agent",
            timestamp: new Date(2026, 0, 1, 9, 0),
            files: [{
                uid: "file1",
                name: "document.pdf",
                size: 1024576,
                type: "application/pdf",
                url: "https://example.com/document.pdf"
            }]
        }
    ];
    
    $("#chat").kendoChat({
        authorId: "user",
        dataSource: messagesData,
        fileActions: [
            { name: "download", text: "Download", icon: "download" },
            { name: "preview", text: "Preview", icon: "eye" }
        ],
        fileMenuAction: function(e) {
            console.log("File action executed:", e.type);
            console.log("On file:", e.file.name);
            
            if (e.type === "preview") {
                alert("Previewing file: " + e.file.name);
            }
        }
    });
    </script>

### contextMenuAction

Fired when a message context menu action is executed. This event allows you to handle custom message actions and respond to user interactions with message context menus.

#### Event Data

##### e.type `String`

The type of context menu action that was executed.

##### e.message `Object`

The message object associated with the action.

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This is a sample message with context menu actions.",
            authorId: "support",
            authorName: "Support Agent",
            timestamp: new Date(2026, 0, 1, 9, 0)
        }
    ];
    
    $("#chat").kendoChat({
        authorId: "user",
        dataSource: messagesData,
        messageActions: [
            { name: "reply", text: "Reply", icon: "undo" },
            { name: "forward", text: "Forward", icon: "share" },
            { name: "bookmark", text: "Bookmark", icon: "star" }
        ],
        contextMenuAction: function(e) {
            console.log("Context menu action executed:", e.type);
            console.log("On message:", e.message.text);
            
            if (e.type === "forward") {
                alert("Forwarding message: " + e.message.text);
            } else if (e.type === "bookmark") {
                alert("Bookmarked message: " + e.message.text);
            }
        }
    });
    </script>

### download

Fired when a download action is triggered, either from the "Download All" button or from a file menu download action.

#### Event Data

##### e.files `Array`

Array of file objects being downloaded.

##### e.message `Object`

The message object containing the file(s).

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Here are the files you requested:",
            authorId: "support",
            authorName: "Support Agent",
            timestamp: new Date(2026, 0, 1, 9, 0),
            files: [
                {
                    uid: "file1",
                    name: "document.pdf",
                    size: 1024576,
                    type: "application/pdf",
                    url: "https://example.com/document.pdf"
                },
                {
                    uid: "file2",
                    name: "spreadsheet.xlsx",
                    size: 2048000,
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    url: "https://example.com/spreadsheet.xlsx"
                }
            ]
        }
    ];
    
    $("#chat").kendoChat({
        authorId: "user",
        dataSource: messagesData,
        download: function(e) {
            if (e.files) {
                // Download All button was clicked
                console.log("Downloading all files:", e.files.length + " files");
                e.files.forEach(file => {
                    window.open(file.url, '_blank');
                });
            } else if (e.file) {
                // Individual file download from context menu
                console.log("Downloading file:", e.file.name);
                window.open(e.file.url, '_blank');
            }
        }
    });
    </script>
