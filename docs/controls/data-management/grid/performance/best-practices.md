---
title: Best Practices
page_title: jQuery Grid Documentation | Best Practices | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn which the best practices for boosting its performance are."
slug: bestpractice_kendoui_grid_widget
position: 1
---

# Best Practices

This article lists the best practices and approaches which optimize and boost the performance of the Grid.

* [Enable paging](#enabling-paging)
* [Enable virtualization](#enabling-virtualization)
* [Reduce the quantity of data](#reducing-the-quantity-of-data)
* [Use fast browsers](#using-fast-browsers)

## Enabling Paging

In theory, if paging is enabled, all performance issues will be resolved. Limiting the number of records per page to a reasonable count enables you to implement all Grid functionality without affecting its performance. For example, rendering 50 records per page even with 20 columns results in 1,000 cells which will be handled quickly by the browsers. For more complex scenarios where, for example, you need to render editors directly in the column template instead of in the editor template, you can further reduce the `pageSize`&mdash;if you initialize a widget in each cell, you will end up with 1,000 widgets which will be a major hit.

After you enable the paging functionality, you have to decide whether to handle the data operations on the client or on the server. This approach applies to all data operations such as filtering, grouping, and sorting.

Use client-side operations when:
* The Grid will display a limited number of records. If the number of records grows, it is possible to exceed the `maxJsonLength` and you might need to increase the limit.
* The data will be user-based and other users will not be expected to update the same records.
* You want to avoid separate AJAX requests for each data operation.
* You need access to all `dataItems` on the client side for custom data operations. To retrieve the entire dataset, use the `data` method of the dataSource.

Use server-side operations when:
* You have a huge amount of records (up to millions).
* The data can be changed by other users and you need to have the updated data after each data operation.
* You need to use LINQ for executing complex expressions on the server side or when the query for retrieving the data from the database will be handled much faster than the client-side dataSource logic.

## Enabling Virtualization

[Virtual scrolling](https://demos.telerik.com/kendo-ui/grid/virtualization-remote-data) is an alternative to paging and renders the records over the previously rendered records. The approach reduces the DOM elements but enables the user to smoothly scroll the data. You can use both local binding or remote binding (for huge amounts of data) for the virtual scrolling. While the user scrolls down the records, new requests for retrieving the next view will be initiated. However, the virtualization delivers some known limitations&mdash;for more information about what they are, refer to [this article]({% slug virtual_scrolling_kendoui_grid_widget %}).

## Reducing the Quantity of Data

Reducing the quantity of data by using external or initial filter is not directly related to the Grid but is a general approach for handling huge amounts of data. The concept is to implement additional filter criteria that will reduce the records which are bound to the Grid. Some projects allow the usage of external filter widgets, such as the DropDownList, and their selected value is used to filter the data prior to its passing it to the Grid. For example, if you have millions of orders from different companies, you can use an external DropDownList listing of all companies and then apply the currently selected one as an additional parameter in the `read` data operation of the dataSource. In this way, you can apply an initial filter and return only the orders from that company.

To reduce the quantity of data, you can also set initial filter criteria for a specific field in the dataSource of the Grid. However, if filtering is enabled and the column which is bound to that field is visible, the user will be able to remove it.

## Using Fast Browsers

Internet Explorer slowly handles widgets which use too many DOM elements and event listeners on the page. Using Chrome provides the best user experience in the context of the Kendo UI widgets.

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Rendering and Dimensions of the Grid]({% slug width_kendoui_grid_widget %})
* [Adaptive Rendering of the Grid]({% slug adaptive_rendering_kendoui_grid_widget %})
