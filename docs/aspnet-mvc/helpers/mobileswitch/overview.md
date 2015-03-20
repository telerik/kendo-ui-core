---
title: Overview
page_title: How to use the Kendo UI MobileSwitch HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Mobile Switch widget
description: Learn how to initialize Kendo UI MobileSwitch for ASP.NET MVC, handle Kendo UI MobileSwitch Events, access an existing switch with MobileSwitch HtmlHelper extension documentation.
---

# MobileSwitch

The MobileSwitch HtmlHelper extension is a server-side wrapper for the [Kendo UI Mobile Switch](/api/mobile/switch) widget. It allows you to configure the Kendo UI Mobile Switch
from server-side code.

## Getting started

The following tutorial shows how to configure Kendo UI MobileSwitch for ASP.NET MVC.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }
1. Add a Kendo UI MobileSwitch to the Index view. As most mobile widgets MobileSwitch must be initialized within MobileView content
    - Index.aspx (ASPX)

            <% Html.Kendo().MobileView()
                    .Name("switch-view")
                    .Title("Inbox")
                    .Content(() =>
                    {
                        %>

                        <%: Html.Kendo().MobileSwitch()
                                .Name("subscription-switch")
                                .Checked(true)
                                .OnLabel("YES")
                                .OffLabel("NO")
                        %>
                        <%
                    })
                    .Render();
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileView()
                .Name("switch-view")
                .Title("Inbox")
                .Content(
                    @<text>

                    @(Html.Kendo().MobileSwitch()
                            .Name("subscription-switch")
                            .Checked(true)
                            .OnLabel("YES")
                            .OffLabel("NO")
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

## Getting reference to the Kendo UI MobileSwitch widget

To get a reference to a switch instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/mobile/switch#methods) of the switch.

### Example - get reference to a Kendo UI MobileSwitch instance

    @(Html.Kendo().MobileSwitch()
            .Name("subscription-switch")
            .Checked(true)
            .OnLabel("YES")
            .OffLabel("NO")
    )
    <script>
    $(function() {
        // Notice that the Name() of the switch is used to get its client-side instance
        var switch = $("#subscription-switch").data("kendoMobileSwitch");
    });
    </script>


## Handling Kendo UI MobileSwitch events

You can subscribe to all [events](/api/mobile/switch#events) exposed by the widget:

### Example - subscribe to event by handler name (ASPX)

    <%: Html.Kendo().MobileSwitch()
            .Name("mobile-switch")
            .Events(events => events.Change("onChange"))
    %>

    <script>
    function onChange() {
        //Handle the change event
    }
    </script>


### Example - subscribe to event by handler name (Razor)

    @(Html.Kendo().MobileSwitch()
        .Name("mobile-switch")
        .Events(events => events.Change("onChange"))
    )

    <script>
    function onChange() {
        //Handle the change event
    }
    </script>
