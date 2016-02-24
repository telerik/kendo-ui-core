---
title: Overview
page_title: Overview | PivotGrid PHP Class
description: "Get started with the PivotGrid PHP class in Kendo UI."
slug: overview_pivotgrid_uiforphp
position: 1
---

# PivotGrid PHP Class Overview

The Kendo UI PivotGrid for PHP is a server-side wrapper for the [Kendo UI PivotGrid](/api/javascript/ui/pivotgrid) widget.

For more information on the OLAP concept supported by the Kendo UI PivotGrid for PHP, refer to the articles about [OLAP fundamentals]({% slug fundamentals_pivotgrid_widget %}), [setup an OLAP cube]({% slug olap_cube_setup_pivotgrid_widget %}), or [use the Kendo UI OLAP service](http://demos.telerik.com/olap/msmdpump.dll).

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI PivotGrid for PHP to do Ajax binding to an **Adventure Works** cube hosted on [http://demos.telerik.com/olap/msmdpump.dll](http://demos.telerik.com/olap/msmdpump.dll).

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a `PivotDataSourceTransport` and define the service URL.

###### Example

        $transport = new \Kendo\Data\PivotDataSourceTransport();

        $read = new \Kendo\Data\PivotDataSourceTransportRead();

        $read->url('http://demos.telerik.com/olap/msmdpump.dll')
             ->contentType('text/xml')
             ->dataType('text')
             ->type('POST');

        $connection = new \Kendo\Data\PivotDataSourceTransportConnection();

        $connection->catalog('Adventure Works DW 2008R2')
                    ->cube('Adventure Works');

        $discover = new \Kendo\Data\PivotDataSourceTransportDiscover();

        $discover->url('http://demos.telerik.com/olap/msmdpump.dll')
             ->contentType('text/xml')
             ->dataType('text')
             ->type('POST');

        $transport ->read($read)
                    ->connection($connection)
                    ->discover($discover);

**Step 3** Create a `PivotDataSourceSchema` and set its type.

###### Example

        $schema = new \Kendo\Data\PivotDataSourceSchema();
        $schema->type('xmla');

**Step 4** Define the column and row dimensions of the PivotGrid.

###### Example

        $dateColumn = new \Kendo\Data\PivotDataSourceColumn();
        $dateColumn->name('[Date].[Calendar]')
                    ->expand(true);

        $cityColumn = new \Kendo\Data\PivotDataSourceColumn();
        $cityColumn->name('[Geography].[City]');

**Step 5** Create a `PivotDataSource` instance.

###### Example

        $dataSource = new \Kendo\Data\PivotDataSource();

        $dataSource->transport($transport)
            ->type("xmla")
            ->addColumn($dateColumn, $cityColumn)
            ->addRow('[Product].[Product]')
            ->addMeasure(array('[Measures].[Internet Sales Amount]'))
            ->schema($schema);

**Step 6** Create a [PivotGrid](/api/php/Kendo/UI/PivotGrid) and set its `dataSource`.

###### Example

        $pivotgrid = new \Kendo\UI\PivotGrid('pivotgrid');
        $pivotgrid->dataSource($dataSource);

**Step 7** Render the PivotGrid.

###### Example

        <?php
        echo $pivotgrid->render();
        ?>

## Event Handling

You can subscribe to all PivotGrid [events](/api/javascript/ui/pivotgrid#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $pivotgrid = new \Kendo\UI\PivotGrid('pivotgrid');
        $pivotgrid->dataSource($dataSource);

        // The 'pivotgrid_dataBound' JavaScript function will handle the 'dataBound' event of the pivotgrid
        $grid->dataBound('pivotgrid_dataBound');

        echo $pivotgrid->render();
        ?>
        <script>
        function pivotgrid_dataBound() {
            // Handle the dataBound event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $pivotgrid = new \Kendo\UI\PivotGrid('pivotgrid');
        $pivotgrid->dataSource($dataSource);

        // Provide inline JavaScript code that will handle the 'dataBound' event of the grid
        $pivotgrid->dataBound('function() { /* Handle the dataBound event */ }');

        echo $pivotgrid->render();
        ?>
        <script>
        function pivotgrid_dataBound() {
            // Handle the dataBound event
        }
        </script>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing PivotGrid instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [PivotGrid API](/api/javascript/ui/pivotgrid#methods) to control its behavior.

###### Example

        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the pivotgrid
            var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the PivotGrid:

* [Overview of the Kendo UI PivotGrid Widget]({% slug overview_kendoui_pivotgrid_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
