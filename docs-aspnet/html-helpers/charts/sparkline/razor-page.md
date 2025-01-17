---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI Sparkline component for {{ site.framework }} in a Razor Pages application with an example on how to configure its remote binding DataSource."
slug: htmlhelper_sparkline_razorpages_aspnetcore
position: 3
---

# Sparkline in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name).

You can seamlessly integrate the Telerik UI Sparkline for {{ site.framework }} in Razor Pages applications.

This article describes how to configure a basic Sparkline component in a Razor Pages scenario.

For the complete project, refer to the [Sparkline in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Sparkline/SparklineRemoteBidning.cshtml).

## Getting Started

The most flexible form of data binding is to use the [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}) component. To bind the Sparkline to a data set received from a remote endpoint within a Razor Pages application, follow the next steps:

1. Specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`.

    ```HtmlHelper_Index.cshtml
        @page
        @model IndexModel

        @(Html.Kendo().Sparkline()
            .Name("sparkline-weather")
            .DataSource(ds => ds
                .Read(r => r.Url("/Index?handler=Read").Data("forgeryToken"))
            )
            ...
        )
    ```
    ```TagHelper_Index.cshtml
        @page
        @model IndexModel

        <kendo-sparkline name="sparkline-weather">
            <datasource type="DataSourceTagHelperType.Ajax">
                <transport>
                    <read type="post" url="/Index?handler=Read" data="forgeryToken" />
                </transport>
            </datasource>
            <!--Other configuration-->
        </kendo-sparkline>
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
        public static List<Weather> items;

        public void OnGet()
        {
            var random = new Random();
            if (items == null)
            {
                // Populate the "items" collection with data.
                items = new List<Weather>();
                Enumerable.Range(0, 30).ToList().ForEach(i => items.Add(new Weather
                {
                    Id = i,
                    Rain = random.Next(0, 10),
                    TMax = random.Next(2, 11),
                    Wind = random.Next(8, 30)
                }));
            }
        }

        public JsonResult OnPostRead()
        {
            return new JsonResult(items);
        }
    ```
    ```tab-Model
        public class Weather
        {
            public int Id { get; set; }
            public double Rain { get; set; }
            public double TMax { get; set; }
            public double Wind { get; set; }
        }
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Sparkline](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/sparkline)
* [Server-Side HtmlHelper API of the Sparkline](/api/sparkline)
* [Server-Side TagHelper API of the Sparkline](/api/taghelpers/sparkline)
* [Knowledge Base Section](/knowledge-base)
