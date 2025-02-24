---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Rating component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_rating_razorpage_aspnetcore
position: 9
---

# Rating in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Rating for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Rating component in a Razor Pages scenario.

For the complete project, refer to the [Rating in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Rating/RatingIndex.cshtml).

```tab-HtmlHelper(csthml)        
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
    <kendo-rating name="ratingHalf"
                min="@Model.Min"
                max="@Model.Max"
                value="@Model.Value"
                precision="@Model.Precision">
    </kendo-rating>
```
```tab-PageModel(cshtml.cs)      
	
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
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [Rating Overview]({% slug htmlhelpers_rating_aspnetcore_overview %})

