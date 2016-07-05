---
title: Overview
page_title: Overview | Hybrid UI ListView HtmlHelper
description: "Get started with the server-side wrapper for the hybrid Kendo UI ListView widget for ASP.NET MVC."
previous_url: /aspnet-mvc/helpers/mobilelistview/overview
slug: overview_hybridlistview_aspnetmvc
position: 1
---

# Hybrid ListView HtmlHelper Overview

The hybrid ListView HtmlHelper extension is a server-side wrapper for the [hybrid Kendo UI ListView](http://demos.telerik.com/kendo-ui/m/index#mobile-listview/index) widget. It allows you to configure the hybrid Kendo UI ListView from server-side code.

## Getting Started

### The Basics

There are two ways to configure the hybrid ListView for ASP.NET MVC:

* By using an item builder&mdash;Manually create the hybrid ListView items structure.
* By using data binding&mdash;Bind the hybrid ListView to a collection of objects.

### Items Builder

Below are listed the steps for you to follow when defining the items of a hybrid Kendo UI ListView.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Open `HomeController.cs` and modify the `Index` action method.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a hybrid ListView to the `Index` view. It must be inside the View content.

###### Example

```tab-ASPX

        <% Html.Kendo().MobileView()
                .Name("listview-home")
                .Title("Destinations")
                .Content(() =>
                {
                    %>
                    <% Html.Kendo().MobileListView().Style("inset").Type("group")
                           .Items(root => {
                                //Add the root item.
                                root.Add().Text("Africa").Items(items =>
                                {
                                    //Add the nested link item.
                                    items.AddLink().Text("Nairobi").Icon("toprated");
                                });

                                root.Add().Text("America").Items(items =>
                                {
                                    items.AddLink().Text("Boston").Icon("globe");
                                    items.AddLink().Text("Ottawa").Icon("globe");
                                    items.AddLink().Text("San Francisco").Icon("toprated");
                                });
                            })
                            .Render();
                    %>
                    <%
                })
                .Render();
        %>
```
```tab-Razor

        @(Html.Kendo().MobileView()
                .Name("listview-home")
                .Title("Destinations")
                .Content(obj =>
                    Html.Kendo().MobileListView().Style("inset").Type("group")
                        .Items(root =>
                        {
                            //Add the root item.
                            root.Add().Text("Africa").Items(items =>
                            {
                                //Add the nested link item.
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
```

**Step 4** Initialize the mobile application.

###### Example

```tab-ASPX

        <%: Html.Kendo().MobileApplication()
                .ServerNavigation(true)
        %>
```
```tab-Razor

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )
```

**Step 5** Build and run the application.

### Data Binding

Below are listed the steps for you to follow when configuring the hybrid Kendo UI ListView for data binding.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Open `HomeController.cs` and modify the `Index` action method.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a new action method that returns the data populating the ListView.

###### Example

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

            //Return the data as JSON.
            return Json(products.ToDataSourceResult(request));
        }

**Step 4** Add a hybrid ListView to the `Index` view. It must be inside the View content.

###### Example

```tab-ASPX

        <%: Html.Kendo().MobileView()
                .Name("grouped")
                .Title("ListView")
                .Content(obj =>
                    Html.Kendo().MobileListView()
                        .Name("grouped-listview")
                        .TemplateId("template") //configure the item template
                        .FixedHeaders(true)
                        .DataSource(dataSource =>
                            dataSource
                                .Read("Read", "Home") //configure DataSource `Read` action
                                .Group(group => group.Add("Letter", typeof(string)))
                        )
                )
        %>
```
```tab-Razor

        @(Html.Kendo().MobileView()
                .Name("grouped")
                .Title("ListView")
                .Content(obj =>
                    Html.Kendo().MobileListView()
                        .Name("grouped-listview")
                        .TemplateId("template") //configure the item template
                        .FixedHeaders(true)
                        .DataSource(dataSource =>
                            dataSource
                                .Read("Read", "Home") //configure DataSource `Read` action
                                .Group(group => group.Add("Letter", typeof(string)))
                        )
                )
        )
```

**Step 5** Initialize the mobile application.

###### Example

```tab-ASPX

        <%: Html.Kendo().MobileApplication()
                .ServerNavigation(true)
        %>
```
```tab-Razor

        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )
```

**Step 6** Build and run the application.

## Reference

### Instances

You can reference a hybrid Layout instance by using the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified through the `Name()` method. Once a reference is established, use the [hybrid ListView API](/api/javascript/mobile/ui/listview#methods) to control its behavior.

###### Example

        @(Html.Kendo().MobileListView()
                .Name("MobileListView")
        )
        <script>
        $(function() {
            //Notice that the Name() of the ListView is used to get its client-side instance.
            var listview = $("#MobileListView").data("kendoMobileListView");
        });
        </script>

## Event Handling

You can subscribe to all hybrid ListView [events](/api/javascript/mobile/ui/listview#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().MobileListView()
                .Name("MobileListView")
                .Events(events => events
                    .Click("onClick")
                )
        %>

        <script>
        function onClick() {
            //Handle the click event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().MobileListView()
                .Name("MobileListView")
                .Events(events => events
                    .Click("onClick")
                )
        )

        <script>
        function onClick() {
            //Handle the click event.
        }
        </script>
```

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the ListView:

* [ASP.NET MVC API Reference: Hybrid UI ListViewBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileListViewBuilder)
* [Overview of the Hybrid UI ListView Widget]({% slug overview_hybridlistview %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
