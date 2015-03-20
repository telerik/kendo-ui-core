---
title: Creating the Search Box
page_title: Tutorial SalesHub - Creating the Search Box
previous_url: /tutorials/asp.net/saleshub/kendo-saleshub-search-box
---

# Tutorial: SalesHub: Creating the Search Box

  - [Set up the AutoComplete](#set-up-the-autocomplete)
  - [Handle User Selection in the AutoComplete](#handle-user-selection-in-the-autocomplete)
  - [Set up the Search Results Window and Grid](#set-up-the-search-results-window-and-grid)

![kendo-saleshub-search-box-screenshot](/aspnet-mvc/tutorial-saleshub/images/kendo-saleshub-search-box-screenshot.png)

The Search Box in SalesHub allows users to search for Orders based on their Order Number. It is
implemented using a [Kendo AutoComplete](http://demos.telerik.com/kendo-ui/web/autocomplete/index.html)
that queries a remote service for search results based on what has been typed into the search
box. The search results displayed in the dropdown are limited to the first 20 results, so
the user can press enter and it will open a [Kendo Window](http://demos.telerik.com/kendo-ui/web/window/index.html)
that will display all of the search results.

![kendo-saleshub-search-results-screenshot](/aspnet-mvc/tutorial-saleshub/images/kendo-saleshub-search-results-screenshot.png)

## Set up the AutoComplete

    @Html.Kendo().AutoComplete().Name("search")

The first part of the declaration tells the Kendo UI MVC extensions that you're creating an AutoComplete widget and that
we want its HTML `id` to be "search".

    .Filter(FilterType.StartsWith)
    .Placeholder("Search for order...")

Next we tell the AutoComplete to only display results that **start with** the text that has been entered into the textbox.
Then we set its placeholder text.

    .Template("<span data-order-id='${ data.OrderId }'>${ data.OrderNumber }</span>")

Here we specify the item template that the AutoComplete uses when it generates the dropdown containing the search results.
In this case we display the `OrderNumber` of each search result. We store the `OrderId` in an HTML data attribute, so that
we can use it later if the user selects that item from the search results.

    .MinLength(3)

Setting a minimum length on the AutoComplete prevents it from querying for search results until at least that many characters
have been typed into the textbox.

    .DataSource(dataSource => dataSource
        .Read(read =>
            read.Url("/api/Search/GetAutoCompleteSearchResults").Type(HttpVerbs.Get)
        )
        .ServerFiltering(true)
    )

We set up the DataSource for the AutoComplete to call our search method on the `SearchController` and we tell it to do server-side
filtering when it queries for data.

    .DataTextField("OrderNumber")

Setting the DataTextField to `OrderNumber` tells the AutoComplete to only search against
the `OrderNumber` property of an Order.

    .Events(events => events.Select("window.SalesHub.SearchBox_Select"))

We also subscribe to the `select` event of the AutoComplete. This is so we can redirect the user to the edit page for an order
when they click on a result in the AutoComplete dropdown.

You can find the full markup for the search AutoComplete in **Views/Shared/_Layout.cshtml**.

## Handle User Selection in the AutoComplete

Because we want to redirect the user to the edit page for the order that they select, we need to create an event handler for
the `select` event of the AutoComplete. Since we'll be redirecting the user to a different page client-side, we also need a way
of passing the correct URL to our JavaScript. To do this we inject the correct URL, using Razor, in `Views/Shared/_Layout.cshtml`.

    <script>
        window.SalesHub.Search = {
            settings: {
                actionUrl: "/Order/Edit"
            }
        };
    </script>

Now that we have the URL we need, we can declare our event handler.

    window.SalesHub.SearchBox_Select = function (e) {
        var actionUrl = window.SalesHub.Search.settings.actionUrl;
        var orderId = e.item.find("span").data("order-id");
        window.location.pathname = actionUrl + "/" + orderId;
    };

Our event handler takes one parameter (`e`) which is an event object that the AutoComplete passes in. This event object has a
property called `item`, which is a jQuery object that points to the HTML element that the user selected. We use this to find the
`<span>` that we specified in our Template for the AutoComplete and from there we get the `OrderId` off of the `data-order-id` attribute we declared on the span.

This event handler can be found in **Scripts/search.js**.

## Set up the Search Results Window and Grid

Since our AutoComplete only displays the first 20 results, we need a way of efficiently showing the user all of the results.
To do this we create a [Kendo Window](http://demos.telerik.com/kendo-ui/web/window/index.html) that contains a
[Kendo Grid](http://demos.telerik.com/kendo-ui/web/grid/index.html).

    @(Html.Kendo().Window()
        .Name("searchResultWindow")
        .Title("Search Results")
        .Modal(true)
        .Visible(false)
        .Height(600)
        .Width(500)
        .Content(@<text>
            @(Html.Kendo().Grid<OrderSearchResult>()
                .Name("searchResultsGrid")
                .Columns(columns =>
                {
                    columns.Bound(c => c.OrderNumber).Title("Order Number");
                    columns.Bound(c => c.SellingCompany).Title("Selling Co");
                    columns.Bound(c => c.Customer).Title("Customer");
                })
                .DataSource(ds => ds.Ajax()
                    .Read(read => read.Action("GetSearchResults", "Search").Type(HttpVerbs.Get))
                    .ServerOperation(true)
                )
                .Selectable()
                .Events(events => events.Change("window.SalesHub.SearchResultsGrid_Change"))
            )
        </text>)
        .Events(e => e.Open("window.SalesHub.SearchResultWindow_Open")))

Let's break down what this window declaration does.

    .Title("Search Results")
    .Modal(true)
    .Visible(false)
    .Height(600)
    .Width(500)

Here we set the Title of the window, tell it we want it to be a modal dialog, and that we don't want it to be visible when
the page first loads. We also specify the dimensions of the window.

    .Content(@<text>
        @(Html.Kendo().Grid<OrderSearchResult>()
            .Name("searchResultsGrid")
            .Columns(columns =>
            {
                columns.Bound(c => c.OrderNumber).Title("Order Number");
                columns.Bound(c => c.SellingCompany).Title("Selling Co");
                columns.Bound(c => c.Customer).Title("Customer");
            })
            .DataSource(ds => ds.Ajax()
                .Read(read => read.Action("GetSearchResults", "Search").Type(HttpVerbs.Get))
                .ServerOperation(true)
            )
            .Selectable()
            .Events(events => events.Change("window.SalesHub.SearchResultsGrid_Change"))
        )
    </text>)

Here we declare the contents of our window. Since we want a [Kendo Grid](http://demos.telerik.com/kendo-ui/web/grid/index.html)
inside of our window to display the search results, we use Razor's `@<text>` syntax to declare our grid. We also
subscribe to the `change` event of the grid. The `change` event is fired when a user selects an item in the grid.
This will be useful later when we need to redirect the user to the order that they select.

    .Events(e => e.Open("window.SalesHub.SearchResultWindow_Open")))

Finally we supply an event handler for the windows `open` event. We need this event handler so that we can tell the grid
what search results it needs to display when the window is opened.

Now that we have the window set up, we need to wire up some event handlers so that it opens when the user presses
the enter key inside of the search box.

    $(document).ready(function () {
        var search = $("#search");

        search.on("keyup", function (e) {
            if (e.which === 13) {
                $("#searchResultWindow").data("kendoWindow").center().open();
            }
        });
    });

To do this, we wait for the document to load, then we find the search textbox on the page using a jQuery selector. Once we find
the textbox, we subscribe to its `keyup` event. Since we only want to open the window when the user presses the enter key, we
check to see which key was pressed. If it was the enter key (`13`), we find the window that we create earlier and get the
[Kendo Window](http://demos.telerik.com/kendo-ui/web/window/index.html) object off of it. Using the window object, we tell the window to
`center` itself and to `open`.

Now that we've told the window to open, our event handler for the open event comes into play.

    window.SalesHub.SearchResultWindow_Open = function (e) {
        var searchResultsGrid = $("#searchResultsGrid").data("kendoGrid");
        var filter = $("#search").data("kendoAutoComplete").dataSource.filter();
        searchResultsGrid.dataSource.filter(filter);
        searchResultsGrid.dataSource.read();
        searchResultsGrid.refresh();
    };

Since we only want to display search results based on what the user has typed into the search box, we get the filter that's being
applied to the AutoComplete's datasource and set it to the grids datasource. Doing this causes the grid's datasource to hit our
search service using the same filter as the AutoComplete.

Now that we've updated the grid to only display search results based on what the user had typed into the search box, we need
a way of redirecting the user to an order if they select one in the grid. This is where our event handler for the `change` event
of the grid comes into play.

    window.SalesHub.SearchResultsGrid_Change = function (e) {
        var actionUrl = window.SalesHub.Search.settings.actionUrl;
        var selectedItem = this.dataItem(this.select()[0]);
        window.location.pathname = actionUrl + "/" + selectedItem.OrderId;
    };

The grid sets the `this` context of the function to itself when it calls our event handler. This means that we can access all of
the grid's properties through the `this` variable. To get the selected item in the grid, we call the `select` function on it. The
`select` function returns an array of selected elements, but since our grid only supports single item selection we just get the
first element in the array. We then pass the selected element to the `dataItem` function of the grid, which returns the corresponding
**OrderSearchResult** which we use to get the id of the order. Once we have the **id** of the order we can redirect the user to
the edit page for that order.
