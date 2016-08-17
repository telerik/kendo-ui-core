---
title: PivotConfigurator Overview
page_title: PivotConfigurator Overview | Kendo UI PivotGrid
description: "Learn how to create and configure the Kendo UI PivotGrid Configurator."
slug: overview_kendoui_pivotconfigurator_pivotgridwidget
position: 2
---

# PivotConfigurator Overview

The Kendo UI PivotConfigurator widget represents an OLAP cube structure and can be used to configure the column and row dimensions along with the measures fields of the [Kendo UI PivotGrid widget](http://demos.telerik.com/kendo-ui/pivotgrid/index). It is a suplementary widget, which is strongly related to the Kendo UI `PivotDataSource` component.

## Getting Started

### Initialize the PivotConfigurator

The sections below demonstrate how to initialize the [Kendo UI PivotConfigurator](/api/web/pivotconfigurator) and link it to a Kendo UI PivotGrid widget.

Create the PivotConfigurator by defining an HTML `<div>` element.

###### Example

        <!-- Define	 the HTML div that will hold the PivotConfigurator -->
        <div id="pivotconfigurator">
        </div>

        <!-- Define	 the HTML div that will hold the PivotGrid -->
        <div id="pivotgrid">
        </div>

The example below demonstrates how to further configure the Kendo UI PivotConfigurator widget.

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

The code above results in the following widgets:

![Kendo UI PivotConfigurator](/images/pivotconfigurator.png)

## Reference

### Existing Instances

You can reference an existing PivotConfigurator instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference has been established, use the [PivotConfigurator API](/api/web/pivotconfigurator) to control its behavior.

The example below demonstrates how to access an existing PivotConfigurator instance.

###### Example

    var pivotconfigurator = $("#pivotconfigurator").data("kendoPivotConfigurator");

## See Also

Other articles on the Kendo UI PivotGrid:

* [Overview]({% slug overview_kendoui_pivotgrid_widget %})
* [Exporting]({% slug exporting_functionality_pivotgridwidget %})
* [Fundamentals]({% slug fundamentals_pivotgrid_widget %})
* [OLAP Cube Setup]({% slug olap_cube_setup_pivotgrid_widget %})
* [Frequently Asked Questions]({% slug frequently_asked_questions_pivotgrid %})

For how-to examples on the Kendo UI PivotGrid widget, browse its [**How To** documentation folder]({% slug howto_add_dimension_column_axis_pivotgrid %}).
