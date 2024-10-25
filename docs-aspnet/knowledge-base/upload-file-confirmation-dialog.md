---
title: Show Confirm Dialog before Uploading Files
description: An example of how to add a confirmation dialog box before uploading files in the {{ site.product }} Upload component.
page_title: Show Confirm Dialog before Uploading Files
slug: upload-file-confirmation-dialog
tags: upload, dialog, confirmation, file, telerik, core, mvc
ticketid: 1660745
res_type: kb
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
How can I implement a confirm dialog before the user uploads a file when the Upload is in asynchronous mode?

## Solution

Use the [Kendo UI Confirm Dialog](https://demos.telerik.com/kendo-ui/dialog/predefined-dialogs) and an [Asynchronous Upload Mode](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/upload/modes-of-operation#asynchronous-mode) with [AutoUpload](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/configuration/async.autoupload) **turned off**.<br>
> This is a customized solution that does not support other modes. Such as [Chunk Upload](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/upload/chunk-upload) or [Synchronous Mode](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/upload/modes-of-operation) of operation.

To achieve the desired outcome:

1. Subscribe to the [Select](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/uploadeventbuilder#selectsystemstring) event handler of the Upload.
1. Within the handler, remove the default click handler from the upload button programmatically by using the [off](https://api.jquery.com/off/) jQuery method.
1. Prevent the default upload workflow. 
1. Depending on the user's response from the dialog, either call the [upload](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/methods/upload?_gl=1*102tlvl*_gcl_au*MTU0Nzc4NDk1LjE3MjAxODc4MjM.*_ga*Mzc1Nzg4OTUxLjE3MjAxODc4MjE.*_ga_9JSNBCSF54*MTcyNDEzODY3OS4xNi4xLjE3MjQxNjUyNzguNTQuMC4w#upload) method if confirmed or the [removeAllFiles](https://docs.telerik.com/kendo-ui/api/javascript/ui/upload/methods/removeallfiles?_gl=1*102tlvl*_gcl_au*MTU0Nzc4NDk1LjE3MjAxODc4MjM.*_ga*Mzc1Nzg4OTUxLjE3MjAxODc4MjE.*_ga_9JSNBCSF54*MTcyNDEzODY3OS4xNi4xLjE3MjQxNjUyNzguNTQuMC4w#removeallfiles) method if cancelled. 

The following example demonstrates how to implement these steps:

```HtmlHelper
   @(Html.Kendo().Upload()
    .Name("files")
    .Async(a => a   
        .Save("OnPostUpload", "Home")   
        .Remove("OnPostRemove", "Home") 
        .AutoUpload(false)
    )
    .Events(ev => ev.Select("onSelect"))
)
```
 {% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-upload name="files" on-select="onSelect">
        <async auto-upload="false"
               save-url="@Url.Action("OnPostUpload", "Home")"
              remove-url="@Url.Action("OnPostRemove","Home")" />
    </kendo-upload>
```
 {% endif %}

```Script.js
<script>
    function onUpload(e){
        let upload = $("#files").getKendoUpload();

        kendo.confirm("Confirm Uploading")
            .done(function () {
                /* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("User accepted");
                upload.upload();
            })
            .fail(function() {
                /* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("User rejected");
                upload.removeAllFiles();                
            });
    }
    function onSelect(e) {
        setTimeout(function () {
            var uploadBtn = e.sender.wrapper.find(".k-upload-selected");
            $(e.sender.wrapper).off("click",".k-upload-selected");
            $(uploadBtn).bind("click", onUpload);
        }, 200)
    }
</script>
```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Confirmation Before Uploading Files HtmlHelper](https://netcorerepl.telerik.com/Qyksbplf39vN1b5R08)
* [Confirmation Before Uploading Files TagHelper](https://netcorerepl.telerik.com/QIailJFp44CyWf0r29)

{% else %}
For a runnable example based on the code above, refer to the [REPL example on Confirmation Before Uploading Files](https://netcorerepl.telerik.com/Qyksbplf39vN1b5R08).
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
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
