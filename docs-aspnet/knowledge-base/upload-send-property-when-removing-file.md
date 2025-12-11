---
title: Sending a Model Property to the Server When Removing a File from the Upload
description: Learn how to pass a Model property to the server when removing a file from the Telerik UI for {{ site.framework }} Upload component in asynchronous mode.
type: how-to
page_title: Sending a Model Property to the Server When Removing a File from the Upload
slug: upload-send-property-when-removing-file
tags: upload, asynchronous, remove, file, model, send, property, server
res_type: kb
components: ["general"]
---
## Environment
<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Upload</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.1.117 version</td>
 </tr>
</table>

## Description
I use the [Upload component in asynchronous mode](https://demos.telerik.com/{{ site.platform }}/upload/async), and by using its `Files()` configuration, I display an initial list of files when the page loads.
How can I pass a View Model property `Id` to the server when the user removes a file from the Upload list?

## Solution
1. Populate the Ids of the initially rendered files in hidden input elements on the same View, where the Upload component is defined.

```HtmlHelper
  @model UserViewModel

  @foreach(var file in Model.Files)
  {
      <input id="fileID_@file.Name" type="hidden" value="@file.Id" />
  }

  @(Html.Kendo().Upload()
        .Name("files")
        .Async(a => a
            .Save("Save", "Upload")
            .Remove("Remove", "Upload")
            .AutoUpload(true)
        )
        .Files(files =>
        {
            if(Model.Files != null)
            {
                foreach (var file in Model.Files)
                {
                    files.Add().Name(file.Name).Extension(file.Extension).Size(file.Size ?? 0);
                }
            }
        })
  )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @model UserViewModel

    @foreach(var file in Model.Files)
    {
      <input id="fileID_@file.Name" type="hidden" value="@file.Id" />
    }
    <kendo-upload name="files">
        <async save-url="@Url.Action("Save","Upload")" remove-url="@Url.Action("Remove","Upload")"  auto-upload="true"/>
        <files>
            @{
                if(Model.Files != null)
                {
                    foreach (var file in Model.Files)
                    {
                        <file name="@file.Name" extension="@file.Extension" size="@file.Size" />
                    }
                }
            }
        </files>
    </kendo-upload>
```
{% endif %}
```Model
  using Kendo.Mvc.UI;

  public class UserViewModel
  {
      public List<UploadPdfFile> Files { get; set; }
  }

  public class UploadPdfFile : UploadFile
  {
	public long Id { get; set; }
  }
```

2. Handle the `Remove` event of the Upload that triggers when an uploaded file is about to be removed. Get the `Id` of the file that will be removed from the respective hidden input, and send it to the server through the Upload Remove request.

```HtmlHelper
  @model UserViewModel

  @foreach(var file in Model.Files)
  {
      <input id="fileID_@file.Name" type="hidden" value="@file.Id" />
  }

  @(Html.Kendo().Upload()
        .Name("files")
        .Events(ev => ev.Remove("onRemove"))
        ...
  )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @model UserViewModel

    @foreach(var file in Model.Files)
    {
      <input id="fileID_@file.Name" type="hidden" value="@file.Id" />
    }
    <kendo-upload name="files" on-remove="onRemove">
        <!-- Other configuration -->
    </kendo-upload>
```
{% endif %}
```JS script
<script>
    function onRemove(e) {
        var fileName = e.files[0].name; // Get the name of the file that will be removed.
        var customFileId = 0;
        $.each($("input[id^='fileID_']"), function () { // Loop through the hidden inputs.
            var name = $(this).attr('id').split('_')[1]; // Extract the "Name" from the "id" attribute.
            if (name == fileName) {
                customFileId = $(this).val(); // Store the "Id" property of the file.
            }
        });
        e.data = { // Attach a data object to the passed event.
            fileId: customFileId 
        };
}
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
{% if site.core %}
* [Server-Side TagHelper API Reference of the Upload for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/upload)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
