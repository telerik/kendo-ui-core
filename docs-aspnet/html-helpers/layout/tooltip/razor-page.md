---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Tooltip component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_tooltip_aspnetcore_razor_page
position: 3
---

# Tooltip in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Tooltip for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Tooltip component in a Razor Pages scenario.

For the complete project, refer to the [Tooltip in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Tooltip/TooltipIndex.cshtml).

```HtmlHelper
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    @(Html.Kendo().Tooltip()
        .For("#images")
        .Filter("a")
        .ContentTemplateId("template")
        .Position(TooltipPosition.Top)
        .Width(500)
        .Height(500)
    )

    <div class="description">
        <h3>
            Hover over an image for a larger size.
        </h3>
    </div>
    <ul id="images" class="photos">
        <li><a href="#" data-id="1"><img src="/Images/ScrollViewImages/image1.jpg" width="110" height="110" /></a></li>
        <li><a href="#" data-id="2"><img src="/Images/ScrollViewImages/image2.jpg" width="110" height="110" /></a></li>
        <li><a href="#" data-id="3"><img src="/Images/ScrollViewImages/image3.jpg" width="110" height="110" /></a></li>
        <li><a href="#" data-id="4"><img src="/Images/ScrollViewImages/image4.jpg" width="110" height="110" /></a></li>
        <li><a href="#" data-id="5"><img src="/Images/ScrollViewImages/image5.jpg" width="110" height="110" /></a></li>
        <li><a href="#" data-id="6"><img src="/Images/ScrollViewImages/image6.jpg" width="110" height="110" /></a></li>
        <li><a href="#" data-id="7"><img src="/Images/ScrollViewImages/image7.jpg" width="110" height="110" /></a></li>
        <li><a href="#" data-id="8"><img src="/Images/ScrollViewImages/image8.jpg" width="110" height="110" /></a></li>
        <li><a href="#" data-id="9"><img src="/Images/ScrollViewImages/image9.jpg" width="110" height="110" /></a></li>
    </ul>

    <script id="template" type="text/x-kendo-template">
        <div class="template-wrapper">
            <img src="@Url.Content("~/Images/ScrollViewImages/image")#=target.data('id')#.jpg" alt="#=target.data('id')#"  width="500" height="500" />
        </div>
    </script>
	
```
```TagHelper
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <kendo-tooltip name="images" filter="a" content-template-id="template" position="top" width="500" height="500">
    </kendo-tooltip>

    <div class="description">
        <h3>
            Hover over an image for a larger size.
        </h3>
    </div>
    <ul id="images" class="photos">
        <li><a href="#" data-id="1"><img src="/Images/ScrollViewImages/image1.jpg" width="110" height="110" /></a></li>
        <li><a href="#" data-id="2"><img src="/Images/ScrollViewImages/image2.jpg" width="110" height="110" /></a></li>
        <li><a href="#" data-id="3"><img src="/Images/ScrollViewImages/image3.jpg" width="110" height="110" /></a></li>
        <li><a href="#" data-id="4"><img src="/Images/ScrollViewImages/image4.jpg" width="110" height="110" /></a></li>
        <li><a href="#" data-id="5"><img src="/Images/ScrollViewImages/image5.jpg" width="110" height="110" /></a></li>
        <li><a href="#" data-id="6"><img src="/Images/ScrollViewImages/image6.jpg" width="110" height="110" /></a></li>
        <li><a href="#" data-id="7"><img src="/Images/ScrollViewImages/image7.jpg" width="110" height="110" /></a></li>
        <li><a href="#" data-id="8"><img src="/Images/ScrollViewImages/image8.jpg" width="110" height="110" /></a></li>
        <li><a href="#" data-id="9"><img src="/Images/ScrollViewImages/image9.jpg" width="110" height="110" /></a></li>
    </ul>

    <script id="template" type="text/x-kendo-template">
        <div class="template-wrapper">
            <img src="@Url.Content("~/Images/ScrollViewImages/image")#=target.data('id')#.jpg" alt="#=target.data('id')#"  width="500" height="500" />
        </div>
    </script>
	
```
```C# PageModel
	
    public void OnGet()
    {

    }
    
```
