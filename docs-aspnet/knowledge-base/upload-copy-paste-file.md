---
title: Copy and Paste Files in the Upload
page_title: Copy and Paste Files in the Upload
description: Learn how to copy and paste a file into the Telerik UI for {{ site.framework }} Upload component.
slug: upload-copy-paste-file
tags: telerik, upload, copy, paste, files
component: upload
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Upload</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.802 version</td>
 </tr>
</table>

## Description

How can I copy and paste a file into the {{ site.product }} Upload?

## Solution

1. Create a paste container and decorate it with the `contenteditable` HTML attribute.
1. To paste a copied file, handle the `paste` event of the container.
1. To insert the newly pasted file, use the `DataTransfer` object within the handler.

```Index.cshtml
    @(Html.Kendo().Upload()
        .Name("files")
        .Async(a => a
            .Save("Async_Save", "Upload")
            .Remove("Async_Remove", "Upload")
            .AutoUpload(false)
        )
    )

    <div class="paste-area" contenteditable="true">
        Paste Area
    </div>
```
```Script.js
    <script>
        $(function(){
            $(".paste-area").on("paste", function(e){
                if (e.originalEvent.clipboardData.files.length) { // Assert if a file is pasted.
                    const fileObject = e.originalEvent.clipboardData.files[0]; // Get the pasted file object.

                    const fileInput = $("#files")[0]; // Get the file input.
                    const dataTransfer = new DataTransfer(); // Create a new DataTransfer object instance.

                    dataTransfer.items.add(fileObject) // Add the pasted file object to the DataTransfer object.
                    fileInput.files = dataTransfer.files; // Change the file input's files.

                    $("#files").trigger("change"); // Trigger the change event of the Upload.
                } else {
                  alert(
                    "No image data was found in your clipboard. Copy an image first or take a screenshot."
                  );
                }
            });
        });
    </script>
```

For the complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/mmOsQJlh07s1j6qK25) example.

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

* [Telerik REPL: Copy and Paste Files in the Upload](https://netcorerepl.telerik.com/mmOsQJlh07s1j6qK25)
* [Client-Side API Reference of the Upload for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Server-Side API Reference of the Upload for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/upload)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
