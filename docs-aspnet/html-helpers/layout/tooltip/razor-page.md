---
title: Razor Page
page_title: Razor Page
description: "An example on how to configure the Telerik UI Tooltip HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_tooltip_aspnetcore_razor_page
position: 3
---

# Razor Page

This article demonstrates how to configure the Telerik UI Tooltip HtmlHelper for {{ site.framework }} in a RazorPage scenario.

For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)        
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
```tab-PageModel(cshtml.cs)      
	
    public void OnGet()
    {

    }
    
```
