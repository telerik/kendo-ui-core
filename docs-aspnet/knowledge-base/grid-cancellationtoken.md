---
title: Using CancellationToken in ToDataSourceResultAsync to Stop Query
description: How to Use CancellationToken in ToDataSourceResultAsync to Stop Database Query when working with the {{ site.product }} Grid component.
type: how-to
page_title: Using CancellationToken in ToDataSourceResultAsync to Stop Database Query
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
			<td>Progress® Kendo UI® Grid for {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>


## Description

How can I cancel the asynchronous call to database query or some other action if the time limit is reached or due to another problem?

## Solution

The [`ToDatasourceResultAsync`](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.Extensions/QueryableExtensions#todatasourceresultasyncsystemdatadatatablekendomvcuidatasourcerequest) method can be used to achieve asynchronous programming as demonstrated in this sample:

[Add Asynchronous Calls to Action Methods With `ToDataSourceResultAsync`](https://docs.telerik.com/aspnet-mvc/knowledge-base/grid-add-asynchronous-calls-to-action-methods) 

In real-life scenarios, developers usually have also to consider other factors like Connection Time Limit, Invalid Input, etc. To help with this task, we exposed the [`CancellationToken`](https://docs.microsoft.com/en-us/dotnet/api/system.threading.cancellationtoken?view=netframework-4.8) parameter which comes handy in this type of scenarios:


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

For more information on asynchronous programming, see [Microsoft's docs](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also
* [ToDataSourceResultAsync - QueryableExtensions](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.extensions/queryableextensions#todatasourceresultasyncsystemdatadatatablekendomvcuidatasourcerequest)
* [Asynchronous Programming - Microsoft Documentation](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
