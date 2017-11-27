---
title: Kendo UI file upload Validation
description: An Example on How To Validate the Selection and File Extension in Kendo Upload
type: how-to
page_title: Implement file and extension validation on submit | Kendo UI Upload
slug: upload-validate-extensions
position: 0
tags: kendo, kendoui, upload, validate, submit, extension, file
ticketid: 1138527
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Upload for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 7 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Firefox</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>55.0.3</td>
 </tr>
</table>


## Description

How can I validate the kendo Upload widget on form submit, using the kendo Validator. I also want to validate whether a file with the allowed exctensions is selected.

## Solution

In order to validate, whether a file is selected and it has the correct extension, you should create a custom rule for the kendo Validator:

```html 
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Untitled</title>
    <base href="https://demos.telerik.com/kendo-ui/upload/index">
    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2017.2.621/styles/kendo.common.min.css">
    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2017.2.621/styles/kendo.default.min.css">
    <script src="http://code.jquery.com/jquery-1.12.3.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/2017.2.621/js/jszip.min.js"></script>
    <script src="http://kendo.cdn.telerik.com/2017.2.621/js/kendo.all.min.js"></script>
</head>
<body>
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
</body>
</html>
```
