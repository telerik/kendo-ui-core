---
title: Overview
page_title: How to use the Kendo UI MobileScrollView HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Mobile ScrollView widget
description: Learn how to initialize Kendo UI MobileScrollView for ASP.NET MVC, handle Kendo UI MobileScrollView Events, access an existing scrollview with MobileScrollView HtmlHelper extension documentation.
---

# MobileScrollView

The MobileScrollView HtmlHelper extension is a server-side wrapper for the [Kendo UI Mobile ScrollView](/api/mobile/scrollview) widget. It allows you to configure the Kendo UI Mobile ScrollView
from server-side code.

## Getting started

The following tutorial shows how to configure Kendo UI MobileScrollView for ASP.NET MVC.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }
1. Add a Kendo UI MobileScrollView to the Index view. As most mobile widgets MobileScrollView must be initialized within MobileView content
    - Index.aspx (ASPX)

            <% Html.Kendo().MobileView()
                    .Name("scrollview-home")
                    .Title("Photo Gallery")
                    .Content(() =>
                    {
                        %>
                        <div id="scrollview-container">
                        <%
                        Html.Kendo().MobileScrollView()
                            .Page(2)
                            .Items(items =>
                            {
                                items.Add().HtmlAttributes(new { @class = "photo photo1" });
                                items.Add().HtmlAttributes(new { @class = "photo photo2" });
                                items.Add().HtmlAttributes(new { @class = "photo photo3" });
                                items.Add().HtmlAttributes(new { @class = "photo photo4" });
                                items.Add().HtmlAttributes(new { @class = "photo photo5" });
                                items.Add().HtmlAttributes(new { @class = "photo photo6" });
                                items.Add().HtmlAttributes(new { @class = "photo photo7" });
                                items.Add().HtmlAttributes(new { @class = "photo photo8" });
                                items.Add().HtmlAttributes(new { @class = "photo photo9" });
                                items.Add().HtmlAttributes(new { @class = "photo photo10" });
                            })
                            .FitItemPerPage(true)
                            .Render();
                        %>
                        </div>
                        <%
                    })
                    .Render();
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileView()
                    .Name("scrollview-home")
                    .Title("Photo Gallery")
                    .Content(
                        @<text>
                        <div id="scrollview-container">
                        @(Html.Kendo().MobileScrollView()
                            .Page(2)
                            .Items(items =>
                            {
                                items.Add().HtmlAttributes(new { @class = "photo photo1" });
                                items.Add().HtmlAttributes(new { @class = "photo photo2" });
                                items.Add().HtmlAttributes(new { @class = "photo photo3" });
                                items.Add().HtmlAttributes(new { @class = "photo photo4" });
                                items.Add().HtmlAttributes(new { @class = "photo photo5" });
                                items.Add().HtmlAttributes(new { @class = "photo photo6" });
                                items.Add().HtmlAttributes(new { @class = "photo photo7" });
                                items.Add().HtmlAttributes(new { @class = "photo photo8" });
                                items.Add().HtmlAttributes(new { @class = "photo photo9" });
                                items.Add().HtmlAttributes(new { @class = "photo photo10" });
                            })
                            .FitItemPerPage(true))
                        </div>
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

## Getting reference to the Kendo UI MobileScrollView widget

To get a reference to a scrollview instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/mobile/scrollview#methods) of the scrollview.

### Example - get reference to a Kendo UI MobileScrollView instance

    @(Html.Kendo().MobileScrollView()
            .Name("scrollView")
            .Items(items =>
            {
                items.Add().HtmlAttributes(new { @class = "photo photo1" });
                items.Add().HtmlAttributes(new { @class = "photo photo2" });
            })
            .FitItemPerPage(true))
    <script>
    $(function() {
        // Notice that the Name() of the scrollview is used to get its client-side instance
        var scrollview = $("#scrollView").data("kendoMobileScrollView");
    });
    </script>


## Handling Kendo UI MobileScrollView events

You can subscribe to all [events](/api/mobile/scrollview#events) exposed by the widget:

### Example - subscribe to event by handler name (ASPX)

    <%: Html.Kendo().MobileScrollView()
            .Name("scrollView")
            .Items(items =>
            {
                items.Add().HtmlAttributes(new { @class = "photo photo1" });
                items.Add().HtmlAttributes(new { @class = "photo photo2" });
            })
            .Events(events => events
                .Change("onChange")
            )
            .FitItemPerPage(true)
    %>

    <script>
    function onChange() {
        //Handle the change event
    }
    </script>


### Example - subscribe to event by handler name (Razor)

    @(Html.Kendo().MobileScrollView()
        .Name("scrollView")
        .Items(items =>
        {
            items.Add().HtmlAttributes(new { @class = "photo photo1" });
            items.Add().HtmlAttributes(new { @class = "photo photo2" });
        })
        .Events(events => events
            .Change("onChange")
        )
        .FitItemPerPage(true))

    <script>
    function onChange() {
        //Handle the change event
    }
    </script>
