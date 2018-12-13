---
title: Upload in Synchronous Mode File Type Validation 
description: An example on how to validate the file type in Kendo UI Upload when it is in synchronous mode.
type: how-to
page_title: Validate the file type in synchronous mode | Kendo UI Upload
slug: upload-synchronous-file-type-validate
tags: upload, synchronous, validate, validation, file, type
ticketid: 1138370
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

How can I validate the file selected in the Upload by file type (extension), when synchronous mode is used?  

## Solution

When the Upload is configured to use synchronous mode the file type validation can be done with the Kendo UI Validator as demonstrated below.  

```dojo
    <form method="post" action="http://demos.telerik.com/kendo-ui/upload/submit">
        <div class="demo-section k-content">
            <input name="files" id="files" type="file" aria-label="files" />
            <p style="padding-top: 1em; text-align: right">
                <button type="submit" class="k-button k-primary">Submit</button>
            </p>
        </div>
    </form>
    <script>
        $(document).ready(function() {
            $("#files").kendoUpload({
				validation: {
					allowedExtensions: [".jpg"],
				} 
            });
        });
		
		var validatable = $("form").kendoValidator({
			rules: {
				upload: function(input) {
					if (input[0].type == "file") {
						return (input.closest(".k-upload").find(".k-file").length > 0 && input.closest(".k-upload").find(".k-file-invalid").length == 0);
					}
					return true;
				}
			}
		}).data("kendoValidator");
    </script>
	<style>  
	.k-upload-button .k-invalid-msg {
		display: none !important;
	}
	</style>
```
