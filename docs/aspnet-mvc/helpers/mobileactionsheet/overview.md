---
title: Overview
page_title: How to use the Kendo UI MobileActionSheet HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Mobile ActionSheet widget
description: Learn how to initialize Kendo UI MobileActionSheet for ASP.NET MVC, handle Kendo UI MobileActionSheet Events, access an existing actionsheet with MobileActionSheet HtmlHelper extension documentation.
---

# MobileActionSheet

The MobileActionSheet HtmlHelper extension is a server-side wrapper for the [Kendo UI Mobile ActionSheet](/api/mobile/actionsheet) widget. It allows you to configure the Kendo UI Mobile ActionSheet
from server-side code.

## Getting started

The following tutorial shows how to configure Kendo UI MobileActionSheet for ASP.NET MVC.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            return View();
        }

1. Add a Kendo UI MobileActionSheet to the Index view. As most mobile widgets MobileActionSheet must be initialized within MobileView content
    - Index.aspx (ASPX)

            <% Html.Kendo().MobileView()
                    .Name("actionsheet-view")
                    .Title("Inbox")
                    .Content(() =>
                    {
                        %>
                        <!-- Add button to open the actionsheet widget -->
                        <%: Html.Kendo().MobileButton()
                                .Name("button")
                                .Rel(MobileButtonRel.ActionSheet)
                                .Text("Reply")
                                .Url("#inboxActions")
                        %>

                        <% Html.Kendo().MobileActionSheet()
                            .Name("inboxActions")
                            .Popup(popup => popup.Direction(MobilePopupDirection.Left))
                            .Title("Monday Meeting:")
                            .Items(items => {
                                items.Add().Text("Reply");
                                items.Add().Text("Reply All");
                                items.Add().Text("Archive");
                            })
                            .Render();
                        %>
                        <%
                    })
                    .Render();
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileView()
                .Name("actionsheet-view")
                .Title("Inbox")
                .Content(
                    @<text>
                    <!-- Add button to open the actionsheet widget -->
                    @(Html.Kendo().MobileButton()
                        .Name("button")
                        .Rel(MobileButtonRel.ActionSheet)
                        .Text("Reply")
                        .Url("#inboxActions")
                    )

                    @(Html.Kendo().MobileActionSheet()
                        .Name("inboxActions")
                        .Popup(popup => popup.Direction(MobilePopupDirection.Left))
                        .Title("Monday Meeting:")
                        .Items(items => {
                            items.Add().Text("Reply");
                            items.Add().Text("Reply All");
                            items.Add().Text("Archive");
                        }))

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

## Getting reference to the Kendo UI MobileActionSheet widget

To get a reference to a actionsheet instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/mobile/actionsheet#methods) of the actionsheet.

### Example - get reference to a Kendo UI MobileActionSheet instance

    @(Html.Kendo().MobileActionSheet()
        .Name("inboxActions")
        .Popup(popup => popup.Direction(MobilePopupDirection.Left))
        .Title("Monday Meeting:")
        .Items(items => {
            items.Add().Text("Reply");
            items.Add().Text("Reply All");
            items.Add().Text("Archive");
        }))
    <script>
    $(function() {
        // Notice that the Name() of the actionsheet is used to get its client-side instance
        var actionsheet = $("#inboxActions").data("kendoMobileActionSheet");
    });
    </script>


## Handling Kendo UI MobileActionSheet events

You can subscribe to all [events](/api/mobile/actionsheet#events) exposed by the widget:

### Example - subscribe to event by handler name (ASPX)

    <%: Html.Kendo().MobileActionSheet()
            .Name("MobileActionSheet")
            .Items(items => {
                items.Add().Text("Reply").Action("replay");
            }))
            .Events(events => events
                .Open("onOpen")
            )
    %>

    <script>
    function onOpen() {
        //Handle the open event
    }

    function replay() {
        //Will execute when item with `Reply` title is clicked
    }
    </script>


### Example - subscribe to event by handler name (Razor)

    @(Html.Kendo().MobileActionSheet()
            .Name("MobileActionSheet")
            .Items(items => {
                items.Add().Text("Reply").Action("replay");
            }))
            .Events(events => events
                .Open("onOpen")
            )
    )

    <script>
    function onOpen() {
        //Handle the open event
    }

    function replay() {
        //Will execute when item with `Reply` title is clicked
    }
    </script>
