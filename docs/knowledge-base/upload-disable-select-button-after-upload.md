---
title: Disable the Upload Select Button After a File Is Uploaded
description: Learn how to disable the built-in Select Files button after a successful upload while keeping the Remove action active in the Kendo UI Upload.
meta_title: Disable the Upload Select Button After Upload
type: how-to
page_title: Disable the Upload Select Button After Upload - Kendo UI Upload for jQuery
slug: upload-disable-select-button-after-upload
tags: upload, disable, select, button, remove, enable, asynchronous
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

How can I disable the built-in Select Files button after a file is uploaded while keeping the Remove button active in the Kendo UI Upload?

This KB also answers the following questions:

* How do I disable the Upload button after a successful file upload?
* How can I keep the Remove button enabled when the Upload button is disabled?
* How do I enable the Upload Select Files button after removing a file?

## Solution

To disable only the built-in Select Files button, change the state of its `.k-upload-button` element after a file is uploaded or removed.

To configure this behavior, follow these steps:

1. Initialize the Upload with the application endpoints that save and remove files. The endpoints must return a successful response for the [`success`](/api/javascript/ui/upload/events/success) event to fire.

    ```javascript
    var upload = $("#files").kendoUpload({
      async: {
        saveUrl: "/upload/save", // Your save endpoint
        removeUrl: "/upload/remove", // Your remove endpoint
        autoUpload: true
      },
      multiple: false,
      success: onSuccess
    }).data("kendoUpload");
    ```

1. Get the built-in Select Files button and use the `success` event to disable it after a successful upload and enable it after a successful remove operation.

    ```javascript
    var selectButton = upload.wrapper.find(".k-upload-button");

    function setSelectButtonEnabled(enabled) {
      selectButton
        .toggleClass("k-disabled", !enabled)
        .attr("aria-disabled", !enabled)
        .attr("tabindex", enabled ? 0 : -1);
    }

    function onSuccess(e) {
      if (e.operation === "upload") {
        setSelectButtonEnabled(false);
      } else if (e.operation === "remove") {
        setSelectButtonEnabled(true);
      }
    }
    ```

1. (Optional) Prevent mouse and keyboard activation while the Select Files button is disabled.

    ```javascript
    selectButton.on("click.uploadButtonState keydown.uploadButtonState", function (e) {
      var isActivationKey = e.type === "click" || e.keyCode === 13 || e.keyCode === 32;

      if ($(this).hasClass("k-disabled") && isActivationKey) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });
    ```

## See Also

* [Upload API Reference](/api/javascript/ui/upload)
* [Asynchronous Upload](slug:modes_upload_widget)
* [Upload Files by Clicking Custom Buttons](slug:upload-by-clicking-custom-button)
