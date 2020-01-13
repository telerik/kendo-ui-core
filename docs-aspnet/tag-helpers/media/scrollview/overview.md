---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ScrollView for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_scrollview_aspnetcore
position: 1
---

# ScrollView Overview

The Telerik UI ScrollView TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI ScrollView widget.

The ScrollView displays a horizontal collection of content or image views with built-in navigation between them. It can be scrolled through dragging, gestures, arrow click or page click or tap. Among the key features of the ScrollView are data-source binding, customizable template, built-in pager, adjustable bounce effects and scroll velocity.

* [Demo page for the ScrollView](https://demos.telerik.com/aspnet-core/scrollview/tag-helper)

## Initializing the ScrollView

You can initialize the ScrollView either [from HTML](#from-html) or [from a data source with a template](#from-the-data-source).

### From HTML

1. Use its `items` tag.
1. Define the content for each page.

```
   <kendo-scrollview name="scrollView" content-height="100%" template-id="scrollview-template" style="height:600px; width:890px; max-width: 100%;">
        <items>
            <scrollview-item>
                <content><h1>One</h1></content>
            </scrollview-item>
            <scrollview-item>
                <content><h1>Two</h1></content>
            </scrollview-item>
            <scrollview-item>
                <content><h1>Three</h1></content>
            </scrollview-item>
        </items>
    </kendo-scrollview>
    <style>
        h1 {
            margin-top: 30%;
            text-align:center;
        }
    </style>
```

### From the Data Source

1. Create a [Kendo UI for jQuery template](https://docs.telerik.com/kendo-ui/framework/templates/overview).
1. Use the `template-id` property to pass it and provide a DataSource.

Make sure that the template provides the `pageSize` of the data source. If `serverPaging` is enabled, the ScrollView will request the data in advance so it becomes available before it is required, thus improving user experience. The ScrollView uses virtualization when it is bound to a data source and it only has three pages at all times&mdash;the current, the previous, and the next.

```
    <kendo-scrollview name="scrollView" content-height="100%" template-id="scrollview-template" style="height:600px; width:890px; max-width: 100%;">
        <datasource custom-type="odata" page-size="3" server-paging="true">
            <transport>
                <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products" />
            </transport>
        </datasource>
    </kendo-scrollview>
    <script id="scrollview-template" type="text/x-kendo-template">
        <div class="img-wrapper">
            # for (var i = 0; i < data.length; i++) { #
            <div>
                <div style="width: 140px; height: 140px; background-image: #=setBackground(data[i].ProductID)#; background-repeat:no-repeat; background-size: cover;"></div>
                <p>#= data[i].ProductName #</p>
            </div>
            # } #
        </div>
    </script>
```

## See Also

* [Basic Usage of the ScrollView TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/scrollview/tag-helper)
* [Server-Side API](/api/scrollview)
