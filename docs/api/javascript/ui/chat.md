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


<div class="meta-api-description">
Enable or disable automatic collapsing of lengthy chat messages to manage vertical space and enhance readability in conversation views, allowing users to toggle expanded or condensed message formats; configure whether long text entries appear truncated with a clickable option to reveal the complete content or display fully expanded messages by default, optimizing chat interfaces for cleaner, more compact presentation and improved user experience with overflow control and expandable message handling.
</div>

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


<div class="meta-api-description">
Set or customize file attachment options in chat interfaces by defining available file-related commands like download, delete, preview, open, or share within context menus. Control or configure the set of user actions applicable to files embedded in chat messages, including buttons with custom labels, icons, event handlers, or callbacks. Enable, modify, or adjust file operation menus for attachments in conversational UI components by specifying which interactions users can perform on files, such as viewing previews, removing attachments, saving files locally, or triggering custom functions when interacting with file items.
</div>

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


<div class="meta-api-description">
Customize or configure the icon displayed for file-related actions within chat message context menus by specifying a CSS icon class, enabling control over the visual appearance of file operation buttons or menu items next to their text labels, supporting settings during component initialization to change, set, or update the icon representation for file actions such as download, upload, preview, or share within chat interfaces.
</div>

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


<div class="meta-api-description">
Set or configure a unique identifier or label for actions within a chat context menu to enable detection, handling, and differentiation of which menu item or command was triggered during event processing or interaction logic. This facilitates recognizing specific user selections, customizing command responses, associating action callbacks, and managing context-sensitive operations by assigning distinct names or keys to individual chat menu options, thereby supporting precise control and tracking of user-initiated commands or menu choices in chat interfaces.
</div>

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


<div class="meta-api-description">
Customize or set the display label, caption, or text for file context menu actions within chat interfaces, enabling localization, text overrides, dynamic string binding, or changing menu item wording for file-related options in chat components. Adjust, configure, or control the names and labels shown in file action menus to suit language preferences, customize UI text, or provide contextual and user-specific menu item descriptions within chat environments.
</div>

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


<div class="meta-api-description">
Configure automatic or manual data loading and binding for chat message retrieval by enabling or disabling the initial fetch from the data source upon component setup, allowing control over when messages are loaded, whether to preload conversations automatically, manage deferred loading scenarios, trigger manual data fetches to populate chat content, or preconfigure the data source before binding, useful for optimizing data flow, controlling network requests, and customizing message synchronization behavior in chat interfaces.
</div>

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


<div class="meta-api-description">
Set or configure the unique identifier for the current user to distinguish their messages in chat interfaces, enabling control over message alignment and styling based on user identity. Assign or customize the user ID as a string or number to mark messages as authored by oneself, facilitating differentiation between your own messages and others’, and ensuring correct rendering such as right-aligned for own messages and left-aligned for others. Handle scenarios including automatic ID generation if not explicitly set, user-specific message highlighting, message ownership detection, and filtering or grouping conversations by sender identity within chat components or real-time messaging systems.
</div>

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


<div class="meta-api-description">
Configure the field that identifies the unique author or user ID within message data to link messages with specific user profiles, accounts, or avatars, enabling matching, binding, or mapping of chat messages to their respective senders by specifying the data attribute that holds the author's identifier, user key, or sender ID. This setting supports associating messages with user identity data for personalization, filtering, or display purposes in chat interfaces, helping developers control which property in the message payload corresponds to the message author or sender for accurate user-message association and rendering.
</div>

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


