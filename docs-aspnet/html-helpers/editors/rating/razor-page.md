---
title:  Razor Page
page_title: Configure a Rating in Razor Page.
description: "An example on how to configure the Telerik UI Rating component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_rating_razorpage_aspnetcore
position: 7
---

# Razor Page

This article describes how to configure the Telerik UI Rating for {{ site.framework }} in a RazorPage scenario.

For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

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

