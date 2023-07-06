---
title: Adding Image Previews before Uploading Files in the Upload
page_title: Adding Image Previews before Uploading Files in the Upload
description: Learn how to add an image preview to a file with the Telerik UI for {{ site.framework }} Upload component.
slug: upload-add-image-preview
tags: telerik, upload, add, image, preview, before, uploading, files
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

How can I add an image preview that appears before the user uploads a file when working with the {{ site.product }} Upload?

## Solution

1. Create a function that executes the logic for adding an image preview upon selecting a file.
1. To handle the file selection, subscribe to the [`Select`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/uploadeventbuilder#selectsystemstring) event.
1. Within the handler, call the previously created function for each file entry and pass the Upload's wrapper.

```Index.cshtml
    @(Html.Kendo().Upload()
        .Name("files")
        .Events(e => e.Select("onSelect"))
        .Async(a => a
            .Save("Async_Save", "Upload")
            .Remove("Async_Remove", "Upload")
            .AutoUpload(false)
        )
    )
```
```Script.js
<script>
    function onSelect(e){
      var wrapper = this.wrapper;
      e.files.forEach(file => { // Loop through each file entry.
           setTimeout(function () {
               addPreview(file, wrapper); // Call the function for adding an image preview and pass both the file object and wrapper.
           });                        
      })
    }

    function addPreview(file, wrapper) {
        var raw = file.rawFile; // Get the raw file information.
        var reader = new FileReader(); // Create a new FileReader instance.

        if (raw) {
          reader.onloadend = function () { // Ensure that the file is loaded.
            var preview = $("<img class='image-preview'>").attr("src", this.result); // Create an image element.

            wrapper.find(".k-file[data-uid='" + file.uid + "'] .k-file-group-wrapper")
              .replaceWith(preview); // Replace the HTML markup of the current file with the newly created image.
          };

          reader.readAsDataURL(raw); // Read the content of the file.
        }
      }
</script> 
```

For the complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/wmOCcTGO07hJtAEI55) example.

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

* [Telerik REPL: Adding Image Previews before Uploading Files in the Upload](https://netcorerepl.telerik.com/wmOCcTGO07hJtAEI55)
* [Client-Side API Reference of the Upload for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload)
* [Server-Side API Reference of the Upload for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/upload)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