<div class="meta-api-description">
Configure or set the alternative text for avatar images by specifying the data field that holds descriptive text for author profile pictures, enabling screen reader support, accessibility labels, and custom alt attributes for user avatars in messaging or chat interfaces. Control and map image alternative text dynamically from your message data source, improving assistive technology compatibility, accessibility compliance, and descriptive content presentation for user profile visuals. Adjust or bind avatar image alt descriptions using customizable data properties to enhance usability and accessibility in chat or conversation UIs.
</div>

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        { 
            id: 1, 
            text: "Hello!", 
            authorId: "user1", 
            authorName: "John",
            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
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


<div class="meta-api-description">
Set or specify the data source field that holds the URL for each message sender’s avatar image to enable displaying user profile pictures alongside chat messages; control, configure, or map the author image link by defining the field name containing the avatar path, profile photo URL, user image reference, or sender’s picture location so that chat interfaces can retrieve and render the correct visual identity for message authors from your dataset.
</div>

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        { 
            id: 1, 
            text: "Hello!", 
            authorId: "user1", 
            authorName: "John",
            avatarUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
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


<div class="meta-api-description">
Specify or configure the data attribute or key that holds the sender's display name, user name, or author identifier within your chat or messaging data source to enable the system to correctly retrieve, display, and show readable participant names in chat conversations and message threads. This includes mapping the user display label, nickname, or any string field associated with the message author for proper rendering, enabling user-friendly sender identification, controlling which data property represents the message creator, and supporting customization of author name fields during integration or initialization of chat components.
</div>

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


<div class="meta-api-description">
Configure and connect message retrieval and synchronization by setting up data sources that handle loading, sorting, updating, and rendering chat messages with text content, authorship details, timestamps, and additional metadata; this enables dynamic message fetching, real-time updates, message CRUD management, and seamless integration of message streams through customizable data inputs or data source instances for chat interfaces.
</div>

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


<div class="meta-api-description">
Set or control the text direction and user interface alignment of chat elements to support left-to-right or right-to-left reading flows, enable localization for languages with different writing directions, adjust message display orientation, configure bidirectional text handling, switch UI layout from LTR to RTL or vice versa, manage chat content alignment for internationalization, customize text flow in chat components, and support diverse language scripts and cultural formatting preferences.
</div>

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


<div class="meta-api-description">
Control enabling or disabling file upload features within chat messages, configure whether users can attach documents, images, or other files through the chat input, set permissions to permit, block, or restrict file sharing in conversations, manage attachment capabilities during chat session setup, toggle file inclusion options for messaging interfaces, handle file input activation within chat components, adjust settings to allow or prevent users from sending attachments, customize chat input behavior regarding file submission, enable or disable drag-and-drop or browse-to-upload file functions, and govern user ability to include various file types within chat communications.
</div>

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


<div class="meta-api-description">
Configure the field name that identifies or maps to the list of file attachments, message files, or file metadata arrays within messaging data sources to enable message attachment handling, reading, displaying, or processing in chat components, supporting binding and integration with various message attachment structures and formats for file payloads associated with each chat message.
</div>

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


<div class="meta-api-description">
Control and customize how file attachments appear within chat messages by specifying a template that defines the layout, including file icons, names, previews, or interactive elements; configure the presentation of uploaded files using custom markup, HTML, or templating approaches to tailor the display of attached documents, images, or other media within chat interfaces, enabling enhanced visual control over attachment rendering and user interaction in messaging environments.
</div>

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


<div class="meta-api-description">
Configure and customize the top section of the chat interface by setting the arrangement and content of elements displayed above messages, including buttons, icons, titles, avatars, menus, or custom components. Control which controls and visual items appear in the chat header, define header elements similar to app bar items, manage interactive items like menus or actions, and tailor the header layout to include various components such as user avatars, navigation icons, or custom templates displayed above the message list. Adjust header controls for chat UI, specifying collections of interactive or static items to shape the chat’s top bar appearance and functionality.
</div>

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


<div class="meta-api-description">
Adjust or set the vertical dimension, height, or size of the chat interface to fit different layouts, containers, or responsive designs, including fixed pixel values, percentages, or CSS units; configure scrolling behavior by controlling the component’s height to enable content overflow, embed chat windows within other UI elements, customize chat area size dynamically, resize chat boxes for better UX, manage vertical space allocation, and specify heights using numeric pixels or CSS-style strings for seamless integration and layout control.
</div>

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


<div class="meta-api-description">
Specify or configure the unique identifier field for messages in chat data to enable message tracking, synchronization, and update matching; set the key or property name that holds each message’s ID so the chat system can correctly identify, compare, control, and maintain distinct messages during rendering, data binding, or real-time updates.
</div>

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


<div class="meta-api-description">
Configure the field name that the chat system uses to identify messages marked as deleted, enabling control over how deleted or removed messages are recognized, displayed, filtered, or handled without modifying the original data. This setting allows you to specify which data property indicates a message’s deleted status for rendering, conditional formatting, filtering out deleted content, or triggering specific actions based on deletion state, supporting use cases like soft-delete flags, message visibility toggling, and custom deleted message logic within chat interfaces.
</div>

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


<div class="meta-api-description">
Configure or specify the data attribute or field that identifies whether a chat message is pinned, enabling filtering, sorting, displaying, managing, or toggling pinned messages within chat interfaces and components. Control and bind the property that marks messages as favorites, important, or pinned, facilitating UI logic, conditional rendering, search queries, or message state management based on pin status captured from your data source or message payload. Set or map the indicator for pinned or prioritized messages to support features like pinning, highlighting, or quick access in chat applications and real-time messaging layouts.
</div>

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


<div class="meta-api-description">
Configure or set the field name that tracks typing status within message data to enable real-time typing indicators, control or update typing state dynamically tied to chat messages, detect when users are actively composing messages, bind or map typing flags from data sources, manage or monitor live typing activity, synchronize typing indicators with message updates, and implement responsive typing feedback based on message field values indicating current typing states.
</div>

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

Defines the collection of actions that will be rendered in the context menu for messages. By default, the Chat includes four actions: Reply, Copy, and Pin. You can customize this list by providing your own actions or combining default actions with custom ones.

**Default actions:**
- `{ name: "reply", text: "Reply", icon: "undo" }`
- `{ name: "copy", text: "Copy", icon: "copy" }`
- `{ name: "pin", text: "Pin", icon: "pin" }`
- `{ name: "delete", text: "Delete", icon: "trash" }`


<div class="meta-api-description">
Control, customize, and configure the set of interactive commands or operations available in a chat message’s context menu, including adding new actions, removing default options, rearranging the order of reply, copy, pin, delete, or other message commands, enabling personalized or dynamic message handling, tailoring message command menus during initialization by supplying custom action objects or mixing default and custom actions, adjusting the behavior and appearance of context menus for messages to suit user interface requirements, managing message interaction options like replies, copying text, pinning important messages, or deleting messages through a flexible configurable actions collection.
</div>

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


<div class="meta-api-description">
Configure or customize the icon displayed for message context menu actions in chat interfaces by specifying CSS class names, enabling control over font icons or custom styling for message action buttons, setting or overriding default icons during chat component setup, adjusting the visual representation of interactive message options, and tailoring message action icons to match branding or UI themes through flexible CSS class assignment.
</div>

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


<div class="meta-api-description">
Define or configure a unique action identifier for chat context menu options to track user selections, link actions to event handlers or command logic, reference specific message actions in callbacks, differentiate multiple chat actions during updates, and manage chat message interaction controls effectively through customizable action names.
</div>

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


<div class="meta-api-description">
Customize or localize the label text displayed for actions in a chat message context menu, enabling control over right-click menu options, setting custom action names, defining or translating menu item labels, and configuring the text shown for message interaction buttons within chat interfaces.
</div>

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


<div class="meta-api-description">
Control and customize the display and layout of clustered or grouped chat messages by configuring templates that define how message collections, headers, avatars, timestamps, and conversation threads appear together. Enable customization of message group rendering using template strings or functions to adjust grouping style, display author info, aggregate timestamps, cluster messages visually, format chat bubbles, and modify the structure of combined message blocks for chat interfaces, conversation threads, or instant messaging features.
</div>

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


<div class="meta-api-description">
Control and customize the display of referenced messages such as replies and pinned items within chat interfaces by configuring templates that define the structure, layout, and content of message references. Enable adjustment of appearance, inline previews, contextual metadata display, and formatting of quoted or linked messages to tailor how users see replies and referenced content in conversations. Set or modify message reference layouts to improve user experience in chat applications by controlling visual rendering, embedded details, and summary snippets of replied or pinned messages.
</div>

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


<div class="meta-api-description">
Control and customize user interface text, labels, prompts, and message strings within chat components by setting localized content for different languages and regions, enabling dynamic replacement or configuration of messages, interface wording, and textual elements to match user locale preferences, support internationalization, translation, and adaptation of chat UI wording, including custom error messages, button labels, system prompts, and conversational text across multiple locales.
</div>

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


<div class="meta-api-description">
Configure or customize the text label, caption, or display string for the button that lets users download all chat messages or conversation history at once, enabling control over the button wording, language localization, interface text, or UI prompt for bulk export, retrieve, save, or download-all functionality within chat applications or messaging components.
</div>

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


<div class="meta-api-description">
Customize the label, title, and accessible aria-label for the file upload or attach button within chat interfaces, enabling control over button text, screen reader descriptions, and user interface prompts related to attaching files, documents, or media in messaging features, useful for localization, accessibility enhancements, and user experience adjustments in chat components.
</div>

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


<div class="meta-api-description">
Set or customize the accessible label for the chat message list container to support screen readers and improve localization, enabling developers to provide descriptive aria-labels for messages display, chat conversation content, message history sections, or chat log areas. Configure or control the assistive technology label text for the message list to enhance accessibility compliance and support multiple languages for users relying on screen readers or other accessibility tools in chat interfaces.
</div>

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


<div class="meta-api-description">
Customize or configure the notification text displayed in chat interfaces when messages from other users are removed or deleted, control how deleted messages from participants appear with tailored placeholder text, set alternative wording for alerts indicating that someone else’s chat message was removed, enable personalized or localized phrases signaling another user’s message deletion, and manage how chat conversations indicate that peer messages have been erased or retracted by others.
</div>

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


<div class="meta-api-description">
Set or customize the input field’s placeholder text in chat interfaces to display localized, user-friendly prompts or hints for typing messages, enabling configuration of placeholder content that guides users on what to enter in chat message boxes, supporting multiple languages and dynamic text placeholders for enhanced user experience and clarity in messaging input areas.
</div>

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


<div class="meta-api-description">
Control the display text or notification shown in a chat interface when a user deletes their own message, customize how deleted messages appear, set or configure the placeholder or alert for self-deleted messages, manage text visibility or replacement for user-initiated message deletions, enable editing of the message deletion text shown to oneself after removing a message, handle display content for self-message removal events, adjust or override default messages indicating your own message was deleted in chat conversations.
</div>

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


<div class="meta-api-description">
Control and customize the chat interface send button text, including the visible label and accessibility aria-label, by setting localized messages or translations for the button’s title and screen reader description, enabling internationalization and user-specific language support for sending messages, updating the send button’s displayed caption, tooltip, or accessibility attributes, and configuring the send action prompts shown to end users in various languages or locales.
</div>

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


<div class="meta-api-description">
Customize, translate, or configure the display text and accessibility label for the voice input toggle in chat interfaces, enabling localization and control over the button's title and ARIA attributes to support speech-to-text functionality, voice recognition activation, microphone button labeling, screen reader-friendly descriptions, and multilingual user interface adaptation for conversational or real-time dictation features.
</div>

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


<div class="meta-api-description">
Control the text displayed on the button used to unpin or remove pinned messages in chat interfaces, including setting accessibility labels like aria-label for better screen reader support, configuring the button’s title attribute for tooltip or hover text, customizing or localizing the button description for user interface clarity, enabling precise control over the pin removal action’s accessible naming, and adjusting how the close or unpin button is announced or described in assistive technologies.
</div>

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


<div class="meta-api-description">
Customize or localize the close button used to remove or dismiss a chat reply message by configuring its tooltip title and accessibility label, including options to set ARIA attributes for improved screen reader support, enabling control over how reply removal buttons are labeled, described, or announced in chat interfaces for better usability, internationalization, and accessibility compliance.
</div>

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


<div class="meta-api-description">
Control and customize the label, title, or accessible aria-label for the file attachment menu button within chat interfaces, enabling configuration of the context menu’s button text and screen reader description for file uploads, attachment options, or file selection controls in messaging environments.
</div>

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


<div class="meta-api-description">
Customize message rendering by setting templates or layouts for chat messages, enabling control over how individual messages display avatars, timestamps, attachments, text, and other content elements; configure message appearance, structure, styling, or formatting within the chat interface to create personalized, dynamic message presentations or custom components for chat bubbles, message items, or conversation flows.
</div>

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


<div class="meta-api-description">
Customize the display format of message timestamps by specifying preferred date and time patterns to control how times appear in chat messages; adjust, set, or configure timestamp layouts using standard or custom format strings like hours and minutes, full date, or shorthand notations to tailor the time presentation on messages, enabling precise control over chat timestamp appearance for localization, readability, or style preferences.
</div>

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


<div class="meta-api-description">
Control and customize the message input toolbar by configuring, setting, or modifying the available buttons, icons, controls, actions, commands, and their order for chat interfaces, including adding custom or built-in toolbar buttons, defining click handlers, arranging toolbar actions, enabling specific message tools, and tailoring toolbar functionality to match user needs or application requirements.
</div>

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


<div class="meta-api-description">
Set or customize the visual icon in chat message toolbar actions by specifying CSS class names or custom glyph identifiers, including font icon libraries like Font Awesome or Kendo UI, SVG-based icons, sprite icons, or any CSS-based icon styling. Control and configure the appearance of toolbar action icons during chat initialization, enabling developers to apply, change, or override icon sets, customize message action visuals, swap default icons with custom designs, and manage icon styling independently from labels or functionality to integrate consistent or branded iconography within chat interfaces.
</div>

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

### messageToolbarActions.text `String`

Defines the text for the toolbar action.


<div class="meta-api-description">
Set or customize the text labels, captions, or titles for message toolbar actions in chat interfaces to enable localization, internationalization, translation, or modification of button text, action names, commands, or menu options within chat toolbars, supporting different languages, regional settings, and personalized wording for chat interaction controls.
</div>

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "This message has a custom toolbar action with text",
            authorId: "assistant",
            authorName: "Virtual Assistant",
            timestamp: new Date()
        }
    ];
    
    $("#chat").kendoChat({
        messageToolbarActions: [
            { 
                name: "bookmark", 
                icon: "star", 
                text: "Save Message"
            }
        ],
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### messageToolbarActions.name `String`

Defines the name identifier for the toolbar action.


<div class="meta-api-description">
Configure or define a unique identifier for actions within the message toolbar of a chat interface, enabling developers to reference, bind event handlers, map commands, apply custom styles, target specific toolbar buttons, or programmatically control and customize the behavior of chat toolbar actions. This naming setting facilitates precise interaction management, action tracking, command assignment, and styling control within chat components, making it easier to link code logic or UI customization to specific message toolbar elements.
</div>

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


<div class="meta-api-description">
Adjust or configure the width and layout behavior of chat message bubbles to control how wide each message appears within the chat interface, enabling options to constrain messages to typical bubble sizes or expand them to fill the entire container horizontally; this setting supports toggling between standard fixed-width message displays and full-width stretching for flexible, responsive chat layouts, useful for customizing message appearance, alignment, and visual spacing in messaging UIs or chat applications.
</div>

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


<div class="meta-api-description">
Control whether chat messages render raw or rich HTML by disabling automatic HTML entity encoding; enable skipping sanitization to allow displaying pre-formatted HTML content or HTML generated by markdown processors without being escaped, facilitating custom HTML rendering and styling within chat interfaces. Configure this setting to bypass default message sanitization for trusted content sources or when you have implemented your own input validation and sanitizing mechanisms, preventing entity encoding that would otherwise transform characters like <, >, and & into safe text. Ideal for developers wanting to render embedded HTML, advanced formatting, or third-party HTML outputs inside chat messages while managing security risks and ensuring content integrity through manual sanitization or trusted input validation. This option is crucial for use cases involving rich text, HTML injection prevention strategies, content rendering control, and safe display of complex message formatting within chat applications.
</div>

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


<div class="meta-api-description">
Configure the field used to identify which message a reply corresponds to in order to create and display threaded conversations, link messages in reply chains, enable parent-child message relationships, map reply references from server or local data sources by specifying the reply ID field name, control message threading behavior, set or customize reply linking by pointing to the message ID field that represents the replied message within your chat data structure.
</div>

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


<div class="meta-api-description">
Enable or disable voice dictation and speech recognition in chat message inputs to convert spoken words into text, supporting hands-free communication, voice-to-text transcription, speech input configuration, accessible and hands-free messaging, real-time audio-to-text conversion, controlling microphone-based text entry, speech-enabled chat interfaces, voice command transcription within the chat composer, and managing voice input for seamless message composition.
</div>

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


<div class="meta-api-description">
Enable or disable scrolling for the list of suggested actions in chat interfaces to manage overflowing buttons or options, enhance usability on small or constrained screens, control how users navigate through multiple recommendations or quick replies, set scroll behavior to improve accessibility and user interaction with dynamic or lengthy suggested response lists, configure the chat action area to be fixed or scrollable depending on layout needs, handle situations with numerous actionable items appearing in chat suggestions, adjust UI responsiveness to maintain smooth navigation through suggested commands or options within messaging components.
</div>

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
        dataSource: messagesData,
        suggestedActionsScrollable: true
    });
    </script>

