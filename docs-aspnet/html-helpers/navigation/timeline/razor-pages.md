---
title: The Telerik UI Timeline in RazorPages
page_title: The Telerik UI Timeline in RazorPages
description: "Telerik UI Timeline for {{ site.framework }} in a RazorPages application."
slug: razorpages_timelinehelper_aspnetcore
position: 7
---

# Telerik UI Timeline in RazorPages

`RazorPage` is an alternative to the MVC pattern that makes page-focused coding easier and more productive. It consists of a `cshtml` file and a `cs` file (generally the two files have the same name). The Telerik UI Timeline for {{ site.framework }} can be integrated in such an application seamlessly.

For a runnable example, refer to the [Timeline in RazorPages example](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Timeline).

## Getting Started

To bind the Telerik UI Timeline to a data set  within a RazorPage:

1. Setup the Read URL in the `DataSource`. The URL should refer the name of the method in the `PageModel`.

    ```
        .DataSource(dt => dt
            .Read(r=>r.Url("/Timeline/TimelineBinding?handler=Events"))
        )
    ```

1. Within the `.cs` file, introduce ActionMethod to return the data set:

    ```
        public JsonResult OnGetEvents()
        {
            return new JsonResult(Events);
        }
    ```

## See Also

* [Server-Side API](/api/timeline)