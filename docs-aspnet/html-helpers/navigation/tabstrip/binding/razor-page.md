---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI TabStrip component for {{ site.framework }} in a Razor Page."
previous_url: /html-helpers/navigation/tabstrip/razor-page
slug: htmlhelpers_tabstrip_aspnetcore_razor_page
position: 7
---

# TabStrip in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI TabStrip for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the TabStrip component in a Razor Pages scenario.

For the complete project, refer to the [TabStrip in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/TabStrip/TabStripIndex.cshtml).

```HtmlHelper
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <div class="wrapper">
        @(Html.Kendo().TabStrip()
            .Name("tabstrip")
            .Items(tabstrip =>
            {
                tabstrip.Add().Text("Dimensions & Weights")
                    .Selected(true)
                    .LoadContentFrom(Url.Content("~/Content/TabStrip/ajaxContent1.html"));
                tabstrip.Add().Text("Engine")
                    .LoadContentFrom(Url.Content("~/Content/TabStrip/ajaxContent2.html"));
                tabstrip.Add().Text("Chassis")
                    .LoadContentFrom(Url.Content("~/Content/TabStrip/ajaxContent3.html"));
            })
        )
    </div>
	
```
{% if site.core %}
```TagHelper
<kendo-tabstrip name="tabstrip">
    <items>
        <tabstrip-item text="Dimensions & Weights"
                       selected="true"
                       content-url="@Url.Content("~/Content/TabStrip/ajaxContent1.html")">
        </tabstrip-item>
        <tabstrip-item text="Engine"
                        content-url="@Url.Content("~/Content/TabStrip/ajaxContent2.html")">
        </tabstrip-item>
        <tabstrip-item text="Chassis "
                       content-url="@Url.Content("~/Content/TabStrip/ajaxContent3.html")">
        </tabstrip-item>
    </items>
</kendo-tabstrip>
```
{% endif %}
```C# PageModel
	
    public void OnGet()
    {

    }
    
```
