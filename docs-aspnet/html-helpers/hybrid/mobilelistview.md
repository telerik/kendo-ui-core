---
title: ListView
page_title: ListView Overview
description: "Learn the basics when working with the hybrid Telerik UI ListView HtmlHelper for ASP.NET MVC."
previous_url: /helpers/hybrid/mobilelistview/overview, /helpers/hybrid/mobilelistview
slug: overview_hybridlistview_aspnetmvc
---

# Hybrid ListView HtmlHelper Overview

The hybrid Telerik UI ListView HtmlHelper for ASP.NET MVC is a server-side wrapper for the hybrid Kendo UI ListView widget.

The ListView displays flat or grouped lists of items.

* [Demo page for the ListView](https://demos.telerik.com/kendo-ui/m/index#mobile-listview/index)

## Basic Configuration

To configure the ListView, use either of the following approaches:

* Items builder&mdash;Manually create the hybrid ListView items structure.
* Data binding&mdash;Bind the hybrid ListView to a collection of objects.

### Using Items Builder

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            return View();
        }

1. Add a hybrid ListView to the `Index` view. It must be inside the View content.

        @(Html.Kendo().MobileView()
            .Name("listview-home")
            .Title("Destinations")
            .Content(obj =>
                Html.Kendo().MobileListView().Style("inset").Type("group")
                    .Items(root =>
                    {
                        // Add the root item.
                        root.Add().Text("Africa").Items(items =>
                        {
                            // Add the nested link item.
                            items.AddLink().Text("Nairobi").Icon("toprated");
                        });

                        root.Add().Text("America").Items(items =>
                        {
                            items.AddLink().Text("Boston").Icon("globe");
                            items.AddLink().Text("Ottawa").Icon("globe");
                            items.AddLink().Text("San Francisco").Icon("toprated");
                        });
                    })
            )
        )

1. Initialize the mobile application.

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )

1. Build and run the application.

### Using Data Binding

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %}), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc6_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            return View();
        }

1. Add a new action method that returns the data populating the ListView.

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Read([DataSourceRequest] DataSourceRequest request)
        {
            var products = new[] {
                new { Name = "Sashimi salad", Letter = "S" },
                new { Name = "Chirashi sushi", Letter = "C" },
                new { Name = "Seaweed salad", Letter = "S" },
                new { Name = "Edamame", Letter = "E" },
                new { Name = "Miso soup", Letter = "M" },
                new { Name = "Maguro", Letter = "M" },
                new { Name = "Shake", Letter = "S" },
                new { Name = "Shiromi", Letter = "S" },
                new { Name = "Tekka maki", Letter = "T" },
                new { Name = "Hosomaki Mix", Letter = "H" },
                new { Name = "California rolls", Letter = "C" },
                new { Name = "Seattle rolls", Letter = "S" },
                new { Name = "Spicy Tuna rolls", Letter = "S" },
                new { Name = "Ebi rolls", Letter = "E" },
                new { Name = "Chicken Teriyaki", Letter = "C" },
                new { Name = "Salmon Teriyaki", Letter = "S" },
                new { Name = "Gohan", Letter = "G" },
                new { Name = "Tori Katsu", Letter = "T" },
                new { Name = "Yaki Udon", Letter = "Y" }
            };

            // Return the data as JSON.
            return Json(products.ToDataSourceResult(request));
        }

1. Add the hybrid Telerik UI ListView to the `Index` view. It must be inside the View content.

        @(Html.Kendo().MobileView()
            .Name("grouped")
            .Title("ListView")
            .Content(obj =>
                Html.Kendo().MobileListView()
                    .Name("grouped-listview")
                    .TemplateId("template") // Configure the item template.
                    .FixedHeaders(true)
                    .DataSource(dataSource =>
                        dataSource
                            .Read("Read", "Home") // Configure DataSource `Read` action.
                            .Group(group => group.Add("Letter", typeof(string)))
                    )
            )
        )

1. Initialize the mobile application.

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )

1. Build and run the application.

## Events

You can subscribe to all hybrid ListView [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview#events).

The following example demonstrates how to subscribe to events by a handler name.

    @(Html.Kendo().MobileListView()
            .Name("MobileListView")
            .Events(events => events
                .Click("onClick")
            )
    )

    <script>
        function onClick() {
            // Handle the click event.
        }
    </script>

## Referencing Existing Instances

You can reference a hybrid Layout instance by using the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method and the value specified through the `Name()` method. Once a reference is established, use the [hybrid ListView client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview#methods) to control its behavior.

    @(Html.Kendo().MobileListView()
            .Name("MobileListView")
    )
    <script>
        $(function() {
            // The Name() of the ListView is used to get its client-side instance.
            var listview = $("#MobileListView").data("kendoMobileListView");
        });
    </script>
    
## See Also

* [Hybrid ListViewBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MobileListViewBuilder)
