---
title: oData v4 with WebAPI controller
page_title: oData v4 with WebAPI controller
description: oData v4 with WebAPI controller
---

# Using oData v4 with WebAPI controller

This project shows how to configure the dataSource to communicate with the WebAPI controller through the Odata 4 protocol. Notice Odata v4 is not fully supported. There is limitation when working with Dates, since WebAPI does not support DateTime type anymore. WebAPI now uses the DateTimeOffset time as a main type when it comes to dates. However DateTimeOffet requires the Model(that the dataSource creates) to keep information for both Date and Offset which is not possible with the current architecture of the DataSource and Model of Kendo.

The [example source code is available here](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/odata-v4-web-api-binding-wrappers)
