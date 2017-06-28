---
title: Show Confirm Dialog before Uploading File
description: How to pop-up dialog asking for confirmation to save uploaded file
type: how to
page_title: Show Confirm Dialog before Uploading File
slug: confirm_dialog_before_uploading_file
position: 0
tags: kendo, upload, dialog, confirm
teampulseid:
ticketid: 1113102
pitsid:
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Upload</td>
 </tr>
</table>

## Description

Your project might require you to implement a **Confirm** dialog before you upload a file in a Kendo UI Upload in asynchronous mode.

## Possible Solution

To achieve this behavior, use the [Kendo UI **Confirm** Dialog](https://demos.telerik.com/kendo-ui/dialog/predefined-dialogs) and an asynchronous Upload with [`AutoUpload`](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload#configuration-async.autoUpload) turned off.

The following example demonstrates how to open the **Confirm** Dialog within the [`select`](http://docs.telerik.com/kendo-ui/api/javascript/ui/upload#events-select) event handler and display the name of the file.

````html
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
