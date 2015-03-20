---
title: Overview
page_title: How to use the Kendo UI MobileNavBar HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Mobile NavBar widget
description: Learn how to initialize Kendo UI MobileNavBar for ASP.NET MVC, access an existing navbar with MobileNavBar HtmlHelper extension documentation.
---

# MobileNavBar

The MobileNavBar HtmlHelper extension is a server-side wrapper for the [Kendo UI Mobile NavBar](/api/mobile/navbar) widget. It allows you to configure the Kendo UI Mobile NavBar
from server-side code.

## Getting started

The following tutorial shows how to configure Kendo UI MobileNavBar for ASP.NET MVC.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            return View();
        }

1. Add a Kendo UI MobileNavBar to the Index view. MobileNavBar must be initialized within MobileView or MobileLayout header
    - Index.aspx (ASPX)

            <% Html.Kendo().MobileView()
                    .Name("navbar-home")
                    .Title("Index")
                    .Header(() =>
                    {
                        %>
                        <% Html.Kendo().MobileNavBar()
                               .Content(navbar =>
                                {
                                    %>
                                    <%: Html.Kendo().MobileBackButton()
                                            .Align(MobileButtonAlign.Left)
                                            .Text("Back")
                                    %>
                                    <%: navbar.ViewTitle("") %>
                                    <%
                                })
                               .Render();
                        %>
                        <%
                    })
                    .Content(() =>
                    {
                        %>
                        View Content
                        <%
                    })
                    .Render();
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileView()
                .Name("navbar-home")
                .Title("Index")
                .Header(obj =>
                    Html.Kendo().MobileNavBar()
                           .Content(navbar =>
                            @<text>
                                @(Html.Kendo().MobileBackButton()
                                        .Align(MobileButtonAlign.Left)
                                        .Text("Back"))
                                @navbar.ViewTitle("")
                            </text>)
                    )
                .Content(@<text>View Content</text>)
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

## Getting reference to the Kendo UI MobileNavBar widget

To get a reference to a navbar instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/mobile/navbar#methods) of the navbar.

### Example - get reference to a Kendo UI MobileNavBar instance

    @(Html.Kendo().MobileView()
            .Name("navbar-home")
            .Title("Index")
            .Header(obj =>
                Html.Kendo().MobileNavBar()
                        .Name("MobileNavBar")
                        .Content(navbar =>
                            @<text>
                                @(Html.Kendo().MobileBackButton()
                                        .Align(MobileButtonAlign.Left)
                                        .Text("Back"))
                                @navbar.ViewTitle("")
                            </text>)
            )
            .Content(@<text>View Content</text>)
        )
    <script>
    $(function() {
        // Notice that the Name() of the navbar is used to get its client-side instance
        var navbar = $("#MobileNavBar").data("kendoMobileNavBar");
    });
    </script>
