---
title: Grid Custom DataSource
page_title: Custom DataSource of the Grid Component
description: "Get started with Telerik UI for ASP.NET MVC and use the CustomDataSource builder for the Grid component."
slug: grid_customdatasource_aspnetmvc
position: 4
---

# Custom DataSource

Telerik UI for ASP.NET MVC enables you to use the CustomDataSource builder that is available to helpers that support Data Binding.

The CustomDataSource builder class allows full control over the [DataSource client-side API options](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource), through Razor syntax. The CustomDataSource builder facilitates the usage of the Telerik UI helpers&mdash;for example, the helpers generate validation attributes, editors, and so on, while they utilize the flexibility of JavaScript. The CustomDataSource builder can also be used in more advanced scenarios where the regular DataSource builders prevent you from fully customizing the options of the DataSource.

## DataSource and Custom DataSource

The regular DataSource builders have many settings that are configured by default. The CustomDataSource builder removes these predefined settings, so when you declare a DataSource as custom, configure these additional settings.

The following two examples demonstrate a regular Grid AjaxDataSourceBuilder and a CustomDataSource builder.

```HtmlHelper
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()    
    .Name("grid")
    .Columns(columns => {
        columns.Bound(p => p.OrderID).Filterable(false).Width(100);
        columns.Bound(p => p.Freight).Width(100);
        columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}").Width(140);
        columns.Bound(p => p.ShipName);
        columns.Bound(p => p.ShipCity).Width(150);
    })
    .HtmlAttributes(new { style = "height:430px;" })
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(20)
        .Read(read => read.Action("Orders_Read", "Grid"))
     )
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid" height="430">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
            <schema>
                <model id="OrderID">
                    <fields>
                        <field name="OrderID" type="number"></field>
                        <field name="Freight" type="number"></field>
                        <field name="OrderDate" type="date"></field>
                        <field name="ShipName" type="string"></field>
                        <field name="ShipCity" type="string"></field>
                    </fields>
                </model>
            </schema>
            <transport>
                <read url="@Url.Action("Orders_Read","Grid")"/>
            </transport>
        </datasource>
        <columns>
            <column field="OrderID" width="100">
                <filterable enabled="false"/>
            </column>
            <column field="Freight" width="100"/>
            <column field="OrderDate" width="140" format="{0:MM/dd/yyyy}"/>
            <column field="ShipName"/>
            <column field="ShipCity" width="150"/>
        </columns>
    </kendo-grid>
```
{% endif %}

The following example demonstrates a CustomDataSourceBuilder definition.

```HtmlHelper
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()    
    .Name("Grid")    
    .Columns(columns => {        
        columns.Bound(p => p.ProductName);
        columns.Bound(p => p.UnitPrice).Width(140);
        columns.Bound(p => p.UnitsInStock).Width(140);
        columns.Bound(p => p.Discontinued).Width(100);
    })
    .DataSource(dataSource => dataSource        
        .Custom()         
        .PageSize(20)
        .Schema(schema => schema.Model(m => m.Id(p => p.ProductID)))
        .Transport(transport =>
        {
            transport.Read(read => read.Action("Orders_Read", "Grid"));
        })
    )
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

    <kendo-grid name="Grid" navigatable="true">
        <datasource type="DataSourceTagHelperType.Custom" page-size="20">
            <schema>
                <model id="ProductID">
                    <fields>
                        <field name="ProductID" type="number" editable="false"></field>
                        <field name="ProductName" type="string"></field>
                        <field name="UnitPrice" type="number"></field>
                        <field name="UnitsInStock" type="number"></field>
                        <field name="Discontinued" type="boolean"></field>
                    </fields>
                </model>
            </schema>
            <transport>
                  <read url="@Url.Action("Products_Read","Grid")"/>
            </transport>
        </datasource>
        <columns>
            <column field="ProductName"/>
            <column field="UnitPrice" width="140"/>
            <column field="UnitsInStock" width="140"/>
            <column field="Discontinued" width="100"/>
        </columns>
    </kendo-grid>
```
{% endif %}

## See Also

* [Custom DataSource for {{ site.framework }} (https://docs.telerik.com/{{ site.platform }}/html-helpers/datasource/custom-datasource)
* [Server-Side API](/api/grid)
* [Custom DataSource in Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/custom-datasource)
