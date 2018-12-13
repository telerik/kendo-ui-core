---
title: Show the Confirm Dialog before Uploading Files
description: An example on how to display a popup confirmation dialog for saving an uploaded file in the Kendo UI Upload.
type: how-to
page_title: Prompt Users before Uploading Files | Kendo UI Upload
slug: upload-confirmation-dialog
tags: kendo, upload, dialog, confirm
ticketid: 1113102
res_type: kb
component: upload
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Upload</td>
 </tr>
</table>

## Description

Can I implement a **Confirm** dialog before the user uploads a file when the Upload is in asynchronous mode.

## Solution

Use the [Kendo UI **Confirm** Dialog](https://demos.telerik.com/kendo-ui/dialog/predefined-dialogs) and an asynchronous Upload with [`AutoUpload`](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/async.autoupload) turned off.

The following example demonstrates how to open the **Confirm** Dialog within the [`select`](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload/events/select) event handler and display the name of the file.

````dojo
  <input name="files" id="files" type="file" />
  <script>
	$(document).ready(function() {
	  $("#files").kendoUpload({
		multiple: false,
		async: {
		  // Disable AutoUpload of files
		  autoUpload: false,
		  saveUrl: "https://demos.telerik.com/kendo-ui/upload/async/save",
		  removeUrl: "https://demos.telerik.com/kendo-ui/upload/async/remove",
		  withCredentials: false
		},
		select: function(e) {
		  var file = e.files[0];
		  // Get reference to the Upload widget
		  var upload = e.sender;
		  // Initialize a Confirm Dialog
		  kendo.confirm("File name:" +
						"<br/>" +
						file.name +
						"<br/>" +
						"Are you sure that you want to upload this file?")
			.then(function () {
			  // Upload the file if confirmed
			  upload.upload();
			}, function () {
			  // Clear the file from the Upload if denied
			  upload.clearAllFiles();
			});
		}
	  });
	});
  </script>
````

## See Also

* [Kendo UI Upload JavaScript API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Predefined Kendo UI Dialogs Demo](https://demos.telerik.com/kendo-ui/dialog/predefined-dialogs)
