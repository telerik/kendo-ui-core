---
title: Overview
page_title: How to use the Kendo UI MobileButtonGroup HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Mobile ButtonGroup widget
description: Learn how to initialize Kendo UI MobileButtonGroup for ASP.NET MVC, handle Kendo UI MobileButtonGroup Events, access an existing buttongroup with MobileButtonGroup HtmlHelper extension documentation.
---

# MobileButtonGroup

The MobileButtonGroup HtmlHelper extension is a server-side wrapper for the [Kendo UI Mobile ButtonGroup](/api/mobile/buttongroup) widget. It allows you to configure the Kendo UI Mobile ButtonGroup
from server-side code.

## Getting started

The following tutorial shows how to configure Kendo UI MobileButtonGroup for ASP.NET MVC.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }
1. Add a Kendo UI MobileButtonGroup to the Index view. As most mobile widgets MobileButtonGroup must be initialized within MobileView content
    - Index.aspx (ASPX)

            <% Html.Kendo().MobileView()
                    .Name("buttongroup-view")
                    .Title("Inbox")
                    .Content(() =>
                    {
                        %>

                        <%: Html.Kendo().MobileButtonGroup()
                                .Name("select-period")
                                .Items(items =>
                                {
                                    items.Add().Text("Month");
                                    items.Add().Text("Quarter");
                                    items.Add().Text("Year");
                                })
                                .Index(0)
                        %>
                        <%
                    })
                    .Render();
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileView()
                .Name("buttongroup-view")
                .Title("Inbox")
                .Content(
                    @<text>

                    @(Html.Kendo().MobileButtonGroup()
                        .Name("select-period")
                        .Items(items =>
                        {
                            items.Add().Text("Month");
                            items.Add().Text("Quarter");
                            items.Add().Text("Year");
                        })
                        .Index(0)
                    )

                </text>)
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

## Getting reference to the Kendo UI MobileButtonGroup widget

To get a reference to a buttongroup instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/mobile/buttongroup#methods) of the buttongroup.

### Example - get reference to a Kendo UI MobileButtonGroup instance

    @(Html.Kendo().MobileButtonGroup()
        .Name("select-period")
        .Items(items =>
        {
            items.Add().Text("Month");
            items.Add().Text("Quarter");
            items.Add().Text("Year");
        })
        .Index(0)
    )
    <script>
    $(function() {
        // Notice that the Name() of the buttongroup is used to get its client-side instance
        var buttongroup = $("#select-period").data("kendoMobileButtonGroup");
    });
    </script>


## Handling Kendo UI MobileButtonGroup events

You can subscribe to all [events](/api/mobile/buttongroup#events) exposed by the widget:

### Example - subscribe to event by handler name (ASPX)

    <%: Html.Kendo().MobileButtonGroup()
            .Name("select-period")
            .Items(items =>
            {
                items.Add().Text("Month");
                items.Add().Text("Quarter");
                items.Add().Text("Year");
            })
            .Index(0)
            .Events(events => events.Select("onSelect"))
    %>

    <script>
    function onSelect() {
        //Handle the select event
    }
    </script>


### Example - subscribe to event by handler name (Razor)

    @(Html.Kendo().MobileButtonGroup()
            .Name("select-period")
            .Items(items =>
            {
                items.Add().Text("Month");
                items.Add().Text("Quarter");
                items.Add().Text("Year");
            })
            .Index(0)
            .Events(events => events.Select("onSelect"))
    )

    <script>
    function onSelect() {
        //Handle the select event
    }
    </script>
