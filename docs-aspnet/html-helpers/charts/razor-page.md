---
title: Razor Pages
page_title: Configure a DataSource for the Telerik UI Chart for Remote Binding in Razor Pages.
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI Chart HtmlHelper for  {{ site.framework }} (MVC 6 or {{ site.framework }} MVC) in Razor Pages."
slug: htmlhelper_chart_razorpages_aspnetcore
position: 5
---

# Telerik UI Chart in Razor Pages

Razor Pages are an alternative to the MVC pattern. Razor Pages make page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cs` file (generally, the two files have the same name). You can seamlessly integrate the Telerik UI Chart for {{ site.framework }} in Razor Pages applications.

For a runnable example, refer to the [Chart in RazorPages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Chart/ChartRemoteBinding.cshtml).

## Getting Started

The most flexible form of data binding is to use the [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}) component. To bind the Telerik UI Chart to a data set within a RazorPage:

1. Configure the Read URL in the `DataSource`. The URL must refer to the method name in the `PageModel`:

    ```
        .DataSource(ds => ds
            .Read(r => r.Url("/Chart/ChartRemoteBinding?handler=Read").Data("forgeryToken"))
        )
    ```

2. Add an AntiForgeryToken at the top of the RazorPage

    ```
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

3. Send the AntiForgeryToken with the Read request of the page. Additional parameters can also be supplied:

    ```
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

4. Within the `.cs` file, introduce `JsonResult` to return the data set:

    ```tab-.cs
        public static List<ElectricityProduction> production;

        public void OnGet()
        {
            if (production == null)
            {
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

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Basic Usage of the Area Chart HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/area-charts/index)
* [Server-Side API](/api/chart)
