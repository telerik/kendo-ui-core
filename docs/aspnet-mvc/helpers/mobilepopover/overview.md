---
title: Overview
page_title: How to use the Kendo UI MobilePopOver HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Mobile PopOver widget
description: Learn how to initialize Kendo UI MobilePopOver for ASP.NET MVC, handle Kendo UI MobilePopOver Events, access an existing popover with MobilePopOver HtmlHelper extension documentation.
---

# MobilePopOver

The MobilePopOver HtmlHelper extension is a server-side wrapper for the [Kendo UI Mobile PopOver](/api/mobile/popover) widget. It allows you to configure the Kendo UI Mobile PopOver
from server-side code.

## Getting started

The following tutorial shows how to configure Kendo UI MobilePopOver for ASP.NET MVC.

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)).
If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Open "HomeController.cs" and modify the `Index` action method:

        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }
1. Add a Kendo UI MobilePopOver to the Index view. As most mobile widgets MobilePopOver must be initialized within MobileView content
    - Index.aspx (ASPX)

            <% Html.Kendo().MobileView()
                    .Name("popover-view")
                    .Title("Inbox")
                    .Header(() =>
                    {
                        %>
                        <%: Html.Kendo().MobileButton()
                            .Align(MobileButtonAlign.Right)
                            .Url("#popover") //the id of the popover
                            .Text("Select location")
                            .Rel(MobileButtonRel.PopOver) //rel must be set to open the popover
                        %>
                        <%
                    })
                    .Content(() =>
                    {
                        %>

                        <% Html.Kendo().MobilePopOver()
                            .Name("popover")
                               .Popup(popup => popup.Width("20em").Height("10.6em"))
                               .Content(() =>
                                {
                                    %>
                                    PopOver content
                                    <%
                                })
                               .Render();
                        %>
                        <%
                    })
                    .Render();
            %>

    - Index.cshtml (Razor)

            @(Html.Kendo().MobileView()
                    .Name("popover-view")
                    .Title("Inbox")
                    .Header(obj =>
                        Html.Kendo().MobileButton()
                            .Align(MobileButtonAlign.Right)
                            .Url("#popover") //the id of the popover
                            .Text("Select location")
                            .Rel(MobileButtonRel.PopOver) //rel must be set to open the popover
                    )
                    .Content(obj =>
                        Html.Kendo().MobilePopOver()
                            .Name("popover")
                            .Popup(popup => popup.Width("20em").Height("10.6em"))
                            .Content(
                                @<text>
                                    PopOver content
                                </text>)
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

## Getting reference to the Kendo UI MobilePopOver widget

To get a reference to a popover instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/mobile/popover#methods) of the popover.

### Example - get reference to a Kendo UI MobilePopOver instance

    @(Html.Kendo().MobilePopOver()
            .Name("popOver")
            .Content(
            @<text>
                PopOver content
            </text>)
    )
    <script>
    $(function() {
        // Notice that the Name() of the popover is used to get its client-side instance
        var popover = $("#popOver").data("kendoMobilePopOver");
    });
    </script>


## Handling Kendo UI MobilePopOver events

You can subscribe to all [events](/api/mobile/popover#events) exposed by the widget:

### Example - subscribe to event by handler name (ASPX)

    <% Html.Kendo().MobilePopOver()
            .Name("popOver")
            .Content(() =>
            {
                %>
                PopOver content
                <%
            })
            .Events(events => events
                .Close("onClose")
            )
            .Render();
    %>

    <script>
    function onClose() {
        //Handle the close event
    }
    </script>


### Example - subscribe to event by handler name (Razor)

    @(Html.Kendo().MobilePopOver()
        .Name("popOver")
        .Content(
            @<text>
                PopOver content
            </text>)
            .Events(events => events
                .Close("onClose")
            )
    )

    <script>
    function onClose() {
        //Handle the close event
    }
    </script>
