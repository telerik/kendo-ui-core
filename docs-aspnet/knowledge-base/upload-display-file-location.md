---
title: Display File Location for Each Uploaded File
description: Learn how to display the file location of the uploaded files when using the Telerik UI for {{ site.framework }} Upload component.
type: how-to
page_title: Display File Location for Each Uploaded File
slug: upload-display-file-location
tags: upload, display, file, location, link
ticketid: 1628324
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
  <td>Created with the 2023.3.1114 version</td>
 </tr>
</table>

## Description

How can I display the location of the uploaded file as a link within the Upload component?

## Solution

1. Define an Upload component in [asynchronous mode]({% slug htmlhelpers_upload_modes_of_operation_aspnetcore%}#asynchronous-mode).
1. Use the [`TemplateId`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/uploadbuilder#templateidsystemstring) option to define a template for rendering the files in the file list.
1. Update the `Save` Action method to return the file location of the uploaded file.
1. Subscribe to the [`Success`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/uploadeventbuilder#successsystemstring) event to intercept the received file location from the server. Select the anchor tag within the file template with jQuery and update the `href` attribute with the respective file location.

```View_HtmlHelper
    @(Html.Kendo().Upload()
        .Name("files")
        .TemplateId("fileTemplate")
        .Async(a => a
            .Save("Async_Save", "Home")
            .Remove("Remove", "Home")
            .AutoUpload(true)
        )
        .Events(ev => ev.Success("onSuccess"))
    )

    <script id="fileTemplate" type="text/x-kendo-template">
        <span class="k-progress"></span>
        <span class="k-file-group-wrapper">
            <span class="k-file-group k-icon k-i-file-image"></span>
            <span class="k-file-state"></span>
        </span>
        <span class="k-file-name-size-wrapper">
            <span class="k-file-name"><a href="" target="_blank">#=data.name#</a></span>
        </span>
        <strong class="k-upload-status">
            <button type="button" class="k-button k-icon-button k-button-md k-rounded-md k-button-flat k-button-flat-base k-upload-action"><span class="k-button-icon k-icon k-i-close k-i-x" title="Remove"></span>
            </button>
        </strong>
    </script>
```
{% if site.core %}
```View_TagHelper
  @addTagHelper *, Kendo.Mvc

   <kendo-upload name="files" template-id="fileTemplate"    on-success="onSuccess">
      <async auto-upload="true" 
        save-url="@Url.Action("Async_Save", "Home")" remove-url="@Url.Action("Remove", "Home")" />
    </kendo-upload>

    <script id="fileTemplate" type="text/x-kendo-template">
        <span class="k-progress"></span>
        <span class="k-file-group-wrapper">
            <span class="k-file-group k-icon k-i-file-image"></span>
            <span class="k-file-state"></span>
        </span>
        <span class="k-file-name-size-wrapper">
            <span class="k-file-name"><a href="" target="_blank">#=data.name#</a></span>
        </span>
        <strong class="k-upload-status">
            <button type="button" class="k-button k-icon-button k-button-md k-rounded-md k-button-flat k-button-flat-base k-upload-action"><span class="k-button-icon k-icon k-i-close k-i-x" title="Remove"></span>
            </button>
        </strong>
    </script>
```
{% endif %}
```Scripts
    <script>
        function onSuccess(e) {
            var uploadedFileName = e.files[0].name;
            var fileLocation = e.response.location;
            var fileLocationLinks = $(".k-file-name a");
            $.each(fileLocationLinks, function () {
                if ($(this).text() == uploadedFileName) {
                    $(this).attr("href", fileLocation);
                }
            });
        }
    </script>
```
{% if site.core %}
```Controller
    public async Task<ActionResult> Async_Save(IEnumerable<IFormFile> files)
    {
        string filesLocation = null;
        if (files != null)
        {
            foreach (var file in files)
            {
                var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
                var fileName = Path.GetFileName(fileContent.FileName.ToString().Trim('"'));
                var physicalPath = Path.Combine("App_Data", fileName);
                filesLocation = physicalPath;
                using (var fileStream = new FileStream(physicalPath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
            }
        }
        return Json(new { location = filesLocation });
    }
```
{% else %}
```Controller
    public ActionResult Async_Save(IEnumerable<HttpPostedFileBase> files)
    {
        string filesLocation = null;
        if (files != null)
        {
            foreach (var file in files)
            {
                var fileName = Path.GetFileName(file.FileName);
                var physicalPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);
                filesLocation = physicalPath;
                file.SaveAs(physicalPath);
            }
        }
        return Json(new { location = filesLocation }, JsonRequestBehavior.AllowGet);
    }
```
{% endif %}

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
