---
title: PivotConfiguratorButton
page_title: Configuration of Kendo UI PivotConfiguratorButton
description: Code examples for PivotConfiguratorButton UI widget configuration, learn how to use it.
res_type: api
---

# kendo.ui.PivotConfiguratorButton

Represents the Kendo UI PivotConfiguratorButton widget

## Configuration

### configurator `String` *(default: "Change settings")*

Use it to set the Id of the configurator that will be shown/hidden when clicking the button.

#### Example

    <div id="configurator"></div>
    <div id="pivotbutton"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
        },
        filterable: true,
        sortable: true,
        height: 580
    });

    $("#pivotbutton").kendoPivotConfiguratorButton({
        configurator: "configurator"
    });
    </script>

### text `String` *(default: "Change settings")*

The text of the button.

#### Example

    <div id="configurator"></div>
    <div id="pivotbutton"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
        },
        filterable: true,
        sortable: true,
        height: 580
    });

    $("#pivotbutton").kendoPivotConfiguratorButton({
        configurator: "configurator",
        text: "Alter settings"
    });
    </script>

## Methods

### toggle

Toggles the visibility of the related configurator

#### Example - refresh the widget

    <div id="configurator"></div>
    <div id="pivotbutton"></div>
    <script>
    $("#configurator").kendoPivotConfiguratorV2({
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
        },
        filterable: true,
        sortable: true,
        height: 580
    });

    $("#pivotbutton").kendoPivotConfiguratorButton({
        configurator: "configurator"
    });

    $("#pivotbutton").getKendoPivotConfiguratorButton().toggle();
    </script>