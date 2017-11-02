---
title: Display Validation Error Message in the Upload File Template
description: How to display the message from validation error in a custom file template of Kendo UI Upload.
type: how-to
page_title: Pass Error Message to the File Template | Kendo UI Upload
slug: upload-pass-error-to-template
tags: kendo,upload,error,file-template,template
ticketid: 0
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Upload</td>
 </tr>
</table>

## Description

How to pass the message from validation error to the custom file template of Kendo Upload? How to display that message?

## Solution

Use the Upload *select* event handler to retrieve the error validation message. You can assign it to a field in the *file* object. Then you could display the value for that field in the file template:

````html
<base href="https://demos.telerik.com/kendo-ui/upload/validation">

<script id="fileTemplate" type="text/x-kendo-template">
	#if (files[0].error) { # <div class="k-file-invalid"> # } #
      <span class="k-progress"></span>
      #if (!files[0].error) { # <span class="k-file-extension-wrapper"><span class="k-file-extension"> #= files[0].extension # # } #
      #if (files[0].error) { # <span class="k-file-invalid-extension-wrapper"> <span class="k-file-invalid-icon">! # } #
  		</span> 
        <span class="k-file-state"></span>
      </span>
      
      <span class="k-file-name-size-wrapper">
        <span #if (files[0].error) { # class="k-file-name k-file-name-invalid" # } #
        # if (!files[0].error) { # class="k-file-name" # } # > #= name # </span>
			#if (files[0].error) { # <span class="k-file-validation-message"> #= files[0].error # </span> # } #
			#if (!files[0].error) { var kbSize = kendo.toString(size/1024, "n0"); # <span class="k-file-size">#= kbSize # KB</span> # } #
  		</span>
      <strong class="k-upload-status">
        <button type="button" class="k-button k-upload-action" aria-label="Remove">
          <span class="k-icon k-i-close k-i-x" title="Remove"></span>
  		</button>
  	  </strong>
	#if (files[0].error) { # </div> # } #
</script>

<h4>Upload PNG of no more than 100 KB</h4>
<input name="files" id="files" type="file" />
<div class="demo-hint">You can only upload <strong>PNG</strong> files up to <strong>100 KB</strong>.</div>

<script>
  $(document).ready(function() {
    $("#files").kendoUpload({
      async: {
        saveUrl: "save",
        removeUrl: "remove",
        withCredentials: false
      },
      validation: {
        allowedExtensions: [".png"],
        // File size validation limit in bytes
        maxFileSize: 100000
      },
      select: function(e) {
        var files = e.files;
        for	(var i = 0; i < files.length; i+= 1) {
          var file = files[i];
          if (file.validationErrors && file.validationErrors.length > 0) {
            file.error = file.validationErrors[0];
          }
        }
      },
      template: kendo.template($('#fileTemplate').html())
    });
  });
</script>
````

## See Also

* [Kendo UI Upload JavaScript API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Kendo UI Upload Validation Demo](https://demos.telerik.com/kendo-ui/upload/validation)
