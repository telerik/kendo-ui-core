---
title: Overview
page_title: Overview | Kendo UI ScrollView
description: "Learn how to initialize the Kendo UI ScrollView widget and apply its other options."
slug: overview_kendoui_scrollview_widget
---

# ScrollView Overview

The [Kendo UI ScrollView widget](https://demos.telerik.com/kendo-ui/scrollview/index) displays a horizontal collection of content or image views with built-in navigation between them.

The ScrollView can be scrolled through dragging, gestures, arrow clicks, page clicks, or tapping.

**Key Features**

The Kendo UI ScrollView widget:

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

1. Add a `<div>` element which will be used to initialize the widget.
1. Nest a `<div data-role="page"></div>` for each page and place any template inside the `<div>`.

###### Example

```dojo
    <div style="width:900px;">
        <div id="scrollView" style="height:400px;">
            <div class="white" data-role="page">
                <h1>A White page</h1>
            </div>
            <div class="green" data-role="page">
                <h1>A Green page</h1>
            </div>
            <div class="red" data-role="page">
                <h1>A Red page</h1>
            </div>
        </div>
    </div>
    <script>
        $("#scrollView").kendoScrollView({
            contentHeight: "100%"
        });
    </script>
    <style>
        .green, .red, .white {
            text-align: center;
        }

        .green {
            background-color: forestgreen;
        }

        .red {
            background-color:crimson;
        }

        h1 {
            margin-top: 20%;
        }
    </style>
```

### Initialize the ScrollView with a Data Source and a Template

To initialize the Kendo UI ScrollView with a Data Source and a template:

1. Add a single `<div>` element.
1. Provide a [`kendo.data.DataSource`](/api/javascript/data/datasource) and a template.
1. Make sure that the template matches the `pageSize` of the data source.

If `serverPaging` is enabled, the Kendo UI ScrollView will request the data in advance so it becomes available before it is required, thus improving user experience. The Kendo UI ScrollView uses virtualization when it is bound to a data source and it only has three pages at all times&mdash;the current, the previous, and the next.

###### Example

```dojo
    <div style="margin:auto; width:60%">
        <div id="scrollView" style="height: 500px; width:890px;"></div>
    </div>

    <script id="scrollview-template" type="text/x-kendo-template">
        <div class="template">
            <h1>
                <span>#:TitleOfCourtesy# #: FirstName# #: LastName# </span>
            </h1>
            <h3>Title: #: Title #</h3>
            <div class="notes"><em>#:Notes#</em></div>
            <div class="country">
                #: Country #
            </div>
        </div>
    </script>

    <script>
        var dataSource = new kendo.data.DataSource({
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
                },
                pageSize: 1
        });

        $("#scrollView").kendoScrollView({
            dataSource: dataSource,
            template: $("#scrollview-template").html(),
            contentHeight: "100%"
        });
    </script>
    <style>
        h1 {
            margin-top: 20%;
        }
        .template {
            text-align: center;
        }
        .notes {
            margin: 25px 70px 25px 70px;
        }
        .country {
            font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
            font-size: 50px;
            font-weight: bold;
            color: #898989;
        }
    </style>
```

## See Also

* [Demo on Basic Usage of the ScrollView](https://demos.telerik.com/kendo-ui/scrollview/index)
* [ScrollView JavaScript API Reference](/api/javascript/ui/scrollview)
