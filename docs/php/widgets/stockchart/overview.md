---
title: Overview
page_title: How to use the Stock Chart PHP class, server-side wrapper for Kendo UI Stock Chart widget
description: Learn how to bind Kendo UI Stock Chart for PHP, handle Kendo UI Stock Chart Events, access an existing chart.
---

# Stock Chart

The StockChart for PHP is a server-side wrapper for the [Kendo UI StockChart](/api/dataviz/stock-chart) widget.

## Getting Started

There are two ways to bind a Kendo StockChart for PHP:

* [local](/php/widgets/chart/local-binding) - the chart is bound to PHP array
* [remote](/php/widgets/chart/remote-binding) - the chart makes AJAX requests and is bound to JSON result

Here is how to configure the Kendo StockChart for server binding:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.

1. Create an array which to which the chart will be bound to

        <?php
        $data = array(
            array('Date' => '2014-04-01', 'Open' => 10, 'High' => 20, 'Low' => 9, 'Close' => 12),
            array('Date' => '2014-04-02', 'Open' => 12, 'High' => 19, 'Low' => 10, 'Close' => 14)
        );
        ?>

1. Create a [data source](/api/wrappers/php/Kendo/Data/DataSource) and set its [data](/api/wrappers/php/Kendo/Data/DataSource#data):

        <?php
        $dataSource = new \Kendo\Data\DataSource();
        $dataSource->data($data);
        ?>

1. Create a [stock chart](/api/wrappers/php/Kendo/Dataviz/UI/StockChart) and configure it:

        <?php
        $chart = new \Kendo\Dataviz\UI\StockChart('stock-chart');

        $series = new \Kendo\Dataviz\UI\StockChartSeriesItem();
        $series->type('candlestick')
               ->openField('Open')
               ->highField('High')
               ->lowField('Low')
               ->closeField('Close');

        $navigator = new \Kendo\Dataviz\UI\StockChartNavigator();
        $navigator->addSeriesItem(array('type' => 'area', 'field' => 'Close'));

        $chart->dataSource($dataSource)
              ->dateField('Date')
              ->addSeriesItem($series)
              ->navigator($navigator);
        ?>

1. Output the chart by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php echo $chart->render(); ?>

## Getting Client-side Reference

You can reference an existing stock chart instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/dataviz/stock-chart#methods) to control its behavior.

### Example

        // Put this after your Kendo StockChart for PHP render() call
        <script>
            $(function() {
                // Notice that the name of the chart is used to get its client-side instance
                var chart = $("#stockChart").data("kendoStockChart");
            });
        </script>

## Handling Events

You can subscribe to all [events](/api/dataviz/stock-chart#events) exposed by Kendo UI Stock Chart:

### Example - subscribing by specifying JavaScript function name

        <?php
        $chart = new \Kendo\Dataviz\UI\StockChart('stock-chart');

        // The 'chart_dataBound' JavaScript function will handle the 'dataBound' event of the chart
        $chart->dataBound('chart_dataBound');

        echo $chart->render();
        ?>
        <script>
        function chart_dataBound() {
            // Handle the dataBound event
        }
        </script>

### Example - providing inline JavaScript code

        <?php
        $chart = new \Kendo\Dataviz\UI\StockChart('stock-chart');

        // Provide inline JavaScript code that will handle the 'dataBound' event of the chart
        $chart->dataBound('function() { /* Handle the dataBound event */ }');

        echo $chart->render();
        ?>

