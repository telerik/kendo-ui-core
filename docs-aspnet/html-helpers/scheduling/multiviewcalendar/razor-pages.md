---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI MultiViewCalendar for {{ site.framework }} in a Razor Pages application."
slug: razorpages_multiviewcalendar_aspnetcore
position: 11
---


# MultiViewCalendar in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI MultiViewCalendar for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the MultiViewCalendar component in a Razor Pages scenario.

For the complete project, refer to the [MultiViewCalendar in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/MultiViewCalendar/MultiViewCalendarIndex.cshtml).

## Getting Started

```tab-HtmlHelper(cshtml)
    @page

    <div>
        @(Html.Kendo().MultiViewCalendar()
            .Name("multiViewCalendar")
        )

    </div>
```
{% if site.core %}
```tab-TagHelper(cshtml)
    @page

    <div>
        <kendo-multiviewcalendar name="multiViewCalendar">
        </kendo-multiviewcalendar>
    </div>

```
{% endif %}

```tab-PageModel(cshtml.cs)

 public void OnGet()
 {
 }

```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the MultiViewCalendar](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiviewcalendar)
* [Server-Side HtmlHelper API of the MultiViewCalendar](/api/multiviewcalendar)
* [Server-Side TagHelper API of the MultiViewCalendar](/api/taghelpers/multiviewcalendar)
* [Knowledge Base Section](/knowledge-base)
