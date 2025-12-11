---
title: Filtering
page_title: jQuery PivotGrid Documentation - Filtering
description: "Get started with the jQuery PivotGrid by Kendo UI and learn how to create and configure the component."
components: ["pivotgrid"]
slug: filtering_kendoui_pivotgrid
position: 3
---

# Filtering

The PivotGrid supports filtering both in the OLAP and flat data-binding scenarios.

The PivotGrid uses [`kendo.data.PivotDataSource`](/api/framework/pivotdatasource) to perform `label` filtration. However, it filters only by the caption value of the members.

The filter descriptor is similar to [the filter option of the `kendo.data.DataSource`](/api/javascript/data/datasource/configuration/filter) and contains the following options:
- `field`&mdash;The full path to the tuple member. For example, `[Date].[Calendar].[Calendar Year].&[2005]`.
- `operator`&mdash;All operators that work with strings. Note that the component treats field values as strings.
- `value`&mdash;The filter value.

### Filtering when using Xmla DataSource

To set a predefined filter when using Xmla data use the above-described approach and set the filter configuration of the dataSource, following the [guidelines for MDX queries](https://learn.microsoft.com/en-us/analysis-services/multidimensional-models/mdx/mdx-query-fundamentals-analysis-services?view=asallproducts-allversions) and [Members, Tuples, and Sets](https://learn.microsoft.com/en-us/analysis-services/multidimensional-models/mdx/working-with-members-tuples-and-sets-mdx?view=asallproducts-allversions).

The example below demonstrates how to filter data only for cities starting with "Ab" for the years 2010 and 2014:

```dojo
    <div id="pivotgrid"></div>
    <script>
      $("#pivotgrid").kendoPivotGrid({
        height: 550,
        filterable: true,
        dataSource: {
          type: "xmla",
          columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Geography].[City]" } ],
          rows: [{ name: "[Product].[Product]" }],
          measures: ["[Measures].[Internet Sales Amount]"],
          transport: {
            connection: {
              catalog: "Adventure Works DW 2008R2",
              cube: "Adventure Works"
            },
            read: {
              url: "https://demos.telerik.com/service/v2/olap/msmdpump.dll",
              dataType: "text",
              contentType: "text/xml",
              type: "POST"
            }
          },
          schema: {
            type: "xmla"
          },
          filter: [
            {
              field:"[Geography].[City]",
              operator:"startswith",
              value:"Ab"
            },{
              field: "[Date].[Calendar]",
              operator: "in",
              value: "[Date].[Calendar].[Calendar Year].&[2010],[Date].[Calendar].[Calendar Year].&[2014]"}
          ]
        }
      });
    </script>
```

### Filtering when using Flat Data

Build the filter descriptor similar to [the filter option of the `kendo.data.DataSource`](/api/javascript/data/datasource/configuration/filter), keeping in mind the field values are treated as strings.

For example, to filter a [PivotGrid bound to local data](https://demos.telerik.com/kendo-ui/pivotgrid/local-flat-data-binding) for products starting with "C" that are discontinued you can provide a filter configuration as demonstrated below:

```
    dataSource: {
        data: products,
        schema: {
            model: {
            fields: {
                ProductName: { type: "string" },
                UnitPrice: { type: "number" },
                UnitsInStock: { type: "number" },
                Discontinued: { type: "boolean" },
                CategoryName: { field: "Category.CategoryName" }
            }
            },
            cube: {
            dimensions: {
                ProductName: { caption: "All Products" },
                CategoryName: { caption: "All Categories" },
                Discontinued: { caption: "Discontinued" }
            },
            measures: {
                "Sum": { field: "UnitPrice", format: "{0:c}", aggregate: "sum" },
                "Average": { field: "UnitPrice", format: "{0:c}", aggregate: "average" }
            }
            }
        },
        columns: [{ name: "CategoryName", expand: true }, { name: "ProductName" } ],
        rows: [{ name: "Discontinued", expand: true }],
        measures: ["Sum"],
        filter:[{field: "ProductName", operator: "startswith", value: "C"},
            {field: "Discontinued", operator: "eq", value: true}]
    }
```

## See Also

* [Filtering a Dimension in the PivotGrid]({% slug howto_filter_dimensions_pivotgrid %})
* [Basic Usage of the PivotGrid (Demo)](https://demos.telerik.com/kendo-ui/pivotgrid/index)
* [Binding the PivotGrid to flat local data (Demo)](https://demos.telerik.com/kendo-ui/pivotgrid/local-flat-data-binding)
* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
