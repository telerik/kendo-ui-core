---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI ImageEditor component for {{ site.framework }} in a Razor Page."
components: ["imageeditor"]
slug: htmlhelpers_imageeditor_razorpage_aspnetcore
position: 4
---

# ImageEditor in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI ImageEditor for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Saving Images Through a Proxy

The example below demonstrates how to configure the ImageEditor to forward the content to a proxy URL in a Razor Pages scenario even if the browser supports saving files locally.

```HtmlHelper
    @page
    @model ImageEditorIndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    @(Html.Kendo().ImageEditor()
        .Name("imageEditor")
        .Height(900)
        .SaveAs(s => {
            s.FileName("image_edited.png");
            s.ForceProxy(true);
            s.ProxyURL(Url.Page("ImageEditorIndex", "Save"));
        })
        .ImageUrl(@Url.Content("~/images/2.jpg"))
    )
```
{% if site.core %}
```TagHelper
    @page
    @model ImageEditorIndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()
    
    <kendo-imageeditor name="imageEditor" height="900" image-url="@Url.Content("~/image/2.jpg")">
        <save-as file-name="image.png" 
            force-proxy="true"
            proxy-url="@Url.Page("ImageEditorIndex","Save")"/>
    </kendo-imageeditor>
```
{% endif%}
```C# PageModel
 public class ImageEditorIndexModel : PageModel
{       
    public void OnGet()
    {
    }

    public IActionResult OnPostSave(string contentType, string base64, string fileName)
    {
        var fileContents = Convert.FromBase64String(base64);

        return File(fileContents, contentType, fileName);
    }
}
```

For the complete project, refer to the [ImageEditor in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/ImageEditor/ImageEditorIndex.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the ImageEditor](https://docs.telerik.com/kendo-ui/api/javascript/ui/imageeditor)
* [Server-Side HtmlHelper API of the ImageEditor](/api/imageeditor)
* [Server-Side TagHelper API of the ImageEditor](/api/taghelpers/imageeditor)
* [Knowledge Base Section](/knowledge-base)

