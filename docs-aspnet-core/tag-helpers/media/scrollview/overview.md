---
title: Overview
page_title: ScrollView | Telerik UI for ASP.NET Core TagHelpers
description: "Learn the basics when working with the Kendo UI ScrollView for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_scrollview_aspnetcore
---

# ScrollView Overview

The ScrollView TagHelper helps you configure the [Kendo UI ScrollView](https://demos.telerik.com/kendo-ui/scrollview/index) widget in ASP.NET Core applications.

It displays a horizontal collection of content or image views with built-in navigation between them. It can be scrolled via dragging, gestures, arrow click or page click or tap.

## Key Features

The Kendo UI ScrollView:

* Can be initialized with HTML only.
* Features data-source binding.
* Has a customizable template.
* Provides a built-in pager.
* Allows you to programmatically scroll to a specific page through its API methods.
* Has adjustable bounce effects and scroll velocity.
* Allows you to capture user interactions by handling the events that are triggered by the widget.

## Getting Started

You can initialize the ScrollView either from HTML or from a data source with a template.

### Initialize the ScrollView from HTML

To initialize the Kendo UI ScrollView from HTML:

1. Use its `items` tag.
1. Define the content for each page.

###### Example

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

### Initialize the ScrollView with a Data Source and a Template

To initialize the Kendo UI ScrollView with a Data Source and a template:

1. Create a [Kendo UI template](https://docs.telerik.com/kendo-ui/framework/templates/overview).
1. Use the `template-id` property to pass it and provide a DataSource.

Make sure that the template provides the `pageSize` of the data source. If `serverPaging` is enabled, the ScrollView will request the data in advance so it becomes available before it is required, thus improving user experience. The Kendo UI ScrollView uses virtualization when it is bound to a data source and it only has three pages at all times&mdash;the current, the previous, and the next.

###### Example

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
                <div style="width: 140px; height: 140px; background-image: #=setBackground(data[i].ProductID)#; background-repeat:no-repeat;    background-size: cover;"></div>
                <p>#= data[i].ProductName #</p>
            </div>
            # } #
        </div>
    </script>
```

## See Also

* [ScrollView HtmlHelper for ASP.NET Core]({% slug htmlhelpers_scrollview_aspnetcore %})
* [ScrollView Official Demos](https://demos.telerik.com/aspnet-core/scrollview/tag-helper)
* [ScrollView JavaScript API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/scrollview)
* [Overview of the UI for ASP.NET Core TagHelpers]({% slug taghelpers_aspnetmvc6_aspnetmvc %})
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
