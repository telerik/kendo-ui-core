---
title: Overview
page_title: How to use the Kendo UI MobileView HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Mobile View widget
description: Learn how to initialize Kendo UI MobileView for ASP.NET MVC, handle Kendo UI MobileView Events, access an existing view with MobileView HtmlHelper extension documentation.
---

# MobileView

The MobileView HtmlHelper extension is a server-side wrapper for the [Kendo UI Mobile View](/api/mobile/view) widget. It allows you to configure the Kendo UI Mobile View
from server-side code.

## Getting started

The following tutorial shows how to configure Kendo UI MobileView for ASP.NET MVC.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            return View();
        }

1. Add a Kendo UI MobileView to the Index view.
    - Index.aspx (ASPX)

            <% Html.Kendo().MobileView()
                    .Title("View Title")
                    .Content(() =>
                    {
                        %>
                            View Content Template
                        <%
                    })
                    .Render();
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileView()
                    .Title("View Title")
                    .Content(
                        @<text>
                            View Content Template
                        </text>
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

## Getting reference to the Kendo UI MobileView widget

To get a reference to a view instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/mobile/view#methods) of the view.

### Example - get reference to a Kendo UI MobileView instance

    @(Html.Kendo().MobileView()
            .Name("MobileView")
    )
    <script>
    $(function() {
        // Notice that the Name() of the view is used to get its client-side instance
        var view = $("#Mobileview").data("kendoMobileView");
    });
    </script>


## Handling Kendo UI MobileView events

You can subscribe to all [events](/api/mobile/view#events) exposed by the widget:

### Example - subscribe to event by handler name (ASPX)

    <%: Html.Kendo().MobileView()
            .Name("MobileView")
            .Events(events => events
                .AfterShow("onAfterShow")
            )
    %>

    <script>
    function onAfterShow() {
        //Handle the show event
    }
    </script>


### Example - subscribe to event by handler name (Razor)

    @(Html.Kendo().MobileView()
            .Name("MobileView")
            .Events(events => events
                .AfterShow("onAfterShow")
            )
    )

    <script>
    function onAfterShow() {
        //Handle the show event
    }
    </script>
