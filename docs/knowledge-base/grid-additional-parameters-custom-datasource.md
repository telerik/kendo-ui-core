---
title: Pass Additional Parameters to Custom DataSource
description: An example on how to send additional parameters to a custom DataSource in the Kendo UI Grid.
type: how-to
page_title: Pass Parameters to Custom DataSource in the Grid | Kendo UI Grid for ASP.NET MVC 
slug: grid-additional-parameters-custom-datasource
tags: grid, custom, datasource, additional, parameters
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Telerik UI for ASP.NET MVC</td>
  <td>2017.3.1026</td>
 </tr>
</table>

## Description

I have a hierarchical Grid with a [custom DataSource](https://demos.telerik.com/aspnet-mvc/grid/custom-datasource) and a `ClientHandlerDescriptor` which is defined as [described here](https://docs.telerik.com/aspnet-mvc/getting-started/custom-datasource#common-scenarios).

How can I pass additional parameters to the `ClientHandlerDescriptor`?

## Solution

1. If you are using the `ClientHandlerDescriptor` for reading the data, define the JavaScript handler.

    ```
    .Transport(new
    {
        read = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "function(options) {customRead(options, '#=ID#')}" },
    })
    ```

1. The `customRead` JavaScript handler will accept the default `options` argument as well as the `ID` of the parent Grid.

    ```JavaScript
    function customRead(options, id) {
        $.ajax({
          method: "POST",
          url: '@Url.Action("ActionName", "ControllerName")',
          dataType: "json",
          data: {
            ID: id,
    		// more data here
          },
          success: function(data) {
            options.success(data);
          }
        });
    }
    ```
