---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI Calendar for {{ site.framework }} in a RazorPages application."
slug: razorpages_calendar_aspnetcore
position: 7
---

# Calendar in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Calendar for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Calendar component in a Razor Pages scenario.

For the complete project, refer to the [Calendar in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Calendar/CalendarIndex.cshtml).


```tab-HtmlHelper(csthml)   
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    @(Html.Kendo().Calendar()
        .Name("calendar")
    )

```

{% if site.core %}
```tab-TagHelper(cshtml)
    inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    @addTagHelper *, Kendo.Mvc

    <kendo-calendar name="calendar">
    </kendo-calendar>
```
{% endif %}

```tab-PageModel(cshtml.cs)      
	
    public void OnGet()
    {

    }
```

## See Also

* [Server-Side API](/api/calendar)
