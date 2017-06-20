---
title: Notification
page_title: Notification | UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Notification HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_notification_aspnetcore
---

# Notification HtmlHelper Overview

The Notification HtmlHelper extension is a server-side wrapper for the [Kendo UI Notification](http://demos.telerik.com/kendo-ui/notification/index).

It allows you to configure the Kendo UI Notification widget from server-side code. The [Notification](http://docs.telerik.com/kendo-ui/controls/layout/notification/overview) provides a styled UI widget with arbitrary content, which can provide information to the user on various occasions.

For more information on the HtmlHelper, refer to the article on the [Notification HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/notification/overview).

## Basic Usage

The following example demonstrates how to define the Notification by using the Notification HtmlHelper.

###### Example

```tab-Razor

   @(Html.Kendo().Notification()
        .Name("notification")
    )

    <script type="text/javascript">
        $(document).ready(function () {
            var popupNotification = $("#notification").data("kendoNotification");

            popupNotification.show("Test popup message", "info");                        
        });
    </script>
```

## Configuration

The following example demonstrates the basic configuration of the Notification HtmlHelper and how to get the Notification instance.

```tab-Razor    
    @(Html.Kendo().Notification()
        .Name("notification")
        .Stacking(NotificationStackingSettings.Down)
        .Width("12em")
        .Height(200)
        .HideOnClick(false)
        .Events(ev => ev.Show("onShow").Hide("onHide"))
        .Templates(t =>
        {
            t.Add().Type("time").ClientTemplate("<div style='padding: .6em 1em'>Time is: #: time #</div>");
        })
        .Button(true)
    )

    <script type="text/javascript">
        $(function () {
            //Notice that the Name() of the Notification is used to get its client-side instance.
            var notification = $("#notification").data("kendoNotification");
            console.log(notification);
        });
    </script>
```

## See Also

* [JavaScript API Reference of the Notification](http://docs.telerik.com/kendo-ui/api/javascript/ui/notification)
* [Notification HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/notification/overview)
* [Notification Official Demos](http://demos.telerik.com/aspnet-core/notification/index)
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
