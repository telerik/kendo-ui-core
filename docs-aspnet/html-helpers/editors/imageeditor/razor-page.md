---
title:  Razor Page
page_title: Configure a submit ImageEditor in Razor Page.
description: "An example on how to configure the Telerik UI ImageEditor HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_imageeditor_razorpage_aspnetcore
position: 3
---

# Razor Page

This article describes how to configure the Telerik UI ImageEditor HtmlHelper for {{ site.framework }} in a RazorPage scenario.

The example below demonstrates how to configure the ImageEditor to forward the content to a proxyURL in a RazorPage scenario even if the browser supports saving files locally. See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml) 
       
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

