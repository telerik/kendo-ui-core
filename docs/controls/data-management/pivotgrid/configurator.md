---
title: PivotConfigurator Overview
page_title: PivotConfigurator Overview | Kendo UI PivotGrid
description: "Learn how to create and configure the Kendo UI PivotGrid Configurator."
slug: overview_kendoui_pivotconfigurator_pivotgridwidget
position: 2
---

# PivotConfigurator Overview

The Kendo UI PivotConfigurator represents an OLAP cube structure and can be used to configure the column and row dimensions along with the measures fields of the [PivotGrid](http://demos.telerik.com/kendo-ui/pivotgrid/index).

It is a supplementary widget, which is strongly related to the Kendo UI `PivotDataSource` component.

## Getting Started

### Initialize the PivotConfigurator

The following sections demonstrate how to initialize the [PivotConfigurator](/api/web/pivotconfigurator) and link it to the PivotGrid.

To create the PivotConfigurator, define a `<div>` HTML element.

###### Example

        <!-- Define the HTML div that will hold the PivotConfigurator -->
        <div id="pivotconfigurator">
        </div>

        <!-- Define the HTML div that will hold the PivotGrid -->
        <div id="pivotgrid">
        </div>

The following example demonstrates how to further configure the PivotConfigurator.

###### Example

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
                            url: "http://demos.telerik.com/olap/msmdpump.dll",
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

The code from the previous example results in the following widget.

**Figure 1: The PivotConfigurator**

![Kendo UI PivotConfigurator](../../../images/pivotconfigurator.png)

## Reference

### Existing Instances

To reference an existing PivotConfigurator instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference has been established, use the [PivotConfigurator API](/api/web/pivotconfigurator) to control its behavior.

The following example demonstrates how to access an existing PivotConfigurator instance.

###### Example

    var pivotconfigurator = $("#pivotconfigurator").data("kendoPivotConfigurator");

## See Also

* [Overview]({% slug overview_kendoui_pivotgrid_widget %})
* [Exporting]({% slug exporting_functionality_pivotgridwidget %})
* [Fundamentals]({% slug fundamentals_pivotgrid_widget %})
* [OLAP Cube Setup]({% slug olap_cube_setup_pivotgrid_widget %})
* [Frequently Asked Questions]({% slug frequently_asked_questions_pivotgrid %})
* [How-To Examples]({% slug howto_change_pivotgrid_fields_names_pivotgrid %})
* [Knowledge Base Section](/knowledge-base)
