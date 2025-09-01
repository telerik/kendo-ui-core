---
title: File Uploads and Media
page_title: Telerik UI Chat Documentation - File Uploads and Media
description: "Learn how to enable file uploads, media sharing, and speech-to-text functionality in the Telerik UI for {{ site.framework }} Chat component."
slug: htmlhelpers_files_and_media_chat
position: 5
---

# File Uploads and Media

The Chat component supports built-in file upload functionality, media sharing, and speech-to-text functionality to enhance the messaging experience.

## Attachments

The Chat component provides built-in file upload functionality, allowing users to attach files to their messages. By default, this option is enabled, and a file attachment button appears in the message input area. Users can select files, which are automatically attached to the current message. 

To remove the attachment functionality, disable the `FileAttachment()` option.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .FileAttachment(false)
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" file-attachment="false">
</kendo-chat>
```
{% endif %}

## Attachment Actions

By default, each attachment in the sent messages has a context menu with a **Download** action. When the message contains multiple attachments, a **Download all** button is displayed below the attachment list.
You can configure more actions for the file attachments using the `FileActions()` configuration (for example, **share**, **delete**, **preview**, and more). 

The following example shows how to define custom actions for the uploaded files in the messages

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .FileActions(actions =>
    {
        actions.Add().Name("download").Text("Download").Icon("download");
        actions.Add().Name("delete").Text("Delete").Icon("trash");
        actions.Add().Name("share").Text("Share").Icon("share");
    })
    .Events(ev =>
    {
        ev.FileMenuAction("onFileMenuAction"); // Handle the "FileMenuAction" that triggers when an action is selected.
    })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" 
    on-file-menu-action="onFileMenuAction">
    <file-actions>
        <file-action name="download" text="Download" icon="download" />
        <file-action name="delete" text="Delete" icon="trash" />
        <file-action name="share" text="Share" icon="share" />
    </file-actions>
</kendo-chat>
```
{% endif %}
```JavaScript Scripts
<script> 
    function onFileMenuAction(e) {
        console.log("File action:", e.type, "on file:", e.file.name);
        
        if (e.type === "download") {
            // Trigger file download.
            window.open(e.file.url, '_blank');
        } else if (e.type === "delete") {
            if (confirm("Delete " + e.file.name + "?")) {
                // Handle file deletion.
            }
        } else {
            // Handle file sharing.
        }
    }
</script>
```

## Speech-to-Text

The Chat component includes built-in speech-to-text functionality that allows users to input messages using voice commands. This feature leverages the browser's Web Speech API to convert spoken words into text, providing an accessible and convenient way to interact with the chat interface.

Speech-to-text is particularly useful for mobile users, accessibility scenarios, or when typing is inconvenient. The component provides customizable settings to control language recognition, result accuracy, and interim feedback.

By default, the [SpeechToTextButton](slug:htmlhelpers_overview_speechtotextbutton) is displayed in the message input area. To remove it, disable the `SpeechToText()` option.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .SpeechToText(false)
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" speech-to-text="false">
</kendo-chat>
```
{% endif %}

## See Also

* [Configuring the Chat Quick Actions]({% slug htmlhelpers_quick_actions_chat %})
* [Server-Side API of the Chat HtmlHelper](/api/chat)
{% if site.core %}
* [Server-Side API of the Chat TagHelper](/api/taghelpers/chat)
{% endif %}