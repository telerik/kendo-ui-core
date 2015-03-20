---
title: Overview
page_title: How to use the Kendo UI MobileDrawer HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Mobile Drawer widget
description: Learn how to initialize Kendo UI MobileDrawer for ASP.NET MVC, handle Kendo UI MobileDrawer Events, access an existing drawer with MobileDrawer HtmlHelper extension documentation.
---

# MobileDrawer

The MobileDrawer HtmlHelper extension is a server-side wrapper for the [Kendo UI Mobile Drawer](/api/mobile/drawer) widget. It allows you to configure the Kendo UI Mobile Drawer
from server-side code.

## Getting started

The following tutorial shows how to configure Kendo UI MobileDrawer for ASP.NET MVC.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            return View();
        }

1. Add default application view. By default, the drawer will be revealed at the left side when swiping from from left to right
    - Index.aspx (ASPX)

            <%: Html.Kendo().MobileView()
                    .Name("drawer-view")
                    .Title("Deleted Items")
                    .Content(obj =>
                        Html.Kendo().MobileListView()
                            .Items(items =>
                            {
                                items.Add().Icon("trash").Text("Untitled message 4");
                                items.Add().Icon("trash").Text("Untitled message 5");
                            })
                   )
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileView()
                    .Name("drawer-view")
                    .Title("Deleted Items")
                    .Content(obj =>
                        Html.Kendo().MobileListView()
                            .Items(items =>
                            {
                                items.Add().Icon("trash").Text("Untitled message 4");
                                items.Add().Icon("trash").Text("Untitled message 5");
                            })
                    )
            )

1. Add a Kendo UI MobileDrawer to the Index view.
    - Index.aspx (ASPX)

            <%: Html.Kendo().MobileDrawer()
                    .Name("my-drawer")
                    .HtmlAttributes(new { style = "width: 270px" })
                    .Views("drawer-view") //A list of the view ids on which the drawer will appear
                    .Content(obj =>
                        Html.Kendo().MobileListView().Type("group")
                            .Items(root => {
                                root.Add().Text("Tasks").Items(items =>
                                {
                                    items.Add().Text("To Do");
                                    items.Add().Text("In Progress");
                                    items.Add().Text("Done");
                                    items.Add().Text("High Priority");
                                    items.Add().Text("Low Priority");
                                });

                                root.Add().Text("Account").Items(items =>
                                {
                                    items.Add().Icon("settings").Text("Settings");
                                    items.Add().Icon("off").Text("Log Out");
                                });
                            })
                    )
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileDrawer()
                    .Name("my-drawer")
                    .HtmlAttributes(new { style = "width: 270px" })
                    .Views("drawer-home") //A list of the view ids on which the drawer will appear
                    .Content(obj =>
                        Html.Kendo().MobileListView().Type("group")
                            .Items(root => {
                                root.Add().Text("Tasks").Items(items =>
                                {
                                    items.Add().Text("To Do");
                                    items.Add().Text("In Progress");
                                    items.Add().Text("Done");
                                    items.Add().Text("High Priority");
                                    items.Add().Text("Low Priority");
                                });

                                root.Add().Text("Account").Items(items =>
                                {
                                    items.Add().Icon("settings").Text("Settings");
                                    items.Add().Icon("off").Text("Log Out");
                                });
                            })
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

## Getting reference to the Kendo UI MobileDrawer widget

To get a reference to a drawer instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/mobile/drawer#methods) of the drawer.

### Example - get reference to a Kendo UI MobileDrawer instance

    @(Html.Kendo().MobileDrawer()
            .Name("MobileDrawer")
    )
    <script>
    $(function() {
        // Notice that the Name() of the drawer is used to get its client-side instance
        var drawer = $("#Mobiledrawer").data("kendoMobileDrawer");
    });
    </script>


## Handling Kendo UI MobileDrawer events

You can subscribe to all [events](/api/mobile/drawer#events) exposed by the widget:

### Example - subscribe to event by handler name (ASPX)

    <%: Html.Kendo().MobileDrawer()
            .Name("MobileDrawer")
            .Events(events => events
                .BeforeShow("onBeforeShow")
            )
    %>

    <script>
    function onBeforeShow() {
        //Handle the show event
    }
    </script>


### Example - subscribe to event by handler name (Razor)

    @(Html.Kendo().MobileDrawer()
            .Name("MobileDrawer")
            .Events(events => events
                .BeforeShow("onBeforeShow")
            )
    )

    <script>
    function onBeforeShow() {
        //Handle the show event
    }
    </script>
