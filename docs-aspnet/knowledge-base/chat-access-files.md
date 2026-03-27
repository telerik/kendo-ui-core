---
title: Upload and Download Files in the Chat
description: Learn how to upload, download, and preview file attachments in the Telerik UI Chat component for ASP.NET Core using file actions and a server-side upload endpoint.
type: how-to
page_title: Upload and Download File Attachments in the Chat for {{ site.product }}
slug: chat-access-files
tags: chat, file, upload, download, attachment, preview, file-actions
res_type: kb
component: chat
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Chat</td>
 </tr>
</table>

## Description

How can I allow users to attach files to Chat messages, upload them to the server, download them, and view file details through a popup window in the Telerik UI for {{ site.product_short }} Chat?

## Solution

To integrate file upload and download capabilities into the Chat component:

1. Configure the Chat with file attachment restrictions and custom file actions.
2. Handle the `SendMessage` event to upload files via AJAX to a server endpoint.
3. Handle the `Download` event to save files using `kendo.saveAs`.
4. Handle the `FileMenuAction` event to display file details inside a Kendo UI Window.

### View Configuration

The Chat is configured using the HtmlHelper with `FileAttachment` restrictions, custom `FileActions`, and event handlers for `SendMessage`, `Download`, and `FileMenuAction`.

```HtmlHelper
@model List<ChatMessage>

<div class="k-d-flex k-justify-content-center">
    @(Html.Kendo().Chat()
        .Name("chat")
        .Height("600px")
        .Width("400px")
        .FileAttachment(f => f.Restrictions(r => r.AllowedExtensions(".jpg", ".png", ".pdf", ".xlsx", ".docx", ".txt")))
        .FileActions(actions =>
        {
            actions.Add().Name("download").Text("Download").Icon("download");
            actions.Add().Name("viewdetails").Text("View Details").Icon("eye");
        })
        .AuthorId("1")
        .BindTo(Model)
        .Events(ev =>
        {
            ev.SendMessage("onSendMessage");
            ev.Download("onDownload");
            ev.FileMenuAction("onFileMenuAction");
        })
    )
</div>

@(Html.Kendo().Window()
    .Name("fileDetailsWindow")
    .Title("File Details")
    .Visible(false)
    .Modal(true)
    .Width(420)
    .Actions(actions => actions.Close())
)
```
```TagHelper
@addTagHelper *, Kendo.Mvc
@model List<ChatMessage>

<div class="k-d-flex k-justify-content-center">
    <kendo-chat name="chat"
        height="600"
        width="400"
        bind-to="Model"
        author-id="1"
        on-send-message="onSendMessage"
        on-download="onDownload"
        on-file-menu-action="onFileMenuAction">
        <file-attachment>
            <restrictions allowed-extensions='new string[] { ".jpg", ".png", ".pdf", ".xlsx", ".docx", ".txt" }' />
        </file-attachment>
        <file-actions>
            <file-action name="download" text="Download" icon="download" />
            <file-action name="viewdetails" text="View Details" icon="eye" />
        </file-actions>
    </kendo-chat>
</div>

<kendo-window name="fileDetailsWindow"
    title="File Details"
    visible="false"
    modal="true"
    width="420"
    actions='new string[] { "Close" }'>
</kendo-window>
```

### Client-Side Event Handlers

The `onSendMessage` handler uploads attached files to the server and posts a response message back into the Chat. The `onDownload` handler saves files via `kendo.saveAs`. The `onFileMenuAction` handler displays file metadata in a Kendo UI Window.

