---
title: Display Validation Error Message in the Upload File Template
description: An example on how to display the message from the validation error in a custom file template of a Kendo UI Upload.
type: how-to
page_title: Pass Error Message to the File Template | Kendo UI Upload for jQuery
slug: upload-pass-error-to-template
tags: kendo,upload,error,file-template,template
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

How can I pass the message from a validation error to the custom file template of the Kendo UI Upload? How can I display that message?

## Solution

1. Use the `select` event handler of the Upload to retrieve the error validation message.
1. Assign it to a field in the `file` object.
1. Display the value for that field in the file template.

```dojo
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
```

## See Also

* [API Reference of the Upload](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Validation Demo of the Upload](https://demos.telerik.com/kendo-ui/upload/validation)
