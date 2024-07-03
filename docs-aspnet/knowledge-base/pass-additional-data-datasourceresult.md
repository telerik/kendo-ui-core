---
title: How to Pass Additional Data With the DataSourceResult Back to the View
description: Learn how to pass additional data with the DataSourceResult back to the view
type: how-to
page_title: Pass additional data from Controller to View with the DataSourceResult
slug: pass_additional_data_datasourceresult
position: 
tags: additional, DataSource, Controller, View, DataSourceResult, data, pass, return, Grid, Scheduler
ticketid: 1611997
res_type: kb
---

## Environment
<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>{{ site.product }}</td>
        </tr>
    </tbody>
</table>


## Description
How can I pass additional data through the [`DataSourceResult`](api/kendo.mvc.ui/datasourceresult) from the Controller back to the View?

## Solution
The desired result can be achieved by following the steps below:

* Store the output of the `ToDataSourceResult` method in a variable.
* Return a custom JSON result with the same field names and add the additional fields.
* Handle the `RequestEnd` event of the DataSource to retrieve the additional data when the response of the request is received.

```Controller
    var resultFinal = result.ToDataSourceResult(request);
    return Json(new
    {
        Data = resultFinal.Data,
        Total = resultFinal.Total,
        AggregateResults = resultFinal.AggregateResults,
        Errors = resultFinal.Errors,
        myAdditionalParam = "additional data" // Add the desired parameter.
    });
```
```View
    @(Html.Kendo().DataSource<OrderViewModel>()
        .Name("myDataSource")
        .Ajax(dataSource =>
        {
          dataSource.Events(ev => ev.RequestEnd("requestEnd"))
          // Additional configuration.
        })
    )

    <script>
        function requestEnd(e){
            // Access the additional data sent from the server.
            console.log(e.response.myAdditionalParam);
        }
    </script>
```

## More {{ site.framework }} DataSource Resources

* [{{ site.framework }} DataSource Documentation]({%slug htmlhelpers_datasource_aspnetcore %})
* [Client-Side API Reference of the DataSource for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource)
* [Server-Side API Reference of the DataSource for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/datasource)
