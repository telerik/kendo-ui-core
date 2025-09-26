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


<div class="meta-api-description">
Link or associate a toggle button with a specific PivotGrid configurator using its HTML or component ID to control the visibility or open state of that configurator on button clicks; enable dynamic show, hide, or open actions by configuring the button to reference the target configurator component through its unique identifier, allowing seamless interaction between the button and the PivotGrid configurator for user-driven display toggling and interface configuration control.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
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


<div class="meta-api-description">
Control the label or caption displayed on the configurator button within a pivot grid, enabling customization of button text for localization, dynamic user interface updates, setting descriptive or context-specific captions, adjusting visible strings for different languages or user roles, modifying button naming during initialization, and tailoring UI elements to improve clarity, user interaction, or accessibility by setting or changing the button’s displayed text value.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
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


<div class="meta-api-description">
Enable, disable, switch, or control the visibility of a configuration panel dynamically by programmatically toggling the display of settings or options interface elements; invoke this method to open or close the configurator UI, trigger visibility changes based on user interactions such as clicks or events, manage the display state for configuration controls in a pivot table context, and seamlessly update the interface to reflect current configuration mode activation or deactivation.
</div>

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
                read: 'https://demos.telerik.com/service/v2/olap/msmdpump.dll'
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