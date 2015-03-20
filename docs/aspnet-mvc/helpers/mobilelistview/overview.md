---
title: Overview
page_title: How to use the Kendo UI MobileListView HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Mobile ListView widget
description: Learn how to initialize Kendo UI MobileListView for ASP.NET MVC, handle Kendo UI MobileListView Events, access an existing view with MobileListView HtmlHelper extension documentation.
---

# MobileListView

The MobileListView HtmlHelper extension is a server-side wrapper for the [Kendo UI Mobile ListView](/api/mobile/listview) widget. It allows you to configure the Kendo UI Mobile ListView
from server-side code.

## Getting started

There are two ways to configure Kend UI Mobile ListView fo ASP.NET MVC

* using item builder - manually creating MobileListView items structure
* using data binding - binding MobileListView to collection of objects

### Manually building MobileListView items

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            return View();
        }

1. Add a Kendo UI MobileListView to the Index view. It must be inside MobileView content
    - Index.aspx (ASPX)

            <% Html.Kendo().MobileView()
                    .Name("listview-home")
                    .Title("Destinations")
                    .Content(() =>
                    {
                        %>
                        <% Html.Kendo().MobileListView().Style("inset").Type("group")
                               .Items(root => {
                                    //add root item
                                    root.Add().Text("Africa").Items(items =>
                                    {
                                        //add nested link item
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

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileView()
                    .Name("listview-home")
                    .Title("Destinations")
                    .Content(obj =>
                        Html.Kendo().MobileListView().Style("inset").Type("group")
                            .Items(root =>
                            {
                                //add root item
                                root.Add().Text("Africa").Items(items =>
                                {
                                    //add nested link item
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

1. Initialize the mobile application
    - Index.aspx (ASPX)

            <%: Html.Kendo().MobileApplication()
                    .ServerNavigation(true)
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileApplication()
                .ServerNavigation(true)
            )

1. Build and run the application

### Data binding

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            return View();
        }

1. Add a new action method which will return data to populate the listview:

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

            //return the data as JSON
            return Json(products.ToDataSourceResult(request));
        }

1. Add a Kendo UI MobileListView to the Index view. It must be inside MobileView content
    - Index.aspx (ASPX)

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

    - Index.cshtml (Razor)

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

1. Initialize the mobile application
    - Index.aspx (ASPX)

            <%: Html.Kendo().MobileApplication()
                    .ServerNavigation(true)
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileApplication()
                .ServerNavigation(true)
            )

1. Build and run the application

## Getting reference to the Kendo UI MobileListView widget

To get a reference to a view instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/mobile/listview#methods) of the view.

### Example - get reference to a Kendo UI MobileListView instance

    @(Html.Kendo().MobileListView()
            .Name("MobileListView")
    )
    <script>
    $(function() {
        // Notice that the Name() of the listview is used to get its client-side instance
        var listview = $("#MobileListView").data("kendoMobileListView");
    });
    </script>


## Handling Kendo UI MobileListView events

You can subscribe to all [events](/api/mobile/listview#events) exposed by the widget:

### Example - subscribe to event by handler name (ASPX)

    <%: Html.Kendo().MobileListView()
            .Name("MobileListView")
            .Events(events => events
                .Click("onClick")
            )
    %>

    <script>
    function onClick() {
        //Handle the click event
    }
    </script>


### Example - subscribe to event by handler name (Razor)

    @(Html.Kendo().MobileListView()
            .Name("MobileListView")
            .Events(events => events
                .Click("onClick")
            )
    )

    <script>
    function onClick() {
        //Handle the click event
    }
    </script>
