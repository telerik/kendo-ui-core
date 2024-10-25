---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI Timeline for {{ site.framework }} in a Razor Pages application."
slug: razorpages_timelinehelper_aspnetcore
position: 2
---

# Timeline in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Timeline for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Timeline component in a Razor Pages scenario.

For the complete project, refer to the [Timeline in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Timeline/TimelineBinding.cshtml).

## Getting Started

To bind the Telerik UI Timeline to a data set  within a RazorPage:

1. Setup the Read URL in the `DataSource`. The URL should refer the name of the method in the `PageModel`.

    ```HtmlHelper
        .DataSource(dt => dt
            .Read(r=>r.Url("/Timeline/TimelineBinding?handler=Events"))
        )
    ```
    {% if site.core %}
    ```TagHelper
        <datasource>
            <transport>
                <read url="/Timeline/TimelineBinding?handler=Events" />
            </transport>
        </datasource>
    ```
    {% endif %}

1. Within the `.cs` file, introduce ActionMethod to return the data set:

    ```
        public JsonResult OnGetEvents()
        {
            return new JsonResult(Events);
        }
    ```

## See Also

* [Server-Side API](/api/timeline)