### suggestedActionsTemplate `Function`

The template used to render suggested actions. The `k-suggestions` class must be applied to the individual suggestion elements. The wrapping element must have the `ref-chat-suggestion-group` attribute.


<div class="meta-api-description">
Customize the presentation and interaction of suggested replies, quick actions, or clickable options by providing a template or HTML markup that controls the layout, styling, and user interface elements such as buttons, chips, or list items. Enable custom formatting, arrangement, and behavior for chat suggestion components by setting up a structured template with appropriate CSS classes and attributes to modify how suggested actions appear and function within conversational or chat-based interfaces. Configure and tailor the rendering of suggestion elements to match custom UI requirements for action prompts, ensuring interactive elements are properly grouped and styled for seamless integration in chat workflows.
</div>

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


<div class="meta-api-description">
Enable quick-reply buttons or suggested message options that offer users predefined, common, or contextually relevant responses beneath the chat input field, allowing fast selection and automatic insertion for streamlined messaging, configurable as clickable shortcuts to improve user interaction, response speed, and message flow within chat interfaces.
</div>

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Hello! How can I help you today?",
            authorId: "assistant",
            authorName: "Virtual Assistant",
            timestamp: new Date()
        }
    ];
    
    $("#chat").kendoChat({
        suggestions: [
            { text: "I need help with my order" },
            { text: "Tell me about your services" },
            { text: "Contact support" }
        ],
        authorId: "user",
        dataSource: messagesData,
        suggestionClick: function(e) {
            console.log("User selected suggestion:", e.text);
        }
    });
    </script>

