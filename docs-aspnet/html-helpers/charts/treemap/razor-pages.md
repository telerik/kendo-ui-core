---
title: The Telerik UI TreeMap in RazorPages
page_title: The Telerik UI TreeMap in RazorPages
description: "Telerik UI TreeMap for {{ site.framework }} in a RazorPages application."
slug: razorpages_treemap_aspnetcore
position: 7
---

# Telerik UI TreeMap in RazorPages

`RazorPage` is an alternative to the MVC pattern that makes page-focused coding easier and more productive. It consists of a `cshtml` file and a `cs` file (generally the two files have the same name). The Telerik UI TreeMap for {{ site.framework }} can be integrated in such an application seamlessly.

For a runnable example, refer to the [TreeMap in RazorPages example](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/TreeMap).

## Getting Started

To bind the Telerik UI TreeMap to a data set within a RazorPage:

1. Setup the Read URL in the `DataSource`. The URL should refer the name of the method in the `PageModel`. And the Model should contain the definition for Children:

    ```
      .DataSource(dataSource => dataSource
          .Read(r => r.Url("/TreeMap/TreeMapBinding?handler=ReadOptional"))
          .Model(m => m.Children("Items"))
      )
    ```

2. Within the `.cs` file, introduce an ActionMethod to return the data set:

    ```
        public JsonResult OnGetReadOptional()
        {
            return new JsonResult(TreeMapItems);
        }
    ```

## See Also

* [Server-Side API](/api/treemap)
