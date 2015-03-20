---
title: Overview
page_title: How to use the Kendo UI MobileTabStrip HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Mobile TabStrip widget
description: Learn how to initialize Kendo UI MobileTabStrip for ASP.NET MVC, handle Kendo UI MobileTabStrip Events, access an existing tabstrip with MobileTabStrip HtmlHelper extension documentation.
---

# MobileTabStrip

The MobileTabStrip HtmlHelper extension is a server-side wrapper for the [Kendo UI Mobile TabStrip](/api/mobile/tabstrip) widget. It allows you to configure the Kendo UI Mobile TabStrip
from server-side code.

## Getting started

The following tutorial shows how to configure Kendo UI MobileTabStrip for ASP.NET MVC.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }
1. Add a Kendo UI MobileTabStrip to the Index view. As most mobile widgets MobileTabStrip must be initialized within MobileView content
    - Index.aspx (ASPX)

            <% Html.Kendo().MobileView()
                    .Name("tabstrip-view")
                    .Title("Inbox")
                    .Footer(() =>
                    {
                        %>

                        <%: Html.Kendo().MobileTabStrip()
                                .Items(items =>
                                {
                                    items.Add().Icon("contacts").Text("Profile");
                                    items.Add().Icon("history").Text("Sales");
                                    items.Add().Icon("favorites").Text("Rating");
                                    items.Add().Icon("settings").Text("Settings");
                                })
                        %>
                        <%
                    })
                    .Render();
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileView()
                .Name("tabstrip-view")
                .Title("Inbox")
                .Footer(
                    @<text>

                    @(Html.Kendo().MobileTabStrip()
                        .Items(items =>
                        {
                            items.Add().Icon("contacts").Text("Profile");
                            items.Add().Icon("history").Text("Sales");
                            items.Add().Icon("favorites").Text("Rating");
                            items.Add().Icon("settings").Text("Settings");
                        })
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

## Getting reference to the Kendo UI MobileTabStrip widget

To get a reference to a tabstrip instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/mobile/tabstrip#methods) of the tabstrip.

### Example - get reference to a Kendo UI MobileTabStrip instance

    @(Html.Kendo().MobileTabStrip()
        .Name("tabstrip")
        .Items(items =>
        {
            items.Add().Icon("contacts").Text("Profile");
            items.Add().Icon("history").Text("Sales");
            items.Add().Icon("favorites").Text("Rating");
            items.Add().Icon("settings").Text("Settings");
        })
    )
    <script>
    $(function() {
        // Notice that the Name() of the tabstrip is used to get its client-side instance
        var tabstrip = $("#tabstrip").data("kendoMobileTabStrip");
    });
    </script>


## Handling Kendo UI MobileTabStrip events

You can subscribe to all [events](/api/mobile/tabstrip#events) exposed by the widget:

### Example - subscribe to event by handler name (ASPX)

    <%: Html.Kendo().MobileTabStrip()
            .Name("tabstrip")
            .Items(items =>
            {
                items.Add().Icon("contacts").Text("Profile");
                items.Add().Icon("history").Text("Sales");
                items.Add().Icon("favorites").Text("Rating");
                items.Add().Icon("settings").Text("Settings");
            })
            .Events(events => events
                .Select("onSelect")
            )

    %>

    <script>
    function onSelect() {
        //Handle the select event
    }
    </script>


### Example - subscribe to event by handler name (Razor)

    @(Html.Kendo().MobileTabStrip()
        .Name("tabstrip")
        .Items(items =>
        {
            items.Add().Icon("contacts").Text("Profile");
            items.Add().Icon("history").Text("Sales");
            items.Add().Icon("favorites").Text("Rating");
            items.Add().Icon("settings").Text("Settings");
        })
        .Events(events => events
            .Select("onSelect")
        )
    )

    <script>
    function onSelect() {
        //Handle the select event
    }
    </script>
