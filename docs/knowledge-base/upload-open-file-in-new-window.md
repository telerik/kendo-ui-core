---
title: Open an Uploaded File in a New Browser Window from the Upload Template
description: Learn how to add a View button to a Kendo UI Upload file template and open the uploaded file in a new browser window.
type: how-to
page_title: Open an Uploaded File in a New Browser Window from the Upload Template - Kendo UI Upload for jQuery
slug: upload-open-file-in-new-window
tags: kendo,upload,file-template,button,open,file,new-window
res_type: kb
components: ["upload"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Upload for jQuery</td>
 </tr>
 <tr>
  <td>Version</td>
  <td>2026.3.811</td>
 </tr>
</table>

## Description

How can I add a button to a custom Kendo UI Upload file template that opens the uploaded file in a new browser window?

This KB also answers the following questions:

* How can I add a View button to a Kendo UI Upload file template?
* How can I preview a selected file from the Kendo UI Upload?
* How can I open an uploaded image in a new browser tab from the Upload?

## Solution

To add a View button to the Upload file template, create a browser object URL from `file.rawFile` in the [`select`](/api/javascript/ui/upload/events/select) event. Store the URL on the corresponding file entry and open it from a button click.

The `select` event fires before the Upload renders the selected file entry. Use a delayed callback when locating the View button so that the file entry exists in the DOM.

The following example demonstrates how to add a View button to a Kendo UI Upload file template and open the uploaded file in a new browser window.

```dojo
<div id="example">
    <input name="files" id="files" type="file" />

    <script id="fileTemplate" type="text/x-kendo-template">
        <span class="k-progress"></span>
        <div class="file-wrapper">
            <span class="file-name">#: name #</span>
            <button type="button" class="k-button k-upload-view" disabled>View</button>
            <button type="button" class="k-upload-action"></button>
        </div>
    </script>

    <script>
        $(document).ready(function () {
            var upload = $("#files").kendoUpload({
                async: {
                    saveUrl: "save",
                    removeUrl: "remove",
                    autoUpload: true
                },
                multiple: false,
                select: onSelect,
                template: kendo.template($("#fileTemplate").html())
            }).data("kendoUpload");

            upload.wrapper.on("click", ".k-upload-view", function () {
                var fileUrl = $(this).data("url");
                if (fileUrl) {
                    var newWindow = window.open(fileUrl, "_blank");
                    if (newWindow) {
                        newWindow.opener = null;
                    }
                }
            });

            function onSelect(e) {
                setTimeout(function () {
                    for (var i = 0; i < e.files.length; i++) {
                        var file = e.files[i];
                        var viewButton = upload.wrapper.find(".k-file[data-uid='" + file.uid + "'] .k-upload-view");
                        viewButton.data("url", URL.createObjectURL(file.rawFile)).prop("disabled", false);
                    }
                });
            }
        });
    </script>
</div>
```

After the file is selected, the `View` button is enabled and opens the selected file in a new browser window. The object URL is temporary and is intended for previewing the local file. To open the persisted uploaded file instead, return its URL from the server and read that application-defined property from `e.response` in the [`success`](/api/javascript/ui/upload/events/success) event. Make sure that the returned URL is accessible to the current user.

## See Also

* [Upload `template` configuration](/api/javascript/ui/upload/configuration/template)
* [Upload `success` event](/api/javascript/ui/upload/events/success)
* [Upload Templates]({% slug templates_upload %})
