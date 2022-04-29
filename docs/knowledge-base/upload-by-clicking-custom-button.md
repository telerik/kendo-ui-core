---
title: Upload Files by Clicking Custom Buttons
description: An example on how to trigger the upload with Kendo UI Upload by clicking a custom button.
type: how-to
page_title: Upload Selected Files by Clicking Custom Buttons | Kendo UI Upload for jQuery
slug: upload-by-clicking-custom-button
tags: upload, file, clicking, custom, button, selected
ticketid: 1138317
res_type: kb
component: upload
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Upload</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I hide the default Upload button and upload the selected file by clicking on a custom button?

## Solution

1. Hide the default **Clear** and **Upload** buttons of the Upload by using CSS.
1. Allow the trigger of the upload by clicking the default button by using jQuery in the click handler of the custom button.  

```dojo
	<input type="file" name="files" id="files"/>
	<input type="button" value="Upload Selected Files" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-upload-button" onclick="uploadSelected()"  />
	<script>
		$("#files").kendoUpload({
			async: {
				saveUrl: "https://demos.telerik.com/kendo-ui/upload/save",
				removeUrl: "https://demos.telerik.com/kendo-ui/upload/save",
				autoUpload: false
			}
		});

		function uploadSelected() {
		  $(".k-upload-selected").click();
		}
	</script>
	<style>  
	  .k-clear-selected, .k-upload-selected {
		display: none !important;
	  }
	</style>
```
