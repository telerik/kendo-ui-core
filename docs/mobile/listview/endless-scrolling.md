---
title: Endless Scrolling
previous_url: /howto/howto-use-the-mobile-listview-with-endless-scrolling
---

# Use the ListView of Kendo UI Mobile With Endless Scrolling

The listview widget supports displaying large amounts of data by appending additional pages of data on demand.
Loading can happen automatically by enabling [endless scrolling](/api/mobile/listview#configuration-endlessScroll), or by displaying a button at the bottom ([ press to load more ](/api/mobile/listview#configuration-loadMore)).
Enabling endless scrolling or press to load more options triggers the **virtual mode** of the ListView.

In order for the listview virtual mode to be working as expected, the listview should be the only widget in the scrolling container. In case more widgets are needed in the view in question, the listview should be wrapped in a mobile scroller container.

The virtual mode interacts and alters the behavior of the containing scroller widget (by default, the view scroller). Native scrolling (view with `use-native-scrolling=true` or scroller with `use-native=true` attributes) **is not supported**.

In virtual mode, fixed amount of DOM elements is rendered, and then dynamically repositioned and updated when the user scrolls the view. In endless scrolling mode, the next page is automatically prefetched when the user scrolls past two thirds of the current set of items.

> The amount of actual DOM elements used in virtual mode is equal to half of the datasource page size option.

In order for the scrolling to occur smoothly, the page size should **not be too low**.
For example, if 5 items are visible on the page, at least 15 physical DOM elements are needed, which means that the DataSource page size should be 30 or greater.

> Bigger DataSource page size ensures smooth scrolling, but has adverce effects on view transition performance.

Once the listview reaches the amount of items specified by the [schema.total](/api/framework/datasource#configuration-schema.total) setting of the datasource, the loadmore button/endless scrolling indicator is hidden.

> Currently, certain features (**grouped mode** and **inset styling**) are **not supported** in virtual mode.

## Create a Mobile ListView with Endless Scrolling

First step is to decide what will be the best way to get the additional data. Here are the possible ways:

- **local** - The whole data is serialized on the client. As the user scrolls down, new data is displayed.
- **remote** - Only the first page of the data will serialized and rendered on the client. When the user reaches the end of the list an Ajax request will be made to fetch the next portion of the data.

### Bind the Mobile ListView to a Local Data

Let's see how the Mobile ListView works by building a simple example that uses locally generated data.

First, we'll define a target HTML element such as a list:

    <ul id="localListView"></ul>

Next we will define a function, which will return a list of generated data:

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

Next task is to create a DataSource instance. Please note that the `pageSize` is required:

        //define the DataSource
        var dataSource = new kendo.data.DataSource({ data: getData() });

Finally, we will initialize the Mobile ListView:

        //initialize the Mobile ListView
        $("#listView").kendoMobileListView({
            dataSource: dataSource,
            template: "#: name #",

            endlessScroll: true,
            virtualViewSize: 50 // needed setting, since local data virtualization does not use paging
        });

Here's the live example of the representation (above):

<a class="jsbin-embed" href="http://jsbin.com/ituVUTE/3/embed?live">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

### Bind the Mobile ListView to a Remote Data

For this example we will use the Northwind odata data. The ListView may be defined via a declarative binding:

    <div data-role="view" data-init="viewInit">
         <header data-role="header">
             <div data-role="navbar">My App</div>
         </header>

         <ul id="remoteListView" data-source="dataSource" data-role="listview" data-template="template" data-endless-scroll="true"></ul>
    </div>

    <script id="template" type="text/x-kendo-template">
        #: ProductName #
    </script>

Next, we will need to define a DataSource instance, which will fetch the data from the Northwind oData service:

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


Here's the live example of the representation (above):

<a class="jsbin-embed" href="http://jsbin.com/eHocUTI/2/embed?live">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

