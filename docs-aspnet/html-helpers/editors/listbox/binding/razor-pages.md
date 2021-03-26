---
title: The Telerik UI ListBox in RazorPages
page_title: The Telerik UI ListBox in RazorPages
description: "Telerik UI ListBox for {{ site.framework }} in a RazorPages application."
slug: razorpages_listBoxhelper_aspnetcore
position: 1
---

# Telerik UI ListBox in RazorPages

`RazorPage` is an alternative to the MVC pattern that makes page-focused coding easier and more productive. It consists of a `cshtml` file and a `cs` file (generally the two files have the same name). The Telerik UI ListBox for {{ site.framework }} can be integrated in such an application seamlessly.

For a runnable example, refer to the [ListBox in RazorPages example](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/ListBox).

## Getting Started

To bind the Telerik UI ListBox to a data set  within a RazorPage:

1. Setup the Read URL in the `DataSource`. The URL should refer the name of the method in the `PageModel`.

    ```
        .DataSource(ds=>ds
            .Read(r=>r.Url("/ListBox/ListBoxBinding?handler=ReadOptional"))
        )
    ```

1. Within the `.cs` file, introduce an ActionMethod to return the data set:

    ```
        public JsonResult OnGetReadOptional()
        {
            return new JsonResult(ListBoxItems);
        }
    ```

## See Also

* [Server-Side API](/api/listbox)