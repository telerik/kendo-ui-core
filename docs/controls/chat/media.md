---
title: File Uploads and Media
page_title: jQuery Chat Documentation - File Uploads and Media
description: "Learn how to enable file uploads, media sharing, and speech-to-text functionality in the Kendo UI for jQuery Chat component."
slug: media_kendoui_chat
position: 7
---

# File Uploads and Media

The Kendo UI for jQuery Chat component provides media handling capabilities that enhance user communication through file attachments and voice input.

## File Attachments

The Chat component has built-in file upload functionality that allows users to attach files to their messages. When the [`fileAttachment`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/fileattachment) options is enabled, a file attachment button appears in the message input area, and users can select files which are automatically included with their messages. By default the option is enabled. 

```dojo
    <div id="chat"></div>
    <script> 
    $("#chat").kendoChat({
        fileAttachment: false,
    });
    </script>
```

### File Actions

The Chat component allows you to configure the actions available for file attachments using the [`fileActions`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/fileactions) option:

```dojo
<div id="chat"></div>
<script> 
$("#chat").kendoChat({
    authorId: "user1",
    fileAttachment: true,
    fileActions: [
        { name: "download", text: "Download", icon: "download" },
        { name: "preview", text: "Preview", icon: "eye" },
        { name: "delete", text: "Delete", icon: "trash" }
    ],
    fileMenuAction: function(e) {
        console.log("File action:", e.type, "on file:", e.file.name);
        
        if (e.type === "download") {
            // Trigger file download
            window.open(e.file.url, '_blank');
        } else if (e.type === "delete") {
            if (confirm("Delete " + e.file.name + "?")) {
                // Handle file deletion
            }
        }
    }
});
</script>
```

When users interact with file actions, the following events are fired:

- [`fileActionClick`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/events/fileactionclick)&mdash;Emitted when a file action is clicked. Returns a FileActionEvent object.
- [`download`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/events/download)&mdash;Emitted specifically for download actions. 

## Speech-to-Text

The Chat component includes speech-to-text functionality that allows users to input messages using voice commands. Enable this feature by setting the [`speechToText`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/speechtotext) option to `true`, which adds a microphone button to the message input area. The functionality is enabled by default.

```javascript
$("#chat").kendoChat({
    speechToText: false,
});
```

## See Also

* [Chat Overview]({% slug overview_kendoui_chat_widget %})
* [Chat Templates]({% slug templates_kendoui_chat %})
* [JavaScript API Reference](/api/javascript/ui/chat)
