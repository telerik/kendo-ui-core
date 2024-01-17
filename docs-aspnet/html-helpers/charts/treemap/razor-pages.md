---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI TreeMap for {{ site.framework }} in a Razor Pages application."
slug: razorpages_treemap_aspnetcore
position: 2
---

# TreeMap in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI TreeMap for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the TreeMap component in a Razor Pages scenario.

For the complete project, refer to the [TreeMap in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/TreeMap/TreeMapBinding.cshtml).

## Getting Started

To bind the TreeMap to a data set received from a remote endpoint within a Razor Pages application, follow the next steps:

1. Specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`. The `Model` configuration must contain the definition for `Children`—the name of the Model property that stores the collection of child items.

    ```HtmlHelper_Index.cshtml
        @page
        @model IndexModel

        @(Html.Kendo().TreeMap()
            .Name("treeMap")
            .DataSource(dataSource => dataSource
                .Read(r => r.Url("/Index?handler=ReadOptional"))
                .Model(m => m.Children("Items"))
            )
            ...
        )
    ```
    ```TagHelper_Index.cshtml
        @page
        @model IndexModel

        <kendo-treemap name="treeMap">
            <hierarchical-datasource>
                <transport>
                    <read url="/Index?handler=ReadOptional" />
                </transport>
                <schema>
                    <hierarchical-model children="Items"></hierarchical-model>
                </schema>
            </hierarchical-datasource>
            <!--Other configuration-->
        </kendo-treemap>
    ```

1. Add an `AntiForgeryToken` at the top of the page.

    ```
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the `AntiForgeryToken` with the Read request.

    ```
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied.

    ```
        <script>
            function forgeryToken() {
                return {
                    __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                    additionalParameter: "test"
                }
            }
        </script>
    ```
1. Within the `cshtml.cs` file, add a handler method for the Read operation that returns the dataset.

    ```tab-Index.cshtml.cs
        public static List<Population> TreeMapItems;

        public void OnGet()
        {
            if (TreeMapItems == null)
            {
                // Populate the "TreeMapItems" collection with data.
                TreeMapItems = new List<Population>();
                Population country1 = new Population("Country1", 4833722, new List<Population>());
                TreeMapItems.Add(country1);
                country1.Items.Add(new Population("City1", 212113, null));

                Population country2 = new Population("Country2", 735132, new List<Population>());
                TreeMapItems.Add(country2);
                country2.Items.Add(new Population("City2_1", 300950, null));
                country2.Items.Add(new Population("City2_2", 20200, null));
            }
        }

        public JsonResult OnPostReadOptional()
        {
            return new JsonResult(TreeMapItems);
        }
    ```
    ```tab-Model
        public class Population
        {
            public Population(string name, int value, List<Population> items)
            {
                Name = name;
                Value = value;
                Items = items;
            }

            public string Name { get; set; }
            public int Value { get; set; }
            public List<Population> Items { get; set; }
        }
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the TreeMap](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/treemap)
* [Server-Side HtmlHelper API of the TreeMap](/api/treemap)
* [Server-Side TagHelper API of the TreeMap](/api/taghelpers/treemap)
* [Knowledge Base Section](/knowledge-base)
