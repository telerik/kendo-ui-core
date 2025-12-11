---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI Calendar for {{ site.framework }} in a RazorPages application."
components: ["calendar"]
slug: razorpages_calendar_aspnetcore
position: 11
---

# Calendar in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Calendar for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Calendar component in a Razor Pages scenario.

For the complete project, refer to the [Calendar in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Calendar/CalendarIndex.cshtml).

```HtmlHelper
@page
@model CalendarIndexModel
@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

@(Html.Kendo().Calendar()
    .Name("calendar")
)
```
{% if site.core %}
```TagHelper
@page
@model CalendarIndexModel
@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

@addTagHelper *, Kendo.Mvc

<kendo-calendar name="calendar">
</kendo-calendar>
```
{% endif %}
```C# PageModel
public class CalendarIndexModel : PageModel
{	
    public void OnGet()
    {

    }
}
```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Calendar](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar)
* [Server-Side HtmlHelper API of the Calenadr](/api/calendar)
* [Server-Side TagHelper API of the Calendar](/api/taghelpers/calendar)
* [Knowledge Base Section](/knowledge-base)
