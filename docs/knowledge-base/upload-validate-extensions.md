---
title: Validate Files and File Extensions on Upload
description: Learn how to validate the selection and file extension in the Kendo UI Upload.
type: how-to
page_title: Implement File and Extension Validation on Submit - Kendo UI Upload for jQuery
slug: upload-validate-extensions
tags: kendo, kendoui, upload, validate, submit, extension, file
ticketid: 1138527
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Upload for jQuery</td>
 </tr>
</table>


## Description

How can I validate the Kendo UI Upload widget on `form` submit by using the Kendo UI Validator? How can I validate whether a file with the allowed extensions is selected?

## Solution

To validate whether a file is selected and that the selected file has the correct extension, create a custom rule for the Kendo UI Validator.

```dojo
    <form method="POST" name="procedureForm" id="myForm">
        <p> allowed files extensinos: 'CSV', 'XML', 'XLS', 'XLSX'</p>
        <span class="k-invalid-msg" data-for="files"></span>
        <input id='files' name='files' type='file' validationmessage='Please upload a valid file' />
        <input type="submit" id="btnSubmit" class="k-button" value="Submit" />
    </form>
    <script type="text/javascript">
        $(document).ready(function() {
            //create validator with custom rule
            var validator = $("#myForm").kendoValidator({
                rules: {
                    upload: function(input) {
                        if ($("#files").closest('.k-upload').find('.k-file').length > 0 &&
                            input.closest(".k-upload").find(".k-file-invalid").length == 0) {
                            return true;
                        }
                    }
                }
            }).data("kendoValidator");

            //create Upload widget
            $('#files').kendoUpload({

                localization: {
                    select: "Browse"
                },
                validation: {
                    allowedExtensions: ['CSV', 'XML', 'XLS', 'XLSX'],
                    maxFileSize: 2048000
                }
            });
        });
    </script>
```
