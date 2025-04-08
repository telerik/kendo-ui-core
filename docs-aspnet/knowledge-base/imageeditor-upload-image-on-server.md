---
title: Uploading Edited Image on Server
description: An example on how to upload the edited image to the server when using the Telerik UI for {{ site.framework }} ImageEditor.
type: how-to
page_title: Uploading Edited Image on Server
slug: imageeditor-upload-image-on-server
tags: imageeditor, image, upload, server
ticketid: 1654940
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} ImageEditor</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2024.2.514 version</td>
 </tr>
</table>

## Description

How can I upload the edited image from the ImageEditor directly to the server?

## Solution

1. Add an external button (for example, above the ImageEditor) and handle its `click` event.

  ```HtmlHelper
    @(Html.Kendo().Button()
        .Name("uploadBtn")
        .Content("Save Image")
        .Events(ev => ev.Click("onClick")))

    @(Html.Kendo().ImageEditor()
        .Name("imageEditor")
        .SaveAs(s => s.FileName("image_edited.png"))
    )

    <script>
      function onClick() {
        // "Save Image" button click event handler.
      }
    </script>
  ```
  {% if site.core %}
  ```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-button name="uploadBtn" on-click="onClick">
      Save Image
    </kendo-button>

    <kendo-imageeditor name="imageEditor">
        <save-as file-name="image_edited.png" />
    </kendo-imageeditor>

    <script>
      function onClick() {
        // "Save Image" button click event handler.
      }
    </script>
  ```
  {% endif %}

1. Within the `click` event handler, get a reference to the ImageEditor and call the [`getCanvasElement()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/imageeditor/methods/getcanvaselement) method to get the canvas element.

1. Use the [`toDataURL()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL) method to convert the canvas to Base64 and trigger an AJAX request to the server to send the edited image.

  ```JS scripts
    <script>
      function onClick() {
        var imageEditor = $("#imageEditor").getKendoImageEditor();
        var canvas = imageEditor.getCanvasElement();
        var base64Content = canvas.toDataURL();
        $.ajax({
          url: "@Url.Action("UploadImage","Home")",
          type: 'POST',
          data: JSON.stringify({ base64: base64Content }),
          contentType: 'application/json',
          success: function(response) {
              console.log("Uploaded successfully.");
          }
        });
      }
    </script>
  ```
  ```C# HomeController.cs
    [HttpPost]
    public JsonResult UploadImage(string base64)
    {
        var fileContent = Convert.FromBase64String(base64);
        ...
        return Json(true);
    }
  ```

## More {{ site.framework }} ImageEditor Resources

* [{{ site.framework }} ImageEditor Documentation]({%slug htmlhelpers_imageeditor_aspnetcore%})

* [{{ site.framework }} ImageEditor Demos](https://demos.telerik.com/{{ site.platform }}/imageeditor)

{% if site.core %}
* [{{ site.framework }} ImageEditor Product Page](https://www.telerik.com/aspnet-core-ui/image-editor)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} ImageEditor Product Page](https://www.telerik.com/aspnet-mvc/image-editor)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the ImageEditor for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/imageeditor)
* [Server-Side API Reference of the ImageEditor for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/imageeditor)
{% if site.core %}
* [Server-Side TagHelper API Reference of the ImageEditor for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/imageeditor)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
