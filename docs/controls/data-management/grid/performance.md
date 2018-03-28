---
title: Performance
page_title: Performance | Kendo UI Grid
description: "Learn how to use the Kendo UI Grid in the most efficient way and optimize its behavior."
slug: performance_kendoui_grid_widget
position: 5
---

# Performance

Although the [Kendo UI Grid](http://demos.telerik.com/kendo-ui/grid/index) is a fast widget, its performance may rapidly decline, especially when each client requirement is implemented without considering the impact on the rendering nor the way the data is actually displayed on the page.

This article demonstrates best practices for getting the most out of the Grid and provides insight on the most common performance issues.

## Best Practices

* [Enable paging](#enabling-paging)
* [Enable virtualization](#enabling-virtualization)
* [Reduce the quantity of data](#reducing-data-quantity)
* [Use fast browsers](#using-fast-browsers)

### Enabling Paging

In theory, if paging is enabled, all performance issues will be resolved. Limiting the number of records per page to a reasonable count gives you the freedom to enable almost every functionality of the Grid without worrying about its performance. Rendering 50 records per page even with 20 columns results in 1,000 cells which will be handled smoothly by the browsers. For more complex scenarios where, for example, you need to render editors directly in the column template instead of in the editor template, you can further reduce the `pageSize`&mdash;if you initialize a widget in each cell, you will end up with 1,000 widgets which will be a major hit. That is why you need to reduce that number as much as possible.

#### Client or Server Operations

After you enable the paging functionality, you have to decide whether to handle the data operations on the client- or on the server-side. This approach applies to all data operations such as filtering, grouping, or sorting.

##### Using Client-Side Operations

Use client-side operations when:

* The Grid will display a limited number of records. If the number of records grows, it is possible to exceed the `maxJsonLength` and you might need to increase the limit.
* The data will be user-based and other users are not expected to update the same records.
* You want to avoid separate AJAX requests for each data operation.
* You need access to all `dataItems` on the client side for custom data operations. To retrieve the entire dataset, use the `data` method of the dataSource.

##### Using Server-Side Operations

Use server-side operations when:

* You have a huge amount of records (up to millions).
* The data can be changed by other users and you need to have the updated data after each data operation.
* You need to use LINQ for executing complex expressions on the server side or when the query for retrieving the data from the database will be handled much faster than the client-side dataSource logic.

### Enabling Virtualization

The [virtual scrolling](https://demos.telerik.com/kendo-ui/grid/virtualization-remote-data) is an alternative to paging and renders the records over the previously rendered records. This approach reduces the DOM elements but still provides the end user with a smooth scrolling experience. You can use local binding or remote binding for the virtual scrolling&mdash;for a huge amount of records, it is recommended to use the remote binding functionality. While the user scrolls down the records, new requests for retrieving the next view will be initiated. However, the virtualization delivers some known limitations&mdash;for more information about what they are, refer to [this article]({% slug appearance_kendoui_grid_widget %}#limitation-for-virtual-scrolling).

### Reducing Data Quantity

with External or Initial Filter

This is something that is not related directly to the Kendo UI Grid, but is rather a general suggestion for handling huge amounts of data. The main idea is to have some additional filter criteria that will reduce the records bound to the Grid. Some projects allow using an external filter widget (_the DropDownList is most commonly used_) and its selected value is used for filtering the data prior to passing it to the Grid.

As an example, let`s say that we have millions of orders from different companies. We can use external DropDownList listing all companies and we can use the currently selected one as additional parameter in the Read of the dataSource, so we can apply an initial filter and return the orders from that company only.

We can also set initial filter criteria in the Grid`s dataSource for specific field, but the user will be able to remove it if the filtering is enabled and the column bound to that field is visible.

### Using Fast Browsers

Internet Explorer is known to have slow performance with too many DOM elements and event listeners on the page. Using Chrome seems to provide the best user experience in the context of the Kendo UI widgets.

## Avoiding Common Mistakes

To manage commonly made mistakes, avoid:
* Rendering everything
* Excessive use of editors or widgets directly in the columns
* Extreme number of columns
* Expanding all content

### Rendering Everything

Having too many records and columns without Paging or Virtual Scrolling will result in huge amount of DOM elements and event listeners. Some browser will be able to handle more records than others, but to deliver the best user experience we should avoid rendering more than 100 records without paging or virtualization. If we need to find specific records we can always enable Filtering, which is much faster than, for example, rendering 1000 records and scrolling down to find what we are looking for.

### Excessive Use of Editors or Widgets in Cells

Rendering editors directly in the columns sounds and looks great, but it comes with a price. As mentioned earlier, initializing widgets in each cell is a slow operation and will be a major performance hit, especially when there are many records displayed in the Grid. Additionally, if we use custom code for two-way binding between the editors and the underlying data items, each change will initiate the re-rendering of the entire data, which on the other hand will trigger the initialization of the editors once again. You see how this great idea becomes a nightmare with a single click and we start to struggle with the extremely slow performance.

At this point we decide to prevent the rebinding of the Grid after each change by removing the two-way binding and by changing the dataItem values manually (_changing the properties without using the "set" method and setting the dirty property to true_). Great, now we can edit multiple records without re-rendering the Grid, but we are still facing the issue with the initial initialization of the widget. The only thing that we can now is to reduce the pageSize drastically (5 or 10 records per page, depending on the number of columns).

### Using Too Many Columns

Even with enabled Paging or Virtual Scrolling, having too many columns will slow down the rendering of the rows, because each column increases the cells in the DOM and our goal is to keep it as light as possible. We can always hide the column by setting the _"hidden"_ property to _"true"_, but this will actually make the things even worse, because the columns will still be rendered in the DOM, and in addition to that they will receive _"display: none"_ as inline style. Now what?

Well, for up to 20 columns we can still define all of them in the configuration of the Grid, but we will need to decrease the pageSize to 50 at most (1000 cells, which is still acceptable). We could even hide some of the columns and enable the columnMenu, so that the user can choose which columns to display. However, if we have 100 columns we might observe slow rendering. For such cases we can implement external logic for allowing the end user to choose a list of columns that will be rendered. We can then use that list to initialize the Grid with only that set of columns. The benefit here is that there will be no hidden columns rendered in the DOM and we will reduce the cell count drastically.

Another problem that we can face with too many columns is the usage of the autoFitColumn method, which travels each cell in the columns to retrieve the width of their content. Using __autoFitColumn__ should be avoided in such cases.

### Expanding All Content

What makes hierarchical Grid fast is the fact that the records for the child Grid in the detailTemplate requests the records only when the detail row is expanded. If we expand all detail rows initially, this will initialize all child Grids and will make multiple requests.

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Editing Functionality of the Grid]({% slug editing_kendoui_grid_widget %})
* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})
* [Adaptive Rendering of the Grid]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the Grid Widget](http://docs.telerik.com/aspnet-mvc/helpers/grid/overview)
