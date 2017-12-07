---
title: Pass additional parameters to custom DataSource
description: An example on how to send additional parameters to a custom DataSource
type: how-to
page_title: Pass parameters to custom DataSource | Telerik Grid for ASP.NET MVC
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

I have a hierarchical Grid with [Custom DataSource](http://demos.telerik.com/aspnet-mvc/grid/custom-datasource). I have a ClientHandlerDescriptor defined as [described here](https://docs.telerik.com/aspnet-mvc/getting-started/custom-datasource#common-scenarios) and would like to pass additional parameters to the ClientHandlerDescriptor.

## Solution

If you are using ClientHandlerDescriptor for reading the data you can define the JavaScript handler like below. 

```
.Transport(new
{
    read = new Kendo.Mvc.ClientHandlerDescriptor() { HandlerName = "function(options) {customRead(options, '#=ID#')}" },
})
```

The `customRead` JavaScript handler will accept the default `options` argument as well as the ID of the **parent Grid**. 

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

