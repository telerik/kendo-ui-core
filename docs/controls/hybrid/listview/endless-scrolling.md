---
title: Endless Scrolling
page_title: Endless Scrolling | Hybrid UI ListView
description: "Use the endless scrolling feature of the Hybrid UI ListView in the Kendo UI framework."
previous_url: /howto/howto-use-the-mobile-listview-with-endless-scrolling
slug: endlessscrolling_hybridlistview
position: 2
---

# Endless Scrolling

The [Hybrid UI ListView widget](http://demos.telerik.com/kendo-ui/m/index#mobile-listview/index) supports displaying large amounts of data by appending additional pages of data on demand. Loading can happen automatically by enabling the [endless scrolling functionality](/api/mobile/listview#configuration-endlessScroll), or by displaying a button at the bottom ([ press to load more ](/api/mobile/listview#configuration-loadMore)).

## Virtual Mode

Enabling endless scrolling or pressing to load more options trigger the virtual mode of the ListView. In order for the ListView virtual mode to be working as expected, the ListView should be the only widget in the scrolling container. If more widgets are needed in the view in question, the ListView should be wrapped in a mobile scroller container.

The virtual mode interacts and alters the behavior of the containing scroller widget&mdash;by default, the view scroller. Native scrolling&mdash;a view with the `use-native-scrolling=true`, or scroller with the `use-native=true` attribute&mdash;is not supported.

In virtual mode, a fixed amount of DOM elements is rendered, and then dynamically repositioned and updated when the user scrolls the view. In the endless scrolling mode, the next page is automatically pre-fetched when the user scrolls past two thirds of the current set of items.

> **Important**
>
> The amount of actual DOM elements used in virtual mode is equal to half of the datasource page size option.

In order for the scrolling to occur smoothly, the page size should not be too low. For example, if five items are visible on the page, at least fifteen physical DOM elements are needed, which means that the DataSource page size should be thirty or more.

> Bigger DataSource page size ensures smooth scrolling, but has adverce effects on view transition performance.

Once the ListView reaches the amount of items specified by the [schema.total](/api/framework/datasource#configuration-schema.total) setting of the datasource, the loadmore button/endless scrolling indicator is hidden.

> **Important**
>
> Currently, certain features, such as the grouped mode and inset styling, are not supported in virtual mode.

## Getting Started

### Create ListViews with Endless Scrolling

First, decide what the best way to get the additional data is. The possible ways to do this are:

- `local`&mdash;The whole data is serialized on the client. As the user scrolls down, new data is displayed.
- `remote`&mdash;Only the first page of the data is serialized and rendered on the client. When the user reaches the end of the list, an Ajax request is made to fetch the next portion of the data.

## Data Binding

### Bind to Local Arrays

**Step 1** Define a target HTML element such as a list.

###### Example

    <ul id="localListView"></ul>

**Step 2** Define a function, which will return a list of generated data, as demonstrated in the example below.

###### Example

        //generate local data
        function getData() {
            var data = [], idx = 0;
            for (; idx < 1000; idx++) {
                data.push({
                    name: "Name" + idx
                });
            }

            return data;
        }

**Step 3** Create a DataSource instance. Note that the `pageSize` is required.

###### Example

        //define the DataSource
        var dataSource = new kendo.data.DataSource({ data: getData() });

**Step 4** Initialize the ListView.

###### Example

        //initialize the Mobile ListView
        $("#listView").kendoMobileListView({
            dataSource: dataSource,
            template: "#: name #",

            endlessScroll: true,
            virtualViewSize: 50 // needed setting, since local data virtualization does not use paging
        });

This is the live example of the representation above:

<a class="jsbin-embed" href="http://jsbin.com/ituVUTE/3/embed?live">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Bind to Remote Data

**Step 1** Define the ListView via a declarative binding.

###### Example

    <div data-role="view" data-init="viewInit">
         <header data-role="header">
             <div data-role="navbar">My App</div>
         </header>

         <ul id="remoteListView" data-source="dataSource" data-role="listview" data-template="template" data-endless-scroll="true"></ul>
    </div>

    <script id="template" type="text/x-kendo-template">
        #: ProductName #
    </script>

**Step 2** Define a DataSource instance that will fetch the data from the Northwind oData service.

###### Example

    var dataSource = new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
        }
      },
      schema: {
        total: "d.__count" // schema total is required for the server paging to work as expected
      },
      sort: {
        field: "ProductID",
        dir: "desc"
      },
      serverPaging: true,
      serverSorting: true,
      pageSize: 50
    });

<!--__-->
This is the live example of the representation above:

<a class="jsbin-embed" href="http://jsbin.com/eHocUTI/2/embed?live">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

## See Also

Other articles and how-to examples on the Hybrid UI ListView:

* [Hybrid UI ListView JavaScript API Reference](/api/javascript/mobile/ui/listview)
* [Overview of the Hybrid UI ListView]({% slug overview_hybridlistview %})
* [Pull-to-Refresh Feature]({% slug pulltorefreshfeature_hybridlistview %})

For how-to examples on the Kendo UI hybrid ListView, browse its [**How To** documentation folder]({% slug howto_group_data_hybridlistview %}).
