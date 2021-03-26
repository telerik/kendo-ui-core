---
title: Razor Pages
page_title: Configure a DataSource for the Telerik UI Sparkline for Remote Binding in Razor Pages.
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI Sparkline HtmlHelper for  {{ site.framework }} (MVC 6 or {{ site.framework }} MVC) in Razor Pages."
slug: htmlhelper_sparkline_razorpages_aspnetcore
position: 4
---
# Telerik UI Sparkline in Razor Pages

Razor Pages are an alternative to the MVC pattern. Razor Pages make page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cs` file (generally, the two files have the same name). You can seamlessly integrate the Telerik UI Sparkline for {{ site.framework }} in Razor Pages applications.

For a runnable example, refer to the [Sparkline in RazorPages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Sparkline).

## Getting Started

The most flexible form of data binding is to use the [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}) component. To bind the Telerik UI Sparkline to a data set within a RazorPage:

1. Configure the Read URL in the `DataSource`. The URL must refer to the method name in the `PageModel`:

    ```
        .DataSource(ds => ds
            .Read(r => r.Url("/Sparkline/SparklineRemoteBidning?handler=Read").Data("forgeryToken"))
            )
    ```

2. Add an AntiForgeryToken at the top of the RazorPage:

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

* [Basic Usage of the Sparklines HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/sparklines/index)
* [Server-Side API](/api/sparkline)