### suggestions.text `String`

The text of the suggestion.


<div class="meta-api-description">
Configure or set the visible label, displayed string, or message content for suggestion items, quick replies, chat autocomplete options, or interactive prompts in chat interfaces. Control how suggestion texts, reply buttons, dynamic hints, or autofill choices appear within chat components by specifying the exact string shown to users. Enable customization of suggestion labels, message snippets, or quick-reply text displayed in suggestion lists or chat UI elements to tailor user interaction and improve conversational flow.
</div>

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


<div class="meta-api-description">
Control or configure chat message suggestion overflow by enabling scrollable behavior for the suggestions list, allowing users to scroll through suggested responses or completions when the number of items exceeds the visible area. Enable or disable scrolling in message suggestion containers to prevent the list from expanding indefinitely and to improve user experience in chat interfaces with many suggestions. Adjust behavior for suggestion visibility, manage display overflow, customize interaction with message completions, and set scrolling preferences for suggestions shown in chat components.
</div>

#### Example

    <div id="chat"></div>
    <script>
    let messagesData = [
        {
            id: 1,
            text: "Choose from the scrollable suggestions below:",
            authorId: "assistant",
            authorName: "Virtual Assistant",
            timestamp: new Date()
        }
    ];
    
    $("#chat").kendoChat({
        suggestions: [
            { text: "Option 1" },
            { text: "Option 2" },
            { text: "Option 3" },
            { text: "Option 4" },
            { text: "Option 5" },
            { text: "Option 6" }
        ],
        suggestionsScrollable: true,
        authorId: "user",
        dataSource: messagesData
    });
    </script>

