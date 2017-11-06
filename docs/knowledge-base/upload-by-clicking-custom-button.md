---
title: Upload a File by Clicking a Custom Button
description: An example on how to trigger the upload with Kendo UI Upload by clicking a custom button.
type: how-to
page_title: Upload the selected file by clicking on a custom button | Kendo UI Upload
slug: upload-by-clicking-custom-button
tags: upload, file, clicking, custom, button, selected
ticketid: 1138317
res_type: kb
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

The Upload's default Clear and Upload butons can be hidden with CSS and the upload can be triggered by clicking the default button with jQuery in the custom button's click handler.  

```html
	<input type="file" name="files" id="files"/>
	<input type="button" value="Upload Selected Files" class="k-button" onclick="uploadSelected()"  />
	<script>
		$("#files").kendoUpload({
			async: {
				saveUrl: "http://my-app.localhost/save",
				removeUrl: "http://my-app.localhost/remove",
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
