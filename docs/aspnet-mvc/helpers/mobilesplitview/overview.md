---
title: Overview
page_title: How to use the Kendo UI MobileSplitView HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Mobile SplitView widget
description: Learn how to initialize Kendo UI MobileSplitView for ASP.NET MVC, handle Kendo UI MobileSplitView Events, access an existing splitview with MobileSplitView HtmlHelper extension documentation.
---

# MobileSplitView

The MobileSplitView HtmlHelper extension is a server-side wrapper for the [Kendo UI Mobile SplitView](/api/mobile/splitview) widget. It allows you to configure the Kendo UI Mobile SplitView
from server-side code.

## Getting started

The following tutorial shows how to configure Kendo UI MobileSplitView for ASP.NET MVC.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            return View();
        }

1. Add a Kendo UI MobileSplitView to the Index view.
    - Index.aspx (ASPX)

            <% Html.Kendo().MobileSplitView()
                    .Name("MobileSplitView") //SplitView `id`
                    .Panes(panes =>
                    {
                        //add side pane
                        panes.Add().Content(() =>
                            {
                                %>
                                <% Html.Kendo().MobileView()
                                        .Title("Side View")
                                        .Content("Side View Content")
                                        .Render();
                                %>
                                <%
                            }
                        );
                        //add main pane
                        panes.Add().Content(() =>
                            {
                                %>
                                <% Html.Kendo().MobileView()
                                        .Title("Main View")
                                        .Content("Main View Content")
                                        .Render();
                                %>
                                <%
                            }
                        );
                    })
                    .Render();
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileSplitView()
                    .Name("MobileSplitView") //SplitView `id`
                    .Panes(panes =>
                    {
                        //add side pane
                        panes.Add().Content(
                            @<text>
                                @(Html.Kendo().MobileView()
                                        .Title("Side View")
                                        .Content("Side View Content")
                                )
                            </text>
                        );
                        //add main pane
                        panes.Add().Content(
                            @<text>
                                @(Html.Kendo().MobileView()
                                        .Title("Main View")
                                        .Content("Main View Content")
                                )
                            </text>
                        );
                    })
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

## Getting reference to the Kendo UI MobileSplitView widget

To get a reference to a splitview instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/mobile/splitview#methods) of the splitview.

### Example - get reference to a Kendo UI MobileSplitView instance

    @(Html.Kendo().MobileSplitView()
            .Name("MobileSplitView") //SplitView `id`
            .Panes(panes =>
            {
                panes.Add().Content(
                    @<text>
                        @(Html.Kendo().MobileView()
                                .Title("Side View")
                                .Content("Side View Content")
                        )
                    </text>
                );
            })
    )
    <script>
    $(function() {
        // Notice that the Name() of the splitview is used to get its client-side instance
        var splitview = $("#MobileSplitView").data("kendoMobileSplitView");
    });
    </script>


## Handling Kendo UI MobileSplitView events

You can subscribe to all [events](/api/mobile/splitview#events) exposed by the widget:

### Example - subscribe to event by handler name (ASPX)

    <% Html.Kendo().MobileSplitView()
            .Name("MobileSplitView")
            .Panes(panes =>
            {
                panes.Add().Content(() =>
                    {
                        %>
                        <% Html.Kendo().MobileView()
                                .Title("Side View")
                                .Content("Side View Content")
                                .Render();
                        %>
                        <%
                    }
                );
            })
            .Events(events => events
                .Init("onInit")
            )
            .Render();
    %>

    <script>
    function onInit() {
        //Handle the init event
    }
    </script>


### Example - subscribe to event by handler name (Razor)

    @(Html.Kendo().MobileSplitView()
            .Name("MobileSplitView")
            .Panes(panes =>
            {
                panes.Add().Content(
                    @<text>
                        @(Html.Kendo().MobileView()
                                .Title("Side View")
                                .Content("Side View Content")
                        )
                    </text>
                );
            })
            .Events(events => events
                .Init("onInit")
            )
    )

    <script>
    function onInit() {
        //Handle the init event
    }
    </script>
