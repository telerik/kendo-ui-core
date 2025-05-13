---
title: Filtering
page_title: Filtering
description: "Get started with the Telerik UI PivotGrid component for {{ site.framework }} and learn how to filter a Telerik UI PivotGrid component for {{ site.framework }}."
slug: htmlhelpers_pivotgrid_aspnetcore_filtering
position: 3
---

# Filtering

The PivotGrid supports filtering both in the OLAP and flat data-binding scenarios.

The PivotGrid uses [`kendo.data.PivotDataSource`](/api/pivotdatasource) to perform `label` filtration. However, it filters only by the caption value of the members.

The filter descriptor is similar to [the filter option of the `kendo.data.DataSource`](/api/datasource) and contains the following options:
- `field`&mdash;The full path to the tuple member. For example, `[Date].[Calendar].[Calendar Year].&[2005]`.
- `operator`&mdash;All operators that work with strings. Note that the widget treats field values as strings.
- `value`&mdash;The filter value.

### Filtering when using Xmla DataSource

To set a predefined filter when using Xmla data use the above-described approach and set the filter configuration of the PivotDataSource, following the [guidelines for MDX queries](https://learn.microsoft.com/en-us/analysis-services/multidimensional-models/mdx/mdx-query-fundamentals-analysis-services?view=asallproducts-allversions) and [Members, Tuples, and Sets](https://learn.microsoft.com/en-us/analysis-services/multidimensional-models/mdx/working-with-members-tuples-and-sets-mdx?view=asallproducts-allversions).


```HtmlHelper
    .Filter(f =>
    {
        f.Add("[Geography].[City]").StartsWith("Ev");
        f.Add("[Date].[Calendar]").In("[Date].[Calendar].[Calendar Year].&[2010],[Date].[Calendar].[Calendar Year].&[2013]");
    })
```
{% if site.core %}
```TagHelper
    @{
        var filterValue = "[Date].[Calendar].[Calendar Year].&[2010],[Date].[Calendar].[Calendar Year].&[2013]";
    }

    <kendo-pivotdatasource type=@(PivotDataSourceType.Xmla) name="pivotSource" on-error="onError">
        <columns>
            <pivot-datasource-column name="[Date].[Calendar]" expand="true"></pivot-datasource-column>
            <pivot-datasource-column name="[Product].[Category]"></pivot-datasource-column>
        </columns>
        <rows>
            <row name="[Geography].[City]"></row>
        </rows>
        <schema type="xmla"/>
        <measures values=@(new string[] {"[Measures].[Reseller Freight Cost]"} ) ></measures>
        <transport>
            <read url="https://demos.telerik.com/olap/msmdpump.dll" datatype="text" content-type="text/xml" type="POST" />
            <connection catalog="Adventure Works DW 2008R2" cube="Adventure Works"></connection>
        </transport>
        <filters>
            <datasource-filter field="[Date].[Calendar]" operator="in" value=@filterValue ></datasource-filter>
        </filters>
    </kendo-pivotdatasource>
```
{% endif %}

### Filtering when using Flat Data

Build the filter descriptor similar to [the filter option of the `kendo.data.DataSource`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/filter).

```HtmlHelper
    .Filter(f =>
    {
        f.Add(p=>p.ProductName).Contains("An");
        f.Add(p => p.Discontinued).IsEqualTo(true);
    })
```
{% if site.core %}
```TagHelper
    @{
        var productName = "An";
        var discontinued = true;
    }

    <kendo-pivotdatasource>
        <filters>
            <datasource-filter field="ProductName" operator="contains" value="@productName" ></datasource-filter>
            <datasource-filter field="Discontinued" operator="eq" value="@discontinued" ></datasource-filter>
        </filters>
    </kendo-pivotdatasource>
```
{% endif %}

## See Also

* [Basic Usage of the PivotGrid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgrid/index)
{% if site.core %}
* [Basic Usage of the PivotGrid TagHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pivotgrid/tag-helper)
{% endif %}
* [Server-Side API](/api/pivotgrid)
