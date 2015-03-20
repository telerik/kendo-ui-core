---
title: Overview
page_title: How to use the Kendo UI MobileLayout HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Mobile Layout widget
description: Learn how to initialize Kendo UI MobileLayout for ASP.NET MVC, handle Kendo UI MobileLayout Events, access an existing layout with MobileLayout HtmlHelper extension documentation.
---

# MobileLayout

The MobileLayout HtmlHelper extension is a server-side wrapper for the [Kendo UI Mobile Layout](/api/mobile/layout) widget. It allows you to configure the Kendo UI Mobile Layout
from server-side code.

## Getting started

The following tutorial shows how to configure Kendo UI MobileLayout for ASP.NET MVC.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            return View();
        }

1. Add a Kendo UI MobileLayout to the Index view.
    - Index.aspx (ASPX)

            <% Html.Kendo().MobileLayout()
                    .Name("layout") //Layout `id`
                    .Platform("ios")
                    .Header(() =>
                    {
                        //Layout header template
                        Html.Kendo().MobileNavBar()
                            .Content(navbar =>
                            {
                                %>
                                <%: Html.Kendo().MobileBackButton()
                                        .Align(MobileButtonAlign.Left)
                                        .HtmlAttributes(new { @class = "nav-button" })
                                        .Text("Back")
                                %>
                                <%: navbar.ViewTitle("iOS Platform")%>
                                <%
                            })
                            .Render();
                    })
                    .Footer(() =>
                    {
                        //Layout footer template
                        Html.Kendo().MobileTabStrip()
                            .Items(items => {
                                items.Add().Icon("contacts").Text("Profile");
                                items.Add().Icon("settings").Text("Settings");
                            })
                            .Render();
                    })
                   .Render();
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileLayout()
                    .Name("layout")
                    .Platform("ios")
                    .Header(obj =>
                        Html.Kendo().MobileNavBar()
                            .Content(navbar =>
                                @<text>
                                    @(Html.Kendo().MobileBackButton()
                                        .Align(MobileButtonAlign.Left)
                                        .HtmlAttributes(new { @class = "nav-button" })
                                        .Url(Url.RouteUrl(new { controller = "suite" }))
                                        .Text("Back"))

                                    @navbar.ViewTitle("iOS Platform")
                                </text>)
                    )
                    .Footer(obj =>
                        Html.Kendo().MobileTabStrip()
                            .Items(items => {
                                items.Add().Icon("contacts").Text("Profile");
                                items.Add().Icon("settings").Text("Settings");
                            })
                    )
            )

1. Add View that will use the layout
    - Index.aspx (ASPX)

            <% Html.Kendo().MobileView()
                    .Name("layoutView")
                    .Layout("layout") // the `Name` of the layout
                    .Content(() =>
                    {
                        %>
                        <p>
                            This examples shows the platform specific layouts.
                            Change the OS to see how the header and footer changes.
                        </p>
                        <%
                    })
                    .Render();
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileView()
                    .Name("layoutView")
                    .Layout("layout") // the `Name` of the layout
                    .Content(
                        @<text>
                            <p>
                                This examples shows the platform specific layouts.
                                Change the OS to see how the header and footer changes.
                            </p>
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

## Getting reference to the Kendo UI MobileLayout widget

To get a reference to a layout instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/mobile/layout#methods) of the layout.

### Example - get reference to a Kendo UI MobileLayout instance

    @(Html.Kendo().MobileLayout()
            .Name("MobileLayout")
    )
    <script>
    $(function() {
        // Notice that the Name() of the layout is used to get its client-side instance
        var layout = $("#MobileLayout").data("kendoMobileLayout");
    });
    </script>


## Handling Kendo UI MobileLayout events

You can subscribe to all [events](/api/mobile/layout#events) exposed by the widget:

### Example - subscribe to event by handler name (ASPX)

    <%: Html.Kendo().MobileLayout()
            .Name("MobileLayout")
            .Events(events => events
                .Show("onShow")
            )
    %>

    <script>
    function onShow() {
        //Handle the show event
    }
    </script>


### Example - subscribe to event by handler name (Razor)

    @(Html.Kendo().MobileLayout()
            .Name("MobileLayout")
            .Events(events => events
                .Show("onShow")
            )
    )

    <script>
    function onShow() {
        //Handle the show event
    }
    </script>
