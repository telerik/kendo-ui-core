---
title: Upload and Download Files in the Chat
description: Learn how to upload, download, and preview file attachments in the Kendo UI for jQuery Chat component using custom file actions.
type: how-to
page_title: Upload and Download File Attachments - Kendo UI for jQuery Chat
slug: chat-access-files
tags: chat, file, upload, download, attachment, preview, file-actions
res_type: kb
components: ["chat"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Chat for jQuery</td>
 </tr>
</table>

## Description

How can I allow users to attach files to Chat messages, download them, and view file details through a popup window in the Kendo UI for jQuery Chat?

## Solution

The following approach demonstrates how to:

1. Enable file attachments with allowed extension restrictions using the [`fileAttachment`](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat/configuration/fileattachment) option.
2. Define custom file actions (Download and View Details) through the [`fileActions`](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat/configuration/fileactions) configuration.
3. Upload files to a server endpoint via AJAX inside the [`sendMessage`](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat/events/sendmessage) event handler.
4. Handle file downloads in the [`download`](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat/events/download) event using `kendo.saveAs`.
5. Show file metadata and image previews inside a Kendo UI Window when the custom "View Details" action is triggered through the [`fileMenuAction`](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat/events/filemenuaction) event.

### Configure the Chat with File Attachments and Actions

```HTML
<div class="k-d-flex k-justify-content-center">
    <div id="chat"></div>
</div>

<div id="fileDetailsWindow"></div>

<script>
    var currentUser = {
        id: 1,
        name: "John Doe",
        iconUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
        iconAltText: "John's profile picture"
    };

    var imageExtensions = [".ai", ".dds", ".heic", ".jpe", ".jfif", ".jif", ".jp2", ".jps",
        ".eps", ".bmp", ".gif", ".jpeg", ".jpg", ".png", ".ps", ".psd", ".svg", ".svgz", ".tif", ".tiff"];

    function isDisplayableImage(extension) {
        if (!extension) return false;
        var ext = extension.toLowerCase();
        if (ext.charAt(0) !== ".") ext = "." + ext;
        var displayable = [".bmp", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".svgz"];
        return displayable.indexOf(ext) > -1;
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return "0 Bytes";
        var sizes = ["Bytes", "KB", "MB", "GB"];
        var i = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
    }

    function uploadFilesToServer(files) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            files.forEach(function (file) {
                formData.append("files", file.rawFile);
            });

            $.ajax({
                url: "../chat/savefiles",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    if (response.success) {
                        resolve(response.files);
                    } else {
                        reject(response.message || "Upload failed");
                    }
                },
                error: function (xhr, status, error) {
                    reject(error);
                }
            });
        });
    }

    $(document).ready(function () {
        $("#fileDetailsWindow").kendoWindow({
            title: "File Details",
            visible: false,
            modal: true,
            width: 420,
            actions: ["Close"]
        });

        $("#chat").kendoChat({
            height: "600px",
            width: "400px",
            authorId: "1",
            fileAttachment: {
                restrictions: {
                    allowedExtensions: [".jpg", ".png", ".pdf", ".xlsx", ".docx", ".txt"]
                }
            },
            fileActions: [
                { name: "download", text: "Download", icon: "download" },
                { name: "viewdetails", text: "View Details", icon: "eye" }
            ],
            dataSource: {
                data: [
                    {
                        id: "1",
                        authorId: "2",
                        authorName: "Peter Smith",
                        authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/GOURL.jpg",
                        authorImageAltText: "Peter's profile picture",
                        text: "Use the paperclip button in the message input area to attach files, and the file action menu to download or delete them.",
                        timestamp: new Date()
                    },
                    {
                        id: "2",
                        authorId: "2",
                        authorName: "Peter Smith",
                        authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/GOURL.jpg",
                        authorImageAltText: "Peter's profile picture",
                        text: "Go ahead and upload your first file. Once uploaded, I will receive it with a download link so both of us can access it.",
                        timestamp: new Date()
                    }
                ]
            },
            sendMessage: function (e) {
                var chat = e.sender;

                e.message.authorId = currentUser.id;
                e.message.authorName = currentUser.name;
                e.message.authorImageUrl = currentUser.iconUrl;
                e.message.authorImageAltText = currentUser.iconAltText;

                if (e.message.files && e.message.files.length > 0) {
                    var files = e.message.files;

                    uploadFilesToServer(files).then(function (results) {
                        var peerFiles = results.map(function (result) {
                            return {
                                name: result.name,
                                size: result.size,
                                extension: result.extension,
                                url: result.url
                            };
                        });

                        var fileDetails = peerFiles.map(function (f) {
                            return "Name: " + f.name +
                                ", Size: " + formatFileSize(f.size) +
                                ", Type: " + f.extension;
                        }).join("\n\n");

                        chat.postMessage({
                            authorId: 2,
                            authorName: "Peter Smith",
                            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/GOURL.jpg",
                            authorImageAltText: "Peter's profile picture",
                            text: "Thanks for uploading " + files.length + " file(s). I can now access and download them!\n\nFile details:\n" + fileDetails,
                            files: peerFiles,
                            timestamp: new Date()
                        });
                    }).catch(function (error) {
                        console.error("File upload failed:", error);
                        chat.postMessage({
                            authorId: 2,
                            authorName: "Peter Smith",
                            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/GOURL.jpg",
                            authorImageAltText: "Peter's profile picture",
                            text: "Sorry, there was an error uploading the file(s). Please try again.",
                            timestamp: new Date()
                        });
                    });
                } else {
                    setTimeout(function () {
                        chat.postMessage({
                            authorId: 2,
                            authorName: "Peter Smith",
                            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/GOURL.jpg",
                            authorImageAltText: "Peter's profile picture",
                            text: "Got it! You can also attach files using the file button in the message input area.",
                            timestamp: new Date()
                        });
                    }, 500);
                }
            },
            fileMenuAction: function (e) {
                if (e.type === "viewdetails") {
                    showFileDetails(e.file);
                }
            },
            download: function (e) {
                if (!e.files || e.files.length === 0) {
                    return;
                }

                e.files.forEach(function (file) {
                    if (file.url) {
                        // Download from server URL
                        fetch(file.url)
                            .then(function (response) {
                                if (!response.ok) {
                                    throw new Error("Download failed");
                                }
                                return response.blob();
                            })
                            .then(function (blob) {
                                kendo.saveAs({
                                    dataURI: blob,
                                    fileName: file.name
                                });
                            })
                            .catch(function (err) {
                                console.error("Download error:", err);
                                kendo.alert("File is not available for download: " + file.name);
                            });
                    } else if (file.rawFile) {
                        // Fallback for files still in browser memory
                        kendo.saveAs({
                            dataURI: file.rawFile,
                            fileName: file.name
                        });
                    } else {
                        kendo.alert("File is not available for download: " + file.name);
                    }
                });
            }
        });
    });

    function showFileDetails(file) {
        var fileUrl = file.url;
        var extension = file.extension || "";
        var canPreview = isDisplayableImage(extension) && fileUrl;
        var iconName = kendo.getFileGroup(extension, true);
        var contentHtml = "";

        if (canPreview) {
            contentHtml += '<div style="text-align: center; margin-bottom: 16px;">' +
                '<img src="' + kendo.htmlEncode(fileUrl) + '" alt="' + kendo.htmlEncode(file.name) + '" style="max-width: 100%; max-height: 200px; border-radius: 4px;" />' +
                '</div>';
        } else {
            contentHtml += '<div style="text-align: center; margin-bottom: 16px;">' +
                kendo.ui.icon({ icon: iconName, size: "xxxlarge" }) +
                '</div>';
        }

        contentHtml += '<table class="k-table" style="width: 100%; border-collapse: collapse;">' +
            '<tbody>' +
            '<tr><td style="padding: 8px; font-weight: bold; width: 100px;">Name</td><td style="padding: 8px;">' + kendo.htmlEncode(file.name || "N/A") + '</td></tr>' +
            '<tr><td style="padding: 8px; font-weight: bold;">Size</td><td style="padding: 8px;">' + formatFileSize(file.size || 0) + '</td></tr>' +
            '<tr><td style="padding: 8px; font-weight: bold;">Type</td><td style="padding: 8px;">' + kendo.htmlEncode(extension || "Unknown") + '</td></tr>' +
            '<tr><td style="padding: 8px; font-weight: bold;">Category</td><td style="padding: 8px;">' + kendo.htmlEncode(kendo.getFileGroup(extension, false) || "file") + '</td></tr>' +
            '</tbody></table>';

        var wnd = $("#fileDetailsWindow").data("kendoWindow");
        wnd.content(contentHtml);
        wnd.title("File Details - " + (file.name || "Unknown"));
        wnd.center().open();
    }
</script>

<style>
    .k-chat {
        min-width: 300px !important;
    }
</style>
```
```ChatController.cs
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Controllers
{
    public class ChatController : Controller
    {
        private const string ChatUploadsSessionKey = "ChatUploadedFiles";

        private Dictionary<string, ChatUploadedFile> GetSessionFiles()
        {
            var json = HttpContext.Session.GetString(ChatUploadsSessionKey);
            if (string.IsNullOrEmpty(json))
            {
                return new Dictionary<string, ChatUploadedFile>();
            }
            return JsonSerializer.Deserialize<Dictionary<string, ChatUploadedFile>>(json)
                   ?? new Dictionary<string, ChatUploadedFile>();
        }

        private void SaveSessionFiles(Dictionary<string, ChatUploadedFile> files)
        {
            var json = JsonSerializer.Serialize(files);
            HttpContext.Session.SetString(ChatUploadsSessionKey, json);
        }

        [HttpPost]
        public IActionResult SaveFiles(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
            {
                return Json(new { success = false, message = "No files uploaded." });
            }

            var sessionFiles = GetSessionFiles();
            var results = new List<object>();

            foreach (var file in files)
            {
                if (file.Length == 0)
                {
                    continue;
                }

                var fileName = Path.GetFileName(file.FileName);
                var fileId = Guid.NewGuid().ToString("N");

                byte[] fileBytes;
                using (var ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    fileBytes = ms.ToArray();
                }

                sessionFiles[fileId] = new ChatUploadedFile
                {
                    FileId = fileId,
                    FileName = fileName,
                    ContentType = file.ContentType,
                    Size = file.Length,
                    Data = fileBytes
                };

                results.Add(new
                {
                    url = Url.Action("DownloadFile", "Chat", new { fileId }),
                    name = fileName,
                    size = file.Length,
                    extension = Path.GetExtension(fileName)
                });
            }

            SaveSessionFiles(sessionFiles);

            return Json(new { success = true, files = results });
        }

        public IActionResult DownloadFile(string fileId)
        {
            if (string.IsNullOrEmpty(fileId))
            {
                return NotFound();
            }

            var sessionFiles = GetSessionFiles();

            if (!sessionFiles.TryGetValue(fileId, out var uploadedFile))
            {
                return NotFound();
            }

            return File(uploadedFile.Data, uploadedFile.ContentType, uploadedFile.FileName);
        }
    }

    [Serializable]
    public class ChatUploadedFile
    {
        public string FileId { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public string ContentType { get; set; } = string.Empty;
        public long Size { get; set; }
        public byte[] Data { get; set; } = Array.Empty<byte>();
    }
}
```
```Program.cs
app.MapControllerRoute(
    name: "chatFiles",
    pattern: "chat/{action}",
    defaults: new { controller = "Chat" },
    constraints: new { action = "(savefiles|downloadfile)" });
```

For a runnable example, refer to the [Chat Access Files demo](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Chat/AccessFiles.cshtml).

## See Also

* [Chat File Attachment API](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat/configuration/fileattachment)
* [Chat File Actions API](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat/configuration/fileactions)
* [Chat Events](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat#events)
* [Kendo UI for jQuery Chat Demos](https://demos.telerik.com/kendo-ui/chat)
