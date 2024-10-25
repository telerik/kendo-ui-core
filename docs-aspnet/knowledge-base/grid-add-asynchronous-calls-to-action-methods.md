---
title: Adding Asynchronous Calls to Action Methods With ToDataSourceResultAsync
description: The ToDataSourceResultAsync method can help with Async/Await functionality in Action Methods for the {{ site.product }} Grid's controller.
type: how-to
page_title: Using ToDataSourceResultAsync To Make Asynchronous Action Methods
slug: grid-add-asynchronous-calls-to-action-methods
position: 
tags: grid, async, action, method
ticketid: 1455424
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2020.1.114</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® {{ site.product }} Grid</td>
		</tr>
	</tbody>
</table>


## Description

What is the best approach to using Async/Await in the {{ site.product }} Grid's action methods? 

## Solution

`Kendo.Mvc.Extensions` contains `QueryableExtensions` which include the [`ToDatasourceResultAsync` method](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.extensions/queryableextensions#todatasourceresultasyncsystemdatadatatablekendomvcuidatasourcerequest) for [asynchronous programming](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/). The following contains the action methods from the [Grid's Editing Inline Live Demo](https://demos.telerik.com/{{ site.platform }}/grid/editing-inline) using `ToDataSourceResultAsync`:

```C#
        public async Task<ActionResult> EditingInline_Read([DataSourceRequest] DataSourceRequest request)
        {
            var products = await productService.Read().ToDataSourceResultAsync(request);

            return Json(products);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public async Task<ActionResult> EditingInline_Create([DataSourceRequest] DataSourceRequest request, ProductViewModel product)
        {
            if (product != null && ModelState.IsValid)
            {
                productService.Create(product);
            }

            var result = await new[] { product }.ToDataSourceResultAsync(request, ModelState);

            return Json(result);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public async Task<ActionResult> EditingInline_Update([DataSourceRequest] DataSourceRequest request, ProductViewModel product)
        {
            if (product != null && ModelState.IsValid)
            {
                productService.Update(product);
            }

            var result = await new[] { product }.ToDataSourceResultAsync(request, ModelState);

            return Json(result);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public async Task<ActionResult> EditingInline_Destroy([DataSourceRequest] DataSourceRequest request, ProductViewModel product)
        {
            if (product != null)
            {
                productService.Destroy(product);
            }

            var result = await new[] { product }.ToDataSourceResultAsync(request, ModelState);

            return Json(result);
        }
```

The ViewModel definition can be found here:

[Grid Core - Inline Editing Demo](https://demos.telerik.com/{{ site.platform }}/grid/editing-inline)

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
* [Inline Editing - Kendo UI Grid Live Demo](https://demos.telerik.com/aspnet-mvc/grid/editing-inline)
* [Asynchronous Programming - Microsoft Documentation](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