### suggestionsTemplate `Function`

The template used to render message suggestions. The individual suggestion elements must have the `k-suggestion` class. The wrapping element must have the `ref-chat-suggestion-group` attribute.


<div class="meta-api-description">
Customize how message suggestions appear in chat interfaces by setting up a tailored HTML template that controls the layout, styling, and behavior of suggestion items. Enable configuring or overriding the default rendering of suggestion lists by providing markup that includes necessary classes and attributes for each suggestion element and the surrounding container. Control the formatting, add custom attributes, event listeners, or interactive elements to suggestion entries in chat components, allowing fine-tuning of appearance, user interaction, and data binding for suggested messages or auto-complete options. Modify, style, or extend suggestion displays during chat initialization to deliver personalized user experiences and dynamic suggestion content presentation.
</div>

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


<div class="meta-api-description">
Control and customize the appearance of date separators between chat message groups by providing a function or template that generates HTML for timestamps, allowing full flexibility in formatting date and time displays based on message data, including options to show relative dates like today or yesterday, absolute dates for older messages, or completely hide time breaks by returning null or empty values, enabling developers to configure, override, and fine-tune timestamp rendering logic according to custom design, localization, or user experience requirements within chat interfaces.
</div>

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


<div class="meta-api-description">
Specify or configure the field name within your data structure or dataset that holds the actual message content, enabling the chat interface to extract, display, bind, or read text messages dynamically from arrays, lists, or data source objects during rendering or data processing. This setting controls how message text is identified, mapped, or retrieved from each data item when showing conversation threads, supporting customization for various data formats, property names, or backend APIs to ensure the chat component correctly interprets and presents chat message strings in diverse integration scenarios.
</div>

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


