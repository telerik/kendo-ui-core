---
title: Paging
page_title: jQuery Grid Documentation | Paging
description: "Get started with the jQuery Grid by Kendo UI and implement its paging functionality to page the displayed data and learn how to do paging on the server."
slug: paging_kendoui_grid_widget
position: 6
---

# Paging

By default, paging in the Grid is disabled.

## Getting Started

To enable the paging functionality of the Grid, set its `pageable` option to `true`.

In order for paging to work properly:
* Define the number of records for the Grid to display on each page.
* Define the total number of records in the dataset.
* Specify the `pageSize` on the data source and the field in the dataset that will contain the total number of records.

    $("#grid").kendoGrid({
      pageable: true
      // Other configuration.
      });

## Paging on the Server

To enhance the performance of the Grid, apply the paging operations on the server by setting the `serverPaging` option of the data source to `true`. When `serverPaging` is enabled, the data source sends the following default parameters to the server:
* The `top` parameter defines the number of records to send back in the response.
* The `skip` parameter defines the number of records to skip from the start of the dataset.

For example, to display page 3 out of a 60-record dataset as split into ten records per page, the Grid will send `skip: 20`, `top: 10`.

The Grid works with HTTP requests which send and receive JSON payload. For example, to bind the widget to a particular page of a specific data subset, instruct the dataSource to use [`serverPaging`](/api/javascript/data/datasource/configuration/serverpaging). As a result, it will directly use the received data. The same rule applies to the filtering, grouping, aggregation, and sorting operations.

       $(document).ready(function(){
          $("#grid").kendoGrid({
             groupable: true,
             scrollable: true,
             sortable: true,
             pageable: true
          });
      });

## Configuring the Pager

By default, the Grid displays a pager even when the total amount of its data source items is less than the `pageSize` value.

As of the Kendo UI 2017 R3 release, the Grid enables you to toggle the visibility of its pager through the `pageable.alwaysVisible` configuration property. If the `pageable.alwaysVisible` value is `false`, the pager will acquire the following behavior:
* When the total number of items that is initially set in the data source is lower than the `pageSize` value, the pager will be hidden.
* When the total number of items that is initially set in the data source is greater than or equal to the `pageSize` value, the pager will be displayed.
* If after a `delete` or a `filter` operation, or an update in the `pageSize` the total number of items in the data source becomes lower than the `pageSize` value, the pager will be hidden.
* If after an `insert` or a `filter` operation, or an update in the `pageSize` the total number of items in the data source becomes greater than or equal to the `pageSize` value, the pager will be displayed.

For a runnable example, refer to the [demo on controlling the pager visibility in the Grid](https://demos.telerik.com/kendo-ui/grid/pager-visibility).

## KB Articles on Paging

* [Changing the Grid Pager to Slider]({% slug howto_change_grid_pager_to_slider %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [Pager Visibility by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/pager-visibility)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
