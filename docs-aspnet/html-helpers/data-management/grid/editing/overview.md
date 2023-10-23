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
    
## Getting Started

To enable editing:

1. Set the `Editable` configuration: 

    ```HtmlHelper
        @(Html.Kendo().Grid<ProductViewModel>()
            .Name("Grid")
            ...
            .Editable(e => e.Enabled(true))
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-grid name="grid">
            <editable enabled="true"/>
            <!-- Other configuration. -->
        </kendo-grid>
    ```
    {% endif %}

    The default edit mode is [Inline]({% slug inlineediting_grid_aspnetcore %}). To use a different edit mode, specify it through the `Mode` option: 

    ```HtmlHelper
        @(Html.Kendo().Grid<ProductViewModel>()
            .Name("Grid")
            ...
            .Editable(e => e.Mode(GridEditMode.PopUp))
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-grid name="grid">
            <editable enabled="true" mode="popup"/>
            <!-- Other configuration. -->
        </kendo-grid>
    ```
    {% endif %}
        
        
    >For more information, refer to the {% if site.core %}[HtmlHelper API](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideditingsettingsbuilder) and [TagHelper API](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.taghelpers/grideditablesettingstaghelper) options on the possible configurations{% else %}[API options on the possible configurations](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideditingsettingsbuilder){% endif %}.

2. Declare the endpoint to which the updated records will be sent: 

    ```HtmlHelper
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            ...
            .Update("Editing_Update", "Grid")
        )
    ```
    {% if site.core %}
    ```TagHelper
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
            <transport>
                <!-- Other configuration. -->
                <update url="@Url.Action("Editing_Update", "Grid")"/>
            </transport>
        </datasource>
    ```
    {% endif %}

3. Specify the `Id` of the `Model` within the `DataSource` declaration: 

    ```HtmlHelper
        .Model(model => model.Id(p => p.ProductID))
    ```
    {% if site.core %}
    ```TagHelper
        <model id="ProductID">
            <!-- Other configuration. -->
        </model>
    ```
    {% endif %}

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
* [Server-Side HtmlHelper API](/api/grid)
{% if site.core %}
* [Server-Side TagHelper API](/api/taghelpers/grid)
{% endif %}
