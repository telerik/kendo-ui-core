---
title: Overview
page_title: Overview of the Kendo UI PivotGrid widget
description: Quick steps to help you create a Kendo UI PivotGrid.
position: 1
---

# PivotGrid Overview

The Kendo UI PivotGrid widget represents multidimensional data in a cross-tabular format. It allows the user to perform a complex analysis on the visualized data. The Kendo UI PivotGrid uses the *Online Analytical Processing* ([OLAP](http://en.wikipedia.org/wiki/Online_analytical_processing)) approach to present the result of multidimensional queries in a comprehensive way. It also supports a drill-down functionality that represents the underlying data for calculated cells. The widget uses an instance of [kendo.data.PivotDataSource](/api/framework/pivotdatasource) component as a data source. The PivotDataSource component communicates with OLAP [cube](http://en.wikipedia.org/wiki/OLAP_cube) instance on HTTP using the [XMLA](http://en.wikipedia.org/wiki/XML_for_Analysis) protocol.

## Prerequisites:

- [PivotGrid Fundamentals](/web/pivotgrid/fundamentals)
- [Setup an OLAP cube](/web/pivotgrid/olap-cube-setup) or use our OLAP service ([http://demos.telerik.com/olap/msmdpump.dll](http://demos.telerik.com/olap/msmdpump.dll))

## Getting started

The following tutorial shows how to configure Kendo UI PivotGrid to the "Adventure Works" cube hosted on *http://demos.telerik.com*

1. Define a HTML Div element

		<!-- Define	 the HTML div that will hold the PivotGrid -->
		<div id="pivotgrid">
		</div>

2. Configure the Kendo PivotGrid

        <script>
        	$(document).ready(function () {
            	$("#pivotgrid").kendoPivotGrid({
					height: 200, //define height of the widget
					dataSource: {
						type: "xmla", //define type
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

This will create the following PivotGrid widget:

![Kendo UI PivotGrid](/images/pivotgrid.png)

## Accessing an Existing PivotGrid

You can reference an existing **PivotGrid** instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [PivotGrid API](/api/web/pivotgrid) to control its behavior.

### Accessing an existing PivotGrid instance

    var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");

## Next steps:
- [PivotConfigurator Overview](/web/pivotgrid/configurator)
