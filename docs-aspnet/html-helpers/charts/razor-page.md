---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI for {{ site.framework }} Chart for remote binding in Razor Pages scenario."
slug: htmlhelper_chart_razorpages_aspnetcore
position: 2
---

# Chart in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Chart for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Chart component in a Razor Pages scenario.

For the complete project, refer to the [Chart in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Chart/ChartRemoteBinding.cshtml).

## Getting Started

The most flexible form of data binding is to use the [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}) component. To bind the Chart to a data set received from a remote endpoint within a Razor Pages application, follow the next steps:

1. Specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`.

    ```HtmlHelper_Index.cshtml
        @page
        @model IndexModel

        @(Html.Kendo().Chart<ElectricityProduction>()
            .Name("chart")
            .DataSource(ds => ds
                .Read(r => r.Url("/Index?handler=Read").Data("forgeryToken"))
            )
            ...
        )
    ```
    ```TagHelper_Index.cshtml
        @page
        @model IndexModel

        <kendo-chart name="chart">
            <datasource>
                <transport>
                    <read type="post" url="/Index?handler=Read" data="forgeryToken"/>
                </transport>
            </datasource>
            <!--Other configuration-->
        </kendo-chart>
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
        public static List<ElectricityProduction> production;

        public void OnGet()
        {
            if (production == null)
            {
                // Populate the "production" collection with data.
                production = new List<ElectricityProduction>();
                production.Add(new ElectricityProduction { Year = "2000", Solar = 18, Nuclear = 31807, Hydro = 4727, Wind = 62206 });
                production.Add(new ElectricityProduction { Year = "2001", Solar = 24, Nuclear = 43864, Hydro = 6759, Wind = 63708 });
                production.Add(new ElectricityProduction { Year = "2002", Solar = 30, Nuclear = 26270, Hydro = 9342, Wind = 63016 });
            }
        }

        public JsonResult OnPostRead()
        {
            return new JsonResult(production);
        }
    ```
    ```tab-Model
        public class ElectricityProduction
        {
            public string Year { get; set; }
            public int Solar { get; set; }
            public int Nuclear { get; set; }
            public int Hydro { get; set; }
            public int Wind { get; set; }
        }
    ```
    
## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Chart](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart)
* [Server-Side HtmlHelper API of the Chart](/api/chart)
* [Server-Side TagHelper API of the Chart](/api/taghelpers/chart)
* [Knowledge Base Section](/knowledge-base)
