---
title: Overview
page_title: How to use the Kendo UI MobileButton HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Mobile Button widget
description: Learn how to initialize Kendo UI MobileButton for ASP.NET MVC, handle Kendo UI MobileButton Events, access an existing button with MobileButton HtmlHelper extension documentation.
---

# MobileButton

The MobileButton HtmlHelper extension is a server-side wrapper for the [Kendo UI Mobile Button](/api/mobile/button) widget. It allows you to configure the Kendo UI Mobile Button
from server-side code.

## Getting started

The following tutorial shows how to configure Kendo UI MobileButton for ASP.NET MVC.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }
1. Add a Kendo UI MobileButton to the Index view. As most mobile widgets MobileButton must be initialized within MobileView content
    - Index.aspx (ASPX)

            <% Html.Kendo().MobileView()
                    .Name("button-view")
                    .Title("Inbox")
                    .Content(() =>
                    {
                        %>

                        <%: Html.Kendo().MobileButton()
                                .Name("mobile-button2")
                                .Text("Trigger Event 2")
                                .HtmlAttributes(new { style = "margin: 2em; text-align: center;" })
                        %>
                        <%
                    })
                    .Render();
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileView()
                .Name("button-view")
                .Title("Inbox")
                .Content(
                    @<text>

                    @(Html.Kendo().MobileButton()
                            .Name("mobile-button2")
                            .Text("Trigger Event 2")
                            .HtmlAttributes(new { style = "margin: 2em; text-align: center;" })
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

## Getting reference to the Kendo UI MobileButton widget

To get a reference to a button instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/mobile/button#methods) of the button.

### Example - get reference to a Kendo UI MobileButton instance

    @(Html.Kendo().MobileButton()
            .Name("MobileButton")
            .Text("Button Text")
    )
    <script>
    $(function() {
        // Notice that the Name() of the button is used to get its client-side instance
        var button = $("#MobileButton").data("kendoMobileButton");
    });
    </script>


## Handling Kendo UI MobileButton events

You can subscribe to all [events](/api/mobile/button#events) exposed by the widget:

### Example - subscribe to event by handler name (ASPX)

    <%: Html.Kendo().MobileButton()
            .Name("MobileButton")
            .Text("Button Text")
            .Events(events => events
                .Click("onClick")
            )
    %>

    <script>
    function onClick() {
        //Handle the open event
    }
    </script>


### Example - subscribe to event by handler name (Razor)

    @(Html.Kendo().MobileButton()
            .Name("MobileButton")
            .Text("Button Text")
            .Events(events => events
                .Click("onClick")
            )
    )

    <script>
    function onClick() {
        //Handle the click event
    }
    </script>