```JavaScript
function uploadFilesToServer(files) {
    return new Promise(function (resolve, reject) {
        var formData = new FormData();
        files.forEach(function (file) {
            formData.append("files", file.rawFile);
        });

        $.ajax({
            url: "@Url.Action("SaveFiles", "Chat")",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.success) {
                    resolve(response.files);
                } else {
                    reject(new Error(response.message || "Upload failed."));
                }
            },
            error: function (xhr, status, error) {
                reject(new Error("Upload failed: " + error));
            }
        });
    });
}

function onSendMessage(e) {
    var chat = e.sender;

    if (e.message.files && e.message.files.length > 0) {
        var files = e.message.files;

        uploadFilesToServer(files).then(function (results) {
            var peerFiles = results.map(function (result) {
                return { name: result.name, size: result.size, extension: result.extension, url: result.url };
            });

            chat.postMessage({
                authorId: 2,
                authorName: "Peter Smith",
                text: "Thanks for uploading " + files.length + " file(s)!",
                files: peerFiles,
                timestamp: new Date()
            });
        });
    }
}

function onDownload(e) {
    if (!e.files || e.files.length === 0) return;

    e.files.forEach(function (file) {
        if (file.url) {
            fetch(file.url)
                .then(function (response) { return response.blob(); })
                .then(function (blob) {
                    kendo.saveAs({ dataURI: blob, fileName: file.name });
                });
        } else if (file.rawFile) {
            kendo.saveAs({ dataURI: file.rawFile, fileName: file.name });
        }
    });
}

function onFileMenuAction(e) {
    if (e.type === "viewdetails") {
        showFileDetails(e.file);
    }
}

function showFileDetails(file) {
    var extension = file.extension || "";
    var displayable = [".bmp", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".svgz"];
    var canPreview = displayable.indexOf(extension.toLowerCase()) > -1 && file.url;
    var contentHtml = "";

    if (canPreview) {
        contentHtml += '<div style="text-align:center;margin-bottom:16px;"><img src="' +
            kendo.htmlEncode(file.url) + '" style="max-width:100%;max-height:200px;border-radius:4px;" /></div>';
    }

    contentHtml += '<table class="k-table" style="width:100%;border-collapse:collapse;">' +
        '<tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">' + kendo.htmlEncode(file.name || "N/A") + '</td></tr>' +
        '<tr><td style="padding:8px;font-weight:bold;">Size</td><td style="padding:8px;">' + (file.size || 0) + ' bytes</td></tr>' +
        '<tr><td style="padding:8px;font-weight:bold;">Type</td><td style="padding:8px;">' + kendo.htmlEncode(extension || "Unknown") + '</td></tr>' +
        '</table>';

    var wnd = $("#fileDetailsWindow").data("kendoWindow");
    wnd.content(contentHtml);
    wnd.title("File Details - " + (file.name || "Unknown"));
    wnd.center().open();
}
```

### Controller

The controller action provides initial Chat messages and a `SaveFiles` endpoint that stores uploaded files in session and returns download URLs.

```Controller
public partial class ChatController : Controller
{
    [Demo]
    public IActionResult Access_Files()
    {
        var data = new List<ChatMessage>()
        {
            new ChatMessage {
                Id = "1",
                AuthorId = "2",
                AuthorName = "Peter Smith",
                Text = "Use the paperclip button to attach files.",
                TimeStamp = DateTime.Now
            }
        };
        return View(data);
    }

    [HttpPost]
    public IActionResult SaveFiles(List<IFormFile> files)
    {
        if (files == null || files.Count == 0)
            return Json(new { success = false, message = "No files uploaded." });

        var results = new List<object>();

        foreach (var file in files)
        {
            if (file.Length == 0) continue;

            var fileName = Path.GetFileName(file.FileName);
            var fileId = Guid.NewGuid().ToString("N");

            byte[] fileBytes;
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                fileBytes = ms.ToArray();
            }

            HttpContext.Session.Set(fileId, fileBytes);

            results.Add(new
            {
                url = Url.Action("DownloadFile", "Chat", new { fileId }, Request.Scheme),
                name = fileName,
                size = file.Length,
                extension = Path.GetExtension(fileName)
            });
        }

        return Json(new { success = true, files = results });
    }

    public IActionResult DownloadFile(string fileId)
    {
        var fileData = HttpContext.Session.Get(fileId);
        if (fileData == null) return NotFound();
        return File(fileData, "application/octet-stream");
    }
}
```

{% if site.core %}
For a runnable example, refer to the [Chat Access Files demo](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Chat/AccessFiles.cshtml).
{% else %}
For a runnable example, refer to the [Chat Access Files demo](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/ChatAccessFiles).
{% endif %}

## See Also

* [{{ site.framework }} Chat Documentation]({%slug htmlhelpers_chat_aspnetcore%})

* [{{ site.framework }} Chat Demos](https://demos.telerik.com/{{ site.platform }}/chat)

{% if site.core %}
* [{{ site.framework }} Chat Product Page](https://www.telerik.com/aspnet-core-ui/chat)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Chat Product Page](https://www.telerik.com/aspnet-mvc/chat)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
