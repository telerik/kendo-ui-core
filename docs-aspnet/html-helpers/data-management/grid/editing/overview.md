---
title: Overview
page_title: Editing Overview
description: "Get started with the editing functionality of the Telerik UI Grid component for {{ site.framework }}."
previous_url: /helpers/data-management/grid/editing/ajax-editing, /helpers/data-management/grid/editing/batch-editing, /helpers/data-management/grid/editing/server-editing, /helpers/data-management/grid/editing/webapi-editing
slug: htmlhelpers_grid_aspnetcore_editing_overview
position: 1
---

# Editing Overview

Editing is a basic functionality of the Telerik UI Grid component for {{ site.framework }} which allows you to manipulate the way its data is presented.

The Grid provides the following edit modes:
* [Inline editing]({% slug inlineediting_grid_aspnetcore %})
* [Popup editing]({% slug popupediting_grid_aspnetcore %})
* [Incell editing]({% slug batchediting_grid_aspnetcore %})
* [Custom editors and validation]({% slug customediting_grid_aspnetcore %})
* [WebAPI editing]({% slug webapi_editing_grid_aspnetmvc %})


    
## Getting Started

To enable editing:

1. Set the `editable` option: 
    ```
    @(Html.Kendo().Grid<ProductViewModel>()
    .Name("Grid")
    ...
    .Editable(e => e.Enabled(true))
    ```

    The default edit mode is [Inline](http://127.0.0.1:4000/{{ site.platform }}/html-helpers/data-management/grid/editing/inline). To use a different edit mode, specify it: 
        
        .Editable(e => e.Mode(GridEditMode.PopUp))
    
    >For more information, refer to the [API options on the possible configurations](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/gridbuilder#editablesystemactionkendomvcuifluentgrideditingsettingsbuildert).

2. Declare the endpoint to which the updated records will be sent: 
    ```
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(20)
        ...
        .Update("Editing_Update", "Grid")
    ```
3. Specify the `Id` of the `Model` within the `DataSource` declaration: 

    ```
    .Model(model => model.Id(p => p.ProductID))
    ```

    >The `Model` method configures the model of the data source. For more information, refer to the article about the [`Model` definition](https://docs.telerik.com/{{ site.platform }}/html-helpers/datasource/model).

4. On the server, the expected parameters must be the DataSource request and the same model as the edited one: 
    
    ```
        [AcceptVerbs("Post")]
        public ActionResult EditingInline_Update([DataSourceRequest] DataSourceRequest request, ProductViewModel product)
        {
            if (product != null && ModelState.IsValid)
            {
                productService.Update(product);
            }

            return Json(new[] { product }.ToDataSourceResult(request, ModelState));
        }
    ```

    >For runnable examples, refer to [the demos on implementing the editing approaches in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/editing-inline).

## See Also

* [Incell Editing by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/editing)
* [Inline Editing by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/editing-inline)
* [Popup Editing by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/editing-popup)
* [Custom Editor by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/editing-custom)
* [Custom Validation Editing by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/editing-custom-validation)
* [Find Out More in the Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
* [Server-Side API](/api/grid)
