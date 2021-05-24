---
title: Cancellation Token
page_title: Passing a Cancellation Token
description: "Learn how to cancel an asynchronous call by passing additional parameter to the DataSource method."
slug: htmlhelper_datasource_cancellationtoken
---

# Description

It is possible to cancel the asynchronous call to database query or some other action if the time limit is reached or due to another problem. This is achieved by passing a [CancellationToken](https://docs.microsoft.com/en-us/dotnet/api/system.threading.cancellationtoken?view=netframework-4.8) parameter to the [ToDataSourceResultAsync](https://docs.telerik.com/{{ site.platform }}/knowledge-base/grid-add-asynchronous-calls-to-action-methods) method of the DataSource instance.

In real-case scenarios, developers usually have also to consider other factors like Connection Time Limit, Invalid Input, etc. To help with this task, we exposed the capability to also pass a **CancellationToken** parameter which comes handy in this type of scenarios.

# Example

        public async Task<ActionResult> EditingInline_Read([DataSourceRequest] DataSourceRequest request)
        {
            CancellationTokenSource source = new CancellationTokenSource(2000);
            CancellationToken token = source.Token;

            var result = await GetOrders().ToDataSourceResultAsync(request, token);
            return Json(result);
        }

        private List<OrderViewModel> GetOrders()
        {
            Thread.Sleep(3000);
            return Enumerable.Range(0, 50).Select(i => new OrderViewModel
            {
                OrderID = i,
                Freight = i * 10,
                OrderDate = DateTime.Now.AddDays(i),
                ShipName = "ShipName " + i,
                ShipCity = "ShipCity " + i
            }).ToList();
        }


You can find a full runnable sample with a Grid integration here:

{% if site.mvc %}
[Grid Sample with Cancellation Token](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/grid-cancellationtoken/KendoGridCancellationToken)
{% endif %}

{% if site.core %}
[Grid Sample with Cancellation Token](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Grid/AsynchronousBindingWithCancellationToken.cshtml)
{% endif %}

