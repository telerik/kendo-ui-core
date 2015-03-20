---
title: PivotConfigurator overview
page_title: Overview of the Kendo UI PivotConfigurator widget
description: Quick steps to help you create a Kendo UI PivotConfigurator.
---

# PivotConfigurator Overview

The Kendo UI PivotConfigurator widget represents an OLAP cube structure and can be used to configure the column and row dimensions along with the measures fields of the Kendo UI PivotGrid widget.
It is a suplementary widget, which is strongly related to Kendo PivotDataSource component.

## Getting started

The following tutorial shows how to initialize [Kendo UI PivotConfigurator](/api/web/pivotconfigurator) and link it to a Kendo UI PivotGrid widget.

1. Define a HTML Div element

        <!-- Define	 the HTML div that will hold the PivotConfigurator -->
        <div id="pivotconfigurator">
        </div>

        <!-- Define	 the HTML div that will hold the PivotGrid -->
        <div id="pivotgrid">
        </div>

2. Configure the Kendo PivotConfigurator

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

This will create the following widgets:

![Kendo UI PivotConfigurator](/images/pivotconfigurator.png)

## Accessing an Existing PivotConfigurator

You can reference an existing **PivotConfigurator** instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [PivotConfigurator API](/api/web/pivotconfigurator) to control its behavior.

### Accessing an existing PivotConfigurator instance

    var pivotconfigurator = $("#pivotconfigurator").data("kendoPivotConfigurator");

## Next steps:
- [PivotGrid Overview](/web/pivotgrid/overview)
