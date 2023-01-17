---
title: Overview
page_title: jQuery PivotGrid Documentation - PivotGrid Overview
description: "Get started with the jQuery PivotGrid by Kendo UI and learn how to create and configure the widget."
slug: overview_kendoui_pivotgrid_widget
position: 1
---

# {{ site.product }} PivotGrid Overview

The Kendo UI PivotGrid represents multidimensional data in a cross-tabular format.

* [Demo page for the PivotGrid](https://demos.telerik.com/kendo-ui/pivotgrid/index)

> Тhe new PivotGridV2 is now available. It offers a brand new design and a new future-proof architecture that allows the implementation of many upcoming functionalities. As PivotGridV2 aims to replace the legacy PivotGrid, it is recommended to use the PivotGridV2 in your new projects. For information about the differences between the PivotGrid and PivotGridV2, refer to the [Comparison]({% slug comparison_kendoui_pivotgridv2 %}) article.

## Basic Configuration

1. Start with the initialization of the PivotGrid widget. Create the widget by defining an HTML <div> element.

		<!-- Define	 the HTML div that will hold the PivotGrid -->
		<div id="pivotgrid">
		</div>

2. Configure PivotGrid to work with the Adventure Works cube that is hosted on https://demos.telerik.com.

        <script>
        	$(document).ready(function () {
            	$("#pivotgrid").kendoPivotGrid({
					height: 200, // Define the height of the widget.
					dataSource: {
						type: "xmla", // Define the type.
						columns: [{ name: "[Date].[Calendar]" }], // Specify a dimension on columns.
						rows: [{ name: "[Product].[Category]" }], // Specify a dimension on rows.
						measures: ["[Measures].[Internet Sales Amount]"], // Specify a measure to display.
						transport: {
                            connection: {
                                catalog: "Adventure Works DW 2008R2", // Specify the name of the catalog.
                                cube: "Adventure Works" // Specify the name of the cube.
                            },
                            read: {
                                url: "https://demos.telerik.com/olap/msmdpump.dll", // Define the URL of the service.
                                dataType: "text",
                                contentType: "text/xml",
                                type: "POST"
                            }
                        },
						schema: {
                            type: "xmla" // Specify the type of the schema.
                        },
					}
				});
        	});
    	</script>

The previous example outputs the following result.

![Kendo UI for jQuery PivotGrid Overview](../../../images/pivotgrid-overview.png)

## Functionality and Features

* [Data binding]({% slug databinding_kendoui_pivotgrid %})
* [Comparison with the PivotGridV2]({% slug comparison_kendoui_pivotgridv2 %})
* [Filtering]({% slug filtering_kendoui_pivotgrid %})
* [Sorting]({% slug sorting_kendoui_pivotgrid %})
* [Excel export]({% slug excelexport_functionality_pivotgrid %})
* [PDF export]({% slug exporting_functionality_pivotgridwidget %})

## Referencing Existing Instances

To reference an existing PivotGrid instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference has been established, use the [PivotGrid API](/api/web/pivotgrid) to control its behavior.

The following example demonstrates how to access an existing PivotGrid instance.

    var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");

## See Also

* [Basic Usage of the PivotGrid (Demo)](https://demos.telerik.com/kendo-ui/pivotgrid/index)
* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
