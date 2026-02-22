---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Rating component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_rating_razorpage_aspnetcore
components: ["rating"]
position: 9
---

# Rating in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Rating for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Local Data

The following example demonstrates how to configure the Rating options and value based on properties from the `PageModel`.

```HtmlHelper
    @page
    @model RatingIndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()
	
	@(Html.Kendo().Rating()
		.Name("ratingHalf")
		.Min(Model.Min)
		.Max(Model.Max)
		.Value(Model.Value)
		.Precision(Model.Precision)
	)
```
```TagHelper
    @page
    @model RatingIndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()

    <kendo-rating name="ratingHalf"
        min="@Model.Min"
        max="@Model.Max"
        value="@Model.Value"
        precision="@Model.Precision">
    </kendo-rating>
```
```C# PageModel
public class RatingIndexModel : PageModel
{
	public string Precision { get; set; }
    public int Min { get; set; }
    public int Max { get; set; }
    public double Value { get; set; }

    public void OnGet()
    {
        Min = 1;
        Max = 10;
        Precision = "half";
        Value = 7.5;
    }
}
```

For the complete project, refer to the [Rating in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Rating/RatingIndex.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Rating](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/rating)
* [Server-Side HtmlHelper API of the Rating](/api/rating)
* [Server-Side TagHelper API of the Rating](/api/taghelpers/rating)
* [Knowledge Base Section](/knowledge-base)

