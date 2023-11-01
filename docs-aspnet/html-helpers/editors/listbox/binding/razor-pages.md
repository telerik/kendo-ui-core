---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI ListBox for {{ site.framework }} in a Razor Pages application."
slug: razorpages_listBoxhelper_aspnetcore
position: 1
---

# ListBox in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI ListBox for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the ListBox component in a Razor Pages scenario.

For the complete project, refer to the [ListBox in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/ListBox/ListBoxBinding.cshtml).

## Getting Started

To bind the Telerik UI ListBox to a data set  within a RazorPage:

1. Setup the Read URL in the `DataSource`. The URL should refer the name of the method in the `PageModel`.

    ```HtmlHelper
        .DataSource(ds=>ds
            .Read(r=>r.Url("/ListBox/ListBoxBinding?handler=ReadOptional"))
        )
    ```
    ```TagHelper
    <datasource>
        <transport>
            <read url="/ListBox/ListBoxBinding?handler=ReadOptional"/>
        </transport>
    </datasource>
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