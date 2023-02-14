---
title: Overview
page_title: jQuery PivotGridV2 Documentation - PivotGridV2 Overview
description: "Get started with the jQuery PivotGridV2 by Kendo UI and learn how to create and configure the widget."
slug: overview_kendoui_pivotgridv2_widget
position: 1
---

# {{ site.product }} PivotGridV2 Overview

The Kendo UI PivotGridV2 represents multidimensional data in a cross-tabular format.

* [Demo page for the PivotGridV2](https://demos.telerik.com/kendo-ui/pivotgridv2/index)

Compared to the legacy PivotGrid, the new PivotGridV2 offers a brand new design, and its future-proof architecture allows the implementation of many upcoming functionalities. As PivotGridV2 aims to replace the legacy PivotGrid, it is recommended to use the PivotGridV2 in your new projects. For information about the differences between the PivotGrid and PivotGridV2, refer to the [Comparison]({% slug comparison_kendoui_pivotgridv2 %}) article.

## Basic Configuration

1. Start with the initialization of the PivotGridV2 widget. Create the widget by defining an HTML `<div>` element.

        <!-- Define	 the HTML div that will hold the PivotGridV2 -->
        <div id="pivotgrid">
        </div>

1. Configure PivotGridV2 to work with the **Adventure Works** cube that is hosted on https://demos.telerik.com.

        <script>
            $(document).ready(function () {
                $("#pivotgrid").kendoPivotGridV2({
                    height: 700, // Define the height of the widget.
                    dataSource: {
                        type: "xmla", // Define the type of the DataSource.
                        columns: [{ name: ['[Date].[Calendar]'] }], // Specify a columns dimension.
                        rows: [{ name: ['[Geography].[City]'] }], // Specify a rows dimension.
                        measures: [{ name: ['[Measures].[Reseller Freight Cost]'] }], // Specify a measure to display.
                        transport: {
                            connection: {
                                catalog: "Adventure Works DW 2008R2", // Specify the name of the catalog.
                                cube: "Adventure Works" // Specify the name of the cube.
                            },
                            read: 'https://demos.telerik.com/olap/msmdpump.dll' // Specify the url of the service.
                        }
                    }
                });
            });
        </script>

The following image demonstrates the output from the previous example.

![Kendo UI for jQuery PivotGridV2 Overview](../../../images/pivotgridv2-overview.png)

## Functionality and Features

* [Data binding]({% slug databinding_kendoui_pivotgridv2 %})
* [Comparison with the PivotGrid]({% slug comparison_kendoui_pivotgridv2 %})
* [Templates]({% slug templates_kendoui_pivotgridv2 %})
* [PDF export]({% slug pdfexport_kendoui_pivotgridv2 %})
* [Filtering]({% slug filtering_kendoui_pivotgridv2 %})

## Referencing Existing Instances

To reference an existing PivotGridV2 instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference has been established, use the [PivotGridV2 API](/api/javascript/ui/pivotgridv2/) to control its behavior.

The following example demonstrates how to access an existing PivotGridV2 instance.

    var pivotgrid = $("#pivotgrid").data("kendoPivotGridV2");

## See Also

* [Basic Usage of the PivotGridV2 (Demo)](https://demos.telerik.com/kendo-ui/pivotgridv2/index)
* [PivotGridV2 JavaScript API Reference](/api/javascript/ui/pivotgridv2)