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

Reducing the quantity of data by using external or initial filter is not directly related to the Kendo UI Grid but is a general approach for handling huge amounts of data. The concept is to implement additional filter criteria that will reduce the records which are bound to the Grid. Some projects allow the usage of external filter widgets, such as the DropDownList, and their selected value is used to filter the data prior to its passing it to the Grid. For example, if you have millions of orders from different companies, you can use an external DropDownList listing of all companies and then apply the currently selected one as an additional parameter in the read data operation of the dataSource. In this way, you can apply an initial filter and return only the orders from that company.

To reduce the quantity of data, you can also set initial filter criteria for a specific field in the dataSource of the Grid. However, if filtering is enabled and the column which is bound to that field is visible, the user will be able to remove it.

### Using Fast Browsers

Internet Explorer is known for its slow performance when the widget uses too many DOM elements and event listeners on the page. Using Chrome seems to provide the best user experience in the context of the Kendo UI widgets.

## Avoiding Common Mistakes

To manage commonly made mistakes, avoid:
* [Rendering everything](#rendering-everything)
* [Excessive use of editors or widgets directly in the columns](#excessive-use-of-editors-or-widgets-in-cells)
* [Extreme number of columns](#using-too-many-columns)
* [Expanding all content](#expanding-all-content)

### Rendering Everything

If the Grid displays too many records and columns without having its paging or virtual scrolling functionalities enabled results in a huge amount of DOM elements and event listeners on the page. While some browsers are able to handle more records than others, avoid rendering more than 100 records per page without paging or virtualization so that the user gets the best experience. To find specific records, you can always enable filtering which is much faster than, for example, rendering 1,000 records and scrolling down to find what the user us looking for.

### Excessive Use of Editors or Widgets in Cells

Rendering editors directly in the columns looks great, but it comes with a price. As mentioned earlier, initializing widgets in each cell is a slow operation and will be a major performance issue especially when the Grid displays many records. Additionally, if you use custom code for the two-way binding between the editors and the underlying data items, each change will initiate the re-rendering of the entire data, which will trigger the initialization of the editors again and consequently lead to slow performance.

If you prevent the rebinding of the Grid after each change by removing the two-way binding and by changing the dataItem values manually&mdash;that is, changing the properties without using the `set` method and setting the dirty property to `true`, you can edit multiple records without re-rendering the Grid. However, the issue with the initial initialization of the widget is still present&mdash;to work around its, drastically reduce the `pageSize` up to five or ten records per page, depending on the number of columns.

### Using Too Many Columns

While the Grid may have its paging or virtual scrolling enabled, having too many columns slows down the rendering of the rows because each column increases the cells in the DOM. You can hide the column by setting the `hidden` property to `true` but this approach makes things even worse because the columns are still rendered in the DOM and in addition to that they will receive `display: none` as an inline style.

To work around this issue, if your Grid displays up to 20 columns, define all of them in its configuration and decrease the `pageSize` to up to 50&mdash;that is, 1,000 cells which is acceptable. You can also hide some of the columns and enable the `columnMenu` so that the user can choose which columns to display. However, if your Grid displays 100 or more columns, implement external logic for allowing the end user to choose a list of columns that will be rendered. You can then use that list to initialize the Grid with only that set of columns. The benefit of this approach is that no hidden columns will be rendered in the DOM and you will reduce the cell count drastically.

Another issue you might encounter when the Grid displays too many columns is the usage of the `autoFitColumn` method which traverses each column cell to retrieve the width of its content. To work around this behavior, avoid using `autoFitColumn`.

### Expanding All Content

Hierarchical Grids are fast when the records for the child Grids in the `detailTemplate` request the records only when the detail row is expanded. If you initially expand all detail rows, all child Grids will initialize and multiple requests will be made.

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Editing Functionality of the Grid]({% slug editing_kendoui_grid_widget %})
* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})
* [Adaptive Rendering of the Grid]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the Grid Widget](http://docs.telerik.com/aspnet-mvc/helpers/grid/overview)
