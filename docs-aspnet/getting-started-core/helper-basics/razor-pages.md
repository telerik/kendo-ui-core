---
title: Razor Pages
page_title: Razor Pages
description: "Get started with Razor Pages and Progress Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC)."
previous_url: /getting-started/razor-pages-integration, /getting-started/installation/razor-pages-integration, /compatibility/razor-pages-integration
slug: razor_pages_integration_aspnetmvc6_aspnetmvc
permalink: /getting-started/helper-basics/razor-pages
position: 2
---

# Razor Pages

The ASP.NET Razor Pages framework was introduced in ASP.NET Core 2.0 as an alternative to the ASP.NET Core Model-View-Controller (MVC) framework. Some of the key features of Razor Pages are:


* Razor Pages is page-centric. A Razor page consists of a page (`.cshtml`) and a PageModel class (`.cshtml.cs`) with the same name. 
* The `@page` directive placed at the top of the page makes it a Razor Page. The page contains both HTML and server-side logic, which you include by using Razor syntax. 

* The `@model` directive specifies the type of the data that the page is expected to work with. The page uses the PageModel class itself as a view model. The required data is exposed as properties.
* The page handles requests directly, without using a controller. A naming convention is used to find the appropriate handler method to execute in the PageModel class. Handler methods are prefixed with the word `On` followed by the HTTP verb used for the request that they process: `OnGet`, `OnPost`, `OnGetAsync` and `OnPostAsync`. Following this convention, additional handlers can be included, for example `OnGetHelloWorld`.
* Razor Pages automatically implement antiforgery validation, which protects against cross-site request forgery (XSRF/CSRF) attacks.

You can find more information on Razor Pages in the [Microsoft Docs](https://docs.microsoft.com/en-us/aspnet/core/razor-pages/)

## Using Telerik UI for ASP.NET Core in a Razor Pages Project

There are two alternative approaches for adding Telerik UI for ASP.NET Core to a new Razor Pages project:

* Use the [Telerik Extensions for Visual Studio]({% slug newprojectwizards_visualstudio_aspnetcore %}) to create a new project. The **GRID RAZOR PAGES** template scaffolds a Razor Pages sample, which contains a Grid with enabled CRUD operations. The benefit of this approach is that the template will add the necessary configuration and dependencies automatically. You can focus on adding and configuring the UI components you need. 
* Use the default Visual Studio **ASP.NET Core Web Application** template, which is based on the ASP.NET Razor Pages framework.

   If you choose this approach, do not select **Web Application (Model-View-Controller)** when you create a new project. We demonstrate this approach in the [First Steps]({% slug gettingstarted_aspnetmvc6_aspnetmvc %}) article. The article walks you through configuring a new or an existing project to use Telerik UI for ASP.NET Core.

## Adding Components to a Razor Page

All Telerik UI for ASP.NET Core components are compatible with the ASP.NET Razor Pages framework. The following example demonstrates how to add a Grid to a Razor page, and configure its CRUD operations.

   
1. Add the `@model` directive and an AntiForgeryToken on top of the Razor page:

    ``` 
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Declare the Grid and setup the CRUD URLs in its `DataSource` configuration. Set the DataSource `Model.Id` configuration. The URL in these methods must refer to the name of the handler method in the `PageModel`:


    ```
        @(Html.Kendo().Grid<OrderViewModel>()
            .Name("grid")
            .Groupable()
            .Sortable()
            .Editable()
            .Scrollable()
            .ToolBar(x => x.Create())
            .Columns(columns =>
            {
                columns.Bound(column => column.Freight);
                columns.Bound(column => column.ShipName);
                columns.Bound(column => column.ShipCity);
                columns.Command(column =>
                {
                    column.Edit();
                    column.Destroy();
                }).Width(230);
            })
            .DataSource(ds => ds.Ajax()
                .Read(r => r.Url("/Index?handler=Read").Data("forgeryToken"))
                .Update(u => u.Url("/Index?handler=Update").Data("forgeryToken"))
                .Create(c => c.Url("/Index?handler=Create").Data("forgeryToken"))
                .Destroy(d => d.Url("/Index?handler=Destroy").Data("forgeryToken"))
                .Model(m => m.Id(id => id.OrderID))
                .PageSize(10)
            )
            .Pageable()
        )
    ```

1. Send the AntiForgeryToken with each POST request of the page. Additional paratemers can also be passed with the request:

    ```
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```
    
1. In the `PageModel` file, add a handler method for each of the CRUD operations:

    ```
        public class IndexModel : PageModel
        {
            public static IList<OrderViewModel> orders;

            public void OnGet()
            {
                if (orders == null)
                {
                    orders = new List<OrderViewModel>();

                    Enumerable.Range(0, 50).ToList().ForEach(i => orders.Add(new OrderViewModel
                    {
                        OrderID = i + 1,
                        Freight = i * 10,
                        OrderDate = new DateTime(2016, 9, 15).AddDays(i % 7),
                        ShipName = "ShipName " + i,
                        ShipCity = "ShipCity " + i
                    }));

                }
            }

            public JsonResult OnPostRead([DataSourceRequest] DataSourceRequest request)
            {
                return new JsonResult(orders.ToDataSourceResult(request));
            }

            public JsonResult OnPostCreate([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
            {
                order.OrderID = orders.Count + 2;
                orders.Add(order);

                return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
            }

            public JsonResult OnPostUpdate([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
            {
                orders.Where(x => x.OrderID == order.OrderID).Select(x => order);

                return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
            }

            public JsonResult OnPostDestroy([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
            {
                orders.Remove(orders.First(x => x.OrderID == order.OrderID));

                return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
            }
        }
    ```

## GitHub Repo with Razor Pages Examples

A sample project with Razor Pages examples, which demonstrates the usage of the Telerik UI for ASP.NET Core components, is located in the [ASP.NET Core Examples](https://github.com/telerik/ui-for-aspnet-core-examples) repository on GitHub.

## Razor Pages Examples

The table below contains links to available examples of using Telerik UI for ASP.NET Core components in Razor Pages.

{% include_relative razor-pages-list-of-helpers.html %}

## Anti-request Forgery

Razor pages are automatically protected from [XSRF/CSRF](https://docs.microsoft.com/en-us/aspnet/core/razor-pages/?view=aspnetcore-3.1&tabs=visual-studio#xsrf). This is why, when you bind a Telerik component to page methods, you need to pass an antiforgery token, in order to validate the request. For that purpose, you can use [kendo.antiForgeryTokens();](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/antiforgerytokens#antiforgerytokens). More on the anti-request forgery could be found on [Microsoft documentation](https://docs.microsoft.com/en-us/aspnet/core/security/anti-request-forgery?view=aspnetcore-3.1)

## Known Limitations

Razor Pages use `Page` in their routing mechanism which interferes with `GET` requests made by the Kendo UI DataSource. As a result, only `POST` requests should be used when paging is required.

## See Also

* [Configure a Custom DataSource for the Grid in Razor Pages]({% slug grid-custom-datasource-razor-ages %})
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
