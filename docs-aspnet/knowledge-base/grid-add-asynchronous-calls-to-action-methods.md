---
title: Add Asynchronous Calls to Action Methods With ToDataSourceResultAsync
description: The ToDataSourceResultAsync method can help with Async/Await functionality in Action Methods for the Kendo UI Grid's controller.
type: how-to
page_title: Use ToDataSourceResultAsync To Make Asynchronous Action Methods
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
			<td>Progress® Kendo UI® Grid for ASP.NET MVC</td>
		</tr>
	</tbody>
</table>


## Description
What is the best approach to using Async/Await in the Kendo UI Grid's action methods? 

## Solution
Kendo.Mvc.Extensions contains QueryableExtensions which include the [ToDatasourceResultAsync method](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.Extensions/QueryableExtensions#todatasourceresultasyncsystemdatadatatablekendomvcuidatasourcerequest) for [asynchronous programming](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/).  The following contains the action methods from the [Kendo UI Grid's Editing Inline Live Demo](https://demos.telerik.com/aspnet-mvc/grid/editing-inline) using ToDataSourceResultAsync:

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

## See Also
* [ToDataSourceResultAsync - QueryableExtensions](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.Extensions/QueryableExtensions#todatasourceresultasyncsystemdatadatatablekendomvcuidatasourcerequest)
* [Inline Editing - Kendo UI Grid Live Demo](https://demos.telerik.com/aspnet-mvc/grid/editing-inline)
* [Asynchronous Programming - Microsoft Documentation](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/)
