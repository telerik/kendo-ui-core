---
title: Overview
page_title: Overview | Kendo UI PivotGrid
description: "Learn how to create and configure the Kendo UI PivotGrid widget."
slug: overview_kendoui_pivotgrid_widget
position: 1
---

# PivotGrid Overview

The [Kendo UI PivotGrid widget](http://demos.telerik.com/kendo-ui/pivotgrid/index) represents multidimensional data in a cross-tabular format. It allows the user to perform a complex analysis on the visualized data. Kendo UI PivotGrid uses the Online Analytical Processing ([OLAP](http://en.wikipedia.org/wiki/Online_analytical_processing)) approach to present the result of multidimensional queries in a comprehensive way. It also supports a drill-down functionality that represents the underlying data for calculated cells. The widget uses an instance of the [`kendo.data.PivotDataSource`](/api/framework/pivotdatasource) component as a data source. `PivotDataSource` communicates with an OLAP [cube](http://en.wikipedia.org/wiki/OLAP_cube) instance on HTTP using the [XMLA](http://en.wikipedia.org/wiki/XML_for_Analysis) protocol.

## Prerequisites

- [Get Acquainted with the PivotGrid Fundamentals](/web/pivotgrid/fundamentals)
- [Set Up an OLAP Cube](/web/pivotgrid/olap-cube-setup), or
- [Use Our OLAP Service](http://demos.telerik.com/olap/msmdpump.dll)

## Getting Started

### Initialize the PivotGrid

The sections below demonstrate how to configure the Kendo UI PivotGrid widget to the "Adventure Works" cube hosted on http://demos.telerik.com.

Create the PivotGrid by defining an HTML `<div>` element.

###### Example

		<!-- Define	 the HTML div that will hold the PivotGrid -->
		<div id="pivotgrid">
		</div>

The example below demonstrates how to further configure the Kendo UI PivotGrid widget.

###### Example

        <script>
        	$(document).ready(function () {
            	$("#pivotgrid").kendoPivotGrid({
					height: 200, //define the height of the widget
					dataSource: {
						type: "xmla", //define the type
						columns: [{ name: "[Date].[Calendar]" }], //specify a dimesion on columns
						rows: [{ name: "[Product].[Category]" }], //specify a dimesion on rows
						measures: ["[Measures].[Internet Sales Amount]"], //specify a measure to display
						transport: {
                            connection: {
                                catalog: "Adventure Works DW 2008R2", //specify the name of the catalog
                                cube: "Adventure Works" //specify the name of the cube
                            },
                            read: {
                                url: "http://demos.telerik.com/olap/msmdpump.dll", //define the URL of the service
                                dataType: "text",
                                contentType: "text/xml",
                                type: "POST"
                            }
                        },
						schema: {
                            type: "xmla" //specify the type of the schema
                        },
					}
				});
        	});
    	</script>

The code above results in the following PivotGrid widget:

![Kendo UI PivotGrid](/images/pivotgrid.png)

## Settings

### Filtering

The PivotGrid widget uses [`kendo.data.PivotDataSource`](/api/framework/pivotdatasource) to perform `label` filtration. That being said, it filters only by the members' caption value. The filter descriptor is similar to [the filter option of `kendo.data.DataSource`](/api/javascript/data/datasource#configuration-filter). It contains:

- `field` - the full path to the tuple member, e.g. `[Date].[Calendar].[Calendar Year].&[2005]`.
- `operator` - all operators that work with strings. Note that the widget treats field values as strings.
- `value` - the filter value.

For a demo, see the runnable how-to example about [filtering a dimension](/web/pivotgrid/how-to/filter-dimension).

> **Important**
> Filtering is supported both in OLAP and flat-data (client cube) binding scenarios.

### Sorting

The widget supports sorting by the members' caption name. The structure of the `sort` descriptor is similar to [the sort option of the`kendo.data.DataSource`](/api/javascript/data/datasource#configuration-sort). It contains:

- `field` - the name of the dimension, e.g. `[Date].[Calendar]`.
- `dir` - the direction of the sorting.

All inner members of the sorted dimension will be sorted with the same sort dimension.

For a demo, see the runnable how-to example about [sorting a dimension](/web/pivotgrid/how-to/sort-dimension).

> **Important**
> Sorting is supported only in OLAP binding scenarios. Client cube cannot be sorted for the time being.

## Reference

### Existing Instances

Refer to an existing PivotGrid instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference has been established, use the [PivotGrid API](/api/web/pivotgrid) to control its behavior.

The example below demonstrates how to access an existing PivotGrid instance.

###### Example

    var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");

## Limitations

### Bind to Large Flat Data

When the PivotGrid is bound to a `flat data structure`, it processes the data on the client (browser) creating a client cube representation [(configuration)](/api/javascript/data/pivotdatasource#configuration-schema.cube). This means that the widget uses the browser's processing power to project the data, producing the required categorized data output. Although we do not restrict the maximum data amount bound to the widget, it certainly has limits, directly related to the browser capability to handle the loaded dataset.

The symptoms for an overloaded browser are:

- The browser is extremely slowly loading or unresponsive for a long time.
- The browser is crashing on load or on the dimensions/measures update.

If any of the above symptoms are observable, then you hit the browser processing limit.

**Solution**

Use a dedicated [OLAP](https://en.wikipedia.org/wiki/Online_analytical_processing) solution, like Microsoft's [SSAS](https://technet.microsoft.com/en-us/library/ms175609(v=sql.90).aspx).

> **Important**
>
> The server solution should be able to communicate with the client accepting HTTP requests. It should support the [XMLA 1.1 protocol](https://en.wikipedia.org/wiki/XML_for_Analysis).

## See Also

Other articles on the Kendo UI PivotGrid:

* [PivotConfigurator Overview]({% slug overview_kendoui_pivotconfigurator_pivotgridwidget %})
* [Exporting]({% slug exporting_functionality_pivotgridwidget %})
* [Fundamentals]({% slug fundamentals_pivotgrid_widget %})
* [OLAP Cube Setup]({% slug olap_cube_setup_pivotgrid_widget %})
* [Frequently Asked Questions]({% slug frequently_asked_questions_pivotgrid %})
* [Overview of the ASP.NET MVC HtmlHelper Extension](/aspnet-mvc/helpers/pivotgrid/overview)
* [Overview of the JSP Tag]({% slug overview_pivotgrid_uiforjsp %})
* [Overview of the PHP Class](/php/widgets/pivotgrid/overview)
* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)

For how-to examples on the Kendo UI PivotGrid widget, browse its [**How To** documentation folder]({% slug howto_add_dimension_column_axis_pivotgrid %}).
