---
title: PivotContainer
page_title: Configuration of Kendo UI PivotContainer
description: Code examples for PivotContainer UI widget configuration, learn how to use it.
res_type: api
---

# kendo.ui.PivotContainer

Represents the Kendo UI PivotContainer widget

## Configuration

### configuratorPosition `String` *(default: "left")*

Sets the position of the configurator and button related to the pivot inside the container

#### Example
    <div id="container">
        <div id="pivotgrid"></div>
        <div id="configurator"></div>
        <div id="pivotbutton"></div>
    </div>
    <script>
        var pivotgrid = $("#pivotgrid").kendoPivotGridV2({
            height: 700,
            dataSource: {
                type: "xmla",
                columns: [{ name: ['[Date].[Calendar]'], expand: true },
                { name: ['[Product].[Category]'] }],
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

        $("#configurator").kendoPivotConfiguratorV2({
            dataSource: pivotgrid.dataSource,
            filterable: true,
            sortable: true,
            height: 580
        });

        $("#container").kendoPivotContainer({
            configuratorPosition: "right"
        });

        $("#pivotbutton").kendoPivotConfiguratorButton({
            configurator: "configurator"
        });
    </script>