<div class="meta-api-description">
Control how message times are identified by setting or configuring the specific data field that contains timestamp information, enabling accurate display, sorting, filtering, and handling of chat messages by their sent or received times. Set the time key, map time attributes, define which property represents message time, or specify the field used for time-based operations and ordering within messaging or chat interfaces to ensure proper chronological arrangement and temporal context.
</div>

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


<div class="meta-api-description">
Adjust or configure the horizontal dimension, size, or width of the chat interface to control layout, placement, or responsiveness within containers, including setting fixed, percentage, or dynamic widths during initialization or runtime to manage how the chat component appears, scales, or adapts across different screen sizes or parent elements for precise UI arrangement and design flexibility.
</div>

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


<div class="meta-api-description">
Clear all visible chat messages from the user interface or chat window without deleting or altering the original message data, message list, or server-stored conversations, enabling developers to reset the chat display, refresh the visible message history, temporarily hide message threads, or force a re-render of the chat view after dynamic updates or programmatic changes to message data, controls to clear rendered messages while keeping message objects and data intact, useful for managing chat UI state, refreshing message displays, hiding chat content temporarily, or updating visible messages without affecting stored chat records.
</div>

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


<div class="meta-api-description">
Clear or unpin the currently pinned message in a chat interface by removing the pinned status from the active message, resetting pinned content, freeing up the pinned message slot, and updating the chat display so no message appears pinned. Enable programmatic control to unpin, remove, reset, or clear pinned messages in messaging or chat UI components, allowing developers to manage pinned message state dynamically during conversations or interactions.
</div>

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


