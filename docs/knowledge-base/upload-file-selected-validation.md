---
title: Upload File Selected Validation 
description: An example on how to use the Kendo UI Validator, to validate whether a file is selected in the Upload.
type: how-to
page_title: Use the Kendo UI Validator to validate if a file is selected | Kendo UI Upload
slug: upload-file-selected-validation
tags: upload, file, selected, validate, validator
ticketid: 1167714
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

How can I validate if a file is selected in the Upload?  

## Solution

You can use a custom rule in the Kendo UI Validator and on form submission validate whether a file is selected in the Upload.  

```html
    <form id="myForm" action="https://demos.telerik.com/kendo-ui/upload/submit" enctype="multipart/form-data" method="post">
        <input id="files" name="files" type="file"/>
        <input type="submit" />    
    </form>

    <script>
        $("#files").kendoUpload();

        var fileNotSelected = false;

        var validator = $("#myForm").kendoValidator({
            rules: {
            upload: function(input) {
                if (input[0].type == "file") {
                fileNotSelected = true;
                var len = input.closest(".k-upload").find(".k-file").length;

                return len > 0;
                }

                return true;
            }
            }
        }).data("kendoValidator");

        $("#myForm").submit(function(e) {
            $("#files").removeAttr("disabled");

            if(!validator.validate()) {
            if(fileNotSelected) {
                fileNotSelected = false; 
            }
            e.preventDefault()
            }
        });  
    </script>
```
