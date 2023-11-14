---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI ImageEditor component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_imageeditor_razorpage_aspnetcore
position: 3
---

# ImageEditor in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI ImageEditor for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the ImageEditor component in a Razor Pages scenario.

For the complete project, refer to the [ImageEditor in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/ImageEditor/ImageEditorIndex.cshtml).

The example below demonstrates how to configure the ImageEditor to forward the content to a proxyURL in a Razor Pages scenario even if the browser supports saving files locally.

```tab-HtmlHelper(cshtml) 
       
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
```tab-TagHelper(cshtml)

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()
    
    <kendo-imageeditor name="imageEditor" height="900" image-url="@Url.Content("~/image/2.jpg")">
        <save-as file-name="image.png" 
                 force-proxy="true"
                 proxy-url="@Url.Action("ImageEditorIndex","Save")"/>
    </kendo-imageeditor>
```
{% endif%}
```tab-PageModel(cshtml.cs)      

    public IActionResult OnPostSave(string contentType, string base64, string fileName)
    {
        var fileContents = Convert.FromBase64String(base64);

        return File(fileContents, contentType, fileName);
    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [ImageEditor Overview]({% slug htmlhelpers_imageeditor_aspnetcore %})

