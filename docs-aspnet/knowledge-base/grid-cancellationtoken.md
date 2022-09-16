---
title: Use CancellationToken in ToDataSourceResultAsync to Stop Query
description: How to Use CancellationToken in ToDataSourceResultAsync to Stop Database Query
type: how-to
page_title: How to Use CancellationToken in ToDataSourceResultAsync to Stop Database Query
slug: grid-cancellationtoken
position: 
tags: grid, async, action, method
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Grid for ASP.NET MVC</td>
		</tr>
	</tbody>
</table>


## Description
How can I cancel the asynchronous call to database query or some other action if the time limit is reached or due to another problem?

## Solution
The **ToDatasourceResultAsync** method can be used to achieve asynchronous programming as demonstrated in this sample:

[Add Asynchronous Calls to Action Methods With ToDataSourceResultAsync](https://docs.telerik.com/aspnet-mvc/knowledge-base/grid-add-asynchronous-calls-to-action-methods) 

In real-case scenarios, developers usually have also to consider other factors like Connection Time Limit, Invalid Input, etc. To help with this task, we exposed the [CancellationToken](https://docs.microsoft.com/en-us/dotnet/api/system.threading.cancellationtoken?view=netframework-4.8) parameter which comes handy in this type of scenarios:


```C#
        public async Task<ActionResult> EditingInline_Read([DataSourceRequest] DataSourceRequest request)
        {
            CancellationTokenSource source = new CancellationTokenSource(2000);
            CancellationToken token = source.Token;
          
            var products = await productService.Read().ToDataSourceResultAsync(request, token);

            return Json(products);
        }
```

This feature is available both for MVC and Core Telerik UI toolsets. A full runnable sample for ASP.NET Core can be found here:

[Asynchronous Binding with Cancellation Token](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Grid)

## See Also
* [ToDataSourceResultAsync - QueryableExtensions](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.Extensions/QueryableExtensions#todatasourceresultasyncsystemdatadatatablekendomvcuidatasourcerequest)
* [Asynchronous Programming - Microsoft Documentation](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/)
