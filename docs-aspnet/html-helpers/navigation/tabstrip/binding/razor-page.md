---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI TabStrip component for {{ site.framework }} in a Razor Page."
components: ["tabstrip"]
previous_url: /html-helpers/navigation/tabstrip/razor-page
slug: htmlhelpers_tabstrip_aspnetcore_razor_page
position: 7
---

# TabStrip in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI ColorPicker for {{ site.framework }} in Razor Pages applications.

> You can use any of the available [data binding approaches]({% slug tabstrip_databinding_aspnetmvc %}#data-binding-approaches) to bind the component to data in a Razor Pages application.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Remote Data

The following example shows how to configure the TabStrip for remote data binding with AJAX content loading in a Razor Pages application.

```HtmlHelper
@page
@model IndexModel

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<div class="wrapper">
    @(Html.Kendo().TabStrip()
        .Name("tabstrip")
        .Items(tabstrip =>
        {
            tabstrip.Add().Text("Tab1").Selected(true)
            .LoadContentFrom(Url.Page("Index", "Tab1"))
            .Data("additionalData");

            tabstrip.Add().Text("Tab2")
            .LoadContentFrom(Url.Page("Index", "Tab2"));
        })
    )
</div>

<script>  
    function additionalData() {     
        return {
            myParam: "myValue"
        }
    }
</script>
```
{% if site.core %}
```TagHelper
@page
@model IndexModel

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<kendo-tabstrip name="tabstrip">
    <items>
        <tabstrip-item text="Tab1"
            selected="true"
            content-url="@Url.Page("Index", "Tab1")" data="additionalData">
        </tabstrip-item>
        <tabstrip-item text="Tab2" content-url="@Url.Page("Index", "Tab2")">
        </tabstrip-item>
    </items>
</kendo-tabstrip>

<script>  
    function additionalData() {     
        return {
            myParam: "myValue"
        }
    }
</script>
```
{% endif %}
```C# PageModel
public class IndexModel : PageModel
{
    public void OnGet()
    {
    }

    public PartialViewResult OnGetTab1(string myParam)
    {
        return Partial("_Tab1", myParam);
    }

    public PartialViewResult OnGetTab2()
    {
        return Partial("_Tab2");
    }
}
```

For the complete project, refer to the [TabStrip in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/TabStrip/TabStripIndex.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the TabStrip](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/tabstrip)
* [Server-Side HtmlHelper API of the TabStrip](/api/tabstrip)
* [Server-Side TagHelper API of the TabStrip](/api/taghelpers/tabstrip)
