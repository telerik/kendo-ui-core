---
title: Overview
page_title: Breadcrumb Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Breadcrumb HtmlHelper for ASP.NET MVC."
slug: overview_breadcrumbhelper_aspnetmvc
position: 1
---

# Breadcrumb HtmlHelper Overview

The Telerik UI Breadcrumb HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Breadcrumb widget.

The Breadcrumb is an intuitive UI component that allows navigation within a folder structure or web page. It provides an easy way to navigate backwards by one or multiple steps.

* [Demo page for the Breadcrumb](https://demos.telerik.com/aspnet-mvc/breadcrumb/index)

## Initializing the Breadcrumb

The following example demonstrates how to define the Breadcrumb by using the Breadcrumb HtmlHelper.

```Razor
    @(Html.Kendo().Breadcrumb()
        .Name("breadcrumb")
    )
```

## Basic Configuration

The following example demonstrates the basic configuration for the Breadcrumb HtmlHelper.

```Razor
    @(Html.Kendo().Breadcrumb()
        .Name("breadcrumb")
        .Items(items =>
        {
            items.Add()
                .Type(BreadcrumbItemType.RootItem)
                .Href("https://demos.telerik.com/kendo-ui/")
                .Text("All Components")
                .Icon("home")
                .ShowIcon(true);
            items.Add()
                .Type(BreadcrumbItemType.Item)
                .Href("/breadcrumb")
                .Text("Breadcrumb")
                .ShowText(true);
            items.Add()
                .Type(BreadcrumbItemType.Item)
                .Href("/index")
                .Text("Basic Usage")
                .ShowText(true);
        })
    )

    <script>
    $(function() {
        // The Name() of the Breadcrumb is used to get its client-side instance.
        var breadcrumb = $("#breadcrumb").data("kendoBreadcrumb");
    });
    </script>
```

## Functionality and Features

* [Icons]({% slug icons_breadcrumbhelper_aspnetmvc %})
* [Items]({% slug items_breadcrumbhelper_aspnetmvc %})
* [Editing]({% slug editing_breadcrumbhelper_aspnetmvc %})
* [Navigation]({% slug navigation_breadcrumbhelper_aspnetmvc %})


## See Also

* [Basic Usage of the Breadcrumb HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/breadcrumb/index)
* [Using the API of the Breadcrumb HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/breadcrumb/api)
