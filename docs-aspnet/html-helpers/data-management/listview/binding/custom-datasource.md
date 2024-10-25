---
title: ListView Custom DataSource
page_title: Custom DataSource of the ListView Component
description: "Get started with Telerik UI for ASP.NET MVC and use the CustomDataSource builder for the ListView component."
slug: listview_customdatasource_aspnetmvc
position: 4
---

# Custom DataSource

Telerik UI for ASP.NET MVC enables you to use the CustomDataSource builder that is available to helpers that support Data Binding.

The CustomDataSource builder class allows full control over the [DataSource client-side API options](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource), through Razor syntax. The CustomDataSource builder facilitates the usage of the Telerik UI helpers&mdash;for example, the helpers generate validation attributes, editors, and so on, while they utilize the flexibility of JavaScript. The CustomDataSource builder can also be used in more advanced scenarios where the regular DataSource builders prevent you from fully customizing the options of the DataSource.

## DataSource and Custom DataSource

The regular DataSource builders have many settings that are configured by default. The CustomDataSource builder removes these predefined settings, so when you declare a DataSource as custom, configure these additional settings.

The following two examples demonstrate a regular ListView AjaxDataSourceBuilder and a CustomDataSource builder.

```HtmlHelper
  @(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.ProductViewModel>()
    .Name("listView")
    .TagName("div")
    .ClientTemplateId("template")
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("Products_Read", "ListView"))
        .PageSize(21)
      )
    .Pageable()
    )
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

    <kendo-listview name="listView"
                    tag-name="div"
                    template-id="template">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="21">
            <transport>
                <read url="@Url.Action("Products_Read", "ListView")" />
            </transport>
        </datasource>
        <pageable enabled="true" />
    </kendo-listview>
```
{% endif %}

The following example demonstrates a CustomDataSourceBuilder definition.

```HtmlHelper
@(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.ProductViewModel>()
    .Name("listView")
    .TagName("div")
    .ClientTemplateId("template")
    .DataSource(dataSource => dataSource
        .Custom()
        .Schema(schema => schema
           .Model(model => model.Id("ProductID")))
        .PageSize(4)
        .Transport(transport => transport
            .Read(read => read.Action("Products_Read", "ListView"))
        )
    )
    .Pageable()
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-listview name="listView"
                tag-name="div"
                template-id="template">
    <datasource type="DataSourceTagHelperType.Custom" page-size="4">
        <transport>
                <read url="@Url.Action("Products_Read", "ListView")" />
        </transport>
        <schema>
            <model id="ProductID">
                <fields>
                    <field name="ProductName"></field>
                    <field name="UnitPrice"></field>
                    <field name="UnitsInStock"></field>
                    <field name="Discontinued"></field>
                </fields>
            </model>
        </schema>
    </datasource>
    <pageable enabled="true" />
</kendo-listview>
```
{% endif %}

## See Also

* [Custom DataSource for {{ site.framework }} (https://docs.telerik.com/{{ site.platform }}/html-helpers/datasource/custom-datasource)
* [Server-Side API](/api/listview)
* [Custom DataSource in ListView for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listview/custom-datasource)