<div class="meta-api-description">
Cancel or reset any active message reply mode to stop quoting or replying to messages, clear reply indicators or reply metadata, remove any reply context from the chat input or composer, revert the chat interface to normal messaging state, enable sending new standalone messages instead of replies, deactivate or clear reply selection, disable reply mode, and ensure subsequent messages are treated as fresh messages without inherited reply references or quoted content.
</div>

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


<div class="meta-api-description">
Access or retrieve the message object, message data, or underlying data model tied to a specific chat message element or DOM node in a chat interface; fetch or map the original data item, conversation message, or data structure linked to a rendered message element for reading message content, inspecting message properties, synchronizing message status, or manipulating the message’s bound data within chat components or frameworks using selectors or references to message elements.
</div>

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


<div class="meta-api-description">
Remove or delete a chat instance entirely from the webpage by fully cleaning up associated resources, including eliminating all user interface elements, detaching event listeners, stopping ongoing timers and network calls, unsubscribing from data streams, and resetting internal states to avoid memory leaks or lingering processes. This method ensures complete teardown and disposal of chat components, preventing residual references, allowing developers to safely clear and remove chat objects, disable chat functionality, and manage lifecycle or cleanup operations for chat widgets without leftover side effects.
</div>

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


<div class="meta-api-description">
Retrieve, access, or obtain the underlying file object linked to a chat message attachment by passing the file’s element representation, enabling inspection of its metadata, fetching download URLs, managing file data, controlling attachment actions such as removal or download, and programmatically interacting with files embedded within chat messages through element references, file handlers, or data objects associated with attached files in messaging interfaces.
</div>

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


<div class="meta-api-description">
Fetch or retrieve a single chat message using its unique identifier, allowing access to the exact message data by ID, message UID lookup, or message key for purposes like reading, editing, updating, referencing, or navigating to a particular message within a conversation thread or chat interface. This method supports precise message retrieval by unique ID across chat histories, enabling developers to query, modify, or highlight individual messages based on identifiers.
</div>

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


<div class="meta-api-description">
Retrieve the unique identifier or user ID of the current active user to track message ownership, sender identity, user presence, or auditing purposes, enabling integration with authentication systems, backend services, or user-specific data retrieval; obtain the current user’s ID to associate messages, set sender metadata, verify user identity, or manage session-based actions within chat or messaging interfaces.
</div>

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


<div class="meta-api-description">
Send a new chat message, add text or content to the conversation flow, push updates to the chat window instantly, display user messages in real-time, post and render messages dynamically in the chat interface, append chat entries with timestamps and author identification, enable message posting with immediate visual feedback, push messages as the current user into the chat stream, update conversation logs by sending and showing new chat content right away, control online chat message posting and display with automatic user attribution and time tagging.
</div>

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


<div class="meta-api-description">
Control message deletion and moderation within chat conversations by marking individual messages as removed or hidden, enabling features like content moderation, message hiding, or updating chat UI to reflect deleted items. Configure or trigger removal of chat messages after initialization to update message status, support moderation workflows, filter out inappropriate content, manage visibility of specific chat entries, and ensure real-time synchronization of message removal across participants. This functionality supports use cases such as hiding offensive messages, moderating conversations dynamically, or programmatically managing message states in chat interfaces.
</div>

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


<div class="meta-api-description">
Automatically scroll chat interface or conversation window to the latest message, enabling programmatic control over message view positioning to keep the newest content visible after adding messages, loading chat history, opening the chat window, or updating conversations; use scroll commands or functions to jump to the bottom of message lists, maintain real-time chat updates, ensure the interface shows most recent conversations without manual scrolling, and provide consistent user experience with automatic viewport adjustment to the newest chat entries.
</div>

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


<div class="meta-api-description">
Update or change the source of messages displayed in a chat interface dynamically by configuring, setting, or replacing the data input at runtime. This method enables binding chat content to various data formats such as JavaScript arrays, data source objects, or configuration settings, allowing live refreshes, reloads, or message feed reconnections without restarting the component. It supports adjusting, switching, or resetting message origins to control real-time updates, handle incoming data changes, or refresh the conversation stream effortlessly after initialization.
</div>

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


