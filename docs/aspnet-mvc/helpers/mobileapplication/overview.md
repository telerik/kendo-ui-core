---
title: Overview
page_title: How to use the Kendo UI MobileApplication HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Mobile Application widget
description: Learn how to initialize Kendo UI MobileApplication for ASP.NET MVC, access an existing application with MobileApplication HtmlHelper extension documentation.
---

# MobileApplication

The MobileApplication HtmlHelper extension is a server-side wrapper for the [Kendo UI Mobile Application](/api/mobile/application) widget. It allows you to configure the Kendo UI Mobile Application
from server-side code.

## Getting started

The Kendo UI Mobile Application for ASP.NET MVC provides the necessary tools for building native-looking web based mobile applications. When initialized, the mobile Application modifies the behavior of the Kendo mobile widgets
so that they navigate between the mobile views when the user taps them. There are two ways of navigation:

* server navigation
* ajax navigation

### Server navigation

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            return View();
        }

1. Add an action method for detail view

        public ActionResult Details()
        {
            return View();
        }

1. Add the default Kendo UI MobileView for ASP.NET MVC. The mobile application expects that the **immediate** child of the application element is a **MobileView**
    - Index.aspx (ASPX)

            <% Html.Kendo().MobileView()
                    .Name("Index")
                    .Title("Index")
                    .Content(() =>
                    {
                        %>
                            View Content Template
                            <!--Add button that will `server navigate` the application-->
                            <%: Html.Kendo().MobileButton()
                                    .Text("Navigate to Details")
                                    .Url("Details", "Home")
                            %>
                        <%
                    })
                    .Render();
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileView()
                .Name("Index")
                .Title("Index")
                .Content(
                    @<text>
                        View Content Template

                        <!--Add button that will `server navigate` the application-->
                        @(Html.Kendo().MobileButton()
                            .Text("Navigate to Details")
                            .Url("Details", "Home")
                        )

                    </text>
                )
            )

1. Create new `Details` ASP.NET MVC View file under `/Views/Home/` folder
    - Details.aspx (ASPX)

            <%Html.Kendo().MobileView()
                .Title("Details")
                .Name("Details")
                .Content(() =>
                {
                    %>
                    View Details Template
                    <!--Add back button that will `server navigate` the application to `Index`-->
                    <%: Html.Kendo().MobileButton()
                            .Text("Go Back")
                            .Url("./")
                    %>
                    <%
                })
            %>

    - Details.cshtml (Razor)

            @(Html.Kendo().MobileView()
                .Title("Details")
                .Name("Details")
                .Content(
                    @<text>
                    View Details Template
                    <!--Add back button that will `server navigate` the application to `Index`-->
                    @(Html.Kendo().MobileButton()
                        .Text("Go Back")
                        .Url("./")
                    )
                    </text>
                )
            )

1. Initialize the mobile application inside the Master/Layout page and enable server navigation
    - Default.Master (ASPX)

            <%: Html.Kendo().MobileApplication()
                    .ServerNavigation(true)
            %>

    - _Layout.cshtml (Razor)

            @(Html.Kendo().MobileApplication()
                .ServerNavigation(true)
            )

1. Build and run the application

### Ajax navigation

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            return View();
        }

1. Add an action method for detail view.

        public ActionResult Details()
        {
            return PartialView();
        }

    *Notice* that the view is returned as partial.

1. Add the default Kendo UI MobileView for ASP.NET MVC. The mobile application expects that the **immediate** child of the application element is a **MobileView**
    - Index.aspx (ASPX)

            <% Html.Kendo().MobileView()
                    .Name("Index")
                    .Title("Index")
                    .Content(() =>
                    {
                        %>
                            View Content Template
                            <!--Add button that will `server navigate` the application-->
                            <%: Html.Kendo().MobileButton()
                                    .Text("Navigate to Details")
                                    .Url("Details", "Home")
                            %>
                        <%
                    })
                    .Render();
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileView()
                .Name("Index")
                .Title("Index")
                .Content(
                    @<text>
                        View Content Template

                        <!--Add button that will `server navigate` the application-->
                        @(Html.Kendo().MobileButton()
                            .Text("Navigate to Details")
                            .Url("Details", "Home")
                        )

                    </text>
                )
            )

1. Create new `Details` ASP.NET MVC View file under `/Views/Home/` folder
    - Details.aspx (ASPX)

            <%Html.Kendo().MobileView()
                .Title("Details")
                .Name("Details")
                .Content(() =>
                {
                    %>
                    View Details Template
                    <!--Add back button that will `server navigate` the application to `Index`-->
                    <%: Html.Kendo().MobileButton()
                            .Text("Go Back")
                            .Url("#:back")
                    %>
                    <%
                })
            %>

    - Details.cshtml (Razor)

            @(Html.Kendo().MobileView()
                .Title("Details")
                .Name("Details")
                .Content(
                    @<text>
                    View Details Template
                    <!--Add back button that will `server navigate` the application to `Index`-->
                    @(Html.Kendo().MobileButton()
                        .Text("Go Back")
                        .Url("#:back")
                    )
                    </text>
                )
            )

1. Initialize the mobile application inside the Master/Layout page
    - Default.Master (ASPX)

            <%: Html.Kendo().MobileApplication()
                    .PushState(true)
                    .ServerNavigation(false)
            %>

    - _Layout.cshtml (Razor)

            @(Html.Kendo().MobileApplication()
                .PushState(true)
                .ServerNavigation(false)
            )

1. Build and run the application

## Getting reference to the Kendo UI MobileApplication widget

To get a reference to the application instance use the following script.
Then you can use you can use the JavaScript [API](/api/mobile/application#methods) of the application.

### Example - get reference to a Kendo UI MobileApplication instance

    @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
    )
    <script>
    $(function() {
        // Notice that the casing is important
        var application = kendo.mobile.application;
    });
    </script>
