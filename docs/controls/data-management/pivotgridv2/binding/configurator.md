---
title: PivotConfiguratorV2
page_title: jQuery PivotGridV2 Documentation - PivotConfiguratorV2 Overview
description: "Get started with the jQuery PivotGridV2 by Kendo UI and learn how to create and configure the Kendo UI PivotConfiguratorV2."
slug: overview_kendoui_pivotconfiguratorv2
position: 5
---

# PivotConfiguratorV2 Overview

The [Kendo UI PivotConfiguratorV2](/api/javascript/ui/pivotconfiguratorv2) represents an OLAP cube structure.

The PivotConfiguratorV2 can be used for configuring the column and row dimensions, and the measure fields of the [PivotGridV2](https://demos.telerik.com/kendo-ui/pivotgridv2/index). It is a supplementary component which is strongly related to the Kendo UI `PivotDataSourceV2` component.

## Initializing the PivotConfiguratorV2

There are four elements that need to be configured for the PivotConfiguratorV2 to function properly:

* PivotGridV2—The PivotGridV2 widget which will be managed by the PivotConfiguratorV2.
* PivotConfiguratorV2—The configurator widget itself.
* PivotConfiguratorButton—The button which expands/collapses the PivotConfiguratorV2.
* PivotContainer—The container which holds all of the above widgets.

The following example demonstrates the HTML structure of the elements.

    <div id="container">
        <div id="pivotgrid"></div>
        <div id="configurator"></div>
        <div id="pivotbutton"></div>
    </div>

## Basic Configuration

The following example demonstrates how to configure the widgets.

    <script>
        $(document).ready(function () {
            // Initialize the PivotGridV2.
            var pivotgrid = $("#pivotgrid").kendoPivotGridV2({
                height: 700,
                dataSource: {
                    type: "xmla",
                    columns: [{ name: ['[Date].[Calendar]'], expand: true }],
                    rows: [{ name: ['[Geography].[City]'], expand: true }],
                    measures: [{ name: ['[Measures].[Reseller Freight Cost]'] }],
                    transport: {
                        connection: {
                            catalog: "Adventure Works DW 2008R2",
                            cube: "Adventure Works"
                        },
                        read: 'https://demos.telerik.com/olap/msmdpump.dll'
                    }
                }
            }).data("kendoPivotGridV2");

            // Initialize the PivotConfiguratorV2
            $("#configurator").kendoPivotConfiguratorV2({
                dataSource: pivotgrid.dataSource, // The dataSource should be the same as the one the PivotGridV2 is using.
                filterable: true,
                sortable: true,
                height: 580
            });

            // Initialize the PivotContainer.
            $("#container").kendoPivotContainer({
                configuratorPosition: "left" // The PivotConfiguratorV2 will appear to the left of the PivotGridV2.
            });

            // Initialize the PivotConfiguratorButton.
            $("#pivotbutton").kendoPivotConfiguratorButton({
                configurator: "configurator" // Specify which KendoConfiguratorV2 widget will the button be related to.
            });
        });
    </script>

The following image demonstrates the output from the previous example.

![Kendo UI for jQuery PivotConfiguratorV2 Overview](../../../../images/pivotconfiguratorv2-overview.png)

## Referencing Existing Instances

To reference an existing PivotConfigurator instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference has been established, use the [PivotConfigurator API](/api/javascript/ui/pivotconfiguratorv2) to control its behavior.

The following example demonstrates how to access an existing PivotConfigurator instance.

    var pivotconfigurator = $("#pivotconfigurator").data("kendoPivotConfiguratorV2");

## See Also

* [Basic Usage of the PivotGridV2 (Demo)](https://demos.telerik.com/kendo-ui/pivotgridv2/index)
* [PivotGridV2 JavaScript API Reference](/api/javascript/ui/pivotgridv2)
* [PivotConfiguratorV2 JavaScript API Reference](/api/javascript/ui/pivotconfiguratorv2)
