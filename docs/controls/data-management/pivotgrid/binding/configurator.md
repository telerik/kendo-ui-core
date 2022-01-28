---
title: PivotConfigurator
page_title: jQuery PivotGrid Documentation | PivotConfigurator Overview
description: "Get started with the jQuery PivotGrid by Kendo UI and learn how to create and configure the Kendo UI PivotGrid Configurator."
slug: overview_kendoui_pivotconfigurator_pivotgridwidget
position: 4
---

# PivotConfigurator Overview

The [Kendo UI PivotConfigurator](/api/web/pivotconfigurator) represents an OLAP cube structure.

The PivotConfigurator can be used for configuring the column and row dimensions, and the measure fields of the [PivotGrid](https://demos.telerik.com/kendo-ui/pivotgrid/index). It is a supplementary component which is strongly related to the Kendo UI `PivotDataSource` component.

## Initializing the PivotConfigurator

The following example demonstrates how to create the PivotConfigurator. To create the PivotConfigurator, define a `<div>` HTML element.

        <!-- Define the HTML div that will hold the PivotConfigurator -->
        <div id="pivotconfigurator">
        </div>

        <!-- Define the HTML div that will hold the PivotGrid -->
        <div id="pivotgrid">
        </div>

## Basic Configuration

The following example demonstrates how to configure the PivotConfigurator.

        <script>
        $(document).ready(function () {
            $("#pivotconfigurator").kendoPivotConfigurator();

            $("#pivotgrid").kendoPivotGrid({
                configurator: "#pivotconfigurator", //specify the ID of the configurator widget
                height: 550,
                dataSource: {
                    type: "xmla",
                    transport: {
                        connection: {
                            catalog: "Adventure Works DW 2008R2",
                            cube: "Adventure Works"
                        },
                        read: {
                            url: "https://demos.telerik.com/olap/msmdpump.dll",
                            dataType: "text",
                            contentType: "text/xml",
                            type: "POST"
                        }
                    },
                    schema: {
                        type: "xmla"
                    }
                }
            });
        });
        </script>

The following image demonstrates the output from the previous example.

![Kendo UI PivotConfigurator](../../../../images/pivotconfigurator.png)

## Referencing Existing Instances

To reference an existing PivotConfigurator instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference has been established, use the [PivotConfigurator API](/api/web/pivotconfigurator) to control its behavior.

The following example demonstrates how to access an existing PivotConfigurator instance.

    var pivotconfigurator = $("#pivotconfigurator").data("kendoPivotConfigurator");

## See Also

* [Basic Usage of the PivotGrid (Demo)](https://demos.telerik.com/kendo-ui/pivotgrid/index)
* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
