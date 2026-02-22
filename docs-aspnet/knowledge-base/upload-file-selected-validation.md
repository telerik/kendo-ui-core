---
title: Validate a Selection of Files for Upload
page_title: Validate a Selection of Files for Upload
description: An example on how to validate whether a file is selected for upload in the {{ site.product }} Upload by using the Kendo UI Validator.
type: how-to
ticketid: 1547435
res_type: kb
components: ["general"]
component: upload
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Upload</td>
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
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I validate if a file is selected for upload when working with the {{ site.product }} Upload?

## Solution

* Initialize the Kendo UI Validator and provide a custom rule which validates whether a file in the Upload is selected.

```
      var validator = $("#myForm").kendoValidator({
            rules: {
            upload: function(input) {
                if (input.attr('name') == "files") {
                    var uploadControl = $("#files").data("kendoUpload"); //get a reference of the Upload component
                    var uploadedFiles = uploadControl.getFiles(); //get the uploaded files

                    return uploadedFiles.length > 0; //assert if there are any files selected
                }

                return true;
              }
            }
        }).data("kendoValidator");
```
* Create the Upload component within the **Form**.

```
    <form id="myForm" method="post">
        @(Html.Kendo().Upload()
            .Name("files")
            .Messages(m => m.Select("Select Files"))
            .HtmlAttributes(new {validationmessage = "File is required" })
            .Validation(validation => validation
               .MaxFileSize(10485760)
               .MinFileSize(30720)
            )
       )
       <span class="k-invalid-msg" data-for="files"></span>
       <input type="submit" id="submitForm" class="k-button" />
    </form>
```
**Validate** on form submission whilst preventing the default behavior.

```
    $(document).ready(function () {
       $("#submitForm").on("click", function (e) {
           e.preventDefault();
           var validator = $("#myForm").data("kendoValidator");
           if (!validator.validate()) {
            $("#validationSummary").html("<div class='k-messagebox k-messagebox-error'>Oops! There is invalid data in the form.</div>");
           }
           else {
            $("#validationSummary").html("<div class='k-messagebox k-messagebox-success'>Hooray! Your form is valid!</div>");
           }
       });
    });
```
For the complete example, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/wwYPwobp35zcEZ9d17) example:

```Razor Index.cshtml
    <div id="validationSummary"></div>

    <form id="myForm" method="post">
        @(Html.Kendo().Upload()
            .Name("files")
            .Messages(m => m.Select("Select Files"))
            .HtmlAttributes(new {validationmessage = "File is required" })
            .Validation(validation => validation
            .MaxFileSize(10485760)
            .MinFileSize(30720))
        )

        <span class="k-invalid-msg" data-for="files"></span>
        <input type="submit" id="submitForm" />
    </form>
```
```JS script.js
    <script>
          var validator = $("#myForm").kendoValidator({
                rules: {
                upload: function(input) {
                    if (input.attr('name') == "files") {
                        var uploadControl = $("#files").data("kendoUpload");
                        var uploadedFiled = uploadControl.getFiles();

                        return uploadedFiled.length > 0;
                    }

                    return true;
                  }
                }
            }).data("kendoValidator");

        $(document).ready(function () {
            $("#submitForm").on("click", function (e) {
                e.preventDefault();
                var validator = $("#myForm").data("kendoValidator");
                if (!validator.validate()) {
                    $("#validationSummary").html("<div class='k-messagebox k-messagebox-error'>Oops! There is invalid data in the form.</   div>");
                }
                else {
                    $("#validationSummary").html("<div class='k-messagebox k-messagebox-success'>Hooray! Your form is valid!</div>");
                }
            });
        });
    </script>
```

## More {{ site.framework }} Upload Resources

* [{{ site.framework }} Upload Documentation]({%slug htmlhelpers_upload_aspnetcore%})

* [{{ site.framework }} Upload Demos](https://demos.telerik.com/{{ site.platform }}/upload)

{% if site.core %}
* [{{ site.framework }} Upload Product Page](https://www.telerik.com/aspnet-core-ui/upload)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Upload Product Page](https://www.telerik.com/aspnet-mvc/upload)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Upload for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Server-Side API Reference of the Upload for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/upload)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
