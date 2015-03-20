---
title: Overview
page_title: How to use the PivotGrid PHP class, server-side wrapper for Kendo UI PivotGrid widget
description: Learn how to bind Kendo UI PivotGrid for PHP, handle Kendo UI PivotGrid Events, access an existing pivotgrid.
---

# PivotGrid

The Kendo PivotGrid for PHP is a server-side wrapper for the [Kendo UI PivotGrid](/api/web/pivotgrid) widget.

More information about OLAP concepts supported by Kendo PivotGrid for PHP can be found here:

- [PivotGrid Fundamentals](/web/pivotgrid/fundamentals)
- [Setup an OLAP cube](/web/pivotgrid/olap-cube-setup) or use our OLAP service ([http://demos.telerik.com/olap/msmdpump.dll](http://demos.telerik.com/olap/msmdpump.dll))

## Getting Started

The following tutorial shows how to configure Kendo UI PivotGrid for PHP to do ajax binding to an **Adventure Works** cube hosted on [http://demos.telerik.com/olap/msmdpump.dll](http://demos.telerik.com/olap/msmdpump.dll)

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
 
1. Create a PivotDataSourceTransport and define the service URL:

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

1. Create a PivotDataSourceSchema and set its type:

        $schema = new \Kendo\Data\PivotDataSourceSchema();
        $schema->type('xmla');

1. Define column and row dimensions of pivotgrid:

        $dateColumn = new \Kendo\Data\PivotDataSourceColumn();
        $dateColumn->name('[Date].[Calendar]')
                    ->expand(true);
        
        $cityColumn = new \Kendo\Data\PivotDataSourceColumn();
        $cityColumn->name('[Geography].[City]');

4. Create a PivotDataSource instance:

        $dataSource = new \Kendo\Data\PivotDataSource();

        $dataSource->transport($transport)
            ->type("xmla")
            ->addColumn($dateColumn, $cityColumn)
            ->addRow('[Product].[Product]')
            ->addMeasure(array('[Measures].[Internet Sales Amount]'))
            ->schema($schema);

4. Create a [pivotgrid](/api/wrappers/php/Kendo/UI/PivotGrid) and set its data source:

        $pivotgrid = new \Kendo\UI\PivotGrid('pivotgrid');
        $pivotgrid->dataSource($dataSource);

4. Render the pivotgrid:

        <?php
        echo $pivotgrid->render();
        ?>

## Getting Client-side Reference

You can reference the clien-side Kendo Grid instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/pivotgrid#methods) to control its behavior.


### Example

    <script>
    $(function() {
        // The constructor parameter is used as the 'id' HTML attribute of the pivotgrid
        var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
    });
    </script>

## Handling Events

You can subscribe to all grid [events](/api/web/pivotgrid#events).

### Example - subscribing by specifying JavaScript function name

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

### Example - providing inline JavaScript code

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