<div class="meta-api-description">
Modify chat settings dynamically by configuring or updating options, adjusting layout and behavior, changing data bindings, reinitializing internal components, applying new parameters to the active chat instance, enabling runtime customization, reconfiguring chat appearance and interactions without full component reload, controlling chat functionality on the fly, refreshing chat internals with updated configurations, and setting or overriding chat parameters after initialization to reflect immediate changes.
</div>

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


<div class="meta-api-description">
Control the send button’s loading or busy state during asynchronous message sending or preparation by toggling its visible progress indicator, enabling or disabling the button to prevent multiple submissions, synchronizing UI feedback with ongoing network operations, managing user experience by showing a generating or working animation, and avoiding duplicate sends by dynamically updating the button’s active or disabled status while chat messages are being processed or sent.
</div>

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


<div class="meta-api-description">
Modify or edit the content, metadata, or fields of an existing chat message by updating message data, enabling replacement or merging of message properties, controlling message updates, refreshing or re-rendering messages in the chat interface, handling message edits, and synchronizing updated message state within the chat component to reflect changes instantly.
</div>

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
                text: "This message has been updated successfully!"
            });
            console.log("Message updated:", updatedMessage.text);
        }
    }, 3000);
    </script>

## Events

### input

Fired when the user types in the message input field.


<div class="meta-api-description">
Capture and handle user typing activity within chat input fields to monitor message composition in real time, enabling features like showing typing indicators, validating or limiting input characters, controlling send button activation, implementing input debouncing for autosave or draft updates, tracking text changes as users type, managing dynamic UI feedback based on ongoing input, detecting keystrokes to update message content state, and triggering immediate responses whenever text is entered or modified in chat message editors.
</div>

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


<div class="meta-api-description">
Intercept outgoing chat messages before sending to modify content, cancel delivery, or manage requests to stop message generation; detect when a message is about to be sent to alter the payload, set custom metadata, halt sending, or handle interruptions such as aborting ongoing message creation; control or customize message dispatch behavior by capturing send triggers, adjusting outgoing text or data, preventing sending actions, and responding to user or system-initiated stop send commands; enable dynamic modification and cancellation of messages prior to transmission within chat workflows.
</div>

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


<div class="meta-api-description">
Capture and process user interactions with suggested messages or actions in chat interfaces, enabling detection of clicks on suggestions to execute custom logic, insert chosen text, send predefined replies, or trigger related workflows. Configure event handlers to monitor selection of autocomplete options, recommendation taps, quick reply choices, or inline action picks, allowing control over default behaviors, engagement tracking, suggestion data retrieval, dynamic navigation, and contextual side effects within conversational UI components.
</div>

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


<div class="meta-api-description">
Listen for events when a pinned message is removed or unpinned from the chat interface, detect user actions that unpin or close pinned messages, capture triggers related to unpinning messages, handle updates or changes when pinned chat items are dismissed, configure event handlers for pinned message removal, detect when users click to unpin or close pinned messages, respond to unpinning interactions within chat components, track unpin events for managing pinned message state, control behavior triggered by removing pinned messages, and listen to actions that clear or deactivate pinned chat messages.
</div>

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


<div class="meta-api-description">
Capture and respond to user interactions with chat message toolbar buttons, enabling detection of toolbar actions triggered on messages. Configure event handlers to intercept clicks or commands from message toolbar controls, manage custom toolbar operations, execute functions based on specific toolbar button presses, update message status, or open dialogs dynamically in reaction to toolbar input. This event delivers details about the invoked toolbar action and the associated chat message for precise control over toolbar-driven behaviors, supporting scenarios like command execution, UI updates, message edits, or interaction tracking within chat interfaces.
</div>

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


<div class="meta-api-description">
Capture and respond to user actions on file attachments within chat interfaces, intercepting context menu selections such as previewing, downloading, deleting, sharing, or managing files attached to messages. Enable customizing behavior when users interact with attachment menus, control file upload or download triggers, update message or attachment states dynamically, handle or override default file menu operations, and implement tailored workflows for file management in chat conversations through event handling of file menu interactions.
</div>

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


<div class="meta-api-description">
Capture and respond to user interactions with chat message context menus by detecting when context menu actions occur, enabling you to handle commands triggered from message menus, intercept and process menu item selections, execute custom logic tied to message options, update the state or properties of messages based on user choices, and control UI behavior related to message-specific commands or menu actions within chat interfaces.
</div>

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


<div class="meta-api-description">
Intercept and manage file download actions initiated within chat interfaces, including downloads triggered by buttons like "Download All" or individual file menu commands, enabling detection and handling of user download events, access to event data such as source triggers and file metadata, customization of download workflows, logging of download activity, and control over how chat-related downloads are processed or responded to during interaction.
</div>

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
