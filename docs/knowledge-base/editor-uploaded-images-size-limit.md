---
title: Set Size Limit for Images Uploaded with Editor ImageBrowser
description: An example on how to set a size limit for images uploaded with the ImageBrowser in Kendo UI Editor.
type: how-to
page_title: Set size limit for images uploaded with ImageBrowser | Kendo UI Editor
slug: editor-uploaded-images-size-limit
tags: editor, set, size, limit, images, imagebrowser
ticketid: 1135009
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Editor</td>
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

How can I set a size limit for the images uploaded with the Editor's ImageBrowser?

## Solution

You can check the size of the selected file in the select event handler of the Upload embedded in the ImageBrowser and prevent the upload in case the file size exceeds the specified limit.

```dojo
<script>
	$(document).ready(function () {
		//attach a click handler to the Editor's ImageBrowser tool
		$(".k-i-image").click(function () {
			setTimeout(function(){
				//attach a select handler to the Upload embedded in the ImageBrowser
				$(".k-imagebrowser .k-upload").find("input").data("kendoUpload").bind("select", function (e) {
					//prevent the event in case the selected file exceeds the specified limit
					if (e.files[0].size > 1048576) {
						e.preventDefault();
						alert("Maximum allowed file size: 1MB");
					}
				});
			});
		});
	});
</script>
```
